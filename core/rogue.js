window.classes.push(
	{
		classname:"Rogue",
		name:"Rogue",
		description:"",
		levels:[
			{ //1, first player level
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
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addPassive(char,"Sneak Attack");
						}
					}
					helper.chooseExpertise,
					helper.chooseExpertise
				]
			}, { // 2
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addPassive(char,"Cunning Action");
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice8,
					{
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
						"choices":[],
						"action":function(char,derived){
							addPassive(char,"Uncanny Dodge");
						}
					}
				]
			},{//6
				"updates":[
					helper.hitDice8,
					helper.chooseExpertise,
					helper.chooseExpertise
				]
			},{//7
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
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
						choices:[],
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
						"choices":[],
						"action":function(char){
							addPassive(char,"Blindsense");
						}
					}
				]
			},{//15
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
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
						"choices":[],
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
						choices:[],
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
						choices:[],
						action:function(char){
							addPassive(char,"Infiltration Expertise");
						}
					}
				]
			},{},{},{},
			{//13
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Impostor");
						}
					}
				]
			},{},{},{},
			{//17
				updates:[
					{
						choices:[],
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
		classname:"Monk",
		name:"Way of Enlightenment",
		subclass:"Way of Enlightenment",
		description:"Monks on the Path of Enlightenment seek to become one with the world around them. Through intense study and meditation, enlightened monks are able to feel their surroundings, not only in place but in time. This path rewards monks who manage their Ki points well.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						choices:[],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Supernatural Awareness");
							addPassive(char,"Bonus Reaction");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"See the Code");
						}
					}
				]
			},{},{},{},{},
			{//11
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Zen Meditation");
						}
					}
				]
			},{},{},{},{},{},
			{//17
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Enlightened Strike");
						}
					}
				]
			},{},{},{}
		]
	}
);