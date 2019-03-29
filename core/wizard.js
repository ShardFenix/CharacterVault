window.classes.push(
{
		classname:"Wizard",
		name:"Wizard",
		description:"",
		levels:[
			{ //1, first player level
				"updates":[
					{
						"choices":[],
						"action":function(char,derived,choice,$scope){
							char.maxHp=6;
							char.proficiencies.push("Daggers");
							char.proficiencies.push("Darts");
							char.proficiencies.push("Slings");
							char.proficiencies.push("Quarterstaffs");
							char.proficiencies.push("Light Crossbows");
							char.saves.int=1;
							char.saves.wis=1;
							addToInventory(findItem("Spellbook"));
							addAbility(char,"Arcane Recovery");
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[findItem("Quarterstaff"),findItem("Dagger")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a pack:",
						choices:[findItem("Scholar's Pack"),findItem("Explorer's Pack")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose one:",
						choices:[findItem("Component Pouch"),findItem("Arcane Focus")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Arcana","History","Insight","Investigation","Medicine","Religion"].indexOf(skill.name)!=-1){
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
									if (["Arcana","History","Insight","Investigation","Medicine","Religion"].indexOf(skill.name)!=-1){
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
					helper.chooseWizardCantrip,
					helper.chooseWizardCantrip,
					helper.chooseWizardCantrip,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},	{ // 1
				"updates":[
					helper.hitDice6,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addAbility(char,"Arcane Recovery");
						}
					},
					helper.chooseWizardCantrip,
					helper.chooseWizardCantrip,
					helper.chooseWizardCantrip,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell
				]
			}, { // 2
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell,
					{
						"choicePrompt":"Choose an Arcane Tradition:",
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addSubclass(char,"Wizard",choice);
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			}, { // 4
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseWizardCantrip,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//5
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//6
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//7
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//8
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//9
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//10
				"updates":[
					helper.hitDice6,
					helper.chooseWizardCantrip,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//11
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//12
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//13
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//14
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//15
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//16
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//17
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//18
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Spell Mastery");
						}
					}
				]
			},{//19
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//20
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Signature Spells");
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Wizard",
		name:"Divination",
		subclass:"Divination",
		description:"The counsel of a diviner is sought by royalty and commoners alike, for all seek a clearer understanding of the past, present, and future. As a diviner, you strive to part the veils of space, time, and consciousness so that you can see clearly. You work to master spells of discernment, remote viewing, supernatural knowledge, and foresight.",
		levels:[{},{},
			{//2
				updates:[
					{
						choices:[],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Divination Savant");
							addPassive(char,"Portent");
							addAbility(char,"Foretelling Roll");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Expert Divination");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addAbility(char,"The Third Eye");
						}
					}
				]
			},{},{},{},{},{},{},{},{},{},{}
		]
	}
);