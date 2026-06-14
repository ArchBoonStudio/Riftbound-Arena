(function () {
  const BOARD_COLS = 8;
  const BOARD_ROWS = 6;
  const BENCH_SLOTS = 8;
  const INTERNAL_WIDTH = 1512;
  const INTERNAL_HEIGHT = 1040;
  // Measured from assets/ui/battlefield-background.png (1511x1041).
  // The flat art is painted as the existing 8x6 board plus 8 bench slots.
  const BOARD_X = 214;
  const BOARD_Y = 78;
  const BOARD_W = 1076;
  const BOARD_H = 748;
  const TILE_GAP = 0;
  const BENCH_X = 210;
  const BENCH_Y = 868;
  const BENCH_W = 1104;
  const BENCH_H = 133;
  const TILE_W = BOARD_W / BOARD_COLS;
  const TILE_H = BOARD_H / BOARD_ROWS;
  const BENCH_SLOT_W = BENCH_W / BENCH_SLOTS;
  const TOKEN_RADIUS = 40;
  const TOKEN_BAR_W = 132;
  const TOKEN_SHADOW_W = 106;
  const TOKEN_STAR_Y = -57;
  const TOKEN_CLASS_Y = -39;
  const TOKEN_NAME_Y = 24;
  const TOKEN_HP_Y = 50;
  const TOKEN_EN_Y = 68;
  const BACKGROUND_KEY = 'battlefield-background';
  const BACKGROUND_PATH = 'assets/ui/battlefield-background.png?v=flat-sync-1';
  const USE_ART_BACKGROUND = true;

  const rarityColors = {
    Common: 0xb9c4d6,
    Uncommon: 0x7ff2b2,
    Rare: 0x73a7ff,
    Epic: 0xc78cff,
    Legendary: 0xf2c96b,
    Mythic: 0xff6f7f
  };

  const rarityFills = {
    Common: 0x273044,
    Uncommon: 0x17372d,
    Rare: 0x162d55,
    Epic: 0x2e1f4d,
    Legendary: 0x4c3516,
    Mythic: 0x4a1820
  };

  const classColors = {
    Guardian: 0x9ec7ff,
    Ranger: 0x9ff2a8,
    Mage: 0xc78cff,
    Healer: 0x7ff2b2,
    Assassin: 0xffd1a1,
    Bruiser: 0xff9aa6,
    Boss: 0xff6f7f
  };

  const classAccentColors = {
    Guardian: 0x5f8cff,
    Ranger: 0x67d979,
    Mage: 0x8e5cff,
    Healer: 0x35dca3,
    Assassin: 0xffa24f,
    Bruiser: 0xff6578,
    Boss: 0xff2d55
  };

  let phaserGame = null;
  let boardScene = null;
  let pendingState = null;
  let callbacks = {};
  let phaserSettings = {
    showTooltips: true,
    damageNumbers: true,
    reducedMotion: false,
    gridOverlay: true
  };

  function clamp01(value) {
    return Math.max(0, Math.min(1, value));
  }

  function cellOrigin(x, y) {
    return {
      x: BOARD_X + x * (TILE_W + TILE_GAP),
      y: BOARD_Y + y * (TILE_H + TILE_GAP)
    };
  }

  function cellCenter(x, y) {
    const origin = cellOrigin(x, y);
    return {
      x: origin.x + TILE_W / 2,
      y: origin.y + TILE_H / 2
    };
  }

  function benchSlotOrigin(index) {
    return {
      x: BENCH_X + index * (BENCH_SLOT_W + TILE_GAP),
      y: BENCH_Y
    };
  }

  function benchSlotCenter(index) {
    const origin = benchSlotOrigin(index);
    return {
      x: origin.x + BENCH_SLOT_W / 2,
      y: origin.y + BENCH_H / 2
    };
  }

  function cellAtBoardPoint(boardX, boardY) {
    const magnet = Math.max(18, TILE_GAP * 2.25);
    if (boardX < BOARD_X - magnet || boardY < BOARD_Y - magnet) return null;
    const stepX = TILE_W + TILE_GAP;
    const stepY = TILE_H + TILE_GAP;
    const x = Math.round((boardX - BOARD_X - TILE_W / 2) / stepX);
    const y = Math.round((boardY - BOARD_Y - TILE_H / 2) / stepY);
    if (x < 0 || x >= BOARD_COLS || y < 0 || y >= BOARD_ROWS) return null;

    const origin = cellOrigin(x, y);
    if (
      boardX < origin.x - magnet ||
      boardX > origin.x + TILE_W + magnet ||
      boardY < origin.y - magnet ||
      boardY > origin.y + TILE_H + magnet
    ) return null;
    return { x, y };
  }

  function benchSlotAtBoardPoint(boardX, boardY) {
    const magnet = Math.max(18, TILE_GAP * 2.25);
    if (boardY < BENCH_Y - magnet || boardY > BENCH_Y + BENCH_H + magnet) return null;
    const stepX = BENCH_SLOT_W + TILE_GAP;
    const index = Math.round((boardX - BENCH_X - BENCH_SLOT_W / 2) / stepX);
    if (index < 0 || index >= BENCH_SLOTS) return null;
    const origin = benchSlotOrigin(index);
    if (
      boardX < origin.x - magnet ||
      boardX > origin.x + BENCH_SLOT_W + magnet ||
      boardY < origin.y - magnet ||
      boardY > origin.y + BENCH_H + magnet
    ) return null;
    return { index };
  }

  function numberColor(value) {
    if (String(value).startsWith('+')) return '#7ff2b2';
    if (String(value).toLowerCase().includes('shield')) return '#9ec7ff';
    if (String(value).toLowerCase().includes('dodge')) return '#d8c2ff';
    return '#ffd1a1';
  }

  function hexColor(value) {
    return `#${value.toString(16).padStart(6, '0')}`;
  }

  function unitsForState(gameState) {
    if (!gameState) return [];
    const units = gameState.mode === 'battle'
      ? (gameState.combatUnits || [])
      : Object.values(gameState.board || {});
    return units.filter(unit => unit && unit.id);
  }

  function benchUnitsForState(gameState) {
    if (!gameState || gameState.mode !== 'planning') return [];
    return Array.from({ length: BENCH_SLOTS }, (_, index) => {
      const unit = gameState.bench?.[index];
      return unit && unit.id ? { ...unit, benchIndex: index, benchUnit: true } : null;
    }).filter(Boolean);
  }

  function boardKeyForUnit(gameState, unitId) {
    return Object.keys(gameState?.board || {}).find(key => gameState.board[key]?.id === unitId) || null;
  }

  function spritePathFor(unit) {
    const safeName = String(unit.type || unit.name || 'unit').replace(/[^a-z0-9-]/gi, '').toLowerCase();
    const folder = unit.side === 'enemy'
      ? (unit.unitClass === 'Boss' ? 'bosses' : 'enemies')
      : 'champions';
    return `assets/${folder}/${safeName}.png`;
  }

  function shortName(unit) {
    const name = String(unit.name || 'Unit');
    if (name.length <= 12) return name;
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length > 1) return parts.map(part => part[0]).join('').slice(0, 5).toUpperCase();
    return name.slice(0, 11);
  }

  class GameScene extends Phaser.Scene {
    constructor() {
      super('GameScene');
      this.unitViews = new Map();
      this.benchViews = new Map();
      this.unitHighlights = new Map();
      this.latestState = null;
    }

    preload() {
      this.load.image(BACKGROUND_KEY, BACKGROUND_PATH);
    }

    create() {
      boardScene = this;
      this.gridLayer = this.add.container(0, 0).setDepth(0);
      this.dragLayer = this.add.container(0, 0).setDepth(5);
      this.benchLayer = this.add.container(0, 0).setDepth(20);
      this.unitLayer = this.add.container(0, 0).setDepth(20);
      this.effectLayer = this.add.container(0, 0).setDepth(50);
      this.tooltipLayer = this.add.container(0, 0).setDepth(100);
      this.dragActive = false;
      this.draggingUnitId = null;
      this.hoverCell = null;
      this.hoverBenchSlot = null;
      this.tooltip = null;
      this.drawGrid();
      if (pendingState) this.refresh(pendingState);
    }

    drawGrid() {
      this.gridLayer.removeAll(true);
      const hasLoadedArtBackground = this.textures.exists(BACKGROUND_KEY);
      const hasArtBackground = USE_ART_BACKGROUND;

      if (hasLoadedArtBackground) {
        const background = this.add.image(0, 0, BACKGROUND_KEY)
          .setOrigin(0)
          .setDisplaySize(INTERNAL_WIDTH, INTERNAL_HEIGHT);
        this.gridLayer.add(background);
      } else if (!USE_ART_BACKGROUND) {
        const frame = this.add.graphics();
        frame.fillGradientStyle(0x060812, 0x10182c, 0x080b15, 0x15101e, 1);
        frame.fillRoundedRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT, 24);
        frame.lineStyle(3, 0x536da8, 0.34);
        frame.strokeRoundedRect(12, 12, INTERNAL_WIDTH - 24, INTERNAL_HEIGHT - 24, 24);
        frame.lineStyle(1, 0xf2c96b, 0.18);
        frame.strokeRoundedRect(22, 22, INTERNAL_WIDTH - 44, INTERNAL_HEIGHT - 44, 18);
        this.gridLayer.add(frame);

        const mist = this.add.graphics();
        mist.fillStyle(0x73a7ff, 0.035);
        mist.fillEllipse(INTERNAL_WIDTH * 0.5, INTERNAL_HEIGHT * 0.52, INTERNAL_WIDTH * 0.82, INTERNAL_HEIGHT * 0.58);
        mist.fillStyle(0xff6f7f, 0.025);
        mist.fillEllipse(INTERNAL_WIDTH * 0.5, INTERNAL_HEIGHT * 0.18, INTERNAL_WIDTH * 0.72, INTERNAL_HEIGHT * 0.28);
        this.gridLayer.add(mist);

        this.drawZoneBand(0, 2, 0x3a1420, 0xff6f7f, 'ENEMY ROWS');
        this.drawZoneBand(4, 2, 0x102a4c, 0x73a7ff, 'PLAYER DEPLOYMENT');
      }

      for (let y = 0; y < BOARD_ROWS; y += 1) {
        for (let x = 0; x < BOARD_COLS; x += 1) {
          this.drawTile(x, y, hasArtBackground);
        }
      }

      this.drawBench(hasArtBackground);
    }

    drawZoneBand(startRow, rowCount, fill, line, label) {
      const first = cellOrigin(0, startRow);
      const last = cellOrigin(BOARD_COLS - 1, startRow + rowCount - 1);
      const width = last.x - first.x + TILE_W;
      const height = last.y - first.y + TILE_H;
      const band = this.add.graphics();
      band.fillStyle(fill, 0.18);
      band.fillRoundedRect(first.x - 10, first.y - 10, width + 20, height + 20, 18);
      band.lineStyle(2, line, 0.28);
      band.strokeRoundedRect(first.x - 10, first.y - 10, width + 20, height + 20, 18);
      this.gridLayer.add(band);

      const textY = startRow === 0 ? first.y - 26 : first.y + height + 10;
      const zoneText = this.add.text(first.x, textY, label, {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '14px',
        fontStyle: '900',
        color: startRow === 0 ? '#ffacb8' : '#9ec7ff'
      }).setAlpha(0.9);
      this.gridLayer.add(zoneText);
    }

    drawTile(x, y, artBackground = false) {
      const origin = cellOrigin(x, y);
      const isEnemy = y <= 1;
      const isPlayer = y >= 4;
      const fill = isEnemy ? 0x2b1420 : (isPlayer ? 0x0e2544 : 0x0a1020);
      const edge = isEnemy ? 0xff6f7f : (isPlayer ? 0x73a7ff : 0x8daeef);
      const alpha = isEnemy || isPlayer ? 0.64 : 0.46;
      const showOverlay = phaserSettings.gridOverlay !== false;

      if (!artBackground && showOverlay) {
        const tile = this.add.graphics();
        tile.fillStyle(fill, alpha);
        tile.fillRoundedRect(origin.x, origin.y, TILE_W, TILE_H, 13);
        tile.lineStyle(2, edge, isEnemy || isPlayer ? 0.48 : 0.18);
        tile.strokeRoundedRect(origin.x, origin.y, TILE_W, TILE_H, 13);
        tile.lineStyle(1, 0xf2c96b, 0.08);
        tile.beginPath();
        tile.moveTo(origin.x + 12, origin.y + 12);
        tile.lineTo(origin.x + TILE_W - 12, origin.y + TILE_H - 12);
        tile.moveTo(origin.x + TILE_W - 12, origin.y + 12);
        tile.lineTo(origin.x + 12, origin.y + TILE_H - 12);
        tile.strokePath();
        this.gridLayer.add(tile);
      } else if (showOverlay) {
        const tileGuide = this.add.graphics();
        tileGuide.fillStyle(fill, isEnemy || isPlayer ? 0.012 : 0.004);
        tileGuide.fillRoundedRect(origin.x, origin.y, TILE_W, TILE_H, 10);
        tileGuide.lineStyle(1, edge, isEnemy || isPlayer ? 0.055 : 0.018);
        tileGuide.strokeRoundedRect(origin.x, origin.y, TILE_W, TILE_H, 10);
        this.gridLayer.add(tileGuide);
      }

      const zone = this.add.zone(origin.x, origin.y, TILE_W, TILE_H)
        .setOrigin(0)
        .setInteractive({ useHandCursor: isPlayer });
      zone.on('pointerdown', () => callbacks.onCellClick?.(x, y));
      this.gridLayer.add(zone);

      if (!artBackground && showOverlay) {
        const label = this.add.text(origin.x + 8, origin.y + 6, `${x + 1},${y + 1}`, {
          fontFamily: 'Segoe UI, Arial',
          fontSize: '12px',
          fontStyle: '900',
          color: isEnemy ? '#ffacb8' : (isPlayer ? '#9ec7ff' : '#596b8e')
        }).setAlpha(isEnemy || isPlayer ? 0.76 : 0.48);
        this.gridLayer.add(label);
      }
    }

    drawBench(artBackground = false) {
      const first = benchSlotOrigin(0);
      const last = benchSlotOrigin(BENCH_SLOTS - 1);
      const width = last.x - first.x + BENCH_SLOT_W;

      if (!artBackground) {
        const band = this.add.graphics();
        band.fillStyle(0x0b1629, 0.72);
        band.fillRoundedRect(first.x - 14, BENCH_Y - 42, width + 28, BENCH_H + 56, 18);
        band.lineStyle(2, 0x7ff2b2, 0.24);
        band.strokeRoundedRect(first.x - 14, BENCH_Y - 42, width + 28, BENCH_H + 56, 18);
        this.gridLayer.add(band);

        const label = this.add.text(first.x, BENCH_Y - 31, 'PHASER BENCH', {
          fontFamily: 'Segoe UI, Arial',
          fontSize: '14px',
          fontStyle: '900',
          color: '#9ff2c8'
        }).setAlpha(0.92);
        this.gridLayer.add(label);
      }

      for (let index = 0; index < BENCH_SLOTS; index += 1) {
        this.drawBenchSlot(index, artBackground);
      }
    }

    drawBenchSlot(index, artBackground = false) {
      const origin = benchSlotOrigin(index);
      if (!artBackground) {
        const slot = this.add.graphics();
        slot.fillStyle(0x08111f, 0.74);
        slot.fillRoundedRect(origin.x, origin.y, BENCH_SLOT_W, BENCH_H, 14);
        slot.lineStyle(2, 0x7ff2b2, 0.26);
        slot.strokeRoundedRect(origin.x, origin.y, BENCH_SLOT_W, BENCH_H, 14);
        this.gridLayer.add(slot);
      }

      const zone = this.add.zone(origin.x, origin.y, BENCH_SLOT_W, BENCH_H)
        .setOrigin(0)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => callbacks.onBenchSlotClick?.(index));
      this.gridLayer.add(zone);

      if (!artBackground) {
        const label = this.add.text(origin.x + 8, origin.y + 6, `B${index + 1}`, {
          fontFamily: 'Segoe UI, Arial',
          fontSize: '11px',
          fontStyle: '900',
          color: '#8fbba7'
        }).setAlpha(0.7);
        this.gridLayer.add(label);
      }
    }

    setDragPreview(active, gameState = this.latestState, unitId = null) {
      this.dragActive = active;
      this.latestState = gameState || this.latestState;
      this.draggingUnitId = active ? (unitId || this.latestState?.draggedUnitId || this.draggingUnitId) : null;
      this.hoverCell = null;
      this.hoverBenchSlot = null;
      this.drawDragHighlights();
    }

    previewExternalDrop(clientX, clientY, gameState = this.latestState) {
      this.latestState = gameState || this.latestState;
      const cell = this.cellFromClientPoint(clientX, clientY);
      const benchSlot = this.benchSlotFromClientPoint(clientX, clientY);
      this.hoverCell = cell;
      this.hoverBenchSlot = benchSlot;
      this.drawDragHighlights(cell);
      return this.describeCell(cell);
    }

    clearDragPreview() {
      this.dragActive = false;
      this.draggingUnitId = null;
      this.hoverCell = null;
      this.hoverBenchSlot = null;
      this.benchLayer?.setDepth(20);
      this.unitLayer?.setDepth(20);
      this.dragLayer.removeAll(true);
    }

    cellFromClientPoint(clientX, clientY) {
      const canvas = this.sys.game.canvas;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return null;
      const boardX = (clientX - rect.left) * (INTERNAL_WIDTH / rect.width);
      const boardY = (clientY - rect.top) * (INTERNAL_HEIGHT / rect.height);
      return cellAtBoardPoint(boardX, boardY);
    }

    benchSlotFromClientPoint(clientX, clientY) {
      const canvas = this.sys.game.canvas;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return null;
      const boardX = (clientX - rect.left) * (INTERNAL_WIDTH / rect.width);
      const boardY = (clientY - rect.top) * (INTERNAL_HEIGHT / rect.height);
      return benchSlotAtBoardPoint(boardX, boardY);
    }

    describeCell(cell) {
      if (!cell) return { valid: false, reason: 'outside' };
      if (cell.y < 4) return { ...cell, valid: false, reason: 'enemy-row' };
      if (this.latestState?.mode !== 'planning') return { ...cell, valid: false, reason: 'combat' };
      const occupied = Boolean(this.latestState?.board?.[`${cell.x},${cell.y}`]);
      const sourceOnBoard = Boolean(boardKeyForUnit(this.latestState, this.draggingUnitId));
      const activeCount = Object.keys(this.latestState?.board || {}).length;
      if (occupied && !sourceOnBoard) return { ...cell, valid: false, reason: 'occupied', occupied };
      if (!occupied && !sourceOnBoard && activeCount >= (this.latestState?.activeUnitCap || 10)) return { ...cell, valid: false, reason: 'cap', occupied };
      return { ...cell, valid: true, reason: 'valid', occupied };
    }

    drawDragHighlights(hoverCell = null) {
      this.dragLayer.removeAll(true);
      if (!this.dragActive) return;

      for (let y = 0; y < BOARD_ROWS; y += 1) {
        for (let x = 0; x < BOARD_COLS; x += 1) {
          const origin = cellOrigin(x, y);
          const isPlayer = y >= 4;
          const occupied = Boolean(this.latestState?.board?.[`${x},${y}`]);
          const isHover = hoverCell?.x === x && hoverCell?.y === y;
          const sourceOnBoard = Boolean(boardKeyForUnit(this.latestState, this.draggingUnitId));
          const activeCount = Object.keys(this.latestState?.board || {}).length;
          const capFull = !occupied && !sourceOnBoard && activeCount >= (this.latestState?.activeUnitCap || 10);
          const occupiedRejected = occupied && !sourceOnBoard;
          const valid = isPlayer && this.latestState?.mode === 'planning' && !capFull && !occupiedRejected;
          const color = valid ? (occupied ? 0xf2c96b : 0x7ff2b2) : 0xff6f7f;
          const alpha = isHover ? 0.24 : (valid ? 0.08 : 0.045);
          const lineAlpha = isHover ? 0.92 : (valid ? 0.32 : 0.18);
          const highlight = this.add.graphics();
          highlight.fillStyle(color, alpha);
          highlight.fillRoundedRect(origin.x + 3, origin.y + 3, TILE_W - 6, TILE_H - 6, 12);
          highlight.lineStyle(isHover ? 4 : 2, color, lineAlpha);
          highlight.strokeRoundedRect(origin.x + 3, origin.y + 3, TILE_W - 6, TILE_H - 6, 12);
          this.dragLayer.add(highlight);
        }
      }

      for (let index = 0; index < BENCH_SLOTS; index += 1) {
        const origin = benchSlotOrigin(index);
        const occupied = Boolean(this.latestState?.bench?.[index]);
        const isHover = this.hoverBenchSlot?.index === index;
        const valid = this.latestState?.mode === 'planning';
        const color = valid ? (occupied ? 0xf2c96b : 0x7ff2b2) : 0xff6f7f;
        const highlight = this.add.graphics();
        highlight.fillStyle(color, isHover ? 0.22 : 0.07);
        highlight.fillRoundedRect(origin.x + 3, origin.y + 3, BENCH_SLOT_W - 6, BENCH_H - 6, 12);
        highlight.lineStyle(isHover ? 4 : 2, color, isHover ? 0.9 : 0.3);
        highlight.strokeRoundedRect(origin.x + 3, origin.y + 3, BENCH_SLOT_W - 6, BENCH_H - 6, 12);
        this.dragLayer.add(highlight);
      }
    }

    invalidDropFlash(cell = this.hoverCell, benchSlot = this.hoverBenchSlot) {
      const center = benchSlot ? benchSlotCenter(benchSlot.index) : cellCenter((cell || { x: 3 }).x, (cell || { y: 3 }).y);
      const flashW = benchSlot ? BENCH_SLOT_W * 0.94 : TILE_W * 0.94;
      const flashH = benchSlot ? BENCH_H * 0.94 : TILE_H * 0.94;
      const flash = this.add.rectangle(center.x, center.y, flashW, flashH, 0xff6f7f, 0.22);
      flash.setStrokeStyle(4, 0xff6f7f, 0.85);
      this.effectLayer.add(flash);
      this.cameras.main.shake(180, 0.003);
      this.tweens.add({
        targets: flash,
        alpha: 0,
        scale: 1.08,
        duration: 260,
        onComplete: () => flash.destroy()
      });
    }

    refresh(gameState) {
      this.latestState = gameState;
      pendingState = gameState;
      const units = unitsForState(gameState);
      const benchUnits = benchUnitsForState(gameState);
      const liveIds = new Set(units.map(unit => unit.id));
      const liveBenchIds = new Set(benchUnits.map(unit => unit.id));

      this.unitViews.forEach((view, id) => {
        if (!liveIds.has(id)) {
          this.clearUnitHighlight(id);
          view.root.destroy(true);
          view.hitZone?.destroy();
          this.unitViews.delete(id);
        }
      });

      units.forEach(unit => {
        const view = this.unitViews.get(unit.id);
        if (view) this.updateUnitView(view, unit);
        else this.createUnitView(unit, 'board');
      });

      this.benchViews.forEach((view, id) => {
        if (!liveBenchIds.has(id)) {
          view.root.destroy(true);
          view.hitZone?.destroy();
          this.benchViews.delete(id);
        }
      });

      benchUnits.forEach(unit => {
        const view = this.benchViews.get(unit.id);
        if (view) this.updateUnitView(view, unit);
        else this.createUnitView(unit, 'bench');
      });
    }

    createUnitView(unit, area = 'board') {
      const center = area === 'bench'
        ? benchSlotCenter(unit.benchIndex || 0)
        : cellCenter(unit.x || 0, unit.y || 0);
      const root = this.add.container(center.x, center.y);
      root.setSize(area === 'bench' ? BENCH_SLOT_W : TILE_W, area === 'bench' ? BENCH_H : TILE_H);

      const view = {
        area,
        root,
        token: this.add.container(0, 0),
        shadow: null,
        aura: null,
        ringOuter: null,
        ringInner: null,
        core: null,
        emblem: null,
        sigil: null,
        crown: null,
        nameBack: null,
        nameText: null,
        starText: null,
        classText: null,
        hpBack: null,
        hpFill: null,
        hpText: null,
        enBack: null,
        enFill: null,
        enText: null,
        defeatedSlash: null,
        defeatedText: null,
        hitZone: null,
        unit: null,
        dragging: false,
        lastAlive: true
      };

      view.shadow = this.add.ellipse(0, 34, TOKEN_SHADOW_W, 16, 0x000000, 0.34);
      view.aura = this.add.circle(0, -8, TOKEN_RADIUS + 10, 0xffffff, 0.08);
      view.ringOuter = this.add.circle(0, -8, TOKEN_RADIUS + 3, 0x10172b, 0.98);
      view.ringInner = this.add.circle(0, -8, TOKEN_RADIUS - 5, 0x172a4a, 0.98);
      view.core = this.add.circle(0, -8, TOKEN_RADIUS - 14, 0x1b2743, 0.98);
      view.emblem = this.add.graphics();
      view.sigil = this.add.graphics();
      view.crown = this.add.graphics();
      view.nameBack = this.add.rectangle(0, TOKEN_NAME_Y + 10, Math.min(152, (area === 'bench' ? BENCH_SLOT_W : TILE_W) - 16), 23, 0x070a12, 0.62)
        .setStrokeStyle(1, 0xf2c96b, 0.18);
      view.starText = this.add.text(0, TOKEN_STAR_Y, '', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '16px',
        fontStyle: '900',
        color: '#f2c96b',
        stroke: '#070a12',
        strokeThickness: 4
      }).setOrigin(0.5);
      view.nameText = this.add.text(0, TOKEN_NAME_Y, '', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '15px',
        fontStyle: '900',
        color: '#eef4ff',
        stroke: '#070a12',
        strokeThickness: 4,
        align: 'center',
        fixedWidth: Math.min(150, (area === 'bench' ? BENCH_SLOT_W : TILE_W) - 20)
      }).setOrigin(0.5, 0);
      view.classText = this.add.text(0, TOKEN_CLASS_Y, '', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '11px',
        fontStyle: '900',
        color: '#9fb0ce',
        stroke: '#070a12',
        strokeThickness: 3
      }).setOrigin(0.5);

      root.add([view.shadow, view.aura, view.ringOuter, view.ringInner, view.core, view.emblem, view.sigil, view.crown, view.nameBack, view.starText, view.nameText, view.classText]);
      this.createBars(root, view);
      this.createDefeatedOverlay(root, view);
      root.add(view.token);
      this.startPlaceholderIdle(view, unit);

      const hitW = area === 'bench' ? BENCH_SLOT_W : TILE_W;
      const hitH = area === 'bench' ? BENCH_H : TILE_H;
      view.hitZone = this.add.zone(center.x, center.y, hitW, hitH)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });
      view.hitZone.on('pointerdown', () => callbacks.onUnitClick?.(unit.id, unit.x, unit.y));
      view.hitZone.on('pointerover', () => this.showTooltip(view));
      view.hitZone.on('pointerout', () => this.hideTooltip());
      this.input.setDraggable(view.hitZone, true);
      view.hitZone.on('dragstart', () => this.startUnitDrag(view));
      view.hitZone.on('drag', (pointer, dragX, dragY) => this.dragUnit(view, dragX, dragY));
      view.hitZone.on('dragend', (pointer) => this.endUnitDrag(view, pointer));
      root.setData('spritePath', spritePathFor(unit));

      if (area === 'bench') {
        this.benchLayer.add(root);
        this.benchViews.set(unit.id, view);
      } else {
        this.unitLayer.add(root);
        this.unitViews.set(unit.id, view);
      }
      this.updateUnitView(view, unit, true);
    }

    startPlaceholderIdle(view, unit) {
      const rarityColor = rarityColors[unit.rarity] || rarityColors.Common;
      view.aura.setAlpha(0.72);
      this.tweens.add({
        targets: view.aura,
        scaleX: 1.12,
        scaleY: 1.12,
        alpha: unit.unitClass === 'Boss' ? 0.95 : 0.78,
        duration: unit.unitClass === 'Boss' ? 860 : 1280,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
      if (unit.rarity === 'Legendary' || unit.rarity === 'Mythic' || unit.unitClass === 'Boss') {
        const halo = this.add.circle(0, -8, TOKEN_RADIUS + 20, rarityColor, 0)
          .setStrokeStyle(2, rarityColor, 0.46);
        halo.setDepth(-3);
        view.root.addAt(halo, 1);
        view.rarityHalo = halo;
        this.tweens.add({
          targets: halo,
          angle: 360,
          duration: unit.unitClass === 'Boss' ? 2400 : 4200,
          repeat: -1,
          ease: 'Linear'
        });
      }
    }

    redrawPlaceholder(view, unit, rarityColor, classColor, fillColor, alive) {
      const className = unit.unitClass || unit.class || 'Unit';
      const accent = classAccentColors[className] || classColor;
      view.emblem.clear();
      view.sigil.clear();
      view.crown.clear();

      view.emblem.fillStyle(fillColor, alive ? 0.42 : 0.16);
      view.emblem.lineStyle(2, rarityColor, alive ? 0.38 : 0.12);
      view.emblem.fillCircle(0, -8, TOKEN_RADIUS - 10);
      view.emblem.strokeCircle(0, -8, TOKEN_RADIUS - 10);
      view.emblem.lineStyle(1, classColor, alive ? 0.36 : 0.12);
      view.emblem.strokeCircle(0, -8, TOKEN_RADIUS - 20);

      view.sigil.fillStyle(classColor, alive ? 0.92 : 0.38);
      view.sigil.lineStyle(3, accent, alive ? 0.82 : 0.24);
      switch (className) {
        case 'Guardian':
          view.sigil.fillPoints([{ x: 0, y: -34 }, { x: 21, y: -24 }, { x: 16, y: 0 }, { x: 0, y: 15 }, { x: -16, y: 0 }, { x: -21, y: -24 }], true);
          view.sigil.strokePoints([{ x: 0, y: -34 }, { x: 21, y: -24 }, { x: 16, y: 0 }, { x: 0, y: 15 }, { x: -16, y: 0 }, { x: -21, y: -24 }], true);
          view.sigil.lineBetween(0, -26, 0, 7);
          break;
        case 'Ranger':
          view.sigil.lineStyle(5, classColor, alive ? 0.94 : 0.35);
          view.sigil.beginPath();
          view.sigil.arc(0, -12, 23, Phaser.Math.DegToRad(220), Phaser.Math.DegToRad(500), false);
          view.sigil.strokePath();
          view.sigil.lineStyle(2, accent, alive ? 0.88 : 0.24);
          view.sigil.lineBetween(-18, -24, 18, 0);
          view.sigil.fillTriangle(22, 3, 8, 0, 14, -10);
          break;
        case 'Mage':
          view.sigil.fillPoints([{ x: 0, y: -38 }, { x: 8, y: -18 }, { x: 28, y: -18 }, { x: 12, y: -5 }, { x: 18, y: 16 }, { x: 0, y: 4 }, { x: -18, y: 16 }, { x: -12, y: -5 }, { x: -28, y: -18 }, { x: -8, y: -18 }], true);
          view.sigil.strokeCircle(0, -12, 25);
          break;
        case 'Healer':
          view.sigil.fillRoundedRect(-7, -37, 14, 50, 4);
          view.sigil.fillRoundedRect(-25, -19, 50, 14, 4);
          view.sigil.strokeCircle(0, -12, 26);
          break;
        case 'Assassin':
          view.sigil.fillTriangle(0, -40, 13, -12, 0, 17);
          view.sigil.fillTriangle(0, -40, -13, -12, 0, 17);
          view.sigil.lineBetween(-11, -2, 11, -25);
          break;
        case 'Bruiser':
          view.sigil.fillRoundedRect(-24, -25, 48, 23, 8);
          view.sigil.fillRoundedRect(-15, -4, 30, 20, 6);
          view.sigil.lineBetween(-18, -14, 18, -14);
          break;
        case 'Boss':
          view.sigil.fillTriangle(0, -42, 28, -24, 18, 13);
          view.sigil.fillTriangle(0, -42, -28, -24, -18, 13);
          view.sigil.strokeCircle(0, -12, 28);
          break;
        default:
          view.sigil.fillPoints([{ x: 0, y: -38 }, { x: 25, y: -12 }, { x: 0, y: 15 }, { x: -25, y: -12 }], true);
      }

      if (unit.star >= 2 || unit.rarity === 'Legendary' || unit.rarity === 'Mythic' || className === 'Boss') {
        view.crown.lineStyle(2, rarityColor, alive ? 0.74 : 0.2);
        view.crown.fillStyle(rarityColor, alive ? 0.32 : 0.08);
        view.crown.fillTriangle(-22, -53, -12, -41, -2, -53);
        view.crown.fillTriangle(2, -53, 12, -41, 22, -53);
        view.crown.strokeRoundedRect(-24, -43, 48, 7, 4);
      }
    }

    showTooltip(view) {
      if (!phaserSettings.showTooltips || !view?.unit || view.dragging) return;
      this.hideTooltip();
      const unit = view.unit;
      const lines = [
        `${unit.name} ${'*'.repeat(unit.star || 1)}`,
        `${unit.pantheon || 'Unknown'} / ${unit.sourceType || 'Unknown'} / ${unit.unitClass || unit.class || 'Unit'}`,
        `${unit.rarity || 'Common'} | HP ${Math.max(0, Math.round(unit.hp || 0))}/${Math.max(1, Math.round(unit.maxHp || 1))} | EN ${Math.round(unit.mana || 0)}/${unit.energyMax || 100}`,
        `DMG ${unit.damage} | RNG ${unit.range} | ARM ${unit.armor || 0}`,
        `${unit.abilityName || 'Ability'}: ${unit.abilityText || unit.abilityDescription || 'No ability text.'}`
      ];
      const longest = lines.reduce((max, line) => Math.max(max, line.length), 0);
      const width = Math.min(440, Math.max(260, longest * 7));
      const height = 118;
      const x = Math.min(INTERNAL_WIDTH - width - 18, Math.max(18, view.root.x + TILE_W * 0.28));
      const y = Math.min(INTERNAL_HEIGHT - height - 18, Math.max(18, view.root.y - TILE_H * 0.56));

      const bg = this.add.graphics();
      bg.fillStyle(0x0b1020, 0.96);
      bg.fillRoundedRect(x, y, width, height, 12);
      bg.lineStyle(2, rarityColors[unit.rarity] || rarityColors.Common, 0.72);
      bg.strokeRoundedRect(x, y, width, height, 12);

      const text = this.add.text(x + 12, y + 10, lines.join('\n'), {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '12px',
        color: '#eef4ff',
        lineSpacing: 5,
        wordWrap: { width: width - 24, useAdvancedWrap: true }
      });
      this.tooltip = this.add.container(0, 0, [bg, text]).setDepth(200);
      this.tooltipLayer.add(this.tooltip);
    }

    hideTooltip() {
      if (this.tooltip) {
        this.tooltip.destroy(true);
        this.tooltip = null;
      }
    }

    createBars(root, view) {
      const width = TOKEN_BAR_W;
      const hpY = TOKEN_HP_Y;
      const enY = TOKEN_EN_Y;

      view.hpBack = this.add.rectangle(-width / 2, hpY, width, 12, 0x111827, 1).setOrigin(0, 0.5);
      view.hpFill = this.add.rectangle(-width / 2, hpY, width, 12, 0x7ff2b2, 1).setOrigin(0, 0.5);
      view.hpText = this.add.text(0, hpY - 1, '', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '9px',
        fontStyle: '900',
        color: '#eef4ff',
        stroke: '#080a12',
        strokeThickness: 2
      }).setOrigin(0.5);

      view.enBack = this.add.rectangle(-width / 2, enY, width, 8, 0x111827, 1).setOrigin(0, 0.5);
      view.enFill = this.add.rectangle(-width / 2, enY, width, 8, 0x8e5cff, 1).setOrigin(0, 0.5);
      view.enText = this.add.text(0, enY - 1, '', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '9px',
        fontStyle: '900',
        color: '#d8c2ff',
        stroke: '#080a12',
        strokeThickness: 2
      }).setOrigin(0.5);

      root.add([view.hpBack, view.hpFill, view.hpText, view.enBack, view.enFill, view.enText]);
    }

    createDefeatedOverlay(root, view) {
      view.defeatedSlash = this.add.rectangle(0, -8, 114, 5, 0xff6f7f, 0.88)
        .setRotation(-0.55)
        .setVisible(false);
      view.defeatedText = this.add.text(0, 24, 'DEFEATED', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '10px',
        fontStyle: '900',
        color: '#ff9aa6',
        stroke: '#080a12',
        strokeThickness: 3
      }).setOrigin(0.5).setVisible(false);
      root.add([view.defeatedSlash, view.defeatedText]);
    }

    updateUnitView(view, unit, firstDraw = false) {
      view.unit = unit;
      const center = view.area === 'bench'
        ? benchSlotCenter(unit.benchIndex || 0)
        : cellCenter(unit.x || 0, unit.y || 0);
      const alive = unit.alive !== false;
      const rarityColor = rarityColors[unit.rarity] || rarityColors.Common;
      const fillColor = rarityFills[unit.rarity] || rarityFills.Common;
      const className = unit.unitClass || unit.class || 'Unit';
      const classColor = classColors[className] || 0xeef4ff;
      const sideTint = unit.side === 'enemy' ? 0x381622 : 0x14284a;

      if (view.dragging) return;

      if (firstDraw) {
        view.root.setPosition(center.x, center.y);
        view.hitZone?.setPosition(center.x, center.y);
      }
      else {
        this.tweens.add({
          targets: [view.root, view.hitZone].filter(Boolean),
          x: center.x,
          y: center.y,
          duration: 140,
          ease: 'Sine.easeOut'
        });
      }

      view.root.setAlpha(alive ? 1 : 0.56);
      view.root.setScale(alive ? 1 : 0.96);
      view.ringOuter.setFillStyle(0x10172b, alive ? 0.98 : 0.58).setStrokeStyle(5, rarityColor, alive ? 0.95 : 0.28);
      view.ringInner.setFillStyle(fillColor, alive ? 0.94 : 0.32).setStrokeStyle(2, classColor, alive ? 0.48 : 0.16);
      view.core.setFillStyle(sideTint, alive ? 0.98 : 0.38).setStrokeStyle(1, rarityColor, alive ? 0.28 : 0.08);
      view.aura.setFillStyle(rarityColor, alive ? (unit.unitClass === 'Boss' ? 0.16 : 0.08) : 0.02);
      if (view.rarityHalo) {
        view.rarityHalo.setStrokeStyle(2, rarityColor, alive ? (unit.unitClass === 'Boss' ? 0.68 : 0.46) : 0.12);
      }
      this.redrawPlaceholder(view, unit, rarityColor, classColor, fillColor, alive);
      view.nameText
        .setText(shortName(unit))
        .setColor(alive ? '#eef4ff' : '#aab1c1');
      view.starText.setText('*'.repeat(unit.star || 1));
      view.classText
        .setText(className.toUpperCase())
        .setColor(alive ? '#9fb0ce' : '#777f91');

      this.updateBars(view, unit);
      this.setDefeated(view, !alive);
      this.setUnitDragEnabled(view, unit);

      if (view.lastAlive && !alive && !firstDraw) this.playDeathFade(view);
      view.lastAlive = alive;
    }

    setUnitDragEnabled(view, unit) {
      const draggable = this.latestState?.mode === 'planning' && unit.side === 'player' && unit.alive !== false;
      if (view.hitZone?.input) {
        view.hitZone.input.draggable = draggable;
        view.hitZone.input.cursor = draggable ? 'grab' : 'default';
      }
    }

    startUnitDrag(view) {
      const unit = view.unit;
      if (!unit || this.latestState?.mode !== 'planning' || unit.side !== 'player' || unit.alive === false) return;
      this.tweens.killTweensOf(view.root);
      this.hideTooltip();
      view.dragging = true;
      view.root.setDepth(20);
      view.root.setAlpha(0.82);
      view.root.setScale(1.06);
      if (view.area === 'bench') this.benchLayer.setDepth(45);
      else this.unitLayer.setDepth(45);
      view.hitZone?.setDepth(46);
      this.setDragPreview(true, this.latestState, unit.id);
      if (view.area === 'bench') callbacks.onBenchUnitDragStart?.(unit.id);
      else callbacks.onBoardUnitDragStart?.(unit.id);
    }

    dragUnit(view, dragX, dragY) {
      if (!view.dragging) return;
      view.root.setPosition(dragX, dragY);
      view.hitZone?.setPosition(dragX, dragY);
      const cell = cellAtBoardPoint(dragX, dragY);
      const benchSlot = benchSlotAtBoardPoint(dragX, dragY);
      this.hoverCell = cell;
      this.hoverBenchSlot = benchSlot;
      this.drawDragHighlights(cell);
    }

    endUnitDrag(view, pointer) {
      if (!view.dragging) return;
      view.dragging = false;
      view.root.setDepth(0);
      view.root.setAlpha(1);
      view.root.setScale(1);
      view.hitZone?.setDepth(0);
      const unit = view.unit;
      const cell = cellAtBoardPoint(view.root.x, view.root.y);
      const benchSlot = benchSlotAtBoardPoint(view.root.x, view.root.y);
      const preview = this.describeCell(cell);
      const clientX = pointer?.event?.clientX;
      const clientY = pointer?.event?.clientY;

      let accepted = false;
      if (
        unit &&
        this.latestState?.mode === 'planning' &&
        Number.isFinite(clientX) &&
        Number.isFinite(clientY) &&
        callbacks.onUnitSellDrop?.(unit.id, clientX, clientY) === true
      ) {
        accepted = true;
      } else if (unit && benchSlot && this.latestState?.mode === 'planning') {
        accepted = view.area === 'bench'
          ? callbacks.onBenchUnitBenchDrop?.(unit.id, benchSlot.index) !== false
          : callbacks.onBoardUnitBenchSlotDrop?.(unit.id, benchSlot.index) !== false;
      } else if (unit && preview.valid) {
        accepted = view.area === 'bench'
          ? callbacks.onBenchUnitBoardDrop?.(unit.id, preview) !== false
          : callbacks.onBoardUnitDrop?.(unit.id, preview) !== false;
      }

      if (!accepted) {
        this.invalidDropFlash(cell, benchSlot);
        const rejectPreview = benchSlot ? { valid: false, reason: 'bench' } : preview;
        if (view.area === 'bench') callbacks.onBenchUnitDropRejected?.(unit?.id, rejectPreview);
        else callbacks.onBoardUnitDropRejected?.(unit?.id, rejectPreview);
        if (this.latestState) this.refresh(this.latestState);
      }
      this.clearDragPreview();
    }

    updateBars(view, unit) {
      const width = TILE_W * 0.80;
      const hp = Math.max(0, Math.round(unit.hp || 0));
      const maxHp = Math.max(1, Math.round(unit.maxHp || 1));
      const energy = Math.max(0, Math.round(unit.mana || 0));
      const maxEnergy = Math.max(1, Math.round(unit.energyMax || 100));
      const hpPct = clamp01(hp / maxHp);
      const energyPct = clamp01(energy / maxEnergy);
      const hpColor = unit.alive === false ? 0x5a2530 : (unit.side === 'enemy' ? 0xff6f7f : 0x7ff2b2);

      view.hpFill.width = Math.max(1, width * hpPct);
      view.hpFill.setFillStyle(hpColor, unit.alive === false ? 0.55 : 1);
      view.hpText.setText(`${hp}/${maxHp}`);
      view.enFill.width = Math.max(1, width * energyPct);
      view.enFill.setFillStyle(unit.alive === false ? 0x3f345c : 0x8e5cff, unit.alive === false ? 0.5 : 1);
      view.enText.setText(`${energy}/${maxEnergy}`);
    }

    setDefeated(view, defeated) {
      view.defeatedSlash.setVisible(defeated);
      view.defeatedText.setVisible(defeated);
      view.shadow.setAlpha(defeated ? 0.16 : 0.34);
    }

    playDeathFade(view) {
      const smoke = this.add.circle(view.root.x, view.root.y - 10, TOKEN_RADIUS + 10, 0x070a12, 0.42);
      const ember = this.add.circle(view.root.x, view.root.y - 10, TOKEN_RADIUS + 2, 0xff6f7f, 0)
        .setStrokeStyle(3, 0xff6f7f, 0.58);
      this.effectLayer.add([smoke, ember]);
      this.tweens.add({
        targets: view.root,
        alpha: 0.5,
        scale: 0.93,
        duration: 220,
        ease: 'Sine.easeOut'
      });
      this.tweens.add({
        targets: [smoke, ember],
        alpha: 0,
        scale: 1.65,
        duration: 620,
        ease: 'Sine.easeOut',
        onComplete: () => {
          smoke.destroy();
          ember.destroy();
        }
      });
    }

    refreshBars(gameState) {
      this.latestState = gameState;
      pendingState = gameState;
      const units = unitsForState(gameState);
      const seen = new Set();
      units.forEach(unit => {
        seen.add(unit.id);
        const view = this.unitViews.get(unit.id);
        if (view) this.updateUnitView(view, unit);
        else this.createUnitView(unit);
      });
      this.unitViews.forEach((view, id) => {
        if (!seen.has(id)) {
          this.clearUnitHighlight(id);
          view.root.destroy(true);
          this.unitViews.delete(id);
        }
      });
    }

    findUnitView(unitId) {
      return this.unitViews.get(unitId);
    }

    highlightUnitsByIds(unitIds = [], style = 'pantheon') {
      this.clearUnitHighlights();
      const color = style === 'pantheon' ? 0xf2c96b : style === 'class' ? 0x73a7ff : 0xc78cff;
      unitIds.forEach(unitId => {
        const view = this.findUnitView(unitId);
        if (!view) return;
        const glow = this.add.circle(0, -8, TOKEN_RADIUS + 18, color, 0.13)
          .setStrokeStyle(4, color, 0.68);
        const pulse = this.add.circle(0, -8, TOKEN_RADIUS + 6, color, 0)
          .setStrokeStyle(2, color, 0.9);
        glow.setDepth(-2);
        pulse.setDepth(-1);
        view.root.add([glow, pulse]);
        this.unitHighlights.set(unitId, [glow, pulse]);
        this.tweens.add({
          targets: [glow, pulse],
          alpha: { from: 0.18, to: 0.42 },
          scale: { from: 0.96, to: 1.08 },
          duration: 720,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      });
    }

    clearUnitHighlight(unitId) {
      const highlights = this.unitHighlights.get(unitId);
      if (!highlights) return;
      highlights.forEach(item => {
        this.tweens.killTweensOf(item);
        item.destroy();
      });
      this.unitHighlights.delete(unitId);
    }

    clearUnitHighlights() {
      [...this.unitHighlights.keys()].forEach(unitId => this.clearUnitHighlight(unitId));
    }

    flashUnit(unitId, color, scale = 1.12) {
      const view = this.findUnitView(unitId);
      if (!view) return;
      if (phaserSettings.reducedMotion) return;
      const className = view.unit?.unitClass || view.unit?.class || 'Unit';
      const accent = classAccentColors[className] || color;
      this.tweens.add({
        targets: view.root,
        scale,
        duration: 130,
        yoyo: true,
        ease: 'Sine.easeOut'
      });

      const glow = this.add.circle(view.root.x, view.root.y - 8, TOKEN_RADIUS + 14, color, 0.24);
      const ring = this.add.circle(view.root.x, view.root.y - 8, TOKEN_RADIUS + 4, color, 0)
        .setStrokeStyle(4, color, 0.65);
      const innerRing = this.add.circle(view.root.x, view.root.y - 8, TOKEN_RADIUS - 8, accent, 0)
        .setStrokeStyle(2, accent, 0.85);
      this.effectLayer.add([glow, ring, innerRing]);
      this.tweens.add({
        targets: [glow, ring, innerRing],
        alpha: 0,
        scale: 1.85,
        duration: 580,
        ease: 'Sine.easeOut',
        onComplete: () => {
          glow.destroy();
          ring.destroy();
          innerRing.destroy();
        }
      });

      for (let i = 0; i < 6; i += 1) {
        const angle = (Math.PI * 2 * i) / 6;
        const spark = this.add.circle(view.root.x, view.root.y - 8, 4, accent, 0.82);
        this.effectLayer.add(spark);
        this.tweens.add({
          targets: spark,
          x: spark.x + Math.cos(angle) * (TOKEN_RADIUS + 18),
          y: spark.y + Math.sin(angle) * (TOKEN_RADIUS + 18),
          alpha: 0,
          scale: 0.4,
          duration: 420,
          ease: 'Quad.easeOut',
          onComplete: () => spark.destroy()
        });
      }
    }

    abilityEffect(unitId, abilityName = 'Ability') {
      const view = this.findUnitView(unitId);
      if (!view) return;
      if (phaserSettings.reducedMotion) return;
      this.flashUnit(unitId, 0xc78cff, 1.16);
      const width = Math.min(210, Math.max(96, String(abilityName).length * 8));
      const root = this.add.container(view.root.x, view.root.y - TILE_H * 0.56);
      const back = this.add.graphics();
      back.fillStyle(0x120b22, 0.78);
      back.fillRoundedRect(-width / 2, -15, width, 30, 14);
      back.lineStyle(1, 0xc78cff, 0.58);
      back.strokeRoundedRect(-width / 2, -15, width, 30, 14);
      const label = this.add.text(0, -1, String(abilityName), {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '13px',
        fontStyle: '900',
        color: '#efe4ff',
        stroke: '#070a12',
        strokeThickness: 4
      }).setOrigin(0.5);
      root.add([back, label]);
      this.effectLayer.add(root);
      this.tweens.add({
        targets: root,
        y: root.y - 26,
        alpha: 0,
        duration: 760,
        ease: 'Sine.easeOut',
        onComplete: () => root.destroy(true)
      });
    }

    attackEffect(attackerId, targetId) {
      const attacker = this.findUnitView(attackerId);
      const target = this.findUnitView(targetId);
      if (!attacker || !target) return;
      if (phaserSettings.reducedMotion) return;

      const startX = attacker.root.x;
      const startY = attacker.root.y;
      const dx = target.root.x - startX;
      const dy = target.root.y - startY;
      const angle = Math.atan2(dy, dx);
      const hitX = Phaser.Math.Linear(startX, target.root.x, 0.72);
      const hitY = Phaser.Math.Linear(startY, target.root.y, 0.72);
      this.tweens.add({
        targets: attacker.root,
        x: startX + dx * 0.20,
        y: startY + dy * 0.20,
        scale: 1.08,
        duration: 85,
        yoyo: true,
        ease: 'Quad.easeOut',
        onComplete: () => {
          attacker.root.setPosition(startX, startY);
          attacker.root.setScale(1);
        }
      });

      const trail = this.add.graphics();
      trail.lineStyle(10, 0xffd1a1, 0.18);
      trail.beginPath();
      trail.moveTo(startX, startY - 8);
      trail.lineTo(hitX, hitY - 8);
      trail.strokePath();
      trail.lineStyle(3, 0xfff1c6, 0.85);
      trail.beginPath();
      trail.moveTo(startX + Math.cos(angle + Math.PI / 2) * 8, startY - 8 + Math.sin(angle + Math.PI / 2) * 8);
      trail.lineTo(hitX, hitY - 8);
      trail.strokePath();
      this.effectLayer.add(trail);

      const slash = this.add.rectangle(
        hitX,
        hitY,
        TILE_W * 0.50,
        4,
        0xffd1a1,
        0.9
      ).setRotation(angle);
      this.effectLayer.add(slash);
      this.tweens.add({
        targets: [slash, trail],
        alpha: 0,
        scaleX: 1.8,
        duration: 260,
        onComplete: () => {
          slash.destroy();
          trail.destroy();
        }
      });
      for (let i = 0; i < 5; i += 1) {
        const spark = this.add.circle(target.root.x, target.root.y - 8, Phaser.Math.Between(3, 6), 0xffd1a1, 0.78);
        this.effectLayer.add(spark);
        this.tweens.add({
          targets: spark,
          x: spark.x + Phaser.Math.Between(-22, 22),
          y: spark.y + Phaser.Math.Between(-26, 14),
          alpha: 0,
          duration: 320,
          ease: 'Quad.easeOut',
          onComplete: () => spark.destroy()
        });
      }
      this.flashUnit(targetId, 0xffd1a1, 1.05);
    }

    popup(unitId, text, color = null) {
      if (!phaserSettings.damageNumbers) return;
      const view = this.findUnitView(unitId);
      if (!view) return;
      const displayText = String(text);
      const popupColor = color || numberColor(text);
      const popupColorInt = Number(`0x${popupColor.replace('#', '')}`);
      const width = Math.min(128, Math.max(52, displayText.length * 14));
      const root = this.add.container(view.root.x, view.root.y - TILE_H * 0.34);
      const back = this.add.graphics();
      back.fillStyle(0x070a12, 0.72);
      back.fillRoundedRect(-width / 2, -3, width, 31, 13);
      back.lineStyle(1, popupColorInt, 0.5);
      back.strokeRoundedRect(-width / 2, -3, width, 31, 13);
      const label = this.add.text(0, 0, displayText, {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '22px',
        fontStyle: '900',
        color: popupColor,
        stroke: '#070a12',
        strokeThickness: 5
      }).setOrigin(0.5);
      root.add([back, label]);
      this.effectLayer.add(root);
      this.tweens.add({
        targets: root,
        y: root.y - 38,
        alpha: 0,
        scale: 1.12,
        duration: 780,
        ease: 'Sine.easeOut',
        onComplete: () => root.destroy(true)
      });
    }

    bossFlash() {
      if (phaserSettings.reducedMotion) return;
      const flash = this.add.rectangle(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT, 0xff6f7f, 0.24).setOrigin(0);
      const warning = this.add.text(INTERNAL_WIDTH / 2, INTERNAL_HEIGHT * 0.16, 'SECRET BOSS AWAKENS', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '36px',
        fontStyle: '900',
        color: '#ffced5',
        stroke: '#070a12',
        strokeThickness: 6
      }).setOrigin(0.5);
      this.effectLayer.add([flash, warning]);
      this.cameras.main.shake(520, 0.006);
      this.tweens.add({
        targets: flash,
        alpha: 0,
        duration: 950,
        onComplete: () => flash.destroy()
      });
      this.tweens.add({
        targets: warning,
        y: warning.y - 22,
        alpha: 0,
        duration: 1050,
        ease: 'Sine.easeOut',
        onComplete: () => warning.destroy()
      });
    }
  }

  function initPhaserBoard(options = {}) {
    callbacks = options;
    const parent = document.getElementById(options.containerId || 'battlefield');
    if (!parent || !window.Phaser) return false;
    if (phaserGame) return true;

    phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      parent,
      backgroundColor: '#070a12',
      transparent: true,
      width: INTERNAL_WIDTH,
      height: INTERNAL_HEIGHT,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: GameScene
    });
    return true;
  }

  function refreshPhaserBoard(gameState) {
    pendingState = gameState;
    if (boardScene) boardScene.refresh(gameState);
  }

  function updateUnitBars(gameState) {
    pendingState = gameState;
    if (boardScene) boardScene.refreshBars(gameState);
  }

  function playAttackEffect(attackerId, targetId) {
    boardScene?.attackEffect(attackerId, targetId);
  }

  function playAbilityEffect(unitId, abilityName = 'Ability') {
    boardScene?.abilityEffect(unitId, abilityName);
  }

  function playDamagePopup(targetId, amount) {
    boardScene?.popup(targetId, amount, '#ffd1a1');
  }

  function playHealPopup(targetId, amount) {
    boardScene?.popup(targetId, amount, '#7ff2b2');
  }

  function playShieldPopup(targetId, amount) {
    boardScene?.popup(targetId, amount, '#9ec7ff');
  }

  function clearBattlefield() {
    if (boardScene) boardScene.refresh({ mode: 'planning', board: {}, combatUnits: [] });
  }

  function playBossIntroEffect() {
    boardScene?.bossFlash();
  }

  function beginPhaserBoardDrag(gameState) {
    pendingState = gameState;
    boardScene?.setDragPreview(true, gameState);
  }

  function previewPhaserBoardDrop(clientX, clientY, gameState) {
    pendingState = gameState || pendingState;
    if (!boardScene) return { valid: false, reason: 'no-board' };
    return boardScene.previewExternalDrop(clientX, clientY, gameState || pendingState);
  }

  function endPhaserBoardDrag() {
    boardScene?.clearDragPreview();
  }

  function flashInvalidPhaserDrop(clientX = null, clientY = null) {
    if (!boardScene) return;
    const cell = clientX === null || clientY === null ? null : boardScene.cellFromClientPoint(clientX, clientY);
    boardScene.invalidDropFlash(cell);
  }

  function highlightUnitsByIds(unitIds = [], style = 'pantheon') {
    boardScene?.highlightUnitsByIds(unitIds, style);
  }

  function clearUnitHighlights() {
    boardScene?.clearUnitHighlights();
  }

  function setPhaserSettings(nextSettings = {}) {
    const previousGridOverlay = phaserSettings.gridOverlay;
    phaserSettings = { ...phaserSettings, ...nextSettings };
    if (boardScene && previousGridOverlay !== phaserSettings.gridOverlay) {
      boardScene.drawGrid();
    }
    if (!phaserSettings.showTooltips) boardScene?.hideTooltip();
  }

  window.initPhaserBoard = initPhaserBoard;
  window.refreshPhaserBoard = refreshPhaserBoard;
  window.updateUnitBars = updateUnitBars;
  window.playAttackEffect = playAttackEffect;
  window.playAbilityEffect = playAbilityEffect;
  window.playDamagePopup = playDamagePopup;
  window.playHealPopup = playHealPopup;
  window.playShieldPopup = playShieldPopup;
  window.clearBattlefield = clearBattlefield;
  window.playBossIntroEffect = playBossIntroEffect;
  window.beginPhaserBoardDrag = beginPhaserBoardDrag;
  window.previewPhaserBoardDrop = previewPhaserBoardDrop;
  window.endPhaserBoardDrag = endPhaserBoardDrag;
  window.flashInvalidPhaserDrop = flashInvalidPhaserDrop;
  window.highlightUnitsByIds = highlightUnitsByIds;
  window.clearUnitHighlights = clearUnitHighlights;
  window.setPhaserSettings = setPhaserSettings;
})();
