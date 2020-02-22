window.abilities.append([
	{
		name:"Second Wind",
		description:"You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level.\n\nOnce you use this feature, you must finish a short or long rest before you can use it again.",
		charges:1,
		maxCharges:1,
		onShortRest:function(){
			this.charges=this.maxCharges;
		}
	},{
		name:"Action Surge",
		description:"You can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action on top of your regular action and a possible bonus action.\n\nOnce you use this feature, you must finish a short or long rest before you can use it again. Starting at 17th level, you can use it twice before a rest, but only once on the same turn.",
		charges:1,
		maxCharges:1,
		maxChargesFunction:function(char){
			return ladder(classLevel(char,"Fighter"),1,1,17,2);
		},
		onShortRest:function(){
			this.charges=this.maxCharges;
		}
	},{
		name:"Indomitable",
		description:"You can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can't use this feature again until you finish a long rest.",
		charges:1,
		maxCharges:1,
		maxChargesFunction:function(char){
			return ladder(classLevel(char,"Fighter"),9,1,13,2,17,3);
		},
		onLongRest:function(){
			this.charges=this.maxCharges;
		}
	},{
		name:"Fighting Spirit",
		description:"Your intensity in battle can shield you and help you strike true. As a bonus action on your turn, you can give yourself advantage on weapon attack rolls until the end of the current turn. When you do so, you also gain temporary hit points equal to your fighter level (minimum 5).\n\nYou can use this feature three times, and you regain all expended uses of it when you finish a long rest.",
		charges:3,
		maxCharges:3,
		onLongRest:function(){
			this.charges=this.maxCharges;
		}
	},{
		name:"Strength Before Death",
		description:"Your fighting spirit can delay the grasp of death. If you take damage that reduces you to 0 hit points and doesn't kill you outright, you can use your reaction to delay falling unconscious, and you can immediately take an extra turn, interrupting the current turn. While you have 0 hit points during that extra turn, taking damage causes death saving throw failures as normal, and three death saving throw failures can still kill you. When the extra turn ends, you fall unconscious if you still have 0 hit points.\n\nOnce you use this feature, you can't use it again until you finish a long rest.",
		charges:1,
		maxCharges:1,
		onLongRest:function(){this.charges=this.maxCharges;}
	},{
		name:"Arcane Shot",
		description:"Once per turn when you fire an arrow from a shortbow or longbow as part of the Attack action, you can apply one of your Arcane Shot options to that arrow. You decide to use the option when the arrow hits a creature, unless the option doesn't involve an attack roll. You have two uses of this ability, and you regain all expended uses of it when you finish a short or long rest. The save DC of your arcane shot options is 8 + your proficiency bonus + your INT modifier (currently ${8 + $scope.derived.proficiency + $scope.derived.modifiers.int})",
		charges:2,
		maxCharges:2,
		onShortRest:helper.recharge
	},{
		name:"Banishing Arrow",
		description:[
			{
				showWhen:function(char){return classLevel(char,"Fighter")<18;},
				value:"You use abjuration magic to try to temporarily banish your target to a harmless location in the Feywild. The creature hit by the arrow must also succeed on a Charisma saving throw or be banished. While banished in this way, the target's speed is 0, and it is incapacitated. At the end of its next turn, the target reappears in the space it vacated or in the nearest unoccupied space if that space is occupied.\nAfter you reach 18th level in this class, a target also takes 2d6 force damage when the arrow hits it."
			},{
				showWhen:function(char){return classLevel(char,"Fighter")>=18;},
				value:"You use abjuration magic to try to temporarily banish your target to a harmless location in the Feywild. The creature hit by the arrow takes 2d6 additional force damage and must also succeed on a Charisma saving throw or be banished. While banished in this way, the target's speed is 0, and it is incapacitated. At the end of its next turn, the target reappears in the space it vacated or in the nearest unoccupied space if that space is occupied."
			}
		],
		resourceName:"Arcane Shot",
		resourceCost:1
	},{
		name:"Beguiling Arrow",
		description:[
			{
				showWhen:function(char){return classLevel(char,"Fighter")<18;},
				value:"Your enchantment magic causes this arrow to temporarily beguile its target. The creature hit by the arrow takes an extra 2d6 psychic damage, and choose one of your allies within 30 feet of the target. The target must succeed on a Wisdom saving throw, or it is charmed by the chosen ally until the start of your next turn. This effect ends early if the chosen ally attacks the charmed target, deals damage to it, or forces it to make a saving throw.\nThe psychic damage increases to 4d6 when you reach 18th level in this class."
			},{
				showWhen:function(char){return classLevel(char,"Fighter")>=18;},
				value:"Your enchantment magic causes this arrow to temporarily beguile its target. The creature hit by the arrow takes an extra 4d6 psychic damage, and choose one of your allies within 30 feet of the target. The target must succeed on a Wisdom saving throw, or it is charmed by the chosen ally until the start of your next turn. This effect ends early if the chosen ally attacks the charmed target, deals damage to it, or forces it to make a saving throw."
			}
		],
		resourceName:"Arcane Shot",
		resourceCost:1
	},{
		name:"Bursting Arrow",
		description:[
			{
				showWhen:function(char){return classLevel(char,"Fighter")<18;},
				value:"You imbue your arrow with force energy drawn from the school of evocation. The energy detonates after your attack. Immediately after the arrow hits the creature, the target and all other creatures within 10 feet of it take 2d6 force damage each.\nThe force damage increases to 4d6 when you reach 18th level in this class."
			},{
				showWhen:function(char){return classLevel(char,"Fighter")>=18;},
				value:"You imbue your arrow with force energy drawn from the school of evocation. The energy detonates after your attack. Immediately after the arrow hits the creature, the target and all other creatures within 10 feet of it take 4d6 force damage each."
			}
		],
		resourceName:"Arcane Shot",
		resourceCost:1
	},{
		name:"Enfeebling Arrow",
		description:[
			{
				showWhen:function(char){return classLevel(char,"Fighter")<18;},
				value:"You weave necromantic magic into your arrow. The creature hit by the arrow takes an extra 2d6 necrotic damage. The target must also succeed on a Constitution saving throw, or the damage dealt by its weapon attacks is halved until the start of your next turn.\nThe necrotic damage increases to 4d6 when you reach 18th level in this class."
			},{
				showWhen:function(char){return classLevel(char,"Fighter")>=18;},
				value:"You weave necromantic magic into your arrow. The creature hit by the arrow takes an extra 4d6 necrotic damage. The target must also succeed on a Constitution saving throw, or the damage dealt by its weapon attacks is halved until the start of your next turn."
			}
		],
		resourceName:"Arcane Shot",
		resourceCost:1
	},{
		name:"Grasping Arrow",
		description:[
			{
				showWhen:function(char){return classLevel(char,"Fighter")<18;},
				value:"When this arrow strikes its target, conjuration magic creates grasping, poisonous brambles, which wrap around the target. The creature hit by the arrow takes an extra 2d6 poison damage, its speed is reduced by 10 feet, and it takes 2d6 slashing damage the first time on each turn it moves 1 foot or more without teleporting. The target or any creature that can reach it can use its action to remove the brambles with a successful Strength (Athletics) check against your Arcane Shot save DC. Otherwise, the brambles last for 1 minute or until you use this option again.\nThe poison damage and slashing damage both increase to 4d6 when you reach 18th level in this class."
			},{
				showWhen:function(char){return classLevel(char,"Fighter")>=18;},
				value:"When this arrow strikes its target, conjuration magic creates grasping, poisonous brambles, which wrap around the target. The creature hit by the arrow takes an extra 4d6 poison damage, its speed is reduced by 10 feet, and it takes 2d6 slashing damage the first time on each turn it moves 1 foot or more without teleporting. The target or any creature that can reach it can use its action to remove the brambles with a successful Strength (Athletics) check against your Arcane Shot save DC. Otherwise, the brambles last for 1 minute or until you use this option again."
			}
		],
		resourceName:"Arcane Shot",
		resourceCost:1
	},{
		name:"Piercing Arrow",
		description:[
			{
				showWhen:function(char){return classLevel(char,"Fighter")<18;},
				value:"You use transmutation magic to give your arrow an ethereal quality. When you use this option, you don't make an attack roll for the attack. Instead, the arrow shoots forward in a line, which is 1 foot wide and 30 feet long, before disappearing. The arrow passes harmlessly through objects, ignoring cover. Each creature in that line must make a Dexterity saving throw. On a failed save, a creature takes damage as if it were hit by the arrow, plus an extra 1d6 piercing damage. On a successful save, a target takes half as much damage.\nThe piercing damage increases to 2d6 when you reach 18th level in this class."
			},{
				showWhen:function(char){return classLevel(char,"Fighter")>=18;},
				value:"You use transmutation magic to give your arrow an ethereal quality. When you use this option, you don't make an attack roll for the attack. Instead, the arrow shoots forward in a line, which is 1 foot wide and 30 feet long, before disappearing. The arrow passes harmlessly through objects, ignoring cover. Each creature in that line must make a Dexterity saving throw. On a failed save, a creature takes damage as if it were hit by the arrow, plus an extra 2d6 piercing damage. On a successful save, a target takes half as much damage."
			}
		],
		resourceName:"Arcane Shot",
		resourceCost:1
	},{
		name:"Seeking Arrow",
		description:[
			{
				showWhen:function(char){return classLevel(char,"Fighter")<18;},
				value:"Using divination magic, you grant your arrow the ability to seek out a target. When you use this option, you don't make an attack roll for the attack. Instead, choose one creature you have seen in the past minute. The arrow flies toward that creature, moving around corners if necessary and ignoring three-quarters cover and half cover. If the target is within the weapon's range and there is a path large enough for the arrow to travel to the target, the target must make a Dexterity saving throw. Otherwise, the arrow disappears after traveling as far as it can. On a failed save, the target takes damage as if it were hit by the arrow, plus an extra 1d6 force damage, and you learn the target's current location. On a successful save, the target takes half as much damage, and you don't learn its location.\nThe force damage increases to 2d6 when you reach 18th level in this class."
			},{
				showWhen:function(char){return classLevel(char,"Fighter")>=18;},
				value:"Using divination magic, you grant your arrow the ability to seek out a target. When you use this option, you don't make an attack roll for the attack. Instead, choose one creature you have seen in the past minute. The arrow flies toward that creature, moving around corners if necessary and ignoring three-quarters cover and half cover. If the target is within the weapon's range and there is a path large enough for the arrow to travel to the target, the target must make a Dexterity saving throw. Otherwise, the arrow disappears after traveling as far as it can. On a failed save, the target takes damage as if it were hit by the arrow, plus an extra 2d6 force damage, and you learn the target's current location. On a successful save, the target takes half as much damage, and you don't learn its location."
			}
		],
		resourceName:"Arcane Shot",
		resourceCost:1
	},{
		name:"Shadow Arrow",
		description:[
			{
				showWhen:function(char){return classLevel(char,"Fighter")<18;},
				value:"You weave illusion magic into your arrow, causing it to occlude your foe's vision with shadows. The creature hit by the arrow takes an extra 2d6 psychic damage, and it must succeed on a Wisdom saving throw or be unable to see anything farther than 5 feet away until the start of your next turn.\nThe psychic damage increases to 4d6 when you reach 18th level in this class."
			},{
				showWhen:function(char){return classLevel(char,"Fighter")>=18;},
				value:"You weave illusion magic into your arrow, causing it to occlude your foe's vision with shadows. The creature hit by the arrow takes an extra 4d6 psychic damage, and it must succeed on a Wisdom saving throw or be unable to see anything farther than 5 feet away until the start of your next turn."
			}
		],
		resourceName:"Arcane Shot",
		resourceCost:1
	}
]);

