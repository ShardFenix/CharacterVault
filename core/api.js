Math.rand=function(min,max){
	return min + Math.floor(Math.random()*(max-min));
}

Array.prototype.find=function(objectOrFunction){
	if (typeof objectOrFunction === 'function'){
		for (let element of this){
			if (objectOrFunction(element)){
				return element;
			}
		}
	} else if (objectOrFunction.name) {
		for (let element of this){
			if (element.name===objectOrFunction.name){
				return element;
			}
		}
	} else {
		for (let element of this){
			if (element === objectOrFunction){
				return element;
			}
		}
	}
}

Array.prototype.has=function(string){
	if (string.name){
		for (let element of this){
			if (element.name===string.name){
				return true;
			}
		}
	} else {
		for (let element of this) {
			if (element===string) {
				return true;
			}
		}
	}
	return false;
};

Array.prototype.hasAny=function(...list){
	for (let item of list){
		if (this.has(item)){
			return true;
		}
	}
	return false;
}

Array.prototype.hasAll=function(...list){
	for (let item of list){
		if (!this.has(item)){
			return false;
		}
	}
	return true;
}

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
}

Array.prototype.overlap=function(otherArray){
	let result=[];
	for (let elem of this){
		if (otherArray.has(elem)){
			result.push(elem);
			continue;
		}
	}
}

Array.prototype.remove=function(element){
	if (element && element.name) {
		for (var i=0;i<this.length;i++){
			if (element.name == this[i].name){
				this.splice(i,1);
				return;
			}
		}
	} else {
		let index = this.indexOf(element);
		if (index!=-1){
			this.splice(index,1);
			return;
		}
	}
}

Array.prototype.append=function(otherArray){
	if (Array.isArray(otherArray)){
		for (let element of otherArray){
			this.push(element);
		}
	}
}

String.prototype.contains=String.prototype.includes;

//this is used for classes who know every spell but must prepare them instead
function learnAllClassSpells(char,$scope){
	for (let spell of window.spells){
		if (spell.level>0 && spell.classes.includes($scope.chosenClassName)){
			addSpell(char,spell.name,$scope.chosenClassName);
		}
	}
}

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

function findItem(itemname, count){
	for (let item of window.items){
		if (item.name===itemname){
			let i=angular.copy(item);
			if (count){
				i.count=count;
			}
			return i;
		}
	}
	//if no item is found, create one with that name
	return {
		name:itemname,
		count:count?count:1
	};
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
		if (spell.name.toLowerCase() === name.toLowerCase()){
			return spell;
		}
	}
}

function getPlayerSpell(char, spellName, className){
	for (let clas of char.classes){
		if (className && clas.name!==className){
			continue;
		}
		for (let spell of clas.spells){
			if (spell.name===spellName){
				return spell;
			}
		}
	}
	return null;
}

