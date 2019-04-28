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
						"choicePrompt":"Choose an Eldritch Invocation",
						"choices":[listAvailableInvocations],
						"action":function(char,derived,choice){
							addPassive(char,choice);
						}
					};

helper.unlearnInvocation={
						"choicePrompt":"Choose an Invocation to unlearn",
						"choices":[function(char){
							let result=[];
							for (let p of char.passives){
								if (p.tags && p.tags.contains("Eldritch Invocation")){
									result.push(p);
								}
							}
							return result;
						}],
						"action":function(char,derived,choice,scope){
							removePassive(choice);
						}
					};
					
window.abilities.append([
	
]);

window.passives.append([
	{
		name:"Dark One's Blessing",
		description:"When you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level (minimum of 1)."
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
						return;
					}
				}
			}
		}
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
			return !hasPassive(char,"Pact of the Tome");
		}
	},{
		name:"Beast Speech",
		tags:['Eldritch Invocation'],
		description:"You can cast speak with animals at will, without expending a spell slot."
	},{
		name:"Beguiling Influence",
		tags:['Eldritch Invocation'],
		description:"You gain proficiency in the Deception and Persuasion skills.",
		onPickup:function(char){
			addProficiency(char,"Deception");
			addProficiency(char,"Persuasion");
		}
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
		}
	},{
		name:"Chains of Carceri",
		tags:['Eldritch Invocation'],
		description:"You can cast hold monster at will—targeting a celestial, fiend, or elemental—without expending a spell slot or material components. You must finish a long rest before you can use this invocation on the same creature again.",
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
						return;
					}
				}
			}
		}
	},{
		name:"Eyes of the Rune Keeper",
		tags:['Eldritch Invocation'],
		description:"You can read all writing."
	},{
		name:"Fiendish Vigor",
		tags:['Eldritch Invocation'],
		description:"You can cast false life on yourself at will as a 1st-level spell, without expending a spell slot or material components."
	},{
		name:"Gaze of Two Minds",
		tags:['Eldritch Invocation'],
		description:"You can use your action to touch a willing humanoid and perceive through its senses until the end of your next turn. As long as the creature is on the same plane of existence as you, you can use your action on subsequent turns to maintain this connection, extending the duration until the end of your next turn. While perceiving through the other creature's senses, you benefit from any special senses possessed by that creature, and you are blinded and deafened to your own surroundings."
	},{
		name:"Ghostly Gaze",
		tags:['Eldritch Invocation'],
		description:"As an action, you gain the ability to see through solid objects to a range of 30 feet. Within that range, you have darkvision if you don't already have it. This special sight lasts for 1 minute or until your concentration ends (as if you were concentrating on a spell). During that time, you perceive objects as ghostly, transparent images.\n\nOnce you use this invocation, you can't use it again until you finish a short or long rest.",
		requirement:function(char){
			return char.level>=7;
		},
		onPickup:function(char){
			addAbility(char,"Ghostly Gaze");
		}
	},{
		name:"Gift of the Depths",
		tags:['Eldritch Invocation'],
		description:"You can breathe underwater, and you gain a swimming speed equal to your walking speed.\n\nYou can also cast water breathing once without expending a spell slot. You regain the ability to do so when you finish a long rest.",
		requirement:function(char){
			return char.level>=5;
		},
		onPickup:function(char){
			addAbility(char,"Gift of the Depths");
		}
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
		name:"Relepping Blast",
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
		name:"Thirting Blade",
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
		}
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
	}
]);

