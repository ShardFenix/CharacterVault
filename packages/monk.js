
window.abilities.append([
	{
		name:"Flurry of Blows",
		description:"Immediately after you take the Attack action on your turn, you can spend 1 ki point to make two unarmed strikes as a bonus action.",
		resourceName:'Ki Point',
		resourceCost:1
	},{
		name:"Patient Defense",
		description:"You can spend 1 ki point to take the Dodge action as a bonus action on your turn.",
		resourceName:'Ki Point',
		resourceCost:1
	},{
		name:"Step of the Wind",
		description:"You can spend 1 ki point to take the Disengage or Dash action as a bonus action on your turn, and your jump distance is doubled for the turn.",
		resourceName:'Ki Point',
		resourceCost:1
	},{
		name:"Empty Body",
		description:"You can use your action to spend 4 ki points to become invisible for 1 minute. During that time, you also have resistance to all damage but force damage.",
		resourceName:"Ki Point",
		resourceCost:4
	},{
		name:"Ki Astral Projection",
		description:"You can spend 8 ki points to cast the astral projection spell, without needing material components. When you do so, you can't take any other creatures with you.",
		resourceName:"Ki Point",
		resourceCost:8
	},{
		name:"Stunning Strike",
		description:"You can interfere with the flow of ki in an opponent's body, and also frustrate your DM. When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike. The target must succeed on a Constitution saving throw or be stunned until the end of your next turn.",
		resourceName:"Ki Point",
		resourceCost:1
	},{
		name:"Ki Point",
		description:"You can spend Ki points on Monk abilities.",
		maxChargesFunction:function(char,scope){
			return getClassLevel(char,'Monk');
		},
		charges:1,
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	}
]);

