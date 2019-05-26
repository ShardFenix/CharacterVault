var helper={
	chooseManeuver:{
						choicePrompt:"Choose a Maneuver",
						choices:[listManeuvers],
						action:function(char,derived,choice){
							addPassive(char,findPassive(choice));
						}
					},
	chooseFightingStyle:{
						summary:{name:"Fighting Style",description:"Choose a fighting style from one of the following:\n\u2022 Archery: "+findPassive("Archery").description+"\n\u2022 Defense: "+findPassive("Defense").description+"\n\u2022 Dueling: "+findPassive("Dueling").description+"\n\u2022 Great Weapon Fighting: "+findPassive("Great Weapon Fighting").description+"\n\u2022 Protection: "+findPassive("Protection").description+"\n\u2022 Two-Weapon Fighting: "+findPassive("Two-Weapon Fighting").description},
						choicePrompt:"Choose a Fighting Style",
						choices:[function(char){
							let result=[];
							let fsNames=["Archery","Defense","Dueling","Great Weapon Fighting","Protection","Two-Weapon Fighting"];
							for (let name of fsNames){
								let found=false;
								for (let abil of char.passives){
									if (abil.name===name){
										found=true;
										break;
									}
								}
								if (!found){
									result.push(findPassive(name));
								}
							}
							return result;
						}],
						action:function(char,derived,choice){
							let f = angular.copy(findPassive(choice));
							char.passives.push(f);
						}
					},
	attributeOrFeat:{
						summary:{name:"Attribute Score Increase",description:"Add +2 to one attribute, or +1 to two attributes, or take a Feat."},
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
	learnTool:{
						"choicePrompt":"Choose a tool proficiency.",
						"choices":[listNonProficientTools],
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
	chooseRaceFeat:{ //same as above, but dont skip 2 steps
						"choicePrompt":"Choose a Feat",
						"choices":[getUnknownFeats],
						"action":function(char,derived,choice,scope){
							let f = angular.copy(findFeat(choice));
							char.passives.push(f);
							if (f.onPickup){
								f.onPickup(char,scope);
							}
						}
					},
	chooseSpell:{
						"choicePrompt":"Choose a spell.",
						"choices":[listLearnableSpells],
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
	chooseBardCantrip:{
						"choicePrompt":"Choose a cantrip.",
						"choices":[listUnknownBardCantrips],
						"action":function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
	chooseClericCantrip:{
						"choicePrompt":"Choose a cantrip.",
						"choices":[listUnknownClericCantrips],
						"action":function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
	chooseDruidCantrip:{
						"choicePrompt":"Choose a cantrip.",
						"choices":[listUnknownDruidCantrips],
						"action":function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
	chooseSorcererCantrip:{
						"choicePrompt":"Choose a cantrip.",
						"choices":[listUnknownSorcererCantrips],
						"action":function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
	chooseWarlockCantrip:{
						"choicePrompt":"Choose a cantrip.",
						"choices":[listUnknownWarlockCantrips],
						"action":function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
	chooseWizardCantrip:{
						"choicePrompt":"Choose a cantrip.",
						"choices":[listUnknownWizardCantrips],
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
								case "+1 Constitution":char.attributes.con+=1;break;
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
							char.maxHp+=choice;
						}
					},
	hitDice8:{
						"choicePrompt":"What did you roll for your hit dice?",
						"choices":[1,2,3,4,5,6,7,8],
						"action":function(char,derived,choice){
							char.maxHp+=choice;
						}
					},
	hitDice10:{
						"choicePrompt":"What did you roll for your hit dice?",
						"choices":[1,2,3,4,5,6,7,8,9,10],
						"action":function(char,derived,choice){
							char.maxHp+=choice;
						}
					},
	hitDice12:{
						"choicePrompt":"What did you roll for your hit dice?",
						"choices":[1,2,3,4,5,6,7,8,9,10,11,12],
						"action":function(char,derived,choice){
							char.maxHp+=choice;
						}
					}
};

function openPack(char,packname){
	if (packname==="Priest's Pack"){
		addToInventory(char,findItem("Backpack"));
		addToInventory(char,findItem("Blanket"));
		addToInventory(char,findItem("Candle",10));
		addToInventory(char,findItem("Tinderbox"));
		addToInventory(char,findItem("Alms Box"));
		addToInventory(char,findItem("Block of Incense",2));
		addToInventory(char,findItem("Censer"));
		addToInventory(char,findItem("Vestments"));
		addToInventory(char,findItem("Rations"),2);
		addToInventory(char,findItem("Waterskin"));
	} else if (packname==="Explorer's Pack"){
		addToInventory(char,findItem("Backpack"));
		addToInventory(char,findItem("Bedroll"));
		addToInventory(char,findItem("Mess Kit"));
		addToInventory(char,findItem("Tinderbox"));
		addToInventory(char,findItem("Torch",10));
		addToInventory(char,findItem("Rations",10));
		addToInventory(char,findItem("50 Foot of Rope"));
		addToInventory(char,findItem("Waterskin"));
	} else if (packname==="Burglar's Pack"){
		addToInventory(char,findItem("Backpack"));
		addToInventory(char,findItem("Ball Bearing",1000));
		addToInventory(char,findItem("10 Feet of String"));
		addToInventory(char,findItem("Bell"));
		addToInventory(char,findItem("Candle",5));
		addToInventory(char,findItem("Crowbar"));
		addToInventory(char,findItem("Hammer"));
		addToInventory(char,findItem("Piton",10));
		addToInventory(char,findItem("Hooded Lantern"));
		addToInventory(char,findItem("Flask of Oil",2));
		addToInventory(char,findItem("Rations",5));
		addToInventory(char,findItem("Tinderbox"));
		addToInventory(char,findItem("50 Foot of Rope"));
		addToInventory(char,findItem("Waterskin"));
	} else if (packname==="Diplomat's Pack"){
		addToInventory(char,findItem("Chest"));
		addToInventory(char,findItem("Scroll Case",2));
		addToInventory(char,findItem("Fine Clothes"));
		addToInventory(char,findItem("Bottle of Ink"));
		addToInventory(char,findItem("Ink Pen"));
		addToInventory(char,findItem("Lamp"));
		addToInventory(char,findItem("Flask of Oil",2));
		addToInventory(char,findItem("Sheet of Paper",5));
		addToInventory(char,findItem("Vial of Perfume"));
		addToInventory(char,findItem("Sealing Wax"));
		addToInventory(char,findItem("Soap"));
	} else if (packname==="Dungeoneer's Pack"){
		addToInventory(char,findItem("Backpack"));
		addToInventory(char,findItem("Crowbar"));
		addToInventory(char,findItem("Hammer"));
		addToInventory(char,findItem("Tinderbox"));
		addToInventory(char,findItem("Piton",10));
		addToInventory(char,findItem("Torch",10));
		addToInventory(char,findItem("Rations",10));
		addToInventory(char,findItem("50 Foot of Rope"));
		addToInventory(char,findItem("Waterskin"));
	} else if (packname==="Entertainer's Pack"){
		addToInventory(char,findItem("Backpack"));
		addToInventory(char,findItem("Bedroll"));
		addToInventory(char,findItem("Costume",2));
		addToInventory(char,findItem("Candle",5));
		addToInventory(char,findItem("Rations",5));
		addToInventory(char,findItem("Disguise Kit"));
		addToInventory(char,findItem("Waterskin"));
	} else if (packname==="Scholar's Pack"){
		addToInventory(char,findItem("Backpack"));
		addToInventory(char,findItem("Book of Lore"));
		addToInventory(char,findItem("Bottle of Ink"));
		addToInventory(char,findItem("Ink Pen"));
		addToInventory(char,findItem("Sheet of Parchment",10));
		addToInventory(char,findItem("Bag of Sand"));
		addToInventory(char,findItem("Small Knife"));
	} 
}

window.languages=['Language: Common','Language: Elvish','Language: Dwarven','Language: Gnomish','Language: Halfling','Language: Giant','Language: Orc','Language: Infernal','Language: Primordial','Language: Abyssal','Language: Celestial','Language: Draconic','Language: Deep Speech','Language: Sylvan','Language: Undercommon',"Language: Thieves' Cant","Language: Druidic"];


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

window.classes=[];
window.subclasses=[];
