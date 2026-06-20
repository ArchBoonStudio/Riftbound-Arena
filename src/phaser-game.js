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
  const STATUS_Y = 82;
  const BACKGROUND_KEY = 'battlefield-background';
  const BACKGROUND_PATH = 'assets/ui/battlefield-background.png?v=flat-sync-1';
  const USE_ART_BACKGROUND = true;
  const SPRITE_VERSION = 'worshiper-sprites-2';
  const CHAMPION_SPRITE_FILES = {
    'Aegis Hoplite': '021_hellenic_temple_guard.png',
    'Pythian Seer': '022_hellenic_oracle_acolyte.png',
    'Fjord Huscarle': '023_norse_shield_bearer.png',
    'Ashbone Carver': '024_norse_rune_chanter.png',
    'Sun-Gate Medjay': '025_egyptian_temple_sentinel.png',
    'Dawn Priest': '026_egyptian_sun_acolyte.png',
    'Oakbound Warden': '027_celtic_grove_keeper.png',
    'Briarblade': '028_celtic_thornrunner.png',
    'Camelot Squire': '029_arthurian_squire.png',
    'Grail Pilgrim': '030_grail_pilgrim.png'
  };

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

  const pantheonColors = {
    Hellenic: 0xf2c96b,
    Norse: 0x83c8ff,
    Egyptian: 0xffd36b,
    Celtic: 0x75d99a,
    Arthurian: 0xb79cff
  };

  const statusColors = {
    shield: 0x9ec7ff,
    burn: 0xff7a3d,
    corruption: 0xc78cff
  };

  let phaserGame = null;
  let boardScene = null;
  let pendingState = null;
  let callbacks = {};
  let phaserSettings = {
    showTooltips: true,
    showUnitNames: true,
    showClassLabels: true,
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

  function installBattlefieldWheelPassthrough(parent) {
    const canvas = phaserGame?.canvas || parent?.querySelector?.('canvas');
    if (!canvas || canvas.dataset.wheelPassthrough === 'true') return;
    canvas.dataset.wheelPassthrough = 'true';
    canvas.addEventListener('wheel', (event) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const multiplier = event.deltaMode === 1 ? 16 : (event.deltaMode === 2 ? window.innerHeight : 1);
      const scrollingElement = document.scrollingElement || document.documentElement;
      scrollingElement.scrollBy({
        left: event.deltaX * multiplier,
        top: event.deltaY * multiplier,
        behavior: 'auto'
      });
    }, { capture: true, passive: false });
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

  function stableOffset(value, spread = 18) {
    const text = String(value || '');
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) hash = ((hash << 5) - hash) + text.charCodeAt(i);
    return ((Math.abs(hash) % (spread * 2 + 1)) - spread);
  }

  function unitStatusSummary(unit) {
    const statuses = [];
    if ((unit.shield || 0) > 0) statuses.push({ key: 'shield', label: `SHD ${Math.round(unit.shield)}` });
    if (unit.statuses?.some(status => status.type === 'burn')) statuses.push({ key: 'burn', label: 'BRN' });
    if (unit.statuses?.some(status => status.type === 'corruption')) statuses.push({ key: 'corruption', label: 'CRR' });
    return statuses.slice(0, 3);
  }

  function bossUnitsForState(gameState) {
    if (!gameState || gameState.mode !== 'battle') return [];
    return (gameState.combatUnits || [])
      .filter(unit => unit?.side === 'enemy' && unit.unitClass === 'Boss');
  }

  function primaryBossForState(gameState) {
    const bosses = bossUnitsForState(gameState);
    if (!bosses.length) return null;
    const livingBosses = bosses.filter(unit => unit.alive !== false);
    return livingBosses.find(unit => String(unit.name).includes('Kingdom That Never Healed'))
      || livingBosses[0]
      || bosses.find(unit => String(unit.name).includes('Kingdom That Never Healed'))
      || bosses[0];
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

  function spriteKeyForFile(file) {
    return `champion-sprite-${String(file).replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
  }

  function spriteInfoFor(unit) {
    if (!unit || unit.side === 'enemy') return null;
    const file = CHAMPION_SPRITE_FILES[unit.name];
    if (!file) return null;
    return {
      key: spriteKeyForFile(file),
      path: `assets/champions/${file}?v=${SPRITE_VERSION}`
    };
  }

  function spritePathFor(unit) {
    const mapped = spriteInfoFor(unit);
    if (mapped) return mapped.path;
    const safeName = String(unit.type || unit.name || 'unit').replace(/[^a-z0-9-]/gi, '').toLowerCase();
    const folder = unit.side === 'enemy'
      ? (unit.unitClass === 'Boss' ? 'bosses' : 'enemies')
      : 'champions';
    return `assets/${folder}/${safeName}.png`;
  }

  function shortName(unit) {
    const name = String(unit.name || 'Unit');
    if (name.length <= 16) return name;
    return name.slice(0, 15);
  }

  function drawPantheonMark(graphics, pantheon, x, y, scale, color, alpha) {
    graphics.fillStyle(color, alpha);
    graphics.lineStyle(Math.max(1, 2 * scale), color, alpha);
    if (pantheon === 'Hellenic') {
      graphics.fillPoints([
        { x: x - 4 * scale, y: y - 12 * scale }, { x: x + 7 * scale, y: y - 12 * scale },
        { x: x + scale, y: y - 2 * scale }, { x: x + 8 * scale, y: y - 2 * scale },
        { x: x - 7 * scale, y: y + 13 * scale }, { x: x - 2 * scale, y: y + 3 * scale },
        { x: x - 9 * scale, y: y + 3 * scale }
      ], true);
    } else if (pantheon === 'Norse') {
      graphics.lineBetween(x - 8 * scale, y - 12 * scale, x - 8 * scale, y + 12 * scale);
      graphics.lineBetween(x - 8 * scale, y - 10 * scale, x + 8 * scale, y + 10 * scale);
      graphics.lineBetween(x - 8 * scale, y + 10 * scale, x + 8 * scale, y - 10 * scale);
    } else if (pantheon === 'Egyptian') {
      graphics.strokeEllipse(x, y, 24 * scale, 13 * scale);
      graphics.fillCircle(x, y, 4 * scale);
      graphics.lineBetween(x + 11 * scale, y, x + 16 * scale, y + 5 * scale);
    } else if (pantheon === 'Celtic') {
      graphics.strokeCircle(x, y - 7 * scale, 7 * scale);
      graphics.strokeCircle(x - 7 * scale, y + 5 * scale, 7 * scale);
      graphics.strokeCircle(x + 7 * scale, y + 5 * scale, 7 * scale);
    } else if (pantheon === 'Arthurian') {
      graphics.fillTriangle(x, y - 13 * scale, x - 5 * scale, y + 5 * scale, x + 5 * scale, y + 5 * scale);
      graphics.fillRoundedRect(x - 2 * scale, y - 8 * scale, 4 * scale, 22 * scale, 2 * scale);
      graphics.lineBetween(x - 9 * scale, y + 2 * scale, x + 9 * scale, y + 2 * scale);
    } else {
      graphics.fillPoints([{ x, y: y - 12 * scale }, { x: x + 11 * scale, y }, { x, y: y + 12 * scale }, { x: x - 11 * scale, y }], true);
    }
  }

  class GameScene extends Phaser.Scene {
    constructor() {
      super('GameScene');
      this.unitViews = new Map();
      this.benchViews = new Map();
      this.unitHighlights = new Map();
      this.latestState = null;
      this.bossNameplate = null;
    }

    preload() {
      this.load.image(BACKGROUND_KEY, BACKGROUND_PATH);
      Object.values(CHAMPION_SPRITE_FILES).forEach(file => {
        this.load.image(spriteKeyForFile(file), `assets/champions/${file}?v=${SPRITE_VERSION}`);
      });
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
        tileGuide.fillStyle(fill, isEnemy || isPlayer ? 0.1 : 0.035);
        tileGuide.fillRoundedRect(origin.x, origin.y, TILE_W, TILE_H, 10);
        tileGuide.lineStyle(2, edge, isEnemy || isPlayer ? 0.32 : 0.12);
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

      this.updateBossNameplate(gameState);
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
        hoverRing: null,
        selectedRing: null,
        classBadge: null,
        sprite: null,
        spriteKey: null,
        emblem: null,
        sigil: null,
        crown: null,
        nameBack: null,
        nameText: null,
        starText: null,
        classText: null,
        statusBack: null,
        statusText: null,
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
        hovered: false,
        lastAlive: true
      };

      view.shadow = this.add.ellipse(0, 34, TOKEN_SHADOW_W, 16, 0x000000, 0.34);
      view.aura = this.add.circle(0, -8, TOKEN_RADIUS + 10, 0xffffff, 0.08);
      view.ringOuter = this.add.circle(0, -8, TOKEN_RADIUS + 3, 0x10172b, 0.98);
      view.ringInner = this.add.circle(0, -8, TOKEN_RADIUS - 5, 0x172a4a, 0.98);
      view.core = this.add.circle(0, -8, TOKEN_RADIUS - 14, 0x1b2743, 0.98);
      view.hoverRing = this.add.circle(0, -8, TOKEN_RADIUS + 13, 0xffffff, 0)
        .setStrokeStyle(3, 0xf2c96b, 0)
        .setVisible(false);
      view.selectedRing = this.add.circle(0, -8, TOKEN_RADIUS + 18, 0xf2c96b, 0)
        .setStrokeStyle(4, 0xf2c96b, 0)
        .setVisible(false);
      view.classBadge = this.add.graphics();
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
      view.statusBack = this.add.rectangle(0, STATUS_Y, 94, 18, 0x070a12, 0.7)
        .setStrokeStyle(1, 0x9ec7ff, 0.25)
        .setVisible(false);
      view.statusText = this.add.text(0, STATUS_Y - 1, '', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '10px',
        fontStyle: '900',
        color: '#dceaff',
        stroke: '#070a12',
        strokeThickness: 3
      }).setOrigin(0.5).setVisible(false);

      root.add([view.shadow, view.selectedRing, view.hoverRing, view.aura, view.ringOuter, view.ringInner, view.core, view.classBadge, view.emblem, view.sigil, view.crown, view.nameBack, view.starText, view.nameText, view.classText, view.statusBack, view.statusText]);
      this.createBars(root, view);
      this.createDefeatedOverlay(root, view);
      root.add(view.token);
      this.startPlaceholderIdle(view, unit);

      const hitW = area === 'bench' ? BENCH_SLOT_W : TILE_W;
      const hitH = area === 'bench' ? BENCH_H : TILE_H;
      view.hitZone = this.add.zone(center.x, center.y, hitW, hitH)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });
      view.hitZone.on('pointerup', () => {
        if (view.dragging) return;
        callbacks.onUnitClick?.(view.unit?.id, view.unit?.x, view.unit?.y, spriteInfoFor(view.unit)?.path || '', view.area);
      });
      view.hitZone.on('pointerover', () => {
        view.hovered = true;
        this.updateHoverSelection(view);
        this.showTooltip(view);
      });
      view.hitZone.on('pointerout', () => {
        view.hovered = false;
        this.updateHoverSelection(view);
        this.hideTooltip();
      });
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
      this.tweens.killTweensOf(view.aura);
      if (view.rarityHalo) this.tweens.killTweensOf(view.rarityHalo);
      view.aura.setScale(1).setAlpha(0.72);
      if (view.rarityHalo) view.rarityHalo.setAngle(0);

      const usesRarityHalo = unit.rarity === 'Legendary' || unit.rarity === 'Mythic' || unit.unitClass === 'Boss';
      if (usesRarityHalo && !view.rarityHalo) {
        const halo = this.add.circle(0, -8, TOKEN_RADIUS + 20, rarityColor, 0)
          .setStrokeStyle(2, rarityColor, 0.46);
        halo.setDepth(-3);
        view.root.addAt(halo, 1);
        view.rarityHalo = halo;
      }
      if (view.rarityHalo) view.rarityHalo.setVisible(usesRarityHalo);
      if (phaserSettings.reducedMotion) return;

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
      if (view.rarityHalo && usesRarityHalo) {
        this.tweens.add({
          targets: view.rarityHalo,
          angle: 360,
          duration: unit.unitClass === 'Boss' ? 2400 : 4200,
          repeat: -1,
          ease: 'Linear'
        });
      }
    }

    applyMotionPreference() {
      [...this.unitViews.values(), ...this.benchViews.values()].forEach(view => {
        if (view?.unit) this.startPlaceholderIdle(view, view.unit);
      });
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

      const pantheonColor = pantheonColors[unit.pantheon] || classColor;
      if (className === 'Boss') {
        view.sigil.fillStyle(pantheonColor, alive ? 0.92 : 0.38);
        view.sigil.lineStyle(3, accent, alive ? 0.82 : 0.24);
        view.sigil.fillTriangle(0, -42, 28, -24, 18, 13);
        view.sigil.fillTriangle(0, -42, -28, -24, -18, 13);
        view.sigil.strokeCircle(0, -12, 28);
      } else {
        drawPantheonMark(view.sigil, unit.pantheon, 0, -12, 2.05, pantheonColor, alive ? 0.92 : 0.34);
      }

      if (unit.star >= 2 || unit.rarity === 'Legendary' || unit.rarity === 'Mythic' || className === 'Boss') {
        view.crown.lineStyle(2, rarityColor, alive ? 0.74 : 0.2);
        view.crown.fillStyle(rarityColor, alive ? 0.32 : 0.08);
        view.crown.fillTriangle(-22, -53, -12, -41, -2, -53);
        view.crown.fillTriangle(2, -53, 12, -41, 22, -53);
        view.crown.strokeRoundedRect(-24, -43, 48, 7, 4);
      }
    }

    redrawPantheonBadge(view, unit, classColor, alive) {
      const badge = view.classBadge;
      const pantheonColor = pantheonColors[unit.pantheon] || classColor;
      const alpha = alive ? 0.95 : 0.28;
      badge.clear();
      badge.fillStyle(0x070a12, alive ? 0.82 : 0.42);
      badge.lineStyle(2, pantheonColor, alive ? 0.82 : 0.24);
      badge.fillCircle(-43, -43, 12);
      badge.strokeCircle(-43, -43, 12);
      drawPantheonMark(badge, unit.pantheon, -43, -43, 0.62, pantheonColor, alpha);
    }

    updateStatusBadges(view, unit, alive) {
      const statuses = alive ? unitStatusSummary(unit) : [];
      if (!statuses.length) {
        view.statusBack.setVisible(false);
        view.statusText.setVisible(false);
        return;
      }
      const label = statuses.map(status => status.label).join(' ');
      const primary = statusColors[statuses[0].key] || 0x9ec7ff;
      const width = Math.min(126, Math.max(58, label.length * 8));
      view.statusBack
        .setVisible(true)
        .setSize(width, 18)
        .setFillStyle(0x070a12, 0.78)
        .setStrokeStyle(1, primary, 0.62);
      view.statusText
        .setVisible(true)
        .setText(label)
        .setColor(hexColor(primary));
    }

    updateHoverSelection(view) {
      const unit = view.unit;
      const alive = unit?.alive !== false;
      const selected = Boolean(unit?.id && this.latestState?.selectedUnitId === unit.id);
      view.hoverRing
        .setVisible(alive && view.hovered)
        .setStrokeStyle(3, 0xf2c96b, alive && view.hovered ? 0.72 : 0);
      view.selectedRing
        .setVisible(alive && selected)
        .setStrokeStyle(4, 0xf2c96b, alive && selected ? 0.9 : 0);
    }

    showTooltip(view) {
      if (!phaserSettings.showTooltips || !view?.unit || view.dragging) return;
      this.hideTooltip();
      const unit = view.unit;
      const statusLine = unitStatusSummary(unit).map(status => status.label).join(' / ') || 'No active status';
      const lines = [
        `${unit.name} ${'*'.repeat(unit.star || 1)}`,
        `${unit.pantheon || 'Unknown'} / ${unit.sourceType || 'Unknown'} / ${unit.unitClass || unit.class || 'Unit'}`,
        `${unit.rarity || 'Common'} | HP ${Math.max(0, Math.round(unit.hp || 0))}/${Math.max(1, Math.round(unit.maxHp || 1))} | EN ${Math.round(unit.mana || 0)}/${unit.energyMax || 100}`,
        `DMG ${unit.damage} | RNG ${unit.range} | ARM ${unit.armor || 0}`,
        `Status: ${statusLine}`,
        `${unit.abilityName || 'Ability'}: ${unit.abilityText || unit.abilityDescription || 'No ability text.'}`
      ];
      const longest = lines.reduce((max, line) => Math.max(max, line.length), 0);
      const width = Math.min(440, Math.max(260, longest * 7));
      const height = 138;
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
      this.redrawPantheonBadge(view, unit, classColor, alive);
      this.updateSpriteArt(view, unit, alive);
      view.nameText
        .setText(shortName(unit))
        .setColor(alive ? '#eef4ff' : '#aab1c1')
        .setVisible(phaserSettings.showUnitNames !== false);
      view.nameBack.setVisible(phaserSettings.showUnitNames !== false);
      view.starText.setText('*'.repeat(unit.star || 1));
      view.classText
        .setText(className.toUpperCase())
        .setColor(alive ? '#9fb0ce' : '#777f91')
        .setVisible(phaserSettings.showClassLabels !== false);

      this.updateStatusBadges(view, unit, alive);
      this.updateHoverSelection(view);
      this.updateBars(view, unit);
      this.setDefeated(view, !alive);
      this.setUnitDragEnabled(view, unit);

      if (view.lastAlive && !alive && !firstDraw) this.playDeathFade(view);
      view.lastAlive = alive;
    }

    updateSpriteArt(view, unit, alive) {
      const info = spriteInfoFor(unit);
      const hasSprite = info && this.textures.exists(info.key);
      if (!hasSprite) {
        if (view.sprite) view.sprite.setVisible(false);
        view.emblem.setVisible(true);
        view.sigil.setVisible(true);
        view.crown.setVisible(true);
        return;
      }

      if (!view.sprite || view.spriteKey !== info.key) {
        if (view.sprite) view.sprite.destroy();
        view.sprite = this.add.image(0, -8, info.key).setOrigin(0.5);
        view.spriteKey = info.key;
      }
      this.placeSpriteAbovePlaceholder(view);

      const source = this.textures.get(info.key).getSourceImage();
      const sourceW = Math.max(1, source?.width || 1);
      const sourceH = Math.max(1, source?.height || 1);
      const displayH = view.area === 'bench' ? 108 : 104;
      const maxW = view.area === 'bench' ? 104 : 98;
      const displayW = Math.min(maxW, displayH * (sourceW / sourceH));
      view.sprite
        .setVisible(true)
        .setPosition(0, -15)
        .setDisplaySize(displayW, displayH)
        .setAlpha(alive ? 0.98 : 0.42)
        .setTint(alive ? 0xffffff : 0x606a7d);

      if (alive) view.sprite.clearTint();
      view.emblem.setVisible(false);
      view.sigil.setVisible(false);
      view.crown.setVisible(false);
    }

    placeSpriteAbovePlaceholder(view) {
      if (!view?.sprite || !view?.root?.list) return;
      const root = view.root;
      if (root.list.includes(view.sprite)) root.remove(view.sprite, false);
      const classBadgeIndex = root.list.indexOf(view.classBadge);
      const insertIndex = classBadgeIndex >= 0 ? classBadgeIndex : root.list.length;
      root.addAt(view.sprite, insertIndex);
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
      this.updateBossNameplate(gameState);
    }

    clearBossNameplate() {
      this.bossNameplate?.root?.destroy(true);
      this.bossNameplate = null;
    }

    createBossNameplate() {
      const width = 650;
      const root = this.add.container(INTERNAL_WIDTH / 2, 38).setDepth(90);
      const bg = this.add.graphics();
      const nameText = this.add.text(0, -15, '', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '22px',
        fontStyle: '900',
        color: '#ffe1e6',
        stroke: '#070a12',
        strokeThickness: 5,
        align: 'center',
        fixedWidth: width - 40
      }).setOrigin(0.5);
      const abilityText = this.add.text(0, 9, '', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '12px',
        fontStyle: '900',
        color: '#f2c96b',
        stroke: '#070a12',
        strokeThickness: 3,
        align: 'center',
        fixedWidth: width - 80
      }).setOrigin(0.5);
      const hpBack = this.add.rectangle(-250, 30, 500, 10, 0x12080d, 0.94).setOrigin(0, 0.5);
      const hpFill = this.add.rectangle(-250, 30, 500, 10, 0xff6f7f, 1).setOrigin(0, 0.5);
      const hpText = this.add.text(0, 30, '', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '9px',
        fontStyle: '900',
        color: '#fff6f8',
        stroke: '#070a12',
        strokeThickness: 2
      }).setOrigin(0.5);
      root.add([bg, nameText, abilityText, hpBack, hpFill, hpText]);
      this.effectLayer.add(root);
      this.bossNameplate = { root, bg, nameText, abilityText, hpBack, hpFill, hpText, width };
    }

    updateBossNameplate(gameState = this.latestState) {
      const boss = primaryBossForState(gameState);
      if (!boss || !bossUnitsForState(gameState).some(unit => unit.alive !== false)) {
        this.clearBossNameplate();
        return;
      }
      if (!this.bossNameplate) this.createBossNameplate();
      const bosses = bossUnitsForState(gameState);
      const plate = this.bossNameplate;
      const maxHp = Math.max(1, Math.round(boss.maxHp || boss.hp || 1));
      const hp = Math.max(0, Math.round(boss.hp || 0));
      const hpPct = clamp01(hp / maxHp);
      const mega = bosses.length > 1 || String(boss.name).includes('Kingdom That Never Healed');
      plate.bg.clear();
      plate.bg.fillStyle(0x070a12, 0.88);
      plate.bg.fillRoundedRect(-plate.width / 2, -34, plate.width, 82, 18);
      plate.bg.lineStyle(2, mega ? 0xff2d55 : 0xf2c96b, mega ? 0.82 : 0.62);
      plate.bg.strokeRoundedRect(-plate.width / 2, -34, plate.width, 82, 18);
      plate.bg.fillStyle(mega ? 0xff2d55 : 0xf2c96b, 0.14);
      plate.bg.fillRoundedRect((-plate.width / 2) + 8, -26, 9, 66, 4);
      plate.nameText
        .setText(`${mega ? 'SECRET MEGA BOSS' : 'BOSS'} - ${boss.name}`)
        .setColor(mega ? '#ffd4dc' : '#fff0c6');
      plate.abilityText.setText(`${boss.abilityName || 'Boss Power'}${bosses.length > 1 ? ` | Council: ${bosses.length} bosses` : ''}`);
      plate.hpFill.width = Math.max(1, 500 * hpPct);
      plate.hpFill.setFillStyle(hpPct <= 0.25 ? 0xff2d55 : 0xff6f7f, 1);
      plate.hpText.setText(`${hp}/${maxHp}`);
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

    effectPoint(view, yOffset = -8) {
      return { x: view.root.x, y: view.root.y + yOffset };
    }

    addEffectLabel(text, x, y, color = '#efe4ff', borderColor = 0xc78cff) {
      const width = Math.min(220, Math.max(92, String(text).length * 8));
      const root = this.add.container(x, y);
      const back = this.add.graphics();
      back.fillStyle(0x080b16, 0.82);
      back.fillRoundedRect(-width / 2, -15, width, 30, 14);
      back.lineStyle(1, borderColor, 0.58);
      back.strokeRoundedRect(-width / 2, -15, width, 30, 14);
      const label = this.add.text(0, -1, String(text), {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '13px',
        fontStyle: '900',
        color,
        stroke: '#070a12',
        strokeThickness: 4
      }).setOrigin(0.5);
      root.add([back, label]);
      this.effectLayer.add(root);
      this.tweens.add({
        targets: root,
        y: root.y - 22,
        alpha: 0,
        duration: 720,
        ease: 'Sine.easeOut',
        onComplete: () => root.destroy(true)
      });
    }

    burstAt(x, y, color, accent = color, count = 7, radius = 34) {
      const ring = this.add.circle(x, y, 10, color, 0)
        .setStrokeStyle(4, color, 0.72);
      const core = this.add.circle(x, y, 12, accent, 0.28);
      this.effectLayer.add([ring, core]);
      this.tweens.add({
        targets: [ring, core],
        scale: 2.2,
        alpha: 0,
        duration: 380,
        ease: 'Sine.easeOut',
        onComplete: () => {
          ring.destroy();
          core.destroy();
        }
      });

      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count;
        const spark = this.add.circle(x, y, Phaser.Math.Between(3, 5), accent, 0.86);
        this.effectLayer.add(spark);
        this.tweens.add({
          targets: spark,
          x: x + Math.cos(angle) * Phaser.Math.Between(radius * 0.55, radius),
          y: y + Math.sin(angle) * Phaser.Math.Between(radius * 0.55, radius),
          alpha: 0,
          scale: 0.42,
          duration: 360,
          ease: 'Quad.easeOut',
          onComplete: () => spark.destroy()
        });
      }
    }

    targetPulse(view, color, label = '', radius = TOKEN_RADIUS + 18) {
      if (!view) return;
      const point = this.effectPoint(view, -8);
      const ring = this.add.circle(point.x, point.y, radius * 0.72, color, 0)
        .setStrokeStyle(4, color, 0.76);
      const glow = this.add.circle(point.x, point.y, radius * 0.52, color, 0.13);
      this.effectLayer.add([glow, ring]);
      let text = null;
      if (label) {
        text = this.add.text(point.x, point.y + radius * 0.54, label, {
          fontFamily: 'Segoe UI, Arial',
          fontSize: '10px',
          fontStyle: '900',
          color: hexColor(color),
          stroke: '#070a12',
          strokeThickness: 3
        }).setOrigin(0.5);
        this.effectLayer.add(text);
      }
      this.tweens.add({
        targets: [glow, ring, text].filter(Boolean),
        scale: 1.45,
        alpha: 0,
        duration: 430,
        ease: 'Sine.easeOut',
        onComplete: () => {
          glow.destroy();
          ring.destroy();
          text?.destroy();
        }
      });
    }

    drawStrikeLine(start, end, color, width = 4, duration = 260, alpha = 0.9) {
      const line = this.add.graphics();
      line.lineStyle(width + 8, color, 0.13);
      line.beginPath();
      line.moveTo(start.x, start.y);
      line.lineTo(end.x, end.y);
      line.strokePath();
      line.lineStyle(width, color, alpha);
      line.beginPath();
      line.moveTo(start.x, start.y);
      line.lineTo(end.x, end.y);
      line.strokePath();
      this.effectLayer.add(line);
      this.tweens.add({
        targets: line,
        alpha: 0,
        duration,
        ease: 'Sine.easeOut',
        onComplete: () => line.destroy()
      });
      return line;
    }

    projectileEffect(attacker, target, color, accent = color, size = 8, delay = 0) {
      const start = this.effectPoint(attacker, -14);
      const end = this.effectPoint(target, -10);
      const orb = this.add.circle(start.x, start.y, size, color, 0.94)
        .setStrokeStyle(2, accent, 0.7);
      const trail = this.add.graphics();
      this.effectLayer.add([trail, orb]);
      this.tweens.add({
        targets: orb,
        x: end.x,
        y: end.y,
        delay,
        duration: 210,
        ease: 'Quad.easeIn',
        onUpdate: () => {
          trail.clear();
          trail.lineStyle(size + 4, color, 0.14);
          trail.beginPath();
          trail.moveTo(start.x, start.y);
          trail.lineTo(orb.x, orb.y);
          trail.strokePath();
          trail.lineStyle(Math.max(2, size - 3), accent, 0.62);
          trail.beginPath();
          trail.moveTo(start.x, start.y);
          trail.lineTo(orb.x, orb.y);
          trail.strokePath();
        },
        onComplete: () => {
          orb.destroy();
          trail.destroy();
          this.burstAt(end.x, end.y, color, accent, 5, 24);
          this.targetPulse(target, color, 'HIT', TOKEN_RADIUS + 10);
        }
      });
    }

    meleeEffect(attacker, target, color = 0xffd1a1, accent = 0xfff1c6, heavy = false) {
      const startX = attacker.root.x;
      const startY = attacker.root.y;
      const targetPoint = this.effectPoint(target, -8);
      const dx = target.root.x - startX;
      const dy = target.root.y - startY;
      const angle = Math.atan2(dy, dx);

      this.tweens.add({
        targets: attacker.root,
        x: startX + dx * 0.18,
        y: startY + dy * 0.18,
        scale: heavy ? 1.12 : 1.07,
        duration: 80,
        yoyo: true,
        ease: 'Quad.easeOut',
        onComplete: () => {
          attacker.root.setPosition(startX, startY);
          attacker.root.setScale(1);
        }
      });

      const slashLength = heavy ? TILE_W * 0.72 : TILE_W * 0.56;
      const slashA = {
        x: targetPoint.x + Math.cos(angle + Math.PI / 2) * slashLength * 0.5,
        y: targetPoint.y + Math.sin(angle + Math.PI / 2) * slashLength * 0.5
      };
      const slashB = {
        x: targetPoint.x - Math.cos(angle + Math.PI / 2) * slashLength * 0.5,
        y: targetPoint.y - Math.sin(angle + Math.PI / 2) * slashLength * 0.5
      };
      this.drawStrikeLine(slashA, slashB, color, heavy ? 7 : 4, 260);
      this.drawStrikeLine(
        { x: slashA.x - Math.cos(angle) * 10, y: slashA.y - Math.sin(angle) * 10 },
        { x: slashB.x + Math.cos(angle) * 10, y: slashB.y + Math.sin(angle) * 10 },
        accent,
        heavy ? 3 : 2,
        210,
        0.78
      );
      this.burstAt(targetPoint.x, targetPoint.y, color, accent, heavy ? 8 : 5, heavy ? 36 : 24);
      this.targetPulse(target, color, heavy ? 'SMASH' : 'HIT', TOKEN_RADIUS + 12);
    }

    shieldAbility(view, abilityName) {
      const point = this.effectPoint(view, -8);
      this.flashUnit(view.unit.id, 0x9ec7ff, 1.12);
      const dome = this.add.circle(point.x, point.y, TOKEN_RADIUS + 12, 0x9ec7ff, 0.12)
        .setStrokeStyle(5, 0x9ec7ff, 0.72);
      const ward = this.add.rectangle(point.x, point.y + 8, TOKEN_RADIUS * 1.45, TOKEN_RADIUS * 1.05, 0x2c68ff, 0.12)
        .setStrokeStyle(2, 0xd8e7ff, 0.76);
      this.effectLayer.add([dome, ward]);
      this.addEffectLabel(abilityName, point.x, point.y - 68, '#dceaff', 0x9ec7ff);
      this.targetPulse(view, 0x9ec7ff, 'SHIELD', TOKEN_RADIUS + 18);
      this.tweens.add({
        targets: [dome, ward],
        scale: 1.55,
        alpha: 0,
        duration: 620,
        ease: 'Sine.easeOut',
        onComplete: () => {
          dome.destroy();
          ward.destroy();
        }
      });
    }

    healAbility(caster, target, abilityName) {
      const start = this.effectPoint(caster, -14);
      const end = this.effectPoint(target, -12);
      this.drawStrikeLine(start, end, 0x7ff2b2, 6, 420, 0.72);
      this.drawStrikeLine(start, end, 0xf2e9a8, 2, 420, 0.88);
      this.burstAt(end.x, end.y, 0x7ff2b2, 0xf2e9a8, 9, 38);
      this.targetPulse(target, 0x7ff2b2, 'HEAL', TOKEN_RADIUS + 16);
      this.addEffectLabel(abilityName, end.x, end.y - 64, '#dfffee', 0x7ff2b2);
      this.flashUnit(target.unit.id, 0x7ff2b2, 1.08);
    }

    magicAbility(caster, target, abilityName, large = false) {
      const point = this.effectPoint(target, -10);
      const color = 0xc78cff;
      const accent = 0x73a7ff;
      this.flashUnit(caster.unit.id, color, 1.12);
      const rune = this.add.circle(point.x, point.y, large ? 38 : 28, color, 0)
        .setStrokeStyle(4, color, 0.82);
      const crossA = this.add.rectangle(point.x, point.y, large ? 90 : 66, 4, accent, 0.72).setRotation(0.78);
      const crossB = this.add.rectangle(point.x, point.y, large ? 90 : 66, 4, accent, 0.72).setRotation(-0.78);
      this.effectLayer.add([rune, crossA, crossB]);
      this.addEffectLabel(abilityName, point.x, point.y - 70, '#efe4ff', color);
      this.tweens.add({
        targets: [rune, crossA, crossB],
        angle: '+=90',
        scale: large ? 1.75 : 1.45,
        alpha: 0,
        duration: 520,
        ease: 'Sine.easeOut',
        onComplete: () => {
          rune.destroy();
          crossA.destroy();
          crossB.destroy();
        }
      });
      this.burstAt(point.x, point.y, color, accent, large ? 12 : 8, large ? 48 : 32);
      this.targetPulse(target, color, large ? 'BURST' : 'SPELL', large ? TOKEN_RADIUS + 24 : TOKEN_RADIUS + 12);
    }

    abilityEffect(unitId, abilityName = 'Ability', targetId = null, abilityType = 'strike') {
      const caster = this.findUnitView(unitId);
      const target = this.findUnitView(targetId) || caster;
      if (!caster || !target) return;
      if (phaserSettings.reducedMotion) return;

      switch (abilityType) {
        case 'shield':
          this.shieldAbility(caster, abilityName);
          break;
        case 'heal':
          this.healAbility(caster, target, abilityName);
          break;
        case 'rapid':
          this.projectileEffect(caster, target, 0x9ff2a8, 0xf2c96b, 7, 0);
          this.projectileEffect(caster, target, 0x9ff2a8, 0xf2c96b, 7, 85);
          this.addEffectLabel(abilityName, target.root.x, target.root.y - 72, '#eaffd8', 0x9ff2a8);
          break;
        case 'aoe':
          this.magicAbility(caster, target, abilityName, true);
          break;
        case 'crit':
          this.meleeEffect(caster, target, 0xffa24f, 0x2a1120, true);
          this.addEffectLabel(abilityName, target.root.x, target.root.y - 72, '#ffe0c0', 0xffa24f);
          break;
        case 'cleave':
        case 'frenzy':
          this.meleeEffect(caster, target, 0xff6f7f, 0xf2c96b, true);
          this.addEffectLabel(abilityName, target.root.x, target.root.y - 72, '#ffd9df', 0xff6f7f);
          break;
        case 'healer-strike':
          this.projectileEffect(caster, target, 0xf2e9a8, 0x7ff2b2, 9);
          this.addEffectLabel(abilityName, target.root.x, target.root.y - 72, '#fff6c8', 0xf2e9a8);
          break;
        default:
          this.magicAbility(caster, target, abilityName, false);
      }
    }

    attackEffect(attackerId, targetId) {
      const attacker = this.findUnitView(attackerId);
      const target = this.findUnitView(targetId);
      if (!attacker || !target) return;
      if (phaserSettings.reducedMotion) return;

      const className = attacker.unit?.unitClass || attacker.unit?.class || 'Unit';
      const range = attacker.unit?.range || 1;
      if (className === 'Ranger') {
        this.projectileEffect(attacker, target, 0x9ff2a8, 0xf2c96b, 7);
      } else if (className === 'Mage') {
        this.projectileEffect(attacker, target, 0xc78cff, 0x73a7ff, 9);
      } else if (className === 'Healer') {
        this.projectileEffect(attacker, target, 0xf2e9a8, 0x7ff2b2, 7);
      } else if (range > 1) {
        this.projectileEffect(attacker, target, 0x73a7ff, 0xd8e7ff, 7);
      } else {
        const heavy = className === 'Bruiser' || className === 'Guardian' || className === 'Boss';
        const color = className === 'Assassin' ? 0xffa24f : className === 'Boss' ? 0xff6f7f : 0xffd1a1;
        const accent = className === 'Assassin' ? 0x2a1120 : 0xfff1c6;
        this.meleeEffect(attacker, target, color, accent, heavy);
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
      const spreadX = stableOffset(`${unitId}:${displayText}`, 16);
      const root = this.add.container(view.root.x + spreadX, view.root.y - TILE_H * 0.42);
      const back = this.add.graphics();
      back.fillStyle(0x070a12, 0.72);
      back.fillRoundedRect(-width / 2, -3, width, 31, 13);
      back.lineStyle(1, popupColorInt, 0.5);
      back.strokeRoundedRect(-width / 2, -3, width, 31, 13);
      const marker = this.add.rectangle((-width / 2) + 5, 12, 5, 23, popupColorInt, 0.95)
        .setOrigin(0.5);
      const label = this.add.text(0, 0, displayText, {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '22px',
        fontStyle: '900',
        color: popupColor,
        stroke: '#070a12',
        strokeThickness: 5
      }).setOrigin(0.5);
      root.add([back, marker, label]);
      this.effectLayer.add(root);
      if (displayText.toLowerCase().includes('dodge')) {
        this.targetPulse(view, 0xd8c2ff, 'DODGE', TOKEN_RADIUS + 18);
      } else if (popupColor === '#7ff2b2' || displayText.startsWith('+')) {
        this.targetPulse(view, 0x7ff2b2, 'HEAL', TOKEN_RADIUS + 12);
      } else if (popupColor === '#9ec7ff' || displayText.toLowerCase().includes('shield')) {
        this.targetPulse(view, 0x9ec7ff, 'SHIELD', TOKEN_RADIUS + 12);
      }
      this.tweens.add({
        targets: root,
        y: root.y - 38,
        x: view.root.x + spreadX * 0.35,
        alpha: 0,
        scale: 1.12,
        duration: 780,
        ease: 'Sine.easeOut',
        onComplete: () => root.destroy(true)
      });
    }

    bossIntroCard(meta = {}) {
      const mega = Boolean(meta?.mega);
      const width = 720;
      const root = this.add.container(INTERNAL_WIDTH / 2, INTERNAL_HEIGHT * 0.22).setDepth(120);
      const bg = this.add.graphics();
      bg.fillStyle(0x070a12, 0.94);
      bg.fillRoundedRect(-width / 2, -88, width, 176, 22);
      bg.lineStyle(3, mega ? 0xff2d55 : 0xf2c96b, 0.86);
      bg.strokeRoundedRect(-width / 2, -88, width, 176, 22);
      bg.fillStyle(mega ? 0xff2d55 : 0xf2c96b, 0.16);
      bg.fillRoundedRect((-width / 2) + 12, -74, 12, 148, 6);

      const title = this.add.text(0, -58, meta.title || (mega ? 'Secret Mega Boss' : 'Boss Encounter'), {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '18px',
        fontStyle: '900',
        color: mega ? '#ff9aa6' : '#f2c96b',
        stroke: '#070a12',
        strokeThickness: 5,
        align: 'center',
        fixedWidth: width - 52
      }).setOrigin(0.5);
      const bossName = this.add.text(0, -24, meta.bossName || 'Boss Awakened', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '30px',
        fontStyle: '900',
        color: '#fff6f8',
        stroke: '#070a12',
        strokeThickness: 6,
        align: 'center',
        fixedWidth: width - 60
      }).setOrigin(0.5);
      const ability = this.add.text(0, 13, `Signature: ${meta.abilityName || 'Unknown Power'}`, {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '15px',
        fontStyle: '900',
        color: '#ffe3a8',
        stroke: '#070a12',
        strokeThickness: 4,
        align: 'center',
        fixedWidth: width - 72
      }).setOrigin(0.5);
      const threat = this.add.text(0, 45, meta.threat || meta.subtitle || 'A milestone enemy enters the arena.', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '13px',
        fontStyle: '800',
        color: '#dce7ff',
        stroke: '#070a12',
        strokeThickness: 3,
        align: 'center',
        fixedWidth: width - 92,
        wordWrap: { width: width - 92, useAdvancedWrap: true }
      }).setOrigin(0.5);

      root.add([bg, title, bossName, ability, threat]);
      this.effectLayer.add(root);
      if (!phaserSettings.reducedMotion) {
        root.setScale(0.92);
        this.tweens.add({
          targets: root,
          scale: 1,
          duration: 260,
          ease: 'Back.easeOut'
        });
      }
      this.tweens.add({
        targets: root,
        alpha: 0,
        y: root.y - (phaserSettings.reducedMotion ? 0 : 28),
        delay: phaserSettings.reducedMotion ? 1700 : 2300,
        duration: phaserSettings.reducedMotion ? 180 : 520,
        ease: 'Sine.easeOut',
        onComplete: () => root.destroy(true)
      });
    }

    bossAbilityWarning(unitId, abilityName = 'Boss Power', targetId = null, abilityType = 'aoe') {
      if (phaserSettings.reducedMotion) return;
      const caster = this.findUnitView(unitId);
      const target = this.findUnitView(targetId) || caster;
      if (!caster || !target) return;
      const point = this.effectPoint(target, -8);
      const radius = abilityType === 'aoe' ? TILE_W * 1.08 : TOKEN_RADIUS + 42;
      const warning = this.add.circle(point.x, point.y, radius * 0.42, 0xff2d55, 0.08)
        .setStrokeStyle(5, 0xff2d55, 0.9);
      const inner = this.add.circle(point.x, point.y, Math.max(TOKEN_RADIUS + 12, radius * 0.25), 0xf2c96b, 0)
        .setStrokeStyle(2, 0xf2c96b, 0.78);
      const line = this.drawStrikeLine(this.effectPoint(caster, -14), point, 0xff2d55, 3, 520, 0.58);
      const label = this.add.text(point.x, point.y - radius * 0.48, `WARNING: ${abilityName}`, {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '14px',
        fontStyle: '900',
        color: '#ffced5',
        stroke: '#070a12',
        strokeThickness: 4,
        align: 'center',
        fixedWidth: 260
      }).setOrigin(0.5);
      this.effectLayer.add([warning, inner, label]);
      this.cameras.main.shake(180, 0.003);
      this.flashUnit(unitId, 0xff2d55, 1.16);
      this.tweens.add({
        targets: [warning, inner],
        scale: 1.34,
        alpha: 0,
        duration: 620,
        ease: 'Sine.easeOut',
        onComplete: () => {
          warning.destroy();
          inner.destroy();
        }
      });
      this.tweens.add({
        targets: label,
        y: label.y - 18,
        alpha: 0,
        duration: 650,
        ease: 'Sine.easeOut',
        onComplete: () => label.destroy()
      });
      return line;
    }

    bossFlash(meta = {}) {
      this.bossIntroCard(meta);
      const flash = this.add.rectangle(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT, 0xff6f7f, phaserSettings.reducedMotion ? 0.08 : 0.24).setOrigin(0);
      const warning = this.add.text(INTERNAL_WIDTH / 2, INTERNAL_HEIGHT * 0.16, meta?.mega ? 'SECRET MEGA BOSS AWAKENS' : 'BOSS ENTERS THE ARENA', {
        fontFamily: 'Segoe UI, Arial',
        fontSize: '36px',
        fontStyle: '900',
        color: meta?.mega ? '#ffced5' : '#ffe3a8',
        stroke: '#070a12',
        strokeThickness: 6
      }).setOrigin(0.5);
      this.effectLayer.add([flash, warning]);
      if (!phaserSettings.reducedMotion) this.cameras.main.shake(520, 0.006);
      this.tweens.add({
        targets: flash,
        alpha: 0,
        duration: phaserSettings.reducedMotion ? 420 : 950,
        onComplete: () => flash.destroy()
      });
      this.tweens.add({
        targets: warning,
        y: warning.y - (phaserSettings.reducedMotion ? 0 : 22),
        alpha: 0,
        duration: phaserSettings.reducedMotion ? 620 : 1050,
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
      input: {
        mouse: {
          preventDefaultWheel: false
        }
      },
      scene: GameScene
    });
    installBattlefieldWheelPassthrough(parent);
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

  function playAbilityEffect(unitId, abilityName = 'Ability', targetId = null, abilityType = 'strike') {
    boardScene?.abilityEffect(unitId, abilityName, targetId, abilityType);
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

  function playBossIntroEffect(meta = {}) {
    boardScene?.bossFlash(meta);
  }

  function playBossAbilityWarning(unitId, abilityName = 'Boss Power', targetId = null, abilityType = 'aoe') {
    boardScene?.bossAbilityWarning(unitId, abilityName, targetId, abilityType);
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
    const previousReducedMotion = phaserSettings.reducedMotion;
    phaserSettings = { ...phaserSettings, ...nextSettings };
    if (boardScene && previousGridOverlay !== phaserSettings.gridOverlay) {
      boardScene.drawGrid();
    }
    if (boardScene?.latestState) boardScene.refresh(boardScene.latestState);
    if (boardScene && previousReducedMotion !== phaserSettings.reducedMotion) boardScene.applyMotionPreference();
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
  window.playBossAbilityWarning = playBossAbilityWarning;
  window.beginPhaserBoardDrag = beginPhaserBoardDrag;
  window.previewPhaserBoardDrop = previewPhaserBoardDrop;
  window.endPhaserBoardDrag = endPhaserBoardDrag;
  window.flashInvalidPhaserDrop = flashInvalidPhaserDrop;
  window.highlightUnitsByIds = highlightUnitsByIds;
  window.clearUnitHighlights = clearUnitHighlights;
  window.setPhaserSettings = setPhaserSettings;
})();
