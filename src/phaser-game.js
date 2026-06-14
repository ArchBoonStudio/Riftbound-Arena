(function () {
  const BOARD_COLS = 8;
  const BOARD_ROWS = 6;
  const BENCH_SLOTS = 8;
  const INTERNAL_WIDTH = 1512;
  const INTERNAL_HEIGHT = 1040;
  // Measured from assets/ui/battlefield-background.png (1512x1040).
  // The art has a 9-column painted field; gameplay remains the existing 8x6.
  const BOARD_X = 215;
  const BOARD_Y = 100;
  const BOARD_W = 1082;
  const BOARD_H = 678;
  const TILE_GAP = 0;
  const BENCH_X = 193;
  const BENCH_Y = 820;
  const BENCH_W = 1120;
  const BENCH_H = 154;
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
  const BACKGROUND_PATH = 'assets/ui/battlefield-background.png';
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

  let phaserGame = null;
  let boardScene = null;
  let pendingState = null;
  let callbacks = {};

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
    if (String(value).toLowerCase().includes('block')) return '#9ec7ff';
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

      if (!artBackground) {
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
      } else {
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

      if (!artBackground) {
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
          const occupiedBlocked = occupied && !sourceOnBoard;
          const valid = isPlayer && this.latestState?.mode === 'planning' && !capFull && !occupiedBlocked;
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
      view.emblem = this.add.rectangle(0, -13, TOKEN_RADIUS * 0.52, TOKEN_RADIUS * 0.52, 0xeef4ff, 0.9)
        .setAngle(45)
        .setStrokeStyle(2, 0xeef4ff, 0.28);
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

      root.add([view.shadow, view.aura, view.ringOuter, view.ringInner, view.core, view.emblem, view.nameBack, view.starText, view.nameText, view.classText]);
      this.createBars(root, view);
      this.createDefeatedOverlay(root, view);
      root.add(view.token);

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

    showTooltip(view) {
      if (!view?.unit || view.dragging) return;
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
      view.emblem
        .setFillStyle(alive ? classColor : 0x545b69, alive ? 0.9 : 0.45)
        .setStrokeStyle(2, alive ? rarityColor : 0x7e8798, alive ? 0.32 : 0.14);
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

      let accepted = false;
      if (unit && benchSlot && this.latestState?.mode === 'planning') {
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
      this.tweens.add({
        targets: view.root,
        alpha: 0.5,
        scale: 0.93,
        duration: 220,
        ease: 'Sine.easeOut'
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
          view.root.destroy(true);
          this.unitViews.delete(id);
        }
      });
    }

    findUnitView(unitId) {
      return this.unitViews.get(unitId);
    }

    flashUnit(unitId, color, scale = 1.12) {
      const view = this.findUnitView(unitId);
      if (!view) return;
      this.tweens.add({
        targets: view.root,
        scale,
        duration: 100,
        yoyo: true,
        ease: 'Sine.easeOut'
      });

      const glow = this.add.circle(view.root.x, view.root.y - 8, TOKEN_RADIUS + 14, color, 0.24);
      const ring = this.add.circle(view.root.x, view.root.y - 8, TOKEN_RADIUS + 4, color, 0)
        .setStrokeStyle(4, color, 0.65);
      this.effectLayer.add([glow, ring]);
      this.tweens.add({
        targets: [glow, ring],
        alpha: 0,
        scale: 1.75,
        duration: 480,
        ease: 'Sine.easeOut',
        onComplete: () => {
          glow.destroy();
          ring.destroy();
        }
      });
    }

    attackEffect(attackerId, targetId) {
      const attacker = this.findUnitView(attackerId);
      const target = this.findUnitView(targetId);
      if (!attacker || !target) return;

      const startX = attacker.root.x;
      const startY = attacker.root.y;
      const dx = target.root.x - startX;
      const dy = target.root.y - startY;
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

      const slash = this.add.rectangle(
        Phaser.Math.Linear(startX, target.root.x, 0.62),
        Phaser.Math.Linear(startY, target.root.y, 0.62),
        TILE_W * 0.50,
        4,
        0xffd1a1,
        0.9
      ).setRotation(Math.atan2(dy, dx));
      this.effectLayer.add(slash);
      this.tweens.add({
        targets: slash,
        alpha: 0,
        scaleX: 1.8,
        duration: 260,
        onComplete: () => slash.destroy()
      });
      this.flashUnit(targetId, 0xffd1a1, 1.05);
    }

    popup(unitId, text, color = null) {
      const view = this.findUnitView(unitId);
      if (!view) return;
      const label = this.add.text(view.root.x, view.root.y - TILE_H * 0.34, String(text), {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '22px',
        fontStyle: '900',
        color: color || numberColor(text),
        stroke: '#070a12',
        strokeThickness: 5
      }).setOrigin(0.5);
      this.effectLayer.add(label);
      this.tweens.add({
        targets: label,
        y: label.y - 38,
        alpha: 0,
        scale: 1.12,
        duration: 780,
        ease: 'Sine.easeOut',
        onComplete: () => label.destroy()
      });
    }

    bossFlash() {
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

  function playAbilityEffect(unitId) {
    boardScene?.flashUnit(unitId, 0xc78cff, 1.16);
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
})();
