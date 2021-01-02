window.abilities.append([
	{
		name:"Rage",
		description:"In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.\nWhile raging, you gain the following benefits if you aren't wearing heavy armor:\n\u2022 You have advantage on Strength checks and Strength saving throws.\n\u2022 When you make a melee weapon attack using Strength, you gain a +${ladder(classLevel($scope.char,'Barbarian'),1,2,9,3,16,4)} bonus to the damage roll. This bonus increases as you level.\n\u2022 You have resistance to bludgeoning, piercing, and slashing damage.\n\u2022 If you are able to cast spells, you can't cast them or concentrate on them while raging.\n\nYour rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven't attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.\n\nOnce you have raged the maximum number of times for your barbarian level, you must finish a long rest before you can rage again. You may rage 2 times at 1st level, 3 at 3rd, 4 at 6th, 5 at 12th, and 6 at 17th.",
		charges:2,
		maxCharges:2,
		maxChargesFunction:function(char){
			return ladder(classLevel(char,'Barbarian'),1,2,3,3,6,4,12,5,17,6);
		},
		onLongRest:function(){
			this.charges=this.maxCharges;
		}
	},{
		name:"Whirlwind",
		description:"When you enter a rage, you may make it a Whirlwind. While whirlwinding, you continuously spin your weapons around you, striking any objects and creatures that may be nearby. You gain the following while spinning, in lieu of your rage bonuses:\n\n\u2022 You can't take any action or bonus action on your turn other than the Attack or Dash actions.\n\u2022 Other creatures can't make opportunity attacks against you.\n\u2022 Melee attacks against you have disadvantage.\n\u2022 Whenever you make a melee attack, you make it against each creature within range. The attack does half damage unless only one creature is within range. \n\u2022 You may end Whirlwind voluntarily at the start of your turn.",
		resourceName:"Rage",
		resourceCost:1
	},{
		name:"Consult the Spirits",
		description:"You gain the ability to consult with your ancestral spirits. When you do so, you cast the Augury or Clairvoyance spell, without using a spell slot or material components. Rather than creating a spherical sensor, this use of clairvoyance invisibly summons one of your ancestral spirits to the chosen location. Wisdom is your spellcasting ability for these spells.\n\nAfter you cast either spell in this way, you can't use this feature again until you finish a short or long rest.",
		onShortRest:function(){
			this.charges=this.maxCharges;
		},
		maxCharges:1,
		charges:1
	},{
		name:"Zealous Presence",
		description:"You learn to channel divine power to inspire zealotry in others. As a bonus action, you unleash a battle cry infused with divine energy. Up to ten other creatures of your choice within 60 feet of you that can hear you gain advantage on attack rolls and saving throws until the start of your next turn.\n\nOnce you use this feature, you can't use it again until you finish a long rest.",
		charges:1,
		maxCharges:1,
		onLongRest:function(){
			this.charges=this.maxCharges;
		}
	},{
		name:"Magic Awareness",
		description:"As an action, you can open your awareness to the presence of concentrated magic. Until the end of your next turn, you know the location of any spell or magic item within 60 feet of you that isn't behind total cover. When you sense a spell, you learn which school of magic it belongs to.\n\nYou can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
		charges:2,
		maxChargesFunction:function(char,scope){
			return scope.derived.proficiency;
		},
		onLongRest:function(){
			this.charges=this.maxCharges;
		}
	},{
		name:"Bolstering Magic",
		description:"You can harness your wild magic to bolster yourself or a companion. As an action, you can touch one creature (which can be yourself) and confer one of the following benefits of your choice to that creature:\n• For 10 minutes, the creature can roll a d3 whenever making an attack roll or an ability check and add the number rolled to the d20 roll.\n• Roll a d3. The creature regains one expended spell slot, the level of which equals the number rolled or lower (the creature's choice). Once a creature receives this benefit, that creature can't receive it again until after a long rest.\nYou can take this action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
		charges:2,
		maxChargesFunction:function(char,scope){
			return scope.derived.proficiency;
		},
		onLongRest:function(){
			this.charges=this.maxCharges;
		}
	}
]);