window.classes.push(
	{
		classname:"Warlock",
		name:"Warlock",
		description:"",
		levels:[
			{ //1, first player level
				updates:[
					{
						"choices":[],
						"action":function(char,derived,choice){
							char.maxHp=8;
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Simple Weapons");
							char.saves.wis=1;
							char.saves.cha=1;
							addToInventory(char,findItem("Leather Armor"));
							addToInventory(char,findItem("Dagger",2));
						}
					},{
						"choicePrompt":"Choose a weapon to start with",
						"choices":[listSimpleWeapons],
						"action":function(char,derived,choice){
							if (choice==="Light Crossbow"){
								addToInventory(char,findItem("Bolt",20));
							}
							addToInventory(char,findItem(choice));
						}
					},{
						"choicePrompt":"Choose another weapon to start with",
						"choices":[listSimpleWeapons],
						"action":function(char,derived,choice){
							if (choice==="Light Crossbow"){
								addToInventory(char,findItem("Bolt",20));
							}
							addToInventory(char,findItem(choice));
						}
					},{
						"choicePrompt":"Choose a pack",
						"choices":[findItem("Dungeoneer's Pack"),findItem("Scholar's Pack")],
						"action":function(char,derived,choice){
							openPack(char,choice);
						}
					},{
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
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
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
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
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						"choicePrompt":"Choose one",
						"choices":["Arcane Focus","Component Pouch"],
						"action":function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},
					helper.chooseWarlockCantrip,
					helper.chooseWarlockCantrip,
					helper.chooseSpell,
					helper.chooseSpell,
					{
						"choicePrompt":"Choose a Patron",
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addSubclass(char,"Warlock",choice);
						}
					}
				]
			},	{ // 1
				"updates":[
					helper.hitDice8,
					helper.chooseWarlockCantrip,
					helper.chooseWarlockCantrip,
					helper.chooseSpell,
					helper.chooseSpell,
					{
						"choicePrompt":"Choose a Patron",
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addSubclass(char,"Warlock",choice);
						}
					}
				]
			}, { // 2
				"updates":[
					helper.hitDice8,
					helper.chooseInvocation,
					helper.chooseInvocation,
					{
						"choicePrompt":"Do you want to replace one of your invocations?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnInvocation,
					helper.chooseInvocation,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
						choicePrompt:"Choose a Pact Boon",
						choices:[findPassive("Pact of the Blade"),findPassive("Pact of the Chain"),findPassive("Pact of the Tome")],
						action:function(char,derived,choice){
							addPassive(char,choice);
						}
					},
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
					helper.hitDice8,
					helper.chooseInvocation,
					{
						"choicePrompt":"Do you want to replace one of your invocations?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnInvocation,
					helper.chooseInvocation,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
					helper.hitDice8,
					helper.chooseInvocation,
					{
						"choicePrompt":"Do you want to replace one of your invocations?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnInvocation,
					helper.chooseInvocation,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
					helper.hitDice8,
					helper.chooseInvocation,
					{
						"choicePrompt":"Do you want to replace one of your invocations?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnInvocation,
					helper.chooseInvocation,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseInvocation,
					{
						"choicePrompt":"Do you want to replace one of your invocations?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
						"choicePrompt":"Do you want to replace one of your invocations?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
							if (choice==="No"){
								scope.updateStep+=2;
							}
						}
					},
					helper.unlearnInvocation,
					helper.chooseInvocation,
					helper.chooseSpell,
					{
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
				"updates":[
					helper.hitDice8,
					helper.chooseInvocation,
					{
						"choicePrompt":"Do you want to replace one of your invocations?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
						"choicePrompt":"Do you want to replace one of your known Warlock spells?",
						"choices":["Yes","No"],
						"action":function(char,derived,choice,scope){
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
		description:"You learn fire and evil shit.",
		levels:[
			{},{//1
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Dark One's Blessing")],
						action:function(char){
							addPassive(char,"Dark One's Blessing");
							getCharacterClass(char,"Warlock").extraSpells=["Burning Hands","Command","Blindness/Deafness","Scorching Ray","Fireball","Stinking Cloud","Fire Shield","Wall of Fire","Flame Strike","Hallow"];
						}
					}
				]
			},{},
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
							addAbility(char,"Cutting Words");
						}
					}
				]
			},{},
			{//5
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
			},
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
			},{},{},{},
			{//10
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
			},{},{},{},
			{//14
				updates:[
					{
						choices:[],
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