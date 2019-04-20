window.abilities.append([
	
]);

window.passives.append([
	{
		name:"Primeval Awareness",
		description:"Beginning at 3rd level, you can use your action and expend one ranger spell slot to focus your awareness on the region around you. For 1 minute per level of the spell slot you expend, you can sense whether the following types of creatures are present within 1 mile of you (or within up to 6 miles if you are in your favored terrain): aberrations, celestials, dragons, elementals, fey, fiends, and undead. This feature doesn't reveal the creatures' location or number."
	},{
		name:"Land's Stride",
		description:"nonmagical plants without being slowed by them and without taking damage from them if they have thorns, spines, or a similar hazard.\n\nIn addition, you have advantage on saving throws against plants that are magically created or manipulated to impede movement, such those created by the entangle spell."
	},{
		name:"Hide in Plain Sight",
		description:"You can spend 1 minute creating camouflage for yourself. You must have access to fresh mud, dirt, plants, soot, and other naturally occurring materials with which to create your camouflage.\n\nOnce you are camouflaged in this way, you can try to hide by pressing yourself up against a solid surface, such as a tree or wall, that is at least as tall and wide as you are. You gain a +10 bonus to Dexterity (Stealth) checks as long as you remain there without moving or taking actions. Once you move or take an action or a reaction, you must camouflage yourself again to gain this benefit."
	},{
		name:"Vanish",
		description:"You can use the Hide action as a bonus action on your turn. Also, you can't be tracked by nonmagical means, unless you choose to leave a trail."
	},{
		name:"Feral Senses",
		description:"You gain preternatural senses that help you fight creatures you can't see. When you attack a creature you can't see, your inability to see it doesn't impose disadvantage on your attack rolls against it. You are also aware of the location of any invisible creature within 30 feet of you, provided that the creature isn't hidden from you and you aren't blinded or deafened."
	},{
		name:"Foe Slayer",
		description:"You become an unparalleled hunter of your enemies. Once on each of your turns, you can add your Wisdom modifier to the attack roll or the damage roll of an attack you make against one of your favored enemies. You can choose to use this feature before or after the roll, but before any effects of the roll are applied."
	},{
		name:"Ranger's Companion",
		description:"You gain a beast companion that accompanies you on your adventures and is trained to fight alongside you. Choose a beast that is no larger than Medium and that has a challenge rating of 1/4 or lower. Add your proficiency bonus to the beast's AC, attack rolls, and damage rolls, as well as to any saving throws and skills it is proficient in. Its hit point maximum equals its normal maximum or four times your ranger level, whichever is higher.\n\nThe beast obeys your commands as best as it can. It takes its turn on your initiative, though it doesn't take an action unless you command it to. On your turn, you can verbally command the beast where to move (no action required by you). You can use your action to verbally command it to take the Attack, Dash, Disengage, Dodge, or Help action. Once you have the Extra Attack feature, you can make one weapon attack yourself when you command the beast to take the Attack action.\n\nIf you are incapacitated or absent, your beast companion acts on its own, focusing on protecting you and itself. It never requires your command to use its reaction, such as when making an opportunity attack.\n\nLike any creature, the beast can spend hit dice during a short rest.\n\nWhile traveling through your favored terrain with only the beast, you can move stealthily at a normal pace.\n\nIf the beast dies, you can obtain another one by spending 8 hours magically bonding with another beast that isn't hostile to you, either the same type of beast as before or a different one."
	},{
		name:"Exceptional Training",
		description:"On any of your turns when your beast companion doesn't attack, you can use a bonus action to command the beast to take the Dash, Disengage, or Help action on its turn. In addition, the beast's attacks now count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage."
	},{
		name:"Bestial Fury",
		description:"When you command your beast companion to take the Attack action, the beast can make two attacks, or it can take the Multiattack action if it has that action."
	},{
		name:"Share Spells",
		description:"When you cast a spell targeting yourself, you can also affect your beast companion with the spell if the beast is within 30 feet of you."
	}
]);

helper.favoredEnemyChoices=["Aberrations","Beasts","Celestials","Constructs","Dragons","Elementals","Fey","Fiends","Giants","Monstrosities","Oozes","Plants","Undead"];
helper.favoredEnemyHumanoids=["Humans","Elves","Dwarves","Gnomes","Halflings","Orcs","Goblins","Kobolds","Gnolls","Gith","Kuo-Toa","Bird-People","Merfolk","Sahuagin","Tabaxi","Tortles","Yuan-ti","Troglodyte"];

