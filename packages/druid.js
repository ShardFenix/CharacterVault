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
							addPassive(char,"Elemental Wild Shape");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Thousand Forms");
						}
					}
				]
			},{},{},{},{},{},{}
		]
	},{
		classname:"Druid",
		name:"Circle of the Shepherd",
		subclass:"Circle of the Shepherd",
		description:"Druids of the Circle of the Shepherd commune with the spirits of nature, especially the spirits of beasts and the fey, and call to those spirits for aid. These druids recognize that all living things play a role in the natural world, yet they focus on protecting animals and fey creatures that have difficulty defending themselves. Shepherds, as they are known, see such creatures as their charges. They ward off monsters that threaten them, rebuke hunters who kill more prey than necessary, and prevent civilization from encroaching on rare animal habitats and on sites sacred to the fey. Many of these druids are happiest far from cities and towns, content to spend their days in the company of animals and the fey creatures of the wilds.\n\nMembers of this circle become adventurers to oppose forces that threaten their charges or to seek knowledge and power that will help them safeguard their charges better. Wherever these druids go, the spirits of the wilderness are with them.",
		levels:[{},{},
			{//2
				updates:[
					{
						choices:[],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Speech of the Woods");
							addAbility(char,"Spirit Totem");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Mighty Summoner");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Guardian Spirit");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addAbility(char,"Faithful Summons");
						}
					}
				]
			},{},{},{},{},{},{}
		]
	},{
		classname:"Druid",
		name:"Circle of the Land",
		subclass:"Circle of the Land",
		description:"The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through a vast oral tradition. These druids meet within sacred circles of trees or standing stones to whisper primal secrets in Druidic. The circle's wisest members preside as the chief priests of communities that hold to the Old Faith and serve as advisors to the rulers of those folk. As a member of this circle, your magic is influenced by the land where you were initiated into the circle's mysterious rites.",
		levels:[{},{},
			{//2
				updates:[
					{
						choices:['Arctic','Coast','Desert','Forest','Grassland','Mountain','Swamp','Underdark'],
						action:function(char,derived,choice){
							//add the circle spells
							if ('Arctic'===choice){
								var s=angular.copy(findSpell("Hold Person"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Spike Growth"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Sleet Storm"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Slow"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Freedom of Movement"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Ice Storm"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Commune with Nature"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Cone of Cold"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
							} else if ('Coast'===choice){
								var s=angular.copy(findSpell("Mirror Image"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Misty Step"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Water Breathing"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Water Walk"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Freedom of Movement"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Control Weather"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Conjure Elemental"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Scrying"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
							} else if ('Desert'===choice){
								var s=angular.copy(findSpell("Blur"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Silence"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Create Food and Water"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Protection from Energy"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Blight"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Hallucinatory Terrain"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Insect Plague"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Wall of Stone"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
							} else if ('Forest'===choice){
								var s=angular.copy(findSpell("Barkskin"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Spider Climb"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Call Lightning"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Plant Growth"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Freedom of Movement"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Divination"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Commune with Nature"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Insect Plague"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
							} else if ('Grassland'===choice){
								var s=angular.copy(findSpell("Invisibility"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Pass without Trace"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Daylight"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Haste"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Freedom of Movement"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Divination"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Insect Plague"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Dream"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
							} else if ('Mountain'===choice){
								var s=angular.copy(findSpell("Spider Climb"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Spike Growth"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Lightning Bolt"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Meld into Stone"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Stone Shape"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Stoneskin"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Passwall"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Wall of Stone"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
							} else if ('Swamp'===choice){
								var s=angular.copy(findSpell("Darkness"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Melf's Acid Arrow"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Water Walk"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Stinking Cloud"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Freedom of Movement"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Locate Creature"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Insect Plague"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Scrying"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
							} else if ('Underdark'===choice){
								var s=angular.copy(findSpell("Spider Climb"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Web"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Gaseous Form"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Stinking Cloud"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Greater Invisibility"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Storm Shape"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Cloudkill"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
								s=angular.copy(findSpell("Insect Plague"));
								s.alwaysPrepared=true;
								addSpell(char,s,"Druid");
							}
						}
					},
					helper.chooseDruidCantrip,
					{
						choices:[],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Natural Recovery");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Land's Stride");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Nature's Ward");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Nature's Sanctuary");
						}
					}
				]
			},{},{},{},{},{},{}
		]
	}
);