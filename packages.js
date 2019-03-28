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

window.languages=['Language: Common','Language: Elven','Language: Dwarven','Language: Gnomish','Language: Halfling','Language: Giant','Language: Orc','Language: Infernal','Language: Primordial','Language: Abyssal','Language: Celestial','Language: Draconic','Language: Deep Speech','Language: Sylvan','Language: Undercommon',"Language: Thieves' Cant","Language: Druidic"];


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

window.classes=
[
	{
		classname:"Bard",
		name:"Bard",
		description:"In the worlds of D&D, words and music are not just vibrations of air, but vocalizations with power all their own. The bard is a master of song, speech, and the magic they contain. Bards say that the multiverse was spoken into existence, that the words of the gods gave it shape, and that echoes of these primordial Words of Creation still resound throughout the cosmos. The music of bards is an attempt to snatch and harness those echoes, subtly woven into their spells and powers.\nThe greatest strength of bards is their sheer versatility. Many bards prefer to stick to the sidelines in combat, using their magic to inspire their allies and hinder their foes from a distance. But bards are capable of defending themselves in melee if necessary, using their magic to bolster their swords and armor. Their spells lean toward charms and illusions rather than blatantly destructive spells. They have a wide-ranging knowledge of many subjects and a natural aptitude that lets them do almost anything well. Bards become masters of the talents they set their minds to perfecting, from musical performance to esoteric knowledge.",
		levels:[
			{ //1, first player level
				updates:[
					{
						"choices":[],
						"action":function(char,derived,choice){
							char.maxHp=8;
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
						"choices":[listSimpleWeapons,findItem("Longsword"),findItem("Rapier")],
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
								scope.updateStep+=2;//exit this level up
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
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived){
							addPassive(char,"Countercharm");
						}
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
			},{//7
				"updates":[
					helper.hitDice8,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
			},{//9
				"updates":[
					helper.hitDice8,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							removeAbility(char,"Bardic Inspiration (d8)");
							addAbility(char,"Bardic Inspiration (d10)");
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
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
			},{//11
				"updates":[
					helper.hitDice8,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
			},{//13
				"updates":[
					helper.hitDice8,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
			},{//14
				"updates":[
					helper.hitDice8,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
			},{//15
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							removeAbility(char,"Bardic Inspiration (d10)");
							addAbility(char,"Bardic Inspiration(d12)");
						}
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
			},{//17
				"updates":[
					helper.hitDice8,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
			},{//19
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
					helper.hitDice8,
					{
						choices:[],
						action:function(char){
							addPassive(char,"Superior Inspiration");
						}
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Bard spells?",
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
			}
		]
	},
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
	},{
		classname:"Monk",
		name:"Monk",
		description:"Monks make careful study of a magical energy that most monastic traditions call ki. This energy is an element of the magic that suffuses the multiverse—specifically, the element that flows through living bodies. Monks harness this power within themselves to create magical effects and exceed their bodies' physical capabilities, and some of their special attacks can hinder the flow of ki in their opponents. Using this energy, monks channel uncanny speed and strength into their unarmed strikes. As they gain experience, their martial training and their mastery of ki gives them more power over their bodies and the bodies of their foes.",
		levels:[
			{ //1, first player level
				"updates":[
					{
						"choices":[],
						"action":function(char,derived,choice,$scope){
							char.maxHp=8;
							char.proficiencies.push("Shortswords");
							char.proficiencies.push("Simple Weapons");
							char.saves.str=1;
							char.saves.dex=1;
							addToInventory(findItem("Dart",10));
							addPassive(char,"Martial Arts");
							addPassive(char,"Unarmored Movement");
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[findItem("Shortsword"),listSimpleWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a pack:",
						choices:[findItem("Dungeoneer's Pack"),findItem("Explorer's Pack")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Acrobatics","Athletics","History","Insight","Religion","Stealth"].indexOf(skill.name)!=-1){
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
									if (["Acrobatics","Athletics","History","Insight","Religion","Stealth"].indexOf(skill.name)!=-1){
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
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addPassive(char,"Martial Arta");
							addPassive(char,"Unarmored Defense");
						}
					}
				]
			}, { // 2
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addPassive(char,"Flurry of Blows");
							addPassive(char,"Patient Defense");
							addPassive(char,"Step of the Wind");
							addPassive(char,"Unarmored Movement");
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice8,
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Deflect Missiles");
						}
					},{
						choicePrompt:"Choose a Monastic Tradition",
						choices:[listSpecializations],
						action:function(char,derived,choice){
							addSubclass(char,"Monk",choice);
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
							addPassive(char,"Slow Fall");
							addPassive(char,"Stunning Strike");
						}
					}
				]
			},{//6
				"updates":[
					helper.hitDice8
				]
			},{//7
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived){
							addPassive(char,"Evasion");
							addPassive(char,"Stillness of Mind");
						}
					}
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
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived){
							addPassive(char,"Parkour");
						}
					}
				]
			},{//10
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Purity of Body");
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
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Tongue of the Sun and Moon");
						}
					}
				]
			},{//14
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Diamond Soul");
						}
					}
				]
			},{//15
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Timeless Body");
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
						"choices":[],
						"action":function(char){
							addPassive(char,"Empty Body");
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
						"choices":[],
						"action":function(char){
							addPassive(char,"Perfect Soul");
						}
					}
				]
			}
		]
	},{
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
];

