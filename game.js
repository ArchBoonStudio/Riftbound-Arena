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
const ROUND_TIME_LIMIT_MS = 60000;
const OVERTIME_DURATION_MS = 10000;
const COMBAT_TICK_MS = 420;
const OVERTIME_TICK_MS = Math.max(90, Math.round(COMBAT_TICK_MS / 4));
const HEALER_MIN_MISSING_HP_PCT = 0.1;
const NORMAL_ENEMY_SCALE_PER_ROUND = 0.13;
const BOSS_ENEMY_SCALE_PER_ROUND = 0.1;
const FIRST_TRICKSTER_SCALE = 0.78;
const FIRST_TRICKSTER_DEFEAT_DAMAGE_CAP = 8;
const OWNED_UPGRADE_SHOP_WEIGHT = 1.75;

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
  Guardian: { hp: 190, damage: 18, attackSpeed: 1120, range: 1, armor: 9, ability: 'shield', abilityName: 'Oath Ward', abilityDescription: 'At full energy, gain 70 shield at 1 star. Shield strength increases with star level.' },
  Ranger: { hp: 100, damage: 27, attackSpeed: 860, range: 3, armor: 2, ability: 'rapid', abilityName: 'Twin Shot', abilityDescription: 'Fire twice at the current target. Each shot deals 95% attack damage and can be dodged.' },
  Mage: { hp: 92, damage: 32, attackSpeed: 1200, range: 3, armor: 1, ability: 'aoe', abilityName: 'Mythic Burst', abilityDescription: 'Blast the target and adjacent enemies for 155% attack damage. This spell cannot be dodged.' },
  Healer: { hp: 118, damage: 15, attackSpeed: 1120, range: 2, armor: 3, ability: 'heal', abilityName: 'Sacred Mend', abilityDescription: 'Heal the most wounded nearby ally for 64 HP at 1 star. If no ally needs urgent healing, attack for 115% damage.' },
  Assassin: { hp: 98, damage: 34, attackSpeed: 780, range: 1, armor: 2, ability: 'crit', abilityName: 'Fated Strike', abilityDescription: 'Strike the current target for 245% attack damage. The strike can be dodged.' },
  Bruiser: { hp: 165, damage: 25, attackSpeed: 980, range: 1, armor: 5, ability: 'cleave', abilityName: 'Titan Breaker', abilityDescription: 'Cleave the target and adjacent enemies for 120% attack damage.' }
};

const SIGNATURE_ABILITY_PROFILES = {
  Zeus: { ability: 'sig-storm-chain', name: 'Thunderbolt Dominion', description: 'Deal 180% damage to the target, then chain 105% damage to up to two nearby enemies. Cannot be dodged.' },
  Hera: { ability: 'sig-queen-aegis', name: 'Queenly Aegis', description: 'Shield Hera and the two most wounded allies. Shield strength increases with star level.' },
  Poseidon: { ability: 'sig-seaquake', name: 'Seaquake', description: 'Deal 155% damage to the target and adjacent enemies, delaying their next attacks.' },
  Hades: { ability: 'sig-soul-drain', name: 'Underworld Bloom', description: 'Deal 145% damage to clustered enemies and heal Hades for 42% of damage dealt.' },
  Odin: { ability: 'sig-rune-doom', name: 'Runes of Doom', description: 'Carve doom runes onto the three weakest enemies, dealing 115% damage and weakening their attacks.' },
  Thor: { ability: 'sig-thunder-crash', name: 'Mjolnir Crash', description: 'Deal 165% damage to the target and adjacent enemies, delaying their next attacks.' },
  Freyja: { ability: 'sig-falcon-dive', name: 'Falcon Dive', description: 'Dive onto a vulnerable enemy for 280% damage, then gain a shield equal to 16% max HP.' },
  Freyr: { ability: 'sig-golden-harvest', name: 'Golden Harvest', description: 'Heal the three most wounded allies and accelerate each ally\'s next attack.' },
  Ra: { ability: 'sig-solar-flare', name: 'Solar Flare', description: 'Deal 90% damage to every enemy and burn the primary target for 3 ticks.' },
  Osiris: { ability: 'sig-osirian-return', name: 'Osirian Return', description: 'Revive the strongest fallen ally with 32% HP. If none have fallen, heavily heal the most wounded ally.' },
  Isis: { ability: 'sig-winged-sanctuary', name: 'Winged Sanctuary', description: 'Shield every ally for 8% max HP and heal the most wounded ally.' },
  Horus: { ability: 'sig-sky-hunt', name: 'Eye of the Sky Hunt', description: 'Fire three 82% damage shots into the weakest enemy. Shots deal 25% more damage below 35% HP.' },
  'The Dagda': { ability: 'sig-cauldron-feast', name: 'Cauldron of Plenty', description: 'Heals the entire warband and grants himself a vast cauldron ward.' },
  'The Morrigan': { ability: 'sig-fate-war', name: 'Fate of War', description: 'Strikes three weakened enemies with corrupting battle prophecy.' },
  Brigid: { ability: 'sig-sacred-flame', name: 'Sacred Flame', description: 'Heals two wounded allies while holy fire burns her enemy.' },
  Lugh: { ability: 'sig-many-skilled', name: 'Many-Skilled Volley', description: 'Launches a radiant strike at up to three different enemies.' },
  'Arthur Pendragon': { ability: 'sig-excalibur-oath', name: 'Excalibur Oath', description: 'Strikes with Excalibur and raises an oath shield across the whole formation.' },
  Merlin: { ability: 'sig-time-rift', name: 'Time-Rift Invocation', description: 'Detonates a temporal rift that damages and delays clustered enemies.' },
  'Morgan le Fay': { ability: 'sig-thorned-hex', name: 'Thorned Avalon Hex', description: 'Curses clustered enemies with damage and lingering corruption.' },
  'Nimue / Viviane': { ability: 'sig-lake-renewal', name: 'Renewal of the Lake', description: 'Restores the weakest ally and shields the three most wounded allies.' }
};

const PANTHEON_DIVINE_NAMES = {
  Hellenic: { Guardian: 'Olympian Ward', Ranger: 'Laurel Volley', Mage: 'Olympian Burst', Healer: 'Ambrosial Grace', Assassin: 'Fated Ambush', Bruiser: 'Titanic Rebuke' },
  Norse: { Guardian: 'Rune Ward', Ranger: 'Storm Volley', Mage: 'Rune Tempest', Healer: 'Golden Apple Grace', Assassin: 'Raven Ambush', Bruiser: 'Saga Breaker' },
  Egyptian: { Guardian: 'Sun-Disk Ward', Ranger: 'Solar Volley', Mage: 'Sun Temple Burst', Healer: 'Restoration Rite', Assassin: 'Judgment Strike', Bruiser: 'Desert Breaker' },
  Celtic: { Guardian: 'Grove Ward', Ranger: 'Wild Hunt Volley', Mage: 'Ogham Burst', Healer: 'Sacred Well Grace', Assassin: 'Thorn Ambush', Bruiser: 'Wildwood Breaker' },
  Arthurian: { Guardian: 'Oath Ward', Ranger: 'Round Table Volley', Mage: 'Avalon Burst', Healer: 'Grail Grace', Assassin: 'Betrayer Strike', Bruiser: 'Pendragon Cleave' }
};

