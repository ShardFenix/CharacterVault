window.abilities.append([
	{
		name:"Stroke of Luck",
		description:"If your attack misses a target within range, you can turn the miss into a hit. Alternatively, if you fail an ability check, you can treat the d20 roll as a 20.\n\nOnce you use this feature, you can't use it again until you finish a short or long rest.",
		maxCharges:1,
		charges:1,
		onShortRest:function(){this.charges=1;}
	},{
		name:"Master Duelist",
		description:"Your mastery of the blade lets you turn failure into success in combat. If you miss with an attack roll, you can roll it again with advantage. Once you do so, you can't use this feature again until you finish a short or long rest.",
		maxCharges:1,
		onShortRest:function(){
			this.charges=this.maxCharges;
		}
	}
]);

window.passives.append([
	{
		name:"Sneak Attack",
		description:"You know how to strike subtly and exploit a foe's distraction. Once per turn, you can deal an extra <i>${Math.floor((1+classLevel($scope.char,'Rogue'))/2)}d6</i> damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon.\n\nYou don't need advantage on the attack roll if another enemy of the target is within 5 feet of it, that enemy isn't incapacitated, and you don't have disadvantage on the attack roll."
	},{
		name:"Uncanny Dodge",
		description:"When an attacker that you can see hits you with an attack, you can use your reaction to halve the attack's damage against you."
	},{
		name:"Evasion",
		description:"When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail."
	},{
		name:"Cunning Action",
		description:"You can take a bonus action on each of your turns in combat. This action can be used only to take the Dash, Disengage, or Hide action."
	},{
		name:"Reliable Talent",
		description:"Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10."
	},{
		name:"Blindsense",
		description:"If you are able to hear, you are aware of the location of any hidden or invisible creature within 10 feet of you."
	},{
		name:"Elusive",
		description:"You are so evasive that attackers rarely gain the upper hand against you. No attack roll has advantage against you while you aren't incapacitated."
	},{
		name:"Assassinate",
		description:"You are at your deadliest when you get the drop on your enemies. You have advantage on attack rolls against any creature that hasn't taken a turn in the combat yet. In addition, any hit you score against a creature that is surprised is a critical hit."
	},{
		name:"Infiltration Expertise",
		description:"You can unfailingly create false identities for yourself. You must spend seven days and 25 gp to establish the history, profession, and affiliations for an identity. You can't establish an identity that belongs to someone else. For example, you might acquire appropriate clothing, letters of introduction, and official-looking certification to establish yourself as a member of a trading house from a remote city so you can insinuate yourself into the company of other wealthy merchants.\n\nThereafter, if you adopt the new identity as a disguise, other creatures believe you to be that person until given an obvious reason not to."
	},{
		name:"Impostor",
		description:"You gain the ability to unerringly mimic another person's speech, writing, and behavior. You must spend at least three hours studying these three components of the person's behavior, listening to speech, examining handwriting, and observing mannerism.\n\nYour ruse is indiscernible to the casual observer. If a wary creature suspects something is amiss, you have advantage on any Charisma (Deception) check you make to avoid detection."
	},{
		name:"Death Strike",
		description:"When you attack and hit a creature that is surprised, it must make a Constitution saving throw (DC 8 + your Dexterity modifier + your proficiency bonus). On a failed save, double the damage of your attack against the creature."
	},{
		name:"Fancy Footwork",
		description:"During your turn, if you make a melee attack against a creature, that creature can't make opportunity attacks against you for the rest of your turn."
	},{
		name:"Rakish Audacity",
		description:"You can give yourself a bonus to your initiative rolls equal to your Charisma modifier.\n\nYou also gain an additional way to use your Sneak Attack; you don't need advantage on the attack roll to use your Sneak Attack against a creature if you are within 5 feet of it, no other creatures are within 5 feet of you, and you don't have disadvantage on the attack roll. All the other rules for Sneak Attack still apply to you.",
		apply:function(char,scope){
			scope.derived.initiative += scope.derived.modifiers.cha;
		}
	},{
		name:"Panache",
		desciption:"Your charm becomes extraordinarily beguiling. As an action, you can make a Charisma (Persuasion) check contested by a creature's Wisdom (Insight) check. The creature must be able to hear you, and the two of you must share a language.\n\nIf you succeed on the check and the creature is hostile to you, it has disadvantage on attack rolls against targets other than you and can't make opportunity attacks against targets other than you. This effect lasts for 1 minute, until one of your companions attacks the target or affects it with a spell, or until you and the target are more than 60 feet apart.\n\nIf you succeed on the check and the creature isn't hostile to you, it is charmed by you for 1 minute. While charmed, it regards you as a friendly acquaintance. This effect ends immediately if you or your companions do anything harmful to it."
	},{
		name:"Elegant Maneuver",
		description:"You can use a bonus action on your turn to gain advantage on the next Dexterity (Acrobatics) or Strength (Athletics) check you make during the same turn."
	}
]);