window.subclasses=
[
	{
		classname:"Bard",
		name:"College of Lore",
		subclass:"College of Lore",
		description:"Bards of the College of Lore know something about most things, collecting bits of knowledge from sources as diverse as scholarly tomes and peasant tales. Whether singing folk ballads in taverns or elaborate compositions in royal courts, these bards use their gifts to hold audiences spellbound. When the applause dies down, the audience members might find themselves questioning everything they held to be true, from their faith in the priesthood of the local temple to their loyalty to the king.\nThe loyalty of these bards lies in the pursuit of beauty and truth, not in fealty to a monarch or following the tenets of a deity. A noble who keeps such a bard as a herald or advisor knows that the bard would rather be honest than politic.\nThe college's members gather in libraries and sometimes in actual colleges, complete with classrooms and dormitories, to share their lore with one another. They also meet at festivals or affairs of state, where they can expose corruption, unravel lies, and poke fun at self-important figures of authority.",
		levels:[
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
	},
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
	},{
		classname:"Monk",
		name:"Ninjutsu",
		subclass:"Ninjutsu",
		description:"Ninjas are masters of subterfuge, masters of evading detection. They are often hired by powerful political figures for spying and/or assassination duties. In combat, ninjas are masters of dextrous close-quarters combat, being easily able to strike swiftly with deadly accuracy and slipping away from attackers.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						choices:[],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Way of the Mantis");
							addPassive(char,"Shadow Form");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Master of Infiltration");
						}
					}
				]
			},{},{},{},{},
			{//11
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Shadow Strike");
						}
					}
				]
			},{},{},{},{},{},
			{//17
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Desperate Strike");
						}
					}
				]
			},{},{},{}
		]
	},{
		classname:"Monk",
		name:"Way of Enlightenment",
		subclass:"Way of Enlightenment",
		description:"Monks on the Path of Enlightenment seek to become one with the world around them. Through intense study and meditation, enlightened monks are able to feel their surroundings, not only in place but in time. This path rewards monks who manage their Ki points well.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						choices:[],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Supernatural Awareness");
							addPassive(char,"Bonus Reaction");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"See the Code");
						}
					}
				]
			},{},{},{},{},
			{//11
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Zen Meditation");
						}
					}
				]
			},{},{},{},{},{},
			{//17
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Enlightened Strike");
						}
					}
				]
			},{},{},{}
		]
	},{
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
];