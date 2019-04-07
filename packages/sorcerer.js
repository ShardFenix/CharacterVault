window.classes.push(
	{
		classname:"Sorcerer",
		name:"Sorcerer",
		description:"Magic is a part of every sorcerer, suffusing body, mind, and spirit with a latent power that waits to be tapped. Some sorcerers wield magic that springs from an ancient bloodline infused with the magic of dragons. Others carry a raw, uncontrolled magic within them, a chaotic storm that manifests in unexpected ways.\n\nThe appearance of sorcerous powers is wildly unpredictable. Some draconic bloodlines produce exactly one sorcerer in every generation, but in other lines of descent every individual is a sorcerer. Most of the time, the talents of sorcery appear as apparent flukes. Some sorcerers can't name the origin of their power, while others trace it to strange events in their own lives. The touch of a demon, the blessing of a dryad at a baby's birth, or a taste of the water from a mysterious spring might spark the gift of sorcery. So too might the gift of a deity of magic, exposure to the elemental forces of the Inner Planes or the maddening chaos of Limbo, or a glimpse into the inner workings of reality.",
		levels:[
			{ //1, first player level
				"updates":[
					{
						"choices":[],
						"action":function(char,derived,choice,$scope){
							char.maxHp=6;
							char.proficiencies.push("Saggers");
							char.proficiencies.push("Darts");
							char.proficiencies.push("Slings");
							char.proficiencies.push("Quarterstaffs");
							char.proficiencies.push("Light Crossbows");
							char.saves.con=1;
							char.saves.cha=1;
							addToInventory(findItem("Dagger",2));
							addPassive(char,"Martial Arts");
							addPassive(char,"Unarmored Movement");
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[findItem("Light Crossbow"),listSimpleWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
							if (choice==='Light Crossbow'){
								addToInventory(char,findItem('Bolt',20));
							}
						}
					},{
						choicePrompt:"Choose a pack:",
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
									if (["Arcana","Deception","Insight","Intimidation","Persuasion","Religion"].indexOf(skill.name)!=-1){
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
									if (["Arcana","Deception","Insight","Intimidation","Persuasion","Religion"].indexOf(skill.name)!=-1){
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
					helper.chooseSorcererCantrip,
					helper.chooseSorcererCantrip,
					helper.chooseSorcererCantrip,
					helper.chooseSorcererCantrip,
					helper.chooseSpell,
					helper.chooseSpell,
					{
						choicePrompt:"Choose a Sorcerous Origin",
						choices:[listSpecializations],
						action:function(char,derived,choice){
							addSubclass(char,"Sorcerer",choice);
						}
					}
				]
			},	{ // 1
				"updates":[
					helper.hitDice6,
					helper.chooseSorcererCantrip,
					helper.chooseSorcererCantrip,
					helper.chooseSorcererCantrip,
					helper.chooseSorcererCantrip,
					helper.chooseSpell,
					helper.chooseSpell,
					{
						choicePrompt:"Choose a Sorcerous Origin",
						choices:[listSpecializations],
						action:function(char,derived,choice){
							addSubclass(char,"Sorcerer",choice);
						}
					}
				]
			}, { // 2
				"updates":[
					helper.hitDice6,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addAbility(char,"Sorcery Point");
							addAbility(char,"Create Lv 1 Slot");
							addAbility(char,"Create Lv 2 Slot");
							addAbility(char,"Create Lv 3 Slot");
							addAbility(char,"Create Lv 4 Slot");
							addAbility(char,"Create Lv 5 Slot");
						}
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			}, { // 3
				"updates":[
					helper.hitDice6,
					{
						choicePrompt:"Choose two metamagic feats.",
						choices:[function(char){
							let result=[findAbility('Careful Spell'),
										findAbility('Distant Spell'),
										findAbility('Empowered Spell'),
										findAbility('Extended Spell'),
										findAbility('Hightened Spell'),
										findAbility('Quickened Spell'),
										findAbility('Subtle Spell'),
										findAbility('Twinned Spell')];
							for (let abil of char.abilities){
								for (let i=0;i<result.length;i++){
									if (abil.name===result[i].name){
										result.splice(i,1);
										i=result.length;
									}
								}
							}
						}],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					},{
						choicePrompt:"Choose two metamagic feats.",
						choices:[function(char){
							let result=[findAbility('Careful Spell'),
										findAbility('Distant Spell'),
										findAbility('Empowered Spell'),
										findAbility('Extended Spell'),
										findAbility('Hightened Spell'),
										findAbility('Quickened Spell'),
										findAbility('Subtle Spell'),
										findAbility('Twinned Spell')];
							for (let abil of char.abilities){
								for (let i=0;i<result.length;i++){
									if (abil.name===result[i].name){
										result.splice(i,1);
										i=result.length;
									}
								}
							}
						}],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			}, { // 4
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//5
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//6
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//7
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
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
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//9
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//10
				"updates":[
					helper.hitDice6,
					{
						choicePrompt:"Choose a metamagic feat.",
						choices:[function(char){
							let result=[findAbility('Careful Spell'),
										findAbility('Distant Spell'),
										findAbility('Empowered Spell'),
										findAbility('Extended Spell'),
										findAbility('Hightened Spell'),
										findAbility('Quickened Spell'),
										findAbility('Subtle Spell'),
										findAbility('Twinned Spell')];
							for (let abil of char.abilities){
								for (let i=0;i<result.length;i++){
									if (abil.name===result[i].name){
										result.splice(i,1);
										i=result.length;
									}
								}
							}
						}],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//11
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//12
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//13
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//14
				"updates":[
					helper.hitDice6
				]
			},{//15
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//16
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//17
				"updates":[
					helper.hitDice6,
					{
						choicePrompt:"Choose a metamagic feat.",
						choices:[function(char){
							let result=[findAbility('Careful Spell'),
										findAbility('Distant Spell'),
										findAbility('Empowered Spell'),
										findAbility('Extended Spell'),
										findAbility('Hightened Spell'),
										findAbility('Quickened Spell'),
										findAbility('Subtle Spell'),
										findAbility('Twinned Spell')];
							for (let abil of char.abilities){
								for (let i=0;i<result.length;i++){
									if (abil.name===result[i].name){
										result.splice(i,1);
										i=result.length;
									}
								}
							}
						}],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Sorcerer spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell
				]
			},{//18
				"updates":[
					helper.hitDice6
				]
			},{//19
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//20
				"updates":[
					helper.hitDice6,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Sorcerous Restoration");
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Sorcerer",
		name:"Divine Soul",
		subclass:"Divine Soul",
		description:"",
		levels:[{},
			{//1
				updates:[
					{
						choices:[],
						action:function(char){
							getCharacterClass(char,"Sorcerer").spellcasting.push('Cleric');
						}
					}
				]
			},{},
			{//3
				updates:[
					{
						choicePrompt:"Choose a Divine spell.",
						choices:[findSpell('Cure Wounds'),findSpell('Inflict Wounds'),findSpell('Bless'),findSpell('Bane'),findSpell('Protection from Evil and Eood')],
						action:function(char,derived,choice,$scope){
							addAbility(char,"Favored by the Gods");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Empowered Healing");
						}
					}
				]
			},{},{},{},{},{},{},{},
			{//14
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Otherworldly Wings");
						}
					}
				]
			},{},{},{},
			{//18
				updates:[
					{
						choices:[],
						action:function(char){
							addAbility(char,"Unearthly Recovery");
						}
					}
				]
			},{},{}
		]
	}
);
