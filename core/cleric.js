window.classes.push(
	{
		classname:"Cleric",
		name:"Cleric",
		description:"Divine magic, as the name suggests, is the power of the gods, flowing from them into the world. Clerics are conduits for that power, manifesting it as miraculous effects. The gods don't grant this power to everyone who seeks it, but only to those chosen to fulfill a high calling.\nHarnessing divine magic doesn't rely on study or training. A cleric might learn formulaic prayers and ancient rites, but the ability to cast cleric spells relies on devotion and an intuitive sense of a deity's wishes.\nClerics combine the helpful magic of healing and inspiring their allies with spells that harm and hinder foes. They can provoke awe and dread, lay curses of plague or poison, and even call down flames from heaven to consume their enemies. For those evildoers who will benefit most from a mace to the head, clerics depend on their combat training to let them wade into melee with the power of the gods on their side.",
		levels:[
			{ //1, first player level
				"updates":[
					{
						"choices":[],
						"action":function(char,derived,choice,$scope){
							char.maxHp=8;
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Simple Weapons");
							char.proficiencies.push("Medium Armor");
							char.proficiencies.push("Shields");
							char.saves.wis=1;
							char.saves.cha=1;
							addToInventory(findItem("Holy Symbol"));
							addToInventory(findItem("Shield"));
							learnAllClassSpells(char,$scope);
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[findItem("Mace"),findItem("Warhammer")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[listSimpleWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
							if (choice==="Light Crossbow"){
								let bolts = findItem("Bolt");
								bolts.count=20;
								addToInventory(char,bolts);
							}
						}
					},{
						choicePrompt:"Choose starting armor:",
						choices:[findItem("Scale Mail"),findItem("Leather Armor"),findItem("Chain Mail")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a pack:",
						choices:[findItem("Priest's Pack"),findItem("Explorer's Pack")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["History","Religion","Insight","Medicine","Persuasion"].indexOf(skill.name)!=-1){
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
									if (["History","Religion","Insight","Medicine","Persuasion"].indexOf(skill.name)!=-1){
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
					helper.chooseClericCantrip,
					helper.chooseClericCantrip,
					helper.chooseClericCantrip,
					{
						"choicePrompt":"Choose a Divine Domain:",
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addSubclass(char,"Cleric",choice);
						}
					}
				]
			},	{ // 1
				"updates":[
					helper.hitDice8,
					{
						"choicePrompt":"Choose a Divine Domain:",
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addSubclass(char,"Cleric",choice);
						}
					}
				]
			}, { // 2
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addAbility(char,"Channel Divinity");
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice8
				]
			}, { // 4
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//5
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived){
							addPassive(char,"Destroy Undead (CR 1/2)");
						}
					}
				]
			},{//6
				"updates":[
					helper.hitDice8
				]
			},{//7
				"updates":[
					helper.hitDice8
				]
			},{//8
				"updates":[
					helper.hitDice8,
					{
						choices:[],
						action:function(char){
							removePassive("Destroy Undead (CR 1/2)");
							addPassive("Destroy Undead (CR 1)");
						}
					},
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//9
				"updates":[
					helper.hitDice8
				]
			},{//10
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							addAbility(char,"Divine Intervention");
						}
					}
				]
			},{//11
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							removePassive(char,"Destroy Undead (CR 1)");
							addPassive(char,"Destroy Undead (CR 2)");
						}
					}
				]
			},{//12
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//13
				"updates":[
					helper.hitDice8
				]
			},{//14
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							removePassive(char,"Destroy Undead (CR 2)");
							addPassive(char,"Destroy Undead (CR 3)");
						}
					}
				]
			},{//15
				"updates":[
					helper.hitDice8
				]
			},{//16
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//17
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							removePassive(char,"Destroy Undead (CR 3)");
							addPassive(char,"Destroy Undead (CR 4)");
						}
					}
				]
			},{//18
				"updates":[
					helper.hitDice8
				]
			},{//19
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//20
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							removeAbility(char,"Divine Intervention");
							addAbility(char,"Improved Divine Intervention");
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Cleric",
		name:"Life Domain",
		subclass:"Life Domain",
		description:"The Life domain focuses on the vibrant positive energy - one of the fundamental forces of the universe - that sustains all life. The gods of life promote vitality and health through healing the sick and wounded, caring for those in need, and driving away the forces of death and undeath. Almost any non-evil deity can claim influence over this domain, particularly agricultural deities (such as Chauntea, Arawai, and Demeter), sun gods (such as Lathander, Pelor, and Re-Horakhty), gods of healing or endurance (such as Ilmater, Mishakal, Apollo, and Diancecht), and gods of home and community (such as Hestia, Hathor, and Boldrei).",
		levels:[{},
			{//1
				updates:[
					{
						choices:[],
						action:function(char,derived,choice,$scope){
							char.proficiencies.upush("Heavy Armor");
							addPassive(char,"Disciple of Life");
						}
					}
				]
			},{ //2
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Preserve Life");
						}
					}
				]
			},{},{},{},
			{//6
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Blessed Healer");
						}
					}				]
			},{},
			{//8
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Divine Strike");
						}
					}
				]
			},{},{},{},{},{},{},{},{},
			{//18
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive("Supreme Healing");
						}
					}
				]
			}
		]
	}
);