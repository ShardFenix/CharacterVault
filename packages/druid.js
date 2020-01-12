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
						limit:2,
						choicePrompt:"Choose two skill proficiencies:",
						choices:[function(char){
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
						action:function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						limit:2,
						choicePrompt:"Choose two cantrips",
						choices:[listUnknownDruidCantrips],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					}
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
					},{
						limit:2,
						choicePrompt:"Choose two cantrips",
						choices:[listUnknownDruidCantrips],
						action:function(char,derived,choice,scope){
							addSpell(char,choice,scope.chosenClassName);
						}
					}
				]
			}, { // 2
				"updates":[
					helper.hitDice8,
					{
						"choicePrompt":"Choose a Druid Circle:",
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addSubclass(char,"Druid",choice);
						}
					},{
						choicePrompt:"You gain the following",
						choices:[findAbility("Wild Shape")],
						action:function(char){
							addAbility(char,"Wild Shape");
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
					helper.asi,
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
					helper.asi
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
					helper.asi
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
					helper.asi
				]
			},{//17
				"updates":[
					helper.hitDice8
				]
			},{//18
				"updates":[
					helper.hitDice8,
					{
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Timeless Body (Druid)"),findPassive("Beast Spells")],
						action:function(char){
							addPassive(char,"Timeless Body (Druid)");
							addPassive(char,"Beast Spells");
						}
					}
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
					helper.hitDice8,
					{
						choicePrompt:"You gain the following",
						"choices":[findPassive("Archdruid")],
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
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Combat Wild Shape"),findPassive("Circle Forms")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Combat Wild Shape");
							addPassive(char,"Circle Forms");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Primal Strike")],
						action:function(char){
							addPassive(char,"Primal Strike");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Elemental Wild Shape")],
						action:function(char,derived,choice){
							addPassive(char,"Elemental Wild Shape");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Thousand Forms")],
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
						always:true,
						choicePrompt:"You gain the following",
						choices:[findPassive("Speech of the Woods"),findAbility("Spirit Totem")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Speech of the Woods");
							addAbility(char,"Spirit Totem");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Mighty Summoner")],
						action:function(char){
							addPassive(char,"Mighty Summoner");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Guardian SPirit")],
						action:function(char,derived,choice){
							addPassive(char,"Guardian Spirit");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findAbility("Faithful Summons")],
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
			//TODO: Put spell lists on the terrain options?
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
						choicePrompt:"You gain the following",
						choices:[findPassive("Natural Recovery")],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Natural Recovery");
						}
					}
				]
			},{},{},{},{ //6
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Land's Stride")],
						action:function(char){
							addPassive(char,"Land's Stride");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Nature's Ward")],
						action:function(char,derived,choice){
							addPassive(char,"Nature's Ward");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choicePrompt:"You gain the following",
						choices:[findPassive("Nature's Sanctuary")],
						action:function(char,derived,choice){
							addPassive(char,"Nature's Sanctuary");
						}
					}
				]
			},{},{},{},{},{},{}
		]
	}
);