function divineAbilityProfile(pantheon, unitClass) {
  const name = PANTHEON_DIVINE_NAMES[pantheon]?.[unitClass];
  if (!name) return null;
  const descriptions = {
    Guardian: 'Shield self and the most wounded ally, then trigger this champion\'s pantheon blessing.',
    Ranger: 'Fire two 105% damage shots, then trigger this champion\'s pantheon blessing.',
    Mage: 'Deal 170% damage to the target and adjacent enemies, then trigger this champion\'s pantheon blessing.',
    Healer: 'Heal the two most wounded allies. If no ally is wounded, attack for 125% damage. Then trigger a pantheon blessing.',
    Assassin: 'Strike a vulnerable enemy for 270% damage, then trigger this champion\'s pantheon blessing.',
    Bruiser: 'Deal 135% damage to the target and adjacent enemies, then trigger this champion\'s pantheon blessing.'
  };
  const blessings = {
    Hellenic: ' Hellenic blessing: gain 8 energy.',
    Norse: ' Norse blessing: deal an additional 28% damage to the target.',
    Egyptian: ' Egyptian blessing: gain a shield equal to 7% max HP.',
    Celtic: ' Celtic blessing: restore 8% max HP when wounded.',
    Arthurian: ' Arthurian blessing: shield the weakest ally for 5% max HP.'
  };
  return { ability: `divine-${unitClass.toLowerCase()}`, name, description: `${descriptions[unitClass]}${blessings[pantheon] || ''}` };
}

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
  const signatureAbility = SIGNATURE_ABILITY_PROFILES[config.name];
  const divineAbility = config.sourceType === 'Empyrean' && !signatureAbility
    ? divineAbilityProfile(config.pantheon, config.class)
    : null;
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
    ability: signatureAbility?.ability || config.ability || divineAbility?.ability || base.ability,
    abilityName: signatureAbility?.name || config.abilityName || divineAbility?.name || base.abilityName,
    abilityDescription: signatureAbility?.description || config.abilityDescription || divineAbility?.description || base.abilityDescription,
    abilityText: signatureAbility?.description || config.abilityDescription || divineAbility?.description || base.abilityDescription,
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
    { name: 'Persephone', class: 'Assassin', rarity: 'Epic', abilityName: 'Pomegranate Hex' },
    { name: 'Athena', class: 'Guardian', rarity: 'Legendary', abilityName: 'Aegis Formation' },
    { name: 'Ares', class: 'Bruiser', rarity: 'Legendary', abilityName: 'War God Cleave' },
    { name: 'Apollo', class: 'Ranger', rarity: 'Legendary', abilityName: 'Solar Arrows' },
    { name: 'Artemis', class: 'Ranger', rarity: 'Legendary', abilityName: 'Moon Hunt' },
    { name: 'Hermes', class: 'Assassin', rarity: 'Epic', abilityName: 'Winged Ambush' },
    { name: 'Aphrodite', class: 'Healer', rarity: 'Epic', abilityName: 'Golden Charm' },
    { name: 'Hephaestus', class: 'Guardian', rarity: 'Epic', abilityName: 'Forge Shield' },
    { name: 'Dionysus', class: 'Bruiser', rarity: 'Epic', abilityName: 'Raving Revel' },
    { name: 'Hecate', class: 'Mage', rarity: 'Legendary', abilityName: 'Crossroads Hex' },
    { name: 'Nike', class: 'Assassin', rarity: 'Epic', abilityName: 'Victory Dive' },
    { name: 'Helios', class: 'Ranger', rarity: 'Legendary', abilityName: 'Sun Chariot' },
    { name: 'Selene', class: 'Healer', rarity: 'Epic', abilityName: 'Moonlit Mend' },
    { name: 'Hypnos', class: 'Healer', rarity: 'Epic', abilityName: 'Dream Fog' },
    { name: 'Thanatos', class: 'Assassin', rarity: 'Legendary', abilityName: "Death's Edge" }
  ] }),
  ...rosterGroup({ pantheon: 'Hellenic', sourceType: 'Worshiper', defaultRarity: 'Common', names: [
    { name: 'Aegis Hoplite', type: 'hellenic-temple-guard', class: 'Guardian', abilityName: 'Aegis Brace', abilityDescription: 'At full energy, brace behind the aegis and gain 70 shield at 1 star.' },
    { name: 'Pythian Seer', type: 'hellenic-oracle-acolyte', class: 'Mage', abilityName: 'Delphic Flame', abilityDescription: 'Blast the target and adjacent enemies for 155% damage with an undodgeable oracle flame.' }
  ] }),
  ...rosterGroup({ pantheon: 'Norse', sourceType: 'Worshiper', defaultRarity: 'Common', names: [
    { name: 'Fjord Huscarle', type: 'norse-shield-bearer', class: 'Guardian', abilityName: 'Shieldwall Brace', abilityDescription: 'At full energy, lock into the shieldwall and gain 70 shield at 1 star.' },
    { name: 'Ashbone Carver', type: 'norse-rune-chanter', class: 'Mage', abilityName: 'Carved Doom', abilityDescription: 'Carve a battle rune that erupts beneath the target and adjacent enemies for 155% undodgeable damage.' }
  ] }),
  ...rosterGroup({ pantheon: 'Egyptian', sourceType: 'Worshiper', defaultRarity: 'Common', names: [
    { name: 'Sun-Gate Medjay', type: 'egyptian-temple-sentinel', class: 'Guardian', abilityName: 'Solar Bulwark', abilityDescription: 'At full energy, raise a sun-forged defense and gain 70 shield at 1 star.' },
    { name: 'Dawn Priest', type: 'egyptian-sun-acolyte', class: 'Healer', abilityName: 'Dawn Benediction', abilityDescription: 'Heal the most wounded nearby ally for 64 HP at 1 star; attack for 115% damage if no ally needs healing.' }
  ] }),
  ...rosterGroup({ pantheon: 'Celtic', sourceType: 'Worshiper', defaultRarity: 'Common', names: [
    { name: 'Oakbound Warden', type: 'celtic-grove-keeper', class: 'Guardian', abilityName: 'Oakheart Ward', abilityDescription: 'At full energy, call up an oak ward and gain 70 shield at 1 star.' },
    { name: 'Briarblade', type: 'celtic-thornrunner', class: 'Assassin', abilityName: 'Briar Ambush', abilityDescription: 'Lunge at the current target for 245% attack damage. The strike can be dodged.' }
  ] }),
  ...rosterGroup({ pantheon: 'Arthurian', sourceType: 'Worshiper', defaultRarity: 'Common', names: [
    { name: 'Camelot Squire', type: 'arthurian-squire', class: 'Guardian', abilityName: 'Oathbound Guard', abilityDescription: 'At full energy, uphold a knightly oath and gain 70 shield at 1 star.' },
    { name: 'Grail Pilgrim', type: 'grail-pilgrim', class: 'Healer', abilityName: 'Pilgrim\'s Grace', abilityDescription: 'Heal the most wounded nearby ally for 64 HP at 1 star; attack for 115% damage if no ally needs healing.' }
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
    { name: 'Freyja', class: 'Assassin', rarity: 'Legendary', abilityName: 'Falcon Dive' }, { name: 'Freyr', class: 'Ranger' }, { name: 'Frigg', class: 'Healer', abilityName: 'Spindle Mend' },
    { name: 'Tyr', class: 'Guardian' }, { name: 'Heimdall', class: 'Guardian' }, { name: 'Baldr', class: 'Healer' },
    { name: 'Loki', class: 'Assassin', rarity: 'Legendary' }, { name: 'Hel', class: 'Mage', rarity: 'Legendary' },
    { name: 'Njord', class: 'Bruiser', rarity: 'Epic', abilityName: 'Sea-Breaker' }, { name: 'Skadi', class: 'Ranger', rarity: 'Epic' },
    { name: 'Idunn', class: 'Healer', rarity: 'Epic' }, { name: 'Bragi', class: 'Mage', rarity: 'Epic' },
    { name: 'Sif', class: 'Bruiser', rarity: 'Epic', abilityName: 'Golden-Hair Breaker' }, { name: 'Vidar', class: 'Bruiser' }, { name: 'Vali', class: 'Assassin' },
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
    { name: 'Sekhmet', class: 'Bruiser' }, { name: 'Hathor', class: 'Ranger', rarity: 'Epic', abilityName: 'Sistrum Volley' }, { name: 'Sobek', class: 'Bruiser' },
    { name: 'Nephthys', class: 'Mage' }, { name: 'Ptah', class: 'Guardian' }, { name: 'Khnum', class: 'Guardian', abilityName: 'Potter Ward' },
    { name: 'Neith', class: 'Ranger' }, { name: 'Nut', class: 'Healer', abilityName: 'Starfield Mend' }, { name: 'Geb', class: 'Bruiser', abilityName: 'Earthbreaker' },
    { name: 'Shu', class: 'Ranger' }, { name: 'Tefnut', class: 'Bruiser', abilityName: 'Rainlash Breaker' }, { name: 'Wepwawet', class: 'Assassin', rarity: 'Epic' }
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
    { name: 'Manannan mac Lir', class: 'Ranger', abilityName: 'Mist-Spear Volley' }, { name: 'Danu', class: 'Mage', abilityName: 'Well of Stars' }, { name: 'Arawn', class: 'Assassin', abilityName: 'Otherworld Ambush' },
    { name: 'Rhiannon', class: 'Healer', rarity: 'Epic' }, { name: 'Cernunnos', class: 'Bruiser' }, { name: 'Ogma', class: 'Mage', abilityName: 'Ogham Burst' },
    { name: 'Dian Cecht', class: 'Healer' }, { name: 'Goibniu', class: 'Guardian' }, { name: 'Macha', class: 'Assassin' },
    { name: 'Badb', class: 'Mage' }, { name: 'Eriu', class: 'Healer', abilityName: 'Sovereign Grace' }, { name: 'Flidais', class: 'Ranger' },
    { name: 'Nantosuelta', class: 'Guardian', abilityName: 'Household Ward' }, { name: 'Taranis', class: 'Bruiser', abilityName: 'Thunder Hammer' }, { name: 'Epona', class: 'Ranger' }
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
    { name: 'The Lady of the Lake', class: 'Mage', abilityName: 'Lakefire Rite' }, { name: 'The Fisher King', class: 'Healer', abilityName: 'Wounded Grail' },
    { name: 'Galahad', class: 'Healer', abilityName: 'Pure Grail' }, { name: 'Lancelot', class: 'Bruiser' }, { name: 'Gawain', class: 'Bruiser' },
    { name: 'Percival', class: 'Ranger' }, { name: 'Bedivere', class: 'Assassin', abilityName: 'Final Strike' }, { name: 'Tristan', class: 'Assassin' },
    { name: 'Guinevere', class: 'Ranger', abilityName: 'Royal Volley' }, { name: 'The Green Knight', class: 'Bruiser', rarity: 'Epic' },
    { name: 'The Grail Maidens', class: 'Mage', abilityName: 'Grail Radiance' }, { name: 'The Pendragon Line', class: 'Bruiser', abilityName: 'Dragon Oath' }, { name: 'Avalon Queens', class: 'Mage' }
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
  5: [11],
  6: [5, 5, 2, 0, 1],
  7: [6, 3, 6, 2, 4],
  8: [7, 1, 7, 2, 5, 3],
  9: [8, 6, 2, 5, 4, 3],
  10: [12],
  11: [9, 3, 0, 1, 2, 6],
  12: [5, 5, 4, 4, 1, 3],
  13: [6, 6, 8, 2, 3, 0],
  14: [9, 7, 5, 6, 8],
  15: [13],
  16: [8, 7, 6, 5, 2, 1, 4],
  17: [7, 5, 5, 4, 3, 2],
  18: [7, 5, 8, 6, 2, 3],
  19: [9, 8, 7, 6],
  20: [14],
  21: [17, 10, 11, 12, 13, 14, 15, 16]
};

const ENEMY_SLOTS = [[0,0],[7,0],[1,0],[6,0],[2,1],[5,1],[3,1],[4,1]];

const SINGULAR_ENEMY_NAMES = new Set([
  'Mordred',
  'Typhon',
  'Typhon, World-Breaker',
  'Apep',
  'Apep, Sunless Serpent',
  'Chaos',
  'Ymir',
  'Balor',
  'The Dragon Beneath Britain',
  'The Wounded Kingdom',
  'The Kingdom That Never Healed'
]);

const SYNERGIES = [
  { key: 'Hellenic', category: 'Pantheon', threshold: 2, text: 'Hellenic units gain +10% ability power.' },
  { key: 'Hellenic', category: 'Pantheon', threshold: 4, text: 'Hellenic units gain +20% ability power and generate energy slightly faster.' },
  { key: 'Hellenic', category: 'Pantheon', threshold: 6, text: 'Hellenic units gain a small burst of energy after casting.' },
  { key: 'Norse', category: 'Pantheon', threshold: 2, text: 'Norse units gain +8% attack damage.' },
  { key: 'Norse', category: 'Pantheon', threshold: 4, text: 'Norse units gain +12% attack damage and +8 armor.' },
  { key: 'Norse', category: 'Pantheon', threshold: 6, text: 'Norse units attack faster while below 50% HP.' },
  { key: 'Egyptian', category: 'Pantheon', threshold: 2, text: 'Egyptian healing and shielding effects are increased by 15%.' },
  { key: 'Egyptian', category: 'Pantheon', threshold: 4, text: 'Egyptian units gain a battle-start shield, faster energy, and bonus damage while shielded.' },
  { key: 'Egyptian', category: 'Pantheon', threshold: 6, text: 'Egyptian units gain judgment damage; the first to fall revives with partial HP and renewed energy.' },
  { key: 'Celtic', category: 'Pantheon', threshold: 2, text: 'Celtic units gain +10% dodge chance.' },
  { key: 'Celtic', category: 'Pantheon', threshold: 4, text: 'Celtic units gain dodge, periodic healing, and faster energy.' },
  { key: 'Celtic', category: 'Pantheon', threshold: 6, text: 'Celtic units gain Wild Hunt damage, haste, and a large burst of energy when they dodge.' },
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
const SETTINGS_KEY = 'riftbound-arena-settings-v1';
const DEFAULT_SETTINGS = {
  combatLogDetail: 'all',
  showTooltips: true,
  showUnitNames: true,
  showClassLabels: true,
  damageNumbers: true,
  reducedMotion: false,
  confirmUpgradedSales: true,
  gridOverlay: true,
  uiScale: 'normal',
  masterVolume: 80
};

const RELICS = [
  { id: 'aegis-shard', name: 'Aegis Shard', text: 'Guardians, Arthurian units, and Worshipers start battle with a stronger shield.', synergyKeys: ['Guardian', 'Arthurian', 'Worshiper'] },
  { id: 'thunder-seed', name: 'Thunder Seed', text: 'Mages, Empyrean, Hellenic, and Spirit units gain ability power and energy tempo.', synergyKeys: ['Mage', 'Empyrean', 'Hellenic', 'Spirit'] },
  { id: 'valkyrie-horn', name: 'Valkyrie Horn', text: 'Heroic, Norse, and Assassin units gain modest attack damage.', synergyKeys: ['Heroic', 'Norse', 'Assassin'] },
  { id: 'ankh-of-return', name: 'Ankh of Return', text: 'Healers, Egyptian units, and Sacred units gain healing and shielding power.', synergyKeys: ['Healer', 'Egyptian', 'Sacred'] },
  { id: 'fae-briar', name: 'Fae Briar', text: 'Fae and Celtic units gain dodge chance and energy when they evade.', synergyKeys: ['Fae', 'Celtic'] },
  { id: 'black-grail', name: 'Black Grail', text: 'Wyrdbound units apply stronger corruption.', synergyKeys: ['Wyrdbound'] },
  { id: 'sun-forged-spear', name: 'Sun-Forged Spear', text: 'Rangers gain attack speed and bonus damage.', synergyKeys: ['Ranger'] },
  { id: 'wyrd-iron-crown', name: 'Wyrd-Iron Crown', text: 'Bruisers gain max HP and armor.', synergyKeys: ['Bruiser'] },
  { id: 'olympian-laurel', name: 'Olympian Laurel', text: 'Hellenic and Empyrean units begin with energy and gain ability power.', synergyKeys: ['Hellenic', 'Empyrean'] },
  { id: 'raven-war-banner', name: 'Raven War Banner', text: 'Norse, Heroic, and Assassin units gain modest critical strike power.', synergyKeys: ['Norse', 'Heroic', 'Assassin'] },
  { id: 'scarab-heart', name: 'Scarab Heart', text: 'Egyptian and Guardian units gain max HP and a battle-start shield; Egyptian units deal more damage while shielded.', synergyKeys: ['Egyptian', 'Guardian'] },
  { id: 'cauldron-ember', name: 'Cauldron Ember', text: 'Celtic and Healer units periodically restore health; Celtic units also gain haste.', synergyKeys: ['Celtic', 'Healer'] },
  { id: 'excalibur-scabbard', name: 'Excalibur Scabbard', text: 'Arthurian units deal more damage while shielded and gain armor.', synergyKeys: ['Arthurian'] },
  { id: 'pilgrim-lantern', name: "Pilgrim's Lantern", text: 'Worshipers gain max HP and begin battle with energy.', synergyKeys: ['Worshiper'] },
  { id: 'moonthread-quiver', name: 'Moonthread Quiver', text: 'Ranger and Fae units gain attack speed and dodge chance.', synergyKeys: ['Ranger', 'Fae'] },
  { id: 'scale-of-judgment', name: 'Scale of Judgment', text: 'Sacred units and Healers create stronger healing shields.', synergyKeys: ['Sacred', 'Healer'] },
  { id: 'spirit-war-drum', name: 'Spirit War Drum', text: 'Spirit units generate energy faster and share a little energy with allies.', synergyKeys: ['Spirit'] },
  { id: 'bloodied-torque', name: 'Bloodied Torque', text: 'Bruisers and Assassins gain damage as their health falls.', synergyKeys: ['Bruiser', 'Assassin'] }
];

const state = {
  round: 1,
  maxRound: 20,
  secretRound: 21,
  runComplete: false,
  battleTick: 0,
  battleStartedAt: 0,
  battleElapsedMs: 0,
  overtimeActive: false,
  overtimeStartedAt: 0,
  overtimeLastSecond: 0,
  combatTickMs: COMBAT_TICK_MS,
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
  inspectedUnitId: null,
  inspectedUnitPortrait: '',
  draggedUnitId: null,
  inspectedSynergyKey: '',
  selectedSynergyKey: '',
  latestCombatRecap: null,
  currentBattleStats: null,
  codexPantheon: 'All',
  selectedCodexId: '',
  settings: { ...DEFAULT_SETTINGS }
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
const archiveBtn = $('archiveBtn');
const codexWindowEl = $('codexWindow');
const closeCodexBtn = $('closeCodexBtn');
const settingsBtn = $('settingsBtn');
const settingsWindowEl = $('settingsWindow');
const closeSettingsBtn = $('closeSettingsBtn');
const modalChoicesEl = $('modalChoices');
const shopGoldTextEl = $('shopGoldText');
const shopLockBtn = $('shopLockBtn');
const shopLockStateEl = $('shopLockState');
const timerTextEl = $('timerText');
const combatRecapEl = $('combatRecap');
const settingCombatLogDetailEl = $('settingCombatLogDetail');
const settingConfirmUpgradedSalesEl = $('settingConfirmUpgradedSales');
const settingShowTooltipsEl = $('settingShowTooltips');
const settingShowUnitNamesEl = $('settingShowUnitNames');
const settingShowClassLabelsEl = $('settingShowClassLabels');
const settingUiScaleEl = $('settingUiScale');
const settingDamageNumbersEl = $('settingDamageNumbers');
const settingGridOverlayEl = $('settingGridOverlay');
const settingReducedMotionEl = $('settingReducedMotion');
const settingMasterVolumeEl = $('settingMasterVolume');
const fullscreenBtn = $('fullscreenBtn');
const settingsStatusEl = $('settingsStatus');
const resetSettingsBtn = $('resetSettingsBtn');
const resetSaveBtn = $('resetSaveBtn');
const unitInspectorEl = $('unitInspector');
const unitInspectorContentEl = $('unitInspectorContent');
const closeUnitInspectorBtn = $('closeUnitInspectorBtn');

const IMPORTANT_LOG_TYPES = new Set(['round', 'special', 'warning', 'boss', 'revive', 'death', 'victory', 'defeat']);
const SETTING_LABELS = {
  combatLogDetail: 'Combat log detail',
  confirmUpgradedSales: 'Sale confirmations',
  showTooltips: 'Unit tooltips',
  showUnitNames: 'Unit names',
  showClassLabels: 'Class labels',
  uiScale: 'Interface size',
  damageNumbers: 'Combat numbers',
  gridOverlay: 'Board grid overlay',
  reducedMotion: 'Reduced motion'
};

function loadSettings() {
  if (typeof localStorage === 'undefined') return { ...DEFAULT_SETTINGS };
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    const loaded = {
      ...DEFAULT_SETTINGS,
      ...parsed,
      combatLogDetail: parsed.combatLogDetail === 'important' ? 'important' : 'all',
      uiScale: ['compact', 'normal', 'large'].includes(parsed.uiScale) ? parsed.uiScale : DEFAULT_SETTINGS.uiScale,
      masterVolume: Math.max(0, Math.min(100, Number(parsed.masterVolume ?? DEFAULT_SETTINGS.masterVolume)))
    };
    ['showTooltips', 'showUnitNames', 'showClassLabels', 'damageNumbers', 'reducedMotion', 'confirmUpgradedSales', 'gridOverlay']
      .forEach(key => { loaded[key] = typeof parsed[key] === 'boolean' ? parsed[key] : DEFAULT_SETTINGS[key]; });
    return loaded;
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings() {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function applySettings(options = {}) {
  const settings = state.settings || DEFAULT_SETTINGS;
  document.body.dataset.uiScale = settings.uiScale || 'normal';
  document.body.classList.toggle('reduced-motion', Boolean(settings.reducedMotion));
  document.body.classList.toggle('hide-grid-overlay', !settings.gridOverlay);
  if (window.setPhaserSettings) window.setPhaserSettings(settings);
  if (!options.skipLogFilter) setLogFilter(settings.combatLogDetail || 'all', { skipSettingsSync: true });
  renderSettingsControls();
}

function updateSetting(key, value) {
  state.settings = { ...state.settings, [key]: value };
  saveSettings();
  applySettings();
  if (['showTooltips', 'showUnitNames', 'showClassLabels', 'uiScale'].includes(key)) render();
  if (settingsStatusEl) settingsStatusEl.textContent = `${SETTING_LABELS[key] || 'Setting'} updated and saved.`;
  if (key === 'combatLogDetail') log(`Combat log set to ${value === 'important' ? 'Important Only' : 'Show All'}.`, 'special');
}

function renderSettingsControls() {
  const settings = state.settings || DEFAULT_SETTINGS;
  if (settingCombatLogDetailEl) settingCombatLogDetailEl.value = settings.combatLogDetail || 'all';
  if (settingConfirmUpgradedSalesEl) settingConfirmUpgradedSalesEl.checked = Boolean(settings.confirmUpgradedSales);
  if (settingShowTooltipsEl) settingShowTooltipsEl.checked = Boolean(settings.showTooltips);
  if (settingShowUnitNamesEl) settingShowUnitNamesEl.checked = settings.showUnitNames !== false;
  if (settingShowClassLabelsEl) settingShowClassLabelsEl.checked = settings.showClassLabels !== false;
  if (settingUiScaleEl) settingUiScaleEl.value = settings.uiScale || 'normal';
  if (settingDamageNumbersEl) settingDamageNumbersEl.checked = Boolean(settings.damageNumbers);
  if (settingGridOverlayEl) settingGridOverlayEl.checked = Boolean(settings.gridOverlay);
  if (settingReducedMotionEl) settingReducedMotionEl.checked = Boolean(settings.reducedMotion);
  if (settingMasterVolumeEl) settingMasterVolumeEl.value = settings.masterVolume ?? DEFAULT_SETTINGS.masterVolume;
}

function openSettingsWindow() {
  if (!settingsWindowEl) return;
  renderSettingsControls();
  syncFullscreenControl();
  if (settingsStatusEl) settingsStatusEl.textContent = 'Changes save automatically on this device.';
  settingsWindowEl.classList.remove('hidden');
  closeSettingsBtn?.focus();
}

function closeSettingsWindow() {
  settingsWindowEl?.classList.add('hidden');
  settingsBtn?.focus();
}

function resetSettings() {
  state.settings = { ...DEFAULT_SETTINGS };
  saveSettings();
  applySettings();
  render();
  if (settingsStatusEl) settingsStatusEl.textContent = 'Default settings restored and saved.';
  log('Settings reset to defaults.', 'special');
  showFeedback('Settings reset.');
}

function resetSaveData() {
  if (typeof localStorage === 'undefined') return warnPlayer('Save reset is unavailable in this browser context.');
  const confirmed = typeof window === 'undefined' || !window.confirm
    ? true
    : window.confirm('Delete the saved run on this device? Your current run on screen will not reset until you press Reset Run or load again.');
  if (!confirmed) return;
  localStorage.removeItem(SAVE_KEY);
  log('Local save data cleared.', 'warning');
  showFeedback('Local save data cleared.');
}

function syncFullscreenControl() {
  if (!fullscreenBtn) return;
  const active = Boolean(document.fullscreenElement);
  fullscreenBtn.textContent = active ? 'Exit Fullscreen' : 'Enter Fullscreen';
  fullscreenBtn.setAttribute('aria-pressed', String(active));
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
    syncFullscreenControl();
    if (settingsStatusEl) settingsStatusEl.textContent = document.fullscreenElement ? 'Fullscreen enabled.' : 'Windowed mode enabled.';
  } catch {
    warnPlayer('Fullscreen is unavailable in this window.');
    if (settingsStatusEl) settingsStatusEl.textContent = 'Fullscreen could not be changed in this window.';
  }
}

function init() {
  state.round = 1;
  state.gold = 10;
  state.playerHp = 20;
  state.mode = 'planning';
  state.shopLocked = false;
  state.runComplete = false;
  state.battleTick = 0;
  resetBattleClock();
  state.logFilter = state.settings.combatLogDetail || 'all';
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
  state.inspectedUnitId = null;
  state.inspectedUnitPortrait = '';
  state.draggedUnitId = null;
  state.inspectedSynergyKey = '';
  state.selectedSynergyKey = '';
  state.latestCombatRecap = null;
  state.currentBattleStats = null;
  state.codexPantheon = 'All';
  state.selectedCodexId = UNIT_LIBRARY[0]?.type || '';
  clearTimers();
  rollShop(true);
  logEl.innerHTML = '';
  applySettings();
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
  const ownedUnits = getOwnedUnits();
  const weightedPool = pool.map(template => {
    const matchingUnits = ownedUnits.filter(unit => unit.type === template.type);
    const isMaxed = matchingUnits.some(unit => unit.star >= 3);
    return {
      template,
      weight: matchingUnits.length > 0 && !isMaxed ? OWNED_UPGRADE_SHOP_WEIGHT : 1
    };
  });
  const totalWeight = weightedPool.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const entry of weightedPool) {
    roll -= entry.weight;
    if (roll <= 0) return entry.template;
  }
  return weightedPool[0]?.template || UNIT_LIBRARY[0];
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
  if (unit.star > 1 && state.settings.confirmUpgradedSales && !options.skipConfirm && typeof window !== 'undefined' && window.confirm) {
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
  battlefieldEl.closest?.('.arena-panel')?.classList.toggle('battle-running', state.mode !== 'planning');
  $('roundText').textContent = state.round === state.secretRound ? 'Secret 21' : `${state.round} / ${state.maxRound}`;
  updateTimerDisplay();
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
  renderCombatRecap();
  renderRelics();
  renderCodex();
  renderUnitInspector();
  applyCurrentSynergyHighlight();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function findInspectableUnit(unitId) {
  if (!unitId) return null;
  if (state.mode === 'battle') {
    const combatUnit = state.combatUnits.find(unit => unit?.id === unitId);
    if (combatUnit) return combatUnit;
  }
  return findOwnedUnit(unitId) || state.combatUnits.find(unit => unit?.id === unitId) || null;
}

function renderUnitInspector() {
  if (!unitInspectorEl || !unitInspectorContentEl) return;
  const unit = findInspectableUnit(state.inspectedUnitId);
  if (!unit) {
    unitInspectorEl.classList.add('hidden');
    return;
  }

  const hp = Math.max(0, Math.round(unit.hp || 0));
  const maxHp = Math.max(1, Math.round(unit.maxHp || 1));
  const energy = Math.max(0, Math.round(unit.mana || 0));
  const energyMax = Math.max(1, Math.round(unit.energyMax || 100));
  const hpPct = Math.max(0, Math.min(100, (hp / maxHp) * 100));
  const energyPct = Math.max(0, Math.min(100, (energy / energyMax) * 100));
  const portrait = state.inspectedUnitPortrait || '';
  const statuses = (unit.statuses || []).map(status => status.type).filter(Boolean);
  if ((unit.shield || 0) > 0) statuses.unshift(`Shield ${Math.round(unit.shield)}`);
  if (unit.alive === false) statuses.unshift('Defeated');
  const stars = '★'.repeat(Math.max(1, unit.star || 1));
  const attackRate = unit.speed ? `${(1000 / unit.speed).toFixed(2)}/s` : '—';
  const sellLine = unit.side === 'player' && state.mode === 'planning'
    ? `<span class="unit-inspector-sell">Sell value ${sellValueFor(unit)}g</span>`
    : '';

  unitInspectorEl.dataset.rarity = String(unit.rarity || 'Common').toLowerCase();
  unitInspectorContentEl.innerHTML = `
    <div class="unit-inspector-portrait ${portrait ? 'has-art' : 'fallback'}">
      ${portrait ? `<img src="${portrait}" alt="${escapeHtml(unit.name)} portrait" />` : `<span>${escapeHtml(unit.icon || '◆')}</span>`}
      <div class="unit-inspector-stars" aria-label="${unit.star || 1} stars">${stars}</div>
      <div class="unit-inspector-rarity">${escapeHtml(unit.rarity || 'Common')}</div>
    </div>
    <div class="unit-inspector-tags">
      <span>${escapeHtml(unit.pantheon || 'Unknown')}</span>
      <span>${escapeHtml(unit.sourceType || 'Unknown')}</span>
      <span>${escapeHtml(unit.unitClass || unit.class || 'Unit')}</span>
    </div>
    <div class="unit-inspector-title-row">
      <div>
        <p>${unit.side === 'enemy' ? 'Enemy Combatant' : 'Champion Dossier'}</p>
        <h2 id="unitInspectorName">${escapeHtml(unit.name)}</h2>
      </div>
      <strong>${Math.max(0, unit.cost || 0)}g</strong>
    </div>
    <div class="unit-inspector-vitals">
      <div class="unit-inspector-bar hp"><i style="width:${hpPct}%"></i><b>HP ${hp} / ${maxHp}</b></div>
      <div class="unit-inspector-bar energy"><i style="width:${energyPct}%"></i><b>Energy ${energy} / ${energyMax}</b></div>
    </div>
    <div class="unit-inspector-stats">
      <div><span>Damage</span><strong>${Math.round(unit.damage || 0)}</strong></div>
      <div><span>Armor</span><strong>${Math.round(unit.armor || 0)}</strong></div>
      <div><span>Range</span><strong>${unit.range || 1}</strong></div>
      <div><span>Attack Rate</span><strong>${attackRate}</strong></div>
    </div>
    <section class="unit-inspector-ability">
      <div class="ability-glyph">✦</div>
      <div><span>Ability</span><h3>${escapeHtml(unit.abilityName || 'Strike')}</h3><p>${escapeHtml(unit.abilityText || unit.abilityDescription || 'Basic attack pattern.')}</p></div>
    </section>
    <div class="unit-inspector-footer">
      <span>${statuses.length ? escapeHtml(statuses.join(' · ')) : 'No active effects'}</span>
      ${sellLine}
    </div>
  `;
  unitInspectorEl.classList.remove('hidden');
}

function inspectUnit(unitId, portraitPath = '') {
  if (!findInspectableUnit(unitId)) return;
  state.inspectedUnitId = unitId;
  state.inspectedUnitPortrait = portraitPath;
  renderUnitInspector();
}

function closeUnitInspector() {
  state.inspectedUnitId = null;
  state.inspectedUnitPortrait = '';
  unitInspectorEl?.classList.add('hidden');
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
    const ownedUnits = getOwnedUnits().filter(u => u.type === item.type);
    const owned = ownedUnits.filter(u => u.star === 1).length;
    const hasThreeStar = ownedUnits.some(u => u.star >= 3);
    const shouldGlow = ownedUnits.length > 0 && !hasThreeStar;
    const card = document.createElement('div');
    card.className = `unit-card rarity-${item.rarity.toLowerCase()} ${shouldGlow ? 'owned-unit' : ''} ${hasThreeStar ? 'maxed-unit' : ''}`;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Buy ${item.name} for ${item.cost} gold`);
    card.title = `${item.name} - ${item.pantheon} / ${item.sourceType} / ${item.class}\n${item.abilityName}: ${item.abilityDescription}\nHP ${item.hp} | DMG ${item.damage} | RNG ${item.range} | SPD ${speedLabel(item.attackSpeed || item.speed)} | ARM ${item.armor || 0} | EN ${item.energyMax}`;
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
        <span class="pill">${hasThreeStar ? 'Maxed' : `Owned ${owned}/3`}</span>
      </div>
      <span class="primary-btn small buy-btn" aria-hidden="true">Buy</span>
    `;
    const buyFromCard = () => buyUnit(item);
    card.addEventListener('click', buyFromCard);
    card.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      buyFromCard();
    });
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

function synergyInspectData(key, counts = getSynergyCounts()) {
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
  return {
    key,
    tiers,
    current,
    activeTier,
    nextTier,
    targetTier,
    category,
    progressPct,
    near,
    maxed,
    contributors: getSynergyContributors(key),
    benchMatches: getBenchSynergyMatches(key)
  };
}

function getSynergyContributors(key) {
  const seenTypes = new Set();
  return Object.values(state.board)
    .filter(unit => {
      if (!unit || seenTypes.has(unit.type)) return false;
      const matches = unit.pantheon === key || unit.sourceType === key || unit.unitClass === key;
      if (matches) seenTypes.add(unit.type);
      return matches;
    });
}

function getBenchSynergyMatches(key) {
  const deployedTypes = new Set(Object.values(state.board).filter(Boolean).map(unit => unit.type));
  const seenTypes = new Set();
  return state.bench
    .filter(unit => {
      if (!unit || deployedTypes.has(unit.type) || seenTypes.has(unit.type)) return false;
      const matches = unit.pantheon === key || unit.sourceType === key || unit.unitClass === key;
      if (matches) seenTypes.add(unit.type);
      return matches;
    });
}

function renderSynergyInspector(key, counts = getSynergyCounts()) {
  const data = synergyInspectData(key, counts);
  const inspector = document.createElement('div');
  inspector.className = `synergy-inspector ${String(data.category).toLowerCase()}`;
  const activeText = data.activeTier
    ? `${data.activeTier.threshold} ${key} - ${data.activeTier.text}`
    : 'No active threshold yet.';
  const nextText = data.nextTier
    ? `${data.nextTier.threshold} ${key} - ${data.nextTier.text}`
    : 'All listed thresholds are active.';
  const contributorNames = data.contributors.map(unit => `${unit.name} ${starLabel(unit.star)}`);
  const benchNames = data.benchMatches.map(unit => unit.name);
  inspector.innerHTML = `
    <div class="inspector-heading">
      <strong>${key} ${data.current}/${data.nextTier?.threshold || data.current}</strong>
      <span>${data.category}</span>
    </div>
    <p><b>Active:</b> ${activeText}</p>
    <p><b>Next:</b> ${nextText}</p>
    <p><b>Contributors:</b> ${contributorNames.length ? contributorNames.join(', ') : 'None deployed.'}</p>
    ${benchNames.length ? `<p class="bench-note"><b>Bench matches:</b> ${benchNames.join(', ')} <span>not counted</span></p>` : ''}
    ${state.selectedSynergyKey ? '<button class="ghost-btn small clear-synergy-inspector" type="button">Clear</button>' : ''}
  `;
  inspector.querySelector('.clear-synergy-inspector')?.addEventListener('click', () => clearSynergyInspection(true));
  return inspector;
}

function inspectSynergy(key, pinned = false) {
  const nextSelected = pinned ? (state.selectedSynergyKey === key ? '' : key) : state.selectedSynergyKey;
  const nextInspected = nextSelected || key;
  const changed = state.selectedSynergyKey !== nextSelected || state.inspectedSynergyKey !== nextInspected;
  state.selectedSynergyKey = nextSelected;
  state.inspectedSynergyKey = nextInspected;
  applyCurrentSynergyHighlight();
  if (changed) renderSynergies();
}

function clearSynergyInspection(forceSelected = false) {
  if (forceSelected) state.selectedSynergyKey = '';
  if (state.selectedSynergyKey) {
    state.inspectedSynergyKey = state.selectedSynergyKey;
    applyCurrentSynergyHighlight();
    return;
  }
  const changed = Boolean(state.inspectedSynergyKey);
  state.inspectedSynergyKey = '';
  clearBoardUnitHighlights();
  if (changed) renderSynergies();
}

function synergyHighlightStyle(key) {
  const category = synergyTiers(key)[0]?.category || '';
  if (category === 'Pantheon') return 'pantheon';
  if (category === 'Class') return 'class';
  return 'source';
}

function applyCurrentSynergyHighlight() {
  const key = state.selectedSynergyKey || state.inspectedSynergyKey;
  if (!key) {
    clearBoardUnitHighlights();
    return;
  }
  const ids = getSynergyContributors(key).map(unit => unit.id);
  highlightBoardUnits(ids, synergyHighlightStyle(key));
}

function highlightBoardUnits(unitIds, style = 'pantheon') {
  document.querySelectorAll('.unit-token').forEach(token => {
    token.classList.remove('synergy-highlight-pantheon', 'synergy-highlight-class', 'synergy-highlight-source');
  });
  if (window.highlightUnitsByIds) window.highlightUnitsByIds(unitIds, style);
  unitIds.forEach(id => {
    const token = document.querySelector(`.unit-token[data-unit-id="${id}"]`);
    token?.classList.add(`synergy-highlight-${style}`);
  });
}

function clearBoardUnitHighlights() {
  document.querySelectorAll('.unit-token').forEach(token => {
    token.classList.remove('synergy-highlight-pantheon', 'synergy-highlight-class', 'synergy-highlight-source');
  });
  if (window.clearUnitHighlights) window.clearUnitHighlights();
}

function renderSynergies() {
  const counts = getSynergyCounts();
  synergyEl.innerHTML = '';

  const visibleKeys = [...new Set(SYNERGIES.map(s => s.key))]
    .filter(key => (counts[key] || 0) > 0);
  if (!visibleKeys.length) {
    synergyEl.innerHTML = '<div class="empty-note">Deploy champions to reveal active and near-active synergies.</div>';
    state.inspectedSynergyKey = '';
    state.selectedSynergyKey = '';
    clearBoardUnitHighlights();
    return;
  }
  if (state.inspectedSynergyKey && !visibleKeys.includes(state.inspectedSynergyKey)) state.inspectedSynergyKey = '';
  if (state.selectedSynergyKey && !visibleKeys.includes(state.selectedSynergyKey)) state.selectedSynergyKey = '';

  visibleKeys.forEach(key => {
    const data = synergyInspectData(key, counts);
    const { current, activeTier, nextTier, targetTier, category, progressPct, near, maxed } = data;
    const selected = state.inspectedSynergyKey === key || state.selectedSynergyKey === key;
    const item = document.createElement('div');
    item.className = `synergy-item ${activeTier ? 'active' : 'inactive'} ${near ? 'near' : ''} ${maxed ? 'maxed' : ''} ${selected ? 'selected' : ''}`;
    item.dataset.synergyKey = key;
    item.tabIndex = 0;
    item.innerHTML = `
      <div class="synergy-main">
        <div class="synergy-title"><strong>${key}</strong><span>${category}</span></div>
        ${activeTier ? `<div class="synergy-text"><b>Active:</b> ${activeTier.threshold} ${key} - ${activeTier.text}</div>` : ''}
        ${nextTier ? `<div class="synergy-text next"><b>Next:</b> ${nextTier.threshold} ${key} - ${nextTier.text}</div>` : '<div class="synergy-text next"><b>Max:</b> All listed tiers active.</div>'}
        <div class="synergy-progress"><div style="width:${progressPct}%"></div></div>
      </div>
      <div class="synergy-count">${current}/${targetTier?.threshold || current}<small>${maxed ? 'Maxed' : activeTier ? 'Active' : near ? 'Close' : 'Inactive'}</small></div>
    `;
    item.addEventListener('mouseenter', () => inspectSynergy(key, false));
    item.addEventListener('mouseleave', () => {
      if (!state.selectedSynergyKey) clearSynergyInspection(false);
    });
    item.addEventListener('focus', () => inspectSynergy(key, false));
    item.addEventListener('blur', () => {
      if (!state.selectedSynergyKey) clearSynergyInspection(false);
    });
    item.addEventListener('click', () => inspectSynergy(key, true));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        inspectSynergy(key, true);
      }
      if (event.key === 'Escape') clearSynergyInspection(true);
    });
    synergyEl.appendChild(item);
  });

  const inspectedKey = state.selectedSynergyKey || state.inspectedSynergyKey;
  if (inspectedKey && visibleKeys.includes(inspectedKey)) {
    synergyEl.appendChild(renderSynergyInspector(inspectedKey, counts));
  }
}

function previewTemplatesForRound(round) {
  const picks = normalizedEnemyLayoutForRound(round);
  return picks.map(idx => ENEMY_LIBRARY[idx]).filter(Boolean);
}

function unitClassName(unit) {
  return unit?.unitClass || unit?.class || 'Unit';
}

function countByName(units) {
  return units.reduce((counts, unit) => {
    const name = unit.name || 'Unknown';
    counts[name] = (counts[name] || 0) + 1;
    return counts;
  }, {});
}

function topClassSummary(units) {
  const counts = units.reduce((acc, unit) => {
    const key = unitClassName(unit);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key, count]) => count > 1 ? `${key} x${count}` : key)
    .join(', ') || 'Mixed';
}

function threatTextForPreview(units, kind) {
  if (kind === 'trickster') return 'Your past formation returns as an enemy echo. Expect familiar damage patterns and positioning.';
  if (kind === 'boss') {
    const boss = units.find(unit => unitClassName(unit) === 'Boss') || units[0];
    return boss
      ? `${boss.name} brings ${boss.abilityName || 'a boss power'}, high pressure, and punishing combat stats.`
      : 'Boss round warning: expect a high-health threat with heavy pressure.';
  }
  const classes = new Set(units.map(unitClassName));
  if (classes.has('Assassin') && classes.has('Mage')) return 'Assassins and mages pressure your backline.';
  if (classes.has('Healer')) return 'Sustain can drag the fight out; focus damage matters.';
  if (classes.has('Guardian') || classes.has('Bruiser')) return 'Frontline enemies may stall your squad while damage dealers work.';
  if (classes.has('Ranger')) return 'Ranged attackers punish exposed units.';
  return 'A mixed wave tests your frontline, damage, and positioning.';
}

function bossPresentationForRound(round, enemyUnits = previewTemplatesForRound(round)) {
  const bossUnits = (enemyUnits || []).filter(unit => unitClassName(unit) === 'Boss');
  if (!bossUnits.length) return null;
  const primaryBoss = round === state.secretRound
    ? bossUnits.find(unit => String(unit.name).includes('Kingdom That Never Healed')) || bossUnits[0]
    : bossUnits[0];
  const extraBosses = Math.max(0, bossUnits.length - 1);
  const mega = round === state.secretRound;
  const threat = mega
    ? `Mega boss round: ${primaryBoss.name} enters with ${extraBosses} gathered boss powers.`
    : `${primaryBoss.name} brings ${primaryBoss.abilityName || 'a boss power'} and punishing combat stats.`;
  return {
    round,
    mega,
    title: mega ? 'Secret Mega Boss' : 'Boss Encounter',
    subtitle: WAVE_NAMES[round] || `Round ${round}`,
    bossName: primaryBoss.name,
    abilityName: primaryBoss.abilityName || 'Unknown Power',
    threat,
    bossCount: bossUnits.length,
    extraBosses
  };
}

function buildEnemyPreview() {
  const round = state.round;
  const trickster = isTricksterRound(round);
  const snapshot = trickster ? latestBoardSnapshotBefore(round) : null;
  const boss = isBossRound(round);
  let kind = boss ? 'boss' : 'normal';
  let units = previewTemplatesForRound(round);
  let title = round === state.secretRound ? 'Secret Round 21' : boss ? `Boss Round ${round}` : `Round ${round}: ${WAVE_NAMES[round]}`;
  let heading = WAVE_NAMES[round] || 'Unknown Wave';
  const stats = [];

  if (trickster && snapshot) {
    kind = 'trickster';
    title = `Trickster Round ${round}: Mirror of Round ${snapshot.round}`;
    heading = 'Trickster Mirror';
    units = snapshot.units
      .map(snapshotUnit => {
        const template = getTemplateByType(snapshotUnit.type);
        return template ? { ...template, name: `Echo ${template.name}` } : null;
      })
      .filter(Boolean)
      .slice(0, ENEMY_SLOTS.length);
    const scale = tricksterScaleForRound(round);
    stats.push({ label: 'Mirrored Round', value: snapshot.round });
    stats.push({ label: 'Copied Units', value: units.length });
    stats.push({ label: 'Scaling', value: `${scale.toFixed(2)}x` });
  } else if (trickster) {
    kind = 'trickster';
    title = `Trickster Round ${round}`;
    heading = 'No mirror found';
    stats.push({ label: 'Fallback', value: 'Normal wave incoming' });
  }

  if (!trickster || !snapshot) {
    stats.push({ label: boss ? 'Boss Units' : 'Enemies', value: units.length });
    stats.push({ label: 'Main Types', value: topClassSummary(units) });
  }

  if (boss && !trickster) {
    const bossUnit = units.find(unit => unitClassName(unit) === 'Boss') || units[0];
    if (bossUnit) stats.unshift({ label: 'Boss', value: bossUnit.name });
    const bossPresentation = bossPresentationForRound(round, units);
    if (bossPresentation) {
      stats.push({ label: 'Signature', value: bossPresentation.abilityName });
      if (bossPresentation.mega) stats.push({ label: 'Boss Council', value: `${bossPresentation.bossCount} bosses` });
    }
  }

  return {
    kind,
    title,
    heading,
    stats,
    counts: countByName(units),
    threat: trickster && !snapshot
      ? 'No stored formation was found, so the rift will safely use the normal enemy wave.'
      : threatTextForPreview(units, kind)
  };
}

function renderEnemyPreview() {
  if (!enemyPreviewEl) return;
  const preview = buildEnemyPreview();
  if (enemyPreviewTitleEl) enemyPreviewTitleEl.textContent = preview.title;
  const statRows = preview.stats.map(stat => `<span><b>${stat.label}:</b> ${stat.value}</span>`).join('');
  const chips = Object.entries(preview.counts).map(([name, count]) => {
    const enemy = ENEMY_LIBRARY.find(item => item.name === name) || CHAMPION_POOL.find(item => item.name === name) || UNIT_LIBRARY.find(item => item.name === name);
    const unitPreview = enemy || { rarity: 'Rare', pantheon: 'Trickster', sourceType: 'Mirror', unitClass: 'Echo' };
    const countText = count > 1 ? ` x${count}` : '';
    return `
      <div class="preview-chip rarity-${String(unitPreview.rarity || 'Rare').toLowerCase()}">
        <strong>${name}${countText}</strong>
        <span>${unitPreview.pantheon} / ${unitPreview.sourceType} / ${unitPreview.unitClass || unitPreview.class}</span>
      </div>
    `;
  }).join('');
  enemyPreviewEl.innerHTML = `
    <div class="preview-summary ${preview.kind}">
      <strong>${preview.heading}</strong>
      <div class="preview-stat-row">${statRows}</div>
      <p>${preview.threat}</p>
    </div>
    <div class="preview-chip-list">${chips}</div>
  `;
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

function openCodexWindow() {
  if (!codexWindowEl) return;
  renderCodex();
  codexWindowEl.classList.remove('hidden');
  closeCodexBtn?.focus();
}

function closeCodexWindow() {
  codexWindowEl?.classList.add('hidden');
  archiveBtn?.focus();
}

function renderUnitToken(unit, draggable = false) {
  const token = document.createElement('div');
  const selected = unit.id === state.selectedUnitId;
  token.className = `unit-token rarity-${String(unit.rarity || 'Common').toLowerCase()} ${unit.side === 'enemy' ? 'enemy' : ''} ${unit.alive === false ? 'dead' : ''} ${selected ? 'selected' : ''}`;
  token.dataset.unitId = unit.id;
  token.addEventListener('click', (event) => {
    event.stopPropagation();
    inspectUnit(unit.id);
  });
  if (state.settings.showTooltips) {
    token.title = `${unit.name} ${starLabel(unit.star)}\n${unit.pantheon} • ${unit.sourceType} • ${unit.unitClass} • ${unit.rarity}\nHP ${Math.max(0, Math.round(unit.hp))}/${unit.maxHp} | Energy ${Math.round(unit.mana || 0)}/${unit.energyMax} | DMG ${unit.damage} | RNG ${unit.range} | SPD ${speedLabel(unit.speed)} | ARM ${unit.armor}\n${unit.abilityName}: ${unit.abilityText}${unit.side === 'player' && state.mode === 'planning' ? '\nDrag to deploy. Double-click to sell.' : ''}`;
  }

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

function handlePhaserUnitClick(unitId, _x, _y, portraitPath = '') {
  inspectUnit(unitId, portraitPath);
  if (state.mode === 'planning' && isOnBoard(unitId)) selectPlacementUnit(unitId);
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
  const fromBenchIndex = state.bench.findIndex(unit => unit?.id === unitId);
  const fromBoardKey = Object.keys(state.board).find(boardKey => state.board[boardKey]?.id === unitId);

  if (state.mode !== 'planning' || x < 0 || x >= 8 || y < 4 || y >= 6) return false;
  if (fromBenchIndex >= 0 && existing) {
    warnPlayer('That battlefield cell is already occupied. Choose an empty deployment cell.');
    render();
    return false;
  }
  if (fromBenchIndex >= 0 && getActiveUnitCount() >= state.activeUnitCap) {
    warnPlayer(`Active unit cap reached: ${state.activeUnitCap}/${state.activeUnitCap}. Bench units do not count, but you must free a battlefield slot before deploying another unit.`);
    render();
    return false;
  }

  let unit = null;
  if (fromBenchIndex >= 0) {
    unit = state.bench[fromBenchIndex];
    state.bench[fromBenchIndex] = null;
  } else if (fromBoardKey) {
    unit = state.board[fromBoardKey];
    delete state.board[fromBoardKey];
  }
  if (!unit) return false;

  if (existing && fromBoardKey) {
    const [oldX, oldY] = fromBoardKey.split(',').map(Number);
    existing.x = oldX;
    existing.y = oldY;
    state.board[fromBoardKey] = existing;
  }

  unit.x = x;
  unit.y = y;
  state.board[key] = unit;
  state.selectedUnitId = null;
  state.draggedUnitId = null;
  showFeedback('');
  log(`${unit.name} deployed. Active units: ${getActiveUnitCount()}/${state.activeUnitCap}.`, 'special');
  render();
  return true;
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

function initBattleStats(playerUnits, enemyUnits) {
  state.currentBattleStats = {
    round: state.round,
    waveName: WAVE_NAMES[state.round] || 'Unknown Wave',
    trickster: isTricksterRound(state.round),
    tricksterSnapshotRound: latestBoardSnapshotBefore(state.round)?.round || null,
    player: {},
    enemy: {}
  };
  [...playerUnits, ...enemyUnits].forEach(unit => ensureCombatStatUnit(unit));
}

function ensureCombatStatUnit(unit) {
  if (!state.currentBattleStats || !unit?.id) return null;
  const bucket = unit.side === 'enemy' ? state.currentBattleStats.enemy : state.currentBattleStats.player;
  if (!bucket[unit.id]) {
    bucket[unit.id] = {
      id: unit.id,
      name: unit.name,
      type: unit.type,
      side: unit.side,
      star: unit.star || 1,
      pantheon: unit.pantheon,
      sourceType: unit.sourceType,
      unitClass: unit.unitClass || unit.class,
      damageDealt: 0,
      damageTaken: 0,
      healingDone: 0,
      shieldingDone: 0,
      kills: 0,
      survived: false
    };
  }
  return bucket[unit.id];
}

function addCombatStat(unit, field, amount) {
  if (!unit || !state.currentBattleStats || amount <= 0) return;
  const entry = ensureCombatStatUnit(unit);
  if (!entry) return;
  entry[field] += Math.round(amount);
}

function recordDamageDealt(unit, amount) { addCombatStat(unit, 'damageDealt', amount); }
function recordDamageTaken(unit, amount) { addCombatStat(unit, 'damageTaken', amount); }
function recordHealing(unit, amount) { addCombatStat(unit, 'healingDone', amount); }
function recordShielding(unit, amount) { addCombatStat(unit, 'shieldingDone', amount); }
function recordKill(unit) { addCombatStat(unit, 'kills', 1); }

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
  resetBattleClock();
  state.battleStartedAt = Date.now();
  state.combatTickMs = COMBAT_TICK_MS;
  state.battleFlags = { egyptianDeathResistUsed: false, wyrdboundEchoUsed: false };
  captureBoardSnapshot(state.round);

  const playerUnits = Object.values(state.board).map(u => cloneForCombat(u));
  const enemyUnits = spawnEnemies(state.round);
  state.combatUnits = [...playerUnits, ...enemyUnits];
  initBattleStats(playerUnits, enemyUnits);
  beginRoundLog(state.round, playerUnits, enemyUnits);
  if (isBossRound(state.round) && window.playBossIntroEffect) {
    window.playBossIntroEffect(bossPresentationForRound(state.round, enemyUnits));
  }
  applySynergyBonuses(state.combatUnits);
  applyOpeningAssassinJumps();
  render();
  startCombatTicker(COMBAT_TICK_MS);
}

function resetBattleClock() {
  state.battleStartedAt = 0;
  state.battleElapsedMs = 0;
  state.overtimeActive = false;
  state.overtimeStartedAt = 0;
  state.overtimeLastSecond = 0;
  state.combatTickMs = COMBAT_TICK_MS;
}

function startCombatTicker(intervalMs) {
  clearTimers();
  state.combatTickMs = intervalMs;
  state.timers.push(setInterval(combatTick, intervalMs));
}

function updateTimerDisplay() {
  if (!timerTextEl) return;
  const statusTextEl = $('statusText');
  if (statusTextEl && state.mode === 'battle') statusTextEl.textContent = state.overtimeActive ? 'Overtime' : 'Battling';
  const card = timerTextEl.closest('.timer-card');
  card?.classList.toggle('overtime', state.mode === 'battle' && state.overtimeActive);
  if (state.runComplete) {
    timerTextEl.textContent = 'Done';
    return;
  }
  if (state.mode !== 'battle') {
    timerTextEl.textContent = `${Math.ceil(ROUND_TIME_LIMIT_MS / 1000)}s`;
    return;
  }
  if (state.overtimeActive) {
    const overtimeElapsed = Math.max(0, Date.now() - state.overtimeStartedAt);
    const remaining = Math.max(0, Math.ceil((OVERTIME_DURATION_MS - overtimeElapsed) / 1000));
    timerTextEl.textContent = `OT ${remaining}s`;
    return;
  }
  const remaining = Math.max(0, Math.ceil((ROUND_TIME_LIMIT_MS - state.battleElapsedMs) / 1000));
  timerTextEl.textContent = `${remaining}s`;
}

function updateBattleClock() {
  if (state.mode !== 'battle' || !state.battleStartedAt) return true;
  const now = Date.now();
  state.battleElapsedMs = now - state.battleStartedAt;
  if (!state.overtimeActive && state.battleElapsedMs >= ROUND_TIME_LIMIT_MS) {
    startOvertime(now);
  }
  if (state.overtimeActive) {
    applyOvertimeDamage(now);
    if (now - state.overtimeStartedAt >= OVERTIME_DURATION_MS) {
      resolveOvertimeTiebreaker();
      return false;
    }
  }
  updateTimerDisplay();
  return true;
}

function startOvertime(now = Date.now()) {
  state.overtimeActive = true;
  state.overtimeStartedAt = now;
  state.overtimeLastSecond = 0;
  log('Overtime begins: battle speed surges to x4 and rift damage increases every second.', 'warning');
  showFeedback('Overtime! x4 speed and escalating rift damage.');
  startCombatTicker(OVERTIME_TICK_MS);
  if (window.playAbilityEffect) {
    const livingBoss = state.combatUnits.find(u => u.side === 'enemy' && u.alive && u.unitClass === 'Boss');
    if (livingBoss) window.playAbilityEffect(livingBoss.id, 'Overtime Rift');
  }
}

function applyOvertimeDamage(now = Date.now()) {
  const elapsedSecond = Math.floor((now - state.overtimeStartedAt) / 1000);
  if (elapsedSecond <= state.overtimeLastSecond) return;
  for (let second = state.overtimeLastSecond + 1; second <= elapsedSecond; second += 1) {
    const damage = 5 * second;
    state.combatUnits
      .filter(unit => unit.alive)
      .forEach(unit => applyDamage(unit, damage, {
        source: 'Overtime rift',
        sourceName: 'Overtime rift',
        trueDamage: true,
        ignoreDodge: true,
        isDot: true,
        silent: true
      }));
    log(`Overtime rift deals ${damage} true damage to every living unit.`, 'burn');
  }
  state.overtimeLastSecond = elapsedSecond;
}

function resolveOvertimeTiebreaker() {
  const livingPlayers = state.combatUnits.filter(u => u.side === 'player' && u.alive);
  const livingEnemies = state.combatUnits.filter(u => u.side === 'enemy' && u.alive);
  if (!livingPlayers.length || !livingEnemies.length) {
    endBattle(livingPlayers.length > 0);
    return;
  }
  if (livingPlayers.length !== livingEnemies.length) {
    const playerWon = livingPlayers.length > livingEnemies.length;
    log(`Overtime ends. ${playerWon ? 'Your squad' : 'The enemy'} wins by living unit count: ${livingPlayers.length} to ${livingEnemies.length}.`, playerWon ? 'victory' : 'defeat');
    endBattle(playerWon);
    return;
  }

  const playerHpTotal = livingPlayers.reduce((sum, unit) => sum + Math.max(0, unit.hp), 0);
  const enemyHpTotal = livingEnemies.reduce((sum, unit) => sum + Math.max(0, unit.hp), 0);
  const playerWon = playerHpTotal >= enemyHpTotal;
  log(`Overtime living count is tied ${livingPlayers.length}-${livingEnemies.length}. ${playerWon ? 'Your squad' : 'The enemy'} wins by remaining HP.`, playerWon ? 'victory' : 'defeat');
  endBattle(playerWon);
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
  const picks = normalizedEnemyLayoutForRound(round);
  return picks.map((idx, i) => {
    const base = ENEMY_LIBRARY[idx];
    const isMegaBossRound = round === state.secretRound;
    const isBossUnit = base.unitClass === 'Boss' || base.class === 'Boss';
    const normalScale = round === 14
      ? 2.52
      : 1 + (Math.min(round, state.maxRound) - 1) * NORMAL_ENEMY_SCALE_PER_ROUND;
    const bossScale = isMegaBossRound ? 1 : 1 + (Math.min(round, state.maxRound) - 1) * BOSS_ENEMY_SCALE_PER_ROUND;
    const scale = isBossUnit ? bossScale : normalScale;
    const unit = makeUnit({
      ...base,
      hp: Math.round(base.hp * scale),
      damage: Math.round(base.damage * scale),
      class: isBossUnit ? 'Boss' : base.class,
      unitClass: isBossUnit ? 'Boss' : base.unitClass
    }, 'enemy');
    if (isBossUnit) applyBossCombatPackage(unit, round, isMegaBossRound);
    unit.x = ENEMY_SLOTS[i]?.[0] ?? 3;
    unit.y = ENEMY_SLOTS[i]?.[1] ?? 0;
    return unit;
  });
}

function normalizedEnemyLayoutForRound(round) {
  const picks = ENEMY_LAYOUTS[round] || ENEMY_LAYOUTS[state.maxRound] || [];
  if (round === state.secretRound) return picks;

  const seenSingular = new Set();
  return picks.filter(idx => {
    const template = ENEMY_LIBRARY[idx];
    if (!template || !SINGULAR_ENEMY_NAMES.has(template.name)) return true;
    if (seenSingular.has(template.name)) return false;
    seenSingular.add(template.name);
    return true;
  });
}

function spawnTricksterEnemies(round) {
  const snapshot = latestBoardSnapshotBefore(round);
  if (!snapshot) return [];
  const scale = tricksterScaleForRound(round);
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

function tricksterScaleForRound(round) {
  if (round === TRICKSTER_ROUNDS[0]) return FIRST_TRICKSTER_SCALE;
  if (round === 13) return 1.32;
  if (round === 18) return 1.45;
  return 0.75 + Math.min(round, state.maxRound) * 0.05;
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
      u.damageMultiplier += 0.12;
      u.armor += 8;
    } else if (norseTier >= 2) {
      u.damageMultiplier += 0.08;
    }
    if (norseTier >= 6) u.lowHpSpeedMult = 0.82;
  });

  const egyptianTier = tier('Egyptian');
  player.filter(u => u.pantheon === 'Egyptian').forEach(u => {
    if (egyptianTier >= 2) {
      u.healMult += 0.15;
      u.shieldMult += 0.15;
    }
    if (egyptianTier >= 4) {
      addShield(u, 0.1);
      u.manaGainMult += 0.1;
      u.shieldedDamageMult += 0.14;
    }
    if (egyptianTier >= 6) {
      u.canDeathResist = true;
      u.damageMultiplier += 0.08;
    }
  });

  const celticTier = tier('Celtic');
  player.filter(u => u.pantheon === 'Celtic').forEach(u => {
    if (celticTier >= 2) u.dodgeChance += celticTier >= 4 ? 0.12 : 0.1;
    if (celticTier >= 4) {
      u.wildRegen = 5;
      u.manaGainMult += 0.1;
    }
    if (celticTier >= 6) {
      u.wildRegen = 6;
      u.speed = Math.round(u.speed * 0.92);
      u.dodgeEnergyGain = Math.max(u.dodgeEnergyGain, 14);
      u.damageMultiplier += 0.1;
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
    if (hasRelic('aegis-shard') && (unit.unitClass === 'Guardian' || unit.pantheon === 'Arthurian' || unit.sourceType === 'Worshiper')) {
      unit.shield += Math.round(unit.maxHp * 0.12);
    }
    if (hasRelic('thunder-seed') && (unit.unitClass === 'Mage' || unit.sourceType === 'Empyrean' || unit.pantheon === 'Hellenic' || unit.sourceType === 'Spirit')) {
      unit.abilityDamageMult += 0.22;
      if (unit.sourceType === 'Spirit') unit.manaGainMult += 0.08;
    }
    if (hasRelic('valkyrie-horn') && (unit.sourceType === 'Heroic' || unit.pantheon === 'Norse' || unit.unitClass === 'Assassin')) {
      unit.damageMultiplier += 0.12;
    }
    if (hasRelic('ankh-of-return') && (unit.unitClass === 'Healer' || unit.pantheon === 'Egyptian' || unit.sourceType === 'Sacred')) {
      unit.healMult += 0.25;
      unit.shieldMult += 0.15;
    }
    if (hasRelic('fae-briar') && (unit.sourceType === 'Fae' || unit.pantheon === 'Celtic')) {
      unit.dodgeChance += 0.1;
      unit.dodgeEnergyGain = Math.max(unit.dodgeEnergyGain, 7);
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
    if (hasRelic('olympian-laurel') && (unit.pantheon === 'Hellenic' || unit.sourceType === 'Empyrean')) {
      unit.abilityDamageMult += 0.12;
      unit.mana = Math.min(unit.energyMax || 100, (unit.mana || 0) + 15);
    }
    if (hasRelic('raven-war-banner') && (unit.pantheon === 'Norse' || unit.sourceType === 'Heroic' || unit.unitClass === 'Assassin')) {
      unit.critChance += 0.06;
      unit.critDamageMult += 0.12;
    }
    if (hasRelic('scarab-heart') && (unit.pantheon === 'Egyptian' || unit.unitClass === 'Guardian')) {
      const bonus = Math.round(unit.maxHp * 0.1);
      unit.maxHp += bonus;
      unit.hp += bonus;
      unit.shield += Math.round(unit.maxHp * 0.06);
      if (unit.pantheon === 'Egyptian') unit.shieldedDamageMult += 0.12;
    }
    if (hasRelic('cauldron-ember') && (unit.pantheon === 'Celtic' || unit.unitClass === 'Healer')) {
      unit.wildRegen = Math.max(unit.wildRegen, 4);
      if (unit.pantheon === 'Celtic') unit.speed = Math.round(unit.speed * 0.94);
    }
    if (hasRelic('excalibur-scabbard') && unit.pantheon === 'Arthurian') {
      unit.armor += 5;
      unit.shieldedDamageMult += 0.12;
    }
    if (hasRelic('pilgrim-lantern') && unit.sourceType === 'Worshiper') {
      const bonus = Math.round(unit.maxHp * 0.14);
      unit.maxHp += bonus;
      unit.hp += bonus;
      unit.mana = Math.min(unit.energyMax || 100, (unit.mana || 0) + 20);
    }
    if (hasRelic('moonthread-quiver') && (unit.unitClass === 'Ranger' || unit.sourceType === 'Fae')) {
      unit.speed = Math.round(unit.speed * 0.92);
      unit.dodgeChance += 0.05;
    }
    if (hasRelic('scale-of-judgment') && (unit.sourceType === 'Sacred' || unit.unitClass === 'Healer')) {
      unit.healMult += 0.12;
      unit.healShieldOnHealed = Math.max(unit.healShieldOnHealed, 0.12);
    }
    if (hasRelic('spirit-war-drum') && unit.sourceType === 'Spirit') {
      unit.manaGainMult += 0.16;
      unit.spiritTeamEnergy = true;
    }
    if (hasRelic('bloodied-torque') && (unit.unitClass === 'Bruiser' || unit.unitClass === 'Assassin')) {
      unit.bruiserMissingHpDamageMult = Math.max(unit.bruiserMissingHpDamageMult, 0.2);
    }
  });
}

function applyBossCombatPackage(unit, round, isMegaBossRound) {
  if (isMegaBossRound) {
    unit.maxHp = Math.round(unit.maxHp * 0.9);
    unit.hp = unit.maxHp;
    unit.damage = Math.round(unit.damage * 0.9);
    return;
  }
  if (round === 20) {
    unit.manaGainMult = 1.05;
    unit.energyMax = 95;
    unit.speed = Math.max(480, Math.round(unit.speed * 0.96));
    return;
  }
  const lateBoss = round >= 15;
  unit.damageReduction = lateBoss ? 0.18 : 0.12;
  unit.manaGainMult = lateBoss ? 1.25 : 1.15;
  unit.energyMax = lateBoss ? 78 : 85;
  unit.speed = Math.max(480, Math.round(unit.speed * (lateBoss ? 0.85 : 0.9)));
  unit.shield = Math.round(unit.maxHp * (lateBoss ? 0.1 : 0.05));
}

function combatTick() {
  state.battleTick += 1;
  if (!updateBattleClock()) return;

  let livingPlayers = state.combatUnits.filter(u => u.side === 'player' && u.alive);
  let livingEnemies = state.combatUnits.filter(u => u.side === 'enemy' && u.alive);
  if (!livingPlayers.length || !livingEnemies.length) return endBattle(livingPlayers.length > 0);

  state.combatUnits.filter(u => u.alive).forEach(unit => processStatuses(unit));
  processTeamSynergyTicks();

  livingPlayers = state.combatUnits.filter(u => u.side === 'player' && u.alive);
  livingEnemies = state.combatUnits.filter(u => u.side === 'enemy' && u.alive);
  if (!livingPlayers.length || !livingEnemies.length) return endBattle(livingPlayers.length > 0);

  state.combatUnits.filter(u => u.alive).forEach(unit => {
    unit.attackTimer -= COMBAT_TICK_MS;
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
    const classValue = { Healer: 120, Mage: 105, Ranger: 90, Assassin: 55, Bruiser: 20, Guardian: 0, Boss: 80 };
    return enemies.slice().sort((a, b) => {
      const score = enemy => (classValue[enemy.unitClass] || 0) + (1 - enemy.hp / enemy.maxHp) * 70
        + (enemy.range >= 2 ? 35 : 0) - distance(unit, enemy) * 3;
      return score(b) - score(a);
    })[0];
  }
  if (unit.unitClass === 'Mage') {
    return enemies.slice().sort((a, b) => {
      const score = enemy => enemies.filter(other => distance(other, enemy) <= 1).length * 45
        + (1 - enemy.hp / enemy.maxHp) * 35 - distance(unit, enemy) * 4;
      return score(b) - score(a);
    })[0];
  }
  if (unit.unitClass === 'Ranger') {
    return enemies.slice().sort((a, b) => {
      const score = enemy => (1 - enemy.hp / enemy.maxHp) * 90 + (distance(unit, enemy) <= unit.range ? 45 : 0)
        + (enemy.unitClass === 'Assassin' || enemy.unitClass === 'Mage' ? 20 : 0) - distance(unit, enemy) * 5;
      return score(b) - score(a);
    })[0];
  }
  if (unit.unitClass === 'Guardian') {
    const allies = state.combatUnits.filter(other => other.side === unit.side && other.alive && other.id !== unit.id);
    const protectedAlly = allies.filter(ally => ['Healer', 'Mage', 'Ranger'].includes(ally.unitClass))
      .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0]
      || allies.sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
    if (protectedAlly) {
      return enemies.slice().sort((a, b) => {
        const threat = enemy => distance(enemy, protectedAlly) * 5 + distance(unit, enemy);
        return threat(a) - threat(b);
      })[0];
    }
  }
  return enemies.slice().sort((a, b) => distance(unit, a) - distance(unit, b))[0];
}

function applyOpeningAssassinJumps() {
  const assassins = state.combatUnits.filter(unit => unit.alive && unit.unitClass === 'Assassin');
  assassins.forEach(unit => {
    const target = chooseAssassinJumpTarget(unit);
    const landing = target ? findAssassinJumpCell(unit, target) : null;
    if (!landing) return;
    unit.x = landing.x;
    unit.y = landing.y;
    unit.openingJumpUsed = true;
    log(`${unit.name} slips into the enemy backline as the battle begins.`, unit.side === 'player' ? 'good' : 'bad');
  });
}

function chooseAssassinJumpTarget(unit) {
  const enemies = state.combatUnits.filter(other => other.side !== unit.side && other.alive);
  if (!enemies.length) return null;
  const backlineRow = unit.side === 'player' ? 0 : 5;
  const backline = enemies.filter(enemy => enemy.y === backlineRow);
  const rangedBackline = backline.filter(enemy => enemy.range >= 2);
  const preferred = rangedBackline.length ? rangedBackline : (backline.length ? backline : enemies.filter(enemy => enemy.range >= 2));
  const pool = preferred.length ? preferred : enemies;
  return pool.slice().sort((a, b) => {
    const hpDelta = (a.hp / a.maxHp) - (b.hp / b.maxHp);
    if (Math.abs(hpDelta) > 0.01) return hpDelta;
    return distance(unit, a) - distance(unit, b);
  })[0];
}

function findAssassinJumpCell(unit, target) {
  const preferredRows = unit.side === 'player' ? [1, 0, 2] : [4, 5, 3];
  const preferredCols = [target.x, target.x - 1, target.x + 1, target.x - 2, target.x + 2, 3, 4, 2, 5, 1, 6, 0, 7];
  const candidates = [];

  preferredRows.forEach((y, rowIndex) => {
    preferredCols.forEach((x, colIndex) => {
      if (x < 0 || x >= 8 || y < 0 || y >= 6) return;
      candidates.push({ x, y, priority: rowIndex * 10 + colIndex });
    });
  });

  for (let y = 0; y < 6; y += 1) {
    for (let x = 0; x < 8; x += 1) {
      candidates.push({ x, y, priority: 100 + distance({ x, y }, target) });
    }
  }

  return candidates
    .filter((cell, index, list) => list.findIndex(other => other.x === cell.x && other.y === cell.y) === index)
    .filter(cell => !occupied(cell.x, cell.y, unit.id))
    .sort((a, b) => {
      const targetDelta = distance(a, target) - distance(b, target);
      if (targetDelta !== 0) return targetDelta;
      return a.priority - b.priority;
    })[0] || null;
}

function distance(a, b) {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
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
  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [1, -1], [-1, 1], [-1, -1]
  ];
  return dirs
    .map(([ox, oy]) => ({ x: x + ox, y: y + oy }))
    .filter(p => p.x >= 0 && p.x < 8 && p.y >= 0 && p.y < 6)
    .sort((a, b) => target ? distance(a, target) - distance(b, target) : 0);
}

function occupied(x, y, ignoreUnitId = null) {
  return state.combatUnits.some(u => u.alive && u.id !== ignoreUnitId && u.x === x && u.y === y);
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

function chooseHealTarget(caster) {
  const healThreshold = 1 - HEALER_MIN_MISSING_HP_PCT;
  return state.combatUnits
    .filter(u => u.side === caster.side && u.alive && (u.hp / u.maxHp) <= healThreshold)
    .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0] || null;
}

function abilityEnemies(caster) { return state.combatUnits.filter(unit => unit.side !== caster.side && unit.alive); }
function abilityAllies(caster) { return state.combatUnits.filter(unit => unit.side === caster.side && unit.alive); }
function lowestHealthUnits(units, count) {
  return units.slice().sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp)).slice(0, count);
}
function playCastEffect(caster, target, effectType = caster.ability) {
  if (window.playAbilityEffect) window.playAbilityEffect(caster.id, caster.abilityName, target?.id || caster.id, effectType);
}
function shieldUnit(source, target, amount, label = source.name) {
  const shieldGain = Math.max(1, Math.round(amount * source.shieldMult));
  target.shield += shieldGain;
  recordShielding(source, shieldGain);
  if (window.playShieldPopup) window.playShieldPopup(target.id, `+${shieldGain}`);
  else popDamage(target, `+${shieldGain}`);
  log(`${label} grants ${target.name} ${shieldGain} shield.`, 'shield');
}