window.passives.append([
	{
		name:"Unarmored Defense",
		description:"While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier.",
		dmHide:true
	},{
		name:"Danger Sense",
		description:"You gain an uncanny sense of when things nearby aren't as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can't be blinded, deafened, or incapacitated."
	},{
		name:"Reckless Attack",
		description:"You can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn."
	},{
		name:"Fast Movement",
		description:"Your speed increases by 10 feet while you aren't wearing heavy armor.",
		dmHide:true
	},{
		name:"Feral Instinct",
		description:"Your instincts are so honed that you have advantage on initiative rolls.\n\nAdditionally, if you are surprised at the beginning of combat and aren't incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn.",
		dmHide:true
	},{
		name:"Brutal Critical x1",
		description:"You can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack."
	},{
		name:"Brutal Critical x2",
		description:"You can roll two additional weapon damage die when determining the extra damage for a critical hit with a melee attack."
	},{
		name:"Brutal Critical x3",
		description:"You can roll three additional weapon damage die when determining the extra damage for a critical hit with a melee attack."
	},{
		name:"Relentless Rage",
		description:"Your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you're raging and don't die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead.\n\nEach time you use this feature after the first, the DC increases by 5. When you finish a short or long rest, the DC resets to 10."
	},{
		name:"Persistent Rage",
		description:"Your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it."
	},{
		name:"Indomitable Might",
		description:"If your total for a Strength check is less than your Strength score, you can use that score in place of the total."
	},{
		name:"Primal Champion",
		description:"Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24.",
		dmHide:true
	},{
		name:"Slice and Dice",
		description:"While whirlwinding, whenever you move into melee range of a creature, or a creature moves within melee range of you, you may have that creature take damage equal to your weapon damage. A creature damaged this way can't be damaged by it again this turn."
	},{
		name:"Storm of Steel",
		description:"You spin so rapidly that your weapons create a swirling shield as they move. While whirlwinding, you have +2 to AC, and the damage dealt by Slice and Dice is increased by your strength modifier."
	},{
		name:"Spin to Win",
		description:"Whenever you begin your turn while already whirlwinding, each attack you make while whirlwinding does an additional 1d12 damage and crits on a 19 or 20."
	},{
		name:"Ancestral Protectors",
		description:"Spectral warriors appear when you enter your rage. While you're raging, the first creature you hit with an attack on your turn becomes the target of the warriors, which hinder its attacks. Until the start of your next turn, that target has disadvantage on any attack roll that isn't against you, and when the target hits a creature other than you with an attack, that creature has resistance to the damage dealt by the attack. The effect on the target ends early if your rage ends."
	},{
		name:"Spirit Shield",
		description:"The guardian spirits that aid you can provide supernatural protection to those you defend. If you are raging and another creature you can see within 30 feet of you takes damage, you can use your reaction to reduce that damage by ${ladder(classlevel($scope.char,'Barbarian'),6,2,10,3,14,4)}d6.\n\nWhen you reach certain levels in this class, you can reduce the damage by more: by 3d6 at 10th level and by 4d6 at 14th level."
	},{
		name:"Vengeful Ancestors",
		description:"Your ancestral spirits grow powerful enough to retaliate. When you use your Spirit Shield to reduce the damage of an attack, the attacker takes an amount of force damage equal to the damage that your Spirit Shield prevents."
	},{
		name:"Frenzy",
		description:"You can go into a frenzy when you rage. If you do so, for the duration of your rage you can make a single melee weapon attack as a bonus action on each of your turns after this one. When your rage ends, you suffer one level of exhaustion."
	},{
		name:"Mindless Rage",
		description:"You can't be charmed or frightened while raging. If you are charmed or frightened when you enter your rage, the effect is suspended for the duration of the rage."
	},{
		name:"Intimidating Presence",
		description:"You can use your action to frighten someone with your menacing presence. When you do so, choose one creature that you can see within 30 feet of you. If the creature can see or hear you, it must succeed on a Wisdom saving throw (DC ${8 + $scope.derived.proficiency + $scope.derived.modifiers.cha}) or be frightened of you until the end of your next turn. On subsequent turns, you can use your action to extend the duration of this effect on the frightened creature until the end of your next turn. This effect ends if the creature ends its turn out of line of sight or more than 60 feet away from you.\n\nIf the creature succeeds on its saving throw, you can't use this feature on that creature again for 24 hours."
	},{
		name:"Retaliation",
		description:"When you take damage from a creature that is within 5 feet of you. you can use your reaction to make a melee weapon attack against that creature."
	},{
		name:"Divine Fury",
		description:"You can channel divine fury into your weapon strikes. While you're raging, the first creature you hit on each of your turns with a weapon attack takes extra damage equal to 1d6 + half your barbarian level. The extra damage is necrotic or radiant; you choose the type of damage when you gain this feature."
	},{
		name:"Warrior of the Gods",
		description:"Your soul is marked for endless battle. If a spell, such as raise dead, has the sole effect of restoring you to life (but not undeath), the caster doesn't need material components to cast the spell on you.",
		dmHide:true
	},{
		name:"Fanatical Focus",
		description:"The divine power that fuels your rage can protect you. If you fail a saving throw while you're raging, you can reroll it, and you must use the new roll. You can use this ability only once per rage."
	},{
		name:"Rage Beyond Death",
		description:"While you're raging, having 0 hit points doesn't knock you unconscious. You still must make death saving throws, and you suffer the normal effects of taking damage while at 0 hit points. However, if you would die due to failing death saving throws, you don't die until your rage ends, and you die then only if you still have 0 hit points."
	},{
		name:"Desert Aura",
		description:"When this effect is activated, all other creatures in your aura take ${ladder(classlevel($scope.char,'Barbarian'),0,2,5,3,10,4,15,5,20,6)} fire damage each. The damage increases when you reach certain levels in this class, increasing to 3 at 5th level, 4 at 10th level, 5 at 15th level, and 6 at 20th level."
	},{
		name:"Sea Aura",
		description:"When this effect is activated, you can choose one other creature you can see in your aura. The target must make a Dexterity saving throw (DC ${8 + $scope.derived.proficiency + $scope.derived.modifiers.con}). The target takes ${ladder(classlevel($scope.char.'Barbarian'),0,1,10,2,15,3,20,4)}d6 lightning damage on a failed save, or half as much damage on a successful one. The damage increases when you reach certain levels in this class, increasing to 2d6 at 10th level, 3d6 at 15th level, and 4d6 at 20th level."
	},{
		name:"Tundra Aura",
		description:"When this effect is activated, each creature of your choice in your aura gains ${ladder(classlevel($scope.char,'Barbarian'),0,2,5,3,10,4,15,5,20,6)} temporary hit points, as icy spirits inure it to suffering. The temporary hit points increase when you reach certain levels in this class, increasing to 3 at 5th level, 4 at 10th level, 5 at 15th level, and 6 at 20th level."
	},{
		name:"Desert Soul",
		description:"You gain resistance to fire damage, and you don't suffer the effects of extreme heat, as described in the Dungeon Master's Guide. Moreover, as an action, you can touch a flammable object that isn't being worn or carried by anyone else and set it on fire."
	},{
		name:"Sea Soul",
		description:"You gain resistance to lightning damage, and you can breathe underwater. You also gain a swimming speed of 30 feet."
	},{
		name:"Tundra Soul",
		description:"You gain resistance to cold damage, and you don't suffer the effects of extreme cold, as described in the Dungeon Master's Guide. Moreover, as an action, you can touch water and turn a 5-foot cube of it into ice, which melts after 1 minute. This action fails if a creature is in the cube."
	},{
		name:"Desert Storm",
		description:"Immediately after a creature in your aura hits you with an attack, you can use your reaction to force that creature to make a Dexterity saving throw (DC ${8 + $scope.derived.proficiency + $scope.derived.modifiers.con}). On a failed save, the creature takes fire damage equal to half your barbarian level."
	},{
		name:"Sea Storm",
		description:"When you hit a creature in your aura with an attack, you can use your reaction to force that creature to make a Strength saving throw (DC ${8 + $scope.derived.proficiency + $scope.derived.modifiers.con}). On a failed save, the creature is knocked prone, as if struck by a wave."
	},{
		name:"Tundra Storm",
		description:"Whenever the effect of your Storm Aura is activated, you can choose one creature you can see in the aura. That creature must succeed on a Strength saving throw (DC ${8 + $scope.derived.proficiency + $scope.derived.modifiers.con}), or its speed is reduced to 0 until the start of your next turn, as magical frost covers it."
	},{
		name:"Shielding Storm",
		description:"You learn to use your mastery of the storm to protect others. Each creature of your choice has the damage resistance you gained from the Storm Soul feature while the creature is in your Storm Aura."
	},{//DISPLAY ONLY
		name:"Storm Aura",
		description:"You emanate a stormy, magical aura while you rage. The aura extends 10 feet from you in every direction, but not through total cover.\n\nYour aura has an effect that activates when you enter your rage, and you can activate the effect again on each of your turns as a bonus action. Choose desert, sea, or tundra. Your aura's effect depends on that chosen environment. You can change your environment choice whenever you gain a level in this class.\n\nIf your aura's effects require a saving throw, the DC equals 8 + your proficiency bonus + your Constitution modifier."
	},{//DISPLAY ONLY
		name:"Storm Soul",
		description:"The storm grants you benefits even when your aura isn't active. The benefits are based on the environment you chose for your Storm Aura."
	},{//DISPLAY ONLY
		name:"Raging Storm",
		description:"The power of the storm you channel grows mightier, lashing out at your foes. The effect is based on the environment you chose for your Storm Aura."
	},{//DISPLAY ONLY
		name:"Totem Spirit",
		description:"choose a totem spirit and gain its feature. You must make or acquire a physical totem object�an amulet or similar adornment�that incorporates fur or feathers, claws, teeth, or bones of the totem animal. At your option, you also gain minor physical attributes that are reminiscent of your totem spirit. For example, if you have a bear totem spirit, you might be unusually hairy and thick-skinned, or if your totem is the eagle, your eyes turn bright yellow.\n\nYour totem animal might be an animal related to those listed here but more appropriate to your homeland. For example, you could choose a hawk or vulture in place of an eagle.\n\u2022 Bear. While raging, you have resistance to all damage except psychic damage. The spirit of the bear makes you tough enough to stand up to any punishment.\n\u2022 Eagle. While you're raging and aren't wearing heavy armor, other creatures have disadvantage on opportunity attack rolls against you, and you can use the Dash action as a bonus action on your turn. The spirit of the eagle makes you into a predator who can weave through the fray with ease.\n\u2022 Elk. While you're raging and aren't wearing heavy armor, your walking speed increases by 15 feet. The spirit of the elk makes you extraordinarily swift.\n\u2022 Tiger. While raging, you can add 10 feet to your long jump distance and 3 feet to your high jump distance. The spirit of the tiger empowers your leaps.\n\u2022 Wolf. While you're raging, your friends have advantage on melee attack rolls against any creature within 5 feet of you that is hostile to you. The spirit of the wolf makes you a leader of hunters."
	},{
		name:"Bear Spirit",
		description:"While raging, you have resistance to all damage except psychic damage. The spirit of the bear makes you tough enough to stand up to any punishment."
	},{
		name:"Eagle Spirit",
		description:"While you're raging and aren't wearing heavy armor, other creatures have disadvantage on opportunity attack rolls against you, and you can use the Dash action as a bonus action on your turn. The spirit of the eagle makes you into a predator who can weave through the fray with ease."
	},{
		name:"Elk Spirit",
		description:"While you're raging and aren't wearing heavy armor, your walking speed increases by 15 feet. The spirit of the elk makes you extraordinarily swift."
	},{
		name:"Tiger Spirit",
		description:"While raging, you can add 10 feet to your long jump distance and 3 feet to your high jump distance. The spirit of the tiger empowers your leaps."
	},{
		name:"Wolf Spirit",
		description:"While you're raging, your friends have advantage on melee attack rolls against any creature within 5 feet of you that is hostile to you. The spirit of the wolf makes you a leader of hunters."
	},{//DISPLAY ONLY
		name:"Aspect of the Beast",
		description:"You gain a magical benefit based on the totem animal of your choice. You can choose the same animal you selected at 3rd level or a different one.\n\u2022 Bear. You gain the might of a bear. Your carrying capacity (including maximum load and maximum lift) is doubled, and you have advantage on Strength checks made to push, pull, lift, or break objects.\n\u2022 Eagle. You gain the eyesight of an eagle. You can see up to 1 mile away with no difficulty, able to discern even fine details as though looking at something no more than 100 feet away from you. Additionally, dim light doesn't impose disadvantage on your Wisdom (Perception) checks.\n\u2022 Elk. Whether mounted or on foot, your travel pace is doubled, as is the travel pace of up to ten companions while they're within 60 feet of you and you're not incapacitated. The elk spirit helps you roam far and fast.\n\u2022 Tiger. You gain proficiency in two skills from the following list: Athletics, Acrobatics, Stealth, and Survival. The cat spirit hones your survival instincts.\n\u2022 Wolf. You gain the hunting sensibilities of a wolf. You can track other creatures while traveling at a fast pace, and you can move stealthily while traveling at a normal pace."
	},{
		name:"Bear Aspect",
		description:"You gain the might of a bear. Your carrying capacity (including maximum load and maximum lift) is doubled, and you have advantage on Strength checks made to push, pull, lift, or break objects."
	},{
		name:"Eagle Aspect",
		description:"You gain the eyesight of an eagle. You can see up to 1 mile away with no difficulty, able to discern even fine details as though looking at something no more than 100 feet away from you. Additionally, dim light doesn't impose disadvantage on your Wisdom (Perception) checks."
	},{
		name:"Elk Aspect",
		description:"Whether mounted or on foot, your travel pace is doubled, as is the travel pace of up to ten companions while they're within 60 feet of you and you're not incapacitated. The elk spirit helps you roam far and fast."
	},{
		name:"Tiger Aspect",
		description:"You gain proficiency in two skills from the following list: Athletics, Acrobatics, Stealth, and Survival. The cat spirit hones your survival instincts."
	},{
		name:"Wolf Aspect",
		description:"You gain the hunting sensibilities of a wolf. You can track other creatures while traveling at a fast pace, and you can move stealthily while traveling at a normal pace."
	},{
		name:"Spirit Walker",
		description:"You can cast the Commune with Nature spell, but only as a ritual. When you do so, a spiritual version of one of the animals you chose for Totem Spirit or Aspect of the Beast appears to you to convey the information you seek."
	},{//DISPLAY ONLY
		name:"Totemic Attunement",
		description:"you gain a magical benefit based on a totem animal of your choice. You can choose the same animal you selected previously or a different one.\n\u2022 Bear. While you're raging, any creature within 5 feet of you that's hostile to you has disadvantage on attack rolls against targets other than you or another character with this feature. An enemy is immune to this effect if it can't see or hear you or if it can't be frightened.\n\u2022 Eagle. While raging, you have a flying speed equal to your current walking speed. This benefit works only in short bursts; you fall if you end your turn in the air and nothing else is holding you aloft.\n\u2022 Elk. While raging, you can use a bonus action during your move to pass through the space of a Large or smaller creature. That creature must succeed on a Strength saving throw (DC 8 + your Strength bonus + your proficiency bonus) or be knocked prone and take bludgeoning damage equal to 1d12 + your Strength modifier.\n\u2022 Tiger. While you're raging, if you move at least 20 feet in a straight line toward a Large or smaller target right before making a melee weapon attack against it, you can use a bonus action to make an additional melee weapon attack against it.\n\u2022 Wolf. While you're raging, you can use a bonus action on your turn to knock a Large or smaller creature prone when you hit it with melee weapon attack."
	},{
		name:"Bear Attunement",
		description:"While you're raging, any creature within 5 feet of you that's hostile to you has disadvantage on attack rolls against targets other than you or another character with this feature. An enemy is immune to this effect if it can't see or hear you or if it can't be frightened."
	},{
		name:"Eagle Attunement",
		description:"While raging, you have a flying speed equal to your current walking speed. This benefit works only in short bursts; you fall if you end your turn in the air and nothing else is holding you aloft."
	},{
		name:"Elk Attunement",
		description:"While raging, you can use a bonus action during your move to pass through the space of a Large or smaller creature. That creature must succeed on a Strength saving throw (DC 8 + your Strength bonus + your proficiency bonus) or be knocked prone and take bludgeoning damage equal to 1d12 + your Strength modifier."
	},{
		name:"Tiger Attunement",
		description:"While you're raging, if you move at least 20 feet in a straight line toward a Large or smaller target right before making a melee weapon attack against it, you can use a bonus action to make an additional melee weapon attack against it."
	},{
		name:"Wolf Attunement",
		description:"While you're raging, you can use a bonus action on your turn to knock a Large or smaller creature prone when you hit it with melee weapon attack."
	},{
		name:"Wild Surge",
		description:[
			{
				content:"The magical energy roiling inside you sometimes erupts from you. When you enter your rage, roll on the Wild Magic table to determine the magical effect produced.\n\nIf the effect requires a saving throw, the DC equals 8 + your proficiency bonus + your Constitution modifier."
			},{
				type:"table",
				content:[
					["1d8","Effect"],
					['1',"Shadowy tendrils lash around you. Each creature of your choice that you can see within 30 feet of you must succeed on a Constitution saving throw or take 1d12 necrotic damage. You also gain 1d12 temporary hit points."],
					['2',"You teleport up to 30 feet to an unoccupied space you can see. Until your rage ends, you can use this effect again on each of your turns as a bonus action."],
					['3',"An intangible spirit, which looks like a flumph or a pixie (your choice), appears within 5 feet of one creature of your choice that you can see within 30 feet of you. At the end of the current turn, the spirit explodes, and each creature within 5 feet of it must succeed on a Dexterity saving throw or take 1d6 force damage. Until your rage ends, you can use this effect again, summoning another spirit, on each of your turns as a bonus action."],
					['4',"Magic infuses one weapon of your choice that you are holding. Until your rage ends, the weapon's damage type changes to force, and it gains the light and thrown properties, with a normal range of 20 feet and a long range of 60 feet. If the weapon leaves your hand, the weapon reappears in your hand at the end of the current turn."],
					['5',"Whenever a creature hits you with an attack roll before your rage ends, that creature takes 1d6 force damage, as magic lashes out in retribution."],
					['6',"Until your rage ends, you are surrounded by multi colored, protective lights. You gain a +1 bonus to AC, and while within 10 feet of you, your allies gain the same bonus."],
					['7',"Flowers and vines temporarily grow around you. Until your rage ends, the ground within 15 feet of you is difficult terrain for your enemies."],
					['8',"A bolt of light shoots from your chest. Another creature of your choice that you can see within 30 feet of you must succeed on a Constitution saving throw or take 1d6 radiant damage and be blinded until the start of your next turn. Until your rage ends, you can use this effect again on each of your turns as a bonus action."]
				]
			}
		]
	},{
		name:"Unstable Backlash",
		description:"When you are imperiled during your rage, the magic within you can lash out; immediately after you take damage or fail a saving throw while raging, you can use your reaction to roll on the Wild Magic table and immediately produce the effect rolled. This effect replaces your current Wild Magic effect."
	},{
		name:"Controlled Surge",
		description:"Whenever you roll on the Wild Magic table, you can roll the die twice and choose which of the two effects to unleash. If you roll the same number on both dice, you can ignore the number and choose any effect on the table."
	}
]);

