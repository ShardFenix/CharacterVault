window.classes.push(
	{
		classname:"Monk",
		name:"Monk",
		description:"Monks make careful study of a magical energy that most monastic traditions call ki. This energy is an element of the magic that suffuses the multiverse—specifically, the element that flows through living bodies. Monks harness this power within themselves to create magical effects and exceed their bodies' physical capabilities, and some of their special attacks can hinder the flow of ki in their opponents. Using this energy, monks channel uncanny speed and strength into their unarmed strikes. As they gain experience, their martial training and their mastery of ki gives them more power over their bodies and the bodies of their foes.",
		levels:[
			{ //1, first player level
				"updates":[
					{
						"choices":[],
						"action":function(char,derived,choice,$scope){
							char.maxHp=8;
							char.proficiencies.push("Shortswords");
							char.proficiencies.push("Simple Weapons");
							char.saves.str=1;
							char.saves.dex=1;
							addToInventory(findItem("Dart",10));
							addPassive(char,"Martial Arts");
							addPassive(char,"Unarmored Movement");
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[findItem("Shortsword"),listSimpleWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a pack:",
						choices:[findItem("Dungeoneer's Pack"),findItem("Explorer's Pack")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						"choicePrompt":"Choose two skill proficiencies:",
						"choices":[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Acrobatics","Athletics","History","Insight","Religion","Stealth"].indexOf(skill.name)!=-1){
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
									if (["Acrobatics","Athletics","History","Insight","Religion","Stealth"].indexOf(skill.name)!=-1){
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
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addPassive(char,"Martial Arta");
							addPassive(char,"Unarmored Movement");
						}
					}
				]
			}, { // 2
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived,choice){
							addPassive(char,"Flurry of Blows");
							addPassive(char,"Patient Defense");
							addPassive(char,"Step of the Wind");
							addPassive(char,"Unarmored Movement");
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice8,
					{
						choices:[],
						action:function(char,derived,choice){
							addPassive(char,"Deflect Missiles");
						}
					},{
						choicePrompt:"Choose a Monastic Tradition",
						choices:[listSpecializations],
						action:function(char,derived,choice){
							addSubclass(char,"Monk",choice);
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
							addPassive(char,"Slow Fall");
							addPassive(char,"Stunning Strike");
						}
					}
				]
			},{//6
				"updates":[
					helper.hitDice8
				]
			},{//7
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived){
							addPassive(char,"Evasion");
							addPassive(char,"Stillness of Mind");
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
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char,derived){
							addPassive(char,"Parkour");
						}
					}
				]
			},{//10
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Purity of Body");
						}
					}
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
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Tongue of the Sun and Moon");
						}
					}
				]
			},{//14
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Diamond Soul");
						}
					}
				]
			},{//15
				"updates":[
					helper.hitDice8,
					{
						"choices":[],
						"action":function(char){
							addPassive(char,"Timeless Body");
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
							addPassive(char,"Empty Body");
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
							addPassive(char,"Perfect Soul");
						}
					}
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Monk",
		name:"Ninjutsu",
		subclass:"Ninjutsu",
		description:"Ninjas are masters of subterfuge, masters of evading detection. They are often hired by powerful political figures for spying and/or assassination duties. In combat, ninjas are masters of dextrous close-quarters combat, being easily able to strike swiftly with deadly accuracy and slipping away from attackers.",
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