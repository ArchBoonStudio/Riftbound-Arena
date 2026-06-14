const LEGACY_UNIT_LIBRARY = [
  {
    type: 'iron-vanguard', name: 'Iron Vanguard', icon: '🛡️', cost: 3, faction: 'Iron Legion', unitClass: 'Guardian',
    hp: 180, damage: 16, speed: 1080, range: 1, armor: 8,
    abilityName: 'Shield Wall', ability: 'shield', abilityText: 'Gains a large shield when mana is full.'
  },
  {
    type: 'steel-pike', name: 'Steel Pikeguard', icon: '⚔️', cost: 2, faction: 'Iron Legion', unitClass: 'Bruiser',
    hp: 145, damage: 21, speed: 980, range: 1, armor: 5,
    abilityName: 'Linebreaker', ability: 'cleave', abilityText: 'Strikes the target and nearby enemies.'
  },
  {
    type: 'ember-pyromancer', name: 'Ember Pyromancer', icon: '🔥', cost: 4, faction: 'Emberborn', unitClass: 'Mage',
    hp: 82, damage: 31, speed: 1240, range: 3, armor: 1,
    abilityName: 'Fire Bloom', ability: 'aoe', abilityText: 'Explodes fire around the target.'
  },
  {
    type: 'ember-slinger', name: 'Ember Slinger', icon: '🏹', cost: 2, faction: 'Emberborn', unitClass: 'Ranger',
    hp: 92, damage: 22, speed: 860, range: 3, armor: 2,
    abilityName: 'Rapid Cinders', ability: 'rapid', abilityText: 'Fires two quick flaming shots.'
  },
  {
    type: 'grave-beast', name: 'Grave Beast', icon: '🐺', cost: 2, faction: 'Graveborn', unitClass: 'Bruiser',
    hp: 150, damage: 20, speed: 960, range: 1, armor: 4,
    abilityName: 'Frenzy', ability: 'frenzy', abilityText: 'Deals more damage while wounded.'
  },
  {
    type: 'bone-acolyte', name: 'Bone Acolyte', icon: '💀', cost: 3, faction: 'Graveborn', unitClass: 'Healer',
    hp: 105, damage: 14, speed: 1120, range: 2, armor: 3,
    abilityName: 'Grave Mend', ability: 'heal', abilityText: 'Heals the lowest-health ally.'
  },
  {
    type: 'fae-archer', name: 'Fae Archer', icon: '🌙', cost: 2, faction: 'Wild Fae', unitClass: 'Ranger',
    hp: 88, damage: 24, speed: 830, range: 3, armor: 1,
    abilityName: 'Moon Volley', ability: 'rapid', abilityText: 'Fires two quick moonlit shots.'
  },
  {
    type: 'thornblade', name: 'Thornblade Rogue', icon: '🗡️', cost: 3, faction: 'Wild Fae', unitClass: 'Assassin',
    hp: 92, damage: 32, speed: 780, range: 1, armor: 2,
    abilityName: 'Backstab', ability: 'crit', abilityText: 'Deals a heavy critical strike.'
  },
  {
    type: 'arcane-cleric', name: 'Arcane Cleric', icon: '✨', cost: 3, faction: 'Arcane Order', unitClass: 'Healer',
    hp: 112, damage: 13, speed: 1100, range: 2, armor: 3,
    abilityName: 'Mend', ability: 'heal', abilityText: 'Heals the lowest-health ally.'
  },
  {
    type: 'rift-mage', name: 'Rift Mage', icon: '🔮', cost: 4, faction: 'Arcane Order', unitClass: 'Mage',
    hp: 90, damage: 28, speed: 1180, range: 3, armor: 1,
    abilityName: 'Rift Burst', ability: 'aoe', abilityText: 'Damages a cluster of enemies.'
  },
  {
    type: 'beastkin-mauler', name: 'Beastkin Mauler', icon: '🐻', cost: 3, faction: 'Beastkin', unitClass: 'Bruiser',
    hp: 165, damage: 24, speed: 1010, range: 1, armor: 4,
    abilityName: 'Maul', ability: 'cleave', abilityText: 'Hits the target and adjacent foes.'
  },
  {
    type: 'beastkin-stalker', name: 'Beastkin Stalker', icon: '🐆', cost: 3, faction: 'Beastkin', unitClass: 'Assassin',
    hp: 98, damage: 30, speed: 760, range: 1, armor: 2,
    abilityName: 'Pounce', ability: 'crit', abilityText: 'Deals a heavy pouncing strike.'
  }
];

const PLAYER_UNIT_CAP = 10;
const BENCH_CAP = 8;
const BOARD_SNAPSHOT_LIMIT = 8;
const TRICKSTER_ROUNDS = [4, 8, 13, 18];

const LEGACY_ENEMY_LIBRARY = [
  { name: 'Training Goblin', icon: '👺', hp: 72, damage: 11, speed: 1220, range: 1, armor: 0 },
  { name: 'Bone Guard', icon: '💀', hp: 112, damage: 14, speed: 1150, range: 1, armor: 3 },
  { name: 'Cult Archer', icon: '🎯', hp: 84, damage: 19, speed: 940, range: 3, armor: 1 },
  { name: 'Void Acolyte', icon: '🔮', hp: 98, damage: 22, speed: 1200, range: 3, armor: 1 },
  { name: 'Rift Ogre', icon: '👹', hp: 190, damage: 25, speed: 1250, range: 1, armor: 6 },
  { name: 'Ash Hound', icon: '🐺', hp: 126, damage: 24, speed: 790, range: 1, armor: 2 },
  { name: 'Hex Witch', icon: '🧙', hp: 118, damage: 29, speed: 1180, range: 3, armor: 2 },
  { name: 'Iron Revenant', icon: '🛡️', hp: 230, damage: 27, speed: 1280, range: 1, armor: 10 },
  { name: 'Moon-Touched Ranger', icon: '🌙', hp: 130, damage: 32, speed: 880, range: 3, armor: 3 },
  { name: 'Rift Gatekeeper', icon: '🚪', hp: 310, damage: 36, speed: 1160, range: 2, armor: 9 },
  { name: 'Secret Boss: Eclipse Tyrant', icon: '🌑', hp: 980, damage: 54, speed: 980, range: 2, armor: 14 }
];

const LEGACY_WAVE_NAMES = {
  1: 'Training Grounds',
  2: 'Goblin Pack',
  3: 'Archer Ambush',
  4: 'Void Cult Patrol',
  5: 'Graveyard Push',
  6: 'Ash Hound Rush',
  7: 'Hexfire Coven',
  8: 'Iron Revenant Line',
  9: 'Moonlit Crossfire',
  10: 'Rift Gate Guardians',
  11: 'Secret Boss: Eclipse Tyrant'
};

const LEGACY_SYNERGIES = [
  { key: 'Guardian', category: 'Class', threshold: 2, text: 'Guardians take 18% less damage.' },
  { key: 'Ranger', category: 'Class', threshold: 2, text: 'Rangers attack 18% faster.' },
  { key: 'Mage', category: 'Class', threshold: 2, text: 'Mages deal 30% more ability damage.' },
  { key: 'Healer', category: 'Class', threshold: 2, text: 'Healers restore 35% more HP.' },
  { key: 'Assassin', category: 'Class', threshold: 2, text: 'Assassins gain +25% crit chance.' },
  { key: 'Bruiser', category: 'Class', threshold: 2, text: 'Bruisers gain +25% max HP.' },
  { key: 'Iron Legion', category: 'Faction', threshold: 2, text: 'Iron Legion units gain +6 armor.' },
  { key: 'Emberborn', category: 'Faction', threshold: 2, text: 'Emberborn attacks apply burn damage.' },
  { key: 'Graveborn', category: 'Faction', threshold: 2, text: 'First Graveborn death revives with 35% HP.' },
  { key: 'Wild Fae', category: 'Faction', threshold: 2, text: 'Wild Fae units gain 16% dodge chance.' },
  { key: 'Arcane Order', category: 'Faction', threshold: 2, text: 'Arcane units gain 35% more mana.' },
  { key: 'Beastkin', category: 'Faction', threshold: 2, text: 'Beastkin units gain +18% attack damage.' }
];

const RARITY_CONFIG = {
  Common: { cost: 1, stat: 0.9, speed: 1.06, weight: 46 },
  Uncommon: { cost: 2, stat: 1, speed: 1, weight: 30 },
  Rare: { cost: 3, stat: 1.13, speed: 0.96, weight: 17 },
  Epic: { cost: 4, stat: 1.28, speed: 0.92, weight: 8 },
  Legendary: { cost: 5, stat: 1.48, speed: 0.88, weight: 3 },
  Mythic: { cost: 6, stat: 1.72, speed: 0.84, weight: 1 }
};

const SHOP_RARITY_ODDS = [
  { round: 1, odds: { Common: 82, Uncommon: 18 } },
  { round: 2, odds: { Common: 68, Uncommon: 28, Rare: 4 } },
  { round: 3, odds: { Common: 56, Uncommon: 34, Rare: 10 } },
  { round: 4, odds: { Common: 44, Uncommon: 36, Rare: 17, Epic: 3 } },
  { round: 5, odds: { Common: 34, Uncommon: 35, Rare: 24, Epic: 7 } },
  { round: 6, odds: { Common: 26, Uncommon: 32, Rare: 29, Epic: 12, Legendary: 1 } },
  { round: 7, odds: { Common: 18, Uncommon: 29, Rare: 32, Epic: 18, Legendary: 3 } },
  { round: 8, odds: { Common: 12, Uncommon: 24, Rare: 34, Epic: 24, Legendary: 6 } },
  { round: 9, odds: { Common: 8, Uncommon: 18, Rare: 34, Epic: 29, Legendary: 10, Mythic: 1 } },
  { round: 10, odds: { Common: 5, Uncommon: 14, Rare: 31, Epic: 32, Legendary: 15, Mythic: 3 } },
  { round: 11, odds: { Common: 3, Uncommon: 10, Rare: 27, Epic: 34, Legendary: 20, Mythic: 6 } },
  { round: 14, odds: { Common: 2, Uncommon: 8, Rare: 24, Epic: 35, Legendary: 23, Mythic: 8 } },
  { round: 17, odds: { Common: 1, Uncommon: 6, Rare: 20, Epic: 35, Legendary: 27, Mythic: 11 } },
  { round: 20, odds: { Common: 1, Uncommon: 4, Rare: 16, Epic: 34, Legendary: 30, Mythic: 15 } }
];

const CLASS_BASE = {
  Guardian: { hp: 190, damage: 18, attackSpeed: 1120, range: 1, armor: 9, ability: 'shield', abilityName: 'Oath Ward', abilityDescription: 'Gains a shield when energy is full.' },
  Ranger: { hp: 100, damage: 27, attackSpeed: 860, range: 3, armor: 2, ability: 'rapid', abilityName: 'Twin Shot', abilityDescription: 'Fires two quick strikes at the target.' },
  Mage: { hp: 92, damage: 32, attackSpeed: 1200, range: 3, armor: 1, ability: 'aoe', abilityName: 'Mythic Burst', abilityDescription: 'Damages enemies near the target.' },
  Healer: { hp: 118, damage: 15, attackSpeed: 1120, range: 2, armor: 3, ability: 'heal', abilityName: 'Sacred Mend', abilityDescription: 'Heals the lowest-health ally.' },
  Assassin: { hp: 98, damage: 34, attackSpeed: 780, range: 1, armor: 2, ability: 'crit', abilityName: 'Fated Strike', abilityDescription: 'Deals a heavy critical strike.' },
  Bruiser: { hp: 165, damage: 25, attackSpeed: 980, range: 1, armor: 5, ability: 'cleave', abilityName: 'Titan Breaker', abilityDescription: 'Hits the target and adjacent enemies.' }
};

const DEFAULT_CLASS_BY_SOURCE = {
  Empyrean: 'Mage',
  Heroic: 'Bruiser',
  Sacred: 'Healer',
  Spirit: 'Ranger',
  Fae: 'Assassin',
  Worshiper: 'Guardian',
  Wyrdbound: 'Bruiser'
};

const PANTHEON_ICON = {
  Hellenic: 'H',
  Norse: 'N',
  Egyptian: 'E',
  Celtic: 'C',
  Arthurian: 'A'
};

function championSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function makeChampion(config) {
  const rarity = config.rarity || 'Uncommon';
  const base = CLASS_BASE[config.class] || CLASS_BASE[DEFAULT_CLASS_BY_SOURCE[config.sourceType]] || CLASS_BASE.Bruiser;
  const rarityStats = RARITY_CONFIG[rarity] || RARITY_CONFIG.Uncommon;
  const attackSpeed = config.attackSpeed || Math.max(520, Math.round(base.attackSpeed * rarityStats.speed));
  const tags = [...new Set([config.pantheon, config.sourceType, config.class, rarity, ...(config.tags || [])])];
  const status = config.status
    || (config.bossOnly ? 'Boss Only'
      : config.enemyOnly ? 'Enemy Only'
        : config.locked ? 'Locked'
          : 'Playable');

  return {
    type: config.type || championSlug(config.name),
    name: config.name,
    icon: config.icon || PANTHEON_ICON[config.pantheon] || 'M',
    pantheon: config.pantheon,
    sourceType: config.sourceType,
    class: config.class,
    unitClass: config.class,
    faction: config.pantheon,
    rarity,
    cost: config.cost || rarityStats.cost,
    hp: config.hp || Math.round(base.hp * rarityStats.stat),
    damage: config.damage || Math.round(base.damage * rarityStats.stat),
    attackSpeed,
    speed: attackSpeed,
    range: config.range || base.range,
    armor: config.armor ?? Math.round(base.armor * rarityStats.stat),
    energyMax: config.energyMax || 100,
    ability: config.ability || base.ability,
    abilityName: config.abilityName || base.abilityName,
    abilityDescription: config.abilityDescription || base.abilityDescription,
    abilityText: config.abilityDescription || base.abilityDescription,
    tags,
    status,
    enemyOnly: status === 'Enemy Only',
    bossOnly: status === 'Boss Only',
    locked: status === 'Locked'
  };
}

function rosterGroup({ pantheon, sourceType, defaultClass, defaultRarity, names, enemyOnly = false, bossOnly = false, locked = false }) {
  return names.map(entry => {
    const config = typeof entry === 'string' ? { name: entry } : entry;
    return makeChampion({
      pantheon,
      sourceType,
      class: config.class || defaultClass || DEFAULT_CLASS_BY_SOURCE[sourceType],
      rarity: config.rarity || defaultRarity,
      enemyOnly: config.enemyOnly ?? enemyOnly,
      bossOnly: config.bossOnly ?? bossOnly,
      locked: config.locked ?? locked,
      ...config
    });
  });
}