function applyPantheonAbilityRider(caster, target) {
  if (caster.pantheon === 'Hellenic') caster.mana = Math.min(caster.energyMax || 100, (caster.mana || 0) + 8);
  else if (caster.pantheon === 'Norse' && target?.alive) applyDamage(target, caster.damage * 0.28 * caster.abilityDamageMult, { attacker: caster, canDodge: false });
  else if (caster.pantheon === 'Egyptian') shieldUnit(caster, caster, caster.maxHp * 0.07, 'Egyptian judgment');
  else if (caster.pantheon === 'Celtic' && caster.hp < caster.maxHp) healUnit(caster, caster.maxHp * 0.08 * caster.healMult, 'Celtic wild magic', true, caster);
  else if (caster.pantheon === 'Arthurian') {
    const ally = lowestHealthUnits(abilityAllies(caster), 1)[0] || caster;
    shieldUnit(caster, ally, ally.maxHp * 0.05, 'Arthurian oath');
  }
}

function castDivineAbility(caster, target) {
  if (!caster.ability.startsWith('divine-')) return false;
  playCastEffect(caster, target);
  const kind = caster.ability.slice(7);
  const enemies = abilityEnemies(caster);
  const allies = abilityAllies(caster);
  if (kind === 'guardian') {
    shieldUnit(caster, caster, 60 + caster.star * 16);
    const ally = lowestHealthUnits(allies.filter(unit => unit.id !== caster.id), 1)[0];
    if (ally) shieldUnit(caster, ally, 38 + caster.star * 10);
  } else if (kind === 'ranger') {
    applyDamage(target, caster.damage * 1.05 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
    if (target.alive) applyDamage(target, caster.damage * 1.05 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
  } else if (kind === 'mage') {
    enemies.filter(enemy => distance(enemy, target) <= 1).forEach(enemy => applyDamage(enemy, caster.damage * 1.7 * caster.abilityDamageMult, { attacker: caster, canDodge: false }));
  } else if (kind === 'healer') {
    const wounded = lowestHealthUnits(allies.filter(ally => ally.hp < ally.maxHp), 2);
    if (wounded.length) wounded.forEach(ally => healUnit(ally, (46 + caster.star * 11) * caster.healMult, caster.name, false, caster));
    else applyDamage(target, caster.damage * 1.25 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
  } else if (kind === 'assassin') applyDamage(target, caster.damage * 2.7 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
  else if (kind === 'bruiser') enemies.filter(enemy => distance(enemy, target) <= 1).forEach(enemy => applyDamage(enemy, caster.damage * 1.35 * caster.abilityDamageMult, { attacker: caster, canDodge: true }));
  applyPantheonAbilityRider(caster, target);
  return true;
}

function reviveAlly(caster, ally, hpPct) {
  if (occupied(ally.x, ally.y, ally.id)) {
    const openCell = Array.from({ length: 48 }, (_, index) => ({ x: index % 8, y: Math.floor(index / 8) }))
      .filter(cell => !occupied(cell.x, cell.y, ally.id)).sort((a, b) => distance(a, caster) - distance(b, caster))[0];
    if (openCell) { ally.x = openCell.x; ally.y = openCell.y; }
  }
  ally.alive = true;
  ally.hp = Math.max(1, Math.round(ally.maxHp * hpPct));
  ally.shield = 0;
  ally.statuses = [];
  ally.attackTimer = Math.max(300, ally.speed * 0.5);
  recordHealing(caster, ally.hp);
  popDamage(ally, 'Revive');
  log(`${caster.name} returns ${ally.name} to battle with ${ally.hp} HP.`, 'revive');
}

function castSignatureAbility(caster, target) {
  if (!caster.ability.startsWith('sig-')) return false;
  playCastEffect(caster, target);
  const enemies = abilityEnemies(caster);
  const allies = abilityAllies(caster);
  switch (caster.ability) {
    case 'sig-storm-chain':
      [target, ...enemies.filter(enemy => enemy.id !== target.id).sort((a, b) => distance(a, target) - distance(b, target)).slice(0, 2)]
        .forEach((enemy, index) => applyDamage(enemy, caster.damage * (index ? 1.05 : 1.8) * caster.abilityDamageMult, { attacker: caster, canDodge: false }));
      break;
    case 'sig-queen-aegis':
      [caster, ...lowestHealthUnits(allies.filter(ally => ally.id !== caster.id), 2)].forEach(ally => shieldUnit(caster, ally, 72 + caster.star * 18, 'Queenly Aegis'));
      break;
    case 'sig-seaquake':
    case 'sig-thunder-crash':
    case 'sig-time-rift':
      enemies.filter(enemy => distance(enemy, target) <= 1).forEach(enemy => {
        const mult = caster.ability === 'sig-seaquake' ? 1.55 : caster.ability === 'sig-thunder-crash' ? 1.65 : 1.5;
        applyDamage(enemy, caster.damage * mult * caster.abilityDamageMult, { attacker: caster, canDodge: false });
        enemy.attackTimer += caster.ability === 'sig-time-rift' ? 850 : 680;
      });
      break;
    case 'sig-soul-drain': {
      let drained = 0;
      enemies.filter(enemy => distance(enemy, target) <= 1).forEach(enemy => { drained += applyDamage(enemy, caster.damage * 1.45 * caster.abilityDamageMult, { attacker: caster, canDodge: false }); });
      if (drained > 0) healUnit(caster, drained * 0.42, caster.name, false, caster);
      break;
    }
    case 'sig-rune-doom':
      lowestHealthUnits(enemies, 3).forEach(enemy => { applyDamage(enemy, caster.damage * 1.15 * caster.abilityDamageMult, { attacker: caster, canDodge: false }); enemy.weakened = true; });
      break;
    case 'sig-falcon-dive': {
      const prey = chooseTarget(caster) || target;
      applyDamage(prey, caster.damage * 2.8 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
      shieldUnit(caster, caster, caster.maxHp * 0.16, 'Valkyrie ward');
      break;
    }
    case 'sig-golden-harvest':
      lowestHealthUnits(allies.filter(ally => ally.hp < ally.maxHp), 3).forEach(ally => { healUnit(ally, (42 + caster.star * 10) * caster.healMult, caster.name, false, caster); ally.attackTimer = Math.max(0, ally.attackTimer - 420); });
      break;
    case 'sig-solar-flare':
      enemies.forEach(enemy => applyDamage(enemy, caster.damage * 0.9 * caster.abilityDamageMult, { attacker: caster, canDodge: false }));
      if (target.alive) applyBurn(target, Math.max(6, Math.round(caster.damage * 0.28)), 3, caster.name);
      break;
    case 'sig-osirian-return': {
      const fallen = state.combatUnits.filter(unit => unit.side === caster.side && !unit.alive).sort((a, b) => b.maxHp - a.maxHp)[0];
      if (fallen) reviveAlly(caster, fallen, 0.32);
      else healUnit(lowestHealthUnits(allies, 1)[0] || caster, (82 + caster.star * 18) * caster.healMult, caster.name, false, caster);
      break;
    }
    case 'sig-winged-sanctuary':
      allies.forEach(ally => shieldUnit(caster, ally, ally.maxHp * 0.08, 'Winged Sanctuary'));
      healUnit(lowestHealthUnits(allies, 1)[0] || caster, (68 + caster.star * 14) * caster.healMult, caster.name, false, caster);
      break;
    case 'sig-sky-hunt': {
      const prey = lowestHealthUnits(enemies, 1)[0] || target;
      for (let shot = 0; shot < 3 && prey.alive; shot += 1) applyDamage(prey, caster.damage * 0.82 * (prey.hp / prey.maxHp < 0.35 ? 1.25 : 1) * caster.abilityDamageMult, { attacker: caster, canDodge: shot === 0 });
      break;
    }
    case 'sig-cauldron-feast':
      allies.forEach(ally => healUnit(ally, (30 + caster.star * 8) * caster.healMult, caster.name, true, caster));
      shieldUnit(caster, caster, caster.maxHp * 0.24, 'Cauldron of Plenty');
      break;
    case 'sig-fate-war':
      lowestHealthUnits(enemies, 3).forEach(enemy => { applyDamage(enemy, caster.damage * 1.2 * caster.abilityDamageMult, { attacker: caster, canDodge: false }); if (enemy.alive) applyCorruption(enemy, Math.max(5, Math.round(caster.damage * 0.16)), 2, caster.name); });
      break;
    case 'sig-sacred-flame':
      lowestHealthUnits(allies.filter(ally => ally.hp < ally.maxHp), 2).forEach(ally => healUnit(ally, (54 + caster.star * 12) * caster.healMult, caster.name, false, caster));
      if (target.alive) applyBurn(target, Math.max(7, Math.round(caster.damage * 0.32)), 3, caster.name);
      break;
    case 'sig-many-skilled':
      lowestHealthUnits(enemies, 3).forEach(enemy => applyDamage(enemy, caster.damage * 1.15 * caster.abilityDamageMult, { attacker: caster, canDodge: true }));
      break;
    case 'sig-excalibur-oath':
      applyDamage(target, caster.damage * 1.9 * caster.abilityDamageMult, { attacker: caster, canDodge: false });
      allies.forEach(ally => shieldUnit(caster, ally, ally.maxHp * 0.07, 'Excalibur Oath'));
      break;
    case 'sig-thorned-hex':
      enemies.filter(enemy => distance(enemy, target) <= 1).forEach(enemy => { applyDamage(enemy, caster.damage * 1.35 * caster.abilityDamageMult, { attacker: caster, canDodge: false }); if (enemy.alive) applyCorruption(enemy, Math.max(6, Math.round(caster.damage * 0.2)), 3, caster.name); });
      break;
    case 'sig-lake-renewal': {
      const wounded = lowestHealthUnits(allies, 3);
      healUnit(wounded[0] || caster, (80 + caster.star * 16) * caster.healMult, caster.name, false, caster);
      wounded.forEach(ally => shieldUnit(caster, ally, ally.maxHp * 0.09, 'Renewal of the Lake'));
      break;
    }
    default: return false;
  }
  return true;
}

function castAbility(caster, target) {
  if (!caster.alive || !target?.alive) return;
  log(`${caster.name} uses ${caster.abilityName}.`, 'special');
  popDamage(caster, 'Cast');
  if (caster.side === 'enemy' && unitClassName(caster) === 'Boss' && window.playBossAbilityWarning) {
    window.playBossAbilityWarning(caster.id, caster.abilityName, target.id, caster.ability);
  }
  if (castSignatureAbility(caster, target) || castDivineAbility(caster, target)) {
    // Custom abilities share the normal post-cast energy handling below.
  } else switch (caster.ability) {
    case 'shield': {
      if (window.playAbilityEffect) window.playAbilityEffect(caster.id, caster.abilityName, caster.id, caster.ability);
      const shieldGain = Math.round((56 + caster.star * 14) * caster.abilityDamageMult * caster.shieldMult);
      caster.shield += shieldGain;
      recordShielding(caster, shieldGain);
      if (window.playShieldPopup) window.playShieldPopup(caster.id, `+${shieldGain}`);
      else popDamage(caster, `+${shieldGain}`);
      log(`${caster.name} gains ${shieldGain} shield.`, 'shield');
      break;
    }
    case 'rapid':
      if (window.playAbilityEffect) window.playAbilityEffect(caster.id, caster.abilityName, target.id, caster.ability);
      applyDamage(target, caster.damage * 0.95 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
      if (target.alive) applyDamage(target, caster.damage * 0.95 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
      break;
    case 'aoe': {
      if (window.playAbilityEffect) window.playAbilityEffect(caster.id, caster.abilityName, target.id, caster.ability);
      const enemies = state.combatUnits.filter(u => u.side !== caster.side && u.alive && distance(u, target) <= 1);
      enemies.forEach(u => applyDamage(u, caster.damage * 1.55 * caster.abilityDamageMult, { attacker: caster, canDodge: false }));
      break;
    }
    case 'heal': {
      const healTarget = chooseHealTarget(caster);
      if (healTarget) {
        if (window.playAbilityEffect) window.playAbilityEffect(caster.id, caster.abilityName, healTarget.id, caster.ability);
        healUnit(healTarget, (52 + caster.star * 12) * caster.healMult, caster.name, false, caster);
      } else {
        if (window.playAbilityEffect) window.playAbilityEffect(caster.id, caster.abilityName, target.id, 'healer-strike');
        log(`${caster.name} finds no urgent wounds and turns the blessing into an attack.`, 'damage');
        applyDamage(target, caster.damage * 1.15 * caster.abilityDamageMult, { attacker: caster, canDodge: true, attackType: 'healer strike' });
      }
      break;
    }
    case 'crit':
      if (window.playAbilityEffect) window.playAbilityEffect(caster.id, caster.abilityName, target.id, caster.ability);
      applyDamage(target, caster.damage * 2.45 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
      break;
    case 'cleave': {
      if (window.playAbilityEffect) window.playAbilityEffect(caster.id, caster.abilityName, target.id, caster.ability);
      const enemies = state.combatUnits.filter(u => u.side !== caster.side && u.alive && distance(u, target) <= 1);
      enemies.forEach(u => applyDamage(u, caster.damage * 1.2 * caster.abilityDamageMult, { attacker: caster, canDodge: true }));
      break;
    }
    case 'frenzy':
      if (window.playAbilityEffect) window.playAbilityEffect(caster.id, caster.abilityName, target.id, caster.ability);
      applyDamage(target, caster.damage * 1.7 * caster.abilityDamageMult, { attacker: caster, canDodge: true });
      break;
    default:
      if (window.playAbilityEffect) window.playAbilityEffect(caster.id, caster.abilityName, target.id, caster.ability);
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
  let absorbed = 0;
  if (target.shield > 0) {
    absorbed = Math.min(target.shield, remaining);
    target.shield -= absorbed;
    remaining -= absorbed;
  }

  const hpDamage = Math.max(0, remaining);
  target.hp -= hpDamage;
  if (attacker) recordDamageDealt(attacker, hpDamage);
  recordDamageTaken(target, hpDamage + absorbed);
  const popText = options.isDot ? `🔥${hpDamage}` : (hpDamage > 0 ? hpDamage : 'Shielded');
  popDamage(target, popText);

  if (attacker && !options.silent) {
    const absorbedText = absorbed > 0 ? ` (${absorbed} absorbed)` : '';
    log(`${attacker.name} hits ${target.name} for ${hpDamage}${absorbedText}.`, absorbed > 0 && hpDamage === 0 ? 'shield' : 'damage');
    if (absorbed > 0 && hpDamage > 0) log(`${target.name}'s shield absorbs ${absorbed} damage.`, 'shield');
  } else if (options.isDot && !options.silent) {
    const dotLabel = options.dotType === 'corruption' ? 'corrupts' : 'burns';
    log(`${options.source || options.sourceName || 'Burn'} ${dotLabel} ${target.name} for ${hpDamage}.`, options.dotType === 'corruption' ? 'corruption' : 'burn');
  }

  if (target.hp <= 0) {
    handleDeath(target);
    if (attacker?.alive && !target.alive) recordKill(attacker);
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
    target.mana = Math.min(target.energyMax || 100, (target.mana || 0) + 35);
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

function healUnit(target, amount, sourceName, silent = false, sourceUnit = null) {
  const heal = Math.max(1, Math.round(amount));
  const before = target.hp;
  target.hp = Math.min(target.maxHp, target.hp + heal);
  const actual = target.hp - before;
  const overheal = Math.max(0, heal - actual);
  if (actual > 0) {
    if (sourceUnit) recordHealing(sourceUnit, actual);
    popDamage(target, `+${actual}`);
    if (!silent) log(`${sourceName} heals ${target.name} for ${actual}.`, 'heal');
    if (target.healShieldOnHealed > 0) {
      const shieldGain = Math.max(1, Math.round(actual * target.healShieldOnHealed));
      target.shield += shieldGain;
      if (sourceUnit) recordShielding(sourceUnit, shieldGain);
      log(`${target.name} gains ${shieldGain} shield from sacred healing.`, 'shield');
    }
  }
  if (overheal > 0 && target.overhealShieldMult > 0) {
    const shieldGain = Math.max(1, Math.round(overheal * target.overhealShieldMult));
    target.shield += shieldGain;
    if (sourceUnit) recordShielding(sourceUnit, shieldGain);
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
  if (!state.settings.damageNumbers) return;
  if (window.RIFTBOUND_PHASER_READY) {
    const text = String(amount);
    if (text.startsWith('+')) {
      if (window.playHealPopup) window.playHealPopup(target.id, amount);
    } else if (text === 'Shielded' || text === 'Resist' || text === 'Echo') {
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

function finalizeCombatRecap(playerWon, options = {}) {
  if (!state.currentBattleStats) return;
  state.combatUnits.forEach(unit => {
    const entry = ensureCombatStatUnit(unit);
    if (entry) entry.survived = unit.alive !== false;
  });
  state.latestCombatRecap = buildCombatRecap(playerWon, options);
  state.currentBattleStats = null;
}

function combatStatEntries(side = 'player') {
  const stats = state.currentBattleStats;
  if (!stats) return [];
  return Object.values(side === 'enemy' ? stats.enemy : stats.player);
}

function topStat(entries, field) {
  return [...entries].sort((a, b) => (b[field] || 0) - (a[field] || 0))[0] || null;
}

function mvpEntry(entries) {
  return [...entries].sort((a, b) => mvpScore(b) - mvpScore(a))[0] || null;
}

function mvpScore(entry) {
  return (entry.damageDealt || 0)
    + (entry.kills || 0) * 180
    + (entry.healingDone || 0) * 0.7
    + (entry.shieldingDone || 0) * 0.5
    + (entry.survived ? 80 : 0);
}

function statLabel(entry, field, suffix = '') {
  if (!entry || !entry[field]) return 'None recorded';
  const stars = entry.star > 1 ? ` ${starLabel(entry.star)}` : '';
  return `${entry.name}${stars} - ${Math.round(entry[field]).toLocaleString()}${suffix}`;
}

function recapLesson(playerWon, recap, playerEntries, enemyEntries) {
  if (playerWon && recap.trickster) return 'You beat your own echo; your current board has outgrown that old formation.';
  if (playerWon) return 'Your strongest contributors carried the round. Keep building around the units that showed up here.';
  const enemyMvp = mvpEntry(enemyEntries);
  if (enemyMvp?.unitClass === 'Assassin') return 'Your backline was pressured early. Consider safer positioning or sturdier guards.';
  if (enemyMvp?.unitClass === 'Boss') return 'Bosses punish slow fights. More damage, sustain, or stronger carries may help.';
  const playerHealing = topStat(playerEntries, 'healingDone');
  if (!playerHealing?.healingDone) return 'Very little healing was recorded. A healer or more sustain may stabilize the next attempt.';
  return 'The enemy outlasted your board. Check whether your damage dealers stayed protected long enough.';
}

function buildCombatRecap(playerWon, options = {}) {
  const stats = state.currentBattleStats;
  const playerEntries = combatStatEntries('player');
  const enemyEntries = combatStatEntries('enemy');
  const playerMvp = mvpEntry(playerEntries);
  const enemyMvp = mvpEntry(enemyEntries);
  const topDamage = topStat(playerEntries, 'damageDealt');
  const topTank = topStat(playerEntries, 'damageTaken');
  const topHealing = topStat(playerEntries, 'healingDone');
  const topShielding = topStat(playerEntries, 'shieldingDone');
  const topKills = topStat(playerEntries, 'kills');
  const recap = {
    result: playerWon ? 'Victory' : 'Defeat',
    round: stats.round,
    waveName: stats.waveName,
    trickster: stats.trickster,
    tricksterSnapshotRound: stats.tricksterSnapshotRound,
    topDamage: statLabel(topDamage, 'damageDealt'),
    topTank: statLabel(topTank, 'damageTaken', ' taken'),
    topHealing: statLabel(topHealing, 'healingDone', ' healed'),
    topShielding: statLabel(topShielding, 'shieldingDone', ' shielded'),
    mostKills: topKills?.kills ? `${topKills.name} - ${topKills.kills}` : 'None recorded',
    mvp: playerMvp ? playerMvp.name : 'None recorded',
    enemyMvp: enemyMvp ? `${enemyMvp.name} - ${Math.round(mvpScore(enemyMvp)).toLocaleString()} score` : 'None recorded',
    goldEarned: options.goldAward?.total || 0,
    hpLost: options.hpLost || 0
  };
  recap.lesson = recapLesson(playerWon, recap, playerEntries, enemyEntries);
  return recap;
}

function renderCombatRecap() {
  if (!combatRecapEl) return;
  const recap = state.latestCombatRecap;
  if (!recap) {
    combatRecapEl.classList.add('hidden');
    combatRecapEl.innerHTML = '';
    return;
  }
  const won = recap.result === 'Victory';
  combatRecapEl.className = `combat-recap wave-recap ${won ? 'victory' : 'defeat'} ${recap.trickster ? 'trickster' : ''}`;
  combatRecapEl.innerHTML = `
    <div class="recap-header">
      <div>
        <p class="eyebrow">Combat Recap</p>
        <h3>${recap.result}: Round ${recap.round} - ${recap.waveName}</h3>
      </div>
      <button class="ghost-btn small" type="button" data-dismiss-recap>Dismiss</button>
    </div>
    <div class="recap-grid">
      <div><span>Top Damage</span><strong>${recap.topDamage}</strong></div>
      <div><span>Top Tank</span><strong>${recap.topTank}</strong></div>
      <div><span>Top Healing</span><strong>${recap.topHealing}</strong></div>
      <div><span>Top Shielding</span><strong>${recap.topShielding}</strong></div>
      <div><span>Most Kills</span><strong>${recap.mostKills}</strong></div>
      <div><span>${won ? 'MVP' : 'Enemy MVP'}</span><strong>${won ? recap.mvp : recap.enemyMvp}</strong></div>
    </div>
    <div class="recap-footer">
      <span>Rewards: +${recap.goldEarned} gold${recap.trickster && won ? ' | Trickster Mirror cleared' : ''}</span>
      ${!won && recap.hpLost ? `<span>HP Lost: ${recap.hpLost}</span>` : ''}
      <p>${recap.lesson}</p>
    </div>
  `;
  combatRecapEl.querySelector('[data-dismiss-recap]')?.addEventListener('click', () => {
    state.latestCombatRecap = null;
    renderCombatRecap();
  });
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
  resetBattleClock();
  showFeedback('');
  const livingEnemies = state.combatUnits.filter(u => u.side === 'enemy' && u.alive);
  if (playerWon) {
    const goldAward = awardGoldWithInterest(roundGoldRewardFor(state.round), 'Round gold', 'victory');
    log(`Victory! ${WAVE_NAMES[state.round]} cleared. Earned ${goldAward.total} gold total.`, 'victory');
    finalizeCombatRecap(true, { goldAward });

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
    const uncappedDamage = state.round === state.secretRound || bossAlive
      ? state.playerHp
      : livingEnemies.length * damagePerEnemy;
    const damage = state.round === TRICKSTER_ROUNDS[0] && !bossAlive
      ? Math.min(FIRST_TRICKSTER_DEFEAT_DAMAGE_CAP, uncappedDamage)
      : uncappedDamage;
    state.playerHp -= damage;
    const damageText = state.round === state.secretRound || bossAlive
      ? 'Boss defeat is instant loss.'
      : state.round === TRICKSTER_ROUNDS[0] && uncappedDamage > damage
        ? `${livingEnemies.length} echoes survived; first-mirror damage capped at ${FIRST_TRICKSTER_DEFEAT_DAMAGE_CAP} HP.`
        : `${livingEnemies.length} enemies survived x ${damagePerEnemy} HP each.`;
    log(`Defeat on ${WAVE_NAMES[state.round]}. You lost ${damage} HP. ${damageText}`, 'defeat');
    if (state.playerHp <= 0) {
      finalizeCombatRecap(false, { hpLost: damage });
      showModal('Run Lost', state.round === state.secretRound || bossAlive
        ? 'A boss survived the battle. Boss defeats are instant loss. Reset the run and try a different squad.'
        : `Your team was defeated. ${damageText} Reset the run and try a different squad.`);
    } else {
      const goldAward = awardGoldWithInterest(roundGoldRewardFor(state.round), 'Round gold');
      finalizeCombatRecap(false, { goldAward, hpLost: damage });
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

function setLogFilter(filter, options = {}) {
  state.logFilter = filter;
  if (!options.skipSettingsSync) {
    state.settings.combatLogDetail = filter;
    saveSettings();
    renderSettingsControls();
  }
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
  resetBattleClock();
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
  state.inspectedUnitId = null;
  state.inspectedUnitPortrait = '';
  state.draggedUnitId = null;
  state.inspectedSynergyKey = '';
  state.selectedSynergyKey = '';
  state.latestCombatRecap = null;
  state.currentBattleStats = null;
  if (window.endPhaserBoardDrag) window.endPhaserBoardDrag();
  clearBoardUnitHighlights();
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
  const counts = getSynergyCounts();
  const activeKeys = new Set(SYNERGIES
    .filter(synergy => (counts[synergy.key] || 0) >= synergy.threshold)
    .map(synergy => synergy.key));
  const matching = available.filter(relic => (relic.synergyKeys || []).some(key => activeKeys.has(key)));

  if (matching.length) {
    const relic = matching[Math.floor(Math.random() * matching.length)];
    const matchedSynergies = (relic.synergyKeys || []).filter(key => activeKeys.has(key));
    picks.push({
      ...relic,
      matchedSynergy: matchedSynergies[Math.floor(Math.random() * matchedSynergies.length)]
    });
    available.splice(available.findIndex(item => item.id === relic.id), 1);
  }

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
      detail: `${relic.matchedSynergy ? `Synergy Match: ${relic.matchedSynergy}. ` : ''}${relic.text}`,
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
if (archiveBtn) archiveBtn.addEventListener('click', openCodexWindow);
if (closeCodexBtn) closeCodexBtn.addEventListener('click', closeCodexWindow);
if (settingsBtn) settingsBtn.addEventListener('click', openSettingsWindow);
if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettingsWindow);
if (closeUnitInspectorBtn) closeUnitInspectorBtn.addEventListener('click', closeUnitInspector);
if (codexWindowEl) {
  codexWindowEl.addEventListener('click', (event) => {
    if (event.target === codexWindowEl) closeCodexWindow();
  });
}
if (settingsWindowEl) {
  settingsWindowEl.addEventListener('click', (event) => {
    if (event.target === settingsWindowEl) closeSettingsWindow();
  });
}
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && codexWindowEl && !codexWindowEl.classList.contains('hidden')) closeCodexWindow();
  if (event.key === 'Escape' && settingsWindowEl && !settingsWindowEl.classList.contains('hidden')) closeSettingsWindow();
  if (event.key === 'Escape' && unitInspectorEl && !unitInspectorEl.classList.contains('hidden')) closeUnitInspector();
});
$('resetBtn').addEventListener('click', init);
$('rerollBtn').addEventListener('click', () => rollShop(false));
if (shopLockBtn) shopLockBtn.addEventListener('click', toggleShopLock);
$('clearLogBtn').addEventListener('click', () => { logEl.innerHTML = ''; log('Combat log cleared.', 'special'); });
if (logFilterBtn) logFilterBtn.addEventListener('click', toggleLogFilter);
if (settingCombatLogDetailEl) settingCombatLogDetailEl.addEventListener('change', () => updateSetting('combatLogDetail', settingCombatLogDetailEl.value));
if (settingConfirmUpgradedSalesEl) settingConfirmUpgradedSalesEl.addEventListener('change', () => updateSetting('confirmUpgradedSales', settingConfirmUpgradedSalesEl.checked));
if (settingShowTooltipsEl) settingShowTooltipsEl.addEventListener('change', () => updateSetting('showTooltips', settingShowTooltipsEl.checked));
if (settingShowUnitNamesEl) settingShowUnitNamesEl.addEventListener('change', () => updateSetting('showUnitNames', settingShowUnitNamesEl.checked));
if (settingShowClassLabelsEl) settingShowClassLabelsEl.addEventListener('change', () => updateSetting('showClassLabels', settingShowClassLabelsEl.checked));
if (settingUiScaleEl) settingUiScaleEl.addEventListener('change', () => updateSetting('uiScale', settingUiScaleEl.value));
if (settingDamageNumbersEl) settingDamageNumbersEl.addEventListener('change', () => updateSetting('damageNumbers', settingDamageNumbersEl.checked));
if (settingGridOverlayEl) settingGridOverlayEl.addEventListener('change', () => updateSetting('gridOverlay', settingGridOverlayEl.checked));
if (settingReducedMotionEl) settingReducedMotionEl.addEventListener('change', () => updateSetting('reducedMotion', settingReducedMotionEl.checked));
if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', syncFullscreenControl);
if (resetSettingsBtn) resetSettingsBtn.addEventListener('click', resetSettings);
if (resetSaveBtn) resetSaveBtn.addEventListener('click', resetSaveData);

state.settings = loadSettings();

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
