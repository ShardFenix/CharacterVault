window.classes.push(
	{
		classname:"Barbarian",
		name:"Barbarian",
		description:"People of towns and cities take pride in how their civilized ways set them apart from animals, as if denying one's own nature was a mark of superiority. To a barbarian, though, civilization is no virtue, but a sign of weakness. The strong embrace their animal nature—keen instincts, primal physicality, and ferocious rage. Barbarians are uncomfortable when hedged in by walls and crowds. They thrive in the wilds of their homelands: the tundra, jungle, or grasslands where their tribes live and hunt.\nBarbarians come alive in the chaos of combat. They can enter a berserk state where rage takes over, giving them superhuman strength and resilience. A barbarian can draw on this reservoir of fury only a few times without resting, but those few rages are usually sufficient to defeat whatever threats arise.",
		levels:[
			{ //1, first player level
				"updates":[
					{
						"choices":[],
						"action":function(char,derived,choice,$scope){
							char.maxHp=12;
							char.proficiencies.upush("Light Armor");
							char.proficiencies.upush("Medium Armor");
							char.proficiencies.upush("Shields");
							char.proficiencies.upush("Simple Weapons");
							char.proficiencies.upush("Martial Weapons");
							char.saves.str=1;
							char.saves.con=1;
							addToInventory(char,findItem("Javelin",4));
							addAbility(char,"Rage");
							addPassive(char,"Unarmored Defense");
							openPack(char,"Explorer's Pack");
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[listMartialWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[listSimpleWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Animal Handling","Athletics","Intimidation","Nature","Perception","Survival"].indexOf(skill.name)!=-1){
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
									if (["Animal Handling","Athletics","Intimidation","Nature","Perception","Survival"].indexOf(skill.name)!=-1){
										result.push(skill.name);
									}
								}
							}
							return result;
						}],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					}
				]
			},	{ // 1
				"updates":[
					helper.hitDice12,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addAbility(char,"Rage");
							addPassive(char,"Unarmored Defense");
						}
					}
				]
			}, { // 2
				"updates":[
					helper.hitDice12,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addPassive(char,"Danger Sense");
							addPassive(char,"Reckless Attack");
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice12,
					{
						choicePrompt:"Choose a Primal Path",
						choices:[listSpecializations],
						action:function(char,derived,choice){
							addSubclass(char,"Barbarian",choice);
						}
					}
				]
			}, { // 4
				"updates":[
					helper.hitDice12,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//5
				"updates":[
					helper.hitDice12,
					{
						"choices":[],
						"action":function(char,derived){
							addPassive(char,"Extra Attacks (x1)");
							addPassive(char,"Fast Movement");
						}
					}
				]
			},{//6
				"updates":[
					helper.hitDice12
					
				]
			},{//7
				"updates":[
					helper.hitDice12,
					{
						"choices":[],
						"action":function(char,derived){
							addPassive(char,"Feral Instinct");
						}
					}
				]
			},{//8
				"updates":[
					helper.hitDice12,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//9
				"updates":[
					helper.hitDice12,
					{
						"choices":[],
						"action":function(char,derived){
							addPassive(char,"Brutal Critical");
						}
					}
				]
			},{//10
				"updates":[
					helper.hitDice12
				]
			},{//11
				"updates":[
					helper.hitDice12,
					{
						choices:[],
						action:function(char,derived){
							addPassive(char,"Relentless Rage");
						}
					}
				]
			},{//12
				"updates":[
					helper.hitDice12,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//13
				"updates":[
					helper.hitDice12
				]
			},{//14
				"updates":[
					helper.hitDice12
				]
			},{//15
				"updates":[
					helper.hitDice12,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Persistent Rage");
						}
					}
				]
			},{//16
				"updates":[
					helper.hitDice12,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//17
				"updates":[
					helper.hitDice12
				]
			},{//18
				"updates":[
					helper.hitDice12,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Indomitable Might");
						}
					}
				]
			},{//19
				"updates":[
					helper.hitDice12,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//20
				"updates":[
					helper.hitDice12,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Primal Champion");
							char.attributes.str=Math.min(char.attributes.str+4,24);
							char.attributes.con=Math.min(char.attributes.con+4,24);
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Barbarian",
		name:"Whirlwind",
		subclass:"Whirlwind",
		description:"You achieve glory in combat the only way you know how - by spinning. Barbarians who follow the Path of the Whirlwind throw caution to the... wind, and swing their oversized weapons in every possible direction, as well as some impossible directions, creating a twister of carnage. Manly yells are mandatory while spinning.",
		levels:[{},{},{},
			{//3
				updates:[
					{
						choices:[],
						action:function(char,derived,choice,$scope){
							addAbility(char,"Whirlwind");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Slice and Dice");
						}
					}
				]
			},{},{},{},
			{//10
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Storm of Steel");
						}
					}
				]
			},{},{},{},
			{//14
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Spin to Win");
						}
					}
				]

			},{},{},{},{},{},{}
		]
	}
);

