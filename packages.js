function hasProficiency(char,name){
	for (var i=0;i<char.proficiencies.length;i++){
		if (char.proficiencies[i]===name){
			return true;
		}
	}
	return false;
}

function findItem(itemname){
	for (var item of window.items){
		if (item.name===itemname){
			return item;
		}
	}
}

function findAbility(name){
	for (var abil of window.abilities){
		if (abil.name===name){
			return abil;
		}
	}
}

function addProficiency(char,skillname){
	for (var i=0;i<char.skills.length;i++){
		if (char.skills[i].name===skillname){
			if (char.skills[i].mult==0){
				char.skills[i].mult=1;
			}
			return;
		}
	}
}

function addExpertise(char,skillname){
	for (var i=0;i<char.skills.length;i++){
		if (char.skills[i].name===skillname){
			if (char.skills[i].mult==1){
				char.skills[i].mult=2;
			}
			return;
		}
	}
}

function addToInventory(char, item){
	if (!item){
		return;
	}
	for (var i=0;i<char.inventory.length;i++){
		if (char.inventory[i].name==item.name){
			char.inventory[i].count = char.inventory[i].count+item.count;
			return;
		}
	}
	char.inventory.push(item);
}

function listSkills(){
	var result=[];
	for (var i=0;i<window.skills.length;i++){
		result.push(window.skills[i].name);
	}
	return result;
};

function listNonProficientInstruments(char){
	var result=[];
	for (var i=0;i<window.items.length;i++){
		if (window.items[i].categories.indexOf('Instrument')!=-1){
			if (!hasProficiency(char,window.items[i].proficiencies[0])){
				result.push(window.items[i].name);
			}
		}
	}
	return result;
}

function listNonProficientSkills(char){
	var result=[];
	for (var i=0;i<window.skills.length;i++){
		for (var j=0;j<char.skills.length;j++){
			if (char.skills[j].name==window.skills[i].name){
				if (char.skills[j].mult==0) {
					result.push(window.skills[i].name);
				}
				j=9999;
			}
		}
	}
	return result;
}

function listProficientSkills(char){
	var result=[];
	for (var i=0;i<char.skills.length;i++){
		if (char.skills[i].mult===1) {
			result.push(char.skills[i].name);
		}
	}
	return result;
}

function listSimpleWeapons(){
	var result=[];
	for (var i=0;i<window.items.length;i++){
		let item=window.items[i];
		if (item.categories.indexOf('Simple')!=-1 && item.categories.indexOf('Weapon')!=-1){
			result.push(item.name);
		}
	}
	return result;
}

function listMartialWeapons(){
	var result=[];
	for (var i=0;i<window.items.length;i++){
		let item=window.items[i];
		if (item.categories.indexOf('Martial')!=-1 && item.categories.indexOf('Weapon')!=-1){
			result.push(item.name);
		}
	}
	return result;
}

function getUnknownLanguages(char){
	var result=[];
	for (var i=0;i<window.languages.length;i++){
		var found=false;
		for (var j=0;j<char.proficiencies.length;j++){
			if (char.proficiencies[j]==window.languages[i]){
				found=true;
				break;
			}
		}
		if (!found){
			result.push(window.languages[i]);
		}
	}
	return result;
};