function listFavoredEnemyChoices(char){
	let result=[];
	for (let e of helper.favoredEnemyChoices){
		let found=false;
		for (let p of char.passives){
			if (p.name==='Favored Enemy: '+e){
				found=true;
				break;
			}
		}
		if (!found){
			result.push(e);
		}
	}
	return result;
}
function listFavoredEnemyHumanoids(char){
	let result=[];
	for (let e of helper.favoredEnemyHumanoids){
		let found=false;
		for (let p of char.passives){
			if (p.name==='Favored Enemy: '+e){
				found=true;
				break;
			}
		}
		if (!found){
			result.push(e);
		}
	}
	return result;
}

helper.chooseFavoredEnemy={
	choices:[listFavoredEnemyChoices,listFavoredEnemyHumanoids],
	choicePrompt:"Choose a favored enemy",
	action:function(char,derived,choice,scope){
		addPassive(char,{name:"Favored Enemy: "+choice,description:"You have significant experience studying, tracking, hunting, and even talking to a certain type of enemy.\n\nYou have advantage on Wisdom (Survival) checks to track your favored enemies, as well as on Intelligence checks to recall information about them.\n\nWhen you gain this feature, you also learn one language of your choice that is spoken by your favored enemies, if they speak one at all."});
		if (helper.favoredEnemyHumanoids.includes(choice)){
			scope.choiceQueue.push(helper.chooseFavoredEnemyHumanoid);
		}
	}
}

helper.chooseFavoredTerrain={
	choices:[function(char){
		let result=[];
		let terrainTypes=["Arctic","Coast","Desert","Forest","Grassland","Mountain","Swamp","Underdark"];
		for (let terrain of terrainTypes){
			let found=false;
			for (let p of char.passives){
				if (p.name==='Favored Terrain: '+terrain){
					found=true;
					break;
				}
			}
			if (!found){
				result.push(terrain);
			}
		}
		return result;
	}],
	choicePrompt:"Choose a favored terrain",
	action:function(char,derived,choice){
		addPassive(char,{name:"Favored Terrain: "+choice,description:"You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions. When you make an Intelligence or Wisdom check related to your favored terrain, your proficiency bonus is doubled if you are using a skill that you're proficient in.\n\nWhile traveling for an hour or more in your favored terrain, you gain the following benefits:\n\u2022 Difficult terrain doesn't slow your group's travel.\n\u2022 Your group can't become lost except by magical means.\n\u2022 Even when you are engaged in another activity while traveling (such as foraging, navigating, or tracking), you remain alert to danger.\n\u2022 If you are traveling alone, you can move stealthily at a normal pace.\n\u2022 When you forage, you find twice as much food as you normally would.\n\u2022 While tracking other creatures, you also learn their exact number, their sizes, and how long ago they passed through the area."});
	}
}

helper.chooseFavoredEnemyHumanoid={
	choices:[listFavoredEnemyHumanoids],
	choicePrompt:"Choose a favored enemy",
	action:function(char,derived,choice){
		addPassive(char,{name:"Favored Enemy: "+choice,description:"You have significant experience studying, tracking, hunting, and even talking to a certain type of enemy.\n\nYou have advantage on Wisdom (Survival) checks to track your favored enemies, as well as on Intelligence checks to recall information about them.\n\nWhen you gain this feature, you also learn one language of your choice that is spoken by your favored enemies, if they speak one at all."});
	}
}