window.passives.append([
	{
		name:"Improved Critical",
		description:"Your weapon attacks score a critical hit on a roll of 19 or 20."
	},{
		name:"Superior Critical",
		description:"Your weapon attacks score a critical hit on a roll of 18-20."
	},{
		name:"Remarkable Athlete",
		description:"You can add half your proficiency bonus (round up) to any Strength, Dexterity, or Constitution check you make that doesn't already use your proficiency bonus.\n\nIn addition, when you make a running long jump, the distance you can cover increases by a number of feet equal to your Strength modifier."
	},{
		name:"Survivor",
		description:"You attain the pinnacle of resilience in battle. At the start of each of your turns, you regain hit points equal to 5 + your Constitution modifier if you have no more than half of your hit points left. You don't gain this benefit if you have 0 hit points."
	},{
		name:"Elegant Courtier",
		description:"Your discipline and attention to detail allow you to excel in social situations. Whenever you make a Charisma (Persuasion) check, you gain a bonus to the check equal to your Wisdom modifier.\n\nYour self-control also causes you to gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice).",
		apply:function(char,scope){
			for (let skill of scope.derived.skills){
				if (skill.name==='Persuasion'){
					skill.bonus+=scope.derived.modifiers.wis;
				}
			}
		},
		dmHide:true
	},{
		name:"Tireless Spirit",
		description:"When you roll initiative and have no uses of Fighting Spirit remaining, you regain one use.",
		dmHide:true
	},{
		name:"Rapid Strike",
		description:"You learn to trade accuracy for swift strikes. If you take the Attack action on your turn and have advantage on an attack roll against one of the targets, you can forgo the advantage for that roll to make an additional weapon attack against that target, as part of the same action. You can do so no more than once per turn."
	},{
		name:"Know your Enemy",
		description:"If you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own. The DM tells you if the creature is your equal, superior, or inferior in regard to two of the following characteristics of your choice:\n\u2022 Strength score\n\u2022 Dexterity score\n\u2022 Constitution score\n\u2022 Armor Class\n\u2022 Current hit points\n\u2022 Total class levels (if any)\n\u2022 Fighter class levels (if any)",
		dmHide:true
	},{
		name:"Relentless",
		description:"When you roll initiative and have no superiority dice remaining, you regain 1 superiority die.",
		dmHide:true
	},{
		name:"Ever-Ready Shot",
		description:"If you roll initiative and have no uses of Arcane Shot remaining, you regain one use of it.",
		dmHide:true
	},{
		name:"Magic Arrow",
		description:"Whenever you fire a nonmagical arrow from a shortbow or longbow, you can make it magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. The magic fades from the arrow immediately after it hits or misses its target."
	},{
		name:"Curving Shot",
		description:"When you make an attack roll with a magic arrow and miss, you can use a bonus action to reroll the attack roll against a different target within 60 feet of the original target."
	},{
		name:"Rallying Cry",
		description:"When you use your Second Wind feature, you can choose up to three creatures within 60 feet of you that are allied with you. Each one regains hit points equal to your fighter level, provided that the creature can see or hear you."
	},{
		name:"Inspiring Surge",
		description:[
			{
				showWhen:function(char){return classLevel(char,"Fighter") < 18;},
				value:"When you use your Action Surge feature, you can choose one creature within 60 feet of you that is allied with you. That creature can make one melee or ranged weapon attack with its reaction, provided that it can see or hear you.\n\nStarting at 18th level, you can choose two allies within 60 feet of you, rather than one."
			},{
				showWhen:function(char){return classLevel(char,"Fighter") >= 18;},
				value:"When you use your Action Surge feature, you can choose <i>two creatures</i> within 60 feet of you that is allied with you. Those creatures can make one melee or ranged weapon attack with their reactions, provided that they can see or hear you."
			}
		]
	},{
		name:"Bulwark",
		description:"You can extend the benefit of your Indomitable feature to an ally. When you decide to use Indomitable to reroll an Intelligence, a Wisdom, or a Charisma saving throw and you aren't incapacitated, you can choose one ally within 60 feet of you that also failed its saving throw against the same effect. If that creature can see or hear you, it can reroll its saving throw and must use the new roll."
	},{
		name:"Weapon Bond",
		description:"You learn a ritual that creates a magical bond between yourself and one weapon. You perform the ritual over the course of 1 hour, which can be done during a short rest. The weapon must be within your reach throughout the ritual, at the conclusion of which you touch the weapon and forge the bond.\n\nOnce you have bonded a weapon to yourself, you can't be disarmed of that weapon unless you are incapacitated. If it is on the same plane of existence, you can summon that weapon as a bonus action on your turn, causing it to teleport instantly to your hand.\n\nYou can have up to two bonded weapons, but can summon only one at a time with your bonus action. If you attempt to bond with a third weapon, you must break the bond with one of the other two."
	},{
		name:"War Magic",
		description:[
			{
				showWhen:function(char){return classLevel(char,"Fighter") < 18;},
				value:"When you use your action to cast a cantrip, you can make one weapon attack as a bonus action."
			},{
				showWhen:function(char){return classLevel(char,"Fighter") >= 18;},
				value:"When you use your action to cast a spell, you can make one weapon attack as a bonus action."
			}
		]
	},{
		name:"Eldritch Strike",
		description:"When you hit a creature with a weapon attack, that creature has disadvantage on the next saving throw it makes against a spell you cast before the end of your next turn."
	},{
		name:"Arcane Charge",
		description:"You gain the ability to teleport up to 30 feet to an unoccupied space you can see when you use your Action Surge. You can teleport before or after the additional action."
	}
]);