window.abilities.append([
	{
		name:"Wild Shape",
		description:"You can use your action to magically assume the shape of a beast that you have seen before. You can use this feature twice. You regain expended uses when you finish a short or long rest.\nYour druid level determines the beasts you can transform into, as shown in the Beast Shapes table.\nYou can stay in a beast shape for a number of hours equal to half your druid level (rounded down). You then revert to your normal form unless you expend another use of this feature. You can revert to your normal form earlier by using a bonus action on your turn. You automatically revert if you fall unconscious, drop to 0 hit points, or die.\n\nWhile you are transformed, the following rules apply:\n\u2022 Your game statistics are replaced by the statistics of the beast, but you retain your alignment, personality, and Intelligence, Wisdom, and Charisma scores. You also retain all of your skill and saving throw proficiencies, in addition to gaining those of the creature. If the creature has the same proficiency as you and the bonus in its stat block is higher than yours, use the creature's bonus instead of yours. If the creature has any legendary or lair actions, you can't use them.\n\u2022 When you transform, you assume the beast's hit points and Hit Dice. When you revert to your normal form, you return to the number of hit points you had before you transformed. However, if you revert as a result of dropping to 0 hit points, any excess damage carries over to your normal form. For example, if you take 10 damage in animal form and have only 1 hit point left, you revert and take 9 damage. As long as the excess damage doesn't reduce your normal form to 0 hit points, you aren't knocked unconscious.\n\u2022 You can't cast spells, and your ability to speak or take any action that requires hands is limited to the capabilities of your beast form. Transforming doesn't break your concentration on a spell you've already cast, however, or prevent you from taking actions that are part of a spell, such as call lightning, that you've already cast.\n\u2022 You retain the benefit of any features from your class, race, or other source and can use them if the new form is physically capable of doing so. However, you can't use any of your special senses, such as darkvision, unless your new form also has that sense.\n\u2022 You choose whether your equipment falls to the ground in your space, merges into your new form, or is worn by it. Worn equipment functions as normal, but the DM decides whether it is practical for the new form to wear a piece of equipment, based on the creature's shape and size. Your equipment doesn't change size or shape to match the new form, and any equipment that the new form can't wear must either fall to the ground or merge with it. Equipment that merges with the form has no effect until you leave the form.",
		charges:2,
		maxCharges:2,
		onShortRest:function(){
			this.charges=this.maxCharges;
		}
	},{
		name:"Natural Recovery",
		description:"You can regain some of your magical energy by sitting in meditation and communing with nature. During a short rest, you choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your druid level (rounded up), and none of the slots can be 6th level or higher. You can't use this feature again until you finish a long rest.",
		charges:1,
		maxCharges:1,
		onLongRest:function(){
			this.charges=1;
		}
	},{
		name:"Spirit Totem",
		description:"You can call forth nature spirits to influence the world around you. As a bonus action, you can magically summon an incorporeal spirit to a point you can see within 60 feet of you. The spirit creates an aura in a 30-foot radius around that point. It counts as neither a creature nor an object, though it has the spectral appearance of the creature it represents.\nAs a bonus action, you can move the spirit up to 60 feet to a point you can see.\nThe spirit persists for 1 minute or until you're incapacitated. Once you use this feature, you can't use it again until you finish a short or long rest.\nThe effect of the spirit's aura depends on the type of spirit you summon from the options below.\n\n\u2022 Bear Spirit. The bear spirit grants you and your allies its might and endurance. Each creature of your choice in the aura when the spirit appears gains temporary hit points equal to 5 + your druid level. In addition, you and your allies gain advantage on Strength checks and Strength saving throws while in the aura.\n\u2022 Hawk Spirit. The hawk spirit is a consummate hunter, aiding you and your allies with its keen sight. When a creature makes an attack roll against a target in the spirit's aura, you can use your reaction to grant advantage to that attack roll. In addition, you and your allies have advantage on Wisdom (Perception) checks while in the aura.\n\u2022 Unicorn Spirit. The unicorn spirit lends its protection to those nearby. You and your allies gain advantage on all ability checks made to detect creatures in the spirit's aura. In addition, if you cast a spell using a spell slot that restores hit points to any creature inside or outside the aura, each creature of your choice in the aura also regains hit points equal to your druid level.",
		charges:1,
		maxCharges:1,
		onShortRest:function(){
			this.charges=1;
		}
	},{
		name:"Faithful Summons",
		description:"The nature spirits you commune with protect you when you are the most defenseless. If you are reduced to 0 hit points or are incapacitated against your will, you can immediately gain the benefits of conjure animals as if it were cast using a 9th-level spell slot. It summons four beasts of your choice that are challenge rating 2 or lower. The conjured beasts appear within 20 feet of you. If they receive no commands from you, they protect you from harm and attack your foes. The spell lasts for 1 hour, requiring no concentration, or until you dismiss it (no action required).\nOnce you use this feature, you can't use it again until you finish a long rest.",
		charges:1,
		maxCharges:1,
		onLongRest:function(){
			this.charges=1;
		}
	}
]);

