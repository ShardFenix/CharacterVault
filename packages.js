var helper={
	attributeOrFeat:{
						"choicePrompt":"Choose one:",
						"choices":["+2 to Ability Scores","Take a Feat"],
						"action":function(char,derived,choice,scope){
							if (choice==="+2 to Ability Scores"){
								scope.updateStep+=1;
							}
						}
					},
	learnInstrument:{
						"choicePrompt":"Choose an instrument proficiency.",
						"choices":[listNonProficientInstruments],
						"action":function(char,derived,choice){
							char.proficiencies.upush(choice);
						}
					},
	chooseWeaponProficiency:{
						"choicePrompt":"Choose a weapon proficiency:",
						"choices":[listNonProficientWeapons],
						"action":function(char,derived,choice){
							char.proficiencies.upush(choice);
						}
					},
	learnLanguage:{
						"choicePrompt":"Choose a language:",
						"choices":[listUnknownLanguages],
						"action":function(char,derived,choice){
							char.proficiencies.upush(choice);
						}
					},
	chooseFeat:{
						"choicePrompt":"Choose a Feat",
						"choices":[getUnknownFeats],
						"action":function(char,derived,choice,scope){
							let f = angular.copy(findFeat(choice));
							char.passives.push(f);
							if (f.onPickup){
								f.onPickup(char,scope);
							}
							scope.updateStep+=2;
						}
					},
	chooseSpell:{
						"choicePrompt":"Choose a spell.",
						"choices":[listLearnableSpellsForClass],
						"action":function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
	chooseAnyCantrip:{
						"choicePrompt":"Choose a cantrip.",
						"choices":[listAllUnknownCantrips],
						"action":function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
	unlearnSpell:{
						"choicePrompt":"Choose a spell to unlearn:",
						"choices":[listUnlearnableSpells],
						"action":function(char,derived,choice,scope){
							for (let clas of char.classes){
								if (clas.name===scope.chosenClassName){
									for (let i=0;i<clas.spells.length;i++){
										if (clas.spells[i].name===choice){
											clas.spells.splice(i,1);
											return;
										}
									}
								}
							}
						}
					},
	learnSkillProficiency:{
						"choicePrompt":"Choose a skill proficiency.",
						"choices":[listNonProficientSkills],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},
	chooseExpertise:{
						"choicePrompt":"Choose a skill expertise (proficiency will be doubled for this skill):",
						"choices":[listProficientSkills],
						"action":function(char,derived,choice){
							addExpertise(char,choice);
						}
					},
	increaseAttribute:{
						"choicePrompt":"Choose one:",
						"choices":[getAttributesBelow20],
						"action":function(char,derived,choice,scope){
							switch (choice){
								case "+1 Strength":char.attributes.str+=1;break;
								case "+1 Dexterity":char.attributes.dex+=1;break;
								case "+1 Constitution":char.attributes.con+=1;
									if (char.attributes.con%2==0){
										char.maxHp+=char.level;
										char.hp+=char.level;
									}break;
								case "+1 Intelligence":char.attributes.int+=1;break;
								case "+1 Wisdom":char.attributes.wis+=1;break;
								case "+1 Charisma":char.attributes.cha+=1;break;
							}
						}
					},
	hitDice6:{
						"choicePrompt":"What did you roll for your hit dice?",
						"choices":[1,2,3,4,5,6],
						"action":function(char,derived,choice){
							let conMod=Math.floor(char.attributes.con/2)-5;
							char.maxHp+=choice;
							char.hp+=choice;
						}
					},
	hitDice8:{
						"choicePrompt":"What did you roll for your hit dice?",
						"choices":[1,2,3,4,5,6,7,8],
						"action":function(char,derived,choice){
							let conMod=Math.floor(char.attributes.con/2)-5;
							char.maxHp+=choice;
							char.hp+=choice;
						}
					},
	hitDice10:{
						"choicePrompt":"What did you roll for your hit dice?",
						"choices":[1,2,3,4,5,6,7,8,9,10],
						"action":function(char,derived,choice){
							let conMod=Math.floor(char.attributes.con/2)-5;
							char.maxHp+=choice;
							char.hp+=choice;
						}
					},
	hitDice12:{
						"choicePrompt":"What did you roll for your hit dice?",
						"choices":[1,2,3,4,5,6,7,8,9,10,11,12],
						"action":function(char,derived,choice){
							let conMod=Math.floor(char.attributes.con/2)-5;
							choice+=conMod;
							char.maxHp+=choice;
							char.hp+=choice;
						}
					}
};

window.languages=['Language: Common','Language: Elven','Language: Dwarven','Language: Gnomish','Language: Halfling','Language: Giant','Language: Orc','Language: Infernal','Language: Primordial','Language: Abyssal','Language: Celestial','Language: Draconic','Language: Deep Speech','Language: Sylvan','Language: Undercommon',"Language: Thieves' Cant","Language: Druidic"];


window.races=[];
window.skills=[
	{name:"Acrobatics",attribute:"dex"},
	{name:"Animal Handling",attribute:"wis"},
	{name:"Arcana",attribute:"int"},
	{name:"Athletics",attribute:"str"},
	{name:"Deception",attribute:"cha"},
	{name:"History",attribute:"int"},
	{name:"Insight",attribute:"wis"},
	{name:"Intimidation",attribute:"cha"},
	{name:"Investigation",attribute:"int"},
	{name:"Medicine",attribute:"wis"},
	{name:"Nature",attribute:"int"},
	{name:"Perception",attribute:"wis"},
	{name:"Performance",attribute:"cha"},
	{name:"Persuasion",attribute:"cha"},
	{name:"Religion",attribute:"int"},
	{name:"Sleight of Hand",attribute:"dex"},
	{name:"Stealth",attribute:"dex"},
	{name:"Survival",attribute:"wis"}
];

window.abilities=[
	{
		name:"Lv 1 Spell",
		maxChargesFunction:spellSlots1,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 2 Spell",
		maxChargesFunction:spellSlots2,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 3 Spell",
		maxChargesFunction:spellSlots3,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 4 Spell",
		maxChargesFunction:spellSlots4,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 5 Spell",
		maxChargesFunction:spellSlots5,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 6 Spell",
		maxChargesFunction:spellSlots6,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 7 Spell",
		maxChargesFunction:spellSlots7,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 8 Spell",
		maxChargesFunction:spellSlots8,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 9 Spell",
		maxChargesFunction:spellSlots9,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Superiority d6 (Martial Adept)",
		description:"You can use one of your Maneuvers, rolling a d6 for it.",
		maxCharges:1,
		onShortRest:function(char,scope){
			this.charges=1;
		}
	},{
		name:"Bardic Inspiration (d6)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,scope){
			return Math.max(1,scope.derived.modifiers.cha);
		},
		onLongRest:function(char,scope){
			this.charges=scope.derived.modifiers.cha;
		}
	},{
		name:"Bardic Inspiration (d8)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d8.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,scope){
			return Math.max(1,scope.derived.modifiers.cha);
		},
		onShortRest:function(char,scope){
			this.charges=scope.derived.modifiers.cha;
		}
	},{
		name:"Bardic Inspiration (d10)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d10.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,scope){
			return Math.max(1,scope.derived.modifiers.cha);
		},
		onShortRest:function(char,scope){
			this.charges=scope.derived.modifiers.cha;
		}
	},{
		name:"Bardic Inspiration (d12)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d12.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,scope){
			return Math.max(1,scope.derived.modifiers.cha);
		},
		onShortRest:function(char,scope){
			this.charges=scope.derived.modifiers.cha;
		}
	},{
		name:"Lucky",
		description:"You have inexplicable luck that seems to kick in at just the right moment.\nWhenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the d20s is used for the attack roll, ability check, or saving throw.\nYou can also spend one luck point when an attack roll is made against you. Roll a d20, and then choose whether the attack uses the attacker's roll or yours. If more than one creature spends a luck point to influence the outcome of a roll, the points cancel each other out; no additional dice are rolled.\nYou regain your expended luck points when you finish a long rest.",
		maxCharges:3,
		charges:3,
		onLongRest:function(char,scope){
			this.charges=3;
		}
	}
];

