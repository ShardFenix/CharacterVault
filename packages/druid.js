window.classes.push(
{
		classname:"Druid",
		name:"Druid",
		description:"",
		levels:[
			{ //1, first player level
				"updates":[
					{
						"choices":[],
						"action":function(char,derived,choice,$scope){
							char.maxHp=8;
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Medium Armor");
							char.proficiencies.push("Shields");
							char.proficiencies.push("Clubs");
							char.proficiencies.push("Daggers");
							char.proficiencies.push("Darts");
							char.proficiencies.push("Javelins");
							char.proficiencies.push("Maces");
							char.proficiencies.push("Scimitars");
							char.proficiencies.push("Quarterstaffs");
							char.proficiencies.push("Sickles");
							char.proficiencies.push("Slings");
							char.proficiencies.push("Spears");
							char.proficiencies.push("Herbalism Kit");
							char.proficiencies.push("Language: Druidic");
							char.saves.int=1;
							char.saves.wis=1;
							addToInventory(findItem("Leather Armor"));
							addToInventory(findItem("Druidic Focus"));
							openPack("Explorer's Pack");
							addAbility(char,"Arcane Recovery");
							learnAllClassSpells(char,$scope);
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[findItem("Wooden Shield"),listSimpleWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[findItem("Scimitar"),function(){
							//list simple melee weapons
							let result=[];
							for (let i of items){
								if (i.categories.includes("Simple") && i.categories.includes("Melee") && i.categories.includes("Weapon")){
									result.push(i);
								}
							}
							return result;
						}],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Arcana","Animal Handling","Insight","Medicine","Nature","Perception","Religion","Survival"].indexOf(skill.name)!=-1){
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
									if (["Arcana","Animal Handling","Insight","Medicine","Nature","Perception","Religion","Survival"].indexOf(skill.name)!=-1){
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
					helper.chooseDruidCantrip,
					helper.chooseDruidCantrip
				]
			},	{ // 1
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived,choice,$scope){
							learnAllClassSpells(char,$scope);
							char.proficiencies.upush("Light Armor");
							char.proficiencies.upush("Medium Armor");
							char.proficiencies.upush("Shields");
						}
					},
					
					helper.chooseDruidCantrip,
					helper.chooseDruidCantrip
				]
			}, { // 2
				"updates":[
					helper.hitDice8,
					{
						"choicePrompt":"Choose a Druid Circle:",
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addAbility(char,"Wild Shape");
							addSubclass(char,"Druid",choice);
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice8
				]
			}, { // 4
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute,
					helper.chooseDruidCantrip
				]
			},{//5
				"updates":[
					helper.hitDice8
				]
			},{//6
				"updates":[
					helper.hitDice8
				]
			},{//7
				"updates":[
					helper.hitDice8
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
					helper.hitDice8,
					helper.chooseDruidCantrip
				]
			},{//11
				"updates":[
					helper.hitDice8
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
					helper.hitDice8
				]
			},{//15
				"updates":[
					helper.hitDice8
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
							addPassive(char,"Timeless Body");
							addPassive(char,"Beast Spells");
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
							addPassive(char,"Archdruid");
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Druid",
		name:"Circle of the Moon",
		subclass:"Circle of the Moon",
		description:"Druids of the Circle of the Moon are fierce guardians of the wilds. Their order gathers under the full moon to share news and trade warnings. They haunt the deepest parts of the wilderness, where they might go for weeks on end before crossing paths with another humanoid creature, let alone another druid.\n\nChangeable as the moon, a druid of this circle might prowl as a great cat one night, soar over the treetops as an eagle the next day, and crash through the undergrowth in bear form to drive off a trespassing monster. The wild is in the druid's blood.",
		levels:[{},{},
			{//2
				updates:[
					{
						choices:[],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Combat Wild Shape");
							addPassive(char,"Circle Forms");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Primal Strike");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addAbility(char,"Elemental Wild Shape");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addAbility(char,"Thousand Forms");
						}
					}
				]
			},{},{},{},{},{},{}
		]
	}
);