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
	name:'',
	stock:[],
	used:[],
	inventory:[],
	equipment:[],
	spells:[],
	passives:[],
	proficiencies:[],
	str:0,
	dex:0,
	con:0,
	int:0,
	wis:0,
	cha:0,
	maxhp:10,
	hp:10,
	hitdiceamount:1,
	hitdice:8,
	speed:30,
	copper:0,
	silver:0,
	gold:10,
	platinum:0,
	ac:10,
	proficiency:2,
	initiative:0,
	spelldc:13,
	spellatk:5,
	level:1,
	notes:'',
	saves:{str:0,dex:0,con:0,int:0,wis:0,cha:0},
	skillmults:{
		acrobatics:0,
		animalhandling:0,
		arcana:0,
		athletics:0,
		deception:0,
		history:0,
		insight:0,
		intimidation:0,
		investigation:0,
		medicine:0,
		nature:0,
		perception:0,
		performance:0,
		persuasion:0,
		religion:0,
		sleight:0,
		stealth:0,
		survival:0
	}
	};

$scope.newitem={};
$scope.newspell={};
$scope.newability={};
$scope.newpassive={};

$scope.tab='stats';

$scope.modifiers={};
$scope.skills={
		acrobatics:0,
		animalhandling:0,
		arcana:0,
		athletics:0,
		deception:0,
		history:0,
		insight:0,
		intimidation:0,
		investigation:0,
		medicine:0,
		nature:0,
		perception:0,
		performance:0,
		persuasion:0,
		religion:0,
		sleight:0,
		stealth:0,
		survival:0
	};
	
