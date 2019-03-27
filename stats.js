var app=angular.module('myApp',['ngSanitize']);

app.directive('number', ['$parse', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelController) {

            ngModelController.$parsers.push(function(data) {
                return parseInt(data);
            });
            ngModelController.$formatters.push(function(data) {
                if (data) {
                    var model = $parse(attrs['ngModel']);
                    model.assign(scope, parseInt(data));
                }
                return parseInt(data);

            });
        }
    }
}]);

app.controller('MyController',['$scope','$timeout','$http','$interval',function($scope,$timeout,$http,$interval){

$scope.spellFilters={
	levels:[true,true,true,true,true,true,true,true,true,true,true],
	includeClass:[true,true,true,true,true,true,true,true],
	excludeClass:[false,false,false,false,false,false,false,false]
}

$scope.showSaveMenu=true;

$scope.char={
	maxHp:0,
	hp:0,
	level:0, //total level
	money:0,
	classes:[],
	//multipliers for save proficiencies
	saves:{
		str:0,dex:0,con:0,wis:0,int:0,cha:0
	},
	attributes:{
		str:10,dex:10,con:10,wis:10,int:10,cha:10
	},
	skills:[],
	passives:[],
	abilities:[],
	proficiencies:[],
	inventory:[]
};

$scope.derived={
	modifiers:{
		str:0,dex:0,con:0,int:0,wis:0,cha:0
	},
	saves:{
		str:0,dex:0,con:0,int:0,wis:0,cha:0
	},
	maxHp:0,//con modifier and some feats/passives may increase this
	skills:[],
	initiative:0,
	moveSpeed:30,
	ac:10,
	proficiency:2
}

//load all spell slot abilities onto new characters
addAbility($scope.char,"Lv 1 Spell");
addAbility($scope.char,"Lv 2 Spell");
addAbility($scope.char,"Lv 3 Spell");
addAbility($scope.char,"Lv 4 Spell");
addAbility($scope.char,"Lv 5 Spell");
addAbility($scope.char,"Lv 6 Spell");
addAbility($scope.char,"Lv 7 Spell");
addAbility($scope.char,"Lv 8 Spell");
addAbility($scope.char,"Lv 9 Spell");

//debug: give this character every skill
for (var i=0;i<window.skills.length;i++){
	var found=false;
	for (var j=0;j<$scope.char.skills.length;j++){
		if ($scope.char.skills[j].name===window.skills[i].name){
			found=true;
			break;
		}
	}
	if (!found){
		$scope.char.skills.push({
			name:window.skills[i].name,
			mult:0,
			attribute:window.skills[i].attribute
		});
	found=false;
	}
}

/**********************************
Package handler
**********************************/
var packages={
	classes:window.classes,
	feats:window.feats,
	spells:window.spells,
	races:window.races,
	subclasses:window.subclasses,
	abilities:window.abilities,
	passives:window.passives
};

$scope.inSubclass=false;
$scope.chosenLevel=null;
$scope.updateStep=-1;
$scope.currentChoices=null;
$scope.currentPackage=null;
$scope.chosenClassName=null;

$scope.choiceQueue=[]; //used for choices that are made outside of a levelup (like subfeats)

$scope.charBackup={}; //in case something in the js fails

$scope.revert=function(){
	$scope.char=$scope.charBackup;
}

$scope.levelUpStart=function(){
	if ($scope.currentChoices && $scope.currentChoices.length>0){
		return;
	}
	$scope.char.level++;
	$scope.charBackup=angular.copy($scope.char);
	//show class selection
	$scope.currentChoices=[];
	$scope.updateStep=-1;
	$scope.prompt="Choose a Class";
	for (var i=0;i<packages.classes.length;i++){
		if (!(packages.classes[i].requirement) || packages.classes[i].requirement($scope.char)){
			$scope.currentChoices.push(packages.classes[i]);
		}
	}
};

function checkChoiceQueue(){
	if ($scope.choiceQueue.length>0){
		$scope.currentChoices=[];
		let step=$scope.choiceQueue[0];
		for (var i=0;i<step.choices.length;i++){
			if (step.choices[i] && typeof(step.choices[i]) === 'function'){
				var subArray = step.choices[i]($scope.char,$scope);
				if (subArray){
					$scope.currentChoices=$scope.currentChoices.concat(subArray);
				}
			} else {
				$scope.currentChoices.push(step.choices[i]);
			}
		}
		$scope.currentStep=$scope.choiceQueue[0];
		$scope.choiceQueue.splice(0,1);
		return true;
	}
	return false;
}

function finishLevelUp(){
	if ($scope.chosenLevel>0){
		getCharacterClass($scope.char,$scope.chosenClassName).level=$scope.chosenLevel;
	}
	$scope.inSubclass=false;
	$scope.chosenLevel=null;
	$scope.updateStep=-1;
	$scope.currentChoices=null;
	$scope.chosenClassName=null;
	$scope.currentPackage=0;
	$scope.currentStep=null;
	if (!checkChoiceQueue()){
		$scope.calculate();
	}
}

/**
 * Bu this time, it is assumed that $scope.currentChoice has been set to
 * an array of updates.
 */
var setupForCurrentStep=function(){
	$scope.currentStep=$scope.currentPackage[$scope.updateStep];
	if ($scope.currentStep.choices.length>0){
		//setup choice selection
		//first, execute any functions that are in the choice array.
		//all choice functions take char and derived as arguments
		$scope.currentChoices=[];
		for (var i=0;i<$scope.currentStep.choices.length;i++){
			if ($scope.currentStep.choices[i] && typeof($scope.currentStep.choices[i]) === 'function'){
				var subArray = $scope.currentStep.choices[i]($scope.char,$scope);
				if (subArray){
					$scope.currentChoices=$scope.currentChoices.concat(subArray);
				}
			} else {
				$scope.currentChoices.push($scope.currentStep.choices[i]);
			}
		}
		//if, after all of this, there are no choices to make, send in something bogus
		if ($scope.currentChoices.length==0){
			$scope.selectChoice('');
		} else {
			$scope.prompt=$scope.currentStep.choicePrompt;
		}
	} else {
		//just do the update
		$scope.selectChoice('');
	}
}

$scope.selectChoice=function(choice){
	$scope.currentChoices=null;
	if (choice.levels){
		//they chose a class or subclass
		if (choice.subclass){
			//they chose a subclass
			$scope.inSubclass=true;
			$scope.updateStep=0;
			$scope.currentPackage=choice.levels[$scope.chosenLevel].updates;
			//add subclass to character
			getCharacterClass($scope.char,choice.classname).subclass=choice.name;
			$scope.currentPackage=choice.levels[$scope.chosenLevel].updates;
			setupForCurrentStep();
			return;
		} else {
			//they chose a class
			$scope.chosenLevel=nextLevel($scope.char,choice.name);
			$scope.chosenClassName=choice.name;
			$scope.updateStep=0;
			//add the class entry on the character object
			if ($scope.chosenLevel==0){
				$scope.char.classes.push({
					name:$scope.chosenClassName,
					level:1,
					subclass:null,
					spells:[]
				});
			} else {
				// update the existing class entry
				getCharacterClass($scope.char,$scope.chosenClassName).level+=1;
			}
			$scope.currentPackage=choice.levels[$scope.chosenLevel].updates;
			setupForCurrentStep();
			return;
		} 
	} else if ($scope.currentPackage) {
		//they chose a step inside a package
		if (choice.name){
			choice=choice.name;
		}
		$scope.currentStep.action($scope.char,$scope.derived,choice,$scope);
		$scope.updateStep+=1;
		if ($scope.currentPackage.length<=$scope.updateStep){
			//see if we need to start doing the subclass
			if ($scope.inSubclass){
				finishLevelUp();
				return;
			} else {
				//start leveling up their subclass
				$scope.inSubclass=true;
				let sc=getCharacterClass($scope.char,$scope.chosenClassName).subclass;
				if (sc){
					sc = findSubclass($scope.chosenClassName,sc);
					if (sc){
						$scope.updateStep=0;
						$scope.currentPackage=null;
						if (sc.levels.length>$scope.chosenLevel){
							$scope.currentPackage=sc.levels[$scope.chosenLevel].updates;
							if ($scope.currentPackage && $scope.currentPackage.length>$scope.updateStep){
								setupForCurrentStep();
								return;
							}
						}
					}
				}
				//done with levelup
				finishLevelUp();
				return;
			}
		} else {
			$scope.currentStep=$scope.currentPackage[$scope.updateStep];
			setupForCurrentStep();
			return;
		}
	} else {
		//they chose something outside of a class/subclass package
		if (choice.name){
			choice=choice.name;
		}
		$scope.currentStep.action($scope.char,$scope.derived,choice,$scope);
		$scope.currentStep=null;
		if (!checkChoiceQueue()){
			$scope.calculate();
		}
	}
}

$scope.newChar=function(){
	$scope.showSaveMenu=false;
	let choices=[];
	for (let race of window.races){
		choices.push(race);
	}
	$scope.currentStep={
		choicePrompt:"Choose a Race",
		choices:choices,
		action:function(char,derived,choice,scope){
			for (let race of window.races){
				if (race.name===choice){
					if (race.onPickup){
						race.onPickup(char,scope);
					}
					checkChoiceQueue();
					return;
				}
			}
		}
	};
	$scope.currentChoices=choices;
}
/**********************************
Done with package handler
**********************************/

$scope.newitem={};
$scope.newspell={};
$scope.newability={};
$scope.newpassive={};

$scope.tab='stats';
	
$scope.tooltip=null;

$scope.initiativeOrder=[];
$scope.newInitiative='';

$scope.addInitiative=function(){
	$scope.initiativeOrder.push($scope.newInitiative);
	$scope.newInitiative='';
}

$scope.initUp=function(item){
	var index=$scope.initiativeOrder.indexOf(item);
	var newIndex=index-1;
	$scope.initiativeOrder.splice(index,1);
	if (newIndex<0){
		$scope.initiativeOrder.push(item);
	} else {
		$scope.initiativeOrder.splice(newIndex,0,item);
	}
}

$scope.deleteInit=function(item,event){
	var index=$scope.initiativeOrder.indexOf(item);
	$scope.initiativeOrder.splice(index,1);
}

$scope.spellLevelAvailable=function(level){
	//each index here corresponds to that spell level
	var available=[true,false,false,false,false,false,false,false,false,false];
	for (var i=0;i<$scope.char.stock.length;i++){
		var name=$scope.char.stock[i].name.toLowerCase();
		if (name.indexOf('spell')!=-1){
			var result=/(level|lvl|lv) ?(\d+) ?spell/g.exec(name);
			if (result && result.length>=2){
				var lev=parseInt(result[2]);
				if (lev>=level){
					return true;
				}
			}
		}
	}
	return false;
}

$scope.combatRelevant=function(item){
	if (item.name.indexOf('Bolt')!=-1 || item.name.indexOf('Arrow')!=-1 || item.name.indexOf('Bullet')!=-1) {
		return true;
	}
	//item name contains (number)d(number)
	if (/\d+d\d+/.test(item.name)){
		return true;
	}
	return false;
}

//should be in API, but needs access to scope
function classLevel(className){
	for (let clas of $scope.char.classes){
		if (clas.name===className){
			return clas.level;
		}
	}
	return 0;
}
	
//calculate the derived stat values (bonuses, saving throws, skills, etc)
$scope.calculate=function(){
	let oldMaxHp=$scope.derived.maxHp;
	$scope.derived.proficiency=Math.floor(($scope.char.level+7)/4);
	if (!Number.isNaN(parseInt($scope.char.attributes.str))){
		$scope.derived.modifiers.str = Math.floor(parseInt($scope.char.attributes.str)/2)-5;
	}
	if (!Number.isNaN(parseInt($scope.char.attributes.dex))){
		$scope.derived.modifiers.dex = Math.floor(parseInt($scope.char.attributes.dex)/2)-5;
	}
	if (!Number.isNaN(parseInt($scope.char.attributes.con))){
		$scope.derived.modifiers.con = Math.floor(parseInt($scope.char.attributes.con)/2)-5;
	}
	if (!Number.isNaN(parseInt($scope.char.attributes.int))){
		$scope.derived.modifiers.int = Math.floor(parseInt($scope.char.attributes.int)/2)-5;
	}
	if (!Number.isNaN(parseInt($scope.char.attributes.wis))){
		$scope.derived.modifiers.wis = Math.floor(parseInt($scope.char.attributes.wis)/2)-5;
	}
	if (!Number.isNaN(parseInt($scope.char.attributes.cha))){
		$scope.derived.modifiers.cha = Math.floor(parseInt($scope.char.attributes.cha)/2)-5;
	}
	//skill bonus calculation
	$scope.derived.skills=[];
	for (var skill of $scope.char.skills){
		var s={name:skill.name,mult:skill.mult,bonus:0};
		s.bonus=$scope.derived.modifiers[skill.attribute]
					+ skill.mult*$scope.derived.proficiency;
		$scope.derived.skills.push(s);
	}
	
	$scope.derived.initiative=$scope.derived.modifiers.dex;
	$scope.derived.maxHp=$scope.char.maxHp + ($scope.derived.modifiers.con * $scope.char.level);
	 
	$scope.derived.saves.str = $scope.derived.modifiers.str + $scope.char.saves.str*$scope.derived.proficiency;
	$scope.derived.saves.dex = $scope.derived.modifiers.dex + $scope.char.saves.dex*$scope.derived.proficiency;
	$scope.derived.saves.con = $scope.derived.modifiers.con + $scope.char.saves.con*$scope.derived.proficiency;
	$scope.derived.saves.int = $scope.derived.modifiers.int + $scope.char.saves.int*$scope.derived.proficiency;
	$scope.derived.saves.wis = $scope.derived.modifiers.wis + $scope.char.saves.wis*$scope.derived.proficiency;
	$scope.derived.saves.cha = $scope.derived.modifiers.cha + $scope.char.saves.cha*$scope.derived.proficiency;
	
	//find max charges of abilities that have a function for it
	for (var abil of $scope.char.abilities){
		if (abil.maxChargesFunction){
			abil.maxCharges=abil.maxChargesFunction($scope.char,$scope);
		}
	}
	
	//passives can add to your derived stats
	for (var passive of $scope.char.passives){
		if (passive.apply){
			passive.apply($scope.char,$scope);
		}
	}
	let hpDiff = $scope.derived.maxHp-oldMaxHp;
	$scope.char.hp+=hpDiff;
}

$scope.incrCopper=function(){
	$scope.char.money+=1;
}
$scope.incrSilver=function(){
	$scope.char.money+=10;
}
$scope.incrGold=function(){
	$scope.char.money+=100;
}

$scope.decrCopper=function(){
	$scope.char.money-=1;
}
$scope.decrSilver=function(){
	$scope.char.money-=10;
}
$scope.decrGold=function(){
	$scope.char.money-=100;
}
$scope.getCopper=function(){
	return $scope.char.money%10;
}
$scope.getSilver=function(){
	return Math.floor(($scope.char.money%100)/10);
}
$scope.getGold=function(){
	return Math.floor(($scope.char.money%1000)/100);
}
$scope.getPlatinum=function(){
	return Math.floor($scope.char.money/1000);
}

$scope.unequip=function(item){
	delete item.equipped;
}

$scope.increment=function(item){
	item.count++;
	event.stopPropagation();
	event.preventDefault();
}

$scope.moveAll=function(from,to){
	while (from.length>0) {
		$scope.move(from[0],from,to);
	}
}

$scope.shortRest=function(){
	for (let abil of $scope.char.abilities) {
		if (typeof abil.onShortRest === 'function'){
			abil.onShortRest($scope.char,$scope);
		}
	}
}

$scope.longRest=function(){
	$scope.shortRest();
	for (let abil of $scope.char.abilities) {
		if (typeof abil.onLongRest === 'function'){
			abil.onLongRest($scope.char,$scope);
		}
	}
}

$scope.delete=function(item,from,event){
	for (var i=0;i<from.length;i++){
		if (from[i].name==item.name){
			if (from[i].count) {
				from[i].count--;
				if (from[i].count==0){
					from.splice(i,1);
				}
			}
			else {
				from.splice(i,1);
			}
			event.stopPropagation();
			event.preventDefault();
			return false;
		}
	}
	return true;
}
	
$scope.checkForAbilities=function(name){
	for (var abil of packages.abilities){
		if (abil.name===name){
			$scope.newability.description=abil.description;
			return;
		}
	}
}

$scope.checkForPassives=function(name){
	for (var p of packages.passives){
		if (p.name===name){
			$scope.newpassive.description=p.description;
			return;
		}
	}
}

$scope.addAbility=function(newability){
	var abil = findAbility(newability.name);
	if (abil){
		abil=angular.copy(abil);
		if (abil.maxChargesFunction){
			abil.maxCharges=abil.maxChargesFunction($scope.char,$scope);
		}
		abil.charges=0;
		$scope.char.abilities.push(abil);
	} else {
		abil={
			name:newability.name,
			maxCharges:newability.maxCharges,
			charges:0,
			description: newability.description
		};
		$scope.char.abilities.push(abil);
	}
	$scope.newability={name:'',description:'',maxCharges:0};
}

$scope.addPassive=function(newpassive){
	var abil = findPassive(newpassive.name);
	if (abil){
		abil=angular.copy(abil);
		$scope.char.passives.upush(abil);
	} else {
		$scope.char.passives.push(angular.copy(newpassive));
	}
	$scope.newpassive={name:'',description:''};
	$scope.calculate();
}

$scope.addCharge=function(abil){
	abil.charges=Math.min(abil.maxCharges,abil.charges+1);
}

$scope.move=function(item,from,to){
	var found=false;
	if (to){
		for (var i=0;i<to.length;i++){
			if (to[i].name==item.name){
				to[i].count++;
				found=true;
				break;
			}
		}
		if (!found){
			to.push({name:item.name,count:1,description:item.description});
		}
	}
	item.count--;
	if (item.count==0){
		for (var j=0;j<from.length;j++){
			if (from[j].name==item.name){
				from.splice(j,1);
				return;
			}
		}
	}
}

$scope.add=function(item,to){
	var n = parseInt(item.count);
	if (!n){
		n=1;
	}
	for (var i=0;i<to.length;i++){
		if (to[i].name==item.name){
			to[i].count+=n;
			return;
		}
	}
	item.count=n;
	to.push(angular.copy(item));
}

$scope.saveId=-1;
$scope.saveList=[];

$scope.rawSpellPreview=function(spell){
	if (!spell || $scope.chosenspell){
		return;
	}
	var desc = spell.description;
	var token=desc.indexOf('${');
	while (token!=-1){
		var endtoken=desc.indexOf("}");
		var expression = desc.substring(token+2,endtoken);
		expression=expression.replace(/slevel/mg,""+spell.level);
		expression=eval(expression);
		desc=desc.substring(0,token)+expression+desc.substring(endtoken+1);
		token=desc.indexOf('${');
	}
	$scope.tooltip=desc;
}

$scope.endRawSpellPreview=function(){
	if ($scope.chosenspell){
		$scope.spellPreview($scope.chosenspell.level);
		return;
	}
	$scope.tooltip=null;
}

$scope.spellPreview=function(level){
	if (!($scope.chosenspell)){
		return;
	}
	if (level<$scope.chosenspell.level){
		$scope.tooltip=$scope.chosenspell.name+' can only be cast at level '+$scope.chosenspell.level+' or higher.';
		return;
	}
	var desc = $scope.chosenspell.description;
	var token=desc.indexOf('${');
	while (token!=-1){
		var endtoken=desc.indexOf("}");
		var expression = desc.substring(token+2,endtoken);
		expression=expression.replace(/slevel/mg,""+level);
		expression=expression.replace(/clevel/mg,""+$scope.char.level);
		expression=eval(expression);
		desc=desc.substring(0,token)+expression+desc.substring(endtoken+1);
		token=desc.indexOf('${');
	}
	$scope.tooltip=desc;
}

$scope.selectSpell=function(spell){
	$scope.chosenspell=spell;
	if (spell) {
		$scope.spellPreview(spell.level);
	} else {
		$scope.tooltip=null;
	}
}

$scope.highlightAbility=function(abil){
	if (abil && abil.description){
		var desc=abil.description;
		var token=desc.indexOf('${');
		while (token!=-1){
			var endtoken=desc.indexOf("}");
			var expression = desc.substring(token+2,endtoken);
			expression=expression.replace(/clevel/mg,""+$scope.char.level);
			expression=eval(expression);
			desc=desc.substring(0,token)+expression+desc.substring(endtoken+1);
			token=desc.indexOf('${');
		}
		$scope.tooltip=desc;
	}
}

$scope.showRef=function(item){
	document.getElementById('refDescription').innerHTML=item.description;
	$scope.spellRef=item;
}

var tipPromise=null;

$scope.clearTip=function(){
//	tipPromise=$timeout(function(){$scope.tip=null;},1000);
}

$scope.renewTip=function(){
	if (tipPromise){
		$timeout.cancel(tipPromise);
	}
}

$scope.setTip=function(choice){
	if (tipPromise){
		$timeout.cancel(tipPromise);
	}
	$scope.tip=choice;
}

$scope.save=function(){
	if (typeof(Storage) !== "undefined") {
		if ($scope.saveId==-1){
			$scope.saveId=$scope.saveList.length;
		}
		//remove functions from abilities and passives, since they cant be serialized
		//this has the side-effect that the prototype object gets its function deleted
		for (passive of $scope.char.passives){
			delete	passive.onShortRest;
			delete passive.onLongRest;
			delete passive.apply;
		}
		for (ability of $scope.char.abilities){
			delete	ability.onShortRest;
			delete ability.onLongRest;
			delete ability.apply;
			delete ability.maxChargesFunction;
		}
		localStorage.setItem("dnd"+$scope.saveId,JSON.stringify($scope.char));
		$scope.loadList();
	}
}

$scope.loadList=function(){
	$scope.saveList=[];
	if (typeof(Storage) !== "undefined") {
		for (var i=0;i<10;i++){
			var jsonString = localStorage.getItem("dnd"+i);
			if (jsonString){
				var lists = JSON.parse(jsonString);
				$scope.saveList.push({name:lists.name,saveId:i});
			}
		}
	}
}

$scope.load=function(num){
	if (typeof(Storage) !== "undefined" && (num || num==0)) {
		$scope.char = JSON.parse(localStorage.getItem("dnd"+num));
		$scope.saveId=num;
		//hook up passive and ability functions, since those can't be serialized
		for (passive of $scope.char.passives){
			let found=false;
			for (p of packages.passives){
				if (p.name===passive.name){
					passive.onShortRest=p.onShortRest;
					passive.onLongRest=p.onLongRest;
					passive.apply=p.apply;
					break;
					found=true;
				}
			}
			if (!found){
				for (p of packages.feats){
					if (p.name===passive.name){
						passive.onShortRest=p.onShortRest;
						passive.onLongRest=p.onLongRest;
						passive.apply=p.apply;
						break;
					}
				}
			}
		}
		for (passive of $scope.char.abilities){
			for (a of packages.passives){
				if (a.name===passive.name){
					passive.onShortRest=a.onShortRest;
					passive.onLongRest=a.onLongRest;
					passive.apply=a.apply;
					passive.maxChargesFunction=a.maxChargesFunction;
					break;
				}
			}
		}
		$scope.showSaveMenu=false;
		$scope.calculate();
	}
}

$scope.loadList();

$scope.spellList=window.spells;

$scope.classFilterInclude=function(num){
	var f = $scope.spellFilters;
	f.includeClass[num]=!f.includeClass[num];
	if (f.includeClass[num]){
		f.excludeClass[num]=false;
	}
	$scope.updateSpellFilter();
}

$scope.classFilterExclude=function(num){
	var f = $scope.spellFilters;
	f.excludeClass[num]=!f.excludeClass[num];
	if (f.excludeClass[num]){
		f.includeClass[num]=false;
	}
	$scope.updateSpellFilter();
}

$scope.updateSpellFilter=function(){
	//validate some of the filters
	$scope.filteredSpellList=[];
	var f=$scope.spellFilters;
	for (var i=0;i<$scope.spellList.length;i++){
		var s=$scope.spellList[i];
		if ($scope.spellFilters.levels[s.level]){
			if (   (f.excludeClass[0] && s.classes.includes('Bard'))
				|| (f.excludeClass[1] && s.classes.includes('Cleric'))
				|| (f.excludeClass[2] && s.classes.includes('Druid'))
				|| (f.excludeClass[3] && s.classes.includes('Paladin'))
				|| (f.excludeClass[4] && s.classes.includes('Ranger'))
				|| (f.excludeClass[5] && s.classes.includes('Sorcerer'))
				|| (f.excludeClass[6] && s.classes.includes('Warlock'))
				|| (f.excludeClass[7] && s.classes.includes('Wizard'))){
				continue;
			}
			if (   (f.includeClass[0] && s.classes.includes('Bard'))
			    || (f.includeClass[1] && s.classes.includes('Cleric'))
			    || (f.includeClass[2] && s.classes.includes('Druid'))
			    || (f.includeClass[3] && s.classes.includes('Paladin'))
			    || (f.includeClass[4] && s.classes.includes('Ranger'))
			    || (f.includeClass[5] && s.classes.includes('Sorcerer'))
			    || (f.includeClass[6] && s.classes.includes('Warlock'))
			    || (f.includeClass[7] && s.classes.includes('Wizard'))){
				$scope.filteredSpellList.push(s);
			}
		}
	}
}

$scope.calculate();
$scope.updateSpellFilter();


}]);
