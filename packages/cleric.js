window.abilities.append([
	{
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
	},{
		name:"Preserve Life",
		description:"Using your Channel Divinity action, you present your holy symbol and evoke healing energy that can restore a number of hit points equal to five times your cleric level. Choose any creatures within 30 feet of you, and divide those hit points among them. This feature can restore a creature to no more than half of its hit point maximum. You can't use this feature on an undead or a construct.",
		resourceName:"Channel Divinity",
		resourceCost:1
	},{
		name:"Turn Undead",
		description:"Using your Channel Divinity action, you present your holy symbol and speak a prayer censuring the undead. Each undead that can see or hear you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.\nA turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can use the Dodge action.",
		resourceName:"Channel Divinity",
		resourceCost:1
	}
]);

window.passives.append([
	{
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
		name:"Blessed Healer",
		description:"When you cast a spell of 1st level or higher that restores hit points to a creature other than you, you regain hit points equal to 2 + the spell's level."
	},{
		name:"Divine Strike",
		description:"Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra ${ladder(clevel,8,1,14,2)}d8 radiant damage to the target."
	},{
		name:"Supreme Healing",
		description:"When you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die."
	}
]);

window.classes.push(
	{
		classname:"Cleric",
		name:"Cleric",
		description:"Divine magic, as the name suggests, is the power of the gods, flowing from them into the world. Clerics are conduits for that power, manifesting it as miraculous effects. The gods don't grant this power to everyone who seeks it, but only to those chosen to fulfill a high calling.\nHarnessing divine magic doesn't rely on study or training. A cleric might learn formulaic prayers and ancient rites, but the ability to cast cleric spells relies on devotion and an intuitive sense of a deity's wishes.\nClerics combine the helpful magic of healing and inspiring their allies with spells that harm and hinder foes. They can provoke awe and dread, lay curses of plague or poison, and even call down flames from heaven to consume their enemies. For those evildoers who will benefit most from a mace to the head, clerics depend on their combat training to let them wade into melee with the power of the gods on their side.",
		levels:[
			{ //1, first player level
				summary:[
					{name:"Proficiencies",description:"Light Armor, Simple Weapons, Medium Armor, Shields, Wisdom saves, Charisma saves"},
					{name:"Starting Equipment",description:"Mace or Warhammer, A simple weapon, Scale Mail or Leather Armor or Chain Mail"},
					{name:"Skill Proficiencies",description:"Two from History, Religion, Insight, Medicine, Persuasion"},
					{name:"Divine Domain",description:"You choose your divine domain"}
				],
				"updates":[
					{
						choicePrompt:"You gain the following proficiencies",
						choices:["Light Armor","Medium Armor","Shields","Simple Weapons"],
						action:function(char,derived,choice,$scope){
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
						choicePrompt:"Choose two skill proficiencies:",
						choices:[function(char){
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
						action:function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						choicePrompt:"Choose two skill proficiencies:",
						choices:[function(char){
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
						action:function(char,derived,choice){
							addProficiency(char,choice);
						}
					},
					helper.chooseClericCantrip,
					helper.chooseClericCantrip,
					helper.chooseClericCantrip,
					{
						choicePrompt:"Choose a Divine Domain:",
						choices:[listSpecializations],
						action:function(char,derived,choice){
							addSubclass(char,"Cleric",choice);
						}
					}
				]
			},	{ // 1
				"updates":[
					helper.hitDice8,
					{
						summary:{name:"Divine Domain",description:"You choose your divine domain"},
						choicePrompt:"Choose a Divine Domain:",
						choices:[listSpecializations],
						action:function(char,derived,choice,$scope){
							learnAllClassSpells(char,$scope);
							addSubclass(char,"Cleric",choice);
						}
					}
				]
			}, { // 2
				summary:[
					findAbility("Channel Divinity"),
					findAbility("Turn Undead")
				],
				"updates":[
					helper.hitDice8,
					{
						choicePrompt:"You gain the following",
						choices:[findAbility("Channel Divinity"),findAbility("Turn Undead")],
						action:function(char,derived,choice){
							addAbility(char,"Channel Divinity");
							addAbility(char,"Turn Undead");
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
						summary:findPassive("Destroy Undead (CR 1/2)"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Destroy Undead (CR 1/2)")],
						action:function(char,derived){
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
						summary:findPassive("Destroy Undead (CR 1)"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Destroy Undead (CR 1)")],
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
						summary:findAbility("Divine Intervention"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Divine Intervention")],
						action:function(char){
							addAbility(char,"Divine Intervention");
						}
					}
				]
			},{//11
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Destroy Undead (CR 2)"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Destroy Undead (CR 2)")],
						action:function(char){
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
						summary:findPassive("Destroy Undead (CR 3)"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Destroy Undead (CR 3)")],
						action:function(char){
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
						summary:findPassive("Destroy Undead (CR 4)"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Destroy Undead (CR 4)")],
						action:function(char){
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
						summary:findAbility("Improved Divine Intervention"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Improved Divine Intervention")],
						action:function(char){
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
						summary:findPassive("Disciple of Life"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Disciple of Life")],
						action:function(char,derived,choice,$scope){
							char.proficiencies.upush("Heavy Armor");
							addPassive(char,"Disciple of Life");
						}
					}
				]
			},{ //2
				updates:[
					{
						summary:findAbility("Preserve Life"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Preserve Life")],
						action:function(char){
							addAbility(char,"Preserve Life");
						}
					}
				]
			},{},{},{},
			{//6
				updates:[
					{
						summary:findPassive("Blessed Healer"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Blessed Healer")],
						action:function(char,derived,choice){
							addPassive(char,"Blessed Healer");
						}
					}				]
			},{},
			{//8
				updates:[
					{
						summary:findPassive("Divine Strike"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Divine Strike")],
						action:function(char){
							addPassive(char,"Divine Strike");
						}
					}
				]
			},{},{},{},{},{},{},{},{},
			{//18
				updates:[
					{
						summary:findPassive("Supreme Healing"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Supreme Healing")],
						action:function(char){
							addPassive("Supreme Healing");
						}
					}
				]
			}
		]
	}
);
