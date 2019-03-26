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
	},{
		name:"Channel Divinity",
		description:"You gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects.\nWhen you use your Channel Divinity, you choose which effect to create. You must then finish a short or long rest to use your Channel Divinity again.\nSome Channel Divinity effects require saving throws. When you use such an effect from this class, the DC equals your cleric spell save DC.",
		maxChargesFunction:function(char){
			let lvl = getClassLevel(char,"Cleric");
			if (lvl>=18) return 3;
			if (lvl>=6) return 2;
			if (lvl>=2) return 1;
			return 0;
		},
		charges:1,
		onShortRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Divine Intervention",
		description:"You can call on your deity to intervene on your behalf when your need is great.\nImploring your deity's aid requires you to use your action. Describe the assistance you seek, and roll percentile dice. If you roll a number equal to or lower than your cleric level, your deity intervenes. The DM chooses the nature of the intervention; the effect of any cleric spell or cleric domain spell would be appropriate. If your deity intervenes, you can't use this feature again for 7 days. Otherwise, you can use it again after you finish a long rest.",
		maxCharges:1,
		charges:1,
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Improved Divine Intervention",
		description:"You can call on your deity to intervene on your behalf when your need is great.\nImploring your deity's aid requires you to use your action. Describe the assistance you seek. Your deity intervenes. The DM chooses the nature of the intervention; the effect of any cleric spell or cleric domain spell would be appropriate. You can't use this feature again for 7 days.",
		maxCharges:1,
		charges:1,
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
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
	},{
		name:"Turn Undead",
		description:"Using your Channel Divinity action, you present your holy symbol and speak a prayer censuring the undead. Each undead that can see or hear you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.\nA turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can use the Dodge action."
	},{
		name:"Destroy Undead (CR 1/2)",
		description:"When an undead of CR 1/2 or lower fails its saving throw against your Turn Undead feature, the creature is instantly destroyed."
	},{
		name:"Destroy Undead (CR 1)",
		description:"When an undead of CR 1 or lower fails its saving throw against your Turn Undead feature, the creature is instantly destroyed."
	},{
		name:"Destroy Undead (CR 2)",
		description:"When an undead of CR 2 or lower fails its saving throw against your Turn Undead feature, the creature is instantly destroyed."
	},{
		name:"Destroy Undead (CR 3)",
		description:"When an undead of CR 3 or lower fails its saving throw against your Turn Undead feature, the creature is instantly destroyed."
	},{
		name:"Destroy Undead (CR 4)",
		description:"When an undead of CR 4 or lower fails its saving throw against your Turn Undead feature, the creature is instantly destroyed."
	},{
		name:"Disciple of Life",
		description:"Whenever you use a spell of 1st level or higher to restore hit points to a creature, the creature regains additional hit points equal to 2 + the spell's level."
	},{
		name:"Preserve Life",
		description:"Using your Channel Divinity action, you present your holy symbol and evoke healing energy that can restore a number of hit points equal to five times your cleric level. Choose any creatures within 30 feet of you, and divide those hit points among them. This feature can restore a creature to no more than half of its hit point maximum. You can't use this feature on an undead or a construct."
	},{
		name:"Blessed Healer",
		description:"When you cast a spell of 1st level or higher that restores hit points to a creature other than you, you regain hit points equal to 2 + the spell's level."
	},{
		name:"Divine Strike",
		description:"Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra ${ladder(clevel,8,1,14,2)}d8 radiant damage to the target."
	},{
		name:"Supreme Healing",
		description:"When you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die."
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
	},
	{
		classname:"Cleric",
		name:"Cleric",
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
		"classname":"Debug",
		"levels":[
			{
				"updates":[
					{
						choices:[findItem("Greatsword"),findItem("Longsword"),findItem("Dagger"),findItem("Halberd")],
						action:function(){}
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
	}
];