const CHAMPION_POOL = [
  ...rosterGroup({ pantheon: 'Hellenic', sourceType: 'Empyrean', defaultRarity: 'Legendary', names: [
    { name: 'Zeus', class: 'Mage', rarity: 'Mythic', abilityName: 'Thunderbolt', abilityDescription: 'Calls lightning around the target.' },
    { name: 'Hera', class: 'Guardian', abilityName: 'Queenly Aegis', abilityDescription: 'Raises a divine shield when energy is full.' },
    { name: 'Poseidon', class: 'Bruiser', rarity: 'Mythic', abilityName: 'Seaquake', abilityDescription: 'Crushes nearby enemies with a tidal blow.' },
    { name: 'Hades', class: 'Mage', rarity: 'Mythic', abilityName: 'Underworld Bloom', abilityDescription: 'Unleashes shadow damage near the target.' },
    { name: 'Demeter', class: 'Healer', rarity: 'Legendary', abilityName: 'Harvest Grace' },
    { name: 'Persephone', class: 'Mage', rarity: 'Epic', abilityName: 'Pomegranate Hex' },
    { name: 'Athena', class: 'Guardian', rarity: 'Legendary', abilityName: 'Aegis Formation' },
    { name: 'Ares', class: 'Bruiser', rarity: 'Legendary', abilityName: 'War God Cleave' },
    { name: 'Apollo', class: 'Ranger', rarity: 'Legendary', abilityName: 'Solar Arrows' },
    { name: 'Artemis', class: 'Ranger', rarity: 'Legendary', abilityName: 'Moon Hunt' },
    { name: 'Hermes', class: 'Assassin', rarity: 'Epic', abilityName: 'Winged Ambush' },
    { name: 'Aphrodite', class: 'Healer', rarity: 'Epic', abilityName: 'Golden Charm' },
    { name: 'Hephaestus', class: 'Guardian', rarity: 'Epic', abilityName: 'Forge Shield' },
    { name: 'Dionysus', class: 'Mage', rarity: 'Epic', abilityName: 'Raving Revel' },
    { name: 'Hecate', class: 'Mage', rarity: 'Legendary', abilityName: 'Crossroads Hex' },
    { name: 'Nike', class: 'Assassin', rarity: 'Epic', abilityName: 'Victory Dive' },
    { name: 'Helios', class: 'Mage', rarity: 'Legendary', abilityName: 'Sun Chariot' },
    { name: 'Selene', class: 'Healer', rarity: 'Epic', abilityName: 'Moonlit Mend' },
    { name: 'Hypnos', class: 'Mage', rarity: 'Epic', abilityName: 'Dream Fog' },
    { name: 'Thanatos', class: 'Assassin', rarity: 'Legendary', abilityName: "Death's Edge" }
  ] }),
  ...rosterGroup({ pantheon: 'Hellenic', sourceType: 'Worshiper', defaultRarity: 'Common', names: [
    { name: 'Hellenic Temple Guard', class: 'Guardian', abilityName: 'Oath Ward', abilityDescription: 'Raises a modest shield as an early Hellenic frontline.' },
    { name: 'Hellenic Oracle Acolyte', class: 'Mage', abilityName: 'Mythic Burst', abilityDescription: 'Unleashes a small oracle flame at clustered enemies.' }
  ] }),
  ...rosterGroup({ pantheon: 'Norse', sourceType: 'Worshiper', defaultRarity: 'Common', names: [
    { name: 'Norse Shield-Bearer', class: 'Guardian', abilityName: 'Oath Ward', abilityDescription: 'Raises a sturdy shield as an early Norse frontline.' },
    { name: 'Norse Rune-Chanter', class: 'Mage', abilityName: 'Rune Burst', abilityDescription: 'Chants a small burst of rune magic at the target.' }
  ] }),
  ...rosterGroup({ pantheon: 'Egyptian', sourceType: 'Worshiper', defaultRarity: 'Common', names: [
    { name: 'Egyptian Temple Sentinel', class: 'Guardian', abilityName: 'Oath Ward', abilityDescription: 'Raises a temple shield as an early Egyptian frontline.' },
    { name: 'Egyptian Sun Acolyte', class: 'Healer', abilityName: 'Sacred Mend', abilityDescription: 'Heals the lowest-health ally with a small sun blessing.' }
  ] }),
  ...rosterGroup({ pantheon: 'Celtic', sourceType: 'Worshiper', defaultRarity: 'Common', names: [
    { name: 'Celtic Grove Keeper', class: 'Guardian', abilityName: 'Oath Ward', abilityDescription: 'Raises a grove ward as an early Celtic frontline.' },
    { name: 'Celtic Thornrunner', class: 'Assassin', abilityName: 'Fated Strike', abilityDescription: 'Dashes in for a quick thorned strike.' }
  ] }),
  ...rosterGroup({ pantheon: 'Arthurian', sourceType: 'Worshiper', defaultRarity: 'Common', names: [
    { name: 'Arthurian Squire', class: 'Guardian', abilityName: 'Oath Ward', abilityDescription: 'Raises a small oath shield as an early Arthurian frontline.' },
    { name: 'Grail Pilgrim', class: 'Healer', abilityName: 'Sacred Mend', abilityDescription: 'Heals the lowest-health ally with a humble grail prayer.' }
  ] }),
  ...rosterGroup({ pantheon: 'Hellenic', sourceType: 'Heroic', defaultRarity: 'Rare', locked: true, names: [
    { name: 'Heracles', class: 'Bruiser', rarity: 'Epic' }, { name: 'Perseus', class: 'Assassin', rarity: 'Rare' },
    { name: 'Achilles', class: 'Guardian', rarity: 'Epic' }, { name: 'Odysseus', class: 'Ranger', rarity: 'Rare' },
    { name: 'Theseus', class: 'Bruiser' }, { name: 'Jason', class: 'Guardian' }, { name: 'Atalanta', class: 'Ranger' },
    { name: 'Orpheus', class: 'Healer' }, { name: 'Aeneas', class: 'Guardian' }, { name: 'Helen of Troy', class: 'Healer' }
  ] }),
  ...rosterGroup({ pantheon: 'Hellenic', sourceType: 'Wyrdbound', defaultRarity: 'Epic', enemyOnly: true, names: [
    { name: 'Kronos', class: 'Bruiser', rarity: 'Mythic' }, { name: 'Rhea', class: 'Healer', rarity: 'Legendary' },
    { name: 'Nyx', class: 'Mage', rarity: 'Mythic' }, { name: 'Erebus', class: 'Mage', rarity: 'Legendary' },
    { name: 'Chaos', class: 'Mage', rarity: 'Mythic', bossOnly: true, hp: 1250, damage: 68, armor: 18, range: 3, abilityName: 'Primeval Unmaking' },
    { name: 'Typhon', class: 'Bruiser', rarity: 'Mythic', enemyOnly: true }, { name: 'Echidna', class: 'Mage', rarity: 'Legendary' },
    { name: 'The Titans', class: 'Bruiser', enemyOnly: true }, { name: 'The Gigantes', class: 'Bruiser', enemyOnly: true },
    { name: 'The Furies / Erinyes', class: 'Assassin', rarity: 'Rare' }, { name: 'Lamia', class: 'Assassin', rarity: 'Rare' },
    { name: 'Charybdis', class: 'Mage', enemyOnly: true }, { name: 'Scylla', class: 'Bruiser', enemyOnly: true },
    { name: 'Medusa / Gorgon bloodlines', class: 'Mage', rarity: 'Epic' }, { name: 'Tartarus-born horrors', class: 'Bruiser', enemyOnly: true }
  ] }),

  ...rosterGroup({ pantheon: 'Norse', sourceType: 'Empyrean', defaultRarity: 'Legendary', names: [
    { name: 'Odin', class: 'Mage', rarity: 'Mythic' }, { name: 'Thor', class: 'Bruiser', rarity: 'Mythic' },
    { name: 'Freyja', class: 'Healer', rarity: 'Legendary' }, { name: 'Freyr', class: 'Ranger' }, { name: 'Frigg', class: 'Healer' },
    { name: 'Tyr', class: 'Guardian' }, { name: 'Heimdall', class: 'Guardian' }, { name: 'Baldr', class: 'Healer' },
    { name: 'Loki', class: 'Assassin', rarity: 'Legendary' }, { name: 'Hel', class: 'Mage', rarity: 'Legendary' },
    { name: 'Njord', class: 'Healer', rarity: 'Epic' }, { name: 'Skadi', class: 'Ranger', rarity: 'Epic' },
    { name: 'Idunn', class: 'Healer', rarity: 'Epic' }, { name: 'Bragi', class: 'Mage', rarity: 'Epic' },
    { name: 'Sif', class: 'Guardian', rarity: 'Epic' }, { name: 'Vidar', class: 'Bruiser' }, { name: 'Vali', class: 'Assassin' },
    { name: 'Ullr', class: 'Ranger' }, { name: 'Forseti', class: 'Guardian' }
  ] }),
  ...rosterGroup({ pantheon: 'Norse', sourceType: 'Heroic', defaultRarity: 'Common', locked: true, names: [
    { name: 'Valkyries', class: 'Guardian', rarity: 'Rare' }, { name: 'Einherjar', class: 'Bruiser' }, { name: 'Berserkers', class: 'Bruiser' },
    { name: 'Volsung heroes', class: 'Assassin', rarity: 'Rare' }, { name: 'Rune-seers', class: 'Mage', sourceType: 'Spirit' },
    { name: 'Dwarven smith lines', class: 'Guardian', sourceType: 'Sacred' }, { name: 'Elf-blooded lines', class: 'Ranger', sourceType: 'Fae' },
    { name: 'Seidr witches', class: 'Mage', sourceType: 'Spirit' }
  ] }),
  ...rosterGroup({ pantheon: 'Norse', sourceType: 'Wyrdbound', defaultRarity: 'Epic', enemyOnly: true, names: [
    { name: 'Laufey, the Frost Giant Queen', class: 'Mage', rarity: 'Legendary' }, { name: 'Ymir', class: 'Bruiser', rarity: 'Mythic', bossOnly: true },
    { name: 'Fenrir', class: 'Assassin', rarity: 'Mythic', enemyOnly: true }, { name: 'Jormungandr', class: 'Bruiser', rarity: 'Mythic', enemyOnly: true },
    { name: 'Nidhogg', class: 'Assassin', rarity: 'Legendary' }, { name: 'Surtr', class: 'Bruiser', rarity: 'Mythic', enemyOnly: true },
    { name: 'Angrboda', class: 'Mage', rarity: 'Legendary' }, { name: 'The Jotnar', class: 'Bruiser', enemyOnly: true },
    { name: 'Frost Giants', class: 'Guardian', enemyOnly: true }, { name: 'Fire Giants', class: 'Bruiser', enemyOnly: true },
    { name: 'Draugr', class: 'Bruiser', rarity: 'Rare', enemyOnly: true }, { name: 'Troll lines', class: 'Guardian', rarity: 'Rare' },
    { name: 'Things born from Ginnungagap', class: 'Mage', enemyOnly: true }
  ] }),

  ...rosterGroup({ pantheon: 'Egyptian', sourceType: 'Empyrean', defaultRarity: 'Legendary', names: [
    { name: 'Ra', class: 'Mage', rarity: 'Mythic' }, { name: 'Osiris', class: 'Healer', rarity: 'Mythic' },
    { name: 'Isis', class: 'Healer', rarity: 'Legendary' }, { name: 'Horus', class: 'Ranger', rarity: 'Legendary' },
    { name: 'Set', class: 'Bruiser', rarity: 'Legendary' }, { name: 'Anubis', class: 'Assassin', rarity: 'Legendary' },
    { name: 'Thoth', class: 'Mage' }, { name: "Ma'at", class: 'Guardian' }, { name: 'Bastet', class: 'Assassin', rarity: 'Epic' },
    { name: 'Sekhmet', class: 'Bruiser' }, { name: 'Hathor', class: 'Healer', rarity: 'Epic' }, { name: 'Sobek', class: 'Bruiser' },
    { name: 'Nephthys', class: 'Mage' }, { name: 'Ptah', class: 'Guardian' }, { name: 'Khnum', class: 'Healer' },
    { name: 'Neith', class: 'Ranger' }, { name: 'Nut', class: 'Mage' }, { name: 'Geb', class: 'Guardian' },
    { name: 'Shu', class: 'Ranger' }, { name: 'Tefnut', class: 'Mage' }, { name: 'Wepwawet', class: 'Assassin', rarity: 'Epic' }
  ] }),
  ...rosterGroup({ pantheon: 'Egyptian', sourceType: 'Sacred', defaultRarity: 'Common', locked: true, names: [
    { name: 'Pharaoh bloodlines', class: 'Guardian', rarity: 'Rare' }, { name: "Ma'at-bound judges", class: 'Guardian' },
    { name: 'Thothian scribes', class: 'Mage' }, { name: 'Anubian death-guides', class: 'Assassin' },
    { name: 'Bastet protectors', class: 'Guardian' }, { name: 'Sekhmet war-healers', class: 'Healer', rarity: 'Rare' },
    { name: 'Horus royal lines', class: 'Ranger' }, { name: 'Osirian resurrection lines', class: 'Healer', rarity: 'Rare' }
  ] }),
  ...rosterGroup({ pantheon: 'Egyptian', sourceType: 'Wyrdbound', defaultRarity: 'Rare', enemyOnly: true, names: [
    { name: 'Apep', class: 'Mage', rarity: 'Mythic', bossOnly: true }, { name: 'Isfet', class: 'Mage', rarity: 'Legendary' },
    { name: 'Ammit', class: 'Bruiser', rarity: 'Epic', enemyOnly: true }, { name: 'The Unweighed Dead', class: 'Bruiser', enemyOnly: true },
    { name: 'Devourer spirits', class: 'Assassin', enemyOnly: true }, { name: 'Crocodile-pit horrors', class: 'Bruiser', enemyOnly: true },
    { name: 'Tomb-cursed kings', class: 'Guardian', enemyOnly: true }, { name: 'Nameless desert gods', class: 'Mage', enemyOnly: true },
    { name: 'False-soul lineages', class: 'Assassin', rarity: 'Rare' }, { name: 'Serpents of the sunless dark', class: 'Mage', enemyOnly: true }
  ] }),

  ...rosterGroup({ pantheon: 'Celtic', sourceType: 'Empyrean', defaultRarity: 'Legendary', names: [
    { name: 'The Dagda', class: 'Bruiser', rarity: 'Mythic' }, { name: 'The Morrigan', class: 'Mage', rarity: 'Mythic' },
    { name: 'Brigid', class: 'Healer' }, { name: 'Lugh', class: 'Ranger' }, { name: 'Nuada', class: 'Guardian' },
    { name: 'Manannan mac Lir', class: 'Mage' }, { name: 'Danu', class: 'Healer' }, { name: 'Arawn', class: 'Mage' },
    { name: 'Rhiannon', class: 'Healer', rarity: 'Epic' }, { name: 'Cernunnos', class: 'Bruiser' }, { name: 'Ogma', class: 'Guardian' },
    { name: 'Dian Cecht', class: 'Healer' }, { name: 'Goibniu', class: 'Guardian' }, { name: 'Macha', class: 'Assassin' },
    { name: 'Badb', class: 'Mage' }, { name: 'Eriu', class: 'Guardian' }, { name: 'Flidais', class: 'Ranger' },
    { name: 'Nantosuelta', class: 'Healer' }, { name: 'Taranis', class: 'Mage' }, { name: 'Epona', class: 'Ranger' }
  ] }),
  ...rosterGroup({ pantheon: 'Celtic', sourceType: 'Fae', defaultRarity: 'Common', locked: true, names: [
    { name: 'Cu Chulainn', class: 'Bruiser', sourceType: 'Heroic', rarity: 'Epic' }, { name: 'Fionn mac Cumhaill', class: 'Ranger', sourceType: 'Heroic', rarity: 'Rare' },
    { name: 'The Fianna', class: 'Ranger', sourceType: 'Heroic' }, { name: 'Druid bloodlines', class: 'Mage', sourceType: 'Sacred' },
    { name: 'Bardic bloodlines', class: 'Healer', sourceType: 'Spirit' }, { name: 'Sidhe-touched lines', class: 'Assassin' },
    { name: 'Sovereignty bloodlines', class: 'Guardian', sourceType: 'Sacred' }, { name: 'Beast-shifter families', class: 'Bruiser' }
  ] }),
  ...rosterGroup({ pantheon: 'Celtic', sourceType: 'Wyrdbound', defaultRarity: 'Rare', enemyOnly: true, names: [
    { name: 'Balor', class: 'Mage', rarity: 'Mythic', bossOnly: true }, { name: 'The Fomorians', class: 'Bruiser', enemyOnly: true },
    { name: 'The Unseelie Deep', class: 'Mage', rarity: 'Epic' }, { name: 'Redcap lines', class: 'Assassin', rarity: 'Rare' },
    { name: 'Black Cauldron corruption', class: 'Mage', enemyOnly: true }, { name: 'Thorned Road entities', class: 'Assassin', enemyOnly: true },
    { name: 'Barrow things', class: 'Bruiser', enemyOnly: true }, { name: 'Drowned kings', class: 'Guardian', enemyOnly: true },
    { name: 'Bog-born spirits', class: 'Mage', enemyOnly: true }, { name: 'Wild Hunt predators', class: 'Assassin', enemyOnly: true }
  ] }),

  ...rosterGroup({ pantheon: 'Arthurian', sourceType: 'Empyrean', defaultRarity: 'Legendary', names: [
    { name: 'Arthur Pendragon', class: 'Guardian', rarity: 'Mythic' }, { name: 'Merlin', class: 'Mage', rarity: 'Mythic' },
    { name: 'Morgan le Fay', class: 'Mage', rarity: 'Legendary' }, { name: 'Nimue / Viviane', class: 'Healer' },
    { name: 'The Lady of the Lake', class: 'Healer' }, { name: 'The Fisher King', class: 'Guardian' },
    { name: 'Galahad', class: 'Guardian' }, { name: 'Lancelot', class: 'Bruiser' }, { name: 'Gawain', class: 'Bruiser' },
    { name: 'Percival', class: 'Ranger' }, { name: 'Bedivere', class: 'Guardian' }, { name: 'Tristan', class: 'Assassin' },
    { name: 'Guinevere', class: 'Healer' }, { name: 'The Green Knight', class: 'Bruiser', rarity: 'Epic' },
    { name: 'The Grail Maidens', class: 'Healer' }, { name: 'The Pendragon Line', class: 'Guardian' }, { name: 'Avalon Queens', class: 'Mage' }
  ] }),
  ...rosterGroup({ pantheon: 'Arthurian', sourceType: 'Heroic', defaultRarity: 'Common', locked: true, names: [
    { name: 'Pendragon descendants', class: 'Guardian', rarity: 'Rare' }, { name: 'Grail guardians', class: 'Guardian', sourceType: 'Sacred' },
    { name: 'Merlinic descendants', class: 'Mage', sourceType: 'Spirit' }, { name: 'Lake-born enchanters', class: 'Healer', sourceType: 'Fae' },
    { name: 'Dragon-blooded royal lines', class: 'Bruiser', rarity: 'Rare' }, { name: 'Round Table knight lines', class: 'Guardian' },
    { name: 'Oathbound champions', class: 'Bruiser' }, { name: 'Sword-bearing heirs', class: 'Assassin' }
  ] }),
  ...rosterGroup({ pantheon: 'Arthurian', sourceType: 'Wyrdbound', defaultRarity: 'Rare', enemyOnly: true, names: [
    { name: 'Mordred', class: 'Assassin', rarity: 'Mythic', enemyOnly: true }, { name: 'The Black Grail', class: 'Mage', rarity: 'Legendary' },
    { name: 'The Hollow Round Table', class: 'Guardian', enemyOnly: true },
    { name: 'The Dragon Beneath Britain', class: 'Bruiser', rarity: 'Mythic', bossOnly: true },
    { name: 'The Wounded Kingdom', class: 'Mage', rarity: 'Mythic', bossOnly: true }, { name: "Betrayer's Barrow", class: 'Assassin', enemyOnly: true },
    { name: 'False Merlins', class: 'Mage', enemyOnly: true }, { name: 'Thorned Avalon', class: 'Mage', rarity: 'Epic' },
    { name: 'Red Lake spirits', class: 'Assassin', enemyOnly: true }, { name: 'Oathbreaker knights', class: 'Bruiser', enemyOnly: true },
    { name: 'The Kingdom That Never Healed', class: 'Mage', rarity: 'Mythic', bossOnly: true }
  ] })
];

