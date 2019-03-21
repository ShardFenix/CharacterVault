var app=angular.module('myApp',[]);

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
	skills:[],
	initiative:0,
	moveSpeed:30,
	ac:10,
	proficiency:2
}

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

$scope.chosenClass=null;
$scope.chosenLevel=null;
$scope.updateStep=-1;
$scope.currentChoices=null;
$scope.chosenClassName=null;

$scope.charBackup={}; //in case something in the js fails

$scope.revert=function(){
	$scope.char=$scope.charBackup;
}

$scope.levelUpStart=function(){
	$scope.charBackup=angular.copy($scope.char);
	//show class selection
	$scope.currentChoices=[];
	$scope.updateStep=-1;
	$scope.prompt="Choose a class";
	for (var i=0;i<packages.classes.length;i++){
		if (!(packages.classes[i].requirements) || packages.classes[i].requirements($scope.char)){
			$scope.currentChoices.push(packages.classes[i].classname);
		}
	}
};

var getCharacterClass=function(className){
	for (var i=0;i<$scope.char.classes.length;i++){
		if ($scope.char.classes[i].name==className){
			return $scope.char.classes[i];
		}
	}
	return null;
}

var findClass=function(name){
	for (var i=0;i<packages.classes.length;i++){
		if (packages.classes[i].classname==name){
			return packages.classes[i];
		}
	}
	return null;
}

var findSubclass=function(classname, subclass){
	for (var i=0;i<packages.subclasses.length;i++){
		if (packages.subclasses[i].classname==classname && packages.subclasses[i].subclass==subclass){
			return packages.subclasses[i];
		}
	}
	return null;
}

//return the next level the character is eligible to receive from the given class
var nextLevel=function(classname){
	for (var i=0;i<$scope.char.classes.length;i++){
		if ($scope.char.classes[i].name==classname){
			return 1 + $scope.char.classes[i].level;
		}
	}
	if ($scope.char.classes.length==0){
		return 0;
	}
	return 1;
}

var currentStep=function(){
	return $scope.chosenClass.levels[$scope.chosenLevel].updates[$scope.updateStep];
}

function finishLevelUp(){
	$scope.char.level++;
	if ($scope.chosenLevel>0){
		getCharacterClass($scope.chosenClassName).level=$scope.chosenLevel;
	}
	$scope.chosenClass=null;
	$scope.chosenLevel=null;
	$scope.updateStep=-1;
	$scope.currentChoices=null;
	$scope.chosenClassName=null;
	$scope.calculate();
}

var goToNextStep=function(){
	$scope.updateStep++;
	if ($scope.chosenClass.levels[$scope.chosenLevel].updates.length<=$scope.updateStep){
		//done with this levelup. See if we can apply a subclass level
		if ($scope.chosenClass.subclass){
			//this means we just finished applying a subclass level. Skip to end
			finishLevelUp();
			return;
		}
		var sc=getCharacterClass($scope.chosenClass.classname).subclass;
		if (sc){
			sc = findSubclass($scope.chosenClass.classname,sc);
			if (sc){
				$scope.updateStep=0;
				$scope.chosenClass=sc;
				$scope.currentChoices=null;
				setupForCurrentStep();
			}
		} else {
			//done with levelup
			finishLevelUp();
			return;
		}
	} else {
		setupForCurrentStep();
	}
}

var setupForCurrentStep=function(){
	var step = currentStep();
	if (step.choices.length>0){
		//setup choice selection
		//first, execute any functions that are in the choice array.
		//all choice functions take char and derived as arguments
		$scope.currentChoices=[];
		for (var i=0;i<step.choices.length;i++){
			if (step.choices[i] && typeof(step.choices[i]) === 'function'){
				var subArray = step.choices[i]($scope.char,$scope.derived,$scope.chosenClass);
				if (subArray){
					$scope.currentChoices=$scope.currentChoices.concat(subArray);
				}
			} else {
				$scope.currentChoices.push(step.choices[i]);
			}
		}
		//if, after all of this, there are no choices to make, send in something bogus
		if ($scope.currentChoices.length==0){
			step.action($scope.char,$scope.derived,null,$scope);
			goToNextStep();
		} else {
			$scope.prompt=step.choicePrompt;
		}
	} else {
		//just do the update
		step.action($scope.char,$scope.derived,null,$scope);
		goToNextStep();
	}
}

