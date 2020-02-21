
window.abilities.append([
	{
		name:"Bardic Inspiration (d6)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,scope){
			return Math.max(1,scope.derived.modifiers.cha);
		},
		onLongRest:helper.recharge
	},{
		name:"Bardic Inspiration (d8)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d8.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,scope){
			return Math.max(1,scope.derived.modifiers.cha);
		},
		onShortRest:helper.recharge
	},{
		name:"Bardic Inspiration (d10)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d10.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,scope){
			return Math.max(1,scope.derived.modifiers.cha);
		},
		onShortRest:helper.recharge
	},{
		name:"Bardic Inspiration (d12)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d12.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,scope){
			return Math.max(1,scope.derived.modifiers.cha);
		},
		onShortRest:helper.recharge
	},{
		name:"Cutting Words",
		description:"You learn how to use your wit to distract, confuse, and otherwise sap the confidence and competence of others. When a creature that you can see within 60 feet of you makes an attack roll, an ability check, or a damage roll, you can use your reaction to expend one of your uses of Bardic Inspiration, rolling a Bardic Inspiration die and subtracting the number rolled from the creature's roll. You can choose to use this feature after the creature makes its roll, but before the DM determines whether the attack roll or ability check succeeds or fails, or before the creature deals its damage. The creature is immune if it can't hear you or if it's immune to being charmed.",
		resourceName:"Bardic Inspiration (d6)",
		resourceCost:1
	},{
		name:"Awestrike",
		description:"Your artistic talent can flood a creature's senses with an overwhelming version of reality. As an action, you can expend a use of Bardic Inspiration, rolling a Bardic Inspiration die. Choose a creature within 30 feet that can see or hear you. That creature makes a Wisdom saving throw against your spell save DC plus the bardic inspiration roll. If the creature fails the save, they are stunned for one round. If they succeed, they are either blinded or deafened (your choice) for one round.",
		resourceName:"Bardic Inspiration (d6)",
		resourceCost:1
	},{
		name:"Mantle of Inspiration",
		description:"As a bonus action, you can expend one use of your Bardic Inspiration to grant yourself a wondrous appearance. When you do so, choose a number of creatures you can see and that can see you within 60 feet of you, up to a number equal to your Charisma modifier (minimum of one). Each of them gains ${ladder(classlevel($scope.char,'Bard'),0,5,5,8,10,11,15,14)} temporary hit points. When a creature gains these temporary hit points, it can immediately use its reaction to move up to its speed, without provoking opportunity attacks.\n\nThe number of temporary hit points increases when you reach certain levels in this class, increasing to 8 at 5th level, 11 at 10th level, and 14 at 15th level.",
		resourceName:"Bardic Inspiration (d6)",
		resourceCost:1
	},{
		name:"Enthralling Performance",
		description:"You can charge your performance with seductive, fey magic.\n\nIf you perform for at least 1 minute, you can attempt to inspire wonder in your audience by singing, reciting a poem, or dancing. At the end of the performance, choose a number of humanoids within 60 feet of you who watched and listened to all of it, up to a number equal to your Charisma modifier (minimum of one). Each target must succeed on a Wisdom saving throw against your spell save DC or be charmed by you. While charmed in this way, the target idolizes you, it speaks glowingly of you to anyone who talks to it, and it hinders anyone who opposes you, although it avoids violence unless it was already inclined to fight on your behalf. This effect ends on a target after 1 hour, if it takes any damage, if you attack it, or if it witnesses you attacking or damaging any of its allies.\n\nIf a target succeeds on its saving throw, the target has no hint that you tried to charm it.\n\nOnce you use this feature, you can't use it again until you finish a short or long rest.",
		charges:1,
		maxCharges:1,
		onShortRest:helper.recharge
	},{
		name:"Mantle of Majesty",
		description:"You gain the ability to cloak yourself in a fey magic that makes others want to serve you. As a bonus action, you cast command, without expending a spell slot, and you take on an appearance of unearthly beauty for 1 minute or until your concentration ends (as if you were concentrating on a spell). During this time, you can cast command as a bonus action on each of your turns, without expending a spell slot.\n\nAny creature charmed by you automatically fails its saving throw against the command you cast with this feature.\n\nOnce you use this feature, you can't use it again until you finish a long rest.",
		charges:1,
		maxCharges:1,
		onLongRest:helper.recharge
	},{
		name:"Unbreakable Majesty",
		description:"As a bonus action, you can assume a magically majestic presence for 1 minute or until you are incapacitated. For the duration, whenever any creature tries to attack you for the first time on a turn, the attacker must make a Charisma saving throw against your spell save DC. On a failed save, it can't attack you on this turn, and it must choose a new target for its attack or the attack is wasted. On a successful save, it can attack you on this turn, but it has disadvantage on any saving throw it makes against your spells on your next turn.\n\nOnce you assume this majestic presence, you can't do so again until you finish a short or long rest.",
		charges:1,
		maxCharges:1,
		onShortRest:helper.recharge
	}
]);