window.classes.push(
	{
		classname:"Barbarian",
		name:"Barbarian",
		description:"People of towns and cities take pride in how their civilized ways set them apart from animals, as if denying one's own nature was a mark of superiority. To a barbarian, though, civilization is no virtue, but a sign of weakness. The strong embrace their animal nature�keen instincts, primal physicality, and ferocious rage. Barbarians are uncomfortable when hedged in by walls and crowds. They thrive in the wilds of their homelands: the tundra, jungle, or grasslands where their tribes live and hunt.\nBarbarians come alive in the chaos of combat. They can enter a berserk state where rage takes over, giving them superhuman strength and resilience. A barbarian can draw on this reservoir of fury only a few times without resting, but those few rages are usually sufficient to defeat whatever threats arise.",
		levels:[
			{ //1, first player level
				summary:[
					{name:"Proficiencies",description:"Light Armor, Medium Armor, Simple Weapons, Martial Weapons, Shields, STR saves, CON saves"},
					{name:"Starting Equipment",description:"Any Martial Melee weapon, Two handaxes or any simple weapon, four javelins"},
					{name:"Skill Proficiencies",description:"Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival"},
					findPassive("Unarmored Defense"),
					findAbility("Rage")
				],
				"updates":[
					{
						always:true,
						choicePrompt:"You gain the following proficiencies",
						choices:["Light Armor","Medium Armor","Simple Weapons","Martial Weapons","Shields","STR saves","CON saves"],
						action:function(char,derived,choice,$scope){
							char.maxHp=12;
							char.proficiencies.upush("Light Armor");
							char.proficiencies.upush("Medium Armor");
							char.proficiencies.upush("Shields");
							char.proficiencies.upush("Simple Weapons");
							char.proficiencies.upush("Martial Weapons");
							char.saves.str=1;
							char.saves.con=1;
							addToInventory(char,findItem("Javelin",4));
							addAbility(char,"Rage");
							addPassive(char,"Unarmored Defense");
							openPack(char,"Explorer's Pack");
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[listMartialWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[listSimpleWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						limit:2,
						choicePrompt:"Choose two skill proficiencies:",
						choices:[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Animal Handling","Athletics","Intimidation","Nature","Perception","Survival"].indexOf(skill.name)!=-1){
										result.push(skill.name);
									}
								}
							}
							return result;
						}],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					}
				]
			},	{ // 1
				summary:[
					findPassive("Unarmored Defense"),
					findAbility("Rage")
				],
				"updates":[
					helper.hitDice12,
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Unarmored Defense"),findAbility("Rage")],
						action:function(char,derived,choice){
							addAbility(char,"Rage");
							addPassive(char,"Unarmored Defense");
						}
					}
				]
			}, { // 2
				summary:[
					findPassive("Danger Sense"),
					findPassive("Reckless Attack")
				],
				"updates":[
					helper.hitDice12,
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Danger Sense"),findPassive("Reckless Attack")],
						action:function(char,derived,choice){
							addPassive(char,"Danger Sense");
							addPassive(char,"Reckless Attack");
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice12,
					{
						summary:{name:"Primal Path",description:"Choose your Primal Path"},
						choicePrompt:"Choose a Primal Path",
						choices:[listSpecializations],
						action:function(char,derived,choice){
							addSubclass(char,"Barbarian",choice);
						}
					}
				]
			}, { // 4
				"updates":[
					helper.hitDice12,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//5
				summary:[
					findPassive("Extra Attacks x1"),
					findPassive("Fast Movement")
				],
				"updates":[
					helper.hitDice12,
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Extra Attacks x1"),findPassive("Fast Movement")],
						action:function(char,derived){
							addPassive(char,"Extra Attacks x1");
							addPassive(char,"Fast Movement");
						}
					}
				]
			},{//6
				"updates":[
					helper.hitDice12
				]
			},{//7
				summary:[
					findPassive("Feral Instinct")
				],
				"updates":[
					helper.hitDice12,
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Feral Instinct")],
						action:function(char,derived){
							addPassive(char,"Feral Instinct");
						}
					}
				]
			},{//8
				"updates":[
					helper.hitDice12,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//9
				summary:[
					findPassive("Brutal Critical x1")
				],
				"updates":[
					helper.hitDice12,
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Brutal Critical x1")],
						action:function(char,derived){
							addPassive(char,"Brutal Critical x1");
						}
					}
				]
			},{//10
				"updates":[
					helper.hitDice12
				]
			},{//11
				summary:[
					findPassive("Relentless Rage")
				],
				"updates":[
					helper.hitDice12,
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Relentless Rage")],
						action:function(char,derived){
							addPassive(char,"Relentless Rage");
						}
					}
				]
			},{//12
				"updates":[
					helper.hitDice12,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//13
				"updates":[
					helper.hitDice12,
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Brutal Critical x2")],
						action:function(char,derived){
							removePassive(char,"Brutal Critical x1");
							addPassive(char,"Brutal Critical x2");
						}
					}
				]
			},{//14
				"updates":[
					helper.hitDice12
				]
			},{//15
				summary:[
					findPassive("Persistent Rage")
				],
				"updates":[
					helper.hitDice12,
					{
						choicePrompt:"You gain the following",
						"choices":[findPassive("Persistent Rage")],
						"action":function(char){
							addPassive(char,"Persistent Rage");
						}
					}
				]
			},{//16
				"updates":[
					helper.hitDice12,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//17
				"updates":[
					helper.hitDice12,
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Brutal Critical x3")],
						action:function(char,derived){
							removePassive(char,"Brutal Critical x2");
							addPassive(char,"Brutal Critical x3");
						}
					}
				]
			},{//18
				summary:[
					findPassive("Indomitable Might")
				],
				"updates":[
					helper.hitDice12,
					{
						choicePrompt:"You gain the following",
						"choices":[findPassive("Indomitable Might")],
						"action":function(char){
							addPassive(char,"Indomitable Might");
						}
					}
				]
			},{//19
				"updates":[
					helper.hitDice12,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//20
				summary:[
					findPassive("Primal Champion")
				],
				"updates":[
					helper.hitDice12,
					{
						choicePrompt:"You gain the following",
						"choices":[findPassive("Primal Champion")],
						"action":function(char){
							addPassive(char,"Primal Champion");
							char.attributes.str=Math.min(char.attributes.str+4,24);
							char.attributes.con=Math.min(char.attributes.con+4,24);
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Barbarian",
		name:"Whirlwind",
		subclass:"Whirlwind",
		description:"You achieve glory in combat the only way you know how - by spinning. Barbarians who follow the Path of the Whirlwind throw caution to the wind, and swing their oversized weapons in physically impossible ways in every possible direction, as well as some impossible directions, creating a blurry metal twister of carnage. Manly yells are mandatory while spinning.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						summary:findAbility("Whirlwind"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Whirlwind")],
						action:function(char,derived,choice,$scope){
							addAbility(char,"Whirlwind");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						summary:findPassive("Slice and Dice"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Slice and Dice")],
						action:function(char){
							addPassive(char,"Slice and Dice");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findPassive("Storm of Steel"),
						choices:[findPassive("Storm of Steel")],
						action:function(char,derived,choice){
							addPassive(char,"Storm of Steel");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findPassive("Spin to Win"),
						choices:[findPassive("Spin to Win")],
						action:function(char){
							addPassive(char,"Spin to Win");
						}
					}
				]

			},{},{},{},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Barbarian",
		name:"Ancestral Guardian",
		subclass:"Ancestral Guardian",
		description:"Some barbarians hail from cultures that revere their ancestors. These tribes teach that the warriors of the past linger in the world as mighty spirits, who can guide and protect the living. When a barbarian who follows this path rages, the barbarian contacts the spirit world and calls on these guardian spirits for aid.\n\nBarbarians who draw on their ancestral guardians can better fight to protect their tribes and their allies. In order to cement ties to their ancestral guardians, barbarians who follow this path cover themselves in elaborate tattoos that celebrate their ancestors' deeds. These tattoos tell sagas of victories against terrible monsters and other fearsome rivals.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						summary:findPassive("Ancestral Protectors"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Ancestral Protectors")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Ancestral Protectors");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						summary:findPassive("Spirit Shield"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Spirit Shield")],
						action:function(char){
							addPassive(char,"Spirit Shield");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findAbility("Consult the Spirits"),
						choices:[findAbility("Consult the Spirits")],
						action:function(char,derived,choice){
							addAbility(char,"Consult the Spirits");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findPassive("Vengeful Ancestors"),
						choices:[findPassive("Vengeful Ancestors")],
						action:function(char){
							addPassive(char,"Vengeful Ancestors");
						}
					}
				]

			},{},{},{},{},{},{}
		]
	}
);