function addSubclass(char,classname,subclass){
	for (var clas of char.classes){
		if (clas.name===classname){
			clas.subclass=subclass;
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
	for (var subclass of window.subclasses){
		result.push(subclass.subclass);
	}
	return result;
}

function findPassive(name){
	for (var passive of window.passives){
		if (passive.name===name){
			return passive;
		}
	}
	return null;
}

function listAllUnknownSpells(char,derived){
	var result=[];
	for (var spell of window.spells){
		var found=false;
		for (var clas of char.classes){
			for (var cspell of clas.spells.known){
				if (cspell.name===spell.name){
					found=true;
					break;
				}
			}
			if (found)break;
		}
		if (!found){
			result.add(spell.name);
		}
	}
	return result;
}

function listLearnableSpellsForClass(char,classname){
	var result=[];
	for (var spell of window.spells){
		var found=false;
		for (var clas of char.classes){
			if (clas.name==classname){
				for (var cspell of clas.spells.known){
					if (cspell.name===spell.name){
						found=true;
						break;
					}
				}
			}
//TODO UNFINISHED
			
			if (found)break;
		}
		if (!found){
			result.add(spell.name);
		}
	}
	return result;
}

function getAttributesBelow20(char){
	var result=[];
	if (char.attributes.str<20){
		result.push("+1 Strength");
	}
	if (char.attributes.dex<20){
		result.push("+1 Dexterity");
	}
	if (char.attributes.con<20){
		result.push("+1 Constitution");
	}
	if (char.attributes.int<20){
		result.push("+1 Intelligence");
	}
	if (char.attributes.wis<20){
		result.push("+1 Wisdom");
	}
	if (char.attributes.cha<20){
		result.push("+1 Charisma");
	}
	return result;
}

function addSpell(char,spellname,forClass){
	
}

function getUnknownFeats(char){
	var result=[];
	for (var feat of window.feats){
		var found=false;
		for (var cfeat of char.feats){
			if (cfeat.name===feat.name){
				found=true;break;
			}
		}
		if (!found){
			result.push(feat.name);
		}
	}
	return result;
}

window.languages=['Language: Common','Language: Elven','Language: Dwarven','Language: Gnomish','Language: Halfling','Language: Giant','Language: Orc','Language: Infernal','Language: Primordial','Language: Abyssal','Language: Celestial','Language: Draconic','Language: Deep Speech','Language: Sylvan','Language: Undercommon',"Language: Thieves' Cant","Language: Druidic"];
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

window.abilities=[
	{
		name:"Lv 1 Spell (Bard)",
		maxChargesFunction:function(char,derived,scope){
			for (var c of char.classes){
				if (c.name==="Bard"){
					return Math.min(c.level+1,4);
				}
			}
		},
		description:"",
		onLongRest:function(char,derived,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 2 Spell (Bard)",
		maxChargesFunction:function(char,derived,scope){
			for (var c of char.classes){
				if (c.name==="Bard"){
					if (c.level<3)return 0;
					if (c.level===4)return 2;
					return 3;
				}
			}
		},
		description:"",
		onLongRest:function(char,derived,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 3 Spell (Bard)",
		maxChargesFunction:function(char,derived,scope){
			for (var c of char.classes){
				if (c.name==="Bard"){
					if (c.level<5)return 0;
					if (c.level===5)return 2;
					return 3;
				}
			}
		},
		description:"",
		onLongRest:function(char,derived,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 4 Spell (Bard)",
		maxChargesFunction:function(char,derived,scope){
			for (var c of char.classes){
				if (c.name==="Bard"){
					if (c.level<7)return 0;
					if (c.level===7)return 1;
					if (c.level===8)return 2;
					return 3;
				}
			}
		},
		description:"",
		onLongRest:function(char,derived,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 5 Spell (Bard)",
		maxChargesFunction:function(char,derived,scope){
			for (var c of char.classes){
				if (c.name==="Bard"){
					if (c.level<9)return 0;
					if (c.level===9)return 1;
					if (c.level<18)return 2;
					return 3;
				}
			}
		},
		description:"",
		onLongRest:function(char,derived,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 6 Spell (Bard)",
		maxChargesFunction:function(char,derived,scope){
			for (var c of char.classes){
				if (c.name==="Bard"){
					if (c.level<11)return 0;
					if (c.level<19)return 1;
					return 2;
				}
			}
		},
		description:"",
		onLongRest:function(char,derived,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 7 Spell (Bard)",
		maxChargesFunction:function(char,derived,scope){
			for (var c of char.classes){
				if (c.name==="Bard"){
					if (c.level<13)return 0;
					if (c.level<20)return 1;
					return 2;
				}
			}
		},
		description:"",
		onLongRest:function(char,derived,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 8 Spell (Bard)",
		maxChargesFunction:function(char,derived,scope){
			for (var c of char.classes){
				if (c.name==="Bard"){
					if (c.level<15)return 0;
					return 1;
				}
			}
		},
		description:"",
		onLongRest:function(char,derived,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 9 Spell (Bard)",
		maxChargesFunction:function(char,derived,scope){
			for (var c of char.classes){
				if (c.name==="Bard"){
					if (c.level<17)return 0;
					return 1;
				}
			}
		},
		description:"",
		onLongRest:function(char,derived,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Bardic Inspiration (d6)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,derived,scope){
			return Math.max(1,derived.modifiers.cha);
		},
		onLongRest:function(char,derived,scope){
			this.charges=derived.modifiers.cha;
		}
	},{
		name:"Bardic Inspiration (d8)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d8.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,derived,scope){
			return Math.max(1,derived.modifiers.cha);
		},
		onShortRest:function(char,derived,scope){
			this.charges=derived.modifiers.cha;
		}
	},{
		name:"Bardic Inspiration (d10)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d10.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,derived,scope){
			return Math.max(1,derived.modifiers.cha);
		},
		onShortRest:function(char,derived,scope){
			this.charges=derived.modifiers.cha;
		}
	},{
		name:"Bardic Inspiration (d12)",
		description:"As a bonus action, choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d12.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.",
		maxChargesFunction:function(char,derived,scope){
			return Math.max(1,derived.modifiers.cha);
		},
		onShortRest:function(char,derived,scope){
			this.charges=derived.modifiers.cha;
		}
	}
];

window.passives=[
	{
		name:"Jack of All Trades",
		description:"You can add half your proficiency bonus, rounded down, to any ability check you make that doesn't already include your proficiency bonus.",
		apply:function(char,$scope){
			let bonus=Math.floor($scope.derived.proficiency/2);
			for (var skill of $scope.derived.skills){
				if (skill.mult==0){
					skill.bonus += bonus;
				}
			}
			$scope.derived.initiative+=bonus;
		}
	},{
		name:"Song of Rest",
		description:"You can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creatures who can hear your performance regain hit points by spending Hit Dice at the end of the short rest, each of those creatures regains an extra 1d${ladder(clevel('Bard'),0,6,9,8,13,19,17,12)} hit points.",
		apply:null
	}
	
];

window.items=[
	{
		name:'Lyre',
		description:'',
		categories:['Instrument'],
		count:1,
		meleeRange:5,//usually 5 or 10, falsey means no attack
		meleeDamage:'1d4',//can be static, or can be a function that gets sent char and scope
		throwRange:[20,60],//falsey means no attack
		throwDamage:'1d4',//can be static, or can be a function that gets sent char and scope
		finesse:false,
		value:200,
		proficiencies:['Lyre']//char must have one of these to get proficiency bonus
	},	{
		name:'Flute',
		description:'',
		categories:['Instrument'],
		count:1,
		meleeRange:5,//usually 5 or 10, falsey means no attack
		meleeDamage:'1d4',//can be static, or can be a function that gets sent char and scope
		throwRange:[20,60],//falsey means no attack
		throwDamage:'1d4',//can be static, or can be a function that gets sent char and scope
		finesse:false,
		value:200,
		proficiencies:['Flute']//char must have one of these to get proficiency bonus
	},	{
		name:'Longsword',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		meleeRange:5,//usually 5 or 10, falsey means no attack
		meleeDamage:'1d8 slashing (2H: 1d10)',//can be static, or can be a function that gets sent char and scope
		throwRange:[20,60],//falsey means no attack
		throwDamage:'1d4',//can be static, or can be a function that gets sent char and scope
		finesse:false,
		value:150,
		proficiencies:['Martial Weapons','Longsword']//char must have one of these to get proficiency bonus
	}
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
							angular.copy(findAbility("Bardic Inspiration (d6)"));
							char.abilities.upush(findAbility("Bardic Inspiration (d6)"));
							char.abilities.upush(findAbility("Lv 1 Spell (Bard)"));
						}
					},
					{
						"choicePrompt":"Choose an instrument proficiency.",
						"choices":[listNonProficientInstruments],
						"action":function(char,derived,choice){
							char.proficiencies.upush(choice);
						}
					},
					{
						"choicePrompt":"Choose an instrument proficiency.",
						"choices":[listNonProficientInstruments],
						"action":function(char,derived,choice){
							char.proficiencies.upush(choice);
						}
					},
					{
						"choicePrompt":"Choose an instrument proficiency.",
						"choices":[listNonProficientInstruments],
						"action":function(char,derived,choice){
							char.proficiencies.upush(choice);
						}
					},
					{
						"choicePrompt":"Choose a skill proficiency.",
						"choices":[listNonProficientSkills],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},
					{
						"choicePrompt":"Choose a skill proficiency.",
						"choices":[listNonProficientSkills],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},
					{
						"choicePrompt":"Choose a skill proficiency.",
						"choices":[listNonProficientSkills],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},
					{
						"choicePrompt":"Choose a weapon to start with.",
						"choices":[listSimpleWeapons,"Longsword","Rapier"],
						"action":function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},
					{
						"choicePrompt":"Choose a spell.",
						"choices":[listSpells],
						"action":function(char,derived,choice){
							addSpell(char,choice,"Bard");
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
						"choices":[getUnknownLanguages],
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
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addSubclass(char,"Bard",choice);
						}
					}
				]
			}, { // 4
				"updates":[
					{
						"choicePrompt":"What did you roll for your hit dice?",
						"choices":[1,2,3,4,5,6,7,8],
						"action":function(char,derived,choice){
							char.hpMax+=choice;
						}
					}, {
						"choicePrompt":"Choose one:",
						"choices":["+2 to Ability Scores","Take a Feat"],
						"action":function(char,derived,choice,$scope){
							if (choice==="Take a Feat"){
								$scope.updateStep+=2;
							}
						}
					}, {
						"choicePrompt":"Choose one:",
						"choices":[getAttributesBelow20],
						"action":function(char,derived,choice,$scope){
							switch (choice){
								case "+1 Strength":char.attributes.str+=1;break;
								case "+1 Dexterity":char.attributes.dex+=1;break;
								case "+1 Constitution":char.attributes.con+=1;break;
								case "+1 Intelligence":char.attributes.int+=1;break;
								case "+1 Wisdom":char.attributes.wis+=1;break;
								case "+1 Charisma":char.attributes.cha+=1;break;
							}
						}
					}, {
						"choicePrompt":"Choose one:",
						"choices":[getAttributesBelow20],
						"action":function(char,derived,choice,$scope){
							switch (choice){
								case "+1 Strength":char.attributes.str+=1;break;
								case "+1 Dexterity":char.attributes.dex+=1;break;
								case "+1 Constitution":char.attributes.con+=1;break;
								case "+1 Intelligence":char.attributes.int+=1;break;
								case "+1 Wisdom":char.attributes.wis+=1;break;
								case "+1 Charisma":char.attributes.cha+=1;break;
							}
							$scope.updateStep++;
						}
					}, {
						"choicePrompt":"Choose a Feat",
						"choices":[getUnknownFeats],
						"action":function(char,derived,choice){
							//todo
						}
					}
				]
			},{//5
				"updates":[
					{
						"choices":[],
						"action":function(char,derived){
							//upgrade bardic inspiration to recharge on short rest
							for (var abil of char.abilities){
								if (abil.name==="Bardic Inspiration"){
									
									return;
								}
							}
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
						"choices":[listNonProficientSkills],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						"choicePrompt":"Choose a skill to become proficient in:",
						"choices":[listNonProficientSkills],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						"choicePrompt":"Choose a skill to become proficient in:",
						"choices":[listNonProficientSkills],
						"action":function(char,derived,choice){
							addProficiency(char,choice);
							char.passives.push(findPassive("Cutting Words"));
						}
					},{
						"choicePrompt":"Choose a skill expertise (proficiency will be doubled for this skill):",
						"choices":[listProficientSkills],
						"action":function(char,derived,choice){
							addExpertise(char,choice);
						}
					},{
						"choicePrompt":"Choose a skill expertise (proficiency will be doubled for this skill):",
						"choices":[listProficientSkills],
						"action":function(char,derived,choice){
							addExpertise(char,choice);
						}
					},{
						"choicePrompt":"Choose a skill expertise (proficiency will be doubled for this skill):",
						"choices":[listProficientSkills],
						"action":function(char,derived,choice){
							addExpertise(char,choice);
						}
					}
				]
			},{},{},
			{//6
				updates:[
					{
						choicePrompt:"Learn a spell from any class:",
						choices:[listAllUnknownSpells],
						action:function(char,derived,choice){
							addSpell(char,choice,'Bard');
						}
					},{
						choicePrompt:"Learn a spell from any class:",
						choices:[listAllUnknownSpells],
						action:function(char,derived,choice){
							addSpell(char,choice,'Bard');
						}
					}
				]
			}
		]
	}
];