function listInstruments(){};

function listSkills(){
	var result=[];
	for (var i=0;i<window.skills.length;i++){
		result.push(window.skills[i].name);
	}
	return result;
};

function listNonProficientSkills(char){
	var result=[];
	for (var i=0;i<window.skills.length;i++){
		if (char.skills[window.skills[i].name].mult==0){
			result.push(window.skills[i].name);
		}
	}
	return result;
}

function listSimpleWeapons(){};

function findItem(name){
	return name;
};

function getAllLanguages(){return window.languages;};

function addSubclass(char,classname,subclass){
	for (var i=0;i<char.classes.length;i++){
		if (char.classes[i].name==classname){
			char.classes[i].subclass=subclass;
			return;
		}
	}
};

Array.prototype.upush=function(element){
	if (element && element.name) {
		for (var i=0;i<this.length;i++){
			if (element.name==this[i].name){
				return;
			}
		}
		this.push(element);
	} else {
		if (this.indexOf(element)==-1){
			this.push(element);
		}
	}
};

function listSpecializations(classname){
	var result=[];
	for (var i=0;i<window.subclasses.length;i++){
		result.push(window.subclasses[i].classname);
	}
	return result;
}

window.languages=['Common','Elven','Dwarven','Gnomish','Halfling','Giant','Orc','Infernal','Primordial','Abyssal','Celestial','Draconic','Deep Speech','Sylvan','Undercommon'];
window.feats=[];
window.spells=[];
window.races=[];
window.skills=[
	{name:"Acrobatics",attribute:"dex"},
	{name:"Animal Handling",attribute:"wis"},
	{name:"Arcana",attribute:"int"},
	{name:"Athletics",attribute:"str"},
	{name:"Deception",attribute:"cha"},
	{name:"History",attribute:"int"},
	{name:"Insight",attribute:"wis"},
	{name:"Intimidation",attribute:"cha"},
	{name:"Investigation",attribute:"int"},
	{name:"Medicine",attribute:"wis"},
	{name:"Nature",attribute:"int"},
	{name:"Perception",attribute:"wis"},
	{name:"Performance",attribute:"cha"},
	{name:"Persuasion",attribute:"cha"},
	{name:"Religion",attribute:"int"},
	{name:"Sleight of Hand",attribute:"dex"},
	{name:"Stealth",attribute:"dex"},
	{name:"Survival",attribute:"wis"}
];

window.classes=
[
	{
		"classname":"Bard",
		"levels":[
			{ //1, first player level
				"updates":[
					{
						"choices":[],
						"action":function(char,derived,choice){
							char.maxHp=8;
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Simple Weapons");
							char.proficiencies.push("Rapiers");
							char.proficiencies.push("Longswords");
							char.proficiencies.push("Shortswords");
							char.proficiencies.push("Hand Crossbows");
							char.saves.dex=1;
							char.saves.cha=1;
						}
					},
					{
						"choices":listInstruments,
						"action":function(char,derived,choice){
							char.proficiencies.upush(choice);
						}
					},
					{
						"choices":listInstruments,
						"action":function(char,derived,choice){
							char.proficiencies.upush(choice);
						}
					},
					{
						"choices":listInstruments,
						"action":function(char,derived,choice){
							char.proficiencies.upush(choice);
						}
					},
					{
						"choices":listSkills,
						"action":function(char,derived,choice){
							char.skills["choice"]=1;
						}
					},
					{
						"choices":listSkills,
						"action":function(char,derived,choice){
							char.skills["choice"]=1;
						}
					},
					{
						"choices":listSkills,
						"action":function(char,derived,choice){
							char.skills["choice"]=1;
						}
					},
					{
						"choices":[listSimpleWeapons,findItem("Longsword"),findItem("Rapier")],
						"action":function(char,derived,choice){
							$scope.addToInventory(choice);
						}
					}
				]
			},	{ // 1
				"updates":[
					{
						"choicePrompt":"What did you roll for your hit dice?",
						"choices":[1,2,3,4,5,6,7,8],
						"action":function(char,derived,choice){
							char.hpMax+=choice;
						}
					},
					{
						"choicePrompt":"Select a language to learn:",
						"choices":getAllLanguages,
						"action":function(char,derived,choice){
							char.proficiencies.push(choice);
						}
					}
				]
			}, { // 2
				"updates":[
					{
						"choicePrompt":"What did you roll for your hit dice?",
						"choices":[1,2,3,4,5,6,7,8],
						"action":function(char,derived,choice){
							char.hpMax+=choice;
							char.passives.push(findPassive("Jack of All Trades"));
							char.passives.push(findPassive("Song of Rest"));
						}
					}
				]
			}, { // 3
				"updates":[
					{
						"choicePrompt":"What did you roll for your hit dice?",
						"choices":[1,2,3,4,5,6,7,8],
						"action":function(char,derived,choice){
							char.hpMax+=choice;
						}
					}, {
						"choicePrompt":"Choose a Bard College:",
						"choices":listSpecializations["Bard"],
						"action":function(char,derived,choice){
							addSubclass(char,"Bard",choice);
						}
					}
				]
			}
		]
	}
];

window.subclasses=
[
	{
		"classname":"Bard",
		"subclass":"College of Lore",
		"levels":[
			{},{},{},
			{ // 3
				"updates":[
					{
						"choicePrompt":"Choose a skill to become proficient in:",
						"choices":listNonProficientSkills,
						"action":function(char,derived,choice){
							setSkillProficiency(char,choice);
						}
					},{
						"choicePrompt":"Choose a skill to become proficient in:",
						"choices":listNonProficientSkills,
						"action":function(char,derived,choice){
							setSkillProficiency(char,choice);
						}
					},{
						"choicePrompt":"Choose a skill to become proficient in:",
						"choices":listNonProficientSkills,
						"action":function(char,derived,choice){
							setSkillProficiency(char,choice);
							char.passives.push(findPassive("Cutting Words"));
						}
					}
				]
			}
		]
	}
];