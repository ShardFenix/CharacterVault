function hasProficiency(char,name){
	for (let prof of char.proficiencies){
		if (prof===name){
			return true;
		}
	}
	return false;
}

function isProficientWith(char,item){
	for (let itemProf of item.proficiencies){
		if (char.proficiencies.indexOf(itemProf)!=-1){
			return true;
		}
	}
	return false;
}

function findItem(itemname){
	for (let item of window.items){
		if (item.name===itemname){
			return item;
		}
	}
}

function findAbility(name){
	for (let abil of window.abilities){
		if (abil.name===name){
			return abil;
		}
	}
	return null;
}

function findSpell(name){
	for (let spell of window.spells){
		if (spell.name===name){
			return spell;
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

function listNonProficientWeapons(char){
	var result=[];
	for (let item of window.items){
		if (item.categories.indexOf('Weapon')!=-1){
			if (!isProficientWith(char,item)){
				result.push(item.name);
			}
		}
	}
	return result;
}

function listNonProficientTools(char){
	var result=[];
	for (var i=0;i<window.items.length;i++){
		if (window.items[i].categories.indexOf('Tool')!=-1){
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

function listUnknownLanguages(char){
	var result=[];
	for (var i=0;i<window.languages.length;i++){
		var found=false;
		for (var j=0;j<char.proficiencies.length;j++){
			if (char.proficiencies[j]===window.languages[i]){
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

//list all the spells the user knows and can replace for another spell upon leveling up
function listUnlearnableSpells(char,$scope){
	var result=[];
	let classname=$scope.chosenClassName;
	for (let c of char.classes){
		if (c.name===classname){
			for (let spell of c.spells){
				if (spell.level>0){
					result.push(spell.name);
				}
			}
		}
	}
	return result;
}

function listAllUnknownSpells(char,scope){
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

function listAllUnknownCantrips(char,$scope){
	var result=[];
	
	for (var spell of window.spells){
		//check if they can learn a spell of this level (and exclude cantrips)
		if (spell.level>0){
			continue;
		}
		let found=false;
		for (let clas of char.classes){
			for (var cspell of clas.spells){
				//check if they already know this spell
				if (cspell.name===spell.name){
					found=true;
					break;
				}
			}
			if (found){break;}
		}
		if (!found){
			result.push(spell.name);
		}
	}
	return result;
}

function listUnknownCantrips(char,$scope){
	let classname=$scope.chosenClassName;
	let result=listUnknownCantripsForClass($scope.chosenClassName);
	return result;
}

function listUnknownBardCantrips(char){
	return listUnknownCantripsForClass(char,"Bard");
}
function listUnknownClericCantrips(char){
	return listUnknownCantripsForClass(char,"Cleric");
}
function listUnknownDruidCantrips(char){
	return listUnknownCantripsForClass(char,"Druid");
}
function listUnknownSorcererCantrips(char){
	return listUnknownCantripsForClass(char,"Sorcerer");
}
function listUnknownWarlockCantrips(char){
	return listUnknownCantripsForClass(char,"Warlock");
}
function listUnknownWizardCantrips(char){
	return listUnknownCantripsForClass(char,"Wizard");
}

function listUnknownCantripsForClass(char,classname){
	var result=[];
	//find the right class
	let clas={};
	for (var c of char.classes){
		if (c.name===classname){
			clas=c;
			break;
		}
	}
	
	for (var spell of window.spells){
		//check if they can learn a spell of this level (and exclude cantrips)
		if (spell.level>0){continue;}
		//check that the spell belongs to this class
		if (spell.classes.indexOf(classname)==-1){continue;}
		
		let found=false;
		for (var cspell of clas.spells){
			//check if they already know this spell
			if (cspell.name===spell.name){
				found=true;
				break;
			}
		}
		if (!found){
			result.push(spell.name);
		}
	}
	return result;
}

/**
 * Based on which class the user picked ($scope.chosenClassName),
 * list all the spells they can currently learn from that class.
 */
function listLearnableSpellsForClass(char,$scope){
	var result=[];
	let classname=$scope.chosenClassName;
	//find the right class
	let clas={};
	for (var c of char.classes){
		if (c.name===classname){
			clas=c;
			break;
		}
	}
	//find the highest level they can cast on this class
	let highest=0;
	for (let abil of char.abilities){
		if (abil.name==="Lv 1 Spell ("+classname+")" && highest<1){
			highest=1;
		}if (abil.name==="Lv 2 Spell ("+classname+")" && highest<2){
			highest=2;
		}if (abil.name==="Lv 3 Spell ("+classname+")" && highest<3){
			highest=3;
		}if (abil.name==="Lv 4 Spell ("+classname+")" && highest<4){
			highest=4;
		}if (abil.name==="Lv 5 Spell ("+classname+")" && highest<5){
			highest=5;
		}if (abil.name==="Lv 6 Spell ("+classname+")" && highest<6){
			highest=6;
		}if (abil.name==="Lv 7 Spell ("+classname+")" && highest<7){
			highest=7;
		}if (abil.name==="Lv 8 Spell ("+classname+")" && highest<8){
			highest=8;
		}if (abil.name==="Lv 9 Spell ("+classname+")" && highest<9){
			highest=9;
			break;
		}
	}
	
	for (var spell of window.spells){
		//check if they can learn a spell of this level (and exclude cantrips)
		if (spell.level>highest || spell.level===0){
			continue;
		}
		//check that the spell belongs to this class
		if (spell.classes.indexOf(classname)==-1){
			continue;
		}
		let found=false;
		for (var cspell of clas.spells){
			//check if they already know this spell
			if (cspell.name===spell.name){
				found=true;
				break;
			}
		}
		if (!found){
			result.push(spell.name);
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
	for (let c of char.classes){
		if (c.name===forClass){
			c.spells.push(findSpell(spellname));
		}
	}
}

function addAbility(char,name){
	char.abilities.push(angular.copy(findAbility(name)));
}

function removeAbility(char,name){
	for (let i=0;i<char.abilities.length;i++){
		if (char.abilities[i].name===name){
			char.abilities.splice(i,1);
			return;
		}
	}
}

function getUnknownFeats(char){
	var result=[];
	for (var feat of window.feats){
		var found=false;
		for (var passive of char.passives){
			if (passive.name===feat.name){
				found=true;
				break;
			}
			if (passive.identity && feat.identity && passive.identity===feat.identity){
				found=true;
				break;
			}
		}
		if (!found){
			result.push(feat.name);
		}
	}
	return result;
}

function findFeat(name){
	for (let feat of window.feats){
		if (feat.name===name){
			return feat;
		}
	}
	return null;
}

function getCharacterClass(char,className){
	for (var i=0;i<char.classes.length;i++){
		if (char.classes[i].name==className){
			return char.classes[i];
		}
	}
	return null;
}

function findClass(name){
	for (let p of window.classes){
		if (p.classname===name){
			return p;
		}
	}
}

var findSubclass=function(classname, subclass){
	for (var sub of window.subclasses){
		if (sub.classname===classname && sub.subclass===subclass){
			return sub;
		}
	}
	return null;
}

//return the next level the character is eligible to receive from the given class
function nextLevel(char,className){
	for (var i=0;i<char.classes.length;i++){
		if (char.classes[i].name==className){
			return 1 + char.classes[i].level;
		}
	}
	if (char.classes.length==0){
		return 0;
	}
	return 1;
}

function addPassive(char,name){
	char.passives.push(findPassive(name));
}

/**
 * For each pair of [threshold,result] integers in breakpoints,
 * return the first result that value is greater than or equal to.
 */
function ladder(value, ...breakpoints){
	for (let i=0;i<breakpoints.length;i+=2){
		if (value>=breakpoints[i]){
			return breakpoints[i+1];
		}
	}
	//if breakpoints is odd, the last value is the return value.
	if (breakpoints.length%2==1){
		return breakpoints[breakpoints.length-1];
	}
	return value;
}