const UNIT_LIBRARY = CHAMPION_POOL.filter(champion => champion.status === 'Playable');

function enemyFromChampion(name, overrides = {}) {
  const champion = CHAMPION_POOL.find(entry => entry.name === name);
  return {
    ...(champion || makeChampion({ name, pantheon: 'Wyrdbound', sourceType: 'Wyrdbound', class: 'Bruiser', rarity: 'Rare' })),
    ...overrides,
    status: 'Enemy Only',
    enemyOnly: true,
    bossOnly: false,
    locked: false
  };
}

const ENEMY_LIBRARY = [
  enemyFromChampion('The Unweighed Dead', { hp: 82, damage: 12, armor: 1, range: 1 }),
  enemyFromChampion('Draugr', { hp: 118, damage: 16, armor: 3, range: 1 }),
  enemyFromChampion('Redcap lines', { hp: 92, damage: 22, armor: 1, range: 1, class: 'Assassin', unitClass: 'Assassin' }),
  enemyFromChampion('Tomb-cursed kings', { hp: 148, damage: 18, armor: 6, range: 1 }),
  enemyFromChampion('The Fomorians', { hp: 190, damage: 26, armor: 6, range: 1 }),
  enemyFromChampion('Fire Giants', { hp: 170, damage: 30, armor: 4, range: 1 }),
  enemyFromChampion('False Merlins', { hp: 118, damage: 31, armor: 2, range: 3, class: 'Mage', unitClass: 'Mage' }),
  enemyFromChampion('Typhon', { hp: 260, damage: 34, armor: 10, range: 1 }),
  enemyFromChampion('Mordred', { hp: 150, damage: 38, armor: 4, range: 1, class: 'Assassin', unitClass: 'Assassin' }),
  enemyFromChampion('Apep', { hp: 360, damage: 42, armor: 10, range: 3, class: 'Mage', unitClass: 'Mage' }),
  enemyFromChampion('Chaos', { hp: 980, damage: 58, armor: 16, range: 3, class: 'Boss', unitClass: 'Boss', ability: 'aoe', abilityName: 'Primeval Unmaking' }),
  enemyFromChampion('Ymir', { hp: 520, damage: 38, armor: 13, range: 1, class: 'Boss', unitClass: 'Boss', ability: 'cleave', abilityName: 'World-Frost Breaker' }),
  enemyFromChampion('Balor', { hp: 620, damage: 48, armor: 10, range: 3, class: 'Boss', unitClass: 'Boss', ability: 'aoe', abilityName: 'Baleful Eye' }),
  enemyFromChampion('Apep', { name: 'Apep, Sunless Serpent', hp: 760, damage: 56, armor: 14, range: 3, class: 'Boss', unitClass: 'Boss', ability: 'aoe', abilityName: 'Solar Devouring' }),
  enemyFromChampion('The Dragon Beneath Britain', { hp: 1120, damage: 66, armor: 20, range: 1, class: 'Boss', unitClass: 'Boss', ability: 'cleave', abilityName: 'Britain-Shaking Coil' }),
  enemyFromChampion('Typhon', { name: 'Typhon, World-Breaker', hp: 900, damage: 62, armor: 18, range: 1, class: 'Boss', unitClass: 'Boss', ability: 'cleave', abilityName: 'Storm of Monsters' }),
  enemyFromChampion('The Wounded Kingdom', { hp: 860, damage: 52, armor: 15, range: 3, class: 'Boss', unitClass: 'Boss', ability: 'aoe', abilityName: 'Unhealed Land' }),
  enemyFromChampion('The Kingdom That Never Healed', { hp: 1550, damage: 76, armor: 24, range: 3, class: 'Boss', unitClass: 'Boss', ability: 'aoe', abilityName: 'Crown of Every Ruin' })
];

const WAVE_NAMES = {
  1: 'Restless Dead',
  2: 'Draugr Muster',
  3: 'Redcap Ambush',
  4: 'Trickster Mirror: First Reflection',
  5: 'Mini Boss: Ymir Stirs',
  6: 'Fire Giant Push',
  7: 'False Merlin Coven',
  8: 'Trickster Mirror: Borrowed Blades',
  9: "Mordred's Betrayers",
  10: 'Mini Boss: Balor at the Black Tower',
  11: 'Sunless Deadfall',
  12: 'Giants at the Rift',
  13: 'Trickster Mirror: Stolen Formation',
  14: 'Serpent Moon',
  15: 'Mini Boss: Apep Uncoils',
  16: 'Betrayer Warband',
  17: 'Titan Road',
  18: 'Trickster Mirror: Last Echo',
  19: 'The Wounded Kingdom Rises',
  20: 'Boss: The Dragon Beneath Britain',
  21: 'Secret Mega Boss: The Kingdom That Never Healed'
};

const ENEMY_LAYOUTS = {
  1: [0, 0],
  2: [0, 1, 0],
  3: [2, 0, 2, 1],
  4: [3, 2, 0, 1],
  5: [11, 1, 0],
  6: [5, 5, 2, 0, 1],
  7: [6, 3, 6, 2, 4],
  8: [7, 1, 7, 2, 5, 3],
  9: [8, 8, 6, 2, 5, 4],
  10: [12, 8, 6, 2],
  11: [9, 3, 0, 1, 2, 6],
  12: [5, 5, 4, 4, 1, 3],
  13: [6, 6, 8, 2, 3, 0],
  14: [9, 7, 2, 5, 6, 8],
  15: [13, 9, 3, 0],
  16: [8, 8, 7, 6, 5, 2, 1],
  17: [7, 7, 5, 5, 4, 4, 3],
  18: [15, 5, 8, 6, 2, 3],
  19: [16, 8, 7, 6, 4, 3, 2],
  20: [14, 15, 13, 12],
  21: [17, 10, 11, 12, 13, 14, 15, 16]
};

const ENEMY_SLOTS = [[0,0],[7,0],[1,0],[6,0],[2,1],[5,1],[3,1],[4,1]];

const SYNERGIES = [
  { key: 'Hellenic', category: 'Pantheon', threshold: 2, text: 'Hellenic units gain +10% ability power.' },
  { key: 'Hellenic', category: 'Pantheon', threshold: 4, text: 'Hellenic units gain +20% ability power and generate energy slightly faster.' },
  { key: 'Hellenic', category: 'Pantheon', threshold: 6, text: 'Hellenic units gain a small burst of energy after casting.' },
  { key: 'Norse', category: 'Pantheon', threshold: 2, text: 'Norse units gain +10% attack damage.' },
  { key: 'Norse', category: 'Pantheon', threshold: 4, text: 'Norse units gain +15% attack damage and +10 armor.' },
  { key: 'Norse', category: 'Pantheon', threshold: 6, text: 'Norse units attack faster while below 50% HP.' },
  { key: 'Egyptian', category: 'Pantheon', threshold: 2, text: 'Egyptian healing and shielding effects are increased by 10%.' },
  { key: 'Egyptian', category: 'Pantheon', threshold: 4, text: 'Egyptian units gain a small battle-start shield.' },
  { key: 'Egyptian', category: 'Pantheon', threshold: 6, text: 'The first Egyptian unit to fall each battle revives once with partial HP.' },
  { key: 'Celtic', category: 'Pantheon', threshold: 2, text: 'Celtic units gain +8% dodge chance.' },
  { key: 'Celtic', category: 'Pantheon', threshold: 4, text: 'Celtic units gain dodge and small periodic healing.' },
  { key: 'Celtic', category: 'Pantheon', threshold: 6, text: 'Celtic units gain energy when they dodge.' },
  { key: 'Arthurian', category: 'Pantheon', threshold: 2, text: 'Arthurian units gain +10 armor.' },
  { key: 'Arthurian', category: 'Pantheon', threshold: 4, text: 'Arthurian units gain a battle-start oath shield.' },
  { key: 'Arthurian', category: 'Pantheon', threshold: 6, text: 'Arthurian units deal bonus damage while shielded.' },
  { key: 'Guardian', category: 'Class', threshold: 2, text: 'Guardians gain +15 armor.' },
  { key: 'Guardian', category: 'Class', threshold: 4, text: 'All allies gain a small battle-start shield.' },
  { key: 'Guardian', category: 'Class', threshold: 6, text: 'Guardians gain bonus max HP.' },
  { key: 'Ranger', category: 'Class', threshold: 2, text: 'Rangers gain +10% attack speed.' },
  { key: 'Ranger', category: 'Class', threshold: 4, text: 'Rangers gain +20% attack speed.' },
  { key: 'Ranger', category: 'Class', threshold: 6, text: 'Rangers have a chance to fire an extra shot.' },
  { key: 'Mage', category: 'Class', threshold: 2, text: 'Mages gain +10% ability damage.' },
  { key: 'Mage', category: 'Class', threshold: 4, text: 'Mages gain +20% ability damage.' },
  { key: 'Mage', category: 'Class', threshold: 6, text: 'Mages generate energy faster.' },
  { key: 'Healer', category: 'Class', threshold: 2, text: 'Healing is increased by 15%.' },
  { key: 'Healer', category: 'Class', threshold: 4, text: 'Healing is increased by 25%, and overhealing grants a small shield.' },
  { key: 'Healer', category: 'Class', threshold: 6, text: 'The lowest-health ally receives periodic small healing.' },
  { key: 'Assassin', category: 'Class', threshold: 2, text: 'Assassins gain +10% crit chance.' },
  { key: 'Assassin', category: 'Class', threshold: 4, text: 'Assassins gain +20% crit chance and bonus crit damage.' },
  { key: 'Assassin', category: 'Class', threshold: 6, text: 'Assassins gain energy when they score a kill.' },
  { key: 'Bruiser', category: 'Class', threshold: 2, text: 'Bruisers gain +10% max HP.' },
  { key: 'Bruiser', category: 'Class', threshold: 4, text: 'Bruisers gain +20% max HP.' },
  { key: 'Bruiser', category: 'Class', threshold: 6, text: 'Bruisers gain bonus damage based on missing HP.' },
  { key: 'Worshiper', category: 'Source', threshold: 2, text: 'Worshipers gain +15% max HP.' },
  { key: 'Worshiper', category: 'Source', threshold: 4, text: 'All allies gain a small battle-start shield.' },
  { key: 'Empyrean', category: 'Source', threshold: 3, text: 'Empyrean units gain +5% ability power.' },
  { key: 'Empyrean', category: 'Source', threshold: 6, text: 'Empyrean units gain +10% ability power.' },
  { key: 'Wyrdbound', category: 'Source', threshold: 2, text: 'Wyrdbound units apply corruption damage over time.' },
  { key: 'Wyrdbound', category: 'Source', threshold: 4, text: 'The first Wyrdbound death revives as a corrupted echo.' },
  { key: 'Heroic', category: 'Source', threshold: 2, text: 'Heroic units gain +10% crit chance.' },
  { key: 'Heroic', category: 'Source', threshold: 4, text: 'Heroic units deal bonus damage against bosses.' },
  { key: 'Sacred', category: 'Source', threshold: 2, text: 'Sacred units gain +15% healing and shielding power.' },
  { key: 'Sacred', category: 'Source', threshold: 4, text: 'Allies receive a small shield when healed.' },
  { key: 'Spirit', category: 'Source', threshold: 2, text: 'Spirit units gain bonus energy generation.' },
  { key: 'Spirit', category: 'Source', threshold: 4, text: 'Spirit units grant allies small energy over time.' },
  { key: 'Fae', category: 'Source', threshold: 2, text: 'Fae units gain dodge chance.' },
  { key: 'Fae', category: 'Source', threshold: 4, text: 'Fae units gain energy when they dodge.' }
];

const SAVE_KEY = 'riftbound-arena-v0-7-save';

const RELICS = [
  { id: 'aegis-shard', name: 'Aegis Shard', text: 'Guardians and Arthurian units start battle with a stronger shield.' },
  { id: 'thunder-seed', name: 'Thunder Seed', text: 'Mages and Empyrean units gain ability power.' },
  { id: 'valkyrie-horn', name: 'Valkyrie Horn', text: 'Heroic and Norse units gain attack damage.' },
  { id: 'ankh-of-return', name: 'Ankh of Return', text: 'Healers and Egyptian units gain healing power.' },
  { id: 'fae-briar', name: 'Fae Briar', text: 'Fae and Celtic units gain dodge chance.' },
  { id: 'black-grail', name: 'Black Grail', text: 'Wyrdbound units apply stronger corruption.' },
  { id: 'sun-forged-spear', name: 'Sun-Forged Spear', text: 'Rangers gain attack speed and bonus damage.' },
  { id: 'wyrd-iron-crown', name: 'Wyrd-Iron Crown', text: 'Bruisers gain max HP and armor.' }
];

const state = {
  round: 1,
  maxRound: 20,
  secretRound: 21,
  runComplete: false,
  battleTick: 0,
  logLimit: 220,
  logFilter: 'all',
  activeUnitCap: PLAYER_UNIT_CAP,
  gold: 10,
  playerHp: 20,
  mode: 'planning',
  shopLocked: false,
  shop: [],
  bench: [],
  board: {},
  boardSnapshots: [],
  combatUnits: [],
  timers: [],
  nextId: 1,
  battleFlags: {},
  relics: [],
  starterChosen: false,
  selectedUnitId: null,
  draggedUnitId: null,
  codexPantheon: 'All',
  selectedCodexId: ''
};

const $ = (id) => document.getElementById(id);
const battlefieldEl = $('battlefield');
const shopEl = $('shop');
const benchEl = $('bench');
const sellZoneEl = $('sellZone');
const synergyEl = $('synergyPanel');
const logEl = $('combatLog');
const logFilterBtn = $('logFilterBtn');
const feedbackBannerEl = $('feedbackBanner');
const enemyPreviewEl = $('enemyPreview');
const enemyPreviewTitleEl = $('enemyPreviewTitle');
const relicPanelEl = $('relicPanel');
const codexPanelEl = $('codexPanel');
const modalChoicesEl = $('modalChoices');
const shopGoldTextEl = $('shopGoldText');
const shopLockBtn = $('shopLockBtn');
const shopLockStateEl = $('shopLockState');

const IMPORTANT_LOG_TYPES = new Set(['round', 'special', 'warning', 'boss', 'revive', 'death', 'victory', 'defeat']);

function init() {
  state.round = 1;
  state.gold = 10;
  state.playerHp = 20;
  state.mode = 'planning';
  state.shopLocked = false;
  state.runComplete = false;
  state.battleTick = 0;
  state.logFilter = 'all';
  state.shop = [];
  state.bench = [];
  state.board = {};
  state.boardSnapshots = [];
  state.combatUnits = [];
  state.nextId = 10;
  state.battleFlags = {};
  state.relics = [];
  state.starterChosen = false;
  state.selectedUnitId = null;
  state.draggedUnitId = null;
  state.codexPantheon = 'All';
  state.selectedCodexId = UNIT_LIBRARY[0]?.type || '';
  clearTimers();
  rollShop(true);
  logEl.innerHTML = '';
  setLogFilter('all');
  showFeedback('');
  log('Welcome to Riftbound Arena v0.9. Draft mythic champions, clear 20 rounds, and survive the secret round 21 mega boss.', 'special');
  log('Tip: 3 copies of the same 1★ unit combine into a 2★ unit. 3 copies of a 2★ unit combine into a 3★ unit.', 'special');
  log('Preview each enemy wave, build pantheon/source synergies, and save your run during planning.', 'special');
  render();
  showStarterChoices();
}

function makeUnit(template, side = 'player') {
  const star = template.star || 1;
  const unit = {
    id: `${side}-${state.nextId++}`,
    type: template.type || template.name.toLowerCase().replaceAll(' ', '-'),
    name: template.name,
    icon: template.icon,
    side,
    pantheon: template.pantheon || template.faction || 'Enemy',
    sourceType: template.sourceType || 'Wyrdbound',
    class: template.class || template.unitClass || 'Monster',
    faction: template.pantheon || template.faction || 'Enemy',
    unitClass: template.class || template.unitClass || 'Monster',
    rarity: template.rarity || 'Common',
    cost: template.cost || 0,
    star,
    baseHp: template.hp,
    baseDamage: template.damage,
    baseSpeed: template.attackSpeed || template.speed,
    baseArmor: template.armor || 0,
    range: template.range || 1,
    ability: template.ability || 'strike',
    abilityName: template.abilityName || 'Strike',
    abilityDescription: template.abilityDescription || template.abilityText || 'Basic attack pattern.',
    abilityText: template.abilityDescription || template.abilityText || 'Basic attack pattern.',
    x: 0,
    y: 0,
    hp: 1,
    maxHp: 1,
    shield: 0,
    damage: 1,
    speed: 1000,
    armor: 0,
    mana: 0,
    energyMax: template.energyMax || 100,
    alive: true,
    weakened: false,
    statuses: [],
    canRevive: false,
    hasRevived: false,
    attackTimer: 0,
    damageReduction: 0,
    damageMultiplier: 1,
    abilityDamageMult: 1,
    healMult: 1,
    critChance: 0,
    critDamageMult: 1.8,
    burnOnHit: false,
    corruptOnHit: false,
    dodgeChance: 0,
    manaGainMult: 1,
    shieldMult: 1,
    bossDamageMult: 1,
    shieldedDamageMult: 1,
    canDeathResist: false,
    canWyrdboundEcho: false,
    wildRegen: 0
  };
  applyStarStats(unit, true);
  return unit;
}

