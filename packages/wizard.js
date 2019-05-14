
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
	}
]);

window.passives.append([
	{
		name:"Divination Savant",
		description:"The gold and time you must spend to copy a divination spell into your spellbook is halved."
	},{
		name:"Evocation Savant",
		description:"The gold and time you must spend to copy an evocation spell into your spellbook is halved."
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
						choices:[],
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
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
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
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
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
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},
					helper.chooseWizardCantrip,
					helper.chooseWizardCantrip,
					helper.chooseWizardCantrip,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell
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
					},
					helper.chooseWizardCantrip,
					helper.chooseWizardCantrip,
					helper.chooseWizardCantrip,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell,
					helper.chooseSpell
				]
			}, { // 2
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell,
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
					helper.chooseSpell,
					helper.chooseSpell
				]
			}, { // 4
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseWizardCantrip,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//5
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//6
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
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
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//9
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//10
				"updates":[
					helper.hitDice6,
					helper.chooseWizardCantrip,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//11
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//12
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//13
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//14
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//15
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//16
				"updates":[
					helper.hitDice6,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//17
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//18
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell,
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
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseSpell,
					helper.chooseSpell
				]
			},{//20
				"updates":[
					helper.hitDice6,
					helper.chooseSpell,
					helper.chooseSpell,
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