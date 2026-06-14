# Riftbound Arena - Auto Battle Prototype v0.8 Phaser Migration

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

Choose one of three random Common champions to start a new run, buy more mythic champions, place them from the bench onto the lower deployment rows, inspect the next enemy wave, start the battle, claim a post-round reward, and build toward the secret round 11 boss fight against Chaos.

## Controls

- Click **Buy** on shop cards to recruit champions.
- Choose one of three Common starter champions when a new run begins.
- Click **Reroll 2g** to refresh the shop during planning.
- Drag a bench unit onto a blue Phaser deployment cell to place it.
- Drops on enemy rows, outside the board, or full-cap empty cells are rejected without losing the unit.
- Drag deployed player units between blue Phaser deployment cells during planning to move or swap them.
- Drag deployed player units from the Phaser battlefield onto a bench slot during planning to return them to the bench.
- Double-click your units during planning to sell them.
- Click **Start Battle** to begin auto combat.
- Click **Save** to store the current run in localStorage.
- Click **Load** to restore the saved run.
- Use **Show All / Important Only** to filter the combat log.
- Use the Champion Codex filters to browse the roster by pantheon.

## Champion System

The game uses a mythic champion pool built around pantheons, source types, classes, and rarities. The normal shop pool has been reduced so gods and major Arthurian powers are the main collectible champions.

Champion fields include name, pantheon, source type, class, rarity, cost, HP, damage, attack speed, range, armor, energy maximum, ability, and tags.

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

## Enemy Preview

The **Next Wave** panel shows the current round's enemy lineup before combat starts. Round 11 previews Chaos and the supporting mythic enemy wave.

## Relics and Rewards

After normal victories, the game offers post-round reward choices. Choices can include:

- Bonus gold
- Run HP healing
- New relics

Relics are persistent for the run and apply battle bonuses such as stronger shields, better healing, ability power, dodge, corruption, haste, or extra bruiser durability.

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

The synergy panel only shows synergies connected to champions you currently own on the bench or battlefield. Synergy progress and activation still count deployed player units only, so bench units reveal possible synergies but do not power them.

Pantheon synergies:

- 2 Hellenic: Hellenic units gain ability power.
- 4 Hellenic: Hellenic units also charge abilities faster.
- 2 Norse: Norse units gain attack damage.
- 4 Norse: Norse units also gain armor and attack speed.
- 2 Egyptian: Egyptian units gain healing and shield strength.
- 4 Egyptian: First Egyptian death each battle resists death.
- 2 Celtic: Celtic units gain dodge and haste.
- 4 Celtic: Celtic units also gain wild-magic regeneration.
- 2 Arthurian: Arthurian units gain armor and an oath shield.
- 4 Arthurian: Arthurian units deal bonus damage while shielded.

Source type synergies:

- 2 Empyrean: Empyrean units gain ability power.
- 4 Empyrean: All allies gain a starting shield.
- 2 Heroic: Heroic units gain critical chance.
- 4 Heroic: Heroic units gain bonus damage against bosses.
- 2 Sacred: Sacred units gain healing power.
- 2 Spirit: Spirit units gain energy generation.
- 2 Fae: Fae units gain dodge chance.
- 2 Worshiper: Worshipers gain a small max HP bonus.
- 4 Worshiper: Worshipers grant all allies a small starting shield.
- 2 Wyrdbound: Wyrdbound units apply corruption damage over time.
- 4 Wyrdbound: First Wyrdbound death each battle revives as a corrupted echo.

## Combat Log

The combat log is scrollable and capped for performance. It marks events with round and tick information. Damage, healing, shields, dodge, burn, corruption, revive, death, victory, defeat, boss events, and warnings are styled separately.

## Round Structure

- Rounds 1-10 are normal mythic enemy waves.
- Clearing round 10 unlocks secret round 11.
- Secret round 11 is the Chaos boss battle.
- Beating Chaos wins the prototype run.

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
- Units can be placed by dragging from the bench to the Phaser board.
- Bench still works.
- 10 active unit cap still works.
- Star upgrades still work.
- Pantheon synergies work.
- Source type synergies work.
- Unowned/unrelated synergies stay hidden.
- Enemy preview updates by round.
- Reward choices appear after victories.
- Relics can be claimed and displayed.
- Champion codex filters and details render.
- Save and load work through localStorage.
- Battles still run.
- Player and enemy units render on the Phaser board.
- HP and energy bars update on the Phaser board.
- Dead units show a defeated state.
- Combat log still works.
- Rounds progress from 1 to 10.
- Secret round 11 unlocks after round 10.
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
