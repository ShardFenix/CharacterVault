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
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Medium Armor");
							char.proficiencies.push("Shields");
							char.proficiencies.push("Simple Weapons");
							char.proficiencies.push("Martial Weapons");
							char.saves.str=1;
							char.saves.con=1;
							addToInventory(findItem("Javelin",4));
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
		name:"Zealot",
		subclass:"Zealot",
		description:"",
		levels:[{},{},{},
			{//3
				updates:[
					{
						choices:[],
						action:function(char,derived,choice,$scope){
							addPassive(char,"Way of the Mantis");
							addPassive(char,"Shadow Form");
						}
					}
				]
			},{},{},{ //6
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Master of Infiltration");
						}
					}
				]
			},{},{},{},{},
			{//11
				updates:[
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Shadow Strike");
						}
					}
				]
			},{},{},{},{},{},
			{//17
				updates:[
					{
						choices:[],
						action:function(char){
							addPassive(char,"Desperate Strike");
						}
					}
				]
			},{},{},{}
		]
	}
);
