window.feats=[
	{
			name:"Actor",
			description:"Skilled at mimicry and dramatics, you gain the following benefits:\n\u2022 Increase your Charisma score by 1, to a maximum of 20.\n\u2022 You have advantage on Charisma (Deception) and Charisma (Performance) checks when trying to pass yourself off as a different person.\n\u2022 You can mimic the speech of another person or the sounds made by other creatures. You must have heard the person speaking, or heard the creature make the sound, for at least 1 minute. A successful Wisdom (Insight) check contested by your Charisma (Deception) check allows a listener to determine that the effect is faked.",
			onPickup:function(char,scope){
				if (char.attributes.cha<20){
					char.attributes.cha+=1;
				}
			}
	},{
			name:"Alert",
			description:"Always on the lookout for danger, you gain the following benefits:\n\u2022 You get a +5 bonus to initiative.\n\u2022 You can't be surprised while you're conscious.\n\u2022 Other creatures don't gain advantage on attacks against you as a result of being unseen by you.",
			apply:function(char,scope){
				scope.derived.initiative+=5;
			}
	},{
			name:"Athlete (Str)",
			identity:"Athlete",
			description:"You have undergone extensive physical training to gain the following benefits:\n\u2022 Increase your Strength by 1, to a maximum of 20.\n\u2022 When you are prone, standing up uses only 5 feet of your movement.\n\u2022 Climbing doesn't cost you extra movement.\n\u2022 You can make a running long jump or a running high jump after moving only 5 feet on foot, rather than 10 feet.",
			onPickup:function(char,scope){
				if (char.attributes.str<20){
					char.attributes.str+=1;
				}
			}
	},{
			name:"Athlete (Dex)",
			identity:"Athlete",
			description:"You have undergone extensive physical training to gain the following benefits:\n\u2022 Increase your Dexterity by 1, to a maximum of 20.\n\u2022 When you are prone, standing up uses only 5 feet of your movement.\n\u2022 Climbing doesn't cost you extra movement.\n\u2022 You can make a running long jump or a running high jump after moving only 5 feet on foot, rather than 10 feet.",
			onPickup:function(char,scope){
				if (char.attributes.dex<20){
					char.attributes.dex+=1;
				}
			}
	},{
			name:"Charger",
			description:"When you use your action to Dash, you can use a bonus action to make one melee weapon attack or to shove a creature. If you move at least 10 feet in a straight line immediately before taking this bonus action, you either gain a +5 bonus to the attack's damage roll (if you chose to make a melee attack and hit) or push the target up to 10 feet away from you (if you chose to shove and you succeed)."
	},{
			name:"Crossbow Expert",
			description:"Thanks to extensive practice with the crossbow, you gain the following benefits:\n\u2022 You ignore the loading quality of crossbows with which you are proficient.\n\u2022 Being within 5 feet of a hostile creature doesn't impose disadvantage on your ranged attack rolls.\n\u2022 When you use the Attack action and attack with a one-handed weapon, you can use a bonus action to attack with a hand crossbow you are holding."
	},{
			name:"Defensive Duelist",
			description:"When you are wielding a finesse weapon with which you are proficient and another creature hits you with a melee attack, you can use your reaction to add your proficiency bonus to your AC for that attack, potentially causing the attack to miss you.",
			requirement:function(char,scope){
				return char.attributes.dex>=13;
			}
	},{
			name:"Dual Wielder",
			description:"You master fighting with two weapons, gaining the following benefits:\n\u2022 You gain a +1 bonus to AC while you are wielding a separate melee weapon in each hand.\n\u2022 You can use two-weapon fighting even when the one-handed melee weapons you are wielding aren't light.\n\u2022 You can draw or stow two one-handed weapons when you would normally be able to draw or stow only one."
	},{
			name:"Dungeon Delver",
			description:"Alert to the hidden traps and secret doors found in many dungeons, you gain the following benefits:\n\u2022 You have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors.\n\u2022 You have advantage on saving throws made to avoid or resist traps.\n\u2022 You have resistance to the damage dealt by traps.\n\u2022 Traveling at a fast pace doesn't impose the normal -5 penalty on your passive Wisdom (Perception) score."
	},{
			name:"Durable",
			description:"Hardy and resilient, you gain the following benefits:\n\u2022 Increase your Constitution score by 1, to a maximum of 20.\n\u2022 When you roll a Hit Die to regain hit points, the minimum number of hit points you regain from the roll equals twice your Constitution modifier (minimum of 2).",
			onPickup:function(char,$scope){
				if (char.attributes.con<20){
					char.attributes.con+=1;
				}
			}
	},{
			name:"Elemental Adept (Fire)",
			description:"When you gain this feat, choose one of the following damage types: acid, cold, fire, lightning, or thunder.\nSpells you cast ignore resistance to damage of the chosen type. In addition, when you roll damage for a spell you cast that deals damage of that type, you can treat any 1 on a damage die as a 2.\nYou can select this feat multiple times. Each time you do so, you must choose a different damage type."
	},{
			name:"Elemental Adept (Cold)",
			description:"When you gain this feat, choose one of the following damage types: acid, cold, fire, lightning, or thunder.\nSpells you cast ignore resistance to damage of the chosen type. In addition, when you roll damage for a spell you cast that deals damage of that type, you can treat any 1 on a damage die as a 2.\nYou can select this feat multiple times. Each time you do so, you must choose a different damage type."
	},{
			name:"Elemental Adept (Acid)",
			description:"When you gain this feat, choose one of the following damage types: acid, cold, fire, lightning, or thunder.\nSpells you cast ignore resistance to damage of the chosen type. In addition, when you roll damage for a spell you cast that deals damage of that type, you can treat any 1 on a damage die as a 2.\nYou can select this feat multiple times. Each time you do so, you must choose a different damage type."
	},{
			name:"Elemental Adept (Lightning)",
			description:"When you gain this feat, choose one of the following damage types: acid, cold, fire, lightning, or thunder.\nSpells you cast ignore resistance to damage of the chosen type. In addition, when you roll damage for a spell you cast that deals damage of that type, you can treat any 1 on a damage die as a 2.\nYou can select this feat multiple times. Each time you do so, you must choose a different damage type."
	},{
			name:"Elemental Adept (Thunder)",
			description:"When you gain this feat, choose one of the following damage types: acid, cold, fire, lightning, or thunder.\nSpells you cast ignore resistance to damage of the chosen type. In addition, when you roll damage for a spell you cast that deals damage of that type, you can treat any 1 on a damage die as a 2.\nYou can select this feat multiple times. Each time you do so, you must choose a different damage type."
	},{
			name:"Grappler",
			description:"You've developed the skills necessary to hold your own in close-quarters grappling. You gain the following benefits:\n\u2022 You have advantage on attack rolls against a creature you are grappling.\n\u2022 You can use your action to try to pin a creature grappled by you. To do so, make another grapple check. If you succeed, you and the creature are both restrained until the grapple ends.",
			requirement:function(char,scope){
				return char.attributes.str>=13;
			}
	},{
			name:"Great Weapon Master",
			description:"You've learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes. You gain the following benefits:\n\u2022 On your turn, when you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can make one melee weapon attack as a bonus action.\n\u2022 Before you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage."
	},{
			name:"Healer",
			description:"You are an able physician, allowing you to mend wounds quickly and get your allies back in the fight. You gain the following benefits:\n\u2022 When you use a healer's kit to stabilize a dying creature, that creature also regains 1 hit point.\n\u2022 As an action, you can spend one use of a healer's kit to tend to a creature and restore 1d6+4 hit points to it, plus additional hit points equal to the creature's maximum number of Hit Dice. The creature can't regain hit points from this feat again until it finishes a short or long rest."
	},{
			name:"Heavily Armored",
			description:"You have trained to master the use of heavy armor, gaining the following benefits:\n\u2022 Increase your Strength score by 1, to a maximum of 20.\n\u2022 You gain proficiency with heavy armor.",
			requirement:function(char,scope){
				return hasProficiency(char,"Medium Armor");
			},
			onPickup:function(char,scope){
				char.proficiencies.upush("Heavy Armor");
				if (char.attributes.str<20){
					char.attributes.str+=1;
				}
			}
	},{
			name:"Heavy Armor Master",
			description:"You can use your armor to deflect strikes that would kill others. You gain the following benefits:\n\u2022 Increase your Strength score by 1, to a maximum of 20.\n\u2022 While you are wearing heavy armor, bludgeoning, piercing, and slashing damage that you take from nonmagical weapons is reduced by 3.",
			requirement:function(char,scope){
				return hasProficiency(char,"Heavy Armor");
			},
			onPickup:function(char,scope){
				if (char.attributes.str<20){
					char.attributes.str+=1;
				}
			}
	},{
			name:"Inspiring Leader",
			description:"You can spend 10 minutes inspiring your companions, shoring up their resolve to fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you and who can understand you. Each creature can gain temporary hit points equal to your level + your Charisma modifier. A creature can't gain temporary hit points from this feat again until it has finished a short or long rest.",
			requirement:function(char,scope){
				return char.attributes.cha>=13;
			}
	},{
			name:"Keen Mind",
			description:"You have a mind that can track time, direction, and detail with uncanny precision. You gain the following benefits:\n\u2022 Increase your Intelligence score by 1, to a maximum of 20.\n\u2022 You always know which way is north.\n\u2022 You always know the number of hours left before the next sunrise or sunset.\n\u2022 You can accurately recall anything you have seen or heard within the past month.",
			onPickup:function(char,scope){
				if (char.attributes.int<20){
					char.attributes.int+=1;
				}
			}
	},{
			name:"Lightly Armored (Str)",
			identity:"Lightly Armored",
			description:"You have trained to master the use of light armor, gaining the following benefits:\n\u2022 Increase your Strength or Dexterity by 1, to a maximum of 20.\n\u2022 You gain proficiency with light armor.",
			onPickup:function(char,scope){
				char.proficiencies.upush("Light Armor");
				if (char.attributes.str<20){
					char.attributes.str+=1;
				}
			}
	},{
			name:"Lightly Armored (Dex)",
			identity:"Lightly Armored",
			description:"You have trained to master the use of light armor, gaining the following benefits:\n\u2022 Increase your Strength or Dexterity by 1, to a maximum of 20.\n\u2022 You gain proficiency with light armor.",
			onPickup:function(char,scope){
				char.proficiencies.upush("Light Armor");
				if (char.attributes.dex<20){
					char.attributes.dex+=1;
				}
			}
	},{
			name:"Linguist",
			description:"You have studied languages and codes, gaining the following benefits:\n\u2022 Increase your Intelligence score by 1, to a maximum of 20.\n\u2022 You learn three languages of your choice.\n\u2022 You can ably create written ciphers. Others can't decipher a code you create unless you teach them, they succeed on an Intelligence check (DC equal to your Intelligence score + your proficiency bonus), or they use magic to decipher it.",
			onPickup:function(char,scope){
				if (char.attributes.int<20){
					char.attributes.int+=1;
				}
				scope.choiceQueue.push(helper.learnLanguage);
				scope.choiceQueue.push(helper.learnLanguage);
				scope.choiceQueue.push(helper.learnLanguage);
			}
	},{
			name:"Lucky",
			description:"You have inexplicable luck that seems to kick in at just the right moment.\nYou have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the d20s is used for the attack roll, ability check, or saving throw.\nYou can also spend one luck point when an attack roll is made against you. Roll a d20, and then choose whether the attack uses the attacker's roll or yours. If more than one creature spends a luck point to influence the outcome of a roll, the points cancel each other out; no additional dice are rolled.\nYou regain your expended luck points when you finish a long rest.",
			onPickup:function(char,scope){
				addAbility(char,"Lucky");
			}
	},{
			name:"Mage Slayer",
			description:"You have practiced techniques useful in melee combat against spellcasters, gaining the following benefits:\n\u2022 When a creature within 5 feet of you casts a spell, you can use your reaction to make a melee weapon attack against that creature.\n\u2022 When you damage a creature that is concentrating on a spell, that creature has disadvantage on the saving throw it makes to maintain its concentration.\n\u2022 You have advantage on saving throws against spells cast by creatures within 5 feet of you."
	},{
			name:"Magic Initiate (doesnt work)",
			description:"Choose a class: bard, cleric, druid, sorcerer, warlock, or wizard. You learn two cantrips of your choice from that class's spell list.\nIn addition, choose one 1st-level spell from that same list. You learn that spell and can cast it at its lowest level. Once you cast it, you must finish a long rest before you can cast it again using this feat.\nYour spellcasting ability for these spells depends on the class you chose: Charisma for bard, sorcerer, or warlock; Wisdom for cleric or druid: or Intelligence for wizard.",
			requirement:function(){return false;},
			onPickup:function(char,scope){
				scope.choiceQueue.push({
					choicePrompt:"Choose a class for Magic Initiate",
					choices:['Bard','Cleric','Druid','Sorcerer','Warlock','Wizard'],
					action:function(char,derived,choice,scope){
						var cantripList = listUnknownCantripsForClass(char,choice);
						scope.choiceQueue.push({
							limit:2,
							choicePrompt:"Choose two Cantrips",
							choices:cantripList,
							action:function(char2,derived2,choice2){
								addSpell(char2,choice2,choice);
							}
						});
						var spellList = [];
						for (let spell of window.spells){
							if (spell.level==1 && spell.classes.includes(choice)){
								spellList.push(spell);
							}
						}
						scope.choiceQueue.push({
							choicePrompt:"Choose a Spell (Magic Initiate)",
							choices:spellList,
							action:function(char2,derived2,choice2){
								var abil = angular.copy(findSpell(choice2));
								abil.charges=1;
								abil.maxCharges=1;
								abil.onLongRest=function(){
										this.charges=this.maxCharges;
								};
								abil.description+="\n\nYou may cast this once per long rest.";
								char.abilities.push(abil);
							}
						});
					}
				});
			}
	},{
			name:"Martial Adept",
			identity:"Martial Adept",
			description:"You have martial training that allows you to perform special combat maneuvers. You gain the following benefits:\n\u2022 You learn two maneuvers of your choice from among those available to the Battle Master archetype in the fighter class. If a maneuver you use requires your target to make a saving throw to resist the maneuver's effects, the saving throw DC equals 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice).\n\u2022 You gain one superiority die, which is a d6 (this die is added to any superiority dice you have from another source). This die is used to fuel your maneuvers. A superiority die is expended when you use it. You regain your expended superiority dice when you finish a short or long rest.",
			onPickup:function(char,scope){
				scope.choiceQueue.push(helper.chooseManeuver);
				scope.choiceQueue.push(helper.chooseManeuver);
				addAbility(char,"Superiority d6 (Martial Adept)");
			}
	},{
			name:"Medium Armor Master",
			description:"You have practiced moving in medium armor to gain the following benefits:\n\u2022 Wearing medium armor doesn't impose disadvantage on your Dexterity (Stealth) checks.\n\u2022 When you wear medium armor, you can add 3, rather than 2, to your AC if you have a Dexterity of 16 or higher.",
			requirement:function(char,scope){
				return hasProficiency(char,"Medium Armor");
			}
	},{
			name:"Mobile",
			description:"You are exceptionally speedy and agile. You gain the following benefits:\n\u2022 Your speed increases by 10 feet.\n\u2022 When you use the Dash action, difficult terrain doesn't cost you extra movement on that turn.\n\u2022 When you make a melee attack against a creature, you don't provoke opportunity attacks from that creature for the rest of the turn, whether you hit or not.",
			apply:function(char,scope){
				scope.derived.moveSpeed+=10;
			}
	},{
			name:"Moderately Armored (Str)",
			identity:"Moderately Armored",
			description:"You have trained to master the use of medium armor and shields, gaining the following benefits:\n\u2022 Increase your Strength or Dexterity by 1, to a maximum of 20.\n\u2022 You gain proficiency with medium armor and shields.",
			requirement:function(char,scope){
				return hasProficiency(char,"Light Armor");
			},
			onPickup:function(char,scope){
				addProficiency(char,"Medium Armor");
				addProficiency(char,"Shields");
				if (char.attributes.str<20){
					char.attributes.str+=1;
				}
			}
	},{
			name:"Moderately Armored (Dex)",
			identity:"Moderately Armored",
			description:"You have trained to master the use of medium armor and shields, gaining the following benefits:\n\u2022 Increase your Strength or Dexterity by 1, to a maximum of 20.\n\u2022 You gain proficiency with medium armor and shields.",
			requirement:function(char,scope){
				return hasProficiency(char,"Light Armor");
			},
			onPickup:function(char,scope){
				addProficiency(char,"Medium Armor");
				addProficiency(char,"Shields");
				if (char.attributes.dex<20){
					char.attributes.dex+=1;
				}
			}
	},{
			name:"Observant (Int)",
			description:"Quick to notice details of your environment, you gain the following benefits:\n\u2022 Increase your Intelligence or Wisdom by 1, to a maximum of 20.\n\u2022 If you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips.\n\u2022 You have a +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores.",
			onPickup:function(char,scope){
				if (char.attributes.int<20){
					char.attributes.int+=1;
				}
			}
	},{
			name:"Observant (Wis)",
			description:"Quick to notice details of your environment, you gain the following benefits:\n\u2022 Increase your Intelligence or Wisdom by 1, to a maximum of 20.\n\u2022 If you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips.\n\u2022 You have a +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores.",
			onPickup:function(char,scope){
				if (char.attributes.wis<20){
					char.attributes.wis+=1;
				}
			}
	},{
			name:"Polearm Master",
			description:"You can keep your enemies at bay with reach weapons. You gain the following benefits:\n\u2022 When you take the Attack action and attack with only a glaive, halberd, quarterstaff, or spear, you can use a bonus action to make a melee attack with the opposite end of the weapon; this attack uses the same ability modifier as the primary attack. The weapon's damage die for this attack is a d4, and the attack deals bludgeoning damage.\n\u2022 While you are wielding a glaive, halberd, pike, quarterstaff, or spear, other creatures provoke an opportunity attack from you when they enter your reach."
	},{
			name:"Prodigy",
			description:"You have a knack for learning new things. You gain the following benefits:\n\u2022 You gain one skill proficiency of your choice, one tool proficiency of your choice, and fluency in one language of your choice.\n\u2022 Choose one skill in which you have proficiency. You gain expertise with that skill, which means your proficiency bonus is doubled for any ability check you make with it. The skill you choose must be one that isn't already benefiting from a feature, such as Expertise, that doubles your proficiency bonus.",
			onPickup:function(char,scope){
				scope.choiceQueue.push(helper.learnLanguage);
				scope.choiceQueue.push(helper.learnTool);
				scope.choiceQueue.push(helper.learnSkillProficiency);
				scope.choiceQueue.push(helper.chooseExpertise);
			}
	},{
			name:"Resilient (Str)",
			identity:"Resilient",
			description:"Choose one ability score. You gain the following benefits:\n\u2022 Increase the chosen ability score by 1, to a maximum of 20.\n\u2022 You gain proficiency in saving throws using the chosen ability.",
			onPickup:function(char,scope){
				if (char.attributes.str<20){
					char.attributes.str+=1;
				}
				char.saves.str=1;
			}
	},{
			name:"Resilient (Dex)",
			identity:"Resilient",
			description:"Choose one ability score. You gain the following benefits:\n\u2022 Increase the chosen ability score by 1, to a maximum of 20.\n\u2022 You gain proficiency in saving throws using the chosen ability.",
			onPickup:function(char,scope){
				if (char.attributes.dex<20){
					char.attributes.dex+=1;
				}
				char.saves.dex=1;
			}
	},{
			name:"Resilient (Con)",
			identity:"Resilient",
			description:"Choose one ability score. You gain the following benefits:\n\u2022 Increase the chosen ability score by 1, to a maximum of 20.\n\u2022 You gain proficiency in saving throws using the chosen ability.",
			onPickup:function(char,scope){
				if (char.attributes.con<20){
					char.attributes.con+=1;
				}
				char.saves.con=1;
			}
	},{
			name:"Resilient (Int)",
			identity:"Resilient",
			description:"Choose one ability score. You gain the following benefits:\n\u2022 Increase the chosen ability score by 1, to a maximum of 20.\n\u2022 You gain proficiency in saving throws using the chosen ability.",
			onPickup:function(char,scope){
				if (char.attributes.int<20){
					char.attributes.int+=1;
				}
				char.saves.int=1;
			}
	},{
			name:"Resilient (Wis)",
			identity:"Resilient",
			description:"Choose one ability score. You gain the following benefits:\n\u2022 Increase the chosen ability score by 1, to a maximum of 20.\n\u2022 You gain proficiency in saving throws using the chosen ability.",
			onPickup:function(char,scope){
				if (char.attributes.wis<20){
					char.attributes.wis+=1;
				}
				char.saves.wis=1;
			}
	},{
			name:"Resilient (Cha)",
			identity:"Resilient",
			description:"Choose one ability score. You gain the following benefits:\n\u2022 Increase the chosen ability score by 1, to a maximum of 20.\n\u2022 You gain proficiency in saving throws using the chosen ability.",
			onPickup:function(char,scope){
				if (char.attributes.cha<20){
					char.attributes.cha+=1;
				}
				char.saves.cha=1;
			}
	},{
			name:"Ritual Caster (doesnt work)",
			description:"",
			requirement:function(){return false;}
	},{
			name:"Savage Attacker",
			description:"Once per turn when you roll damage for a melee weapon attack, you can reroll the weapon's damage and use either total."
	},{
			name:"Sentinel",
			description:"You have mastered techniques to take advantage of every drop in any enemy's guard, gaining the following benefits:\n\u2022 When you hit a creature with an opportunity attack, the creature's speed becomes 0 for the rest of the turn.\n\u2022 Creatures provoke opportunity attacks from you even if they take the Disengage action before leaving your reach.\n\u2022 When a creature within 5 feet of you makes an attack against a target other than you (and that target doesn't have this feat), you can use your reaction to make a melee weapon attack against the attacking creature."
	},{
			name:"Sharpshooter",
			description:"You have mastered ranged weapons and can make shots that others find impossible. You gain the following benefits:\n\u2022 Attacking at long range doesn't impose disadvantage on your ranged weapon attack rolls.\n\u2022 Your ranged weapon attacks ignore half cover and three-quarters cover.\n\u2022 Before you make an attack with a ranged weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage."
	},{
			name:"Shield Master",
			description:"You use shields not just for protection but also for offense. You gain the following benefits while you are wielding a shield:\n\u2022 If you take the Attack action on your turn, you can use a bonus action to try to shove a creature within 5 feet of you with your shield.\n\u2022 If you aren't incapacitated, you can add your shield's AC bonus to any Dexterity saving throw you make against a spell or other harmful effect that targets only you.\n\u2022 If you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you can use your reaction to take no damage if you succeed on the saving throw, interposing your shield between yourself and the source of the effect."
	},{
			name:"Skilled",
			description:"You gain proficiency in any combination of three skills or tools of your choice.",
			onPickup:function(char,scope){
				scope.choiceQueue.push({
						"choicePrompt":"Choose a proficiency:",
						"choices":[listNonProficientSkills,listNonProficientTools],
						"action":function(char,derived,choice){
							for (let skill of char.skills){
								if (choice===skill.name){
									skill.mult=1;
									return;
								}
							}
							addProficiency(char,choice);
						}
					});
				scope.choiceQueue.push({
						"choicePrompt":"Choose a proficiency:",
						"choices":[listNonProficientSkills,listNonProficientTools],
						"action":function(char,derived,choice){
							for (let skill of char.skills){
								if (choice===skill.name){
									skill.mult=1;
									return;
								}
							}
							addProficiency(char,choice);
						}
					});
				scope.choiceQueue.push({
						"choicePrompt":"Choose a proficiency:",
						"choices":[listNonProficientSkills,listNonProficientTools],
						"action":function(char,derived,choice){
							for (let skill of char.skills){
								if (choice===skill.name){
									skill.mult=1;
									return;
								}
							}
							addProficiency(char,choice);
						}
					});
			}
	},{
			name:"Skulker",
			description:"You are expert at slinking through shadows. You gain the following benefits:\n\u2022 You can try to hide when you are lightly obscured from the creature from which you are hiding.\n\u2022 When you are hidden from a creature and miss it with a ranged weapon attack, making the attack doesn't reveal your position.\n\u2022 Dim light doesn't impose disadvantage on your Wisdom (Perception) checks relying on sight.",
			requirement:function(char){
				return char.attributes.dex>=13;
			}
	},{
			name:"Spell Sniper (Bard)",
			identity:"Spell Sniper",
			description:"You have learned techniques to enhance your attacks with certain kinds of spells, gaining the following benefits:\n\u2022 When you cast a spell that requires you to make an attack roll, the spell's range is doubled.\n\u2022 Your ranged spell attacks ignore half cover and three-quarters cover.\n\u2022 You learn one cantrip that requires an attack roll. Choose the cantrip from the bard, cleric, druid, sorcerer, warlock, or wizard spell list. Your spellcasting ability for this cantrip depends on the spell list you chose from: Charisma for bard, sorcerer, or warlock; Wisdom for cleric or druid; or Intelligence for wizard.",
			onPickup:function(char,scope){
				scope.choiceQueue.push(
					{
						"choicePrompt":"Choose a cantrip.",
						"choices":[listUnknownBardCantrips],
						"action":function(char,derived,choice,$scope){
							addSpell(char,choice,"Bard");
						}
					}
				);
			}
	},{
			name:"Squat Nimbleness (Str)",
			identity:"Squat Nimbleness",
			description:"You are uncommonly nimble for your race. You gain the following benefits:\n\u2022 Incrase your strength by 1, to a maximum of 20.\n\u2022 Increase your walking speed by 5 feet.\n\u2022 You gain proficiency in Acrobatics or Athletics (your choice)\n\u2022 You have advanatge on any Athletics or Acrobatics checks you make to escape from being grappled.",
			onPickup:function(char,scope){
				if (char.attributes.str<20){
					char.attributes.str+=1;
				}
				char.speed+=5;
				if (findSkill(char,"Acrobatics").mult>0){
					addProficiency(char,"Athletics");
				} else if (findSkill(char,"Athletics").mult>0){
					addProficiency(char,"Acrobatics");
				} else {
					scope.choiceQueue.push({
						"choicePrompt":"Choose a proficiency",
						"choices":["Acrobatics","Athletics"],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					});
				}
			}
	},{
			name:"Squat Nimbleness (Dex)",
			identity:"Squat Nimbleness",
			description:"You are uncommonly nimble for your race. You gain the following benefits:\n\u2022 Incrase your dexterity by 1, to a maximum of 20.\n\u2022 Increase your walking speed by 5 feet.\n\u2022 You gain proficiency in Acrobatics or Athletics (your choice)\n\u2022 You have advanatge on any Athletics or Acrobatics checks you make to escape from being grappled.",
			onPickup:function(char,scope){
				if (char.attributes.dex<20){
					char.attributes.dex+=1;
				}
				char.speed+=5;
				if (findSkill(char,"Acrobatics").mult>0){
					addProficiency(char,"Athletics");
				} else if (findSkill(char,"Athletics").mult>0){
					addProficiency(char,"Acrobatics");
				} else {
					scope.choiceQueue.push({
						"choicePrompt":"Choose a proficiency",
						"choices":["Acrobatics","Athletics"],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					});
				}
			}
	},{
			name:"Tavern Brawler (Str)",
			identity:"Tavern Brawler",
			description:"Accustomed to rough-and-tumble fighting using whatever weapons happen to be at hand, you gain the following benefits:\n\u2022 Increase your Strength or Constitution by 1, to a maximum of 20.\n\u2022 You are proficient with improvised weapons.\n\u2022 Your unarmed strike uses a d4 for damage.\n\u2022 When you hit a creature with an unarmed strike or an improvised weapon on your turn, you can use a bonus action to attempt to grapple the target.",
			onPickup:function(char,scope){
				addProficiency(char,"Improvised Weapons");
				if (char.attributes.str<20){
					char.attributes.str+=1;
				}
			}
	},{
			name:"Tavern Brawler (Con)",
			identity:"Tavern Brawler",
			description:"Accustomed to rough-and-tumble fighting using whatever weapons happen to be at hand, you gain the following benefits:\n\u2022 Increase your Strength or Constitution by 1, to a maximum of 20.\n\u2022 You are proficient with improvised weapons.\n\u2022 Your unarmed strike uses a d4 for damage.\n\u2022 When you hit a creature with an unarmed strike or an improvised weapon on your turn, you can use a bonus action to attempt to grapple the target.",
			onPickup:function(char,scope){
				addProficiency(char,"Improvised Weapons");
				if (char.attributes.con<20){
					char.attributes.con+=1;
				}
			}
	},{
		//TODO: Add logic in stats.js to look for this during a levelup.
			name:"Tough",
			description:"Your hit point maximum increases by an amount equal to twice your level when you gain this feat. Whenever you gain a level thereafter, your hit point maximum increases by an additional 2 hit points.",
			apply:function(char,$scope){
				$scope.derived.maxHp+=char.level*2;
			}
	},{
			name:"War Caster",
			description:"You have practiced casting spells in the midst of combat, learning techniques that grant you the following benefits:\n\u2022 You have advantage on Constitution saving throws that you make to maintain your concentration on a spell when you take damage.\n\u2022 You can perform the somatic components of spells even when you have weapons or a shield in one or both hands.\n\u2022 When a hostile creature's movement provokes an opportunity attack from you, you can use your reaction to cast a spell at the creature, rather than making an opportunity attack. The spell must have a casting time of 1 action and must target only that creature."
	},{
			name:"Weapon Master (Str)",
			identity:"Weapon Master",
			description:"You have practiced extensively with a variety of weapons, gaining the following benefits:\n\u2022 Increase your Strength or Dexterity by 1, to a maximum of 20.\n\u2022 You gain proficiency with four simple or martial weapons of your choice. Each one must be a simple or a martial weapon.",
			onPickup:function(char,scope){
				if (char.attributes.str<20){
					char.attributes.str+=1;
				}
				scope.choiceQueue.push(chooseWeaponProficiency);
				scope.choiceQueue.push(chooseWeaponProficiency);
				scope.choiceQueue.push(chooseWeaponProficiency);
				scope.choiceQueue.push(chooseWeaponProficiency);
			}
	},{
			name:"Weapon Master (Dex)",
			identity:"Weapon Master",
			description:"You have practiced extensively with a variety of weapons, gaining the following benefits:\n\u2022 Increase your Strength or Dexterity by 1, to a maximum of 20.\n\u2022 You gain proficiency with four simple or martial weapons of your choice. Each one must be a simple or a martial weapon.",
			onPickup:function(char,scope){
				if (char.attributes.dex<20){
					char.attributes.dex+=1;
				}
				scope.choiceQueue.push(chooseWeaponProficiency);
				scope.choiceQueue.push(chooseWeaponProficiency);
				scope.choiceQueue.push(chooseWeaponProficiency);
				scope.choiceQueue.push(chooseWeaponProficiency);
			}
	}
];