window.passives.append([
	{
		name:"Martial Arts",
		description:"Your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons, which are shortswords and any simple melee weapons that don't have the two-handed or heavy property.\nYou gain the following benefits while you are unarmed or wielding only monk weapons and you aren't wearing armor or wielding a shield.\n\u2022You can use Dexterity instead of Strength for the attack and damage rolls of your unarmed strikes and monk weapons.\n\u2022You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon. This die changes as you gain monk levels, as shown in the Martial Arts column of the Monk table.\n\u2022When you use the Attack action with an unarmed strike or a monk weapon on your turn, you can make one unarmed strike as a bonus action. For example, if you take the Attack action and attack with a quarterstaff, you can also make an unarmed strike as a bonus action, assuming you haven't already taken a bonus action this turn."
	},{
		name:"Unarmored Movement",
		description:"Your speed increases by ${ladder(clevel,2,10,6,15,10,20,14,25,18,30)} feet while you are not wearing armor or wielding a shield."
	},{
		name:"Deflect Missiles",
		description:"You can use your reaction to deflect or catch the missile when you are hit by a ranged weapon attack. When you do so, the damage you take from the attack is reduced by 1d10 + your Dexterity modifier + your monk level.\nIf you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in one hand and you have at least one hand free. If you catch a missile in this way, you can spend 1 ki point to make a ranged attack (range 20/60 feet) with the weapon or piece of ammunition you just caught, as part of the same reaction. You make this attack with proficiency, regardless of your weapon proficiencies, and the missile counts as a monk weapon for the attack."
	},{
		name:"Slow Fall",
		description:"You can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your monk level."
	},{
		name:"Ki-Empowered Strikes",
		description:"Your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage."
	},{
		name:"Stillness of Mind",
		description:"You can use your action to end one effect on yourself that is causing you to be charmed or frightened."
	},{
		name:"Parkour",
		description:"You gain the ability to move along vertical surfaces and across liquids on your turn without falling during the move."
	},{
		name:"Purity of Body",
		description:"Your mastery of the ki flowing through you makes you immune to disease and poison."
	},{
		name:"Tongue of the Sun and Moon",
		description:"You learn to touch the ki of other minds so that you understand all spoken languages. Moreover, any creature that can understand a language can understand what you say."
	},{
		name:"Diamond Soul",
		description:"You have proficiency in all saving throws.\nAdditionally, whenever you make a saving throw and fail, you can spend 1 ki point to reroll it and take the second result.",
		onPickup:function(char,scope){
			char.saves.str=1;
			char.saves.dex=1;
			char.saves.con=1;
			char.saves.int=1;
			char.saves.wis=1;
			char.saves.cha=1;
		}
	},{
		name:"Timeless Body",
		description:"Your ki sustains you so that you suffer none of the frailty of old age, and you can't be aged magically. You can still die of old age, however. In addition, you no longer need food or water."
	},{
		name:"Perfect Soul",
		description:"When you roll for initiative and have no ki points remaining, you regain 4 ki points."
	},{
		name:"Way of the Mantis",
		description:"When you melee attack a target who isn't aware of you, if the attack hits, you can take the Disengage action for free immediately after the attack."
	},{
		name:"Shadow Form",
		description:"Whenever you end a turn in which you didn't move, if no enemies are within melee range of you, you may use your bonus action to become invisible until your next turn ends."
	},{
		name:"Shadow Strike",
		description:"When you're invisible, you can spend 1 Ki point to teleport up to your movement speed to melee attack an enemy. That attack has advantage. If your target dies because of this attack, you become invisible until the start of your next turn."
	},{
		name:"Master of Infiltration",
		description:"You gain advantage on stealth checks. You have a +5 bonus to Stealth checks you make in dark places or at night."
	},{
		name:"Desperate Strike",
		description:"Whenever you make an attack with advantage, you may forgo the advantage. If you do, and the attack hits, it deals bonus damage equal to the number of Ki points you are missing."
	},{
		name:"Supernatural Awareness",
		description:"You gain the following benefits:\n\u2022 You can't be surprised while you're conscious.\n\u2022 Other creatures don't gain advantage on attacks against you as a result of being unseen by you.\n\u2022 You have advantage to perception checks to detect creatures and illusions.\n\u2022 Whenever your initiative roll is less than your Monk level, use your Monk level for that roll instead."
	},{
		name:"Bonus Reaction",
		description:"If you don't use your bonus action on your turn, you gain a second reaction until your next turn."
	},{
		name:"See the Code",
		description:"Attacks of Opportunity against you have disadvantage. Whenever an enemy makes an attack against you and misses, or casts a spell on you that you successfully save against, you may spend your reaction to regain 1 Ki point."
	},{
		name:"Honorable Opponent",
		description:"You inspire honor and punish cowardice in your opponents. Whenever an opponent within your melee range disengages from you, they must first spend their reaction to attack you. That attack has disadvantage."
	},{
		name:"Enlightened Strikes",
		description:"Whenever you hit with a melee attack, you deal bonus radiant damage equal to half your current Ki points."
	},{
		name:"Touch of Death",
		description:"Your study of death allows you to extract vitality from another creature as it nears its demise. When you reduce a creature within 5 feet of you to 0 hit points, you gain temporary hit points equal to your Wisdom modifier + your monk level."
	},{
		name:"Hour of Reaping",
		description:"You gain the ability to unsettle or terrify those around you as an action, for your soul has been touched by the shadow of death. When you take this action, each creature within 30 feet of you that can see you must succeed on a Wisdom saving throw or be frightened of you until the end of your next turn."
	},{
		name:"Mastery of Death",
		description:"You use your familiarity with death to escape its grasp. When you are reduced to 0 hit points, you can expend 1 ki point (no action required) to have 1 hit point instead."
	},{
		name:"Touch of the Long Death",
		description:"Your touch can channel the energy of death into a creature. As an action, you touch one creature within 5 feet of you, and you expend 1 to 10 ki points. The target must make a Constitution saving throw, and it takes 2d10 necrotic damage per ki point spent on a failed save, or half as much damage on a successful one."
	}
]);

