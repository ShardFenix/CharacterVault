function listAvailableInvocations(char){
	let result=[];
	for (let i of window.passives){
		if (i.tags && i.tags.includes("Eldritch Invocation")){
			if (i.requirement && !i.requirement(char)){
				continue;
			}
			if (hasPassive(char,i.name)){
				continue;
			}
			result.push(i);
		}
	}
	return result;
}

function listArcanums(char){
	let result=[];
	let spellLevel=ladder(classLevel(char,"Warlock"),0,0,11,6,13,7,15,8,17,9);
	for (let spell of window.spells){
		if (spell.level === spellLevel && spell.classes.includes("Warlock")){
			result.push(spell);
		}
	}
	return result;
}

helper.chooseArcanum={
						summary:{name:"Mystic Arcanum",description:"Choose a Mystic Arcanum"},
						choicePrompt:"Choose a Mystic Arcanum",
						choices:[listArcanums],
						action:function(char,derived,choice){
							let spell = angular.copy(findSpell(choice));
							spell.maxCharges=1;
							spell.charges=1;
							spell.name="Arcanum: "+spell.name;
							spell.description="You can cast "+spell.name+" once without spending a spell slot.\n\n"+ spell.description;
							addAbility(char,spell);
						}
					};

helper.chooseInvocation={
						choicePrompt:"Choose an Eldritch Invocation",
						choices:[listAvailableInvocations],
						action:function(char,derived,choice){
							addPassive(char,choice);
						}
					};

helper.unlearnInvocation={
						choicePrompt:"Choose an Invocation to unlearn",
						choices:[function(char){
							let result=[];
							for (let p of char.passives){
								if (p.tags && p.tags.contains("Eldritch Invocation")){
									result.push(p);
								}
							}
							return result;
						}],
						action:function(char,derived,choice,scope){
							removePassive(choice);
						}
					};
					
window.abilities.append([
	{
		name:"Dark One's Own Luck",
		description:"You can call on your patron to alter fate in your favor. When you make an ability check or a saving throw, you can use this feature to add a d10 to your roll. You can do so after seeing the initial roll but before any of the roll's effects occur.\n\nOnce you use this feature, you can't use it again until you finish a short or long rest.",
		maxCharges:1,
		charges:1,
		onShortRest:helper.refresh
	},{
		name:"Hurl Through Hell",
		description:"When you hit a creature with an attack, you can use this feature to instantly transport the target through the lower planes. The creature disappears and hurtles through a nightmare landscape.\n\nAt the end of your next turn, the target returns to the space it previously occupied, or the nearest unoccupied space. If the target is not a fiend, it takes 10d10 psychic damage as it reels from its horrific experience.\n\nOnce you use this feature, you can't use it again until you finish a long rest.",
		maxCharges:1,
		charges:1,
		onLongRest:helper.refresh
	},{
		name:"Eldritch Master",
		description:"You can spend 1 minute entreating your patron for aid to regain all your expended spell slots from your Pact Magic feature. Once you regain spell slots with this feature, you must finish a long rest before you can do so again.",
		maxCharges:1,
		charges:1,
		onLongRest:helper.refresh
	},{
		name:"Hexblade's Curse",
		description:"You gain the ability to place a baleful curse on someone. As a bonus action, choose one creature you can see within 30 feet of you. The target is cursed for 1 minute. The curse ends early if the target dies, you die, or you are incapacitated. Until the curse ends, you gain the following benefits:\n\u2022 You gain a bonus to damage rolls against the cursed target. The bonus equals your proficiency bonus.\n\u2022 Any attack roll you make against the cursed target is a critical hit on a roll of 19 or 20 on the d20.\n\u2022 If the cursed target dies, you regain hit points equal to your warlock level + your Charisma modifier (minimum of 1 hit point).\n\nYou can't use this feature again until you finish a short or long rest.",
		maxCharges:1,
		charges:1,
		onShortRest:helper.refresh
	},{
		name:"Accursed Specter",
		description:"You can curse the soul of a person you slay, temporarily binding it to your service. When you slay a humanoid, you can cause its spirit to rise from its corpse as a specter, the statistics for which are in the Monster Manual. When the specter appears, it gains temporary hit points equal to half your warlock level. Roll initiative for the specter, which has its own turns. It obeys your verbal commands, and it gains a special bonus to its attack rolls equal to your Charisma modifier (minimum of +0).\n\nThe specter remains in your service until the end of your next long rest, at which point it vanishes to the afterlife.\n\nOnce you bind a specter with this feature, you can't use the feature again until you finish a long rest.",
		charges:1,
		maxCharges:1,
		onLongRest:helper.refresh
	},{
		name:"Fey Presence",
		description:"Your patron bestows upon you the ability to project the beguiling and fearsome presence of the fey. As an action, you can cause each creature in a 10-foot cube originating from you to make a Wisdom saving throw against your warlock spell save DC. The creatures that fail their saving throws are all charmed or frightened by you (your choice) until the end of your next turn.\n\nOnce you use this feature, you can't use it again until you finish a short or long rest.",
		charges:1,
		maxCharges:1,
		onShortRest:helper.refresh
	},{
		name:"Misty Escape",
		description:"You can vanish in a puff of mist in response to harm. When you take damage, you can use your reaction to turn invisible and teleport up to 60 feet to an unoccupied space you can see. You remain invisible until the start of your next turn or until you attack or cast a spell.\n\nOnce you use this feature, you can't use it again until you finish a short or long rest.",
		charges:1,
		maxCharges:1,
		onShortRest:helper.refresh
	},{
		name:"Dark Delirium",
		description:"You can plunge a creature into an illusory realm. As an action, choose a creature that you can see within 60 feet of you. It must make a Wisdom saving throw against your warlock spell save DC. On a failed save, it is charmed or frightened by you (your choice) for 1 minute or until your concentration is broken (as if you are concentrating on a spell). This effect ends early if the creature takes any damage.\n\nUntil this illusion ends, the creature thinks it is lost in a misty realm, the appearance of which you choose. The creature can see and hear only itself, you, and the illusion.\n\nYou must finish a short or long rest before you can use this feature again.",
		charges:1,
		maxCharges:1,
		onShortRest:helper.refresh
	}
]);

