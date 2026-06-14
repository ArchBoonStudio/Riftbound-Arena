# Riftbound Arena - Auto Battle Prototype v0.9 Phaser Migration

A lightweight browser auto battler built with plain HTML, CSS, JavaScript, and a local Phaser browser file for the battlefield visuals.

## How to Run

Open `index.html` directly in a modern browser. There is no install step, server, package manager, build tool, backend, database, or multiplayer service.

Phaser is loaded locally from `lib/phaser.min.js`, so the game does not need the network at runtime.

## Phaser Migration Status

This is the first safe Phaser migration pass. The existing game loop and systems are preserved.

Phaser currently controls:

- The 8 x 6 battlefield canvas.
- Player and enemy row coloring.
- Player and enemy unit placeholders.
- Rarity-colored unit frames.
- Phaser-rendered HP bars and energy bars.
- Defeated unit visuals.
- Simple attack, ability, damage, heal, shield, and boss flash effects.

HTML still controls:

- Unit shop.
- Bench.
- Starter draft modal.
- Rewards and relic choices.
- Synergy panel.
- Champion codex.
- Combat log.
- Gold, HP, round, save, load, and reset controls.

The existing `game.js` remains the gameplay source of truth. Phaser reads from that state and does not own separate combat state.

## Core Loop

Choose one of three random Common champions to start a new run, buy more mythic champions, place them from the bench onto the lower deployment rows, inspect the next enemy wave, start the battle, claim boss-round items, and build toward the secret round 21 mega boss fight.

## Controls

- Click **Buy** on shop cards to recruit champions.
- Choose one of three Common starter champions when a new run begins.
- Click **Reroll 2g** to refresh the shop during planning.
- Click **Lock Shop** to freeze the current offers through battles and round changes.
- The shop panel shows your current gold next to the lock and reroll controls.
- Drag a bench unit onto a blue Phaser deployment cell to place it.
- Drops on enemy rows, outside the board, or full-cap empty cells are rejected without losing the unit.
- Drag deployed player units between blue Phaser deployment cells during planning to move or swap them.
- Drag deployed player units from the Phaser battlefield onto a bench slot during planning to return them to the bench.
- Drag player units onto **Sell Unit** during planning to sell them for gold.
- Double-click your units during planning to sell them.
- Click **Start Battle** to begin auto combat.
- Click **Save** to store the current run in localStorage.
- Click **Load** to restore the saved run.
- Use **Show All / Important Only** to filter the combat log.
- Use the Champion Codex filters to browse the roster by pantheon.

## Champion System

The game uses a mythic champion pool built around pantheons, source types, classes, and rarities. The normal shop pool has been reduced so gods and major Arthurian powers are the main collectible champions.

Champion fields include name, pantheon, source type, class, rarity, cost, HP, damage, attack speed, range, armor, block chance, energy maximum, ability, and tags.

The shop only pulls `Playable` units. Major Empyrean gods and Arthurian powers remain playable, while most older heroic, sacred, spirit, fae, and bloodline filler units are now `Locked` for future unlocks or production planning. Wyrdbound monsters and horrors are mostly `Enemy Only` or `Boss Only`.

Each pantheon also has two Common `Worshiper` units. These weaker early units help players start pantheon synergies before finding gods, but they are not meant to outshine higher-rarity champions.

## Pantheons

- Hellenic
- Norse
- Egyptian
- Celtic
- Arthurian

Hellenic is the merged Greek/Roman classification, but Greek names are used.

## Source Types

- Empyrean
- Heroic
- Sacred
- Spirit
- Fae
- Worshiper
- Wyrdbound

## Rarities and Costs

- Common: 1 gold
- Uncommon: 2 gold
- Rare: 3 gold
- Epic: 4 gold
- Legendary: 5 gold
- Mythic: 6 gold

The shop uses round-based rarity odds. Round 1 can only roll Common and Uncommon champions. Rare, Epic, Legendary, and Mythic champions unlock gradually as the run advances, with Mythic rolls only appearing near the endgame and secret boss round.

With the reduced shop pool, Common rolls are mostly Worshipers. This keeps early rounds readable while preserving gods as the primary long-term chase units.

Current shop rarity pacing:

- Round 1: Common / Uncommon only.
- Rounds 2-3: Rare champions begin appearing.
- Rounds 4-5: Epic champions begin appearing.
- Rounds 6-8: Legendary champions begin appearing at low odds.
- Rounds 9-11: Mythic champions can appear, but remain rare.

## Starting Draft

New runs no longer start with two preset units. Instead, the opening modal offers three random Common champions. Pick one to add that champion to your bench and begin drafting from there.

## Shop and Economy

