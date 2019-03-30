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
			this.charges=this.maxCharges;
		}
	},{
		name:"Bardic Inspiration (d8)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d8.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,scope){
			return Math.max(1,scope.derived.modifiers.cha);
		},
		onShortRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Bardic Inspiration (d10)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d10.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,scope){
			return Math.max(1,scope.derived.modifiers.cha);
		},
		onShortRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Bardic Inspiration (d12)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d12.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,scope){
			return Math.max(1,scope.derived.modifiers.cha);
		},
		onShortRest:function(char,scope){
			this.charges=this.maxCharges;
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
	},{
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
		name:"Foretelling Roll",
		description:"You can replace any attack roll, saving throw, or ability check made by you or a creature that you can see with one of the foretelling rolls you made with Portent during your last long rest. You must choose to do so before the roll, and you can replace a roll in this way only once per turn.",
		maxChargesFunction:function(char,scope){
			return getClassLevel(char,'Wizard')>=14?3:2;
		},
		charges:2,
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"The Third Eye",
		description:"You can use your action to increase your powers of perception. When you do so, choose one of the following benefits, which lasts until you are incapacitated or you take a short or long rest. You can't use the feature again until you finish a rest.\n\u2022 Darkvision. You gain darkvision out to a range of 60 feet.\n\u2022 Ethereal Sight. You can see into the Ethereal Plane within 60 feet of you.\n\u2022 Greater Comprehension. You can read any language.\n\u2022 See Invisibility. You can see invisible creatures and objects within 10 feet of you that are within line of sight.",
		maxCharges:1,
		charges:1,
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Rage",
		description:"In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.\nWhile raging, you gain the following benefits if you aren't wearing heavy armor:\n\u2022 You have advantage on Strength checks and Strength saving throws.\n\u2022 When you make a melee weapon attack using Strength, you gain a +${ladder(classLevel($scope.char,'Barbarian'),1,2,9,3,16,4)} bonus to the damage roll. This bonus increases as you level.\n\u2022 You have resistance to bludgeoning, piercing, and slashing damage.\n\u2022 If you are able to cast spells, you can't cast them or concentrate on them while raging.\n\nYour rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven't attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.\n\nOnce you have raged the maximum number of times for your barbarian level, you must finish a long rest before you can rage again. You may rage 2 times at 1st level, 3 at 3rd, 4 at 6th, 5 at 12th, and 6 at 17th.",
		charges:2,
		maxCharges:2,
		maxChargesFunction:function(char){
			return ladder(classLevel(char,'Barbarian'),1,2,3,3,6,4,12,5,17,6);
		},
		onLongRest:function(){
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
		description:"You can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creatures who can hear your performance regain hit points by spending Hit Dice at the end of the short rest, each of those creatures regains an extra 1d${ladder(getClassLevel($scope.char,'Bard'),0,6,9,8,13,19,17,12)} hit points."
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
	},{
		name:"Martial Arts",
		description:"Your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons, which are shortswords and any simple melee weapons that don't have the two-handed or heavy property.\nYou gain the following benefits while you are unarmed or wielding only monk weapons and you aren't wearing armor or wielding a shield.\n\u2022You can use Dexterity instead of Strength for the attack and damage rolls of your unarmed strikes and monk weapons.\n\u2022You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon. This die changes as you gain monk levels, as shown in the Martial Arts column of the Monk table.\n\u2022When you use the Attack action with an unarmed strike or a monk weapon on your turn, you can make one unarmed strike as a bonus action. For example, if you take the Attack action and attack with a quarterstaff, you can also make an unarmed strike as a bonus action, assuming you haven't already taken a bonus action this turn."
	},{
		name:"Flurry of Blows",
		description:"Immediately after you take the Attack action on your turn, you can spend 1 ki point to make two unarmed strikes as a bonus action."
	},{
		name:"Patient Defense",
		description:"You can spend 1 ki point to take the Dodge action as a bonus action on your turn."
	},{
		name:"Step of the Wind",
		description:"You can spend 1 ki point to take the Disengage or Dash action as a bonus action on your turn, and your jump distance is doubled for the turn."
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
		name:"Stunning Strike",
		description:"You can interfere with the flow of ki in an opponent's body, and also frustrate your DM. When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike. The target must succeed on a Constitution saving throw or be stunned until the end of your next turn."
	},{
		name:"Ki-Empowered Strikes",
		description:"Your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage."
	},{
		name:"Evasion",
		description:"Your instinctive agility lets you dodge out of the way of certain area effects. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail."
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
		name:"Empty Body",
		description:"You can use your action to spend 4 ki points to become invisible for 1 minute. During that time, you also have resistance to all damage but force damage.\nAdditionally, you can spend 8 ki points to cast the astral projection spell, without needing material components. When you do so, you can't take any other creatures with you."
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
		description:"You gain the following benefits:\n\u2022 You can't be surprised while you're conscious.\n\u2022 Other creatures don't gain advantage on attacks against you as a result of being unseen by you.\n\u2022 You have advantage to perception checks to detect creatures and illusions.\n\u2022 Whenever your initiative roll is less than your Monk level, use your Monk level for your initiative instead."
	},{
		name:"Bonus Reaction",
		description:"If you don't use your bonus action on your turn, you gain a second reaction until your next turn."
	},{
		name:"See the Code",
		description:"Attacks of Opportunity against you have disadvantage. Whenever an enemy makes an attack against you and misses, or casts a spell on you that you resist, you may spend your reaction to regain 1 Ki point."
	},{
		name:"Zen Meditation",
		description:"When you end your turn, if you took no movement or actions, you enter a zen-like state. This meditation requires concentration. When your next turn begins, if your concentration has not been broken, you regain 3 Ki points."
	},{
		name:"Enlightened Strikes",
		description:"Whenever you hit with a melee attack, you deal bonus radiant damage equal to half your current Ki points."
	},{
		name:"Divination Savant",
		description:"The gold and time you must spend to copy a divination spell into your spellbook is halved."
	},{
		name:"Portent",
		description:"Glimpses of the future begin to press in on your awareness. When you finish a long rest, roll ${getClassLevel($scope.char,'Wizard')>=14?'three':'two'} d20s and record the numbers rolled. You can replace any attack roll, saving throw, or ability check made by you or a creature that you can see with one of these foretelling rolls. You must choose to do so before the roll, and you can replace a roll in this way only once per turn.\nEach foretelling roll can be used only once. When you finish a long rest, you lose any unused foretelling rolls."
	},{
		name:"Expert Divination",
		description:"When you cast a divination spell of 2nd level or higher using a spell slot, you regain one expended spell slot. The slot you regain must be of a level lower than the spell you cast and can't be higher than 5th level."
	},{
		name:"Unarmored Defense",
		description:"While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier."
	},{
		name:"Danger Sense",
		description:"You gain an uncanny sense of when things nearby aren't as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can't be blinded, deafened, or incapacitated."
	},{
		name:"Reckless Attack",
		description:"You can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn."
	},{
		name:"Extra Attacks x1",
		description:"You can attack twice when you take the attack action on your turn."
	},{
		name:"Extra Attacks x2",
		description:"You can attack three times when you take the attack action on your turn."
	},{
		name:"Extra Attacks x3",
		description:"You can attack four times when you take the attack action on your turn."
	},{
		name:"Fast Movement",
		description:"Your speed increases by 10 feet while you aren't wearing heavy armor."
	},{
		name:"Feral Instinct",
		description:"Your instincts are so honed that you have advantage on initiative rolls.\n\nAdditionally, if you are surprised at the beginning of combat and aren't incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn."
	},{
		name:"Brutal Critical (x1)",
		description:"You can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack."
	},{
		name:"Brutal Critical (x2)",
		description:"You can roll two additional weapon damage die when determining the extra damage for a critical hit with a melee attack."
	},{
		name:"Brutal Critical (x3)",
		description:"You can roll three additional weapon damage die when determining the extra damage for a critical hit with a melee attack."
	},{
		name:"Relentless Rage",
		description:"Your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you're raging and don't die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead.\n\nEach time you use this feature after the first, the DC increases by 5. When you finish a short or long rest, the DC resets to 10."
	},{
		name:"Persistent Rage",
		description:"Your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it."
	},{
		name:"Indomitable Might",
		description:"If your total for a Strength check is less than your Strength score, you can use that score in place of the total."
	},{
		name:"Primal Champion",
		description:"Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24."
	}
	
];