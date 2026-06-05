# What Am I Pointing At?

A lightweight HUD utility for Mindustry that displays information about enemy units and buildings you're currently pointing at.

## Features

- Displays information for the enemy object under your cursor.
- Shows unit, block, and player names.
- Displays health bars and other status bars.
- Shows armor values when applicable.
- Supports units carrying payloads.
- Clean HUD integration.
- Works on both desktop and mobile.

## Usage

### Desktop

Move your cursor over enemy units or buildings to view information instantly.

### Mobile

Tap near enemy units or buildings to select it and display its information panel.

## Displayed Information

Depending on the target, the panel may show:

- Name
- Team
- Health
- Armor
- Ability bars
- Payload capacity
- Player name (for player-controlled units)

## Installation

### From GitHub

1. Download the latest release or clone this repository.
2. Place the mod folder inside your Mindustry "mods" directory.
3. Launch Mindustry and enable the mod.

### Mods Directory

#### Windows

```
%AppData%\Mindustry\mods
```

#### Linux

```
~/.local/share/Mindustry/mods
```

#### Android

```
Android/data/io.anuke.mindustry/files/mods
```

## Compatibility

- Client-side only.
- Does not affect gameplay or save files.

## Performance

The mod performs a small target lookup during gameplay and has negligible performance impact on normal maps.

## Acknowledgement

Credits for deltanedas for making WAISA.