The shop panel includes a local gold display, a shop lock button, and the reroll button. Locking the shop preserves the current offers when battles start, battles end, and rounds advance. Reroll is disabled while the shop is locked; unlock the shop before rerolling or allowing future round refreshes to replace the offers.

The **Sell Unit** zone accepts player units during planning. Selling grants gold equal to unit cost times star investment: 1-star units sell for base cost, 2-star units sell for 3x cost, and 3-star units sell for 9x cost. Selling upgraded units asks for confirmation.

Round gold starts at 4 gold. It gains +1 when each higher rarity tier becomes available in the shop: Rare, Epic, Legendary, and Mythic. Interest is then added on top of the round reward based on current gold, up to +5.

## Enemy Preview

The **Next Wave** panel shows the current round's enemy lineup before combat starts. Boss rounds are called out at rounds 5, 10, 15, 20, and secret round 21. Trickster rounds preview the saved player formation they will mirror when a prior board snapshot is available.

## Relics and Rewards

After normal victories, the game awards gold. Boss victories at rounds 5, 10, 15, and 20 offer Sacred Arsenal item choices. Choices can include:

- Bonus gold
- Run HP healing
- New relics

Relics are persistent for the run and apply battle bonuses such as stronger shields, better healing, ability power, dodge, corruption, haste, or extra bruiser durability.

## Trickster Mirrors

The game saves lightweight snapshots of your deployed battlefield when battles begin. Snapshots store unit type, star level, and board position only, not temporary combat stats. Trickster rounds at 4, 8, 13, and 18 use the most recent previous snapshot as an enemy mirror formation, capped to the available enemy slots. If no previous snapshot exists, the round falls back to its normal enemy layout.

## Champion Codex

The codex lists playable champions, supports pantheon filters, and shows each selected champion's rarity, class, source type, cost, stats, and ability. Enemy-only, boss-only, and locked roster entries remain in `UNIT_PRODUCTION_LIST.md` for wave, boss, sprite, and future unlock planning.

For production planning, see `UNIT_PRODUCTION_LIST.md` for every playable, enemy-only, boss-only, and locked unit with description and sprite work columns.

## Sprite Folders

Future champion, enemy, boss, effect, and UI art should go in:

- `assets/champions/`
- `assets/enemies/`
- `assets/bosses/`
- `assets/effects/`
- `assets/ui/`

Planned champion sprite naming can follow:

- `assets/champions/001_zeus.png`
- `assets/champions/002_hera.png`
- `assets/champions/003_poseidon.png`
- `assets/champions/004_hades.png`

Sprites are not required yet. The Phaser board uses dark fantasy placeholder tokens and rarity-colored frames when art is missing.

## Code Layout

- `game.js`: current source of truth for data, state, UI, and combat during the safe migration.
- `src/phaser-game.js`: Phaser battlefield visuals and effects.
- `src/data.js`: reserved for champion, wave, synergy, and rarity data extraction.
- `src/state.js`: reserved for run state extraction.
- `src/combat.js`: reserved for battle simulation extraction.
- `src/ui.js`: reserved for HTML UI rendering and event binding extraction.

## Active Unit Cap

You can deploy up to 10 active player units. Bench units do not count toward this cap. Attempting to deploy an 11th active unit is blocked with a warning.

## Star Upgrades

Three copies of the same 1-star champion combine into a 2-star champion. Three copies of the same 2-star champion combine into a 3-star champion.

## Synergies

Synergies count deployed unique champion types only. Bench units, enemies, and dead enemy units do not activate player synergies. Duplicate deployed copies of the same champion still fight normally, but they only count once for pantheon, class, and source thresholds. The panel reveals synergies from the current deployed board, highlights active bonuses, and shows the next reachable threshold.

There are three synergy layers:

- Pantheon synergies are the main faction identity.
- Class synergies reward combat-role composition.
- Source type synergies are secondary and intentionally weaker.

Pantheon synergies:

- Hellenic 2/4/6: ability power, faster energy tempo, then energy after casting.
- Norse 2/4/6: attack damage, armor, then attack speed while wounded.
- Egyptian 2/4/6: stronger healing and shielding, battle-start shields, then first Egyptian revive.
- Celtic 2/4/6: dodge, periodic healing, then energy when dodging.
- Arthurian 2/4/6: armor, oath shields, then bonus damage while shielded.

Class synergies:

- Guardian 2/4/6: armor and modest Guardian block chance, team starting shield, then bonus Guardian max HP.
- Ranger 2/4/6: attack speed, more attack speed, then chance for an extra shot.
- Mage 2/4/6: ability damage, more ability damage, then bonus energy generation.
- Healer 2/4/6: healing power, overheal shielding, then periodic healing for the lowest-health ally. Healer abilities heal allies only when someone is missing at least 10% HP; otherwise they attack.
- Assassin 2/4/6: critical chance, critical damage, then energy on kill.
- Bruiser 2/4/6: max HP, more max HP, then damage from missing HP.

