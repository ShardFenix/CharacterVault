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
						"choices":[],
						"action":function(char,derived,choice,$scope){
							char.maxHp=10;
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Medium Armor");
							char.proficiencies.push("Heavy Armor");
							char.proficiencies.push("Shields");
							char.proficiencies.push("Simple Weapons");
							char.proficiencies.push("Martial Weapons");
							char.saves.str=1;
							char.saves.con=1;
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
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
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
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
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
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},
					helper.chooseFightingStyle
				]
			},	{ // 1
				"updates":[
					helper.hitDice10,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addAbility(char,"Second Wind");
						}
					},
					helper.chooseFightingStyle
				]
			}, { // 2
				"updates":[
					helper.hitDice10,
					{
						"choices":[],
						"action":function(char,derived,choice){
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
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//5
				"updates":[
					helper.hitDice10,
					{
						"choices":[],
						"action":function(char,derived){
							addPassive(char,"Extra Attacks x1");
						}
					}
				]
			},{//6
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
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
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//9
				"updates":[
					helper.hitDice10,
					{
						"choices":[],
						"action":function(char,derived){
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
						choices:[],
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
					helper.increaseAttribute,
					helper.increaseAttribute
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
					helper.increaseAttribute,
					helper.increaseAttribute
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
					helper.increaseAttribute,
					helper.increaseAttribute
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
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//20
				"updates":[
					helper.hitDice10,
					{
						"choices":[],
						"action":function(char){
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
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Superior Critical")],
						action:function(char,derived,choice){
							removePassive(char,"Improved Critical");
							addPassive(char,"Superior Critical");
						}
					}
				]
			},{},{},{},{},{},{},{},
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
	}
);