function applyStarStats(unit, healToFull = false) {
  const scale = starStatScale(unit.star);
  unit.maxHp = Math.round(unit.baseHp * scale.hp);
  unit.damage = Math.round(unit.baseDamage * scale.damage);
  unit.speed = Math.max(480, Math.round(unit.baseSpeed * scale.speed));
  unit.armor = Math.round(unit.baseArmor * scale.armor);
  if (healToFull) unit.hp = unit.maxHp;
  else unit.hp = Math.min(unit.hp, unit.maxHp);
}

function starStatScale(star) {
  if (star === 3) return { hp: 3.05, damage: 2.85, speed: 0.84, armor: 2.4 };
  if (star === 2) return { hp: 1.75, damage: 1.65, speed: 0.92, armor: 1.55 };
  return { hp: 1, damage: 1, speed: 1, armor: 1 };
}

function rollShop(free = false, options = {}) {
  const force = Boolean(options.force);
  const quiet = Boolean(options.quiet);
  if (state.shopLocked && !force) {
    if (!free) warnPlayer('Shop is locked. Unlock it before rerolling.');
    else if (!quiet) log('Shop locked: current offers preserved.', 'special');
    render();
    return false;
  }
  if (!free) {
    if (state.mode !== 'planning') return;
    if (state.gold < 2) return log('Not enough gold to reroll.', 'bad');
    state.gold -= 2;
  }
  state.shop = Array.from({ length: 4 }, () => {
    const template = weightedUnitPick();
    return { ...template, star: 1, shopId: `shop-${Math.random().toString(16).slice(2)}` };
  });
  render();
  return true;
}

function toggleShopLock() {
  if (state.mode !== 'planning') return warnPlayer('Shop lock can only be changed during planning.');
  state.shopLocked = !state.shopLocked;
  log(state.shopLocked ? 'Shop locked. Current offers will be preserved.' : 'Shop unlocked. Future rerolls and round refreshes can replace offers.', 'special');
  showFeedback(state.shopLocked ? 'Shop locked.' : 'Shop unlocked.');
  render();
}

function weightedUnitPick() {
  const odds = shopRarityOddsForRound(state.round);
  const availableRarities = Object.keys(odds).filter(rarity => UNIT_LIBRARY.some(unit => unit.rarity === rarity));
  const rarity = pickWeightedRarity(Object.fromEntries(availableRarities.map(key => [key, odds[key]])));
  const pool = UNIT_LIBRARY.filter(unit => unit.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)] || UNIT_LIBRARY[0];
}

function shopRarityOddsForRound(round) {
  const safeRound = Math.max(1, Math.min(state.secretRound, round || 1));
  let table = SHOP_RARITY_ODDS[0].odds;
  SHOP_RARITY_ODDS.forEach(entry => {
    if (safeRound >= entry.round) table = entry.odds;
  });
  return table;
}

function pickWeightedRarity(odds) {
  const entries = Object.entries(odds).filter(([, weight]) => weight > 0);
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = Math.random() * total;
  for (const [rarity, weight] of entries) {
    roll -= weight;
    if (roll <= 0) return rarity;
  }
  return entries[0]?.[0] || 'Common';
}

function buyUnit(shopItem) {
  if (state.mode !== 'planning') return;
  if (state.gold < shopItem.cost) return log(`Need ${shopItem.cost} gold to recruit ${shopItem.name}.`, 'bad');
  if (getBenchCount() >= BENCH_CAP && !purchaseWouldCombine(shopItem.type)) {
    return log('Bench is full. Deploy, sell, or buy a third matching copy to combine.', 'bad');
  }

  state.gold -= shopItem.cost;
  const slot = firstEmptyBenchIndex();
  if (slot === -1 && !purchaseWouldCombine(shopItem.type)) return log('Bench is full. Deploy or sell a unit first.', 'bad');
  if (slot >= 0) state.bench[slot] = makeUnit(shopItem);
  else state.bench.push(makeUnit(shopItem));
  state.shop = state.shop.filter(i => i.shopId !== shopItem.shopId);
  log(`Recruited ${shopItem.name}.`, 'good');
  combineAllUnits();
  normalizeBenchOverflow();
  render();
}

function purchaseWouldCombine(type) {
  const count = getOwnedUnits().filter(u => u.type === type && u.star === 1).length;
  return count >= 2;
}

function getBenchCount() {
  return state.bench.filter(Boolean).length;
}

function firstEmptyBenchIndex() {
  for (let i = 0; i < BENCH_CAP; i++) {
    if (!state.bench[i]) return i;
  }
  return -1;
}

function normalizeBenchOverflow() {
  for (let i = BENCH_CAP; i < state.bench.length; i++) {
    const unit = state.bench[i];
    if (!unit) continue;
    const slot = firstEmptyBenchIndex();
    if (slot >= 0) state.bench[slot] = unit;
  }
  state.bench = Array.from({ length: BENCH_CAP }, (_, i) => state.bench[i] || null);
}

function combineAllUnits() {
  let changed = true;
  while (changed) {
    changed = false;
    for (const star of [1, 2]) {
      for (const template of UNIT_LIBRARY) {
        const matches = getOwnedUnits()
          .filter(u => u.type === template.type && u.star === star)
          .sort((a, b) => Number(isOnBoard(b.id)) - Number(isOnBoard(a.id)));

        if (matches.length >= 3) {
          const keep = matches[0];
          const consumedIds = matches.slice(1, 3).map(u => u.id);
          removeUnitsByIds(consumedIds);
          keep.star += 1;
          applyStarStats(keep, true);
          log(`${keep.name} upgraded to ${starLabel(keep.star)}!`, 'special');
          changed = true;
          break;
        }
      }
      if (changed) break;
    }
  }
}

function getOwnedUnits() {
  return [...state.bench.filter(Boolean), ...Object.values(state.board)];
}

function isOnBoard(unitId) {
  return Object.values(state.board).some(u => u?.id === unitId);
}

function removeUnitsByIds(ids) {
  state.bench = Array.from({ length: BENCH_CAP }, (_, i) => {
    const unit = state.bench[i];
    return unit && !ids.includes(unit.id) ? unit : null;
  });
  Object.keys(state.board).forEach(pos => {
    if (ids.includes(state.board[pos]?.id)) delete state.board[pos];
  });
  if (ids.includes(state.selectedUnitId)) state.selectedUnitId = null;
}

function sellValueFor(unit) {
  const multiplier = unit.star >= 3 ? 9 : unit.star === 2 ? 3 : 1;
  return Math.max(1, Math.floor((unit.cost || 1) * multiplier));
}

function sellUnit(unitId, options = {}) {
  if (state.mode !== 'planning') {
    warnPlayer('Units cannot be sold during combat.');
    return false;
  }
  const unit = findOwnedUnit(unitId);
  if (!unit || unit.side !== 'player') return false;
  const refund = sellValueFor(unit);
  if (unit.star > 1 && !options.skipConfirm && typeof window !== 'undefined' && window.confirm) {
    const confirmed = window.confirm(`Sell ${unit.name} ${starLabel(unit.star)} for ${refund} gold?`);
    if (!confirmed) {
      showFeedback('Sale canceled.');
      return false;
    }
  }
  removeUnitsByIds([unitId]);
  state.gold += refund;
  log(`Sold ${unit.name} for ${refund} gold.`, 'special');
  showFeedback(`Sold ${unit.name} for ${refund} gold.`);
  state.draggedUnitId = null;
  state.selectedUnitId = null;
  sellZoneEl?.classList.remove('drag-over', 'invalid-over');
  render();
  return true;
}

function findOwnedUnit(unitId) {
  return getOwnedUnits().find(u => u.id === unitId);
}

function getTemplateByType(type) {
  return CHAMPION_POOL.find(unit => unit.type === type) || UNIT_LIBRARY.find(unit => unit.type === type);
}

function snapshotUnit(unit) {
  return {
    type: unit.type,
    star: unit.star,
    x: unit.x,
    y: unit.y
  };
}

function snapshotBoardForTrickster(round = state.round) {
  const units = Object.values(state.board)
    .filter(Boolean)
    .map(snapshotUnit);
  if (!units.length) return null;
  return {
    round,
    createdAt: Date.now(),
    units
  };
}

function captureBoardSnapshot(round = state.round) {
  const snapshot = snapshotBoardForTrickster(round);
  if (!snapshot) return;
  state.boardSnapshots.push(snapshot);
  state.boardSnapshots = state.boardSnapshots
    .filter(entry => Array.isArray(entry.units) && entry.units.length)
    .slice(-BOARD_SNAPSHOT_LIMIT);
}

function restoreBoardSnapshot(snapshot) {
  if (!snapshot || !Array.isArray(snapshot.units)) return null;
  const units = snapshot.units
    .map(unit => ({
      type: unit.type,
      star: Math.max(1, Math.min(3, unit.star || 1)),
      x: Number.isFinite(unit.x) ? unit.x : 0,
      y: Number.isFinite(unit.y) ? unit.y : 0
    }))
    .filter(unit => getTemplateByType(unit.type));
  if (!units.length) return null;
  return {
    round: snapshot.round || 0,
    createdAt: snapshot.createdAt || Date.now(),
    units
  };
}

function latestBoardSnapshotBefore(round) {
  return [...state.boardSnapshots]
    .filter(snapshot => snapshot.round < round && snapshot.units?.length)
    .sort((a, b) => b.round - a.round || b.createdAt - a.createdAt)[0] || null;
}

function snapshotShopItem(item) {
  return {
    type: item.type,
    shopId: item.shopId
  };
}

function restoreShopItem(snapshot) {
  const template = getTemplateByType(snapshot?.type);
  if (!template) return null;
  return {
    ...template,
    star: 1,
    shopId: snapshot.shopId || `shop-${Math.random().toString(16).slice(2)}`
  };
}

function restoreUnit(snapshot) {
  const template = getTemplateByType(snapshot.type);
  if (!template) return null;
  const unit = makeUnit({ ...template, star: snapshot.star || 1 });
  unit.x = snapshot.x || 0;
  unit.y = snapshot.y || 0;
  return unit;
}

function render() {
  $('roundText').textContent = state.round === state.secretRound ? 'Secret 21' : `${state.round} / ${state.maxRound}`;
  $('goldText').textContent = state.gold;
  if (shopGoldTextEl) shopGoldTextEl.textContent = `Gold: ${state.gold}`;
  $('playerHpText').textContent = state.playerHp;
  const activeCount = getActiveUnitCount();
  const activeTextEl = $('activeUnitText');
  if (activeTextEl) activeTextEl.textContent = `Active Units: ${activeCount} / ${state.activeUnitCap}`;
  $('statusText').textContent = state.runComplete ? 'Cleared' : (state.mode === 'planning' ? (state.round === state.secretRound ? 'Secret Mega Boss' : isBossRound(state.round) ? 'Boss Round' : 'Planning') : 'Battling');
  $('startBattleBtn').disabled = state.runComplete || state.mode !== 'planning' || Object.keys(state.board).length === 0;
  $('rerollBtn').disabled = state.mode !== 'planning' || state.shopLocked;
  $('rerollBtn').textContent = state.shopLocked ? 'Reroll Locked' : 'Reroll 2g';
  if (shopLockBtn) {
    shopLockBtn.disabled = state.mode !== 'planning';
    shopLockBtn.textContent = state.shopLocked ? 'Shop Locked' : 'Lock Shop';
    shopLockBtn.setAttribute('aria-pressed', String(state.shopLocked));
  }
  if (shopLockStateEl) shopLockStateEl.textContent = state.shopLocked ? 'LOCKED' : 'UNLOCKED';
  shopEl.closest?.('.shop-section')?.classList.toggle('shop-locked', state.shopLocked);
  renderBattlefield();
  renderShop();
  renderBench();
  renderSynergies();
  renderEnemyPreview();
  renderRelics();
  renderCodex();
}

function renderBattlefield() {
  if (window.RIFTBOUND_PHASER_READY && window.refreshPhaserBoard) {
    window.refreshPhaserBoard(state);
    return;
  }
  renderLegacyBattlefield();
}

function renderLegacyBattlefield() {
  battlefieldEl.innerHTML = '';
  battlefieldEl.className = 'battlefield';
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 8; x++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      if (y >= 4) tile.classList.add('player-zone', 'deployable');
      if (y >= 4 && state.mode === 'planning' && getActiveUnitCount() >= state.activeUnitCap && !state.board[posKey(x, y)]) tile.classList.add('cap-full');
      if (y <= 1) tile.classList.add('enemy-zone');
      tile.dataset.x = x;
      tile.dataset.y = y;
      tile.dataset.label = `${x + 1},${y + 1}`;
      attachTileDrag(tile, x, y);

      const unit = state.mode === 'planning'
        ? state.board[posKey(x, y)]
        : state.combatUnits.find(u => u.x === x && u.y === y && u.alive)
          || state.combatUnits.find(u => u.x === x && u.y === y && !u.alive);
      if (unit) tile.appendChild(renderUnitToken(unit, state.mode === 'planning'));
      battlefieldEl.appendChild(tile);
    }
  }
}

function renderShop() {
  shopEl.innerHTML = '';
  state.shop.forEach(item => {
    const owned = getOwnedUnits().filter(u => u.type === item.type && u.star === 1).length;
    const ownedAny = getOwnedUnits().some(u => u.type === item.type);
    const card = document.createElement('div');
    card.className = `unit-card rarity-${item.rarity.toLowerCase()} ${ownedAny ? 'owned-unit' : ''}`;
    card.innerHTML = `
      <div class="unit-card-header">
        <div>
          <div class="unit-name">${item.name} <span class="stars">★</span></div>
          <div class="unit-meta"><span class="tag">${item.pantheon}</span><span class="tag">${item.sourceType}</span><span class="tag">${item.class}</span></div>
        </div>
        <span class="pill rarity-pill">${item.rarity}</span>
      </div>
      <div class="unit-meta ability-line"><strong>${item.abilityName}:</strong> ${item.abilityDescription}</div>
      <div class="stat-grid">
        <span class="pill cost-pill">${item.cost}g</span>
        <span class="pill">HP ${item.hp}</span>
        <span class="pill">DMG ${item.damage}</span>
        <span class="pill">RNG ${item.range}</span>
        <span class="pill">SPD ${speedLabel(item.attackSpeed || item.speed)}</span>
        <span class="pill">ARM ${item.armor || 0}</span>
        <span class="pill">EN ${item.energyMax}</span>
        <span class="pill">Owned ${owned}/3</span>
      </div>
      <button class="primary-btn small buy-btn">Buy</button>
    `;
    card.querySelector('button').addEventListener('click', () => buyUnit(item));
    shopEl.appendChild(card);
  });
}

function renderBench() {
  const phaserBenchActive = Boolean(window.RIFTBOUND_PHASER_READY);
  benchEl.closest?.('.bench-section')?.classList.toggle('phaser-bench-active', phaserBenchActive);
  benchEl.innerHTML = '';
  for (let i = 0; i < BENCH_CAP; i++) {
    const slot = document.createElement('div');
    slot.className = 'bench-slot';
    slot.dataset.index = i;
    attachBenchDrag(slot, i);
    if (state.bench[i]) slot.appendChild(renderUnitToken(state.bench[i], true));
    benchEl.appendChild(slot);
  }
}

function renderSynergies() {
  const counts = getSynergyCounts();
  synergyEl.innerHTML = '';

  const visibleKeys = [...new Set(SYNERGIES.map(s => s.key))]
    .filter(key => (counts[key] || 0) > 0);
  if (!visibleKeys.length) {
    synergyEl.innerHTML = '<div class="empty-note">Deploy champions to reveal active and near-active synergies.</div>';
    return;
  }

  visibleKeys.forEach(key => {
    const tiers = synergyTiers(key);
    const current = counts[key] || 0;
    const activeTiers = tiers.filter(s => current >= s.threshold);
    const activeTier = activeTiers[activeTiers.length - 1] || null;
    const nextTier = tiers.find(s => current < s.threshold) || null;
    const targetTier = nextTier || tiers[tiers.length - 1];
    const category = tiers[0]?.category || 'Synergy';
    const progressPct = targetTier ? Math.min(100, Math.round((current / targetTier.threshold) * 100)) : 0;
    const near = nextTier && nextTier.threshold - current <= 1;
    const maxed = Boolean(activeTier && !nextTier);
    const item = document.createElement('div');
    item.className = `synergy-item ${activeTier ? 'active' : 'inactive'} ${near ? 'near' : ''} ${maxed ? 'maxed' : ''}`;
    item.innerHTML = `
      <div class="synergy-main">
        <div class="synergy-title"><strong>${key}</strong><span>${category}</span></div>
        ${activeTier ? `<div class="synergy-text"><b>Active:</b> ${activeTier.threshold} ${key} - ${activeTier.text}</div>` : ''}
        ${nextTier ? `<div class="synergy-text next"><b>Next:</b> ${nextTier.threshold} ${key} - ${nextTier.text}</div>` : '<div class="synergy-text next"><b>Max:</b> All listed tiers active.</div>'}
        <div class="synergy-progress"><div style="width:${progressPct}%"></div></div>
      </div>
      <div class="synergy-count">${current}/${targetTier?.threshold || current}<small>${maxed ? 'Maxed' : activeTier ? 'Active' : near ? 'Close' : 'Inactive'}</small></div>
    `;
    synergyEl.appendChild(item);
  });
}