window.passives.append([
	{
		name:"Pact of the Chain",
		description:"You learn the find familiar spell and can cast it as a ritual. The spell doesn't count against your number of spells known.\n\nWhen you cast the spell, you can choose one of the normal forms for your familiar or one of the following special forms: imp, pseudodragon, quasit, or sprite.\n\nAdditionally, when you take the Attack action, you can forgo one of your own attacks to allow your familiar to use its reaction to make one attack of its own.",
		dmHide:true
	},{
		name:"Pact of the Blade",
		description:"You can use your action to create a pact weapon in your empty hand. You can choose the form that this melee weapon takes each time you create it (see chapter 5 for weapon options). You are proficient with it while you wield it. This weapon counts as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.\n\nYour pact weapon disappears if it is more than 5 feet away from you for 1 minute or more. It also disappears if you use this feature again, if you dismiss the weapon (no action required), or if you die.\n\nYou can transform one magic weapon into your pact weapon by performing a special ritual while you hold the weapon. You perform the ritual over the course of 1 hour, which can be done during a short rest. You can then dismiss the weapon, shunting it into an extradimensional space, and it appears whenever you create your pact weapon thereafter. You can't affect an artifact or a sentient weapon in this way. The weapon ceases being your pact weapon if you die, if you perform the 1-hour ritual on a different weapon, or if you use a 1-hour ritual to break your bond to it. The weapon appears at your feet if it is in the extradimensional space when the bond breaks.",
		dmHide:true
	},{
		name:"Pact of the Tome",
		description:"Your patron gives you a grimoire called a Book of Shadows. When you gain this feature, choose three cantrips from any class's spell list. The cantrips do not need to be from the same spell list. While the book is on your person, you can cast those cantrips at will. They don't count against your number of cantrips known. Any cantrip you cast with this feature is considered a warlock cantrip for you. If you lose your Book of Shadows, you can perform a 1-hour ceremony to receive a replacement from your patron. This ceremony can be performed during a short or long rest, and it destroys the previous book. The book turns to ash when you die.",
		dmHide:true
	},{
		name:"Dark One's Blessing",
		description:"When you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level (minimum of 1)."
	},{
		name:"Fiendish Resilience",
		description:"You can choose one damage type when you finish a short or long rest. You gain resistance to that damage type until you choose a different one with this feature. Damage from magical weapons or silver weapons ignores this resistance.",
		dmHide:true
	},{
		name:"Armor of Hexes",
		description:"If the target cursed by your Hexblade's Curse hits you with an attack roll, you can use your reaction to roll a d6. On a 4 or higher, the attack instead misses you, regardless of its roll."
	},{
		name:"Hex Warrior",
		description:"The influence of your patron allows you to mystically channel your will through a particular weapon. Whenever you finish a long rest, you can touch one weapon that you are proficient with and that lacks the two-handed property. When you attack with that weapon, you can use your Charisma modifier, instead of Strength or Dexterity, for the attack and damage rolls. This benefit lasts until you finish a long rest. If you later gain the Pact of the Blade feature, this benefit extends to every pact weapon you conjure with that feature, no matter the weapon's type.",
		dmHide:true
	},{
		name:"Master of Hexes",
		description:"You can spread your Hexblade's Curse from a slain creature to another creature. When the creature cursed by your Hexblade's Curse dies, you can apply the curse to a different creature you can see within 30 feet of you, provided you aren't incapacitated. When you apply the curse in this way, you don't regain hit points from the death of the previously cursed creature."
	},{
		name:"Agonizing Blast",
		tags:['Eldritch Invocation'],
		description:"When you cast eldritch blast, add your Charisma modifier to the damage it deals on a hit.",
		requirement:function(char){
			return hasSpell(char,"Eldritch Blast");
		},
		onPickup:function(char){
			for (let clas of char.classes){
				for (let spell of clas.spells){
					if (spell.name==='Eldritch Blast'){
						spell.description=spell.description.replace("takes 1d10 force damage","takes force damage equal to 1d10 plus your Charisma modifier");
						spell.edited=true;
						return;
					}
				}
			}
		},
		dmHide:true
	},{
		name:"Armor of Shadows",
		tags:['Eldritch Invocation'],
		description:"You can cast mage armor on yourself at will, without expending a spell slot or material components."
	},{
		name:"Ascendant Step",
		tags:['Eldritch Invocation'],
		description:"You can cast levitate on yourself at will, without expending a spell slot or material components.",
		requirement:function(char){
			return char.level>=9;
		}
	},{
		name:"Aspect of the Moon",
		tags:['Eldritch Invocation'],
		description:"You no longer need to sleep and can't be forced to sleep by any means. To gain the benefits of a long rest, you can spend all 8 hours doing light activity, such as reading your Book of Shadows and keeping watch.",
		requirement:function(char){
			return hasPassive(char,"Pact of the Tome");
		},
		dmHide:true
	},{
		name:"Beast Speech",
		tags:['Eldritch Invocation'],
		description:"You can cast speak with animals at will, without expending a spell slot.",
		dmHide:true
	},{
		name:"Beguiling Influence",
		tags:['Eldritch Invocation'],
		description:"You gain proficiency in the Deception and Persuasion skills.",
		onPickup:function(char){
			addProficiency(char,"Deception");
			addProficiency(char,"Persuasion");
		},
		dmHide:true
	},{
		name:"Bewitching Whispers",
		tags:['Eldritch Invocation'],
		description:"You can cast compulsion once using a warlock spell slot. You can't do so again until you finish a long rest.",
		requirement:function(char){
			return char.level>=7;
		}
	},{
		name:"Book of Ancient Secrets",
		tags:['Eldritch Invocation'],
		description:"You can now inscribe magical rituals in your Book of Shadows. Choose two 1st-level spells that have the ritual tag from any class's spell list. The spells needn't be from the same spell list. The spells appear in the book and don't count against the number of spells you know. With your Book of Shadows in hand, you can cast the chosen spells as rituals. You can't cast the spells except as rituals, unless you've learned them by some other means. You can also cast a warlock spell you know as a ritual if it has the ritual tag.\n\nOn your adventures, you can add other ritual spells to your Book of Shadows. When you find such a spell, you can add it to the book if the spell's level is equal to or less than half your warlock level (rounded up) and if you can spare the time to transcribe the spell. For each level of the spell, the transcription process takes 2 hours and costs 50 gp for the rare inks needed to inscribe it.",
		requirement:function(char){
			return hasPassive(char,"Pact of the Tome");
		},
		dmHide:true
	},{
		name:"Chains of Carceri",
		tags:['Eldritch Invocation'],
		description:"You can cast hold monster at will — targeting a celestial, fiend, or elemental — without expending a spell slot or material components. You must finish a long rest before you can use this invocation on the same creature again.",
		requirement:function(char){
			return char.level>=15 && hasPassive(char,"Pact of the Chain");
		}
	},{
		name:"Cloak of Flies",
		tags:['Eldritch Invocation'],
		description:"As a bonus action, you can surround yourself with a magical aura that looks like buzzing flies. The aura extends 5 feet from you in every direction, but not through total cover. It lasts until you're incapacitated or you dismiss it as a bonus action.\n\nThe aura grants you advantage on Charisma (Intimidation) checks but disadvantage on all other Charisma checks. Any other creature that starts its turn in the aura takes poison damage equal to your Charisma modifier (minimum of 0 damage).\n\nOnce you use this invocation, you can't use it again until you finish a short or long rest.",
		requirement:function(char){
			return char.level>=5;
		},
		onPickup:function(char){
			addAbility(char,"Cloak of Flies");
		}
	},{
		name:"Devil's Sight",
		tags:['Eldritch Invocation'],
		description:"You can see normally in darkness, both magical and nonmagical, to a distance of 120 feet."
	},{
		name:"Dreadful Word",
		tags:['Eldritch Invocation'],
		description:"You can cast confusion once using a warlock spell slot. You can't do so again until you finish a long rest.",
		requirement:function(char){
			return char.level>=7;
		}
	},{
		name:"Eldritch Sight",
		tags:['Eldritch Invocation'],
		description:"You can cast detect magic at will, without expending a spell slot."
	},{
		name:"Eldritch Smite",
		tags:['Eldritch Invocation'],
		description:"Once per turn when you hit a creature with your pact weapon, you can expend a warlock spell slot to deal an extra 1d8 force damage to the target, plus another 1d8 per level of the spell slot, and you can knock the target prone if it is Huge or smaller.",
		requirement:function(char){
			return char.level>=7 && hasPassive(char,"Pact of the Blade");
		}
	},{
		name:"Eldritch Spear",
		tags:['Eldritch Invocation'],
		description:"When you cast Eldritch Blast, its range is 300 feet.",
		requirement:function(char){
			return hasSpell(char,"Eldritch Blast");
		},
		onPickup:function(char){
			for (let clas of char.classes){
				for (let spell of clas.spells){
					if (spell.name==='Eldritch Blast'){
						spell.range='300 feet';
						spell.edited=true;
						return;
					}
				}
			}
		},
		dmHide:true
	},{
		name:"Eyes of the Rune Keeper",
		tags:['Eldritch Invocation'],
		description:"You can read all writing.",
		dmHide:true
	},{
		name:"Fiendish Vigor",
		tags:['Eldritch Invocation'],
		description:"You can cast false life on yourself at will as a 1st-level spell, without expending a spell slot or material components."
	},{
		name:"Gaze of Two Minds",
		tags:['Eldritch Invocation'],
		description:"You can use your action to touch a willing humanoid and perceive through its senses until the end of your next turn. As long as the creature is on the same plane of existence as you, you can use your action on subsequent turns to maintain this connection, extending the duration until the end of your next turn. While perceiving through the other creature's senses, you benefit from any special senses possessed by that creature, and you are blinded and deafened to your own surroundings.",
		dmHide:true
	},{
		name:"Ghostly Gaze",
		tags:['Eldritch Invocation'],
		description:"As an action, you gain the ability to see through solid objects to a range of 30 feet. Within that range, you have darkvision if you don't already have it. This special sight lasts for 1 minute or until your concentration ends (as if you were concentrating on a spell). During that time, you perceive objects as ghostly, transparent images.\n\nOnce you use this invocation, you can't use it again until you finish a short or long rest.",
		requirement:function(char){
			return char.level>=7;
		},
		onPickup:function(char){
			addAbility(char,"Ghostly Gaze");
		},
		dmHide:true
	},{
		name:"Gift of the Depths",
		tags:['Eldritch Invocation'],
		description:"You can breathe underwater, and you gain a swimming speed equal to your walking speed.\n\nYou can also cast water breathing once without expending a spell slot. You regain the ability to do so when you finish a long rest.",
		requirement:function(char){
			return char.level>=5;
		},
		onPickup:function(char){
			addAbility(char,"Gift of the Depths");
		},
		dmHide:true
	},{
		name:"Gift of the Ever-Living Ones",
		tags:['Eldritch Invocation'],
		description:"Whenever you regain hit points while your familiar is within 100 feet of you, treat any dice rolled to determine the hit points you regain as having rolled their maximum value for you.",
		requirement:function(char){
			return hasPassive(char,"Pact of the Chain");
		}
	},{
		name:"Grasp of Hadar",
		tags:['Eldritch Invocation'],
		description:"Once on each of your turns when you hit a creature with your eldritch blast, you can move that creature in a straight line 10 feet closer to you.",
		requirement:function(char){
			return hasSpell(char,"Eldritch Blast");
		}
	},{
		name:"Improved Pact Weapon",
		tags:['Eldritch Invocation'],
		description:"You can use any weapon you summon with your Pact of the Blade feature as a spellcasting focus for your warlock spells.\n\nIn addition, the weapon gains a +1 bonus to its attack and damage rolls, unless it is a magic weapon that already has a bonus to those rolls.\n\nFinally, the weapon you conjure can be a shortbow, longbow, light crossbow, or heavy crossbow.",
		requirement:function(char){
			return hasPassive(char,"Pact of the Blade");
		}
	},{
		name:"Lance of Lethargy",
		tags:['Eldritch Invocation'],
		description:"Once on each of your turns when you hit a creature with your eldritch blast, you can reduce that creature's speed by 10 feet until the end of your next turn.",
		requirement:function(char){
			return hasSpell(char,"Eldritch Blast");
		}
	},{
		name:"Lifedrinker",
		tags:['Eldritch Invocation'],
		description:"When you hit a creature with your pact weapon, the creature takes extra necrotic damage equal to your Charisma modifier (minimum of 1).",
		requirement:function(char){
			return char.level>=12 && hasPassive(char,"Pact of the Blade");
		}
	},{
		name:"Maddening Hex",
		tags:['Eldritch Invocation'],
		description:"As a bonus action, you cause a psychic disturbance around the target cursed by your hex spell or by a warlock feature of yours, such as Hexblade's Curse or Sign of Ill Omen. When you do so, you deal psychic damage to the cursed target and each creature of your choice that you can see within 5 feet of it. The psychic damage equals your Charisma modifier (minimum of 1 damage). To use this invocation, you must be able to see the cursed target, and it must be within 30 feet of you.",
		requirement:function(char){
			return char.level>=5;
		}
	},{
		name:"Mask of Many Faces",
		tags:['Eldritch Invocation'],
		description:"You can cast disguise self at will, without expending a spell slot."
	},{
		name:"Master of Myriad Forms",
		tags:['Eldritch Invocation'],
		description:"You can cast alter self at will, without expending a spell slot.",
		requirement:function(char){
			return char.level>=15;
		}
	},{
		name:"Minions of Chaos",
		tags:['Eldritch Invocation'],
		description:"You can cast conjure elemental once using a warlock spell slot. You can't do so again until you finish a long rest.",
		requirement:function(char){
			return char.level>=9;
		}
	},{
		name:"Mire the Mind",
		tags:['Eldritch Invocation'],
		description:"You can cast slow once using a warlock spell slot. You can't do so again until you finish a long rest.",
		requirement:function(char){
			return char.level>=5;
		}
	},{
		name:"Misty Visions",
		tags:['Eldritch Invocation'],
		description:"You can cast silent image at will, without expending a spell slot or material components."
	},{
		name:"One with Shadows",
		tags:['Eldritch Invocation'],
		description:"When you are in an area of dim light or darkness, you can use your action to become invisible until you move or take an action or a reaction.",
		requirement:function(char){
			return char.level>=5;
		}
	},{
		name:"Otherworldly Leap",
		tags:['Eldritch Invocation'],
		description:"You can cast jump on yourself at will, without expending a spell slot or material components.",
		requirement:function(char){
			return char.level>=9;
		}
	},{
		name:"Relentless Hex",
		tags:['Eldritch Invocation'],
		description:"Your curse creates a temporary bond between you and your target. As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see within 5 feet of the target cursed by your hex spell or by a warlock feature of yours, such as Hexblade's Curse or Sign of Ill Omen. To teleport in this way, you must be able to see the cursed target.",
		requirement:function(char){
			return char.level>=7;
		}
	},{
		name:"Repelling Blast",
		tags:['Eldritch Invocation'],
		description:"When you hit a creature with eldritch blast, you can push the creature up to 10 feet away from you in a straight line.",
		requirement:function(char){
			return hasSpell(char,"Eldritch Blast");
		}
	},{
		name:"Sculptor of Flesh",
		tags:['Eldritch Invocation'],
		description:"You can cast polymorph once using a warlock spell slot. You can't do so again until you finish a long rest.",
		requirement:function(char){
			return char.level>=7;
		}
	},{
		name:"Shroud of Shadow",
		tags:['Eldritch Invocation'],
		description:"You can cast invisibility at will, without expending a spell slot.",
		requirement:function(char){
			return char.level>=15;
		}
	},{
		name:"Sign of Ill Omen",
		tags:['Eldritch Invocation'],
		description:"You can cast bestow curse once using a warlock spell slot. You can't do so again until you finish a long rest.",
		requirement:function(char){
			return char.level>=5;
		}
	},{
		name:"Thief of Five Fates",
		tags:['Eldritch Invocation'],
		description:"You can cast bane once using a warlock spell slot. You can't do so again until you finish a long rest."
	},{
		name:"Thirsting Blade",
		tags:['Eldritch Invocation'],
		description:"You can attack with your pact weapon twice, instead of once, whenever you take the Attack action on your turn.",
		requirement:function(char){
			return char.level>=5 && hasPassive(char,"Pact of the Blade");
		}
	},{
		name:"Tomb of Levistus",
		tags:['Eldritch Invocation'],
		description:"As a reaction when you take damage, you can entomb yourself in ice, which melts away at the end of your next turn. You gain 10 temporary hit points per warlock level, which take as much of the triggering damage as possible. Immediately after you take the damage, you gain vulnerability to fire damage, your speed is reduced to 0, and you are incapacitated. These effects, including any remaining temporary hit points, all end when the ice melts.\n\nOnce you use this invocation, you can't use it again until you finish a short or long rest.",
		requirement:function(char){
			return char.level>=5;
		},
		onPickup:function(char){
			addAbility(char,"Tomb of Levistus");
		}
	},{
		name:"Trickster's Escape",
		tags:['Eldritch Invocation'],
		description:"You can cast freedom of movement once on yourself without expending a spell slot. You regain the ability to do so when you finish a long rest.",
		requirement:function(char){
			return char.level>=7;
		},
		onPickup:function(char){
			addAbility(char,"Trickster's Escape");
		}
	},{
		name:"Visions of Distant Realms",
		tags:['Eldritch Invocation'],
		description:"You can cast arcane eye at will, without expending a spell slot.",
		requirement:function(char){
			return char.level>=15;
		}
	},{
		name:"Voice of the Chain Master",
		tags:['Eldritch Invocation'],
		description:"You can communicate telepathically with your familiar and perceive through your familiar's senses as long as you are on the same plane of existence. Additionally, while perceiving through your familiar's senses, you can also speak through your familiar in your own voice, even if your familiar is normally incapable of speech.",
		requirement:function(char){
			return hasPassive(char,"Pact of the Chain");
		},
		dmHide:true
	},{
		name:"Whispers of the Grave",
		tags:['Eldritch Invocation'],
		description:"You can cast speak with dead at will, without expending a spell slot.",
		requirement:function(char){
			return char.level>=9;
		}
	},{
		name:"Witch Sight",
		tags:['Eldritch Invocation'],
		description:"You can see the true form of any shapechanger or creature concealed by illusion or transmutation magic while the creature is within 30 feet of you and within line of sight.",
		requirement:function(char){
			return char.level>=15;
		}
	},{
		name:"Beguiling Defenses",
		description:"Your patron teaches you how to turn the mind-affecting magic of your enemies against them. You are immune to being charmed, and when another creature attempts to charm you, you can use your reaction to attempt to turn the charm back on that creature. The creature must succeed on a Wisdom saving throw against your warlock spell save DC or be charmed by you for 1 minute or until the creature takes any damage."
	}
]);

