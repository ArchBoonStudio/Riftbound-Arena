const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RUNS = Math.max(1, Number.parseInt(process.argv[2] || '20', 10));
const SEED = Number.parseInt(process.argv[3] || '20260617', 10);
const COMPACT = process.argv.includes('--compact');
const ROOT = path.resolve(__dirname, '..');

function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

class MockClassList {
  constructor() { this.values = new Set(); }
  add(...names) { names.forEach(name => this.values.add(name)); }
  remove(...names) { names.forEach(name => this.values.delete(name)); }
  contains(name) { return this.values.has(name); }
  toggle(name, force) {
    const enabled = force === undefined ? !this.values.has(name) : Boolean(force);
    if (enabled) this.values.add(name);
    else this.values.delete(name);
    return enabled;
  }
}

class MockElement {
  constructor(tagName = 'div') {
    this.tagName = String(tagName).toUpperCase();
    this.children = [];
    this.dataset = {};
    this.style = { setProperty() {} };
    this.classList = new MockClassList();
    this.innerHTML = '';
    this.textContent = '';
    this.disabled = false;
    this.checked = false;
    this.value = '';
  }
  appendChild(child) { this.children.push(child); return child; }
  append(...children) { this.children.push(...children); }
  prepend(child) { this.children.unshift(child); return child; }
  remove() {}
  addEventListener() {}
  setAttribute() {}
  focus() {}
  contains() { return false; }
  closest() { return this; }
  querySelector() { return new MockElement(); }
  querySelectorAll() { return []; }
  getBoundingClientRect() { return { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 }; }
  get firstElementChild() { return this.children[0] || null; }
}

function createSandbox(seed) {
  const elements = new Map();
  const storage = new Map();
  const randomMath = Object.create(Math);
  randomMath.random = mulberry32(seed);
  const document = {
    body: new MockElement('body'),
    documentElement: new MockElement('html'),
    fullscreenElement: null,
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, new MockElement());
      return elements.get(id);
    },
    createElement(tagName) { return new MockElement(tagName); },
    querySelector() { return new MockElement(); },
    querySelectorAll() { return []; },
    addEventListener() {},
    elementFromPoint() { return null; },
    exitFullscreen() {}
  };
  document.documentElement.requestFullscreen = () => Promise.resolve();
  const localStorage = {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); },
    removeItem(key) { storage.delete(key); }
  };
  const window = {
    document,
    localStorage,
    confirm: () => true,
    addEventListener() {},
    innerHeight: 1000,
    RIFTBOUND_PHASER_READY: false
  };
  return vm.createContext({
    console,
    window,
    document,
    localStorage,
    Math: randomMath,
    Date,
    JSON,
    Object,
    Array,
    Set,
    Map,
    String,
    Number,
    Boolean,
    RegExp,
    Promise,
    parseInt,
    parseFloat,
    isFinite,
    setInterval: () => 0,
    clearInterval() {},
    setTimeout: (callback) => { callback(); return 0; },
    clearTimeout() {}
  });
}