function renderEnemyPreview() {
  if (!enemyPreviewEl) return;
  const tricksterSnapshot = isTricksterRound(state.round) ? latestBoardSnapshotBefore(state.round) : null;
  const picks = ENEMY_LAYOUTS[state.round] || ENEMY_LAYOUTS[state.maxRound];
  const counts = {};
  if (tricksterSnapshot) {
    tricksterSnapshot.units.forEach(unit => {
      const template = getTemplateByType(unit.type);
      if (!template) return;
      counts[template.name] = (counts[template.name] || 0) + 1;
    });
  } else {
    picks.forEach(idx => {
      const enemy = ENEMY_LIBRARY[idx];
      if (!enemy) return;
      counts[enemy.name] = (counts[enemy.name] || 0) + 1;
    });
  }
  if (enemyPreviewTitleEl) {
    enemyPreviewTitleEl.textContent = tricksterSnapshot
      ? `Trickster Round ${state.round}: Mirror of Round ${tricksterSnapshot.round}`
      : state.round === state.secretRound
      ? 'Secret Round 21'
      : isBossRound(state.round)
        ? `Boss Round ${state.round}`
      : `Round ${state.round}: ${WAVE_NAMES[state.round]}`;
  }
  enemyPreviewEl.innerHTML = Object.entries(counts).map(([name, count]) => {
    const enemy = ENEMY_LIBRARY.find(item => item.name === name) || CHAMPION_POOL.find(item => item.name === name) || UNIT_LIBRARY.find(item => item.name === name);
    const preview = enemy || { rarity: 'Rare', pantheon: 'Trickster', sourceType: 'Mirror', unitClass: 'Echo' };
    const countText = count > 1 ? ` x${count}` : '';
    return `
      <div class="preview-chip rarity-${String(preview.rarity || 'Rare').toLowerCase()}">
        <strong>${name}${countText}</strong>
        <span>${preview.pantheon} / ${preview.sourceType} / ${preview.unitClass}</span>
      </div>
    `;
  }).join('');
}

function renderRelics() {
  if (!relicPanelEl) return;
  if (!state.relics.length) {
    relicPanelEl.innerHTML = '<div class="empty-note">No relics claimed.</div>';
    return;
  }
  relicPanelEl.innerHTML = state.relics.map(id => {
    const relic = RELICS.find(item => item.id === id);
    return relic ? `<div class="relic-item"><strong>${relic.name}</strong><span>${relic.text}</span></div>` : '';
  }).join('');
}

function renderCodex() {
  if (!codexPanelEl) return;
  const pantheons = ['All', 'Hellenic', 'Norse', 'Egyptian', 'Celtic', 'Arthurian'];
  const filtered = UNIT_LIBRARY
    .filter(unit => state.codexPantheon === 'All' || unit.pantheon === state.codexPantheon)
    .sort((a, b) => a.pantheon.localeCompare(b.pantheon) || a.cost - b.cost || a.name.localeCompare(b.name));
  if (!filtered.some(unit => unit.type === state.selectedCodexId)) {
    state.selectedCodexId = filtered[0]?.type || '';
  }
  const selected = filtered.find(unit => unit.type === state.selectedCodexId) || filtered[0];
  codexPanelEl.innerHTML = `
    <div class="codex-tabs">
      ${pantheons.map(name => `<button class="ghost-btn small codex-filter ${state.codexPantheon === name ? 'active' : ''}" data-pantheon="${name}">${name}</button>`).join('')}
    </div>
    <div class="codex-body">
      <div class="codex-list">
        ${filtered.slice(0, 28).map(unit => `<button class="codex-entry rarity-${unit.rarity.toLowerCase()} ${selected?.type === unit.type ? 'active' : ''}" data-unit-type="${unit.type}"><strong>${unit.name}</strong><span>${unit.rarity} ${unit.class}</span></button>`).join('')}
      </div>
      ${selected ? `
        <div class="codex-detail rarity-${selected.rarity.toLowerCase()}">
          <strong>${selected.name}</strong>
          <span>${selected.pantheon} / ${selected.sourceType} / ${selected.class}</span>
          <span>${selected.rarity} / ${selected.cost}g / HP ${selected.hp} / DMG ${selected.damage}</span>
          <p><b>${selected.abilityName}:</b> ${selected.abilityDescription}</p>
        </div>
      ` : '<div class="empty-note">No champions found.</div>'}
    </div>
  `;

  codexPanelEl.querySelectorAll('.codex-filter').forEach(button => {
    button.addEventListener('click', () => {
      state.codexPantheon = button.dataset.pantheon;
      renderCodex();
    });
  });
  codexPanelEl.querySelectorAll('.codex-entry').forEach(button => {
    button.addEventListener('click', () => {
      state.selectedCodexId = button.dataset.unitType;
      renderCodex();
    });
  });
}

function renderUnitToken(unit, draggable = false) {
  const token = document.createElement('div');
  const selected = unit.id === state.selectedUnitId;
  token.className = `unit-token rarity-${String(unit.rarity || 'Common').toLowerCase()} ${unit.side === 'enemy' ? 'enemy' : ''} ${unit.alive === false ? 'dead' : ''} ${selected ? 'selected' : ''}`;
  token.dataset.unitId = unit.id;
  token.title = `${unit.name} ${starLabel(unit.star)}\n${unit.pantheon} • ${unit.sourceType} • ${unit.unitClass} • ${unit.rarity}\nHP ${Math.max(0, Math.round(unit.hp))}/${unit.maxHp} | Energy ${Math.round(unit.mana || 0)}/${unit.energyMax} | DMG ${unit.damage} | RNG ${unit.range} | SPD ${speedLabel(unit.speed)} | ARM ${unit.armor}\n${unit.abilityName}: ${unit.abilityText}${unit.side === 'player' && state.mode === 'planning' ? '\nDrag to deploy. Double-click to sell.' : ''}`;

  if (draggable && state.mode === 'planning' && unit.side === 'player') {
    token.draggable = true;
    token.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', unit.id);
      e.dataTransfer.effectAllowed = 'move';
      state.draggedUnitId = unit.id;
      state.selectedUnitId = unit.id;
      token.classList.add('dragging');
      if (window.RIFTBOUND_PHASER_READY && window.beginPhaserBoardDrag) window.beginPhaserBoardDrag(state);
    });
    token.addEventListener('dragend', () => {
      token.classList.remove('dragging');
      clearDragState();
    });
    token.addEventListener('dblclick', () => sellUnit(unit.id));
  }

  const hpPct = Math.max(0, Math.round((unit.hp / unit.maxHp) * 100));
  const manaPct = Math.max(0, Math.min(100, Math.round(((unit.mana || 0) / (unit.energyMax || 100)) * 100)));
  const shieldText = unit.shield > 0 ? `<div class="shield-text">+${Math.round(unit.shield)} shield</div>` : '';
  const statusText = unit.statuses?.length ? `<div class="status-text">${unit.statuses.map(s => s.type).join(', ')}</div>` : '';
  const defeatedText = unit.alive === false ? '<div class="defeated-text">Defeated</div>' : '';
  token.innerHTML = `
    <div class="star-row">${starLabel(unit.star)}</div>
    <div class="icon">${unit.icon}</div>
    <div class="token-name">${unit.name}</div>
    <div class="token-tags"><span>${unit.pantheon}</span><span>${unit.sourceType}</span><span>${unit.unitClass}</span></div>
    ${defeatedText}
    ${shieldText}${statusText}
    <div class="bar-stack">
      <div class="bar-label"><span>HP</span><span>${Math.max(0, Math.round(unit.hp))}/${unit.maxHp}</span></div>
      <div class="healthbar hp-bar"><div class="healthbar-fill" style="width:${hpPct}%"></div></div>
      <div class="bar-label energy"><span>EN</span><span>${Math.round(unit.mana || 0)}/${unit.energyMax}</span></div>
      <div class="healthbar mana"><div class="mana-fill" style="width:${manaPct}%"></div></div>
    </div>
  `;
  return token;
}

function attachTileDrag(tile, x, y) {
  tile.addEventListener('dragover', (e) => {
    if (state.mode !== 'planning' || y < 4) return;
    e.preventDefault();
    tile.classList.add('drag-over');
  });
  tile.addEventListener('dragleave', () => tile.classList.remove('drag-over'));
  tile.addEventListener('drop', (e) => {
    e.preventDefault();
    tile.classList.remove('drag-over');
    if (state.mode !== 'planning' || y < 4) return;
    const unitId = e.dataTransfer.getData('text/plain');
    moveUnitToBoard(unitId, x, y);
  });
}

function attachBenchDrag(slot, index) {
  slot.addEventListener('dragover', (e) => {
    if (state.mode !== 'planning') return;
    e.preventDefault();
    slot.classList.add('drag-over');
  });
  slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    slot.classList.remove('drag-over');
    if (state.mode !== 'planning') return;
    const unitId = e.dataTransfer.getData('text/plain');
    moveUnitToBench(unitId, index);
  });
  slot.addEventListener('click', (e) => {
    if (e.target !== slot || state.mode !== 'planning') return;
    if (!state.selectedUnitId || !isOnBoard(state.selectedUnitId)) return;
    moveUnitToBench(state.selectedUnitId, index);
  });
}

function selectPlacementUnit(unitId) {
  if (state.mode !== 'planning') return;
  const unit = findOwnedUnit(unitId);
  if (!unit) return;
  state.selectedUnitId = state.selectedUnitId === unitId ? null : unitId;
  if (state.selectedUnitId) showFeedback(`${unit.name} selected. Drag from the bench onto a blue Phaser deployment cell to place them.`);
  else showFeedback('');
  render();
}

function handlePhaserCellClick(x, y) {
  if (state.mode !== 'planning') return;
  if (y < 4) {
    warnPlayer('Player units can only deploy on the lower blue rows.');
    return;
  }
  if (state.selectedUnitId && isOnBoard(state.selectedUnitId)) {
    moveUnitToBoard(state.selectedUnitId, x, y);
    return;
  }
  showFeedback('Drag units onto blue Phaser deployment cells, or click a deployed unit then a destination cell.');
}

function handlePhaserUnitClick(unitId) {
  if (state.mode !== 'planning') return;
  if (isOnBoard(unitId)) selectPlacementUnit(unitId);
}

function handlePhaserBoardUnitDragStart(unitId) {
  if (state.mode !== 'planning' || !isOnBoard(unitId)) return;
  state.draggedUnitId = unitId;
  state.selectedUnitId = unitId;
  showFeedback('Drag to another blue deployment cell, or drop onto a bench slot.');
  benchEl?.classList.add('board-drop-active');
  renderBench();
}

function handlePhaserBenchUnitDragStart(unitId) {
  if (state.mode !== 'planning') return;
  state.draggedUnitId = unitId;
  state.selectedUnitId = unitId;
  showFeedback('Drag from the Phaser bench onto a blue deployment cell, or another bench slot.');
}

function handlePhaserBoardUnitDrop(unitId, preview) {
  if (state.mode !== 'planning' || !isOnBoard(unitId) || !preview?.valid) return false;
  moveUnitToBoard(unitId, preview.x, preview.y);
  state.draggedUnitId = null;
  state.selectedUnitId = null;
  showFeedback('');
  return true;
}

function handlePhaserBenchUnitBoardDrop(unitId, preview) {
  if (state.mode !== 'planning' || isOnBoard(unitId) || !preview?.valid) return false;
  moveUnitToBoard(unitId, preview.x, preview.y);
  state.draggedUnitId = null;
  state.selectedUnitId = null;
  showFeedback('');
  return true;
}

function handlePhaserBenchUnitBenchDrop(unitId, index) {
  if (state.mode !== 'planning' || isOnBoard(unitId)) return false;
  moveUnitToBench(unitId, index);
  showFeedback('');
  return true;
}

function handlePhaserBoardUnitBenchSlotDrop(unitId, index) {
  if (state.mode !== 'planning' || !isOnBoard(unitId)) return false;
  moveUnitToBench(unitId, index);
  showFeedback('Unit returned to the bench.');
  return true;
}

function handlePhaserBoardUnitDropRejected(unitId, preview) {
  if (unitId && !isOnBoard(unitId)) {
    state.draggedUnitId = null;
    state.selectedUnitId = null;
    benchEl?.classList.remove('board-drop-active');
    renderBench();
    return;
  }
  state.draggedUnitId = null;
  state.selectedUnitId = null;
  benchEl?.classList.remove('board-drop-active');
  warnPlayer(dropWarningFor(preview?.reason));
  renderBench();
}

function handlePhaserBenchUnitDropRejected(unitId, preview) {
  state.draggedUnitId = null;
  state.selectedUnitId = null;
  warnPlayer(dropWarningFor(preview?.reason));
  renderBench();
}

function handlePhaserBenchSlotClick(index) {
  if (state.mode !== 'planning') return;
  if (!state.selectedUnitId || !isOnBoard(state.selectedUnitId)) return;
  moveUnitToBench(state.selectedUnitId, index);
}

function handlePhaserBoardUnitBenchDrop(unitId, clientX, clientY) {
  if (state.mode !== 'planning' || !isOnBoard(unitId)) return false;
  const moved = moveBoardUnitToBenchAtPoint(unitId, clientX, clientY);
  if (moved) showFeedback('Unit returned to the bench.');
  return moved;
}

function handlePhaserUnitSellDrop(unitId, clientX, clientY) {
  return handleUnitSellDrop(unitId, clientX, clientY);
}

function benchSlotAtPoint(clientX, clientY) {
  const slots = [...benchEl.querySelectorAll('.bench-slot')];
  return slots.find(slot => {
    const rect = slot.getBoundingClientRect();
    return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
  }) || null;
}

function highlightBenchDropSlot(clientX, clientY) {
  if (!benchEl) return;
  const activeSlot = benchSlotAtPoint(clientX, clientY);
  benchEl.querySelectorAll('.bench-slot').forEach(slot => {
    slot.classList.toggle('drag-over', slot === activeSlot);
  });
}

function clearBenchDropHighlights() {
  if (!benchEl) return;
  benchEl.querySelectorAll('.bench-slot').forEach(slot => slot.classList.remove('drag-over'));
}

function sellZoneAtPoint(clientX, clientY) {
  if (!sellZoneEl) return false;
  const rect = sellZoneEl.getBoundingClientRect();
  return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
}

function canSellDraggedUnit(unitId) {
  const unit = findOwnedUnit(unitId);
  return Boolean(state.mode === 'planning' && unit && unit.side === 'player');
}

function updateSellZoneHighlight(clientX, clientY) {
  if (!sellZoneEl || !state.draggedUnitId) return;
  const overZone = sellZoneAtPoint(clientX, clientY);
  const valid = overZone && canSellDraggedUnit(state.draggedUnitId);
  sellZoneEl.classList.toggle('drag-over', valid);
  sellZoneEl.classList.toggle('invalid-over', overZone && !valid);
}

function clearSellZoneHighlight() {
  sellZoneEl?.classList.remove('drag-over', 'invalid-over');
}

function handleUnitSellDrop(unitId, clientX = null, clientY = null) {
  if (!unitId) return false;
  if (clientX !== null && clientY !== null && !sellZoneAtPoint(clientX, clientY)) return false;
  if (!canSellDraggedUnit(unitId)) {
    if (state.mode !== 'planning') warnPlayer('Units cannot be sold during combat.');
    clearSellZoneHighlight();
    return false;
  }
  return sellUnit(unitId);
}

function moveBoardUnitToBenchAtPoint(unitId, clientX, clientY) {
  if (state.mode !== 'planning' || !isOnBoard(unitId)) return false;
  const element = document.elementFromPoint?.(clientX, clientY);
  const slot = element?.closest?.('.bench-slot') || benchSlotAtPoint(clientX, clientY);
  if (!slot) return false;
  const index = Number(slot.dataset.index);
  if (!Number.isInteger(index)) return false;
  moveUnitToBench(unitId, index);
  benchEl?.classList.remove('board-drop-active');
  return true;
}

function attachSellZoneHandlers() {
  if (!sellZoneEl) return;
  sellZoneEl.addEventListener('dragover', (e) => {
    if (!state.draggedUnitId) return;
    e.preventDefault();
    updateSellZoneHighlight(e.clientX, e.clientY);
    e.dataTransfer.dropEffect = canSellDraggedUnit(state.draggedUnitId) ? 'move' : 'none';
  });
  sellZoneEl.addEventListener('dragleave', () => clearSellZoneHighlight());
  sellZoneEl.addEventListener('drop', (e) => {
    e.preventDefault();
    const unitId = state.draggedUnitId || e.dataTransfer.getData('text/plain');
    if (!unitId || !canSellDraggedUnit(unitId)) {
      warnPlayer('Only player units can be sold during planning.');
      clearSellZoneHighlight();
      return;
    }
    handleUnitSellDrop(unitId, e.clientX, e.clientY);
  });
}

function clearDragState() {
  state.draggedUnitId = null;
  state.selectedUnitId = null;
  benchEl?.classList.remove('board-drop-active');
  clearBenchDropHighlights();
  clearSellZoneHighlight();
  if (window.endPhaserBoardDrag) window.endPhaserBoardDrag();
  renderBench();
}