window.classes.push(
	{
		classname:"Fighter",
		name:"Fighter",
		description:"",
		levels:[
			{ //1, first player level
				"updates":[
					{
						choicePrompt:"You gain the following proficiencies:",
						choices:["Strength saves","Constitution saves","Light Armor","Medium Armor","Heavy Armor","Simple Weapons","Martial Weapons","Shields"],
						action:function(char,derived,choice,$scope){
							char.maxHp=10;
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Medium Armor");
							char.proficiencies.push("Heavy Armor");
							char.proficiencies.push("Shields");
							char.proficiencies.push("Simple Weapons");
							char.proficiencies.push("Martial Weapons");
							char.saves.str=1;
							char.saves.con=1;
						}
					},{
						choicePrompt:"You gain the following:",
						choices:[findAbility("Second Wind")],
						action:function(char){
							addAbility(char,"Second Wind");
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[listMartialWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[findItem("Shield"),listMartialWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose one:",
						choices:[findItem("Chain Mail"),"Leather Armor + Longbow"],
						action:function(char,derived,choice){
							if (choice==="Leather Armor + Longbow"){
								addToInventory(char,findItem("Longbow"));
								addToInventory(char,findItem("Leather Armor"));
								addToInventory(char,findItem("Arrow",20));
							} else {
								addToInventory(char,findItem(choice));
							}
						}
					},{
						choicePrompt:"Choose a ranged option:",
						choices:[findItem("Light Crossbow"),findItem("Handaxe")],
						action:function(char,derived,choice){
							if (choice==="Light Crossbow"){
								addToInventory(char,findItem("Light Crossbow"));
								addToInventory(char,findItem("Bolt",20));
							} else {
								addToInventory(char,findItem("Handaxe",2));
							}
						}
					},{
						choicePrompt:"Choose a pack.",
						choices:[findItem("Dungeoneer's Pack"),findItem("Explorer's Pack")],
						action:function(char,derived,choice){
							openPack(char,choice);
						}
					},{
						limit:2,
						choicePrompt:"Choose two skill proficiencies:",
						choices:[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Acrobatics","Animal Handling","Athletics","History","Insight","Intimidation","Perception","Survival"].indexOf(skill.name)!=-1){
										result.push(skill.name);
									}
								}
							}
							return result;
						}],
						action:function(char,derived,choice){
							addProficiency(char,choice);
						}
					},
					helper.chooseFightingStyle
				]
			},	{ // 1
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following:",
						choices:[findAbility("Second Wind")],
						action:function(char,derived,choice){
							addAbility(char,"Second Wind");
						}
					},
					helper.chooseFightingStyle
				]
			}, { // 2
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following:",
						choices:[findAbility("Action Surge")],
						action:function(char,derived,choice){
							addAbility(char,"Action Surge");
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"Choose a Martial Archetype",
						choices:[listSpecializations],
						action:function(char,derived,choice){
							addSubclass(char,"Fighter",choice);
						}
					}
				]
			}, { // 4
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//5
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Extra Attacks x1")],
						action:function(char,derived){
							addPassive(char,"Extra Attacks x1");
						}
					}
				]
			},{//6
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//7
				"updates":[
					helper.hitDice10
				]
			},{//8
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//9
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Indomitable")],
						action:function(char,derived){
							addPassive(char,"Indomitable");
						}
					}
				]
			},{//10
				"updates":[
					helper.hitDice10
				]
			},{//11
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Extra Attacks x2")],
						action:function(char,derived){
							removePassive(char,"Extra Attacks x1");
							addPassive(char,"Extra Attacks x2");
						}
					}
				]
			},{//12
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//13
				"updates":[
					helper.hitDice10
				]
			},{//14
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//15
				"updates":[
					helper.hitDice10
				]
			},{//16
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//17
				"updates":[
					helper.hitDice10
				]
			},{//18
				"updates":[
					helper.hitDice10
				]
			},{//19
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//20
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Extra Attacks x3")],
						action:function(char){
							removePassive(char,"Extra Attacks x2");
							addPassive(char,"Extra Attacks x3");
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Fighter",
		name:"Champion",
		subclass:"Champion",
		description:"The archetypal Champion focuses on the development of raw physical power honed to deadly perfection. Those who model themselves on this archetype combine rigorous training with physical excellence to deal devastating blows.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Improved Critical")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Improved Critical");
						}
					}
				]
			},{},{},{},
			{ //7
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Remarkable Athlete")],
						action:function(char){
							addPassive(char,"Remarkable Athlete");
						}
					}
				]
			},{},{},
			{//10
				updates:[
					helper.chooseFightingStyle
				]
			},{},{},{},{},
			{//15
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Superior Critical")],
						action:function(char,derived,choice){
							removePassive(char,"Improved Critical");
							addPassive(char,"Superior Critical");
						}
					}
				]
			},{},{},
			{//18
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Survivor")],
						action:function(char){
							addPassive(char,"Survivor");
						}
					}
				]
			},{},{}
		]
	},{
		classname:"Fighter",
		name:"Samurai",
		subclass:"Samurai",
		description:"The Samurai is a fighter who draws on an implacable fighting spirit to overcome enemies. A Samurai's resolve is nearly unbreakable, and the enemies in a Samurai's path have two choices: yield or die fighting.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findAbility("Fighting Spirit")],
						action:function(char,derived,choice,$scope){
							addAbility(char,"Fighting Spirit");
						}
					},{
						choicePrompt:"Choose a skill proficiency:",
						choices:[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["History","Insight","Performance","Persuasion"].indexOf(skill.name)!=-1){
										result.push(skill.name);
									}
								}
							}
							return result;
						}],
						action:function(char,derived,choice){
							addProficiency(char,choice);
						}
					}
				]
			},{},{},{},
			{ //7
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Elegant Courtier")],
						action:function(char){
							addPassive(char,"Elegant Courtier");
						}
					},{
						choicePrompt:"Choose a saving throw to become proficient in:",
						choices:[function(char){
							if (char.saves.wis===0){
								return ['Wisdom'];
							}
							let result=[];
							if (char.saves.int===0){
								result.push('Intelligence');
							}
							if (char.saves.cha===0){
								result.push('Charisma');
							}
							return result;
						}],
						action:function(char,derived,choice){
							switch(choice){
								case "Wisdom":char.saves.wis=1;break;
								case "Intelligence":char.saves.int=1;break;
								case "Charisma":char.saves.cha=1;break;
							}
						}
					}
				]
			},{},{},
			{//10
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Tireless Spirit")],
						action:function(char,derived,choice){
							addPassive(char,"Tireless Spirit");
						}
					}
				]
			},{},{},{},{},
			{//15
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Rapid Strike")],
						action:function(char,derived,choice){
							addPassive(char,"Rapid Strike");
						}
					}
				]
			},{},{},
			{//18
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findAbility("Strength Before Death")],
						action:function(char){
							addAbility(char,"Strength Before Death");
						}
					}
				]
			},{},{}
		]
	},{
		classname:"Fighter",
		name:"Battle Master",
		subclass:"Battle Master",
		description:"Those who emulate the archetypal Battle Master employ martial techniques passed down through generations. To a Battle Master, combat is an academic field, sometimes including subjects beyond battle such as weaponsmithing and calligraphy. Not every fighter absorbs the lessons of history, theory, and artistry that are reflected in the Battle Master archetype, but those who do are well-rounded fighters of great skill and knowledge.",
		levels:[{},{},{},
			{//3
				updates:[
					helper.learnTool,
					{
						choicePrompt:"You gain the following:",
						choices:[{name:"Superiority Dice",description:"You get four Superiority Dice, which can be used to fuel Maneuvers. You pick three maneuvers when you gain these dice."}],
						action:function(char){
							addAbility(char,"Superiority d8");
						}
					},{
						limit:3,
						choicePrompt:"Choose three Maneuvers",
						choices:[listManeuvers],
						action:function(char,derived,choice){
							addPassive(char,findPassive(choice));
						}
					}
				]
			},{},{},{},
			{ //7
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:["+1 Superiority Die"],
						action:function(char){}
					},{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Know your Enemy")],
						action:function(char,derived,choice){
							addPassive(char,"Know your Enemy");
						}
					},{
						limit:2,
						choicePrompt:"Choose two Maneuvers",
						choices:[listManeuvers],
						action:function(char,derived,choice){
							addPassive(char,findPassive(choice));
						}
					}
				]
			},{},{},
			{//10
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findAbility("Superiority d10")],
						action:function(char,derived,choice){
							removeAbility("Superiority d8");
							addAbility(char,"Superiority d10");
						}
					},{
						limit:2,
						choicePrompt:"Choose two Maneuvers",
						choices:[listManeuvers],
						action:function(char,derived,choice){
							addPassive(char,findPassive(choice));
						}
					}
				]
			},{},{},{},{},
			{//15
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:["+1 Superiority Die",findPassive("Relentless")],
						action:function(char,derived,choice){
							addPassive(char,"Relentless");
						}
					},{
						limit:2,
						choicePrompt:"Choose two Maneuvers",
						choices:[listManeuvers],
						action:function(char,derived,choice){
							addPassive(char,findPassive(choice));
						}
					}
				]
			},{},{},
			{//18
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findAbility("Superiority d12")],
						action:function(char,derived,choice){
							removeAbility("Superiority d10");
							addAbility(char,"Superiority d12");
						}
					},{
						limit:2,
						choicePrompt:"Choose two Maneuvers",
						choices:[listManeuvers],
						action:function(char,derived,choice){
							addPassive(char,findPassive(choice));
						}
					}
				]
			},{},{}
		]
	}
);

