# CharacterVault
Toolset for keeping track of your D&amp;D characters.

Requires Node.js version 10.0.0 or higher (to run the included server for character storage)

# Features
- Guided levelups
- Comes with all core packages (still adding subclasses - see below)
- Skill bonuses, saving throws, save DCs, and weapon/spell attack bonuses automatically calculated from ability scores
- Passive abilities can update your stats (eg the Alert feat adds +5 to initiative automatically)
- Track ability uses per rest. Short/Long rest button refresh abilities appropriately
- Basically everything has a tooltip
- Complete spell reference / level preview

# Other tools
- DM Helper contains useful things that a DM screen might contain, including DMG tables, a loot generator, a combat tracker that can load characters from the character sheet, and more.
- A music player to make your environments more appealing

###Implemented Packages

Barbarian | Supported
------------- | -------------
Core | Yes
Ancestral Guardian | Yes
Battlerager | No
Berserker | Yes
Storm Herald | Yes
Totem Warrior | Yes
Zealot | Yes
Whirlwind (homebrew) | Yes

Bard | Supported
------------- | -------------
Core | Yes
Glamour | Yes
Lore | Yes
Swords | No
Valor | No
Whispers | No
Impressionism (homebrew) | Yes

Cleric | Supported
------------- | -------------
Core | Yes
Arcana | No
Forge | No
Grave | Yes
Knowledge | No
Life | Yes
Light | No
Nature | No
Order | No
Tempest | Yes
Trickery | No
War | Yes

Druid | Supported
------------- | -------------
Core | Yes
Dreams | No
Land | Yes
Moon | Yes
Shepherd | No
Spores | No

Fighter | Supported
------------- | -------------
Core | Yes
Arcane Archer | No
Battle Master | Yes
Cavalier | No
Eldritch Knight | No
Purple Dragon Knight | No
Samurai | Yes

Monk | Supported
------------- | -------------
Core | Yes
Drunken Master | No
Four Elements | No
Kensei | No
Long Death | Yes
Open Hand | No
Shadow | No
Sun Soul | No
Enlightenment (homebrew) | Yes
Ninjutsu (homebrew) | Yes
Cobalt Soul (homebrew) | Yes

Paladin | Supported
------------- | -------------
Core | Yes
Ancients | No
Conquest | No
Crown | No
Devotion | Yes
Redemption | Yes
Vengeance | No

Ranger | Supported
------------- | -------------
Core | Yes
Beast Master | Yes
Gloom Stalker | No
Horizon Walker | No
Hunter | No
Monster Slayer | No

Rogue | Supported
------------- | -------------
Core | Yes
Arcane Trickster | Yes
Assassin | Yes
Inquisitive | No
Mastermind | No
Scout | No
Swashbuckler | Yes

Sorcerer | Supported
------------- | -------------
Core | Yes
Divine Soul | Yes
Draconic | No
Shadow | No
Storm | No
Wild | No

Warlock | Supported
------------- | -------------
Core | Yes
Archfey | No
Celestial | No
Field | Yes
Great Old One | No
Hexblade | Yes
Undying | No

Wizard | Supported
------------- | -------------
Core | Yes
Abjuration | Yes
Bladesinging | No
Conjuration | Yes
Divination | Yes
Enchantment | Yes
Evocation | Yes
Illusion | No
Necromancy | No
Transmutation | Yes
War Magic | No
Sangromancy (homebrew)| Yes

# Music Player
The provided music app (music.html) lets you configure and play environment sets, with music and both looping and non-looping sounds. To use it, you need to create a /resources folder in the root of this project with the following structure:
/resources/Environments
/resources/Music
/resources/SFX/Loops
/resources/SFX/OneShots

The music player can play just music if you want, but you can also create background ambiances by combining loops with periodic one-shot sounds.

# DM Helper
The DM Helper is a DM screen you can use to look up common rules, keep track of basic player stats, and manage combat encounters. Some features of it are unavailable on tablets.

The combat tab is the most powerful part of the DM helper. You can add player characters that have been saved via the CharacterSheet app, as well as monsters, to the initiative tracker. The stat blocks for both players and monsters will appear on the screen, giving you quick access to their stats and abilities. Health and spell slot usage can be tracked on the stat blocks. Clicking on an item in the initiative order moves that item up. Clicking on the top item, or clicking the round arrow, will move the top entry to the bottom of the list, as if that creature finished its turn.

Right-clicking on one of the entries on the initiative tracker brings up a dropdown menu with a list of conditions you can apply. Most of them default to 10 rounds, and will be decremented automatically as the initiative rolls by. You can also change the durations manually by hovering the number with the mouse and hitting + or - on the numpad. These features are not available for tablet views yet.