window.classes.push(
	{
		classname:"Warlock",
		name:"Warlock",
		description:"",
		levels:[
			{ //1, first player level
				summary:[
					{name:"Proficiencies",description:"Light Armor, Simple Weapons, Wisdom saves, Charisma saves"},
					{name:"Starting Equipment",description:"Leather Armor, 2 Daggers, Two Simple Weapons of your choice"},
					{name:"Two proficiencies from:",description:"Arcana, Deception, History, Intimidation, Investigation, Nature, Religion"},
					{name:"Patron",description:"Choose your patron"}
				],
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							char.maxHp=8;
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Simple Weapons");
							char.saves.wis=1;
							char.saves.cha=1;
							addToInventory(char,findItem("Leather Armor"));
							addToInventory(char,findItem("Dagger",2));
						}
					},{
						choicePrompt:"Choose a weapon to start with",
						choices:[listSimpleWeapons],
						action:function(char,derived,choice){
							if (choice==="Light Crossbow"){
								addToInventory(char,findItem("Bolt",20));
							}
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose another weapon to start with",
						choices:[listSimpleWeapons],
						action:function(char,derived,choice){
							if (choice==="Light Crossbow"){
								addToInventory(char,findItem("Bolt",20));
							}
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a pack",
						choices:[findItem("Dungeoneer's Pack"),findItem("Scholar's Pack")],
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
									if (["Arcana","Deception","History","Intimidation","Investigation","Nature","Religion"].indexOf(skill.name)!=-1){
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
						choicePrompt:"Choose one",
						choices:["Arcane Focus","Component Pouch"],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						limit:2,
						choicePrompt:"Choose two cantrips.",
						choices:[listUnknownWarlockCantrips],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
					helper.chooseSpell2,
					{
						choicePrompt:"Choose a Patron",
						choices:[listSpecializations],
						action:function(char,derived,choice){
							addSubclass(char,"Warlock",choice);
						}
					}
				]
			},	{ // 1
				summary:[
					{name:"Patron",description:"Choose your patron"}
				],
				"updates":[
					helper.hitDice8,
					{
						limit:2,
						choicePrompt:"Choose two cantrips.",
						choices:[listUnknownWarlockCantrips],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},
					helper.chooseSpell2,
					{
						choicePrompt:"Choose a Patron",
						choices:[listSpecializations],
						action:function(char,derived,choice){
							addSubclass(char,"Warlock",choice);
						}
					}
				]
			}, { // 2
				summary:[
					{name:"Eldritch Invocations",description:"Learn two Eldritch Invocations"}
				],
				"updates":[
					helper.hitDice8,
					helper.chooseInvocation,
					helper.chooseInvocation,
					{
						choicePrompt:"Do you want to replace one of your invocations?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnInvocation,
					helper.chooseInvocation,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
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
					helper.hitDice8,
					{
						summary:{name:"Pact Boon",description:"Choose a Pact Boon."},
						choicePrompt:"Choose a Pact Boon",
						choices:[findPassive("Pact of the Blade"),findPassive("Pact of the Chain"),findPassive("Pact of the Tome")],
						action:function(char,derived,choice,scope){
							addPassive(char,choice);
							if (choice==="Pact of the Chain"){
								addSpell(char,"Find Familiar","Warlock");
							} else if (choice==="Pact of the Tome"){
								scope.choiceQueue.push(helper.chooseAnyCantrip);
								scope.choiceQueue.push(helper.chooseAnyCantrip);
								scope.choiceQueue.push(helper.chooseAnyCantrip);
							}
						}
					},
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
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
					helper.hitDice8,
					helper.chooseWarlockCantrip,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
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
				summary:[
					{name:"Eldritch Invocation",description:"Learn another Eldritch Invocation."}
				],
				"updates":[
					helper.hitDice8,
					helper.chooseInvocation,
					{
						choicePrompt:"Do you want to replace one of your invocations?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnInvocation,
					helper.chooseInvocation,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
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
					helper.hitDice8,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
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
				summary:[
					{name:"Eldritch Invocation",description:"Learn another Eldritch Invocation."}
				],
				"updates":[
					helper.hitDice8,
					helper.chooseInvocation,
					{
						choicePrompt:"Do you want to replace one of your invocations?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnInvocation,
					helper.chooseInvocation,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
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
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
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
				summary:[
					{name:"Eldritch Invocation",description:"Learn another Eldritch Invocation."}
				],
				"updates":[
					helper.hitDice8,
					helper.chooseInvocation,
					{
						choicePrompt:"Do you want to replace one of your invocations?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnInvocation,
					helper.chooseInvocation,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
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
					helper.hitDice8,
					helper.chooseWarlockCantrip,
				]
			},{//11
				"updates":[
					helper.hitDice8,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell,
					helper.chooseArcanum
				]
			},{//12
				summary:[
					{name:"Eldritch Invocation",description:"Learn another Eldritch Invocation."}
				],
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseInvocation,
					{
						choicePrompt:"Do you want to replace one of your invocations?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnInvocation,
					helper.chooseInvocation
				]
			},{//13
				"updates":[
					helper.hitDice8,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell,
					helper.chooseArcanum
				]
			},{//14
				"updates":[
					helper.hitDice8
				]
			},{//15
				"updates":[
					helper.hitDice8,
					helper.chooseInvocation,
					{
						choicePrompt:"Do you want to replace one of your invocations?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnInvocation,
					helper.chooseInvocation,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell,
					helper.chooseArcanum
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
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnSpell,
					helper.chooseSpell,
					helper.chooseArcanum
				]
			},{//18
				summary:[
					{name:"Eldritch Invocation",description:"Learn another Eldritch Invocation"}
				],
				"updates":[
					helper.hitDice8,
					helper.chooseInvocation,
					{
						choicePrompt:"Do you want to replace one of your invocations?",
						choices:["Yes","No"],
						action:function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnInvocation,
					helper.chooseInvocation
				]
			},{//19
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					{
						choicePrompt:"Do you want to replace one of your known Warlock spells?",
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
			},{//20
				"updates":[
					helper.hitDice8,
					{
						summary:findAbility('Eldritch Master'),
						choicePrompt:"You gain the following",
						choices:[findAbility("Eldritch Master")],
						action:function(char){
							addAbility(char,"Eldritch Master");
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Warlock",
		name:"Fiend",
		subclass:"Fiend",
		description:"You have made a pact with a fiend from the lower planes of existence, a being whose aims are evil, even if you strive against those aims. Such beings desire the corruption or destruction of all things, ultimately including you. Fiends powerful enough to forge a pact include demon lords such as Demogorgon, Orcus, Fraz'Urb-luu, and Baphomet; archdevils such as Asmodeus, Dispater, Mephistopheles, and Belial; pit fiends and balors that are especially mighty; and ultroloths and other lords of the yugoloths.",
		levels:[
			{},{//1
				updates:[
					{
						summary:findPassive("Dark One's Blessing"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Dark One's Blessing")],
						action:function(char){
							addPassive(char,"Dark One's Blessing");
							getCharacterClass(char,"Warlock").extraSpells=["Burning Hands","Command","Blindness/Deafness","Scorching Ray","Fireball","Stinking Cloud","Fire Shield","Wall of Fire","Flame Strike","Hallow"];
						}
					}
				]
			},{},{},{},{},
			{ // 6
				"updates":[
					{
						summary:findAbility("Dark One's Own Luck"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Dark One's Own Luck")],
						action:function(char){
							addAbility(char,"Dark One's Own Luck");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						summary:findPassive("Fiendish Resilience"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Fiendish Resilience")],
						action:function(char){
							addPassice(char,"Fiendish Resilience");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						summary:findAbility("Hurl Through Hell"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Hurl Through Hell")],
						action:function(char){
							addAbility(char,"Hurl Through Hell")
						}
					}
				]
			},{},{},{},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Warlock",
		name:"Hexblade",
		subclass:"Hexblade",
		description:"You have made your pact with a mysterious entity from the Shadowfell—a force that manifests in sentient magic weapons carved from the stuff of shadow. The mighty sword Blackrazor is the most notable of these weapons, which have been spread across the multiverse over the ages. The shadowy force behind these weapons can offer power to warlocks who form pacts with it. Many hexblade warlocks create weapons that emulate those formed in the Shadowfell. Others forgo such arms, content to weave the dark magic of that plane into their spellcasting.\n\nBecause the Raven Queen is known to have forged the first of these weapons, many sages speculate that she and the force are one and that the weapons, along with hexblade warlocks, are tools she uses to manipulate events on the Material Plane to her inscrutable ends.",
		levels:[
			{},{//1
				summary:[findAbility("Hexblade's Curse"),findPassive("Hex Warrior")],
				updates:[
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findAbility("Hexblade's Curse"),findPassive("Hex Warrior")],
						action:function(char){
							addAbility(char,"Hexblade's Curse");
							addPassive(char,"Hex Warrior");
							char.proficiencies.upush("Medium Armor");
							char.proficiencies.upush("Shields");
							char.proficiencies.upush("Martial Weapons");
							getCharacterClass(char,"Warlock").extraSpells=["Shield","Wrathful Smite","Blur","Branding Smite","Blink","Elemental Weapon","Phantasmal Killer","Staggering Smite","Banishing Smite","Cone of Cold"];
						}
					}
				]
			},{},{},{},{},
			{ // 6
				updates:[
					{
						summary:findAbility("Accursed Specter"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Accursed Specter")],
						action:function(char){
							addAbility(char,"Accursed Specter");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						summary:findPassive("Armor of Hexes"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Armor of Hexes")],
						action:function(char){
							addPassice(char,"Armor of Hexes");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						summary:findPassive("Master of Hexes"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Master of Hexes")],
						action:function(char){
							addPassive(char,"Master of Hexes")
						}
					}
				]
			},{},{},{},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Warlock",
		name:"Archfey",
		subclass:"Archfey",
		description:"Your patron is a lord or lady of the fey, a creature of legend who holds secrets that were forgotten before the mortal races were born. This being's motivations are often inscrutable, and sometimes whimsical, and might involve a striving for greater magical power or the settling of age-old grudges. Beings of this sort include the Prince of Frost; the Queen of Air and Darkness, ruler of the Gloaming Court; Titania of the Summer Court; her consort Oberon, the Green Lord; Hyrsam, the Prince of Fools; and ancient hags.",
		levels:[
			{},{//1
				summary:[findAbility("Fey Presence")],
				updates:[
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findAbility("Fey Presence")],
						action:function(char){
							addAbility(char,"Fey Presence");
							getCharacterClass(char,"Warlock").extraSpells=["Faerie Fire","Sleep","Calm Emotions","Phantasmal Force","Blink","Plant Growth","Dominate Beast","Greater Invisibility","Dominate Person","Seeming"];
						}
					}
				]
			},{},{},{},{},
			{ // 6
				updates:[
					{
						always:true,
						summary:findAbility("Misty Escape"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Misty Escape")],
						action:function(char){
							addAbility(char,"Misty Escape");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						always:true,
						summary:findPassive("Beguiling Defenses"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Beguiling Defenses")],
						action:function(char){
							addPassice(char,"Beguiling Defenses");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						always:true,
						summary:findAbility("Dark Delirium"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Dark Delirium")],
						action:function(char){
							addAbility(char,"Dark Delirium")
						}
					}
				]
			},{},{},{},{},{},{}
		]
	}
);