window.passives.append([
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
		},
		dmHide:true
	},{
		name:"Song of Rest",
		description:"You can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creatures who can hear your performance regain hit points by spending Hit Dice at the end of the short rest, each of those creatures regains an extra 1d${ladder(getClassLevel($scope.char,'Bard'),0,6,9,8,13,19,17,12)} hit points.",
		dmHide:true
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
		name:"Works of Wonder",
		description:"When you succeed on a performance check, your performance leaves a lasting mark on those who witnessed it. You have advantage on all charisma checks against those creatures, and they have disadvantage on all charisma checks against you. This effect lasts until you take a long rest.\nIf you rolled a natural 20 on the performance check and succeeded the check, this effect instead lasts one week."
	},{
		name:"Mass Delusion",
		description:"Your prowess in artistic expression allows you to touch the masses. When you cast an Illusion spell that can only target one creature at the level you cast it, and doesn't have a range of self, you may instead have it affect any number of creatures."
	}
]);

window.classes.push(
	{
		classname:"Bard",
		name:"Bard",
		description:"In the worlds of D&D, words and music are not just vibrations of air, but vocalizations with power all their own. The bard is a master of song, speech, and the magic they contain. Bards say that the multiverse was spoken into existence, that the words of the gods gave it shape, and that echoes of these primordial Words of Creation still resound throughout the cosmos. The music of bards is an attempt to snatch and harness those echoes, subtly woven into their spells and powers.\nThe greatest strength of bards is their sheer versatility. Many bards prefer to stick to the sidelines in combat, using their magic to inspire their allies and hinder their foes from a distance. But bards are capable of defending themselves in melee if necessary, using their magic to bolster their swords and armor. Their spells lean toward charms and illusions rather than blatantly destructive spells. They have a wide-ranging knowledge of many subjects and a natural aptitude that lets them do almost anything well. Bards become masters of the talents they set their minds to perfecting, from musical performance to esoteric knowledge.",
		levels:[
			{ //1, first player level
				summary:[
					{
						name:"Proficiencies",
						description:"Light Armor, Simple Weapons, Rapiers, Longswords, Shortswords, Hand Crossbows, DEX saves, CHA saves, 3 Instruments"
					},{
						name:"Starting Equipment",
						description:"Leather Armor, Dagger, any Simple Weapon, Longsword or Rapier"
					},{
						name:"Skill Proficiencies",
						description:"Any three"
					},{
						name:"Learn 2 Bard cantrips",description:""
					},{
						name:"Learn 4 Bard spells",description:""
					},
						findAbility("Bardic Inspiration (d6)")

				],
				updates:[
					{
						always:true,
						choicePrompt:"You gain the following proficiencies:",
						choices:["Light Armor","Simple Weapons","Rapiers","Longswords","Shortswords","Hand Crossbows","DEX saves","CHA saves"],
						action:function(char,derived,choice){
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
					},{
						limit:3,
						choicePrompt:"Choose three instrument proficiencies",
						choices:[listNonProficientInstruments],
						action:function(char,derived,choice){
							char.proficiencies.upush(choice);
						}
					},{
						limit:3,
						choicePrompt:"Choose three skill proficiencies",
						choices:[listNonProficientSkills],
						action:function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						choicePrompt:"Choose a weapon to start with",
						choices:[listSimpleWeapons,findItem("Longsword"),findItem("Rapier")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a pack",
						choices:[findItem("Diplomat's Pack"),findItem("Entertainer's Pack")],
						action:function(char,derived,choice){
							openPack(char,choice);
						}
					},{
						limit:2,
						choicePrompt:"Choose two cantrips",
						choices:[listUnknownBardCantrips],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
					helper.chooseSpell4
				]
			},	{ // 1
				summary:[
					{name:"Learn 2 Bard cantrips",description:""},
					{name:"Learn 4 Bard spells",description:""}
				],
				updates:[
					helper.hitDice8,
					{
						limit:2,
						choicePrompt:"Choose two cantrips",
						choices:[listUnknownBardCantrips],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
					helper.chooseSpell4
				]
			}, { // 2
				summary:[
					findPassive("Jack of All Trades"),
					findPassive("Song of Rest"),
					{name:"Learn a Bard spell",description:""}
				],
				updates:[
					helper.hitDice8,
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Jack of All Trades"),findPassive("Song of Rest")],
						action:function(char,derived,choice){
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
				summary:[
					{name:"Bard College",description:"Choose your Bard college"},
					{name:"Learn a Bard spell",description:""}
				],
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
				summary:[
					{name:"Learn a Bard cantrip",description:""},
					{name:"Learn a Bard spell",description:""}
				],
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi,
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
				summary:[
					{name:"Bardic Inspiration (d8)",description:"Your Bardic Inspiration die becomes a d8."},
					{name:"Learn a Bard spell",description:""}
				],
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
				summary:[
					findPassive("Countercharm"),
					{name:"Learn a Bard spell",description:""}
				],
				"updates":[
					helper.hitDice8,
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Countercharm")],
						action:function(char,derived){
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
				summary:[
					{name:"Learn a Bard spell",description:""}
				],
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
				summary:[
					{name:"Learn a Bard spell",description:""}
				],
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi,
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
				summary:[
					{name:"Learn a Bard spell",description:""}
				],
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
				summary:[
					{name:"Bardic Inspiration (d10)",description:"Your Bardic Inspiration die becomes a d10."},
					{name:"Learn a Bard cantrip",description:""},
					{name:"Learn two Bard spells",description:""},
					{name:"Expertise",description:"Gain expertise in two skills of your choice (proficiency bonus will be doubled for those skills)."},
					{name:"Magical Secrets",description:"Learn two spells from any class."},
				],
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
						choicePrompt:"Learn two spells from any class:",
						choices:[listAllUnknownSpells],
						action:function(char,derived,choice){
							addSpell(char,choice,'Bard');
						}
					},
					helper.chooseBardCantrip,
					helper.chooseSpell2,
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
				summary:[
					{name:"Learn a Bard spell",description:""},
				],
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
					helper.asi,
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
				summary:[
					{name:"Learn a Bard spell",description:""},
				],
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
				summary:[
					{name:"Learn two Bard spells",description:""},
				],
				"updates":[
					helper.hitDice8,
					helper.chooseSpell2,
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
				summary:[
					{name:"Bardic Inspiration (d12)",description:"Your Bardic Inspiration die becomes a d12."},
					{name:"Learn a Bard spell",description:""},
				],
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
					helper.asi,
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
				summary:[
					{name:"Learn a Bard spell",description:""},
				],
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
				summary:[
					{name:"Learn two Bard spells",description:""},
					{name:"Magical Secrets",description:"Learn two spells from any class."}
				],
				"updates":[
					helper.hitDice8,
					{
						choicePrompt:"Learn two spells from any class:",
						choices:[listAllUnknownSpells],
						action:function(char,derived,choice){
							addSpell(char,choice,'Bard');
						}
					},
					helper.chooseSpell2,
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
					helper.asi,
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
				summary:[
					findPassive("Superior Inspiration")
				],
				"updates":[
					helper.hitDice8,
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Superior Inspiration")],
						action:function(char){
							addPassive(char,"Superior Inspiration");
						}
					},
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
			{},{},{},{ // 3
				"updates":[
					helper.learnSkillProficiency3,
					helper.chooseExpertise2,
					{
						choicePrompt:"You gain the following",
						choices:[findAbility("Cutting Words")],
						action:function(char){
							addAbility(char,"Cutting Words");
						}
					}
				]
			},{},{//5
				updates:[
					{
						"choices":[],
						"action":function(char){
							for (let abil of char.abilities){
								if (abil.name==='Cutting Words'){
									abil.resourceName="Bardic Inspiration (d8)";
									return;
								}
							}
						}
					}
				]
			},{//6
				updates:[
					{
						limit:2,
						choicePrompt:"Learn two spells from any class:",
						choices:[listAllUnknownSpells],
						action:function(char,derived,choice){
							addSpell(char,choice,'Bard');
						}
					}
				]
			},{},{},{},{//10
				updates:[
					{
						"choices":[],
						"action":function(char){
							for (let abil of char.abilities){
								if (abil.name==='Cutting Words'){
									abil.resourceName="Bardic Inspiration (d10)";
									return;
								}
							}
						}
					}
				]
			},{},{},{},{//14
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Peerless Skill")],
						action:function(char){
							addPassive("Peerless Skill");
						}
					}
				]
			},{//15
				updates:[
					{
						choices:[],
						action:function(char){
							for (let abil of char.abilities){
								if (abil.name==='Cutting Words'){
									abil.resourceName="Bardic Inspiration (d12)";
									return;
								}
							}
						}
					}
				]
			},{},{},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Bard",
		name:"College of Impressionism",
		subclass:"College of Impressionism",
		description:"Bards of the College of Impressionism have learned to experience the world through emption and passion. They need not rely solely on their senses, but can understand reality by feeling it in their soul. Impressionist bards are capable of projecting these feelings onto others, giving them total control of how other creatures perceive their surroundings.",
		levels:[
			{},{},{},
			{ // 3
				"updates":[
					helper.learnSkillProficiency3,
					helper.chooseExpertise2,
					{
						choicePrompt:"You gain the following",
						choices:[findAbility("Awestrike")],
						action:function(char){
							addAbility(char,"Awestrike");
						}
					}
				]
			},{},{ //5
				updates:[
					{
						choices:[],
						action:function(char){
							for (let abil of char.abilities){
								if (abil.name==='Awestrike'){
									abil.resourceName="Bardic Inspiration (d8)";
									return;
								}
							}
						}
					}
				]
			},{//6
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findPassive("Works of Wonder")],
						action:function(char,derived,choice){
							addPassive(char,"Works of Wonder");
						}
					}
				]
			},{},{},{},{//10
				updates:[
					{
						choices:[],
						action:function(char){
							for (let abil of char.abilities){
								if (abil.name==='Awestrike'){
									abil.resourceName="Bardic Inspiration (d10)";
									return;
								}
							}
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Mass Delusion")],
						action:function(char){
							addPassive(char,"Mass Delusion");
						}
					}
				]
			},{//15
				updates:[
					{
						choices:[],
						action:function(char){
							for (let abil of char.abilities){
								if (abil.name==='Awestrike'){
									abil.resourceName="Bardic Inspiration (d12)";
									return;
								}
							}
						}
					}
				]
			},{},{},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Bard",
		name:"College of Glamour",
		subclass:"College of Glamour",
		description:"The College of Glamour is the home of bards who mastered their craft in the vibrant realm of the Feywild or under the tutelage of someone who dwelled there. Tutored by satyrs, eladrin, and other fey, these bards learn to use their magic to delight and captivate others.\n\nThe bards of this college are regarded with a mixture of awe and fear. Their performances are the stuff of legend. These bards are so eloquent that a speech or song that one of them performs can cause captors to release the bard unharmed and can lull a furious dragon into complacency. The same magic that allows them to quell beasts can also bend minds. Villainous bards of this college can leech off a community for weeks, misusing their magic to turn their hosts into thralls. Heroic bards of this college instead use this power to gladden the downtrodden and undermine oppressors.",
		levels:[
			{},{},{},
			{ // 3
				"updates":[
					helper.learnSkillProficiency3,
					helper.chooseExpertise2,
					{
						choicePrompt:"You gain the following",
						choices:[findAbility("Mantle of Inspiration")],
						action:function(char){
							addAbility(char,"Mantle of Inspiration");
						}
					}
				]
			},{},{ //5
				updates:[
					{
						choices:[],
						action:function(char){
							for (let abil of char.abilities){
								if (abil.name==='Mantle of Inspiration'){
									abil.resourceName="Bardic Inspiration (d8)";
									return;
								}
							}
						}
					}
				]
			},{//6
				updates:[
					{
						choicePrompt:"You gain the following:",
						choices:[findAbility("Mantle of Majesty")],
						action:function(char,derived,choice){
							addAbility(char,"Mantle of Majesty");
						}
					}
				]
			},{},{},{},{//10
				updates:[
					{
						choices:[],
						action:function(char){
							for (let abil of char.abilities){
								if (abil.name==='Mantle of Inspiration'){
									abil.resourceName="Bardic Inspiration (d10)";
									return;
								}
							}
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findAbility("Unbreakable Majesty")],
						action:function(char){
							addAbility(char,"Unbreakable Majesty");
						}
					}
				]
			},{//15
				updates:[
					{
						choices:[],
						action:function(char){
							for (let abil of char.abilities){
								if (abil.name==='Mantle of Inspiration'){
									abil.resourceName="Bardic Inspiration (d12)";
									return;
								}
							}
						}
					}
				]
			},{},{},{},{},{}
		]
	}
);