window.passives.append([
	{
		name:"Timeless Body (Druid)",
		description:"The primal magic that you wield causes you to age more slowly. For every 10 years that pass, your body ages only 1 year."
	},{
		name:"Archdruid",
		description:"You can use your Wild Shape an unlimited number of times.\nAdditionally, you can ignore the verbal and somatic components of your druid spells, as well as any material components that lack a cost and aren't consumed by a spell. You gain this benefit in both your normal shape and your beast shape from Wild Shape."
	},{
		name:"Combat Wild Shape",
		description:"You gain the ability to use Wild Shape on your turn as a bonus action, rather than as an action.\nAdditionally, while you are transformed by Wild Shape, you can use a bonus action to expend one spell slot to regain 1d8 hit points per level of the spell slot expended."
	},{
		name:"Circle Forms",
		description:"The rites of your circle grant you the ability to transform into more dangerous animal forms. You can use your Wild Shape to transform into a beast with a challenge rating as high as ${ladder(classLevel($scope.char,'Druid'),1,1,6,2,9,3,12,4,15,5,18,6)} (you ignore the Max. CR column of the Beast Shapes table, but must abide by the other limitations there).\n\nStarting at 6th level, you can transform into a beast with a challenge rating as high as your druid level divided by 3, rounded down."
	},{
		name:"Primal Strike",
		description:"Your attacks in beast form count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage."
	},{
		name:"Thousand Forms",
		description:"You have learned to use magic to alter your physical form in more subtle ways. You can cast the alter self spell at will."
	},{
		name:"Land's Stride",
		description:"Moving through nonmagical difficult terrain costs you no extra movement. You can also pass through nonmagical plants without being slowed by them and without taking damage from them if they have thorns, spines, or a similar hazard.\nIn addition, you have advantage on saving throws against plants that are magically created or manipulated to impede movement, such those created by the entangle spell."
	},{
		name:"Nature's Ward",
		description:"You can't be charmed or frightened by elementals or fey, and you are immune to poison and disease."
	},{
		name:"Nature's Sanctuary",
		description:"Creatures of the natural world sense your connection to nature and become hesitant to attack you. When a beast or plant creature attacks you, that creature must make a Wisdom saving throw against your druid spell save DC. On a failed save, the creature must choose a different target, or the attack automatically misses. On a successful save, the creature is immune to this effect for 24 hours.\n\nThe creature is aware of this effect before it makes its attack against you."
	},{
		name:"Speech of the Woods",
		description:"You gain the ability to converse with beasts and many fey.\n\nYou learn to speak, read, and write Sylvan. In addition, beasts can understand your speech, and you gain the ability to decipher their noises and motions. Most beasts lack the intelligence to convey or understand sophisticated concepts, but a friendly beast could relay what it has seen or heard in the recent past. This ability doesn't grant you friendship with beasts, though you can combine this ability with gifts to curry favor with them as you would with any nonplayer character."
	},{
		name:"Mighty Summoner",
		description:"Beasts and fey that you conjure are more resilient than normal. Any beast or fey summoned or created by a spell that you cast gains the following benefits:\n\u2022 The creature appears with more hit points than normal: 2 extra hit points per Hit Die it has.\n\u2022 The damage from its natural weapons is considered magical for the purpose of overcoming immunity and resistance to nonmagical attacks and damage."
	},{
		name:"Guardian Spirit",
		description:"Your Spirit Totem safeguards the beasts and fey that you call forth with your magic. When a beast or fey that you summoned or created with a spell ends its turn in your Spirit Totem aura, that creature regains a number of hit points equal to half your druid level."
	}
]);