function listUnknownArcaneShots(char){
	var result=[];
	for (let abil of window.abilities){
		if (abil.resourceName==='Arcane Shot'){
			if (!char.abilities.has(abil)){
				result.push(abil);
				continue;
			}
		}
	}
	return result;
}

window.subclasses.push(
	{
		classname:"Fighter",
		name:"Arcane Archer",
		subclass:"Arcane Archer",
		description:"An Arcane Archer studies a unique elven method of archery that weaves magic into attacks to produce supernatural effects. Arcane Archers are some of the most elite warriors among the elves. They stand watch over the fringes of elven domains, keeping a keen eye out for trespassers and using magic-infused arrows to defeat monsters and invaders before they can reach elven settlements. Over the centuries, the methods of these elf archers have been learned by members of other races who can also balance arcane aptitude with archery.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findAbility("Arcane Shot")],
						action:function(char,derived,choice,$scope){
							addAbility(char,"Arcane Shot");
						}
					},{
						choicePrompt:"Choose a skill proficiency:",
						choices:[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Arcana","Nature"].indexOf(skill.name)!=-1){
										result.push(skill.name);
									}
								}
							}
							return result;
						}],
						action:function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						choicePrompt:"Choose a cantrip:",
						choices:[findSpell("Druidcraft"),findSpell("Prestidigitation")],
						action:function(char,derived,choice){
							addSpell(char,choice,"Fighter");
						}
					},{
						limit:2,
						choicePrompt:"Choose two Arcane Shot options",
						choices:[listUnknownArcaneShots],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					}
				]
			},{},{},{},
			{ //7
				updates:[
					{
						always:true,
						choicePrompt:"You gain the following:",
						choices:[findPassive("Magic Arrow"),findPassive("Curving Shot")],
						action:function(char){
							addPassive(char,"Magic Arrow");
							addPassive(char,"Curving Shot");
						}
					},{
						choicePrompt:"Choose an Arcane Shot option",
						choices:[listUnknownArcaneShots],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					}
				]
			},{},{},
			{//10
				updates:[
					{
						choicePrompt:"Choose an Arcane Shot option",
						choices:[listUnknownArcaneShots],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					}
				]
			},{},{},{},{},
			{//15
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Ever-Ready Shot")],
						action:function(char,derived,choice){
							addPassive(char,"Ever-Ready Shot");
						}
					},{
						choicePrompt:"Choose an Arcane Shot option",
						choices:[listUnknownArcaneShots],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					}
				]
			},{},{},
			{//18
				updates:[
					{
						choicePrompt:"Choose an Arcane Shot option",
						choices:[listUnknownArcaneShots],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					}
				]
			},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Fighter",
		name:"Banneret",
		subclass:"Banneret",
		description:"Pledged to protect the crown, Bannerets take the fight against evil beyond the kingdom's borders. They are tasked with wandering the land as knights errant, relying on their judgment, bravery, and fidelity to guide them in defeating evildoers.\n\nA Banneret inspires greatness in others by committing brave deeds in battle. The mere presence of a knight in a hamlet is enough to cause some orcs and bandits to seek easier prey. A lone knight is a skilled warrior, but a knight leading a band of allies can transform even the most poorly equipped militia into a ferocious war band.\n\nA knight prefers to lead through deeds, not words. As a knight spearheads an attack, the knight's actions can awaken reserves of courage and conviction in allies that they never suspected they had.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						summary:findPassive("Rallying Cry"),
						choicePrompt:"You gain the following:",
						choices:[findPassive("Rallying Cry")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Rallying Cry");
						}
					}
				]
			},{},{},{},
			{ //7
				updates:[
					{
						choicePrompt:"Choose a skill proficiency",
						choices:[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Animal Handling","Insight","Intimidation","Performance","Persuasion"].indexOf(skill.name)!=-1){
										result.push(skill.name);
									}
								}
							}
							if (result.has("Persuasion")){
								result=["Persuasion"];
							}
							return result;
						}],
						action:function(char,derived,choice){
							addProficiency(char,choice);
							for (let skill of char.skills){
								if (skill.mult<2 && skill.name==="Persuasion"){
									skill.mult=2;
									return;
								}
							}
						}
					}
				]
			},{},{},
			{//10
				updates:[
					{
						summary:findPassive("Inspiring Surge"),
						choicePrompt:"You gain the following:",
						choices:[findPassive("Inspiring Surge")],
						action:function(char,derived,choice){
							addPassive(char,"Inspiring Surge");
						}
					}
				]
			},{},{},{},{},
			{//15
				updates:[
					{
						summary:findPassive("Bulwark"),
						choicePrompt:"You gain the following:",
						choices:[findPassive("Bulwark")],
						action:function(char,derived,choice){
							addPassive(char,"Bulwark");
						}
					}
				]
			},{},{},
			{//18
				updates:[
					{
						summary:{name:"Inspiring Surge",description:"You can choose two allies within 60 feet of you for your Inspiring Surge feature."},
						choicePrompt:"You gain the following",
						choices:[{name:"Inspiring Surge",description:"You can choose two allies within 60 feet of you for your Inspiring Surge feature."}],
						action:function(char){
						}
					}
				]
			},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Fighter",
		name:"Eldritch Knight",
		subclass:"Eldritch Knight",
		description:"The archetypal Eldritch Knight combines the martial mastery common to all fighters with a careful study of magic. Eldritch Knights use magical techniques similar to those practiced by wizards. They focus their study on two of the eight schools of magic - abjuration and evocation. Abjuration spells grant an Eldritch Knight additional protection in battle, and evocation spells deal damage to many foes at once, extending the fighter's reach in combat. These knights learn a comparatively small number of spells, committing them to memory instead of keeping them in a spellbook.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						summary:findPassive("Weapon Bond"),
						choicePrompt:"You gain the following:",
						choices:[findPassive("Weapon Bond")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Weapon Bond");
						}
					}
				]
			},{},{},{},
			{ //7
				updates:[
					{
						summary:findPassive("War Magic"),
						choicePrompt:"You gain the following:",
						choices:[findPassive("War Magic")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"War Magic");
						}
					}
				]
			},{},{},
			{//10
				updates:[
					{
						summary:findPassive("Eldritch Strike"),
						choicePrompt:"You gain the following:",
						choices:[findPassive("Eldritch Strike")],
						action:function(char,derived,choice){
							addPassive(char,"Eldritch Strike");
						}
					}
				]
			},{},{},{},{},
			{//15
				updates:[
					{
						summary:findPassive("Arcane Charge"),
						choicePrompt:"You gain the following:",
						choices:[findPassive("Arcane Charge")],
						action:function(char,derived,choice){
							addPassive(char,"Arcane Charge");
						}
					}
				]
			},{},{},
			{//18
				updates:[
					{
						summary:{name:"Improved War Magic",description:"You can use your War Magic feature after casting any spell."},
						choicePrompt:"You gain the following",
						choices:[{name:"Improved War Magic",description:"You can use your War Magic feature after casting any spell."}],
						action:function(char){
						}
					}
				]
			},{},{}
		]
	}
);