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
		name:"Destructive Wrath",
		description:"You can use your Channel Divinity to wield the power of the storm with unchecked ferocity. When you roll lightning or thunder damage, you can use your Channel Divinity to deal maximum damage, instead of rolling.",
		resourceName:"Channel Divinity",
		resourceCost:1
	},{
		name:"Turn Undead",
		description:"Using your Channel Divinity action, you present your holy symbol and speak a prayer censuring the undead. Each undead that can see or hear you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.\nA turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can use the Dodge action.",
		resourceName:"Channel Divinity",
		resourceCost:1
	},{
		name:"Wrath of the Storm",
		description:"You can thunderously rebuke attackers. When a creature within 5 feet of you that you can see hits you with an attack, you can use your reaction to cause the creature to make a Dexterity saving throw. The creature takes 2d8 lightning or thunder damage (your choice) on a failed saving throw, and half as much damage on a successful one.\n\nYou can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		},
		maxChargesFunction:function(char,scope){
			return scope.derived.modifiers.wis;
		}
	},{
		name:"War Priest",
		description:"Your god delivers bolts of inspiration to you while you are engaged in battle. When you use the Attack action, you can make one weapon attack as a bonus action. You can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		},
		maxChargesFunction:function(char,scope){
			return scope.derived.modifiers.wis;
		}
	},{
		name:"Guided Strike",
		description:"You can use your Channel Divinity to strike with supernatural accuracy. When you make an attack roll, you can use your Channel Divinity to gain a +10 bonus to the roll. You make this choice after you see the roll, but before the DM says whether the attack hits or misses.",
		resourceName:"Channel Divinity",
		resourceCost:1
	},{
		name:"War God's Blessing",
		description:"When a creature within 30 feet of you makes an attack roll, you can use your reaction to grant that creature a +10 bonus to the roll, using your Channel Divinity. You make this choice after you see the roll, but before the DM says whether the attack hits or misses.",
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
	},{
		name:"Thunderbolt Strike",
		description:"When you deal lightning damage to a Large or smaller creature, you can also push it up to 10 feet away from you."
	},{
		name:"Divine Strike (1d8)",
		description:"You gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 thunder damage to the target. When you reach 14th level, the extra damage increases to 2d8."
	},{
		name:"Divine Strike (2d8)",
		description:"You gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 2d8 thunder damage to the target."
	},{
		name:"Stormborn",
		description:"You have a flying speed equal to your current walking speed whenever you are not underground or indoors."
	},{
		name:"Avatar of Battle",
		description:"You gain resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons."
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
						limit:2,
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
						limit:3,
						choicePrompt:"Choose three cantrips",
						choices:[listUnknownClericCantrips],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},{
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
					helper.asi
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
					helper.asi
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
					helper.asi
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
					helper.asi
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
					helper.asi
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
							getPlayerSpell(char,"Cure Wounds","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Bless","Cleric").alwaysPrepared=true;
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
			},{ //3
				updates:[
					{
						choices:[],
						action:function(char){
							getPlayerSpell(char,"Spiritual Weapon","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Lesser Restoration","Cleric").alwaysPrepared=true;
						}
					}
				]
			},{},{ //5
				updates:[
					{
						choices:[],
						action:function(char){
							getPlayerSpell(char,"Beacon of Hope","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Revivify","Cleric").alwaysPrepared=true;
						}
					}
				]
			},
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
			},{ //7
				updates:[
					{
						choices:[],
						action:function(char){
							getPlayerSpell(char,"Death Ward","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Guardian of Faith","Cleric").alwaysPrepared=true;
						}
					}
				]
			},
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
			},{ //9
				updates:[
					{
						choices:[],
						action:function(char){
							getPlayerSpell(char,"Mass Cure Wounds","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Raise Dead","Cleric").alwaysPrepared=true;
						}
					}
				]
			},{},{},{},{},{},{},{},
			{//17
				updates:[
					{
						summary:findPassive("Supreme Healing"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Supreme Healing")],
						action:function(char){
							addPassive(char,"Supreme Healing");
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
		name:"War Domain",
		subclass:"War Domain",
		description:"War has many manifestations. It can make heroes of ordinary people. It can be desperate and horrific, with acts of cruelty and cowardice eclipsing instances of excellence and courage. In either case, the gods of war watch over warriors and reward them for their great deeds. The clerics of such gods excel in battle, inspiring others to fight the good fight or offering acts of violence as prayers. Gods of war include champions of honor and chivalry (such as Torm, Heironeous, and Kiri-Jolith) as well as gods of destruction and pillage (such as Erythnul, the Fury, Gruumsh, and Ares) and gods of conquest and domination (such as Bane, Hextor, and Maglubiyet). Other war gods (such as Tempus, Nike, and Nuada) take a more neutral stance, promoting war in all its manifestations and supporting warriors in any circumstance.",
		levels:[{},
			{//1
				updates:[
					{
						summary:findAbility("War Priest"),
						choicePrompt:"You gain the following",
						choices:[findAbility("War Priest")],
						action:function(char,derived,choice,$scope){
							char.proficiencies.upush("Heavy Armor");
							char.proficiencies.upush("Martial Weapons");
							addAbility(char,"War Priest");
							getPlayerSpell(char,"Divine Favor","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Shield of Faith","Cleric").alwaysPrepared=true;
						}
					}
				]
			},{ //2
				updates:[
					{
						summary:findAbility("Guided Strike"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Guided Strike")],
						action:function(char){
							addAbility(char,"Guided Strike");
						}
					}
				]
			},{ //3
				updates:[
					{
						choices:[],
						action:function(char){
							getPlayerSpell(char,"Spiritual Weapon","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Magic Weapon","Cleric").alwaysPrepared=true;
						}
					}
				]
			},{},{ //5
				updates:[
					{
						choices:[],
						action:function(char){
							getPlayerSpell(char,"Spirit Guardians","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Crusader's Mantle","Cleric").alwaysPrepared=true;
						}
					}
				]
			},
			{//6
				updates:[
					{
						summary:findAbility("War God's Blessing"),
						choicePrompt:"You gain the following",
						choices:[findAbility("War God's Blessing")],
						action:function(char,derived,choice){
							addAbility(char,"War God's Blessing");
						}
					}
				]
			},{ //7
				updates:[
					{
						choices:[],
						action:function(char){
							getPlayerSpell(char,"Freedom of Movement","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Stoneskin","Cleric").alwaysPrepared=true;
						}
					}
				]
			},
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
			},{ //9
				updates:[
					{
						choices:[],
						action:function(char){
							getPlayerSpell(char,"Flame Strike","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Hold Monster","Cleric").alwaysPrepared=true;
						}
					}
				]
			},{},{},{},{},{},{},{},
			{//17
				updates:[
					{
						summary:findPassive("Avatar of Battle"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Avatar of Battle")],
						action:function(char){
							addPassive(char,"Avatar of Battle");
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
		name:"Tempest Domain",
		subclass:"Tempest Domain",
		description:"Gods whose portfolios include the Tempest domain—including Talos, Umberlee, Kord, Zeboim, the Devourer, Zeus, and Thor—govern storms, sea, and sky. They include gods of lightning and thunder, gods of earthquakes, some fire gods, and certain gods of violence, physical strength, and courage. In some pantheons, a god of this domain rules over other deities and is known for swift justice delivered by thunderbolts. In the pantheons of seafaring people, gods of this domain are ocean deities and the patrons of sailors. Tempest gods send their clerics to inspire fear in the common folk, either to keep those folk on the path of righteousness or to encourage them to offer sacrifices of propitiation to ward off divine wrath.",
		levels:[{},
			{//1
				updates:[
					{
						summary:findAbility("Wrath of the Storm"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Wrath of the Storm")],
						action:function(char,derived,choice,$scope){
							char.proficiencies.upush("Heavy Armor");
							char.proficiencies.upush("Martial Weapons");
							addAbility(char,"Wrath of the Storm");
							addSpell(char,"Fog Cloud","Cleric");
							addSpell(char,"Thunderwave","Cleric");
							getPlayerSpell(char,"Fog Cloud","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Thunderwave","Cleric").alwaysPrepared=true;
						}
					}
				]
			},{ //2
				updates:[
					{
						summary:findAbility("Destructive Wrath"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Destructive Wrath")],
						action:function(char){
							addAbility(char,"Destructive Wrath");
						}
					}
				]
			},{ //3
				updates:[
					{
						choices:[],
						action:function(char){
							getPlayerSpell(char,"Gust of Wind","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Shatter","Cleric").alwaysPrepared=true;
						}
					}
				]
			},{},{ //5
				updates:[
					{
						choices:[],
						action:function(char){
							getPlayerSpell(char,"Call Lightning","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Sleet Storm","Cleric").alwaysPrepared=true;
						}
					}
				]
			},
			{//6
				updates:[
					{
						summary:findPassive("Thunderbolt Strike"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Thunderbolt Strike")],
						action:function(char,derived,choice){
							addPassive(char,"Thunderbolt Strike");
						}
					}				]
			},{ //7
				updates:[
					{
						choices:[],
						action:function(char){
							getPlayerSpell(char,"Control Weather","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Ice Storm","Cleric").alwaysPrepared=true;
						}
					}
				]
			},
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
			},{ //9
				updates:[
					{
						choices:[],
						action:function(char){
							getPlayerSpell(char,"Destructive Wave","Cleric").alwaysPrepared=true;
							getPlayerSpell(char,"Insect Plague","Cleric").alwaysPrepared=true;
						}
					}
				]
			},{},{},{},{},{},{},{},
			{//17
				updates:[
					{
						summary:findPassive("Stormborn"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Stormborn")],
						action:function(char){
							addPassive(char,"Stormborn");
						}
					}
				]
			}
		]
	}
);