window.subclasses.push(
	{
		classname:"Barbarian",
		name:"Berserker",
		subclass:"Berserker",
		description:"For some barbarians, rage is a means to an end�that end being violence. The Path of the Berserker is a path of untrammeled fury, slick with blood. As you enter the berserker's rage, you thrill in the chaos of battle, heedless of your own health or well-being.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						summary:findPassive("Frenzy"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Frenzy")],
						action:function(char){
							addPassive(char,"Frenzy");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						summary:findPassive("Mindless Rage"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Mindless Rage")],
						action:function(char){
							addPassive(char,"Mindless Rage");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findPassive("Intimidating Presence"),
						choices:[findPassive("Intimidating Presence")],
						action:function(char){
							addPassive(char,"Intimidating Presence");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findPassive("Retaliation"),
						choices:[findPassive("Retaliation")],
						action:function(char){
							addPassive(char,"Retaliation");
						}
					}
				]

			},{},{},{},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Barbarian",
		name:"Zealot",
		subclass:"Zealot",
		description:"Some deities inspire their followers to pitch themselves into a ferocious battle fury. These barbarians are zealots�warriors who channel their rage into powerful displays of divine power.\n\nA variety of gods across the worlds of D&D inspire their followers to embrace this path. Tempus from the Forgotten Realms and Hextor and Erythnul of Greyhawk are all prime examples. In general, the gods who inspire zealots are deities of combat, destruction, and violence. Not all are evil, but few are good.",
		levels:[{},{},{},
			{//3
				summary:[
					findPassive("Divine Fury"),
					findPassive("Warrior of the Gods")
				],
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Divine Fury"),findPassive("Warrior of the Gods")],
						action:function(char){
							addPassive(char,"Divine Fury");
							addPassive(char,"Warrior of the Gods");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						summary:findPassive("Fanatical Focus"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Fanatical Focus")],
						action:function(char){
							addPassive(char,"Fanatical Focus");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findAbility("Zealous Presence"),
						choices:[findAbility("Zealous Presence")],
						action:function(char){
							addAbility(char,"Zealous Presence");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findPassive("Rage Beyond Death"),
						choices:[findPassive("Rage Beyond Death")],
						action:function(char){
							addPassive(char,"Rage Beyond Death");
						}
					}
				]

			},{},{},{},{},{},{}
		]
	}
);

helper.chooseStormAura={
	choicePrompt:"Choose your storm environment",
	choices:[findPassive("Desert"),findPassive("Sea"),findPassive("Tundra")],
	action:function(char,derived,choice){
		var auraAbil = angular.copy(findPassive(choice+" Aura"));
		auraAbil.description = "You emanate a stormy, magical aura while you rage. The aura extends 10 feet from you in every direction, but not through total cover.\n\nYour aura has an effect that activates when you enter your rage, and you can activate the effect again on each of your turns as a bonus action.\n\u2022 " + auraAbil.description;
		removePassive(char,"Desert Aura");
		removePassive(char,"Sea Aura");
		removePassive(char,"Tundra Aura");
		if (classlevel(char,'Barbarian' >= 6)){
			var soulAbil = angular.copy(findPassive(choice+" Soul"));
			auraAbil.description += "\n\u2022 " + soulAbil.description;
		}
		if (classlevel(char,'Barbarian') >= 14){
			var stormAbil = angular.copy(findPassive(choice+" Storm"));
			auraAbil.description += "\n\u2022 " + stormAbil.description;
		}
		addPassive(auraAbil);
	}
};

window.subclasses.push(
	{
		classname:"Barbarian",
		name:"Storm Herald",
		subclass:"Storm Herald",
		description:"All barbarians harbor a fury within. Their rage grants them superior strength, durability, and speed. Barbarians who follow the Path of the Storm Herald learn to transform that rage into a mantle of primal magic, which swirls around them. When in a fury, a barbarian of this path taps into the forces of nature to create powerful magical effects.\n\nStorm heralds are typically elite champions who train alongside druids, rangers, and others sworn to protect nature. Other storm heralds hone their craft in lodges in regions wracked by storms, in the frozen reaches at the world's end, or deep in the hottest deserts.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findPassive("Storm Aura"),
						choices:[findPassive("Storm Aura")],
						action:function(char){}
					},helper.chooseStormAura
				]
			},{
				updates:[helper.chooseStormAura]
			},{
				updates:[helper.chooseStormAura]
			},{ //6
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findPassive("Storm Soul"),
						choices:[findPassive("Storm Soul")],
						action:function(char){}
					},helper.chooseStormAura
				]
			},{
				updates:[helper.chooseStormAura]
			},{
				updates:[helper.chooseStormAura]
			},{
				updates:[helper.chooseStormAura]
			},
			{//10
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findAbility("Shielding Storm"),
						choices:[findAbility("Shielding Storm")],
						action:function(char){
							addAbility(char,"Shielding Storm");
						}
					},helper.chooseStormAura
				]
			},{
				updates:[helper.chooseStormAura]
			},{
				updates:[helper.chooseStormAura]
			},{
				updates:[helper.chooseStormAura]
			},
			{//14
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findPassive("Raging Storm"),
						choices:[findPassive("Raging Storm")],
						action:function(char){}
					},helper.chooseStormAura
				]

			},{
				updates:[helper.chooseStormAura]
			},{
				updates:[helper.chooseStormAura]
			},{
				updates:[helper.chooseStormAura]
			},{
				updates:[helper.chooseStormAura]
			},{
				updates:[helper.chooseStormAura]
			},{
				updates:[helper.chooseStormAura]
			}
		]
	}
);