$scope.selectChoice=function(choice){
	$scope.currentChoices=null;
	if ($scope.chosenClass===null){
		//they chose a class
		$scope.chosenClassName=choice;
		$scope.chosenClass=findClass(choice);
		$scope.chosenLevel=nextLevel(choice);
		$scope.updateStep=0;
		//add the class entry on the character object
		if ($scope.chosenLevel==0){
			$scope.char.classes.push({
				name:$scope.chosenClass.classname,
				level:1,
				subclass:null,
				spells:{
					known:[],
					prepared:[],
					slotsMax:[],//each index is max number of available slots for that level
					slotsAvailable:[]
				}
			});
		} else {
		// update the existing class entry
			getCharacterClass($scope.chosenClass.classname).level+=1;
		}
		//setup the first update step
		setupForCurrentStep();
	} else {
		//they chose an option within a class package
		var step = currentStep();
		step.action($scope.char,$scope.derived,choice,$scope);
		goToNextStep();
	}
};
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
	
//calculate the derived stat values (bonuses, saving throws, skills, etc)
$scope.calculate=function(){
	if ($scope.char.level){
		//get highest class level. This determines proficiency
		var highest=0;
		for (var clas of $scope.char.classes){
			if (clas.level>highest){
				highest=clas.level;
			}
		}
		$scope.derived.proficiency=Math.floor((highest+7)/4);
	}
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
	
	$scope.derived.saves.str = $scope.derived.modifiers.str + $scope.char.saves.str*$scope.derived.proficiency;
	$scope.derived.saves.dex = $scope.derived.modifiers.dex + $scope.char.saves.dex*$scope.derived.proficiency;
	$scope.derived.saves.con = $scope.derived.modifiers.con + $scope.char.saves.con*$scope.derived.proficiency;
	$scope.derived.saves.int = $scope.derived.modifiers.int + $scope.char.saves.int*$scope.derived.proficiency;
	$scope.derived.saves.wis = $scope.derived.modifiers.wis + $scope.char.saves.wis*$scope.derived.proficiency;
	$scope.derived.saves.cha = $scope.derived.modifiers.cha + $scope.char.saves.cha*$scope.derived.proficiency;
	
	//find max charges of abilities that have a function for it
	for (var abil of $scope.char.abilities){
		if (abil.maxChargesFunction){
			abil.maxCharges=abil.maxChargesFunction($scope.char,$scope.derived,$scope);
		}
	}
	
	//passives can add to your derived stats
	for (var passive of $scope.char.passives){
		if (passive.apply){
			passive.apply($scope.char,$scope);
		}
	}
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

$scope.moveShortRest=function(from,to){
	for (var i=from.length-1;i>=0;i--) {
		if (from[i].shortRest){
			$scope.move(from[i],from,to);
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

/**
 * Try to find an ability with the given name in packages and return it.
 * Otherwise, return null.
 */
function findAbility(name){
	for (var abil of packages.abilities){
		if (abil.name===name){
			return abil;
		}
	}
	return null;
}

$scope.addAbility=function(newability){
	var abil = findAbility(newability.name);
	if (abil){
		abil=angular.copy(abil);
		if (abil.maxChargesFunction){
			abil.maxCharges=abil.maxChargesFunction($scope.char,$scope.derived);
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
			to.push({name:item.name,count:1,shortRest:item.shortRest,description:item.description});
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
			for (p of packages.passives){
				if (p.name===passive.name){
					passive.onShortRest=p.onShortRest;
					passive.onLongRest=p.onLongRest;
					passive.apply=p.apply;
				}
			}
		}
		for (passive of $scope.char.abilities){
			for (p of packages.passives){
				if (p.name===passive.name){
					passive.onShortRest=p.onShortRest;
					passive.onLongRest=p.onLongRest;
					passive.apply=p.apply;
				}
			}
		}
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