window.classes.push(
	{
		classname:"Monk",
		name:"Monk",
		description:"Monks make careful study of a magical energy that most monastic traditions call ki. This energy is an element of the magic that suffuses the multiverse—specifically, the element that flows through living bodies. Monks harness this power within themselves to create magical effects and exceed their bodies' physical capabilities, and some of their special attacks can hinder the flow of ki in their opponents. Using this energy, monks channel uncanny speed and strength into their unarmed strikes. As they gain experience, their martial training and their mastery of ki gives them more power over their bodies and the bodies of their foes.",
		levels:[
			{ //1, first player level
				summary:[
					{name:"Proficiencies",description:"Swortswords, Simple Weapons STR Saves DEX Saves"},
					{name:"Starting Equipment",description:""},
					{name:"Skill Proficiencies",description:""},
					findPassive("Martial Arta"),
					findPassive("Unarmored Movement"),
				],
				"updates":[
					{
						choicePrompt:"You gain the following proficiencies",
						choices:["Swortswords","Simple Weapons","STR Saves","DEX Saves"],
						action:function(char,derived,choice,$scope){
							char.maxHp=8;
							char.proficiencies.push("Shortswords");
							char.proficiencies.push("Simple Weapons");
							char.saves.str=1;
							char.saves.dex=1;
							addToInventory(findItem("Dart",10));
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
							openPack(choice);
						}
					},{
						limit:2,
						choicePrompt:"Choose two skill proficiencies:",
						choices:[function(char){
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
						action:function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						choicePrompt:"You gain the following",
						choices:[findPassive("Martial Arts"),findPassive("Unarmored Movement")],
						action:function(char){
							addPassive(char,"Martial Arts");
							addPassive(char,"Unarmored Movement");
						}
					}
				]
			},	{ // 1
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Martial Arts"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Martial Arts")],
						action:function(char,derived,choice){
							addPassive(char,"Martial Arta");
						}
					}
				]
			}, { // 2
				summary:[
					findAbility("Flurry of Blows"),findAbility("Patient Defense"),findAbility("Step of the Wind"),findPassive("Unarmored Movement")
				],
				"updates":[
					helper.hitDice8,
					{
						choicePrompt:"You gain the following",
						choices:[findAbility("Flurry of Blows"),findAbility("Patient Defense"),findAbility("Step of the Wind"),findPassive("Unarmored Movement")],
						action:function(char,derived,choice){
							addAbility(char,"Flurry of Blows");
							addAbility(char,"Patient Defense");
							addAbility(char,"Step of the Wind");
							addAbility(char,"Ki Point");
							addPassive(char,"Unarmored Movement");
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Deflect Missiles"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Deflect Missiles")],
						action:function(char,derived,choice){
							addPassive(char,"Deflect Missiles");
						}
					},{
						summary:{name:"Monastic Tradition",description:"Choose your Monastic Tradition"},
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
					helper.asi
				]
			},{//5
				summary:[
					findPassive("Slow Fall"),
					findAbility("Stunning Strike")
				],
				"updates":[
					helper.hitDice8,
					{
						choices:[findPassive("Slow Fall"),findAbility("Stunning Strike")],
						action:function(char,derived){
							addPassive(char,"Slow Fall");
							addAbility(char,"Stunning Strike");
						}
					}
				]
			},{//6
				"updates":[
					helper.hitDice8
				]
			},{//7
				summary:[
					findPassive("Evasion"),
					findAbility("Stillness of Mind")
				],
				"updates":[
					helper.hitDice8,
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Evasion"),findAbility("Stillness of Mind")],
						action:function(char,derived){
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
					helper.asi
				]
			},{//9
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Parkour"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Parkour")],
						action:function(char,derived){
							addPassive(char,"Parkour");
						}
					}
				]
			},{//10
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Purity of Body"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Purity of Body")],
						action:function(char){
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
					helper.asi
				]
			},{//13
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Tongue of the Sun and Moon"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Tongue of the Sun and Moon")],
						action:function(char){
							addPassive(char,"Tongue of the Sun and Moon");
						}
					}
				]
			},{//14
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Diamond Soul"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Diamond Soul")],
						action:function(char){
							addPassive(char,"Diamond Soul");
						}
					}
				]
			},{//15
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Timeless Body"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Timeless Body")],
						action:function(char){
							addPassive(char,"Timeless Body");
						}
					}
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
					helper.hitDice8
				]
			},{//18
				summary:[
					findAbility("Empty Body"),
					findAbility("Ki Astral Projection")
				],
				"updates":[
					helper.hitDice8,
					{
						choicePrompt:"You gain the following",
						choices:[findAbility("Empty Body"),findAbility("Ki Astral Projection")],
						action:function(char){
							addAbility(char,"Empty Body");
							addAbility(char,"Ki Astral Projection");
						}
					}
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
						summary:findPassive("Perfect Soul"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Perfect Soul")],
						action:function(char){
							addPassive(char,"Perfect Soul");
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Monk",
		name:"Ninjutsu",
		subclass:"Ninjutsu",
		description:"Ninjas are masters of subterfuge, masters of evading detection. They are often hired by powerful political figures for spying and/or assassination duties. In combat, ninjas are masters of dextrous close-quarters combat, being easily able to strike swiftly with deadly accuracy and slipping away from attackers.",
		levels:[{},{},{},
			{//3
				summary:[
					findPassive("Way of the Mantis"),
					findPassive("Shadow Form")
				],
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Way of the Mantis"),findPassive("Shadow Form")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Way of the Mantis");
							addPassive(char,"Shadow Form");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						summary:findPassive("Master of Infiltration"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Master of Infiltration")],
						action:function(char){
							addPassive(char,"Master of Infiltration");
						}
					}
				]
			},{},{},{},{},
			{//11
				updates:[
					{
						summary:findPassive("Shadow Strike"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Shadow Strike")],
						action:function(char,derived,choice){
							addPassive(char,"Shadow Strike");
						}
					}
				]
			},{},{},{},{},{},
			{//17
				updates:[
					{
						summary:findPassive("Desperate Strike"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Desperate Strike")],
						action:function(char){
							addPassive(char,"Desperate Strike");
						}
					}
				]
			},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Monk",
		name:"Way of Enlightenment",
		subclass:"Way of Enlightenment",
		description:"Monks on the Path of Enlightenment seek to become one with the world around them. Through intense study and meditation, enlightened monks are able to feel their surroundings, not only in place but in time. This path rewards monks who manage their Ki points well.",
		levels:[{},{},{},
			{//3
				summary:[
					findPassive("Supernatural Awareness"),
					findPassive("Bonus Reaction")
				],
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Supernatural Awareness"),findPassive("Bonus Reaction")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Supernatural Awareness");
							addPassive(char,"Bonus Reaction");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						summary:findPassive("See the Code"),
						choicePrompt:"You gain the following",
						choices:[findPassive("See the Code")],
						action:function(char){
							addPassive(char,"See the Code");
						}
					}
				]
			},{},{},{},{},
			{//11
				updates:[
					{
						summary:findPassive("Honorable Opponent"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Honorable Opponent")],
						action:function(char,derived,choice){
							addPassive(char,"Honorable Opponent");
						}
					}
				]
			},{},{},{},{},{},
			{//17
				updates:[
					{
						summary:findPassive("Enlightened Strikes"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Enlightened Strikes")],
						action:function(char){
							addPassive(char,"Enlightened Strikes");
						}
					}
				]
			},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Monk",
		name:"Way of the Long Death",
		subclass:"Way of the Long Death",
		description:"Monks of the Way of the Long Death are obsessed with the meaning and mechanics of dying. They capture creatures and prepare elaborate experiments to capture, record, and understand the moments of their demise. They use this knowledge to guide their understanding of martial arts, yielding a deadly fighting style.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						summary:findPassive("Touch of Death"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Touch of Death")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Touch of Death");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						summary:findPassive("Hour of Reaping"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Hour of Reaping")],
						action:function(char){
							addPassive(char,"Hour of Reaping");
						}
					}
				]
			},{},{},{},{},
			{//11
				updates:[
					{
						summary:findPassive("Mastery of Death"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Mastery of Death")],
						action:function(char,derived,choice){
							addPassive(char,"Mastery of Death");
						}
					}
				]
			},{},{},{},{},{},
			{//17
				updates:[
					{
						summary:findPassive("Touch of the Long Death"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Touch of the Long Death")],
						action:function(char){
							addPassive(char,"Touch of the Long Death");
						}
					}
				]
			},{},{},{}
		]
	}
);
