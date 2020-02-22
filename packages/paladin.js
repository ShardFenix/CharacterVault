
window.abilities.append([
	{
		name:"Lay on Hands",
		description:"Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level × 5.\n\nAs an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool.\n\nAlternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one.\n\nThis feature has no effect on undead and constructs.",
		maxChargesFunction:function(char){
			return 5 * classLevel(char,"Paladin");
		},
		onLongRest:helper.recharge,
		charges:5
	},{
		name:"Divine Sense",
		description:"The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears. As an action, you can open your awareness to detect such forces. Until the end of your next turn, you know the location of any celestial, fiend, or undead within 60 feet of you that is not behind total cover. You know the type (celestial, fiend, or undead) of any being whose presence you sense, but not its identity (the vampire Count Strahd von Zarovich, for instance). Within the same radius, you also detect the presence of any place or object that has been consecrated or desecrated, as with the hallow spell.\n\nYou can use this feature a number of times equal to 1 + your Charisma modifier. When you finish a long rest, you regain all expended uses.",
		onLongRest:helper.recharge,
		maxChargesFunction:function(char,scope){
			return Math.max(1 + scope.derived.modifiers.cha, 1);
		}
	},{
		name:"Cleansing Touch",
		description:"You can use your action to end one spell on yourself or on one willing creature that you touch.\n\nYou can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain expended uses when you finish a long rest.",
		onLongRest:helper.recharge,
		maxChargesFunction:function(char,scope){
			return Math.max(1 + scope.derived.modifiers.cha, 1);
		}
	},{
		name:"Rebuke the Violent",
		description:"You can use your Channel Divinity to rebuke those who use violence. Immediately after an attacker within 30 feet of you deals damage with an attack against a creature other than you, you can use your reaction to force the attacker to make a Wisdom saving throw. On a failed save, the attacker takes radiant damage equal to the damage it just dealt. On a successful save, it takes half as much damage.",
		resourceName:"Channel Divinity",
		resourceCost:1
	},{
		name:"Emissary of Peace",
		description:"You can use your Channel Divinity to augment your presence with divine power. As a bonus action, you grant yourself a +5 bonus to Charisma (Persuasion) checks for the next 10 minutes.",
		resourceName:"Channel Divinity",
		resourceCost:1
	},{
		name:"Holy Nimbus",
		description:"As an action, you can emanate an aura of sunlight. For 1 minute, bright light shines from you in a 30-foot radius, and dim light shines 30 feet beyond that.\n\nWhenever an enemy creature starts its turn in the bright light, the creature takes 10 radiant damage.\n\nIn addition, for the duration, you have advantage on saving throws against spells cast by fiends or undead.\n\nOnce you use this feature, you can't use it again until you finish a long rest.",
		maxCharges:1,
		charges:1,
		onLongRest:helper.recharge
	}
]);

window.passives.append([
	{
		name:"Divine Smite",
		description:"When you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon's damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8 for each spell level higher than 1st, to a maximum of 5d8. The damage increases by 1d8 if the target is an undead or a fiend, to a maximum of 6d8."
	},{
		name:"Improved Divine Smite",
		description:"Whenever you hit a creature with a melee weapon, the creature takes an extra 1d8 radiant damage."
	},{
		name:"Aura of Protection",
		description:"Whenever you or a friendly creature within ${classLevel($scope.char,'Paladin')<18?10:30} feet of you must make a saving throw, the creature gains a bonus to the saving throw equal to your Charisma modifier (minimum bonus of +1). You must be conscious to grant this bonus."
	},{
		name:"Aura of Courage",
		description:"You and friendly creatures within ${classLevel($scope.char,'Paladin')<18?10:30} feet of you can't be frightened while you are conscious."
	},{
		name:"Aura of Devotion",
		description:"You and friendly creatures within ${classLevel($scope.char,'Paladin')<18?10:30} feet of you can't be charmed while you are conscious."
	},{
		name:"Aura of the Guardian",
		description:"You can shield others from harm at the cost of your own health. When a creature within ${classLevel($scope.char,'Paladin')<18?10:30} feet of you takes damage, you can use your reaction to magically take that damage, instead of that creature taking it. This feature doesn't transfer any other effects that might accompany the damage, and this damage can't be reduced in any way."
	},{
		name:"Protective Spirit",
		description:"A holy presence mends your wounds in battle. You regain hit points equal to 1d6 + half your paladin level if you end your turn in combat with fewer than half of your hit points remaining and you aren't incapacitated."
	},{
		name:"Emissary of Redemption",
		description:"You become an avatar of peace, which gives you two benefits:\n\u2022 You have resistance to all damage dealt by other creatures (their attacks, spells, and other effects).\n\u2022 Whenever a creature hits you with an attack, it takes radiant damage equal to half the damage you take from the attack.\n\nIf you attack a creature, cast a spell on it, or deal damage to it by any means but this feature, neither benefit works against that creature until you finish a long rest."
	},{
		name:"Purity of Spirit",
		description:"You are always under the effects of a Protection from Evil and Good spell."
	}
]);