const simulationDriver = `
render = function () {};
renderBattlefield = function () {};
renderShop = function () {};
renderBench = function () {};
renderSynergies = function () {};
renderEnemyPreview = function () {};
renderCombatRecap = function () {};
renderRelics = function () {};
renderCodex = function () {};
showFeedback = function () {};
log = function () {};
startCombatTicker = function () {};
updateBattleClock = function () { return true; };

function simRarityRank(rarity) {
  return { Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Legendary: 5, Mythic: 6 }[rarity] || 1;
}

function simUnitPower(unit, preferredPantheon) {
  const frontline = unit.unitClass === 'Guardian' || unit.unitClass === 'Bruiser';
  const roleBonus = frontline ? 18 : unit.unitClass === 'Healer' ? 16 : 12;
  const pantheonBonus = unit.pantheon === preferredPantheon ? 32 : 0;
  const starBonus = (unit.star || 1) === 3 ? 240 : (unit.star || 1) === 2 ? 105 : 0;
  return starBonus
    + simRarityRank(unit.rarity) * 31
    + Math.sqrt(Math.max(1, unit.maxHp || unit.hp || 1)) * 2.4
    + Math.max(1, unit.damage || 1) * 1.6
    + (unit.armor || 0) * 2.1
    + roleBonus
    + pantheonBonus;
}

function simDominantPantheon() {
  const counts = {};
  getOwnedUnits().forEach(unit => { counts[unit.pantheon] = (counts[unit.pantheon] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Hellenic';
}

function simRelicChoice(choices) {
  const owned = getOwnedUnits();
  const pantheon = simDominantPantheon();
  const classes = owned.reduce((counts, unit) => {
    counts[unit.unitClass] = (counts[unit.unitClass] || 0) + 1;
    return counts;
  }, {});
  const scores = {
    'Aegis Shard': (classes.Guardian || 0) * 4 + (pantheon === 'Arthurian' ? 8 : 0),
    'Thunder Seed': (classes.Mage || 0) * 4 + owned.filter(unit => unit.sourceType === 'Empyrean').length,
    'Valkyrie Horn': (pantheon === 'Norse' ? 10 : 0),
    'Ankh of Return': (classes.Healer || 0) * 5 + (pantheon === 'Egyptian' ? 8 : 0),
    'Fae Briar': (pantheon === 'Celtic' ? 10 : 0),
    'Black Grail': owned.filter(unit => unit.sourceType === 'Wyrdbound').length * 5,
    'Sun-Forged Spear': (classes.Ranger || 0) * 5,
    'Wyrd-Iron Crown': (classes.Bruiser || 0) * 5
  };
  return choices.slice().sort((a, b) => (scores[b.label] || 0) - (scores[a.label] || 0))[0] || choices[0];
}

showModal = function (title, body, choices = []) {
  if (!choices.length) return;
  const choice = title.includes('First Champion') ? choices[0] : simRelicChoice(choices);
  choice?.action?.();
};

function simReserveForInterest() {
  if (state.round <= 3) return 0;
  if (state.round <= 7) return 10;
  if (state.round <= 12) return 20;
  return 30;
}

let simAttemptCounts = {};

function simArrangeBoard(preferredPantheon) {
  const owned = getOwnedUnits().slice().sort((a, b) => simUnitPower(b, preferredPantheon) - simUnitPower(a, preferredPantheon));
  const selected = owned.slice(0, state.activeUnitCap);
  const selectedIds = new Set(selected.map(unit => unit.id));
  const reserves = owned.filter(unit => !selectedIds.has(unit.id)).slice(0, BENCH_CAP);
  const front = selected.filter(unit => unit.unitClass === 'Guardian' || unit.unitClass === 'Bruiser');
  const back = selected.filter(unit => !front.includes(unit));
  const frontSlots = [[3, 4], [4, 4], [2, 4], [5, 4], [1, 4], [6, 4], [0, 4], [7, 4]];
  const backSlots = [[3, 5], [4, 5], [2, 5], [5, 5], [1, 5], [6, 5], [0, 5], [7, 5]];
  const ordered = [...front, ...back];
  const used = new Set();
  state.board = {};
  ordered.forEach((unit, index) => {
    const pool = index < front.length ? frontSlots : backSlots;
    let slot = pool.find(candidate => !used.has(candidate.join(',')));
    if (!slot) slot = [...frontSlots, ...backSlots].find(candidate => !used.has(candidate.join(',')));
    if (!slot) return;
    used.add(slot.join(','));
    unit.x = slot[0];
    unit.y = slot[1];
    state.board[slot.join(',')] = unit;
  });
  state.bench = Array.from({ length: BENCH_CAP }, (_, index) => {
    const unit = reserves[index] || null;
    if (unit) { delete unit.x; delete unit.y; }
    return unit;
  });
}

function simSellWeakest(preferredPantheon) {
  const benchUnits = state.bench.filter(Boolean);
  if (!benchUnits.length) return false;
  const weakest = benchUnits.slice().sort((a, b) => simUnitPower(a, preferredPantheon) - simUnitPower(b, preferredPantheon))[0];
  return sellUnit(weakest.id, { skipConfirm: true });
}

function simPurchaseScore(item, preferredPantheon) {
  const copies = getOwnedUnits().filter(unit => unit.type === item.type && unit.star < 3).length;
  const samePantheon = item.pantheon === preferredPantheon;
  const roleNeed = !getOwnedUnits().some(unit => unit.unitClass === item.class);
  const worshiperEarly = item.sourceType === 'Worshiper' && state.round <= 5;
  return copies * 80
    + (samePantheon ? 60 : 0)
    + (roleNeed ? 22 : 0)
    + (worshiperEarly ? 20 : 0)
    + simRarityRank(item.rarity) * 18
    - item.cost * 3;
}

function simShopPass(preferredPantheon) {
  const reserve = simReserveForInterest();
  const offers = state.shop.slice().sort((a, b) => simPurchaseScore(b, preferredPantheon) - simPurchaseScore(a, preferredPantheon));
  offers.forEach(item => {
    const score = simPurchaseScore(item, preferredPantheon);
    const duplicate = getOwnedUnits().some(unit => unit.type === item.type && unit.star < 3);
    const shouldBuy = duplicate || item.pantheon === preferredPantheon || score >= 92 || getOwnedUnits().length < Math.min(8, state.round + 2);
    if (!shouldBuy || state.gold < item.cost) return;
    if (!duplicate && state.gold - item.cost < reserve && getOwnedUnits().length >= 6) return;
    if (getBenchCount() >= BENCH_CAP && !purchaseWouldCombine(item.type)) simSellWeakest(preferredPantheon);
    buyUnit(item);
  });
}

function simPlanRound(preferredPantheon) {
  const previousAttempts = simAttemptCounts[state.round] || 0;
  simAttemptCounts[state.round] = previousAttempts + 1;
  simArrangeBoard(preferredPantheon);
  simShopPass(preferredPantheon);
  const retrying = previousAttempts > 0;
  const reserve = retrying ? 10 : simReserveForInterest();
  const maxRerolls = retrying ? 6 : state.round >= 15 ? 5 : state.round >= 8 ? 3 : 2;
  for (let i = 0; i < maxRerolls; i += 1) {
    if (state.gold < reserve + 5) break;
    rollShop(false);
    simShopPass(preferredPantheon);
  }
  combineAllUnits();
  simArrangeBoard(preferredPantheon);
}

function simResolveFight() {
  const attemptedRound = state.round;
  const goldBefore = state.gold;
  const hpBefore = state.playerHp;
  startBattle();
  let ticks = 0;
  while (state.mode === 'battle' && ticks < 700) {
    combatTick();
    ticks += 1;
  }
  let forcedTiebreak = false;
  if (state.mode === 'battle') {
    forcedTiebreak = true;
    const livingPlayers = state.combatUnits.filter(unit => unit.side === 'player' && unit.alive);
    const livingEnemies = state.combatUnits.filter(unit => unit.side === 'enemy' && unit.alive);
    const playerHp = livingPlayers.reduce((sum, unit) => sum + Math.max(0, unit.hp), 0);
    const enemyHp = livingEnemies.reduce((sum, unit) => sum + Math.max(0, unit.hp), 0);
    const playerWon = livingPlayers.length !== livingEnemies.length
      ? livingPlayers.length > livingEnemies.length
      : playerHp >= enemyHp;
    endBattle(playerWon);
  }
  const won = state.runComplete || state.round > attemptedRound;
  return {
    round: attemptedRound,
    won,
    ticks,
    forcedTiebreak,
    hpBefore,
    hpAfter: state.playerHp,
    goldBefore,
    goldAfter: state.gold
  };
}

function simTeamSnapshot(preferredPantheon) {
  const team = Object.values(state.board);
  return {
    size: team.length,
    stars: team.reduce((counts, unit) => {
      counts[unit.star] = (counts[unit.star] || 0) + 1;
      return counts;
    }, {}),
    pantheons: team.reduce((counts, unit) => {
      counts[unit.pantheon] = (counts[unit.pantheon] || 0) + 1;
      return counts;
    }, {}),
    preferredPantheon,
    power: Math.round(team.reduce((sum, unit) => sum + simUnitPower(unit, preferredPantheon), 0))
  };
}

function simulateRuns(runCount) {
  const results = [];
  for (let run = 1; run <= runCount; run += 1) {
    init();
    simAttemptCounts = {};
    const starter = getOwnedUnits()[0];
    const preferredPantheon = starter?.pantheon || 'Hellenic';
    const fights = [];
    const roundWins = {};
    const roundLosses = {};
    let safety = 0;
    let maxRoundReached = 1;
    while (!state.runComplete && state.playerHp > 0 && safety < 90) {
      safety += 1;
      maxRoundReached = Math.max(maxRoundReached, state.round);
      simPlanRound(preferredPantheon);
      const result = simResolveFight();
      fights.push(result);
      if (result.won) roundWins[result.round] = (roundWins[result.round] || 0) + 1;
      else roundLosses[result.round] = (roundLosses[result.round] || 0) + 1;
    }
    results.push({
      run,
      cleared: state.runComplete,
      maxRoundReached,
      finalRound: state.round,
      finalHp: state.playerHp,
      finalGold: state.gold,
      relics: [...state.relics],
      fights,
      roundWins,
      roundLosses,
      finalTeam: simTeamSnapshot(preferredPantheon)
    });
  }
  return results;
}

simulateRuns(${RUNS});
`;