window.passives=[
	{
		name:"Jack of All Trades",
		description:"You can add half your proficiency bonus, rounded down, to any ability check you make that doesn't already include your proficiency bonus.",
		apply:function(char,scope){
			let bonus=Math.floor(scope.derived.proficiency/2);
			for (var skill of scope.derived.skills){
				if (skill.mult==0){
					skill.bonus += bonus;
				}
			}
			scope.derived.initiative+=bonus;
		}
	},{
		name:"Song of Rest",
		description:"You can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creatures who can hear your performance regain hit points by spending Hit Dice at the end of the short rest, each of those creatures regains an extra 1d${ladder(classLevel('Bard'),0,6,9,8,13,19,17,12)} hit points."
	},{
		name:"Cutting Words",
		description:"You learn how to use your wit to distract, confuse, and otherwise sap the confidence and competence of others. When a creature that you can see within 60 feet of you makes an attack roll, an ability check, or a damage roll, you can use your reaction to expend one of your uses of Bardic Inspiration, rolling a Bardic Inspiration die and subtracting the number rolled from the creature's roll. You can choose to use this feature after the creature makes its roll, but before the DM determines whether the attack roll or ability check succeeds or fails, or before the creature deals its damage. The creature is immune if it can't hear you or if it's immune to being charmed."
	},{
		name:"Countercharm",
		description:"You use musical notes or words of power to disrupt mind-influencing effects. As an action, you can start a performance that lasts until the end of your next turn. During that time, you and any friendly creatures within 30 feet of you have advantage on saving throws against being frightened or charmed. A creature must be able to hear you to gain this benefit. The performance ends early if you are incapacitated or silenced or if you voluntarily end it (no action required)."
	},{
		name:"Peerless Skill",
		description:"When you make an ability check, you can expend one use of Bardic Inspiration. Roll a Bardic Inspiration die and add the number rolled to your ability check. You can choose to do so after you roll the die for the ability check, but before the DM tells you whether you succeed or fail."
	},{
		name:"Superior Inspiration",
		description:"When you roll initiative and have no uses of Bardic Inspiration left, you regain one use."
	}
	
];

