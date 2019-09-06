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
		}
	},{
		name:"Tireless Spirit",
		description:"When you roll initiative and have no uses of Fighting Spirit remaining, you regain one use."
	},{
		name:"Rapid Strike",
		description:"You learn to trade accuracy for swift strikes. If you take the Attack action on your turn and have advantage on an attack roll against one of the targets, you can forgo the advantage for that roll to make an additional weapon attack against that target, as part of the same action. You can do so no more than once per turn."
	},{
		name:"Know your Enemy",
		description:"If you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own. The DM tells you if the creature is your equal, superior, or inferior in regard to two of the following characteristics of your choice:\n\u2022 Strength score\n\u2022 Dexterity score\n\u2022 Constitution score\n\u2022 Armor Class\n\u2022 Current hit points\n\u2022 Total class levels (if any)\n\u2022 Fighter class levels (if any)"
	},{
		name:"Relentless",
		description:"When you roll initiative and have no superiority dice remaining, you regain 1 superiority die."
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