function attachPhaserDropHandlers() {
  if (!battlefieldEl) return;
  battlefieldEl.addEventListener('dragover', (e) => {
    if (!window.RIFTBOUND_PHASER_READY || state.mode !== 'planning' || !state.draggedUnitId) return;
    e.preventDefault();
    const preview = window.previewPhaserBoardDrop?.(e.clientX, e.clientY, state);
    if (preview?.valid) {
      e.dataTransfer.dropEffect = 'move';
    } else {
      e.dataTransfer.dropEffect = 'none';
    }
  });

  battlefieldEl.addEventListener('dragleave', (e) => {
    if (!window.RIFTBOUND_PHASER_READY || !state.draggedUnitId) return;
    if (!battlefieldEl.contains(e.relatedTarget)) window.previewPhaserBoardDrop?.(-1, -1, state);
  });

  battlefieldEl.addEventListener('drop', (e) => {
    if (!window.RIFTBOUND_PHASER_READY || state.mode !== 'planning') return;
    e.preventDefault();
    const unitId = state.draggedUnitId || e.dataTransfer.getData('text/plain');
    const preview = window.previewPhaserBoardDrop?.(e.clientX, e.clientY, state);
    if (!unitId || !preview?.valid) {
      window.flashInvalidPhaserDrop?.(e.clientX, e.clientY);
      warnPlayer(dropWarningFor(preview?.reason));
      clearDragState();
      return;
    }

    const beforeActive = getActiveUnitCount();
    moveUnitToBoard(unitId, preview.x, preview.y);
    if (getActiveUnitCount() === beforeActive && state.bench.some(unit => unit?.id === unitId)) {
      window.flashInvalidPhaserDrop?.(e.clientX, e.clientY);
    }
    clearDragState();
  });

  document.addEventListener('dragover', (e) => {
    if (state.draggedUnitId) e.preventDefault();
  });

  document.addEventListener('drop', (e) => {
    if (!state.draggedUnitId || battlefieldEl.contains(e.target)) return;
    e.preventDefault();
    showFeedback('Deployment canceled. Unit returned to the bench.');
    clearDragState();
  });

  document.addEventListener('pointerup', (e) => {
    if (state.draggedUnitId && sellZoneAtPoint(e.clientX, e.clientY)) {
      handleUnitSellDrop(state.draggedUnitId, e.clientX, e.clientY);
      return;
    }
    if (!state.draggedUnitId || !isOnBoard(state.draggedUnitId)) return;
    if (moveBoardUnitToBenchAtPoint(state.draggedUnitId, e.clientX, e.clientY)) {
      showFeedback('Unit returned to the bench.');
    } else {
      clearBenchDropHighlights();
    }
  });

  document.addEventListener('pointermove', (e) => {
    if (state.draggedUnitId) updateSellZoneHighlight(e.clientX, e.clientY);
    if (!state.draggedUnitId || !isOnBoard(state.draggedUnitId)) return;
    highlightBenchDropSlot(e.clientX, e.clientY);
  });
}

function dropWarningFor(reason) {
  if (reason === 'enemy-row') return 'Player units can only deploy on the lower blue rows.';
  if (reason === 'combat') return 'Deployment is locked during combat.';
  if (reason === 'cap') return `Active unit cap reached: ${state.activeUnitCap}/${state.activeUnitCap}. Bench units do not count, but you must free a battlefield slot before deploying another unit.`;
  if (reason === 'occupied') return 'That cell is occupied. Drag an already deployed unit to swap battlefield positions.';
  if (reason === 'outside') return 'Drop canceled. Drag onto a blue deployment cell to deploy.';
  if (reason === 'bench') return 'Drop canceled. Drag onto a blue deployment cell or a bench slot.';
  return 'Invalid deployment cell.';
}

function moveUnitToBoard(unitId, x, y) {
  const key = posKey(x, y);
  const existing = state.board[key];
  const fromBenchIndex = state.bench.findIndex(u => u?.id === unitId);
  const fromBoardKey = Object.keys(state.board).find(k => state.board[k]?.id === unitId);

  const deployingNewActive = fromBenchIndex >= 0 && !existing;
  if (deployingNewActive && getActiveUnitCount() >= state.activeUnitCap) {
    warnPlayer(`Active unit cap reached: ${state.activeUnitCap}/${state.activeUnitCap}. Bench units do not count, but you must free a battlefield slot before deploying another unit.`);
    render();
    return;
  }

  let unit;
  if (fromBenchIndex >= 0) {
    unit = state.bench[fromBenchIndex];
    state.bench[fromBenchIndex] = null;
  } else if (fromBoardKey) {
    unit = state.board[fromBoardKey];
    delete state.board[fromBoardKey];
  }
  if (!unit) return;

  if (existing) {
    if (fromBenchIndex >= 0) state.bench[fromBenchIndex] = existing;
    else if (fromBoardKey) state.board[fromBoardKey] = existing;
    else {
      const benchSlot = firstEmptyBenchIndex();
      if (benchSlot >= 0) state.bench[benchSlot] = existing;
    }
  }
  unit.x = x;
  unit.y = y;
  state.board[key] = unit;
  state.selectedUnitId = null;
  state.draggedUnitId = null;
  showFeedback('');
  log(`${unit.name} deployed. Active units: ${getActiveUnitCount()}/${state.activeUnitCap}.`, 'special');
  render();
}

function moveUnitToBench(unitId, index) {
  const fromBoardKey = Object.keys(state.board).find(k => state.board[k]?.id === unitId);
  const fromBenchIndex = state.bench.findIndex(u => u?.id === unitId);
  let unit;
  if (fromBoardKey) {
    unit = state.board[fromBoardKey];
    delete state.board[fromBoardKey];
  } else if (fromBenchIndex >= 0) {
    unit = state.bench[fromBenchIndex];
    state.bench[fromBenchIndex] = null;
  }
  if (!unit) return;

  const displaced = state.bench[index];
  delete unit.x;
  delete unit.y;
  state.bench[index] = unit;
  if (displaced) {
    if (fromBoardKey) {
      const [x, y] = fromBoardKey.split(',').map(Number);
      displaced.x = x;
      displaced.y = y;
      state.board[fromBoardKey] = displaced;
    }
    else if (fromBenchIndex >= 0) state.bench[fromBenchIndex] = displaced;
  }
  state.selectedUnitId = null;
  state.draggedUnitId = null;
  clearBenchDropHighlights();
  showFeedback('');
  render();
}

function startBattle() {
  if (state.mode !== 'planning' || state.runComplete) return;
  if (Object.keys(state.board).length === 0) return warnPlayer('Deploy at least one unit before starting battle.');
  if (getActiveUnitCount() > state.activeUnitCap) return warnPlayer(`Too many active units deployed: ${getActiveUnitCount()}/${state.activeUnitCap}.`);
  showFeedback('');
  state.selectedUnitId = null;
  state.draggedUnitId = null;
  if (window.endPhaserBoardDrag) window.endPhaserBoardDrag();
  state.mode = 'battle';
  state.battleTick = 0;
  clearTimers();
  state.battleFlags = { egyptianDeathResistUsed: false, wyrdboundEchoUsed: false };
  captureBoardSnapshot(state.round);

  const playerUnits = Object.values(state.board).map(u => cloneForCombat(u));
  const enemyUnits = spawnEnemies(state.round);
  state.combatUnits = [...playerUnits, ...enemyUnits];
  beginRoundLog(state.round, playerUnits, enemyUnits);
  if (isBossRound(state.round) && window.playBossIntroEffect) window.playBossIntroEffect();
  applySynergyBonuses(state.combatUnits);
  render();
  state.timers.push(setInterval(combatTick, 420));
}

function beginRoundLog(round, playerUnits, enemyUnits) {
  const roundLabel = round === state.secretRound ? 'SECRET ROUND 21' : isBossRound(round) ? `BOSS ROUND ${round}` : `ROUND ${round} / ${state.maxRound}`;
  const enemySummary = enemyUnits.map(u => u.name).join(', ');
  const squadSummary = playerUnits.map(u => `${u.name} ${starLabel(u.star)}`).join(', ');
  log(`━━━━━━━━ ${roundLabel}: ${WAVE_NAMES[round]} ━━━━━━━━`, 'round');
  log(`Your squad (${playerUnits.length}/${state.activeUnitCap} active): ${squadSummary || 'No units deployed'}.`, 'special');
  log(`Enemies sighted: ${enemySummary}.`, 'bad');
  if (round === state.secretRound) {
    log('The final rift opens. Secret Round 21 begins: the mega boss carries every surviving boss power into one war council.', 'boss');
    log('Boss rule: defeat The Kingdom That Never Healed and the gathered bosses to complete the run.', 'boss');
  } else if (isTricksterRound(round)) {
    const snapshot = latestBoardSnapshotBefore(round);
    if (snapshot) log(`Trickster round: your battlefield from round ${snapshot.round} has returned as enemy echoes.`, 'boss');
    else log('Trickster round: no old formation was found, so the rift sends a normal wave.', 'boss');
  } else if (isBossRound(round)) {
    log('Boss round: defeat the milestone enemy to claim a Sacred Arsenal item.', 'boss');
  }
}

function cloneForCombat(unit) {
  return {
    ...unit,
    hp: unit.maxHp,
    shield: 0,
    mana: 0,
    alive: true,
    weakened: false,
    statuses: [],
    canRevive: false,
    hasRevived: false,
    attackTimer: 0,
    damageReduction: 0,
    damageMultiplier: 1,
    abilityDamageMult: 1,
    healMult: 1,
    critChance: unit.unitClass === 'Assassin' ? 0.1 : 0,
    critDamageMult: 1.8,
    burnOnHit: false,
    dodgeChance: 0,
    manaGainMult: 1,
    shieldMult: 1,
    bossDamageMult: 1,
    shieldedDamageMult: 1,
    corruptOnHit: false,
    canDeathResist: false,
    canWyrdboundEcho: false,
    wildRegen: 0,
    castEnergyGain: 0,
    dodgeEnergyGain: 0,
    extraShotChance: 0,
    killEnergyGain: 0,
    bruiserMissingHpDamageMult: 0,
    overhealShieldMult: 0,
    healShieldOnHealed: 0,
    healerPeriodicHeal: false,
    spiritTeamEnergy: false,
    lowHpSpeedMult: 1
  };
}

function spawnEnemies(round) {
  if (isTricksterRound(round)) {
    const tricksterUnits = spawnTricksterEnemies(round);
    if (tricksterUnits.length) return tricksterUnits;
  }
  return spawnLayoutEnemies(round);
}

function spawnLayoutEnemies(round) {
  const picks = ENEMY_LAYOUTS[round] || ENEMY_LAYOUTS[state.maxRound];
  return picks.map((idx, i) => {
    const base = ENEMY_LIBRARY[idx];
    const isMegaBossRound = round === state.secretRound;
    const isBossUnit = base.unitClass === 'Boss' || base.class === 'Boss';
    const normalScale = 1 + (Math.min(round, state.maxRound) - 1) * 0.18;
    const bossScale = isMegaBossRound ? 1 : 1 + (Math.min(round, state.maxRound) - 1) * 0.08;
    const scale = isBossUnit ? bossScale : normalScale;
    const unit = makeUnit({
      ...base,
      hp: Math.round(base.hp * scale),
      damage: Math.round(base.damage * scale),
      class: isBossUnit ? 'Boss' : base.class,
      unitClass: isBossUnit ? 'Boss' : base.unitClass
    }, 'enemy');
    unit.x = ENEMY_SLOTS[i]?.[0] ?? 3;
    unit.y = ENEMY_SLOTS[i]?.[1] ?? 0;
    return unit;
  });
}

function spawnTricksterEnemies(round) {
  const snapshot = latestBoardSnapshotBefore(round);
  if (!snapshot) return [];
  const scale = 0.75 + Math.min(round, state.maxRound) * 0.05;
  return snapshot.units
    .slice()
    .sort((a, b) => (b.star || 1) - (a.star || 1))
    .slice(0, ENEMY_SLOTS.length)
    .map((snapshotUnit, i) => {
      const template = getTemplateByType(snapshotUnit.type);
      const unit = makeUnit({ ...template, star: snapshotUnit.star || 1 }, 'enemy');
      unit.name = `Echo ${unit.name}`;
      unit.hp = Math.round(unit.hp * scale);
      unit.maxHp = Math.round(unit.maxHp * scale);
      unit.damage = Math.round(unit.damage * scale);
      unit.armor = Math.round(unit.armor * (1 + Math.min(0.45, round * 0.015)));
      unit.x = Number.isFinite(snapshotUnit.x) ? Math.max(0, Math.min(7, snapshotUnit.x)) : ENEMY_SLOTS[i][0];
      unit.y = Number.isFinite(snapshotUnit.y) ? Math.max(0, Math.min(1, 5 - snapshotUnit.y)) : ENEMY_SLOTS[i][1];
      return unit;
    });
}

function applySynergyBonuses(units) {
  const player = units.filter(u => u.side === 'player');
  const counts = getSynergyCounts();
  const active = SYNERGIES.filter(s => (counts[s.key] || 0) >= s.threshold);
  const tier = (key) => synergyTier(key, counts);
  const addMaxHp = (unit, pct) => {
    const bonus = Math.round(unit.maxHp * pct);
    unit.maxHp += bonus;
    unit.hp += bonus;
  };
  const addShield = (unit, pct) => {
    unit.shield += Math.round(unit.maxHp * pct);
  };

  active.forEach(s => log(`${s.key} synergy active: ${s.text}`, 'good'));
  applyRelicBonuses(player);

  const hellenicTier = tier('Hellenic');
  player.filter(u => u.pantheon === 'Hellenic').forEach(u => {
    if (hellenicTier >= 4) {
      u.abilityDamageMult += 0.2;
      u.manaGainMult += 0.12;
    } else if (hellenicTier >= 2) {
      u.abilityDamageMult += 0.1;
    }
    if (hellenicTier >= 6) u.castEnergyGain = 8;
  });

  const norseTier = tier('Norse');
  player.filter(u => u.pantheon === 'Norse').forEach(u => {
    if (norseTier >= 4) {
      u.damageMultiplier += 0.15;
      u.armor += 10;
    } else if (norseTier >= 2) {
      u.damageMultiplier += 0.1;
    }
    if (norseTier >= 6) u.lowHpSpeedMult = 0.75;
  });

  const egyptianTier = tier('Egyptian');
  player.filter(u => u.pantheon === 'Egyptian').forEach(u => {
    if (egyptianTier >= 2) {
      u.healMult += 0.1;
      u.shieldMult += 0.1;
    }
    if (egyptianTier >= 4) addShield(u, 0.08);
    if (egyptianTier >= 6) u.canDeathResist = true;
  });

  const celticTier = tier('Celtic');
  player.filter(u => u.pantheon === 'Celtic').forEach(u => {
    if (celticTier >= 2) u.dodgeChance += celticTier >= 4 ? 0.1 : 0.08;
    if (celticTier >= 4) u.wildRegen = 4;
    if (celticTier >= 6) {
      u.wildRegen = 5;
      u.dodgeEnergyGain = Math.max(u.dodgeEnergyGain, 10);
    }
  });

  const arthurianTier = tier('Arthurian');
  player.filter(u => u.pantheon === 'Arthurian').forEach(u => {
    if (arthurianTier >= 2) u.armor += 10;
    if (arthurianTier >= 4) addShield(u, 0.12);
    if (arthurianTier >= 6) u.shieldedDamageMult += 0.25;
  });

  const guardianTier = tier('Guardian');
  player.filter(u => u.unitClass === 'Guardian').forEach(u => {
    if (guardianTier >= 2) u.armor += 15;
    if (guardianTier >= 6) addMaxHp(u, 0.15);
  });
  if (guardianTier >= 4) player.forEach(u => addShield(u, 0.06));

  const rangerTier = tier('Ranger');
  player.filter(u => u.unitClass === 'Ranger').forEach(u => {
    if (rangerTier >= 4) u.speed = Math.round(u.speed * 0.8);
    else if (rangerTier >= 2) u.speed = Math.round(u.speed * 0.9);
    if (rangerTier >= 6) u.extraShotChance = 0.25;
  });

  const mageTier = tier('Mage');
  player.filter(u => u.unitClass === 'Mage').forEach(u => {
    if (mageTier >= 4) u.abilityDamageMult += 0.2;
    else if (mageTier >= 2) u.abilityDamageMult += 0.1;
    if (mageTier >= 6) u.manaGainMult += 0.2;
  });

  const healerTier = tier('Healer');
  player.filter(u => u.unitClass === 'Healer').forEach(u => {
    if (healerTier >= 4) {
      u.healMult += 0.25;
      u.overhealShieldMult = 0.35;
    } else if (healerTier >= 2) {
      u.healMult += 0.15;
    }
    if (healerTier >= 6) u.healerPeriodicHeal = true;
  });

  const assassinTier = tier('Assassin');
  player.filter(u => u.unitClass === 'Assassin').forEach(u => {
    if (assassinTier >= 4) {
      u.critChance += 0.2;
      u.critDamageMult += 0.35;
    } else if (assassinTier >= 2) {
      u.critChance += 0.1;
    }
    if (assassinTier >= 6) u.killEnergyGain = 35;
  });

  const bruiserTier = tier('Bruiser');
  player.filter(u => u.unitClass === 'Bruiser').forEach(u => {
    if (bruiserTier >= 4) addMaxHp(u, 0.2);
    else if (bruiserTier >= 2) addMaxHp(u, 0.1);
    if (bruiserTier >= 6) u.bruiserMissingHpDamageMult = 0.3;
  });

  const worshiperTier = tier('Worshiper');
  player.filter(u => u.sourceType === 'Worshiper').forEach(u => {
    if (worshiperTier >= 2) addMaxHp(u, 0.15);
  });
  if (worshiperTier >= 4) player.forEach(u => addShield(u, 0.05));

  const empyreanTier = tier('Empyrean');
  player.filter(u => u.sourceType === 'Empyrean').forEach(u => {
    if (empyreanTier >= 6) u.abilityDamageMult += 0.1;
    else if (empyreanTier >= 3) u.abilityDamageMult += 0.05;
  });

  const wyrdboundTier = tier('Wyrdbound');
  player.filter(u => u.sourceType === 'Wyrdbound').forEach(u => {
    if (wyrdboundTier >= 2) u.corruptOnHit = true;
    if (wyrdboundTier >= 4) u.canWyrdboundEcho = true;
  });

  const heroicTier = tier('Heroic');
  player.filter(u => u.sourceType === 'Heroic').forEach(u => {
    if (heroicTier >= 2) u.critChance += 0.1;
    if (heroicTier >= 4) u.bossDamageMult += 0.3;
  });

  const sacredTier = tier('Sacred');
  player.filter(u => u.sourceType === 'Sacred').forEach(u => {
    if (sacredTier >= 2) {
      u.healMult += 0.15;
      u.shieldMult += 0.15;
    }
  });
  if (sacredTier >= 4) player.forEach(u => { u.healShieldOnHealed = 0.18; });

  const spiritTier = tier('Spirit');
  player.filter(u => u.sourceType === 'Spirit').forEach(u => {
    if (spiritTier >= 2) u.manaGainMult += 0.25;
    if (spiritTier >= 4) u.spiritTeamEnergy = true;
  });

  const faeTier = tier('Fae');
  player.filter(u => u.sourceType === 'Fae').forEach(u => {
    if (faeTier >= 2) u.dodgeChance += 0.12;
    if (faeTier >= 4) u.dodgeEnergyGain = Math.max(u.dodgeEnergyGain, 10);
  });
}