window.classes=
[
	{
		"classname":"Bard",
		"levels":[
			{ //1, first player level
				"updates":[
					{
						"choices":[],
						"action":function(char,derived,choice){
							char.maxHp=8;
							char.hp=8;
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Simple Weapons");
							char.proficiencies.push("Rapiers");
							char.proficiencies.push("Longswords");
							char.proficiencies.push("Shortswords");
							char.proficiencies.push("Hand Crossbows");
							char.saves.dex=1;
							char.saves.cha=1;
							addAbility(char,"Bardic Inspiration (d6)");
						}
					},
					helper.learnInstrument,
					{
						"choicePrompt":"Choose an instrument proficiency.",
						"choices":[listNonProficientInstruments],
						"action":function(char,derived,choice){
							char.proficiencies.upush(choice);
						}
					},
					{
						"choicePrompt":"Choose an instrument proficiency.",
						"choices":[listNonProficientInstruments],
						"action":function(char,derived,choice){
							char.proficiencies.upush(choice);
						}
					},
					helper.learnSkillProficiency,
					helper.learnSkillProficiency,
					helper.learnSkillProficiency,
					{
						"choicePrompt":"Choose a weapon to start with.",
						"choices":[listSimpleWeapons,"Longsword","Rapier"],
						"action":function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},	{ // 1
				"updates":[
					helper.hitDice8,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell
				]
			}, { // 2
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addPassive(char,"Jack of All Trades");
							addPassive(char,"Song of Rest");
						}
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=90;//exit this level up
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			}, { // 3
				"updates":[
					helper.hitDice8,
					{
						"choicePrompt":"Choose a Bard College:",
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addSubclass(char,"Bard",choice);
						}
					}
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
							//upgrade bardic inspiration to recharge on short rest
							removeAbility(char,"Bardic Inspiration (d6)");
							addAbility(char,"Bardic Inspiration (d8)");
						}
					}
				]
			},{//6
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived){
							addPassive(char,"Countercharm");
						}
					}
				]
			},{//7
				"updates":[
					helper.hitDice8
				]
			},{//8
				"updates":[
					helper.hitDice8,
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
							removeAbility("Bardic Inspiration (d8)");
							addAbility("Bardic Inspiration (d10)");
						}
					},
					helper.chooseExpertise,
					helper.chooseExpertise,
					{
						choicePrompt:"Learn a spell from any class:",
						choices:[listAllUnknownSpells],
						action:function(char,derived,choice){
							addSpell(char,choice,'Bard');
						}
					},{
						choicePrompt:"Learn a spell from any class:",
						choices:[listAllUnknownSpells],
						action:function(char,derived,choice){
							addSpell(char,choice,'Bard');
						}
					}
				]
			},{//11
				"updates":[
					helper.hitDice8
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
					helper.hitDice8
				]
			},{//15
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							removeAbility(char,"Bardic Inspiration (d10)");
							addAbility(char,"Bardic Inspiration(d12)");
						}
					}
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
					helper.hitDice8
				]
			},{//18
				"updates":[
					helper.hitDice8,
					{
						choicePrompt:"Learn a spell from any class:",
						choices:[listAllUnknownSpells],
						action:function(char,derived,choice){
							addSpell(char,choice,'Bard');
						}
					},{
						choicePrompt:"Learn a spell from any class:",
						choices:[listAllUnknownSpells],
						action:function(char,derived,choice){
							addSpell(char,choice,'Bard');
						}
					}
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
						choices:[],
						action:function(char){
							addPassive(char,"Superior Inspiration");
						}
					}
				]
			}
		]
	},{
		"classname":"Debug",
		"levels":[
			{
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			}
		]
	}
];

window.subclasses=
[
	{
		"classname":"Bard",
		"subclass":"College of Lore",
		"levels":[
			{},{},{},
			{ // 3
				"updates":[
					helper.learnSkillProficiency,
					helper.learnSkillProficiency,
					helper.learnSkillProficiency,
					helper.chooseExpertise,
					helper.chooseExpertise,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Cutting Words");
						}
					},

				]
			},{},{},
			{//6
				updates:[
					{
						choicePrompt:"Learn a spell from any class:",
						choices:[listAllUnknownSpells],
						action:function(char,derived,choice){
							addSpell(char,choice,'Bard');
						}
					},{
						choicePrompt:"Learn a spell from any class:",
						choices:[listAllUnknownSpells],
						action:function(char,derived,choice){
							addSpell(char,choice,'Bard');
						}
					}
				]
			},{},{},{},{},{},{},{},
			{//14
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive("Peerless Skill");
						}
					}
				]
			}
		]
	}
];