window.classes.push(
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
							addToInventory(char,findItem("Leather Armor"));
							addToInventory(char,findItem("Dagger"));
						}
					},
					helper.learnInstrument,
					helper.learnInstrument,
					helper.learnInstrument,
					helper.learnSkillProficiency,
					helper.learnSkillProficiency,
					helper.learnSkillProficiency,
					{
						"choicePrompt":"Choose a weapon to start with",
						"choices":[listSimpleWeapons,findItem("Longsword"),findItem("Rapier")],
						"action":function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						"choicePrompt":"Choose a pack",
						"choices":[findItem("Diplomat's Pack"),findItem("Entertainer's Pack")],
						"action":function(char,derived,choice){
							openPack(char,choice);
						}
					},
					helper.chooseBardCantrip,
					helper.chooseBardCantrip,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},	{ // 1
				"updates":[
					helper.hitDice8,
					helper.chooseBardCantrip,
					helper.chooseBardCantrip,
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
					helper.chooseBardCantrip,
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
					helper.chooseBardCantrip,
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
	}
);

window.subclasses.push(
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
	}
);