Source type synergies:

- 2 Worshiper: Worshipers gain max HP.
- 4 Worshiper: Worshipers also grant all allies a small starting shield.
- 3 Empyrean: Empyrean units gain a small ability power bonus.
- 6 Empyrean: Empyrean units gain a larger but still secondary ability power bonus.
- 2 Wyrdbound: Wyrdbound units apply corruption damage over time.
- 4 Wyrdbound: First Wyrdbound death each battle revives as a corrupted echo.
- 2 Heroic: Heroic units gain critical chance.
- 4 Heroic: Heroic units deal bonus damage against bosses.
- 2 Sacred: Sacred units gain healing and shielding power.
- 4 Sacred: Allies gain a small shield when healed.
- 2 Spirit: Spirit units gain energy generation.
- 4 Spirit: Spirit units grant allies small energy over time.
- 2 Fae: Fae units gain dodge chance.
- 4 Fae: Fae units gain energy when they dodge.

Common Worshipers are early bridge units. They help activate pantheon bonuses before gods appear, but their source bonuses stay modest so divine champions remain the main chase units.

## Combat Log

The combat log is scrollable and capped for performance. It marks events with round and tick information. Damage, healing, shields, dodge, burn, corruption, revive, death, victory, defeat, boss events, and warnings are styled separately.

## Combat Movement

During battle, units path across the 8 x 6 battlefield toward a reachable attack position for their target. Living units block movement, so attackers route around occupied cells when another path is available instead of only stepping directly toward the target.

## Combat Timer

Each battle has a 60-second round timer. If both teams still have living units when the timer expires, overtime begins for 10 seconds. During overtime, combat runs at x4 speed and escalating rift damage hits every living unit once per second. If both sides still survive after overtime, the side with more living units wins. If living unit count is tied, remaining HP breaks the tie.

## Round Structure

- Rounds 1-20 are the main campaign.
- Rounds 4, 8, 13, and 18 are Trickster Mirror rounds that fight echoes of an earlier player board.
- Rounds 5, 10, and 15 are mini-boss item rounds.
- Round 20 is the main boss round and also grants an item choice.
- Clearing round 20 unlocks secret round 21.
- Secret round 21 is the mega-boss council led by The Kingdom That Never Healed.
- Beating secret round 21 wins the prototype run.

## Smoke Testing Checklist

- `index.html` opens directly in the browser.
- Local Phaser file loads from `lib/phaser.min.js`.
- Phaser canvas appears in the battlefield area.
- Phaser board renders an 8 x 6 grid.
- Shop loads mythic champions.
- Shop only rolls `Playable` units.
- Common Worshipers appear in the shop and starter draft.
- Enemy-only, boss-only, and locked units do not appear in the shop.
- New runs offer three random Common starter champions.
- Choosing a starter adds exactly one unit to the bench.
- Units can be bought.
- Shop gold display updates after buying, selling, rerolling, and rewards.
- Shop lock freezes current offers through battle and round advancement.
- Locked shop disables reroll until unlocked.
- Player units can be dragged to the Sell Unit zone during planning.
- Sold units are removed and grant gold using the 1x/3x/9x star formula.
- Units can be placed by dragging from the bench to the Phaser board.
- Bench still works.
- 10 active unit cap still works.
- Star upgrades still work.
- Pantheon synergies work.
- Source type synergies work.
- Unowned/unrelated synergies stay hidden.
- Enemy preview updates by round.
- Trickster rounds preview and spawn saved player-board echoes.
- Reward choices appear after victories.
- Relics can be claimed and displayed.
- Champion codex filters and details render.
- Save and load work through localStorage.
- Battles still run.
- Battle timer counts down from 60 seconds.
- Overtime starts if both sides survive the timer.
- Overtime runs faster, applies escalating damage, and resolves by living unit count.
- Player and enemy units render on the Phaser board.
- HP and energy bars update on the Phaser board.
- Dead units show a defeated state.
- Combat log still works.
- Rounds progress from 1 through 20.
- Mini-boss rounds 5, 10, and 15 grant item choices.
- Round 20 boss unlocks secret round 21.
- Secret round 21 contains the mega boss and the rest of the boss lineup.
- Game can be won after the secret boss.

## Next Version Ideas

- Move champion and wave data from `game.js` into `src/data.js`.
- Move run state helpers into `src/state.js`.
- Move combat simulation into `src/combat.js`.
- Move HTML panel rendering into `src/ui.js`.
- Add real champion sprites into `assets/champions/`.
- Add champion portraits or card art.
- Add clearer projectile and impact animations.
- Add item drops per champion slot.
- Add a route/map layer between rounds.
- Add difficulty settings.
- Add audio toggles and battle sounds.