window.subclasses.push(
	{
		classname:"Barbarian",
		name:"Totem Warrior",
		subclass:"Totem Warrior",
		description:"The Path of the Totem Warrior is a spiritual journey, as the barbarian accepts a spirit animal as guide, protector, and inspiration. In battle, your totem spirit fills you with supernatural might, adding magical fuel to your barbarian rage.\n\nMost barbarian tribes consider a totem animal to be kin to a particular clan. In such cases, it is unusual for an individual to have more than one totem animal spirit, though exceptions exist.",
		levels:[{},{},{},
			{//3
				summary:[
					findPassive("Spirit Seeker"),
					findPassive("Totem Spirit")
				],
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Spirit Seeker")],
						action:function(char){
							addPassive(char,"Spirit Seeker");
						}
					},{
						choicePrompt:"Choose a totem spirit",
						choices:[findPassive("Bear Spirit"),findPassive("Eagle Spirit"),findPassive("Elk Spirit"),findPassive("Tiger Spirit"),findPassive("Wolf Spirit")],
						action:function(char,derived,choice){
							addPassive(char,choice);
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						choicePrompt:"Choose a totem aspect",
						choices:[findPassive("Bear Aspect"),findPassive("Eagle Aspect"),findPassive("Elk Aspect"),findPassive("Tiger Aspect"),findPassive("Wolf Aspect")],
						action:function(char,derived,choice){
							addPassive(char,choice);
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findAbility("Spirit Walker"),
						choices:[findAbility("Spirit Walker")],
						action:function(char){
							addAbility(char,"Spirit Walker");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choicePrompt:"Choose a totem attunement",
						choices:[findPassive("Bear Attunement"),findPassive("Eagle Attunement"),findPassive("Elk Attunement"),findPassive("Tiger Attunement"),findPassive("Wolf Attunement")],
						action:function(char,derived,choice){
							addPassive(char,choice);
						}
					}
				]

			},{},{},{},{},{},{}
		]
	}
);


window.subclasses.push(
	{
		classname:"Barbarian",
		name:"Wild Magic",
		subclass:"Wild Magic",
		description:"Many places in the multiverse abound with beauty, intense emotion, and rampant magic; the Feywild, the Upper Planes, and other realms of supernatural power radiate with such forces and can profoundly influence people. As folk of deep feeling, barbarians are especially susceptible to these wild influences, with some barbarians being transformed by the magic. These magic-suffused barbarians walk the Path of Wild Magic. Elf, tiefling, aasimar, and genasi barbarians often seek this path, eager to manifest the otherworldly magic of their ancestors.",
		levels:[{},{},{},
			{//3
				summary:[
					findAbility("Magic Awareness"),
					findPassive("Wild Surge")
				],
				updates:[
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findAbility("Magic Awareness"),findPassive("Wild Surge")],
						action:function(char){
							addAbility(char,"Magic Awareness");
							addPassive(char,"Wild Surge");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						summary:findAbility("Bolstering Magic"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Bolstering Magic")],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choicePrompt:"You gain the following",
						summary:findPassive("Unstable Backlash"),
						choices:[findPassive("Unstable Backlash")],
						action:function(char){
							addPassive(char,choice);
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						summary:findPassive("Controlled Surge"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Controlled Surge")],
						action:function(char,derived,choice){
							addPassive(char,choice);
						}
					}
				]

			},{},{},{},{},{},{}
		]
	}
);