window.classes.push(
	{
		classname:"Ranger",
		name:"Ranger",
		description:"",
		levels:[
			{ //1, first player level
				updates:[
					{
						choicePrompt:"You gain all of the following proficiencies:",
						"choices":["Strength saves","Dexterity saves","Light Armor","Medium Armor","Simple Weapons","Martial Weapons","Shields"],
						"action":function(char,derived,choice){
							char.maxHp=10;
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Simple Weapons");
							char.proficiencies.push("Medium Armor");
							char.proficiencies.push("Martial Weapons");
							char.proficiencies.push("Shields");
							char.saves.str=1;
							char.saves.dex=1;
						}
					},{
						choicePrompt:"You gain the following items:",
						choices:[findItem("Longbow"),findItem("Arrow",20)],
						action:function(char){
							addToInventory(char,findItem("Longbow"));
							addToInventory(char,findItem("Arrow",20));
						}
					},{
						"choicePrompt":"Choose a weapon to start with",
						"choices":[listSimpleWeapons,findItem("Shortsword")],
						"action":function(char,derived,choice){
							addToInventory(char,findItem(choice,2));
						}
					},{
						"choicePrompt":"Choose a pack",
						"choices":[findItem("Dungeoneer's Pack"),findItem("Explorer's Pack")],
						"action":function(char,derived,choice){
							openPack(char,choice);
						}
					},{
						"choicePrompt":"Choose starting armor",
						"choices":[findItem("Scale Mail"),findItem("Leather Armor")],
						"action":function(char,derived,choice){
							openPack(char,choice);
						}
					},{
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Animal Handling","Athletics","Insight","Investigation","Nature","Perception","Stealth","Survival"].indexOf(skill.name)!=-1){
										result.push(skill.name);
									}
								}
							}
							return result;
						}],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Animal Handling","Athletics","Insight","Investigation","Nature","Perception","Stealth","Survival"].indexOf(skill.name)!=-1){
										result.push(skill.name);
									}
								}
							}
							return result;
						}],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},
					helper.chooseFavoredEnemy,
					helper.chooseFavoredTerrain
				]
			},	{ // 1
				"updates":[
					helper.hitDice10,
					helper.chooseFavoredEnemy,
					helper.chooseFavoredTerrain
				]
			}, { // 2
				"updates":[
					helper.hitDice10,
					helper.chooseFightingStyle,
					helper.chooseSpell,
					helper.chooseSpell
				]
			}, { // 3
				"updates":[
					helper.hitDice10,
					{
						"choicePrompt":"Choose a Ranger Archetype:",
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addSubclass(char,"Ranger",choice);
							addPassive(char,"Primeval Awareness");
						}
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Ranger spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;//exit this level up
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			}, { // 4
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//5
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Extra Attacks x1")],
						action:function(char,derived){
							addAbility(char,"Extra Attacks x1");
						}
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Ranger spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;//exit this level up
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//6
				"updates":[
					helper.hitDice10,
					helper.chooseFavoredEnemy,
					helper.chooseFavoredTerrain
				]
			},{//7
				"updates":[
					helper.hitDice10,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Ranger spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;//exit this level up
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//8
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Land's Stride")],
						action:function(char){
							addPassive(char,"Land's Stride");
						}
					}
				]
			},{//9
				"updates":[
					helper.hitDice10,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Ranger spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;//exit this level up
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//10
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Hide in Plain Sight")],
						"action":function(char){
							addPassive(char,"Hide in Plain Sight");
						}
					},
					helper.chooseFavoredTerrain
				]
			},{//11
				"updates":[
					helper.hitDice10,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Ranger spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;//exit this level up
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//12
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//13
				"updates":[
					helper.hitDice10,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Ranger spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;//exit this level up
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//14
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Vanish")],
						action:function(char){
							addPassive(char,"Vanish");
						}
					},
					helper.chooseFavoredEnemy
				]
			},{//15
				"updates":[
					helper.hitDice10,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Ranger spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;//exit this level up
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//16
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//17
				"updates":[
					helper.hitDice10,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Ranger spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;//exit this level up
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//18
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Feral Senses")],
						action:function(char){
							addPassive(char,'Feral Senses');
						}
					}
				]
			},{//19
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Ranger spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;//exit this level up
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//20
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Foe Slayer")],
						action:function(char){
							addPassive(char,"Foe Slayer");
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Ranger",
		name:"Beast Master",
		subclass:"Beast Master",
		description:"The Beast Master archetype embodies a friendship between the civilized races and the beasts of the world. United in focus, beast and ranger work as one to fight the monstrous foes that threaten civilization and the wilderness alike. Emulating the Beast Master archetype means committing yourself to this ideal, working in partnership with an animal as its companion and friend.",
		levels:[
			{},{},{},
			{ // 3
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Ranger's Companion")],
						"action":function(char){
							addPassive(char,"Ranger's Companion");
						}
					}
				]
			},{},{},{},
			{//7
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Exceptional Training")],
						"action":function(char){
							addPassive(char,"Exceptional Training");
						}
					}
				]
			},{},{},{},
			{//11
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Bestial Fury")],
						action:function(char,derived,choice){
							addPassive(char,'Bestial Fury');
						}
					}
				]
			},{},{},{},
			{//15
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Foe Slayer")],
						action:function(char,derived,choice){
							addPassive(char,'Foe Slayer');
						}
					}
				]
			},{},{},{},{},{}
		]
	}
);