$scope.saves={
	str:0,dex:0,con:0,int:0,wis:0,cha:0
};
	
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
		$scope.char.proficiency=Math.floor((parseInt($scope.char.level)+7)/4);
	}
	if (!Number.isNaN(parseInt($scope.char.str))){
		$scope.modifiers.str=Math.floor(parseInt($scope.char.str)/2)-5;
	}
	if (!Number.isNaN(parseInt($scope.char.dex))){
		$scope.modifiers.dex=Math.floor(parseInt($scope.char.dex)/2)-5;
	}
	if (!Number.isNaN(parseInt($scope.char.con))){
		$scope.modifiers.con=Math.floor(parseInt($scope.char.con)/2)-5;
	}
	if (!Number.isNaN(parseInt($scope.char.int))){
		$scope.modifiers.int=Math.floor(parseInt($scope.char.int)/2)-5;
	}
	if (!Number.isNaN(parseInt($scope.char.wis))){
		$scope.modifiers.wis=Math.floor(parseInt($scope.char.wis)/2)-5;
	}
	if (!Number.isNaN(parseInt($scope.char.cha))){
		$scope.modifiers.cha=Math.floor(parseInt($scope.char.cha)/2)-5;
	}
	$scope.skills.acrobatics=$scope.modifiers.dex+$scope.char.skillmults.acrobatics*$scope.char.proficiency;
	$scope.skills.animalhandling=$scope.modifiers.wis+$scope.char.skillmults.animalhandling*$scope.char.proficiency;
	$scope.skills.arcana=$scope.modifiers.int+$scope.char.skillmults.arcana*$scope.char.proficiency;
	$scope.skills.athletics=$scope.modifiers.str+$scope.char.skillmults.athletics*$scope.char.proficiency;
	$scope.skills.deception=$scope.modifiers.cha+$scope.char.skillmults.deception*$scope.char.proficiency;
	$scope.skills.history=$scope.modifiers.int+$scope.char.skillmults.history*$scope.char.proficiency;
	$scope.skills.insight=$scope.modifiers.wis+$scope.char.skillmults.insight*$scope.char.proficiency;
	$scope.skills.intimidation=$scope.modifiers.cha+$scope.char.skillmults.intimidation*$scope.char.proficiency;
	$scope.skills.investigation=$scope.modifiers.int+$scope.char.skillmults.investigation*$scope.char.proficiency;
	$scope.skills.medicine=$scope.modifiers.wis+$scope.char.skillmults.medicine*$scope.char.proficiency;
	$scope.skills.nature=$scope.modifiers.int+$scope.char.skillmults.nature*$scope.char.proficiency;
	$scope.skills.perception=$scope.modifiers.wis+$scope.char.skillmults.perception*$scope.char.proficiency;
	$scope.skills.performance=$scope.modifiers.cha+$scope.char.skillmults.performance*$scope.char.proficiency;
	$scope.skills.persuasion=$scope.modifiers.cha+$scope.char.skillmults.persuasion*$scope.char.proficiency;
	$scope.skills.religion=$scope.modifiers.int+$scope.char.skillmults.religion*$scope.char.proficiency;
	$scope.skills.sleight=$scope.modifiers.dex+$scope.char.skillmults.sleight*$scope.char.proficiency;
	$scope.skills.stealth=$scope.modifiers.dex+$scope.char.skillmults.stealth*$scope.char.proficiency;
	$scope.skills.survival=$scope.modifiers.wis+$scope.char.skillmults.survival*$scope.char.proficiency;
	
	var jackofalltrades=false;
	for (var i=0;i<$scope.char.passives.length;i++){
		if ($scope.char.passives[i].name.toLowerCase()=='jack of all trades'){
			jackofalltrades=true;
			i=$scope.char.passives.length;
		}
	}
	if (jackofalltrades){
		if ($scope.char.skillmults.acrobatics===0)$scope.skills.acrobatics+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.animalhandling===0)$scope.skills.animalhandling+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.arcana===0)$scope.skills.arcana+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.athletics===0)$scope.skills.athletics+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.deception===0)$scope.skills.deception+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.history===0)$scope.skills.history+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.insight===0)$scope.skills.insight+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.intimidation===0)$scope.skills.intimidation+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.investigation===0)$scope.skills.investigation+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.medicine===0)$scope.skills.medicine+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.nature===0)$scope.skills.nature+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.perception===0)$scope.skills.perception+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.performance===0)$scope.skills.performance+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.persuasion===0)$scope.skills.persuasion+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.religion===0)$scope.skills.religion+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.sleight===0)$scope.skills.sleight+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.stealth===0)$scope.skills.stealth+=Math.floor($scope.char.proficiency/2);
		if ($scope.char.skillmults.survival===0)$scope.skills.survival+=Math.floor($scope.char.proficiency/2);
		$scope.char.initiative=$scope.modifiers.dex+Math.floor($scope.char.proficiency/2);
	} else {
		$scope.char.initiative=$scope.modifiers.dex;
	}
	
	$scope.saves.str=$scope.modifiers.str+$scope.char.saves.str*$scope.char.proficiency;
	$scope.saves.dex=$scope.modifiers.dex+$scope.char.saves.dex*$scope.char.proficiency;
	$scope.saves.con=$scope.modifiers.con+$scope.char.saves.con*$scope.char.proficiency;
	$scope.saves.int=$scope.modifiers.int+$scope.char.saves.int*$scope.char.proficiency;
	$scope.saves.wis=$scope.modifiers.wis+$scope.char.saves.wis*$scope.char.proficiency;
	$scope.saves.cha=$scope.modifiers.cha+$scope.char.saves.cha*$scope.char.proficiency;
}

$scope.incrCopper=function(){
	$scope.char.copper++;
	if ($scope.char.copper>=10){
		$scope.char.copper-=10;
		$scope.incrSilver();
	}
}
$scope.incrSilver=function(){
	$scope.char.silver++;
	if ($scope.char.silver>=10){
		$scope.char.silver-=10;
		$scope.incrGold();
	}
}
$scope.incrGold=function(){
	$scope.char.gold++;
	if ($scope.char.gold>=10){
		$scope.char.gold-=10;
		$scope.char.platinum++;
	}
}

$scope.decrCopper=function(){
	if ($scope.char.copper==0){
		if ($scope.decrSilver()){
			$scope.char.copper=9;
			return true;
		}
	} else {
		$scope.char.copper--;
		return true;
	}
	return false;
}
$scope.decrSilver=function(){
	if ($scope.char.silver==0){
		if ($scope.decrGold()){
			$scope.char.silver=9;
			return true;
		}
	} else {
		$scope.char.silver--;
		return true;
	}
	return false;
}
$scope.decrGold=function(){
	if ($scope.char.gold<=0){
		if ($scope.char.platinum>0){
			$scope.char.platinum--;
			$scope.char.gold=9;
			return true;
		}
	} else {
		$scope.char.gold--;
		return true;
	}
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

$scope.updateSpellFilter();

}]);