window.abilities.append([
	{
		name:"Rage",
		description:"In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.\nWhile raging, you gain the following benefits if you aren't wearing heavy armor:\n\u2022 You have advantage on Strength checks and Strength saving throws.\n\u2022 When you make a melee weapon attack using Strength, you gain a +${ladder(classLevel($scope.char,'Barbarian'),1,2,9,3,16,4)} bonus to the damage roll. This bonus increases as you level.\n\u2022 You have resistance to bludgeoning, piercing, and slashing damage.\n\u2022 If you are able to cast spells, you can't cast them or concentrate on them while raging.\n\nYour rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven't attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.\n\nOnce you have raged the maximum number of times for your barbarian level, you must finish a long rest before you can rage again. You may rage 2 times at 1st level, 3 at 3rd, 4 at 6th, 5 at 12th, and 6 at 17th.",
		charges:2,
		maxCharges:2,
		maxChargesFunction:function(char){
			return ladder(classLevel(char,'Barbarian'),1,2,3,3,6,4,12,5,17,6);
		},
		onLongRest:function(){
			this.charges=this.maxCharges;
		}
	},{
		name:"Whirlwind",
		description:"When you enter a rage, you may make it a Whirlwind. While whirlwinding, you continuously spin your weapons around you, striking any objects and creatures that may be nearby. You gain the following while spinning, in lieu of your rage bonuses:\n\n\u2022 You cannot take the Attack action on your turn, you can't cast spells, and you can't make opportunity attacks.\n\u2022 Other creatures can't make opportunity attacks against you.\n\u2022 Melee attacks against you have disadvantage.\n\u2022 At the end of every 15 feet of continuous movement, you may immediately make a free melee attack on a target in your melee range. The attack does half damage.\n\u2022 At the end of each of your turns, if you moved less than 15 feet since your last turn, the whirlwind ends.",
		resourceName:"Rage",
		resourceCost:1
	}
]);

window.passives.append([
	{
		name:"Unarmored Defense",
		description:"While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier."
	},{
		name:"Danger Sense",
		description:"You gain an uncanny sense of when things nearby aren't as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can't be blinded, deafened, or incapacitated."
	},{
		name:"Reckless Attack",
		description:"You can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn."
	},{
		name:"Fast Movement",
		description:"Your speed increases by 10 feet while you aren't wearing heavy armor."
	},{
		name:"Feral Instinct",
		description:"Your instincts are so honed that you have advantage on initiative rolls.\n\nAdditionally, if you are surprised at the beginning of combat and aren't incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn."
	},{
		name:"Brutal Critical (x1)",
		description:"You can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack."
	},{
		name:"Brutal Critical (x2)",
		description:"You can roll two additional weapon damage die when determining the extra damage for a critical hit with a melee attack."
	},{
		name:"Brutal Critical (x3)",
		description:"You can roll three additional weapon damage die when determining the extra damage for a critical hit with a melee attack."
	},{
		name:"Relentless Rage",
		description:"Your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you're raging and don't die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead.\n\nEach time you use this feature after the first, the DC increases by 5. When you finish a short or long rest, the DC resets to 10."
	},{
		name:"Persistent Rage",
		description:"Your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it."
	},{
		name:"Indomitable Might",
		description:"If your total for a Strength check is less than your Strength score, you can use that score in place of the total."
	},{
		name:"Primal Champion",
		description:"Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24."
	},{
		name:"Slice and Dice",
		description:"While whirlwinding, whenever you move into melee range of a creature, or a creature moves within melee range of you, you may have that creature take damage equal to your weapon damage. A creature damaged this way can't be damaged by it again this turn."
	},{
		name:"Storm of Steel",
		description:"You spin so rapidly that your weapons create a swirling shield as they move. While whirlwinding, you have +2 to AC, and the damage dealt by Slice and Dice is increased by your strength modifier."
	},{
		name:"Spin to Win",
		description:"Whenever you bring a creature to 0 hit points during your turn, you can move up to 30 additional feet this turn."
	}
]);