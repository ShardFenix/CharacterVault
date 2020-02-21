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
	}
]);

window.classes.push(
	{
		classname:"Barbarian",
		name:"Barbarian",
		description:"People of towns and cities take pride in how their civilized ways set them apart from animals, as if denying one's own nature was a mark of superiority. To a barbarian, though, civilization is no virtue, but a sign of weakness. The strong embrace their animal nature—keen instincts, primal physicality, and ferocious rage. Barbarians are uncomfortable when hedged in by walls and crowds. They thrive in the wilds of their homelands: the tundra, jungle, or grasslands where their tribes live and hunt.\nBarbarians come alive in the chaos of combat. They can enter a berserk state where rage takes over, giving them superhuman strength and resilience. A barbarian can draw on this reservoir of fury only a few times without resting, but those few rages are usually sufficient to defeat whatever threats arise.",
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
		description:"For some barbarians, rage is a means to an end—that end being violence. The Path of the Berserker is a path of untrammeled fury, slick with blood. As you enter the berserker's rage, you thrill in the chaos of battle, heedless of your own health or well-being.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						summary:findPassive("Frenzy"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Frenzy")],
						action:function(char,derived,choice,$scope){
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
						action:function(char,derived,choice){
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
		description:"Some deities inspire their followers to pitch themselves into a ferocious battle fury. These barbarians are zealots—warriors who channel their rage into powerful displays of divine power.\n\nA variety of gods across the worlds of D&D inspire their followers to embrace this path. Tempus from the Forgotten Realms and Hextor and Erythnul of Greyhawk are all prime examples. In general, the gods who inspire zealots are deities of combat, destruction, and violence. Not all are evil, but few are good.",
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
						action:function(char,derived,choice,$scope){
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
						action:function(char,derived,choice){
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
	action:function(char,choice){
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
						action:function(char,derived,choice){
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