function findSkill(char,skillName){
	for (let skill of char.skills){
		if (skill.name===skillName){
			return skill;
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
		result.push({name:window.skills[i].name});
	}
	return result;
}

function listManeuvers(char){
	let result=[];
	for (let passive of window.passives){
		if (passive.name.startsWith("Maneuver:") && !hasPassive(char,passive.name)){
			result.push(passive);
		}
	}
	return result;
}

function listNonProficientInstruments(char){
	var result=[];
	for (var i=0;i<window.items.length;i++){
		let item = window.items[i];
		if (item.categories && item.categories.has('Instrument')){
			if (!char.proficiencies || !char.proficiencies.hasAny(item.proficiencies)){
				result.push({name:item.name});
			}
		}
	}
	return result;
}

function listNonProficientTools(char){
	var result=[];
	for (var i=0;i<window.items.length;i++){
		let item = window.items[i];
		if (item.categories && item.categories.hasAny('Artisan Tool','Tool')){
			if (!item.proficiencies || char.proficiencies.hasAny(item.proficiencies)){
				result.push({name:item.name});
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
				result.push({name:item.name});
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
					result.push({name:window.skills[i].name});
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
			result.push({name:char.skills[i].name});
		}
	}
	return result;
}

function listSimpleWeapons(){
	var result=[];
	for (var i=0;i<window.items.length;i++){
		let item=window.items[i];
		if (item.value > 7500){
			continue;
		}
		if (item.categories.indexOf('Simple')!=-1 && item.categories.indexOf('Weapon')!=-1){
			result.push(item);
		}
	}
	return result;
}
function listSimpleMeleeWeapons(){
	var result=[];
	for (var i=0;i<window.items.length;i++){
		let item=window.items[i];
		if (item.value > 7500){
			continue;
		}
		if (item.categories.hasAll('Simple','Melee','Weapon')){
			result.push(item);
		}
	}
	return result;
}

function listMartialWeapons(){
	var result=[];
	for (var i=0;i<window.items.length;i++){
		let item=window.items[i];
		if (item.value > 7500){
			continue;
		}
		if (item.categories.indexOf('Martial')!=-1 && item.categories.indexOf('Weapon')!=-1){
			result.push(item);
		}
	}
	return result;
}

function listInstruments(){
	var result=[];
	for (var i=0;i<window.items.length;i++){
		let item=window.items[i];
		if (item.categories.indexOf('Instrument')!=-1){
			result.push(item);
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
			result.push({name:window.languages[i]});
		}
	}
	return result;
};

function addSubclass(char,classname,subclass){
	for (var clas of char.classes){
		if (clas.name===classname){
			if (subclass.name){
				clas.subclass=subclass.name;
			} else {
				clas.subclass=subclass;
			}
			return;
		}
	}
};

function listSpecializations(char,$scope){
	var result=[];
	for (let subclass of window.subclasses){
		if (subclass.classname===$scope.chosenClassName){
			result.push(subclass);
		}
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
					result.push(spell);
				}
			}
		}
	}
	return result;
}

