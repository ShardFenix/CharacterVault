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

window.abilities.append([
	{
		name:"Foretelling Roll",
		description:"You can replace any attack roll, saving throw, or ability check made by you or a creature that you can see with one of the foretelling rolls you made with Portent during your last long rest. You must choose to do so before the roll, and you can replace a roll in this way only once per turn.",
		maxChargesFunction:function(char,scope){
			return getClassLevel(char,'Wizard')>=14?3:2;
		},
		charges:2,
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"The Third Eye",
		description:"You can use your action to increase your powers of perception. When you do so, choose one of the following benefits, which lasts until you are incapacitated or you take a short or long rest. You can't use the feature again until you finish a rest.\n\u2022 Darkvision. You gain darkvision out to a range of 60 feet.\n\u2022 Ethereal Sight. You can see into the Ethereal Plane within 60 feet of you.\n\u2022 Greater Comprehension. You can read any language.\n\u2022 See Invisibility. You can see invisible creatures and objects within 10 feet of you that are within line of sight.",
		maxCharges:1,
		charges:1,
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	}
]);

window.passives.append([
	{
		name:"Divination Savant",
		description:"The gold and time you must spend to copy a divination spell into your spellbook is halved."
	},{
		name:"Portent",
		description:"Glimpses of the future begin to press in on your awareness. When you finish a long rest, roll ${getClassLevel($scope.char,'Wizard')>=14?'three':'two'} d20s and record the numbers rolled. You can replace any attack roll, saving throw, or ability check made by you or a creature that you can see with one of these foretelling rolls. You must choose to do so before the roll, and you can replace a roll in this way only once per turn.\nEach foretelling roll can be used only once. When you finish a long rest, you lose any unused foretelling rolls."
	},{
		name:"Expert Divination",
		description:"When you cast a divination spell of 2nd level or higher using a spell slot, you regain one expended spell slot. The slot you regain must be of a level lower than the spell you cast and can't be higher than 5th level."
	}
]);