window.classes.push(
	{
		classname:"Rogue",
		name:"Rogue",
		description:"",
		levels:[
			{ //1, first player level
				summary:[
					{name:"Proficiencies",description:"Light Armor, Simple Weapons, Hand Crossbows, Longswords, Rapiers, Shortswords, Thieves' Tools, Thieves' Cant"},
					{name:"Starting Equipment",description:"2 Daggers, Thieves' Tools, Leather Armor, Shortsword or Rapier, Shortbow or Shortsword"},
					{name:"Skill Proficiencies",description:"Four from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, Stealth"},
					{name:"Expertise",description:"Your proficiency bonus is doubled for two skills of your choice."},
					findPassive("Sneak Attack"),
				],
				"updates":[
					{
						"choices":[],
						"action":function(char,derived,choice,$scope){
							char.maxHp=8;
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Simple Weapons");
							char.proficiencies.push("Hand Crossbows");
							char.proficiencies.push("Longswords");
							char.proficiencies.push("Rapiers");
							char.proficiencies.push("Shortswords");
							char.proficiencies.push("Thieves' Tools");
							char.proficiencies.push("Language: Thieves' Cant");
							char.saves.int=1;
							char.saves.dex=1;
							addToInventory(findItem("Dagger",2));
							addToInventory(findItem("Thieves' Tools"));
							addToInventory(findItem("Leather Armor"));
							addPassive(char,"Sneak Attack");
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[findItem("Shortsword"),findItem("Rapier")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[findItem("Shortbow"),findItem("Shortsword")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
							if (choice==="Shortbow"){
								addToInventory(char,findItem("Arrow",20));
							}
						}
					},{
						choicePrompt:"Choose a pack:",
						choices:[findItem("Dungeoneer's Pack"),findItem("Explorer's Pack"),findItem("Burglar's Pack")],
						action:function(char,derived,choice){
							openPack(char,choice);
						}
					},{
						"choicePrompt":"Choose four skill proficiencies:",
						"choices":[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Acrobatics","Athletics","Deception","Insight","Intimidation","Investigation","Perception","Performance","Persuasion","Sleight of Hand","Stealth"].indexOf(skill.name)!=-1){
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
						"choicePrompt":"Choose four skill proficiencies:",
						"choices":[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Acrobatics","Athletics","Deception","Insight","Intimidation","Investigation","Perception","Performance","Persuasion","Sleight of Hand","Stealth"].indexOf(skill.name)!=-1){
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
						"choicePrompt":"Choose four skill proficiencies:",
						"choices":[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Acrobatics","Athletics","Deception","Insight","Intimidation","Investigation","Perception","Performance","Persuasion","Sleight of Hand","Stealth"].indexOf(skill.name)!=-1){
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
						"choicePrompt":"Choose four skill proficiencies:",
						"choices":[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Acrobatics","Athletics","Deception","Insight","Intimidation","Investigation","Perception","Performance","Persuasion","Sleight of Hand","Stealth"].indexOf(skill.name)!=-1){
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
					helper.chooseExpertise,
					helper.chooseExpertise
				]
			},	{ // 1
				summary:[
					findPassive("Sneak Attack"),
					{name:"Expertise",description:"Double the proficiency bonus of two skills of your choice."}
				],
				"updates":[
					helper.hitDice8,
					{
						choicePrompt:"You gain the following",
						"choices":[findPassive("Sneak Attack")],
						"action":function(char,derived,choice){
							addPassive(char,"Sneak Attack");
						}
					},
					helper.chooseExpertise,
					helper.chooseExpertise
				]
			}, { // 2
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Cunning Action"),
						choicePrompt:"You gain the following",
						"choices":[findPassive("Cunning Action")],
						"action":function(char,derived,choice){
							addPassive(char,"Cunning Action");
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice8,
					{
						summary:{name:"Roguish Archetype",description:"You choose your Rogue subclass"},
						choicePrompt:"Choose a Roguish Archetype",
						choices:[listSpecializations],
						action:function(char,derived,choice){
							addSubclass(char,"Rogue",choice);
						}
					}
				]
			}, { // 4
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//5
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Uncanny Dodge"),
						choicePrompt:"You gain the following",
						"choices":[findPassive("Uncanny Dodge")],
						"action":function(char,derived){
							addPassive(char,"Uncanny Dodge");
						}
					}
				]
			},{//6
				summary:[
					{name:"Expertise",description:"Double the proficiency bonus for two skills of your choice."}
				],
				"updates":[
					helper.hitDice8,
					helper.chooseExpertise,
					helper.chooseExpertise,
				]
			},{//7
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Evasion"),
						choicePrompt:"You gain the following",
						"choices":[findPassive("Evasion")],
						"action":function(char,derived){
							addPassive(char,"Evasion");
						}
					}
				]
			},{//8
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//9
				"updates":[
					helper.hitDice8
				]
			},{//10
				"updates":[
					helper.hitDice8
				]
			},{//11
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Reliable Talent"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Reliable Talent")],
						action:function(char){
							addPassive(char,"Reliable Talent");
						}
					}
				]
			},{//12
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//13
				"updates":[
					helper.hitDice8
				]
			},{//14
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Blindsense"),
						choicePrompt:"You gain the following",
						"choices":[findPassive("Blindsense")],
						"action":function(char){
							addPassive(char,"Blindsense");
						}
					}
				]
			},{//15
				"updates":[
					helper.hitDice8,
					{
						summary:{name:"Slippery Mind",description:"You gain proficiency in Wisdom saving throws."},
						choicePrompt:"You gain the following",
						choices:[{name:"Slippery Mind",description:"You gain proficiency in Wisdom saving throws."}],
						action:function(char){
							char.saves.wis=1;
						}
					}
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
					helper.hitDice8
				]
			},{//18
				"updates":[
					helper.hitDice8,
					{
						summary:findPassive("Elusive"),
						choicePrompt:"You gain the following",
						"choices":[findPassive("Elusive")],
						"action":function(char){
							addPassive(char,"Elusive");
						}
					}
				]
			},{//19
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//20
				"updates":[
					helper.hitDice8,
					{
						summary:findAbility("Stroke of Luck"),
						choicePrompt:"You gain the following",
						"choices":[],
						"action":function(char){
							addAbility(char,"Stroke of Luck");
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Rogue",
		name:"Assassin",
		subclass:"Assassin",
		description:"",
		levels:[{},{},{},
			{//3
				updates:[
					{
						summary:findPassive("Assassinate"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Assassinate")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Assassinate");
							char.proficiencies.upush("Disguise Kit");
							char.proficiencies.upush("Poisoner's Kit");
						}
					}
				]
			},{},{},{},{},{},{ //9
				updates:[
					{
						summary:findPassive("Infiltration Expertise"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Infiltration Expertise")],
						action:function(char){
							addPassive(char,"Infiltration Expertise");
						}
					}
				]
			},{},{},{},
			{//13
				updates:[
					{
						summary:findPassive("Impostor"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Impostor")],
						action:function(char,derived,choice){
							addPassive(char,"Impostor");
						}
					}
				]
			},{},{},{},
			{//17
				updates:[
					{
						summary:findPassive("Death Strike"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Death Strike")],
						action:function(char){
							addPassive(char,"Death Strike");
						}
					}
				]
			},{},{},{}
		]
	}
);

window.subclasses.push(
	{
		classname:"Rogue",
		name:"Swashbuckler",
		subclass:"Swashbuckler",
		description:"You focus your training on the art of the blade, relying on speed, elegance, and charm in equal parts. While some warriors are brutes clad in heavy armor, your method of fighting looks almost like a performance. Duelists and pirates typically belong to this archetype. \n\nA Swashbuckler excels in single combat, and can fight with two weapons while safely darting away from an opponent.",
		levels:[{},{},{},
			{//3
				summary:[findPassive("Fancy Footwork"),findPassive("Rakish Audacity")],
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Rakish Audacity"),findPassive("Fancy Footwork")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Rakish Audacity");
							addPassive(char,"Fancy Footwork");
						}
					}
				]
			},{},{},{},{},{},{ //9
				updates:[
					{
						summary:findPassive("Panache"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Panache")],
						action:function(char){
							addPassive(char,"Panache");
						}
					}
				]
			},{},{},{},
			{//13
				updates:[
					{
						summary:findPassive("Elegant Maneuver"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Elegant Maneuver")],
						action:function(char,derived,choice){
							addPassive(char,"Elegant Maneuver");
						}
					}
				]
			},{},{},{},
			{//17
				updates:[
					{
						summary:findAbility("Master Duelist"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Master Duelist")],
						action:function(char){
							addAbility(char,"Master Duelist");
						}
					}
				]
			},{},{},{}
		]
	}
);