function listAllUnknownSpells(char,scope){
	var result=[];
	let highest=highestSpellLevel(char);
	for (var spell of window.spells){
		if (spell.level>highest){
			continue;
		}
		var found=false;
		for (var clas of char.classes){
			for (var cspell of clas.spells){
				if (cspell.name===spell.name){
					found=true;
					break;
				}
			}
			if (found)break;
		}
		if (!found){
			result.push(spell);
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
			result.push(spell);
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
		if (clas && clas.spells){
			for (var cspell of clas.spells){
				//check if they already know this spell
				if (cspell.name===spell.name){
					found=true;
					break;
				}
			}
		}
		if (!found){
			result.push(spell);
		}
	}
	return result;
}

function highestSpellLevel(char){
	//find their highest caster level
	let highest=0;
	let value=0;
	for (let clas of char.classes){
		switch (clas.name){
			case "Wizard":
			case "Bard":
			case "Druid":
			case "Sorcerer":
			case "Cleric":
				value = (clas.level+1)/2;
				if (value>highest){
					highest=value;
				}
				break;
			case "Paladin":
			case "Ranger":
				value = ladder(clas.level,2,1,5,2,9,3,13,4,17,5);
				if (value>highest){
					highest=value;
				}
				break;
			case "Fighter":
			case "Rogue":
				value = ladder(clas.level,3,1,7,2,13,3,19,4);
				if (value>highest){
					highest=value;
				}
				break;
			case "Warlock":
				value=ladder(clas.level,0,0,1,1,3,2,5,3,7,4,9,5);
				if (value > highest){
					highest=value;
				}
				break;
		}
	}
	return highest;
}

/**
 * Based on which class the user picked ($scope.chosenClassName),
 * list all the spells they can currently learn from that class.
 */
function listLearnableSpells(char,$scope){
	return listLearnableSpellsForClass(char,$scope,$scope.chosenClassName);
}

/**
 * Based on which class the user picked ($scope.chosenClassName),
 * list all the spells they can currently learn from that class.
 */
function listLearnableSpellsForClass(char,$scope,className){
	let result=[];
	let spellcasting=[];
	let clas={};
	let extraSpells=[];
	for (var c of char.classes){
		if (c.name===className){
			clas=c;
			spellcasting=c.spellcasting;
			if (c.extraSpells){
				extraSpells=c.extraSpells; //to support stupid warlocks
			}
			break;
		}
	}
	//find the highest level they can cast on this class
	let highest=highestSpellLevel(char);
	nextSpell:
	for (var spell of window.spells){
		//check if they can learn a spell of this level (and exclude cantrips)
		if (spell.level>highest || spell.level===0){
			continue nextSpell;
		}
		//check that the spell belongs to this class
		let found=false;
		for (let spellclass of spell.classes){
			if (spellcasting.includes(spellclass)){
				found=true;
				break;
			}
		}
		if (!found){
			if (!extraSpells.includes(spell.name)){
				continue nextSpell;
			}
		}
		for (let s of clas.spells){
			if (s.name===spell.name){
				continue nextSpell;
			}
		}
		result.push(spell);
	}
	return result;
}


function getAttributesBelow20(char){
	var result=[];
	if (char.attributes.str<20){
		result.push({name:"+1 Strength"});
	}
	if (char.attributes.dex<20){
		result.push({name:"+1 Dexterity"});
	}
	if (char.attributes.con<20){
		result.push({name:"+1 Constitution"});
	}
	if (char.attributes.int<20){
		result.push({name:"+1 Intelligence"});
	}
	if (char.attributes.wis<20){
		result.push({name:"+1 Wisdom"});
	}
	if (char.attributes.cha<20){
		result.push({name:"+1 Charisma"});
	}
	return result;
}

function hasSpell(char,spellName){
	for (let clas of char.classes){
		for (let spell of clas.spells){
			if (spell.name===spellName){
				return true;
			}
		}
	}
	return false;
}

/**
 * 'spell' can either be the name of a spell, or a spell object.
 * If the player already has the spell on that class, this will not add another copy,
 * However, it will add the new spell's alwaysPrepared property.
 */
function addSpell(char,spell,forClass){
	var s=spell;
	if (typeof spell === 'string'){
		s = findSpell(spell);
		if (s){
			s=angular.copy(s);
		}
	}
	if (s){
		//these classes have every spell prepared all the time
		if (s.level===0
			|| forClass==='Bard'
			|| forClass==='Sorcerer'
			|| forClass==='Fighter'
			|| forClass==='Rogue'
			|| forClass==='Ranger'
			|| forClass==='Warlock'){
			s.alwaysPrepared=true;
		}
		if (s.alwaysPrepared){
			s.prepared=true;
		}
		for (let c of char.classes){
			if (c.name===forClass){
				//see if they have the spell already
				for (let classSpell of c.spells){
					if (classSpell.name===s.name){
						if (s.alwaysPrepared){
							classSpell.alwaysPrepared=true;
							classSpell.prepared=true;
						}
						return;
					}
				}
				c.spells.push(s);
				return;
			}
		}
		//if the player doesnt have this class yet, give them a level 0 version of it
		char.classes.push({
			name:forClass,
			level:0,
			subclass:null,
			spellcasting:[forClass],
			spells:[s]
		});
	}
}

function addAbility(char,name){
	let abil = findAbility(name);
	if (abil){
		char.abilities.push(angular.copy(abil));
	}
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
			result.push(feat);
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
	let count=0;
	for (let c of char.classes){
		if (!['SpecialInt','SpecialWis','SpecialCha'].includes(c.name)){
			count++;
		}
	}
	if (count===0){
		return 0;
	}
	return 1;
}

function hasPassive(char,passive){
	if (typeof passive === 'object'){
		passive=passive.name;
	}
	for (let p of char.passives){
		if (p.name===passive){
			return true;
		}
	}
	return false;
}

function addPassive(char,p){
	var passive=p;
	if (typeof p === 'string'){
		passive = findPassive(p);
	}
	if (passive){
		let pcopy = angular.copy(passive);
		char.passives.push(pcopy);
		if (typeof pcopy.onPickup === 'function'){
			pcopy.onPickup(char);
		}
	} else {
		console.error("Passive not found: "+p);
	}
}

function removePassive(char,name){
	for (let i=0;i<char.passives.length;i++){
		if (char.passives[i].name===name){
			char.passives.splice(i,1);
			return;
		}
	}
}

/**
 * For each pair of [threshold,result] integers in breakpoints,
 * return the first result that value is greater than or equal to.
 */
function ladder(value, ...breakpoints){
	let curr=0;
	for (let i=0;i<breakpoints.length;i+=2){
		if (value<breakpoints[i]){
			return curr;
		} else {
			curr=breakpoints[i+1];
		}
	}
	return curr;
}

function classLevel(char,classname){
	return getClassLevel(char,classname);
}

function getClassLevel(char,classname){
	for (let clas of char.classes){
		if (clas.name===classname){
			return clas.level;
		}
	}
	return 0;
}

//used for determining spell slots
function countCasterLevels(char){
	let sum=0;
	for (let clas of char.classes){
		switch (clas.name){
			case "Wizard":
			case "Bard":
			case "Druid":
			case "Sorcerer":
			case "Cleric":
				sum+=clas.level;break;
			case "Paladin":
			case "Ranger":
				sum+=(clas.level/2);break;
			case "Fighter":
			case "Rogue":
				sum+=(clas.level/3);break;
		}
	}
	return Math.floor(sum);
}

function spellSlots1(char){
	let casterLevel=countCasterLevels(char);
	let warlockSlots=ladder(classLevel(char,"Warlock"),0,0,1,1,2,2,3,0);
	if (casterLevel===0)return warlockSlots;
	return Math.min(casterLevel+1,4) + warlockSlots;
}

function spellSlots2(char){
	let casterLevel=countCasterLevels(char);
	let warlockSlots=ladder(classLevel(char,"Warlock"),0,0,3,2,5,0);
	if (casterLevel<3)return warlockSlots;
	if (casterLevel===3)return 2 + warlockSlots;
	return 4 + warlockSlots;
}

function spellSlots3(char){
	let casterLevel=countCasterLevels(char);
	let warlockSlots=ladder(classLevel(char,"Warlock"),0,0,5,2,7,0);
	if (casterLevel<5)return warlockSlots;
	if (casterLevel===5)return 2+warlockSlots;
	return 3+warlockSlots;
}

function spellSlots4(char){
	let casterLevel=countCasterLevels(char);
	let warlockSlots=ladder(classLevel(char,"Warlock"),0,0,7,2,9,0);
	if (casterLevel<7)return warlockSlots;
	if (casterLevel===7)return 1+warlockSlots;
	if (casterLevel===8)return 2+warlockSlots;
	return 3+warlockSlots;
}

function spellSlots5(char){
	let casterLevel=countCasterLevels(char);
	let warlockSlots=ladder(classLevel(char,"Warlock"),0,0,9,2,11,3,17,4);
	if (casterLevel<9)return warlockSlots;
	if (casterLevel===9)return 1+warlockSlots;
	if (casterLevel<18)return 2+warlockSlots;
	return 3+warlockSlots;
}

function spellSlots6(char){
	let casterLevel=countCasterLevels(char);
	if (casterLevel<11)return 0;
	if (casterLevel<19)return 1;
	return 2;
}

function spellSlots7(char){
	let casterLevel=countCasterLevels(char);
	if (casterLevel<13)return 0;
	if (casterLevel<20)return 1;
	return 2;
}

function spellSlots8(char){
	let casterLevel=countCasterLevels(char);
	if (casterLevel<15)return 0;
	return 1;
}

function spellSlots9(char){
	let casterLevel=countCasterLevels(char);
	if (casterLevel<17)return 0;
	return 1;
}

function randomSpell(level){
	let candidates=[];
	for (let spell of window.spells){
		if (spell.level===level){
			candidates.push(spell.name);
		}
	}
	return candidates[Math.rand(0,candidates.length)];
}

/*
 * Given a dice expression in the form (\d*)d(\d+)([+-]\d+)?, generate an object which contains:
 * sum: total roll
 * list: The individual die rolls.
 */
function roll(expression){
	var numDice=1;
	//remove whitespace
	expression=expression.replace(/\s/g,'');
	if (expression.indexOf('d')!=-1){
		numDice = parseInt(expression.substring(0,expression.indexOf('d')));
	}
	var min=1;
	var max=parseInt(expression.substring(expression.indexOf('d')+1));
	var sum=0;
	var list=[];
	for (let i=0;i<numDice;i++){
		let r = Math.floor(Math.random()*(max + 1 - min) + min);
		list.push(r);
		sum+=r;
	}
	return {
		sum:sum,
		list:list
	};
}