window.classes.push(
	{
		classname:"Paladin",
		name:"Paladin",
		description:"",
		levels:[
			{ //1, first player level
				summary:[
					{name:"Proficiencies",description:"All armor, all weapons, shields, WIS saves, CHA saves"},
					{name:"Starting Equipment",description:"\u2022 Any martial weapon\n\u2022 A martial weapon or shield\n\u2022 Five javelins or any simple melee weapon\n\u2022 A Priest's or Explorer's pack\n\u2022 Chain Mail and a Holy Symbol"},
					{name:"Skill Proficiencies",description:"Two from Athletics, Insight, Intimidation, Medicine, Persuasion, Religion"},
					findAbility("Divine Sense"),
					findAbility("Lay on Hands"),
				],
				"updates":[
					{
						choicePrompt:"You gain the following proficiencies",
						choices:["Light Armor","Medium Armor","Heavy Armor","Simple Weapons","Martial Weapons","Shieids","WIS saves","CHA saves"],
						action:function(char,derived,choice,$scope){
							char.maxHp=10;
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Medium Armor");
							char.proficiencies.push("Heavy Armor");
							char.proficiencies.push("Martial Weapons");
							char.proficiencies.push("Simple Weapons");
							char.saves.wis=1;
							char.saves.cha=1;
							addToInventory(findItem("Holy Symbol"));
							addToInventory(findItem("Chain Mail"));
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[listMartialWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[listMartialWeapons,findItem("Shield")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:["5 Javelins",listSimpleMeleeWeapons],
						action:function(char,derived,choice){
							if (choice==='5 Javelins'){
								addToInventory(char,findItem("Javelin",5));
							} else {
								addToInventory(char,findItem(choice));
							}
						}
					},{
						choicePrompt:"Choose a pack:",
						choices:[findItem("Priest's Pack"),findItem("Explorer's Pack")],
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
									if (["Athletics","Insight","Medicine","Persuasion","Religion"].indexOf(skill.name)!=-1){
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
						choices:[findAbility("Divine Sense"),findAbility("Lay on Hands")],
						action:function(char){
							addAbility(char,"Lay on Hands");
							addAbility(char,"Divine Sense");
						}
					}
				]
			},	{ // 1
				summary:[findAbility("Divine Sense"),findAbility("Lay on Hands")],
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following",
						choices:[findAbility("Divine Sense"),findAbility("Lay on Hands")],
						action:function(char){
							addAbility(char,"Lay on Hands");
							addAbility(char,"Divine Sense");
						}
					}
				]
			}, { // 2
				"updates":[
					helper.hitDice10,
					helper.chooseFightingStyle,
					{
						summary:findPassive("Divine Smite"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Divine Smite"),"Spellcasting"],
						action:function(char,derived,choice,scope){
							addPassive(char,"Divine Smite");
							learnAllClassSpells(char,scope);
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice10,
					{
						summary:findPassive("Divine Health"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Divine Health")],
						action:function(char){
							addPassive(char,"Divine Health");
							addAbility(char,"Channel Divinity");
						}
					},{
						summary:{name:"Sacred Oath",description:"Choose your Sacred Oath"},
						"choicePrompt":"Choose your Sacred Oath",
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addSubclass(char,"Paladin",choice);
						}
					}
					
				]
			}, { // 4
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//5
				"updates":[
					helper.hitDice10,
					{
						summary:findPassive("Extra Attacks x1"),
						choicePrompt:"You gain the following:",
						choices:[findPassive("Extra Attacks x1")],
						action:function(char,derived){
							addPassive(char,"Extra Attacks x1");
						}
					}
				]
			},{//6
				"updates":[
					helper.hitDice10,
					{
						summary:findPassive("Aura of Protection"),
						choicePrompt:"You gain the following:",
						choices:[findPassive("Aura of Protection")],
						action:function(char,derived){
							addPassive(char,"Aura of Protection");
						}
					}
				]
			},{//7
				"updates":[
					helper.hitDice10,
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
					helper.hitDice10,
				]
			},{//10
				"updates":[
					helper.hitDice10,
					{
						summary:findPassive("Aura of Courage"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Aura of Courage")],
						action:function(char){
							addPassive(char,"Aura of Courage");
						}
					}
				]
			},{//11
				"updates":[
					helper.hitDice10,
					{
						summary:findPassive("Improved Divine Smite"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Improved Divine Smite")],
						action:function(char){
							addPassive(char,"Improved Divine Smite");
						}
					}
				]
			},{//12
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi
				]
			},{//13
				"updates":[
					helper.hitDice10,
				]
			},{//14
				"updates":[
					helper.hitDice10,
					{
						summary:findAbility("Cleansing Touch"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Cleansing Touch")],
						action:function(char){
							addAbility(char,"Cleansing Touch");
						}
					}
				]
			},{//15
				"updates":[
					helper.hitDice10,
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
					helper.hitDice10
				]
			},{//18
				"updates":[
					helper.hitDice10,
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
					helper.hitDice10
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Paladin",
		name:"Oath of Redemption",
		subclass:"Oath of Redemption",
		description:"The Oath of Redemption sets a paladin on a difficult path, one that requires a holy warrior to use violence only as a last resort. Paladins who dedicate themselves to this oath believe that any person can be redeemed and that the path of benevolence and justice is one that anyone can walk. These paladins face evil creatures in the hope of turning their foes to the light, and they slay their enemies only when such a deed will clearly save other lives. Paladins who follow this path are known as redeemers.\n\nWhile redeemers are idealists, they are no fools. Redeemers know that undead, demons, devils, and other supernatural threats can be inherently evil. Against such foes, paladins who swear this oath bring the full wrath of their weapons and spells to bear. Yet the redeemers still pray that, one day, even creatures of wickedness will invite their own redemption.",
		levels:[{},{},{},{//3
			updates:[
				{
					always:true,
					choicePrompt:"You gain the following:",
					choices:[findSpell("Sanctuary"),findSpell("Sleep"),findAbility("Channel Divinity"),findAbility("Emissary of Peace"),findAbility("Rebuke the Violent")],
					action:function(char){
						getPlayerSpell(char,"Sanctuary","Paladin").alwaysPrepared=true;
						getPlayerSpell(char,"Sleep","Paladin").alwaysPrepared=true;
						addAbility(char,"Channel Divinity");
						addAbility(char,"Emissary of Peace");
						addAbility(char,"Rebuke the Violent");
					}
				}
			]
		},{},{ //5
			updates:[
				{
					always:true,
					choicePrompt:"You always have these prepared now:",
					choices:[findSpell("Calm Emotions"),findSpell("Hold Person")],
					action:function(char){
						getPlayerSpell(char,"Calm Emotions","Paladin").alwaysPrepared=true;
						getPlayerSpell(char,"Hold Person","Paladin").alwaysPrepared=true;
					}
				}
			]
		},{},{ //7
			updates:[
				{
					always:true,
					choicePrompt:"You gain the following:",
					choices:[findPassive("Aura of the Guardian")],
					action:function(char){
						addPassive("Aura of the Guardian");
					}
				}
			]
		},{},{ //9
			updates:[
				{
					always:true,
					choicePrompt:"You always have these prepared now:",
					choices:[findSpell("Counterspell"),findSpell("Hypnotic Pattern")],
					action:function(char){
						getPlayerSpell(char,"Counterspell","Paladin").alwaysPrepared=true;
						getPlayerSpell(char,"Hypnotic Pattern","Paladin").alwaysPrepared=true;
					}
				}
			]
		},{},{},{},{ //13
			updates:[
				{
					always:true,
					choicePrompt:"You always have these prepared now:",
					choices:[findSpell("Stoneskin"),findSpell("Otiluke's Resilient Sphere")],
					action:function(char){
						getPlayerSpell(char,"Stoneskin","Paladin").alwaysPrepared=true;
						getPlayerSpell(char,"Otiluke's Resilient Sphere","Paladin").alwaysPrepared=true;
					}
				}
			]
		},{},{ //15
			updates:[
				{
					always:true,
					choicePrompt:"You gain the following:",
					choices:[findPassive("Protective Spirit")],
					action:function(char){
						addPassive(char,"Protective Spirit");
					}
				}
			]
		},{},{ //17
			updates:[
				{
					always:true,
					choicePrompt:"You always have these prepared now:",
					choices:[findSpell("Hold Monster"),findSpell("Wall of Force")],
					action:function(char){
						getPlayerSpell(char,"Hold Monster","Paladin").alwaysPrepared=true;
						getPlayerSpell(char,"Wall of Force","Paladin").alwaysPrepared=true;
					}
				}
			]
		},{},{},{ //20
			updates:[
				{
					always:true,
					choicePrompt:"You gain the following:",
					choices:[findPassive("Emissary of Redemption")],
					action:function(char){
						addPassive(char,"Emissary of Redemption");
					}
				}
			]
		}
		]
	}
);

window.subclasses.push(
	{
		classname:"Paladin",
		name:"Oath of Devotion",
		subclass:"Oath of Devotion",
		description:"The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order. Sometimes called cavaliers, white knights, or holy warriors, these paladins meet the ideal of the knight in shining armor, acting with honor in pursuit of justice and the greater good. They hold themselves to the highest standards of conduct, and some, for better or worse, hold the rest of the world to the same standards. Many who swear this oath are devoted to gods of law and good and use their gods' tenets as the measure of their devotion. They hold angels—the perfect servants of good—as their ideals, and incorporate images of angelic wings into their helmets or coats of arms.",
		levels:[{},{},{},{//3
			updates:[
				{
					always:true,
					choicePrompt:"You gain the following:",
					choices:[findSpell("Sanctuary"),findSpell("Sleep"),findAbility("Channel Divinity"),findAbility("Emissary of Peace"),findAbility("Rebuke the Violent")],
					action:function(char){
						getPlayerSpell(char,"Sanctuary","Paladin").alwaysPrepared=true;
						getPlayerSpell(char,"Protection from Evil and Good","Paladin").alwaysPrepared=true;
						addAbility(char,"Channel Divinity");
						addAbility(char,"Sacred Weapon");
						addAbility(char,"Turn the Unholy");
					}
				}
			]
		},{},{ //5
			updates:[
				{
					always:true,
					choicePrompt:"You always have these prepared now:",
					choices:[findSpell("Lesser Restoration"),findSpell("Zone of Truth")],
					action:function(char){
						getPlayerSpell(char,"Lesser Restoration","Paladin").alwaysPrepared=true;
						getPlayerSpell(char,"Zone of Truth","Paladin").alwaysPrepared=true;
					}
				}
			]
		},{},{ //7
			updates:[
				{
					always:true,
					choicePrompt:"You gain the following:",
					choices:[findPassive("Aura of Devotion")],
					action:function(char){
						addPassive("Aura of Devotion");
					}
				}
			]
		},{},{ //9
			updates:[
				{
					always:true,
					choicePrompt:"You always have these prepared now:",
					choices:[findSpell("Beacon of Hope"),findSpell("Dispel Magic")],
					action:function(char){
						getPlayerSpell(char,"Beacon of Hope","Paladin").alwaysPrepared=true;
						getPlayerSpell(char,"Dispel Magic","Paladin").alwaysPrepared=true;
					}
				}
			]
		},{},{},{},{ //13
			updates:[
				{
					always:true,
					choicePrompt:"You always have these prepared now:",
					choices:[findSpell("Freedom of Movement"),findSpell("Guardian of Faith")],
					action:function(char){
						getPlayerSpell(char,"Freedom of Movement","Paladin").alwaysPrepared=true;
						getPlayerSpell(char,"Guardian of Faith","Paladin").alwaysPrepared=true;
					}
				}
			]
		},{},{ //15
			updates:[
				{
					always:true,
					choicePrompt:"You gain the following:",
					choices:[findPassive("Purity of Spirit")],
					action:function(char){
						addPassive(char,"Purity of Spirit");
					}
				}
			]
		},{},{ //17
			updates:[
				{
					always:true,
					choicePrompt:"You always have these prepared now:",
					choices:[findSpell("Commune"),findSpell("Flame Strike")],
					action:function(char){
						getPlayerSpell(char,"Commune","Paladin").alwaysPrepared=true;
						getPlayerSpell(char,"Flame Strike","Paladin").alwaysPrepared=true;
					}
				}
			]
		},{},{},{ //20
			updates:[
				{
					always:true,
					choicePrompt:"You gain the following:",
					choices:[findAbility("Holy Nimbus")],
					action:function(char){
						addAbility(char,"Holy Nimbus");
					}
				}
			]
		}
		]
	}
);