const context = createSandbox(SEED);
const gameSource = fs.readFileSync(path.join(ROOT, 'game.js'), 'utf8');
vm.runInContext(gameSource, context, { filename: 'game.js' });
const results = vm.runInContext(simulationDriver, context, { filename: 'simulation-driver.js' });

const summary = {
  runs: RUNS,
  seed: SEED,
  clears: results.filter(run => run.cleared).length,
  averageMaxRound: results.reduce((sum, run) => sum + run.maxRoundReached, 0) / results.length,
  averageFinalGold: results.reduce((sum, run) => sum + run.finalGold, 0) / results.length,
  averageFinalHp: results.reduce((sum, run) => sum + Math.max(0, run.finalHp), 0) / results.length,
  averageFinalTeamPower: results.reduce((sum, run) => sum + run.finalTeam.power, 0) / results.length,
  averageFinalTeamSize: results.reduce((sum, run) => sum + run.finalTeam.size, 0) / results.length,
  averageStars: {
    one: results.reduce((sum, run) => sum + (run.finalTeam.stars[1] || 0), 0) / results.length,
    two: results.reduce((sum, run) => sum + (run.finalTeam.stars[2] || 0), 0) / results.length,
    three: results.reduce((sum, run) => sum + (run.finalTeam.stars[3] || 0), 0) / results.length
  },
  forcedTiebreaks: results.flatMap(run => run.fights).filter(fight => fight.forcedTiebreak).length,
  failureRounds: {},
  roundAttempts: {},
  roundWins: {},
  runResults: results
};

