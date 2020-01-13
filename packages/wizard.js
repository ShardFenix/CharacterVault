
window.abilities.append([
	{
		name:"Arcane Recovery",
		description:"Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher.",
		maxCharges:1,
		charges:1,
		onLongRest:function(){
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
		name:"Arcane Ward",
		description:"When you cast an Abjuration spell of 1st level or higher, you can simultaneously use a strand of the spell's magic to create a magical ward on yourself that lasts until you finish a long rest. The ward has hit points equal to twice your wizard level + your Intelligence modifier. Whenever you take damage, the ward takes the damage instead. If this damage reduces the ward to 0 hit points, you take any remaining damage.\n\nWhile the ward has 0 hit points, it can't absorb damage, but its magic remains. Whenever you cast an abjuration spell of 1st level or higher, the ward regains a number of hit points equal to twice the level of the spell.\n\nOnce you create the ward, you can't create it again until you finish a long rest.",
		maxCharges:1,
		charges:1,
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Benign Transposition",
		description:"You can use your action to teleport up to 30 feet to an unoccupied space that you can see. Alternatively, you can choose a space within range that is occupied by a Small or Medium creature. If that creature is willing, you both teleport, swapping places.\n\nOnce you use this feature, you can't use it again until you finish a long rest or you cast a conjuration spell of 1st level or higher.",
		maxCharges:1,
		charges:1,
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Hypnotic Gaze",
		description:"Your soft words and enchanting gaze can magically enthrall another creature. As an action, choose one creature that you can see within 5 feet of you. If the target can see or hear you, it must succeed on a Wisdom saving throw against your wizard spell save DC or be charmed by you until the end of your next turn. The charmed creature's speed drops to 0, and the creature is incapacitated and visibly dazed.\n\nOn subsequent turns, you can use your action to maintain this effect, extending its duration until the end of your next turn. However, the effect ends if you move more than 5 feet away from the creature, if the creature can neither see nor hear you, or if the creature takes damage.\n\nOnce the effect ends, or if the creature succeeds on its initial saving throw against this effect, you can't use this feature on that creature again until you finish a long rest.",
		maxCharges:1,
		charges:1,
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Shapechanger",
		description:"You can cast polymorph without expending a spell slot. When you do so, you can target only yourself and transform into a beast whose challenge rating is 1 or lower.\n\nOnce you cast polymorph in this way, you can't do so again until you finish a short or long rest, though you can still cast it normally using an available spell slot.\n\n.",
		maxCharges:1,
		charges:1,
		onShortRest:helper.refresh
	}
]);

window.passives.append([
	{
		name:"Abjuration Savant",
		description:"The gold and time you must spend to copy an abjuration spell into your spellbook is halved."
	},{
		name:"Conjuration Savant",
		description:"The gold and time you must spend to copy a conjuration spell into your spellbook is halved."
	},{
		name:"Divination Savant",
		description:"The gold and time you must spend to copy a divination spell into your spellbook is halved."
	},{
		name:"Enchantment Savant",
		description:"The gold and time you must spend to copy an enchantment spell into your spellbook is halved."
	},{
		name:"Evocation Savant",
		description:"The gold and time you must spend to copy an evocation spell into your spellbook is halved."
	},{
		name:"Illusion Savant",
		description:"The gold and time you must spend to copy an illusion spell into your spellbook is halved."
	},{
		name:"Necromancy Savant",
		description:"The gold and time you must spend to copy a necromancy spell into your spellbook is halved."
	},{
		name:"Transmutation Savant",
		description:"The gold and time you must spend to copy a transmutation spell into your spellbook is halved."
	},{
		name:"Portent",
		description:"Glimpses of the future begin to press in on your awareness. When you finish a long rest, roll ${getClassLevel($scope.char,'Wizard')>=14?'three':'two'} d20s and record the numbers rolled. You can replace any attack roll, saving throw, or ability check made by you or a creature that you can see with one of these foretelling rolls. You must choose to do so before the roll, and you can replace a roll in this way only once per turn.\nEach foretelling roll can be used only once. When you finish a long rest, you lose any unused foretelling rolls."
	},{
		name:"Expert Divination",
		description:"When you cast a divination spell of 2nd level or higher using a spell slot, you regain one expended spell slot. The slot you regain must be of a level lower than the spell you cast and can't be higher than 5th level."
	},{
		name:"Sculpt Spells",
		description:"You can create pockets of relative safety within the effects of your evocation spells. When you cast an evocation spell that affects other creatures that you can see, you can choose a number of them equal to 1 + the spell's level. The chosen creatures automatically succeed on their saving throws against the spell, and they take no damage if they would normally take half damage on a successful save."
	},{
		name:"Potent Cantrip",
		description:"Your damaging cantrips affect even creatures that avoid the brunt of the effect. When a creature succeeds on a saving throw against your cantrip, the creature takes half the cantrip's damage (if any) but suffers no additional effect from the cantrip."
	},{
		name:"Empowered Evocation",
		description:"You can add your Intelligence modifier to one damage roll of any wizard evocation spell you cast."
	},{
		name:"Overchannel",
		description:"You can increase the power of your simpler spells. When you cast a wizard spell of 1st through 5th-level that deals damage, you can deal maximum damage with that spell.\n\nThe first time you do so, you suffer no adverse effect. If you use this feature again before you finish a long rest, you take 2d12 necrotic damage for each level of the spell, immediately after you cast it. Each time you use this feature again before finishing a long rest, the necrotic damage per spell level increases by 1d12. This damage ignores resistance and immunity."
	},{
		name:"Spell Mastery",
		description:"You have achieved such mastery over certain spells that you can cast them at will. Choose a 1st-level wizard spell and a 2nd-level wizard spell that are in your spellbook. You can cast those spells at their lowest level without expending a spell slot when you have them prepared. If you want to cast either spell at a higher level, you must expend a spell slot as normal.\n\nBy spending 8 hours in study, you can exchange one or both of the spells you chose for different spells of the same levels."
	},{
		name:"Signature Spells",
		description:"You gain mastery over two powerful spells and can cast them with little effort. Choose two 3rd-level wizard spells in your spellbook as your signature spells. You always have these spells prepared, they don't count against the number of spells you have prepared, and you can cast each of them once at 3rd level without expending a spell slot. When you do so, you can't do so again until you finish a short or long rest.\n\nIf you want to cast either spell at a higher level, you must expend a spell slot as normal."
	},{
		name:"Projected Ward",
		description:"When a creature that you can see within 30 feet of you takes damage, you can use your reaction to cause your Arcane Ward to absorb that damage. If this damage reduces the ward to 0 hit points, the warded creature takes any remaining damage."
	},{
		name:"Improved Abjuration",
		description:"When you cast an abjuration spell that requires you to make an ability check as a part of casting that spell (as in counterspell and dispel magic), you add your proficiency bonus to that ability check."
	},{
		name:"Spell Resistance",
		description:"You have advantage on saving throws against spells, and you have resistance against the damage dealt by spells."
	},{
		name:"Durable Summons",
		description:"Any creature that you summon or create with a conjuration spell has 30 temporary hit points."
	},{
		name:"Minor Conjuration",
		description:"You can use your action to conjure up an inanimate object in your hand or on the ground in an unoccupied space that you can see within 10 feet of you. This object can be no larger than 3 feet on a side and weigh no more than 10 pounds, and its form must be that of a nonmagical object that you have seen. The object is visibly magical, radiating dim light out to 5 feet.\n\nThe object disappears after 1 hour, when you use this feature again, if it takes any damage, or if it deals any damage."
	},{
		name:"Forced Conjuration",
		description:"While you are concentrating on a conjuration spell, your concentration can't be broken as a result of taking damage."
	},{
		name:"Split Enchantment",
		description:"When you cast an enchantment spell of 1st level or higher that targets only one creature, you can have it target a second creature."
	},{
		name:"Alter Memories",
		description:"You gain the ability to make a creature unaware of your magical influence on it. When you cast an enchantment spell to charm one or more creatures, you can alter one creature's understanding so that it remains unaware of being charmed.\n\nAdditionally, once before the spell expires, you can use your action to try to make the chosen creature forget some of the time it spent charmed. The creature must succeed on an Intelligence saving throw against your wizard spell save DC or lose a number of hours of its memories equal to 1 + your Charisma modifier (minimum of 1). You can make the creature forget less time, and the amount of time can't exceed the duration of your enchantment spell."
	},{
		name:"Instinctive Charm",
		description:"When a creature you can see within 30 feet of you makes an attack roll against you, you can use your reaction to divert the attack, provided that another creature is within the attack's range. The attacker must make a Wisdom saving throw against your wizard spell save DC. On a failed save, the attacker must target the creature that is closest to it, not including you or itself. If multiple creatures are closest, the attacker chooses which one to target. On a successful save, you can't use this feature on the attacker again until you finish a long rest.\n\nYou must choose to use this feature before knowing whether the attack hits or misses. Creatures that can't be charmed are immune to this effect.",
	},{
		name:"Minor Alchemy",
		description:"You can temporarily alter the physical properties of one nonmagical object, changing it from one substance into another. You perform a special alchemical procedure on one object composed entirely of wood, stone (but not a gemstone), iron, copper, or silver, transforming it into a different one of those materials. For each 10 minutes you spend performing the procedure, you can transform up to 1 cubic foot of material. After 1 hour, or until you lose your concentration (as if you were concentrating on a spell), the material reverts to its original substance."
	},{
		name:"Transmuter's Stone",
		description:"You can spend 8 hours creating a transmuter's stone that stores transmutation magic. You can benefit from the stone yourself or give it to another creature. A creature gains a benefit of your choice as long as the stone is in the creature's possession. When you create the stone, choose the benefit from the following options:\n\u2022 Darkvision out to a range of 60 feet, as described in chapter 8.\n\u2022 An increase to speed of 10 feet while the creature is unencumbered.\n\u2022 Proficiency in Constitution saving throws.\n\u2022 Resistance to acid, cold, fire, lightning, or thunder damage (your choice whenever you choose this benefit).\n\nEach time you cast a transmutation spell of 1st level or higher, you can change the effect of your stone if the stone is on your person.\n\nIf you create a new transmuter's stone, the previous one ceases to function."
	},{
		name:"Master Transmuter",
		description:"You can use your action to consume the reserve of transmutation magic stored within your transmuter's stone in a single burst. When you do so, choose one of the following effects. Your transmuter's stone is destroyed and can't be remade until you finish a long rest.\n\u2022 Major Transformation. You can transmute one nonmagical object—no larger than a 5-foot cube—into another nonmagical object of similar size and mass and of equal or lesser value. You must spend 10 minutes handling the object to transform it.\n\u2022 Panacea. You remove all curses, diseases, and poisons affecting a creature that you touch with the transmuter's stone. The creature also regains all its hit points.\n\u2022 Restore Life. You cast the raise dead spell on a creature you touch with the transmuter's stone, without expending a spell slot or needing to have the spell in your spellbook.\n\u2022 Restore Youth. You touch the transmuter's stone to a willing creature, and that creature's apparent age is reduced by 3d10 years, to a minimum of 13 years. This effect doesn't extend the creature's lifespan."
	}
]);

window.classes.push(
{
		classname:"Wizard",
		name:"Wizard",
		description:"",
		levels:[
			{ //1, first player level
				summary:[
					{name:"Proficiencies",description:"Daggers, Darts, Slings, Quarterstaffs, Light Crossbows, INT saves, WIS saves"},
					{name:"Starting Equipiment",description:"A Spellbook, a Quarterstaff or Dagger, an Arcane Focus or a Component Pouch"},
					{name:"Skill Proficiencies",description:"Two from Arcana, History, Insight, Investigation, Medicine, or Religion"},
					findAbility("Arcane Recovery")
				],
				"updates":[
					{
						choicePrompt:"You gain the following",
						choices:[findAbility("Arcane Recovery")],
						action:function(char,derived,choice,$scope){
							char.maxHp=6;
							char.proficiencies.push("Daggers");
							char.proficiencies.push("Darts");
							char.proficiencies.push("Slings");
							char.proficiencies.push("Quarterstaffs");
							char.proficiencies.push("Light Crossbows");
							char.saves.int=1;
							char.saves.wis=1;
							addToInventory(findItem("Spellbook"));
							addAbility(char,"Arcane Recovery");
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[findItem("Quarterstaff"),findItem("Dagger")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a pack:",
						choices:[findItem("Scholar's Pack"),findItem("Explorer's Pack")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose one:",
						choices:[findItem("Component Pouch"),findItem("Arcane Focus")],
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
									if (["Arcana","History","Insight","Investigation","Medicine","Religion"].indexOf(skill.name)!=-1){
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
						choices:[listUnknownWizardCantrips],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},{
						limit:6,
						choicePrompt:"Choose six spells",
						choices:[listLearnableSpells],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					}
				]
			},	{ // 1
				"updates":[
					helper.hitDice6,
					{
						summary:findPassive("Arcane Recovery"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Arcane Recovery")],
						action:function(char,derived,choice){
							addAbility(char,"Arcane Recovery");
						}
					},{
						limit:3,
						choicePrompt:"Choose three cantrips",
						choices:[listUnknownWizardCantrips],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					},{
						limit:6,
						choicePrompt:"Choose six spells",
						choices:[listLearnableSpells],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					}
				]
			}, { // 2
				"updates":[
					helper.hitDice6,
					helper.chooseSpell2,
					{
						summary:{name:"Arcane Tradition",description:"Choose your arcane tradition."},
						"choicePrompt":"Choose an Arcane Tradition:",
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addSubclass(char,"Wizard",choice);
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice6,
					helper.chooseSpell2
				]
			}, { // 4
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi,
					helper.chooseWizardCantrip,
					helper.chooseSpell2
				]
			},{//5
				"updates":[
					helper.hitDice6,
					helper.chooseSpell2
				]
			},{//6
				"updates":[
					helper.hitDice6,
					helper.chooseSpell2
				]
			},{//7
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//8
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi,
					helper.chooseSpell2
				]
			},{//9
				"updates":[
					helper.hitDice6,
					helper.chooseSpell2
				]
			},{//10
				"updates":[
					helper.hitDice6,
					helper.chooseWizardCantrip,
					helper.chooseSpell2
				]
			},{//11
				"updates":[
					helper.hitDice6,
					helper.chooseSpell2
				]
			},{//12
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi,
					helper.chooseSpell2
				]
			},{//13
				"updates":[
					helper.hitDice6,
					helper.chooseSpell2
				]
			},{//14
				"updates":[
					helper.hitDice6,
					helper.chooseSpell2
				]
			},{//15
				"updates":[
					helper.hitDice6,
					helper.chooseSpell2
				]
			},{//16
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi,
					helper.chooseSpell2
				]
			},{//17
				"updates":[
					helper.hitDice6,
					helper.chooseSpell2
				]
			},{//18
				"updates":[
					helper.hitDice6,
					helper.chooseSpell2,
					{
						summary:findPassive("Spell Mastery"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Spell Mastery")],
						action:function(char){
							addPassive(char,"Spell Mastery");
						}
					}
				]
			},{//19
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.asi,
					helper.chooseSpell2
				]
			},{//20
				"updates":[
					helper.hitDice6,
					helper.chooseSpell2,
					{
						summary:findPassive("Signature Spells"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Signature Spells")],
						action:function(char){
							addPassive(char,"Signature Spells");
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Wizard",
		name:"Divination",
		subclass:"Divination",
		description:"The counsel of a diviner is sought by royalty and commoners alike, for all seek a clearer understanding of the past, present, and future. As a diviner, you strive to part the veils of space, time, and consciousness so that you can see clearly. You work to master spells of discernment, remote viewing, supernatural knowledge, and foresight.",
		levels:[{},{},
			{//2
				summary:[
					findPassive("Divination Savant"),
					findPassive("Portent")
				],
				updates:[
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Divination Savant"),findPassive("Portent")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Divination Savant");
							addPassive(char,"Portent");
							addAbility(char,"Foretelling Roll");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						summary:findPassive("Expert Divination"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Expert Divination")],
						action:function(char){
							addPassive(char,"Expert Divination");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						summary:findAbility("The Third Eye"),
						choicePrompt:"You gain the following",
						choices:[findAbility("The Third Eye")],
						action:function(char,derived,choice){
							addAbility(char,"The Third Eye");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						summary:{name:"Improved Portent",description:"Your Portent gains a 3rd d20."},
						choicePrompt:"You gain the following",
						choices:["Portent x3"],
						action:function(char){}
					}
				]
			},{},{},{},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Wizard",
		name:"Evocation",
		subclass:"Evocation",
		description:"You focus your study on magic that creates powerful elemental effects such as bitter cold, searing flame, rolling thunder, crackling lightning, and burning acid. Some evokers find employment in military forces, serving as artillery to blast enemy armies from afar. Others use their spectacular power to protect the weak, while some seek their own gain as bandits, adventurers, or aspiring tyrants.",
		levels:[{},{},
			{//2
				summary:[
					findPassive("Evocation Savant"),
					findPassive("Sculpt Spells")
				],
				updates:[
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Evocation Savant"),findPassive("Sculpt Spells")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Evocation Savant");
							addPassive(char,"Sculpt Spells");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						summary:findPassive("Potent Cantrip"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Potent Cantrip")],
						action:function(char){
							addPassive(char,"Potent Cantrip");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						summary:findPassive("Empowered Evocation"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Empowered Evocation")],
						action:function(char,derived,choice){
							addPassive(char,"Empowered Evocation");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						summary:findPassive("Overchannel"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Overchannel")],
						action:function(char){
							addPassive(char,"Overchannel");
						}
					}
				]
			},{},{},{},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Wizard",
		name:"Abjuration",
		subclass:"Abjuration",
		description:"The School of Abjuration emphasizes magic that blocks, banishes, or protects. Detractors of this school say that its tradition is about denial, negation rather than positive assertion. You understand, however, that ending harmful effects, protecting the weak, and banishing evil influences is anything but a philosophical void. It is a proud and respected vocation.",
		levels:[{},{},
			{//2
				summary:[
					findPassive("Abjuration Savant"),
					findAbility("Arcane Ward")
				],
				updates:[
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Abjuration Savant"),findAbility("Arcane Ward")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Abjuration Savant");
							addAbility(char,"Arcane Ward");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						summary:findPassive("Projected Ward"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Projected Ward")],
						action:function(char){
							addPassive(char,"Projected Ward");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						summary:findPassive("Improved Abjuration"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Improved Abjuration")],
						action:function(char,derived,choice){
							addPassive(char,"Improved Abjuration");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						summary:findPassive("Spell Resistance"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Spell Resistance")],
						action:function(char){
							addPassive(char,"Spell Resistance");
						}
					}
				]
			},{},{},{},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Wizard",
		name:"Conjuration",
		subclass:"Conjuration",
		description:"As a conjurer, you favor spells that produce objects and creatures out of thin air. You can conjure billowing clouds of killing fog or summon creatures from elsewhere to fight on your behalf. As your mastery grows, you learn spells of transportation and can teleport yourself across vast distances, even to other planes of existence, in an instant.",
		levels:[{},{},
			{//2
				summary:[
					findPassive("Conjuration Savant"),
					findPassive("Minor Conjuration")
				],
				updates:[
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Conjuration Savant"),findPassive("Minor Conjuration")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Conjuration Savant");
							addPassive(char,"Minor Conjuration");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						summary:findAbility("Benign Transposition"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Benign Transposition")],
						action:function(char){
							addAbility(char,"Benign Transposition");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						summary:findPassive("Focused Conjuration"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Focused Conjuration")],
						action:function(char,derived,choice){
							addPassive(char,"Focused Conjuration");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						summary:findPassive("Durable Summons"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Durable Summons")],
						action:function(char){
							addPassive(char,"Durable Summons");
						}
					}
				]
			},{},{},{},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Wizard",
		name:"Enchantment",
		subclass:"Enchantment",
		description:"As a member of the School of Enchantment, you have honed your ability to magically entrance and beguile other people and monsters. Some enchanters are peacemakers who bewitch the violent to lay down their arms and charm the cruel into showing mercy. Others are tyrants who magically bind the unwilling into their service. Most enchanters fall somewhere in between.",
		levels:[{},{},
			{//2
				summary:[
					findPassive("Enchantment Savant"),
					findPassive("Hypnotic Gaze")
				],
				updates:[
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Enchantment Savant"),findAbility("Hypnotic Gaze")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Enchantment Savant");
							addPassive(char,"Hypnotic Gaze");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						summary:findAbility("Instinctive Charm"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Instinctive Charm")],
						action:function(char){
							addAbility(char,"Instinctive Charm");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						summary:findPassive("Split Enchantment"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Split Enchantment")],
						action:function(char,derived,choice){
							addPassive(char,"Split Enchantment");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						summary:findPassive("Alter Memories"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Alter Memories")],
						action:function(char){
							addPassive(char,"Alter Memories");
						}
					}
				]
			},{},{},{},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Wizard",
		name:"Transmutation",
		subclass:"Transmutation",
		description:"You are a student of spells that modify energy and matter. To you, the world is not a fixed thing, but eminently mutable, and you delight in being an agent of change. You wield the raw stuff of creation and learn to alter both physical forms and mental qualities. Your magic gives you the tools to become a smith on reality's forge.\n\nSome transmuters are tinkerers and pranksters, turning people into toads and transforming copper into silver for fun and occasional profit. Others pursue their magical studies with deadly seriousness, seeking the power of the gods to make and destroy worlds.",
		levels:[{},{},
			{//2
				summary:[
					findPassive("Transmutation Savant"),
					findPassive("Minor Alchemy")
				],
				updates:[
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Transmutation Savant"),findPassive("Minor Alchemy")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Transmutation Savant");
							addPassive(char,"Minor Alchemy");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						summary:findPassive("Transmuter's Stone"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Transmuter's Stone")],
						action:function(char){
							addPassive(char,"Transmuter's Stone");
						}
					}
				]
			},{},{},{},
			{//10
				summary:[
					findAbility("Shapechanger"),
					findSpell("Polymorph")
				],
				updates:[
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findAbility("Shapechanger"),findSpell("Polymorph")],
						action:function(char,derived,choice){
							addSpell(char,"Polymorph","Wizard");
							addAbility(char,"Shapechanger");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						summary:findPassive("Master Transmuter"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Master Transmuter")],
						action:function(char){
							addPassive(char,"Master Transmuter");
						}
					}
				]
			},{},{},{},{},{},{}
		]
	}
);