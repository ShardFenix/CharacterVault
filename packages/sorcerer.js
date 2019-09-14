window.classes.push(
	{
		classname:"Sorcerer",
		name:"Sorcerer",
		description:"Magic is a part of every sorcerer, suffusing body, mind, and spirit with a latent power that waits to be tapped. Some sorcerers wield magic that springs from an ancient bloodline infused with the magic of dragons. Others carry a raw, uncontrolled magic within them, a chaotic storm that manifests in unexpected ways.\n\nThe appearance of sorcerous powers is wildly unpredictable. Some draconic bloodlines produce exactly one sorcerer in every generation, but in other lines of descent every individual is a sorcerer. Most of the time, the talents of sorcery appear as apparent flukes. Some sorcerers can't name the origin of their power, while others trace it to strange events in their own lives. The touch of a demon, the blessing of a dryad at a baby's birth, or a taste of the water from a mysterious spring might spark the gift of sorcery. So too might the gift of a deity of magic, exposure to the elemental forces of the Inner Planes or the maddening chaos of Limbo, or a glimpse into the inner workings of reality.",
		levels:[
			{ //1, first player level
				"updates":[
					{
						choices:[],
						action:function(char,derived,choice,$scope){
							char.maxHp=6;
							char.proficiencies.push("Saggers");
							char.proficiencies.push("Darts");
							char.proficiencies.push("Slings");
							char.proficiencies.push("Quarterstaffs");
							char.proficiencies.push("Light Crossbows");
							char.saves.con=1;
							char.saves.cha=1;
							addToInventory(findItem("Dagger",2));
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
						limit:2,
						choicePrompt:"Choose two skill proficiencies:",
						choices:[function(char){
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
						action:function(char,derived,choice){
							addProficiency(char,choice);
						}
					},
					{
						limit:4,
						choicePrompt:"Choose four cantrips",
						choices:[listUnknownSorcererCantrips],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
					helper.chooseSpell2,
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
					{
						limit:4,
						choicePrompt:"Choose four cantrips",
						choices:[listUnknownSorcererCantrips],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
					helper.chooseSpell2,
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
						choices:[],
						action:function(char,derived,choice){
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
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
						limit:2,
						choicePrompt:"Choose two metamagic feats.",
						choices:[function(char){
							let result=[findAbility('Careful Spell'),
										findAbility('Distant Spell'),
										findAbility('Empowered Spell'),
										findAbility('Extended Spell'),
										findAbility('Heightened Spell'),
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
							return result;
						}],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					},
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
					helper.asi,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
					helper.asi,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
										findAbility('Heightened Spell'),
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
							return result;
						}],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					},
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
					helper.asi
				]
			},{//13
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
					helper.asi
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
										findAbility('Heightened Spell'),
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
							return result;
						}],
						action:function(char,derived,choice){
							addAbility(char,choice);
						}
					},
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Sorcerer spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
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
					helper.asi
				]
			},{//20
				"updates":[
					helper.hitDice6,
					{
						choices:[],
						action:function(char){
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

window.abilities.append([
	{
		name:"Sorcery Point",
		description:"You can spend Sorcery points on Metamagic.",
		maxChargesFunction:function(char,scope){
			return getClassLevel(char,'Sorcerer');
		},
		charges:1,
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Favored by the Gods",
		description:"If you fail a saving throw or miss with an attack roll, you can roll 2d4 and add it to the total, possibly changing the outcome. Once you use this feature, you can't use it again until you finish a short or long rest.",
		charges:1,
		maxCharges:1,
		onShortRest:function(){
			this.charges=this.maxCharges;
		}
	},{
		name:"Unearthly Recovery",
		description:"You gain the ability to overcome grievous injuries. As a bonus action when you have fewer than half of your hit points remaining, you can regain a number of hit points equal to half your hit point maximum.\nOnce you use this feature, you can't use it again until you finish a long rest.",
		charges:1,
		maxCharges:1,
		onLongRest:function(){
			this.charges=this.maxCharges;
		}
	},{
		name:"Create Lv 1 Slot",
		description:"You spend 2 Sorcery Points as a bonus action to create a level 1 spell slot. This slot lasts until you take a long rest.",
		resourceName:"Sorcery Point",
		resourceCost:2
	},{
		name:"Create Lv 2 Slot",
		description:"You spend 3 Sorcery Points as a bonus action to create a level 2 spell slot. This slot lasts until you take a long rest.",
		resourceName:"Sorcery Point",
		resourceCost:3
	},{
		name:"Create Lv 3 Slot",
		description:"You spend 5 Sorcery Points as a bonus action to create a level 3 spell slot. This slot lasts until you take a long rest.",
		resourceName:"Sorcery Point",
		resourceCost:5
	},{
		name:"Create Lv 4 Slot",
		description:"You spend 6 Sorcery Points as a bonus action to create a level 4 spell slot. This slot lasts until you take a long rest.",
		resourceName:"Sorcery Point",
		resourceCost:6
	},{
		name:"Create Lv 5 Slot",
		description:"You spend 7 Sorcery Points as a bonus action to create a level 5 spell slot. This slot lasts until you take a long rest.",
		resourceName:"Sorcery Point",
		resourceCost:5
	},{
		name:"Careful Spell",
		description:"When you cast a spell that forces other creatures to make a saving throw, you can protect some of those creatures from the spell's full force. To do so, you spend 1 sorcery point and choose a number of those creatures up to your Charisma modifier (minimum of one creature). A chosen creature automatically succeeds on its saving throw against the spell.",
		resourceName:"Sorcery Point",
		resourceCost:1
	},{
		name:"Distant Spell",
		description:"When you cast a spell that has a range of 5 feet or greater, you can spend 1 sorcery point to double the range of the spell.\n\nWhen you cast a spell that has a range of touch, you can spend 1 sorcery point to make the range of the spell 30 feet.",
		resourceName:"Sorcery Point",
		resourceCost:1
	},{
		name:"Empowered Spell",
		description:"When you roll damage for a spell, you can spend 1 sorcery point to reroll a number of the damage dice up to your Charisma modifier (minimum of one). You must use the new rolls.\n\nYou can use Empowered Spell even if you have already used a different Metamagic option during the casting of the spell.",
		resourceName:"Sorcery Point",
		resourceCost:1
	},{
		name:"Extended Spell",
		description:"When you cast a spell that has a duration of 1 minute or longer, you can spend 1 sorcery point to double its duration, to a maximum duration of 24 hours.",
		resourceName:"Sorcery Point",
		resourceCost:1
	},{
		name:"Heightened Spell",
		description:"When you cast a spell that forces a creature to make a saving throw to resist its effects, you can spend 3 sorcery points to give one target of the spell disadvantage on its first saving throw made against the spell.",
		resourceName:"Sorcery Point",
		resourceCost:3
	},{
		name:"Quickened Spell",
		description:"When you cast a spell that has a casting time of 1 action, you can spend 2 sorcery points to change the casting time to 1 bonus action for this casting.",
		resourceName:"Sorcery Point",
		resourceCost:2
	},{
		name:"Subtle Spell",
		description:"When you cast a spell, you can spend 1 sorcery point to cast it without any somatic or verbal components.",
		resourceName:"Sorcery Point",
		resourceCost:1
	},{
		name:"Twinned Spell",
		description:"When you cast a spell that doesn't have a range of self and is incapable of targeting more than one creature at the spell's current level, you can spend a number of sorcery points equal to the spell's level to target a second creature in range with the same spell (1 sorcery point if the spell is a cantrip).\n\nTo be eligible, a spell must be incapable of targeting more than one creature at the spell's current level. For example, magic missile and scorching ray aren't eligible, but ray of frost and chromatic orb are.",
		resourceName:"Sorcery Point",
		resourceCost:1
	}
]);

window.passives.append([
	{
		name:"Empowered Healing",
		description:"The divine energy coursing through you can empower healing spells. Whenever you or an ally within 5 feet of you rolls dice to determine the number of hit points a spell restores, you can spend 1 sorcery point to reroll any number of those dice once, provided you aren't incapacitated. You can use this feature only once per turn."
	},{
		name:"Otherworldly Wings",
		description:"You can use a bonus action to manifest a pair of spectral wings from your back. While the wings are present, you have a flying speed of 30 feet. The wings last until you're incapacitated, you die, or you dismiss them as a bonus action.\nThe affinity you chose for your Divine Magic feature determines the appearance of the spectral wings: eagle wings for good or law, bat wings for evil or chaos, and dragonfly wings for neutrality."
	},{
		name:"Flexible Casting",
		description:"As a bonus action on your turn, you can expend one spell slot and gain a number of sorcery points equal to that slot's level."
	}
]);