results.forEach(run => {
  if (!run.cleared) summary.failureRounds[run.finalRound] = (summary.failureRounds[run.finalRound] || 0) + 1;
  run.fights.forEach(fight => {
    summary.roundAttempts[fight.round] = (summary.roundAttempts[fight.round] || 0) + 1;
    if (fight.won) summary.roundWins[fight.round] = (summary.roundWins[fight.round] || 0) + 1;
  });
});

summary.roundRates = Array.from({ length: 21 }, (_, index) => {
  const round = index + 1;
  const attempts = summary.roundAttempts[round] || 0;
  const wins = summary.roundWins[round] || 0;
  return {
    round,
    attempts,
    wins,
    winRate: attempts ? Math.round((wins / attempts) * 1000) / 10 : null
  };
});

summary.pantheonResults = Object.values(results.reduce((groups, run) => {
  const key = run.finalTeam.preferredPantheon;
  if (!groups[key]) groups[key] = { pantheon: key, runs: 0, clears: 0, totalMaxRound: 0, totalPower: 0 };
  groups[key].runs += 1;
  groups[key].clears += run.cleared ? 1 : 0;
  groups[key].totalMaxRound += run.maxRoundReached;
  groups[key].totalPower += run.finalTeam.power;
  return groups;
}, {})).map(group => ({
  pantheon: group.pantheon,
  runs: group.runs,
  clears: group.clears,
  averageMaxRound: Math.round((group.totalMaxRound / group.runs) * 100) / 100,
  averagePower: Math.round(group.totalPower / group.runs)
}));

if (COMPACT) {
  summary.runResults = results.map(run => ({
    run: run.run,
    cleared: run.cleared,
    maxRound: run.maxRoundReached,
    finalRound: run.finalRound,
    finalHp: run.finalHp,
    finalGold: run.finalGold,
    relics: run.relics,
    fights: run.fights.length,
    preferredPantheon: run.finalTeam.preferredPantheon,
    teamSize: run.finalTeam.size,
    stars: run.finalTeam.stars,
    power: run.finalTeam.power
  }));
}

process.stdout.write(JSON.stringify(summary, null, 2));