function hasRelic(id) {
  return state.relics.includes(id);
}

function applyRelicBonuses(player) {
  player.forEach(unit => {
    if (hasRelic('aegis-shard') && (unit.unitClass === 'Guardian' || unit.pantheon === 'Arthurian')) {
      unit.shield += Math.round(unit.maxHp * 0.12);
    }
    if (hasRelic('thunder-seed') && (unit.unitClass === 'Mage' || unit.sourceType === 'Empyrean')) {
      unit.abilityDamageMult += 0.22;
    }
    if (hasRelic('valkyrie-horn') && (unit.sourceType === 'Heroic' || unit.pantheon === 'Norse')) {
      unit.damageMultiplier += 0.18;
    }
    if (hasRelic('ankh-of-return') && (unit.unitClass === 'Healer' || unit.pantheon === 'Egyptian')) {
      unit.healMult += 0.25;
      unit.shieldMult += 0.15;
    }
    if (hasRelic('fae-briar') && (unit.sourceType === 'Fae' || unit.pantheon === 'Celtic')) {
      unit.dodgeChance += 0.1;
    }
    if (hasRelic('black-grail') && unit.sourceType === 'Wyrdbound') {
      unit.corruptOnHit = true;
      unit.damageMultiplier += 0.08;
    }
    if (hasRelic('sun-forged-spear') && unit.unitClass === 'Ranger') {
      unit.speed = Math.round(unit.speed * 0.88);
      unit.damageMultiplier += 0.12;
    }
    if (hasRelic('wyrd-iron-crown') && unit.unitClass === 'Bruiser') {
      const bonus = Math.round(unit.maxHp * 0.16);
      unit.maxHp += bonus;
      unit.hp += bonus;
      unit.armor += 4;
    }
  });
}

function combatTick() {
  state.battleTick += 1;
  const livingPlayers = state.combatUnits.filter(u => u.side === 'player' && u.alive);
  const livingEnemies = state.combatUnits.filter(u => u.side === 'enemy' && u.alive);
  if (!livingPlayers.length || !livingEnemies.length) return endBattle(livingPlayers.length > 0);

  state.combatUnits.filter(u => u.alive).forEach(unit => processStatuses(unit));
  processTeamSynergyTicks();

  state.combatUnits.filter(u => u.alive).forEach(unit => {
    unit.attackTimer -= 420;
    if (unit.attackTimer <= 0) {
      const target = chooseTarget(unit);
      if (!target) return;
      if (distance(unit, target) <= unit.range) {
        performAttack(unit, target);
        unit.attackTimer = unit.lowHpSpeedMult < 1 && unit.hp < unit.maxHp / 2
          ? Math.max(300, Math.round(unit.speed * unit.lowHpSpeedMult))
          : unit.speed;
      } else {
        stepToward(unit, target);
        gainEnergy(unit, 12, distance(unit, target) <= unit.range ? target : null);
        unit.attackTimer = Math.max(320, Math.floor(unit.speed * 0.45));
      }
    }
  });
  renderBattlefield();
}

function processTeamSynergyTicks() {
  const players = state.combatUnits.filter(u => u.side === 'player' && u.alive);
  if (!players.length) return;

  if (state.battleTick % 3 === 0) {
    const healerCount = players.filter(u => u.healerPeriodicHeal).length;
    if (healerCount > 0) {
      const target = players
        .filter(u => u.hp < u.maxHp)
        .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
      if (target) healUnit(target, 5 + healerCount * 3, 'Healer synergy', true);
    }
  }

  if (state.battleTick % 4 === 0) {
    const spiritCount = players.filter(u => u.spiritTeamEnergy).length;
    if (spiritCount > 0) {
      players.forEach(unit => gainEnergy(unit, 3 + spiritCount, null));
    }
  }
}

function processStatuses(unit) {
  if (unit.wildRegen > 0 && unit.alive && unit.hp < unit.maxHp) {
    healUnit(unit, unit.wildRegen, 'Wild magic', true);
  }
  if (!unit.statuses?.length) return;
  const activeStatuses = [];
  unit.statuses.forEach(status => {
    if (status.type === 'burn') {
      applyDamage(unit, status.damage, { source: status.sourceName || 'Burn', sourceName: status.sourceName || 'Burn', trueDamage: true, ignoreDodge: true, isDot: true });
    }
    if (status.type === 'corruption') {
      applyDamage(unit, status.damage, { source: status.sourceName || 'Corruption', sourceName: status.sourceName || 'Corruption', trueDamage: true, ignoreDodge: true, isDot: true, dotType: 'corruption' });
    }
    status.ticks -= 1;
    if (status.ticks > 0 && unit.alive) activeStatuses.push(status);
  });
  unit.statuses = activeStatuses;
}

function chooseTarget(unit) {
  const enemies = state.combatUnits.filter(u => u.side !== unit.side && u.alive);
  if (!enemies.length) return null;
  if (unit.unitClass === 'Assassin') {
    const ranged = enemies.filter(u => u.range >= 2);
    if (ranged.length) return ranged.sort((a, b) => a.hp - b.hp)[0];
  }
  enemies.sort((a, b) => distance(unit, a) - distance(unit, b));
  return enemies[0];
}

function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function stepToward(unit, target) {
  const next = nextPathStep(unit, target) || fallbackStepToward(unit, target);
  if (!next) return false;
  unit.x = next.x;
  unit.y = next.y;
  return true;
}

function nextPathStep(unit, target) {
  const startKey = posKey(unit.x, unit.y);
  const visited = new Set([startKey]);
  const queue = [{ x: unit.x, y: unit.y, path: [] }];

  while (queue.length) {
    const current = queue.shift();
    if (current.path.length && distance(current, target) <= unit.range) {
      return current.path[0];
    }

    pathNeighbors(current.x, current.y, target).forEach(next => {
      const key = posKey(next.x, next.y);
      if (visited.has(key)) return;
      if (occupied(next.x, next.y)) return;
      visited.add(key);
      queue.push({
        x: next.x,
        y: next.y,
        path: [...current.path, next]
      });
    });
  }

  return null;
}

function fallbackStepToward(unit, target) {
  return pathNeighbors(unit.x, unit.y, target)
    .filter(p => !occupied(p.x, p.y))
    .sort((a, b) => distance(a, target) - distance(b, target))
    [0] || null;
}

function pathNeighbors(x, y, target = null) {
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  return dirs
    .map(([ox, oy]) => ({ x: x + ox, y: y + oy }))
    .filter(p => p.x >= 0 && p.x < 8 && p.y >= 0 && p.y < 6)
    .sort((a, b) => target ? distance(a, target) - distance(b, target) : 0);
}

function occupied(x, y) {
  return state.combatUnits.some(u => u.alive && u.x === x && u.y === y);
}

function performAttack(attacker, target) {
  let raw = attacker.damage * attacker.damageMultiplier;
  if (attacker.shieldedDamageMult > 1 && attacker.shield > 0) raw *= attacker.shieldedDamageMult;
  if (attacker.bossDamageMult > 1 && target.unitClass === 'Boss') raw *= attacker.bossDamageMult;
  if (attacker.weakened) raw *= 0.9;
  if (attacker.ability === 'frenzy' && attacker.hp < attacker.maxHp / 2) raw *= 1.45;
  if (attacker.bruiserMissingHpDamageMult > 0) {
    const missingPct = Math.max(0, 1 - (attacker.hp / attacker.maxHp));
    raw *= 1 + missingPct * attacker.bruiserMissingHpDamageMult;
  }

  const didCrit = Math.random() < attacker.critChance;
  if (didCrit) raw *= attacker.critDamageMult;

  if (window.playAttackEffect) window.playAttackEffect(attacker.id, target.id);
  const dealt = applyDamage(target, raw, { attacker, canDodge: true, attackType: didCrit ? 'critical attack' : 'attack' });
  if (didCrit && dealt > 0) log(`${attacker.name} lands a critical hit.`, 'damage');

  gainEnergy(attacker, 28, target);

  if (attacker.burnOnHit && dealt > 0) {
    applyBurn(target, Math.max(4, Math.round(attacker.damage * 0.22)), 3, attacker.name);
  }
  if (attacker.corruptOnHit && dealt > 0) {
    applyCorruption(target, Math.max(5, Math.round(attacker.damage * 0.18)), 3, attacker.name);
  }

  if (attacker.extraShotChance > 0 && target.alive && Math.random() < attacker.extraShotChance) {
    log(`${attacker.name} fires an extra shot.`, 'damage');
    applyDamage(target, attacker.damage * 0.65 * attacker.damageMultiplier, { attacker, canDodge: true, attackType: 'extra shot' });
  }

}

function gainEnergy(unit, amount, target = null) {
  if (!unit.alive) return;
  const maxEnergy = unit.energyMax || 100;
  unit.mana = Math.min(maxEnergy, (unit.mana || 0) + Math.round(amount * unit.manaGainMult));
  if (unit.mana >= maxEnergy && target?.alive) {
    unit.mana = 0;
    castAbility(unit, target);
  }
}

function castAbility(caster, target) {
  if (!caster.alive || !target?.alive) return;
  log(`${caster.name} uses ${caster.abilityName}.`, 'special');
  if (window.playAbilityEffect) window.playAbilityEffect(caster.id, caster.abilityName);
  popDamage(caster, 'Cast');
  switch (caster.ability) {
    case 'shield': {
      const shieldGain = Math.round((56 + caster.star * 14) * caster.abilityDamageMult * caster.shieldMult);
      caster.shield += shieldGain;
      if (window.playShieldPopup) window.playShieldPopup(caster.id, `+${shieldGain}`);
      else popDamage(caster, `+${shieldGain}`);
      log(`${caster.name} gains ${shieldGain} shield.`, 'shield');
      break;
    }
    case 'rapid':
      applyDamage(target, caster.damage * 0.95 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
      if (target.alive) applyDamage(target, caster.damage * 0.95 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
      break;
    case 'aoe': {
      const enemies = state.combatUnits.filter(u => u.side !== caster.side && u.alive && distance(u, target) <= 1);
      enemies.forEach(u => applyDamage(u, caster.damage * 1.55 * caster.abilityDamageMult, { attacker: caster, canDodge: false }));
      break;
    }
    case 'heal': {
      const allies = state.combatUnits
        .filter(u => u.side === caster.side && u.alive)
        .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
      const healTarget = allies[0];
      if (healTarget) healUnit(healTarget, (52 + caster.star * 12) * caster.healMult, caster.name);
      break;
    }
    case 'crit':
      applyDamage(target, caster.damage * 2.45 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
      break;
    case 'cleave': {
      const enemies = state.combatUnits.filter(u => u.side !== caster.side && u.alive && distance(u, target) <= 1);
      enemies.forEach(u => applyDamage(u, caster.damage * 1.2 * caster.abilityDamageMult, { attacker: caster, canDodge: true }));
      break;
    }
    case 'frenzy':
      applyDamage(target, caster.damage * 1.7 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
      break;
    default:
      applyDamage(target, caster.damage, { attacker: caster, canDodge: true });
  }
  if (caster.castEnergyGain > 0 && caster.alive) {
    caster.mana = Math.min(caster.energyMax || 100, (caster.mana || 0) + caster.castEnergyGain);
  }
}

function applyDamage(target, amount, options = {}) {
  if (!target.alive) return 0;
  const raw = Math.max(1, Math.round(amount));
  const attacker = options.attacker;
  const tone = attacker ? (attacker.side === 'player' ? 'good' : 'bad') : (target.side === 'enemy' ? 'good' : 'bad');

  if (!options.ignoreDodge && options.canDodge && target.dodgeChance > 0 && Math.random() < target.dodgeChance) {
    popDamage(target, 'Dodge');
    if (attacker) log(`${target.name} dodges ${attacker.name}'s ${options.attackType || 'attack'}.`, 'dodge');
    if (target.dodgeEnergyGain > 0) gainEnergy(target, target.dodgeEnergyGain, null);
    return 0;
  }

  let damage = raw;
  if (!options.trueDamage) damage = Math.max(1, raw - target.armor);
  if (target.damageReduction > 0 && !options.trueDamage) damage = Math.max(1, Math.round(damage * (1 - target.damageReduction)));

  let remaining = damage;
  let blocked = 0;
  if (target.shield > 0) {
    blocked = Math.min(target.shield, remaining);
    target.shield -= blocked;
    remaining -= blocked;
  }

  const hpDamage = Math.max(0, remaining);
  target.hp -= hpDamage;
  const popText = options.isDot ? `🔥${hpDamage}` : (hpDamage > 0 ? hpDamage : 'Blocked');
  popDamage(target, popText);

  if (attacker && !options.silent) {
    const blockedText = blocked > 0 ? ` (${blocked} blocked)` : '';
    log(`${attacker.name} hits ${target.name} for ${hpDamage}${blockedText}.`, blocked > 0 && hpDamage === 0 ? 'shield' : 'damage');
    if (blocked > 0 && hpDamage > 0) log(`${target.name} blocks ${blocked} damage with shield.`, 'shield');
  } else if (options.isDot) {
    const dotLabel = options.dotType === 'corruption' ? 'corrupts' : 'burns';
    log(`${options.source || options.sourceName || 'Burn'} ${dotLabel} ${target.name} for ${hpDamage}.`, options.dotType === 'corruption' ? 'corruption' : 'burn');
  }

  if (target.hp <= 0) {
    handleDeath(target);
    if (attacker?.alive && !target.alive && attacker.killEnergyGain > 0) {
      gainEnergy(attacker, attacker.killEnergyGain, null);
    }
  }
  return hpDamage;
}

function handleDeath(target) {
  if (target.canDeathResist && !target.hasRevived && !state.battleFlags.egyptianDeathResistUsed) {
    state.battleFlags.egyptianDeathResistUsed = true;
    target.hasRevived = true;
    target.canDeathResist = false;
    target.hp = Math.max(1, Math.round(target.maxHp * 0.25));
    target.shield = 0;
    target.statuses = [];
    target.alive = true;
    log(`${target.name} resists death through Egyptian judgment.`, 'revive');
    popDamage(target, 'Resist');
    return;
  }
  if (target.canWyrdboundEcho && !target.hasRevived && !state.battleFlags.wyrdboundEchoUsed) {
    state.battleFlags.wyrdboundEchoUsed = true;
    target.hasRevived = true;
    target.canWyrdboundEcho = false;
    target.hp = Math.max(1, Math.round(target.maxHp * 0.3));
    target.shield = 0;
    target.statuses = [];
    target.alive = true;
    target.name = `${target.name} Echo`;
    target.damage = Math.round(target.damage * 0.82);
    log(`${target.name} returns as a corrupted Wyrdbound echo.`, 'revive');
    popDamage(target, 'Echo');
    return;
  }
  target.alive = false;
  target.hp = 0;
  target.statuses = [];
  log(`${target.name} falls.`, 'death');
}

function healUnit(target, amount, sourceName, silent = false) {
  const heal = Math.max(1, Math.round(amount));
  const before = target.hp;
  target.hp = Math.min(target.maxHp, target.hp + heal);
  const actual = target.hp - before;
  const overheal = Math.max(0, heal - actual);
  if (actual > 0) {
    popDamage(target, `+${actual}`);
    if (!silent) log(`${sourceName} heals ${target.name} for ${actual}.`, 'heal');
    if (target.healShieldOnHealed > 0) {
      const shieldGain = Math.max(1, Math.round(actual * target.healShieldOnHealed));
      target.shield += shieldGain;
      log(`${target.name} gains ${shieldGain} shield from sacred healing.`, 'shield');
    }
  }
  if (overheal > 0 && target.overhealShieldMult > 0) {
    const shieldGain = Math.max(1, Math.round(overheal * target.overhealShieldMult));
    target.shield += shieldGain;
    log(`${target.name} converts overhealing into ${shieldGain} shield.`, 'shield');
  }
}

function applyBurn(target, damage, ticks, sourceName) {
  const existing = target.statuses.find(s => s.type === 'burn');
  if (existing) {
    existing.damage = Math.max(existing.damage, damage);
    existing.ticks = Math.max(existing.ticks, ticks);
    log(`${sourceName} refreshes burn on ${target.name}.`, 'burn');
  } else {
    target.statuses.push({ type: 'burn', damage, ticks, sourceName });
    log(`${sourceName} ignites ${target.name} for ${damage} burn damage per tick.`, 'burn');
  }
}

function applyCorruption(target, damage, ticks, sourceName) {
  const existing = target.statuses.find(s => s.type === 'corruption');
  if (existing) {
    existing.damage = Math.max(existing.damage, damage);
    existing.ticks = Math.max(existing.ticks, ticks);
    log(`${sourceName} deepens corruption on ${target.name}.`, 'corruption');
  } else {
    target.statuses.push({ type: 'corruption', damage, ticks, sourceName });
    log(`${sourceName} corrupts ${target.name} for ${damage} damage per tick.`, 'corruption');
  }
}

function popDamage(target, amount) {
  if (window.RIFTBOUND_PHASER_READY) {
    const text = String(amount);
    if (text.startsWith('+')) {
      if (window.playHealPopup) window.playHealPopup(target.id, amount);
    } else if (text === 'Blocked' || text === 'Resist' || text === 'Echo') {
      if (window.playShieldPopup) window.playShieldPopup(target.id, amount);
    } else if (window.playDamagePopup) {
      window.playDamagePopup(target.id, amount);
    }
    return;
  }
  const tile = [...document.querySelectorAll('.tile')].find(t => Number(t.dataset.x) === target.x && Number(t.dataset.y) === target.y);
  if (!tile) return;
  const pop = document.createElement('div');
  pop.className = `${String(amount).startsWith('+') || amount === 'Revive' ? 'damage-pop heal-pop' : 'damage-pop'}`;
  pop.textContent = amount;
  pop.style.left = '42%';
  pop.style.top = '18%';
  tile.appendChild(pop);
  setTimeout(() => pop.remove(), 760);
}

function goldInterestFor(amount) {
  return Math.min(5, Math.floor(Math.max(0, amount) / 10));
}

function roundDamagePerLivingEnemy(round) {
  return Math.min(4, Math.max(1, Math.ceil(Math.min(round, state.maxRound) / 3)));
}

function roundGoldRewardFor(round) {
  const odds = shopRarityOddsForRound(round);
  const tierBonus = ['Rare', 'Epic', 'Legendary', 'Mythic']
    .reduce((total, rarity) => total + (odds[rarity] > 0 ? 1 : 0), 0);
  return 4 + tierBonus;
}

function interestSummary(interest) {
  return interest > 0 ? `, including ${interest} interest` : '';
}

function awardGoldWithInterest(baseReward, label = 'Reward', tone = 'special') {
  const interest = goldInterestFor(state.gold);
  const total = baseReward + interest;
  state.gold += total;
  log(`${label}: +${baseReward} gold${interest ? `, +${interest} interest` : ''}.`, tone);
  return { baseReward, interest, total };
}

function endBattle(playerWon) {
  clearTimers();
  state.mode = 'planning';
  const livingEnemies = state.combatUnits.filter(u => u.side === 'enemy' && u.alive);
  if (playerWon) {
    const goldAward = awardGoldWithInterest(roundGoldRewardFor(state.round), 'Round gold', 'victory');
    log(`Victory! ${WAVE_NAMES[state.round]} cleared. Earned ${goldAward.total} gold total.`, 'victory');

    if (state.round === state.secretRound) {
      state.runComplete = true;
      state.combatUnits = [];
      log('Secret mega boss defeated! Riftbound Arena v0.9 is cleared.', 'victory');
      showModal('Secret Mega Boss Defeated', 'You beat secret round 21 and completed the v0.9 prototype run. The arena is yours.');
      render();
      return;
    }

    if (state.round === state.maxRound) {
      state.round = state.secretRound;
      rollShop(true);
      log('Secret round unlocked: The Kingdom That Never Healed waits beyond round 20.', 'boss');
      showRewardChoices('Secret Mega Boss Unlocked', `You cleared all 20 rounds and earned ${goldAward.total} gold${interestSummary(goldAward.interest)}. Choose a Sacred Arsenal item before ${WAVE_NAMES[state.secretRound]}.`, { includeRelics: true });
    } else {
      const clearedBossRound = isMiniBossRound(state.round);
      state.round += 1;
      rollShop(true);
      if (clearedBossRound) {
        showRewardChoices('Boss Spoils', `You defeated a milestone boss and earned ${goldAward.total} gold${interestSummary(goldAward.interest)}. Choose a Sacred Arsenal item before round ${state.round}: ${WAVE_NAMES[state.round]}.`, { includeRelics: true });
      } else {
        showRewardChoices('Victory', `You won the round and earned ${goldAward.total} gold${interestSummary(goldAward.interest)}. Prepare for round ${state.round}: ${WAVE_NAMES[state.round]}.`);
      }
    }
  } else {
    const bossAlive = livingEnemies.some(u => u.unitClass === 'Boss');
    const damagePerEnemy = roundDamagePerLivingEnemy(state.round);
    const damage = state.round === state.secretRound || bossAlive
      ? state.playerHp
      : livingEnemies.length * damagePerEnemy;
    state.playerHp -= damage;
    const damageText = state.round === state.secretRound || bossAlive
      ? 'Boss defeat is instant loss.'
      : `${livingEnemies.length} enemies survived x ${damagePerEnemy} HP each.`;
    log(`Defeat on ${WAVE_NAMES[state.round]}. You lost ${damage} HP. ${damageText}`, 'defeat');
    if (state.playerHp <= 0) {
      showModal('Run Lost', state.round === state.secretRound || bossAlive
        ? 'A boss survived the battle. Boss defeats are instant loss. Reset the run and try a different squad.'
        : `Your team was defeated. ${damageText} Reset the run and try a different squad.`);
    } else {
      const goldAward = awardGoldWithInterest(roundGoldRewardFor(state.round), 'Round gold');
      showModal('Defeat', `You lost ${damage} HP (${damageText}) but gained ${goldAward.total} gold${interestSummary(goldAward.interest)}. Rebuild and try this round again.`);
    }
  }
  state.combatUnits = [];
  render();
}

function getActiveUnitCount() {
  return Object.keys(state.board).length;
}

function getSynergyCounts() {
  const counts = {};
  const countedTypes = new Set();
  Object.values(state.board).forEach(u => {
    if (!u || countedTypes.has(u.type)) return;
    countedTypes.add(u.type);
    counts[u.pantheon] = (counts[u.pantheon] || 0) + 1;
    counts[u.sourceType] = (counts[u.sourceType] || 0) + 1;
    counts[u.unitClass] = (counts[u.unitClass] || 0) + 1;
  });
  return counts;
}

function getOwnedSynergyKeys() {
  const keys = new Set();
  getOwnedUnits().forEach(u => {
    if (u.pantheon) keys.add(u.pantheon);
    if (u.sourceType) keys.add(u.sourceType);
    if (u.unitClass) keys.add(u.unitClass);
  });
  return keys;
}

function activeSynergy(key, threshold = null) {
  const counts = getSynergyCounts();
  if (threshold === null) return synergyTier(key, counts) > 0;
  return (counts[key] || 0) >= threshold && SYNERGIES.some(s => s.key === key && s.threshold === threshold);
}

function synergyTiers(key) {
  return SYNERGIES
    .filter(s => s.key === key)
    .sort((a, b) => a.threshold - b.threshold);
}

function synergyTier(key, counts = getSynergyCounts()) {
  const current = counts[key] || 0;
  return synergyTiers(key).reduce((highest, s) => current >= s.threshold ? s.threshold : highest, 0);
}

function starLabel(star) {
  return '★'.repeat(star || 1);
}

function speedLabel(ms) {
  return `${(1000 / ms).toFixed(2)}/s`;
}

function isBossRound(round) {
  return round === state.secretRound || (round > 0 && round <= state.maxRound && round % 5 === 0);
}

function isMiniBossRound(round) {
  return round > 0 && round < state.maxRound && round % 5 === 0;
}

function isTricksterRound(round) {
  return TRICKSTER_ROUNDS.includes(round);
}

function posKey(x, y) { return `${x},${y}`; }

function log(text, tone = '') {
  const type = tone || 'note';
  const line = document.createElement('div');
  const isImportant = IMPORTANT_LOG_TYPES.has(type);
  line.className = `log-line log-${type}${isImportant ? ' important' : ''}`;

  const marker = document.createElement('span');
  marker.className = 'log-marker';
  marker.textContent = state.mode === 'battle'
    ? `R${state.round} T${String(state.battleTick).padStart(2, '0')}`
    : `R${state.round} Plan`;

  const body = document.createElement('span');
  body.className = 'log-message';
  body.textContent = text;

  line.append(marker, body);
  logEl.prepend(line);
  while (logEl.children.length > state.logLimit) {
    logEl.removeChild(logEl.lastChild);
  }
}

function setLogFilter(filter) {
  state.logFilter = filter;
  const importantOnly = filter === 'important';
  logEl.classList.toggle('important-only', importantOnly);
  if (logFilterBtn) {
    logFilterBtn.textContent = importantOnly ? 'Important Only' : 'Show All';
    logFilterBtn.setAttribute('aria-pressed', String(importantOnly));
  }
}

function toggleLogFilter() {
  setLogFilter(state.logFilter === 'all' ? 'important' : 'all');
}

function showFeedback(message) {
  if (!feedbackBannerEl) return;
  feedbackBannerEl.textContent = message;
  feedbackBannerEl.classList.toggle('hidden', !message);
}

function warnPlayer(message) {
  showFeedback(message);
  log(message, 'warning');
}

function pickStarterChampions() {
  const commonPool = UNIT_LIBRARY.filter(unit => unit.rarity === 'Common');
  const pool = commonPool.length >= 3 ? [...commonPool] : [...UNIT_LIBRARY.filter(unit => unit.cost <= 2)];
  const picks = [];
  while (pool.length && picks.length < 3) {
    const index = Math.floor(Math.random() * pool.length);
    picks.push(pool.splice(index, 1)[0]);
  }
  return picks;
}

function showStarterChoices() {
  if (state.starterChosen || getBenchCount() || state.board && Object.keys(state.board).length) return;
  const choices = pickStarterChampions().map(champion => ({
    label: champion.name,
    detail: `${champion.pantheon} / ${champion.sourceType} / ${champion.class} / ${champion.rarity} - ${champion.abilityName}`,
    action: () => {
      const slot = firstEmptyBenchIndex();
      if (slot >= 0) state.bench[slot] = makeUnit(champion);
      state.starterChosen = true;
      log(`Starter chosen: ${champion.name}.`, 'special');
      showFeedback(`${champion.name} joined your bench.`);
    }
  }));
  showModal('Choose Your First Champion', 'Select one Common champion to begin this run.', choices);
}

function saveRun() {
  if (typeof localStorage === 'undefined') return warnPlayer('Save is unavailable in this browser context.');
  const payload = {
    version: '0.9',
    round: state.round,
    gold: state.gold,
    playerHp: state.playerHp,
    shopLocked: state.shopLocked,
    shop: state.shop.map(snapshotShopItem),
    runComplete: state.runComplete,
    relics: [...state.relics],
    starterChosen: state.starterChosen,
    bench: Array.from({ length: BENCH_CAP }, (_, i) => state.bench[i] ? snapshotUnit(state.bench[i]) : null),
    board: Object.entries(state.board).map(([pos, unit]) => ({ pos, unit: snapshotUnit(unit) })),
    boardSnapshots: state.boardSnapshots.map(restoreBoardSnapshot).filter(Boolean)
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  log('Run saved locally.', 'special');
  showFeedback('Run saved locally.');
}

function loadRun() {
  if (typeof localStorage === 'undefined') return warnPlayer('Load is unavailable in this browser context.');
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return warnPlayer('No saved run found.');
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return warnPlayer('Saved run could not be read.');
  }

  clearTimers();
  state.round = payload.round || 1;
  state.gold = payload.gold ?? 10;
  state.playerHp = payload.playerHp ?? 20;
  state.mode = 'planning';
  state.shopLocked = Boolean(payload.shopLocked);
  state.runComplete = Boolean(payload.runComplete);
  state.battleTick = 0;
  state.relics = Array.isArray(payload.relics) ? payload.relics.filter(id => RELICS.some(relic => relic.id === id)) : [];
  state.starterChosen = Boolean(payload.starterChosen);
  state.boardSnapshots = Array.isArray(payload.boardSnapshots)
    ? payload.boardSnapshots.map(restoreBoardSnapshot).filter(Boolean).slice(-BOARD_SNAPSHOT_LIMIT)
    : [];
  state.bench = Array.from({ length: BENCH_CAP }, (_, i) => payload.bench?.[i] ? restoreUnit(payload.bench[i]) : null);
  state.board = {};
  (payload.board || []).forEach(entry => {
    const unit = restoreUnit(entry.unit || {});
    if (unit && entry.pos) state.board[entry.pos] = unit;
  });
  state.combatUnits = [];
  state.battleFlags = {};
  state.selectedUnitId = null;
  state.draggedUnitId = null;
  if (window.endPhaserBoardDrag) window.endPhaserBoardDrag();
  state.shop = Array.isArray(payload.shop)
    ? payload.shop.map(restoreShopItem).filter(Boolean)
    : [];
  if (!state.shop.length) rollShop(true, { force: true, quiet: true });
  log('Run loaded from local save.', 'special');
  showFeedback('Run loaded from local save.');
  render();
  showStarterChoices();
}

function pickRewardRelics() {
  const available = RELICS.filter(relic => !state.relics.includes(relic.id));
  const picks = [];
  while (available.length && picks.length < 2) {
    const index = Math.floor(Math.random() * available.length);
    picks.push(available.splice(index, 1)[0]);
  }
  return picks;
}

function showRewardChoices(title, body, options = {}) {
  const relicChoices = options.includeRelics ? pickRewardRelics() : [];
  const choices = relicChoices.map(relic => ({
      label: relic.name,
      detail: relic.text,
      action: () => {
        if (!state.relics.includes(relic.id)) state.relics.push(relic.id);
        log(`Relic claimed: ${relic.name}.`, 'special');
      }
    }));
  showModal(title, body, choices);
}

function clearTimers() {
  state.timers.forEach(t => clearInterval(t));
  state.timers = [];
}

function showModal(title, body, choices = []) {
  $('modalTitle').textContent = title;
  $('modalBody').textContent = body;
  if (modalChoicesEl) {
    modalChoicesEl.innerHTML = '';
    choices.forEach(choice => {
      const button = document.createElement('button');
      button.className = 'reward-choice';
      button.innerHTML = `<strong>${choice.label}</strong>${choice.detail ? `<span>${choice.detail}</span>` : ''}`;
      button.addEventListener('click', () => {
        choice.action();
        $('modal').classList.add('hidden');
        render();
      });
      modalChoicesEl.appendChild(button);
    });
  }
  $('modalBtn').classList.toggle('hidden', choices.length > 0);
  $('modal').classList.remove('hidden');
}

$('modalBtn').addEventListener('click', () => $('modal').classList.add('hidden'));
$('startBattleBtn').addEventListener('click', startBattle);
$('saveBtn').addEventListener('click', saveRun);
$('loadBtn').addEventListener('click', loadRun);
$('resetBtn').addEventListener('click', init);
$('rerollBtn').addEventListener('click', () => rollShop(false));
if (shopLockBtn) shopLockBtn.addEventListener('click', toggleShopLock);
$('clearLogBtn').addEventListener('click', () => { logEl.innerHTML = ''; log('Combat log cleared.', 'special'); });
if (logFilterBtn) logFilterBtn.addEventListener('click', toggleLogFilter);

if (window.initPhaserBoard) {
  const phaserReady = window.initPhaserBoard({
    containerId: 'battlefield',
    onCellClick: handlePhaserCellClick,
    onUnitClick: handlePhaserUnitClick,
    onBoardUnitDragStart: handlePhaserBoardUnitDragStart,
    onBenchUnitDragStart: handlePhaserBenchUnitDragStart,
    onBoardUnitDrop: handlePhaserBoardUnitDrop,
    onBenchUnitBoardDrop: handlePhaserBenchUnitBoardDrop,
    onBenchUnitBenchDrop: handlePhaserBenchUnitBenchDrop,
    onBoardUnitBenchSlotDrop: handlePhaserBoardUnitBenchSlotDrop,
    onBoardUnitDropRejected: handlePhaserBoardUnitDropRejected,
    onBenchUnitDropRejected: handlePhaserBenchUnitDropRejected,
    onBoardUnitBenchDrop: handlePhaserBoardUnitBenchDrop,
    onUnitSellDrop: handlePhaserUnitSellDrop,
    onBenchSlotClick: handlePhaserBenchSlotClick
  });
  window.RIFTBOUND_PHASER_READY = phaserReady;
  if (!phaserReady) {
    battlefieldEl.innerHTML = '<div class="phaser-fallback">Phaser board could not initialize. Using legacy board fallback.</div>';
  }
}
attachPhaserDropHandlers();
attachSellZoneHandlers();

init();
