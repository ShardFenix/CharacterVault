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

app.directive('characterStats',function(){
	return {templateUrl:'templates/characterStats.html'};
});
app.directive('characterStatsTablet',function(){
	return {templateUrl:'templates/characterStatsTablet.html'};
});
app.directive('characterAbilities',function(){
	return {templateUrl:'templates/characterAbilities.html'};
});
app.directive('characterAbilitiesTablet',function(){
	return {templateUrl:'templates/characterAbilitiesTablet.html'};
});
app.directive('sideTip',function(){
	return {templateUrl:'templates/sidetip.html'};
});
app.directive('creatureTip',function(){
	return {templateUrl:'templates/creaturetip.html'};
});

app.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.compile);
        },
        function(value) {
          element.html(value);
          $compile(element.contents())(scope);
        }
    );
  };
}]);

app.directive('dndEntry',['$sce','$compile',function($sce,$compile){
	return {
		restrict:"A",
		scope:{
			entry:"="
		},
		templateUrl:'templates/dndEntry.html',
		controller:function($scope,$element){
					
			if (typeof $scope.entry == 'string'){
				$scope.entry = {
					type:"",
					content:$scope.entry
				}
			}
			$scope.content=$scope.entry.content;
			
			//transform any placeholders into tooltip links
			if (typeof $scope.content == 'string') {
				var index = $scope.content.indexOf('${');
				while (index != -1) {
					let endIndex = $scope.content.indexOf('}',index);
					let code = $scope.content.substring(index+2,endIndex);
					//code is in the format ${linkType:entryName:description}
					let segments = code.split(':');
					let linkType = segments[0];
					let entryName = segments[1];
					let description = segments.length>=3?segments[2]:entryName;
					
					if (linkType=='creature'){
						$scope.content=$scope.content.write(index,endIndex,
							"<span class='tipLink' ng-click='addToInitiative(\""+entryName+"\")'"
							+" ng-mouseenter='setTip(\""+linkType+"\",\""+entryName+"\")'"
							+" ng-mouseleave='clearTip()'>"+description+"</span>"
						);
					} else {
						$scope.content=$scope.content.write(index,endIndex,
							"<span class='tipLink'"
							+" ng-mouseenter='setTip(\""+linkType+"\",\""+entryName+"\")'"
							+" ng-mouseleave='clearTip()'>"+description+"</span>"
						);
					}
					index=$scope.content.indexOf('${');
				}
				//$scope.content = $sce.trustAsHtml($scope.content);
			} else if ($scope.entry.type === 'list'){
				for (var i=0;i<$scope.content.length;i++){
					var index = $scope.content[i].indexOf('${');
					while (index != -1) {
						let endIndex = $scope.content[i].indexOf('}',index);
						let code = $scope.content[i].substring(index+2,endIndex);
						//code is in the format ${linkType:entryName:description}
						let segments = code.split(':');
						let linkType = segments[0];
						let entryName = segments[1];
						let description = segments.length>=3?segments[2]:entryName;
						
						if (linkType=='creature'){
							$scope.content[i]=$scope.content[i].write(index,endIndex,
								"<span class='tipLink' ng-click='addToInitiative(\""+entryName+"\")'"
								+" ng-mouseenter='setTip(\""+linkType+"\",\""+entryName+"\")'"
								+" ng-mouseleave='clearTip()'>"+description+"</span>"
							);
						} else {
							$scope.content[i]=$scope.content[i].write(index,endIndex,
								"<span class='tipLink'"
								+" ng-mouseenter='setTip(\""+linkType+"\",\""+entryName+"\")'"
								+" ng-mouseleave='clearTip()'>"+description+"</span>"
							);
						}
						index=$scope.content[i].indexOf('${');
					}
				}
			}
		},
		link:function(scope, element, attrs){
			
			scope.setTip=function(refType, entryName){
				var tip = null;
				switch (refType) {
					case 'creature': tip = window.creatures.find({name:entryName});break;
					case 'spell': tip = window.spells.find({name:entryName});break;
				}
				topScope.setLeftTip(tip);
			}
			scope.clearTip=function(){
				topScope.clearTip();
			}
			
		}
	}
}]);

////////////////////////////////////////////////////
// Turn string descriptions into arrays
function fixDescription(a){
	if (typeof a.description == 'string'){
		console.log("Fixing description for "+a.name);
		var temp = a.description.split(/[\r\n]+/gm);
		a.description = [];
		for (var s of temp){
			a.description.push({content:s});
		}
	}
}

for (var a of window.abilities){
	fixDescription(a);
}
for (var a of window.passives){
	fixDescription(a);
}
/*
for (var a of window.classes){
	fixDescription(a);
}
for (var a of window.subclasses){
	fixDescription(a);
}
*/
////////////////////////////////////////////////////

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
	polyHp:0,
	polyHpMax:0,
	tempHp:0,
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
	proficiency:2,
	preparations:0, //spell preparation slots
}

//cache the player's spells for the spell screen
$scope.knownSpells=[];
$scope.knownSpellLevelFilter=[true,true,true,true,true,true,true,true,true,true];
$scope.combatSpellLevelFilter=[true,true,true,true,true,true,true,true,true,true];

$scope.loadSpells=function(){
	$scope.knownSpells=[];
	for (let clas of $scope.char.classes){
		switch (clas.name){
			case "Cleric":
			case "Druid": clas.preparations = clas.level+$scope.derived.modifiers.wis; break;
			case "Paladin": clas.preparations = Math.floor(clas.level/2) + $scope.derived.modifiers.cha;break;
			case "Wizard": clas.preparations = clas.level+$scope.derived.modifiers.int; break;
		}
		clas.preparedSpells=0;
		for (let spell of clas.spells){
			let s = spell;
			s.casterClass=clas.name;
			switch (s.casterClass){
				case "Wizard":
				case "Rogue":
				case "Fighter":
				case "SpecialInt":
					s.attackBonus = $scope.derived.proficiency + $scope.derived.modifiers.int;
					break;
				case "Bard":
				case "Warlock":
				case "Sorcerer":
				case "Paladin":
				case "SpecialCha":
					s.attackBonus = $scope.derived.proficiency + $scope.derived.modifiers.cha;
					break;
				case "Barbarian":
				case "Druid":
				case "Cleric":
				case "Ranger":
				case "Monk":
				case "SpecialWis":
					s.attackBonus = $scope.derived.proficiency + $scope.derived.modifiers.wis;
					break;
			}
			s.saveDc = 8 + s.attackBonus;
			if (s.prepared && !s.alwaysPrepared){
				clas.preparedSpells++;
			}
			$scope.knownSpells.push(s);
		}
	}
}

$scope.clearPreparations=function(){
	for (let clas of $scope.char.classes){
		for (let spell of clas.spells){
			if (!spell.alwaysPrepared){
				spell.prepared=false;
			}
		}
	}
	$scope.loadSpells();
}

$scope.hoverSpellPrep=function(spell){
	if (spell){
		$scope.hoveredSpell=spell;
	} else {
		$scope.hoveredSpell=null;
	}
}

$scope.hasPreparations=function(){
	for (let clas of $scope.char.classes){
		if (clas.preparations && clas.preparations > 0){
			return true;
		}
	}
	return false;
}

$scope.classHasPreparedSpells = function(clas){
	if (clas.name.startsWith("Special")){
		return false;
	}
	return clas.preparations && clas.preparations>0;
}

addAbility($scope.char,"Lv 1 Spell");
addAbility($scope.char,"Lv 2 Spell");
addAbility($scope.char,"Lv 3 Spell");
addAbility($scope.char,"Lv 4 Spell");
addAbility($scope.char,"Lv 5 Spell");
addAbility($scope.char,"Lv 6 Spell");
addAbility($scope.char,"Lv 7 Spell");
addAbility($scope.char,"Lv 8 Spell");
addAbility($scope.char,"Lv 9 Spell");

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

$scope.getCharacterClass=getCharacterClass;

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
	if ($scope.char.level>=20){
		return;
	}
	if ($scope.currentChoices && $scope.currentChoices.length>0){
		return;
	}
	if ($scope.char.level>0){
		$scope.history[$scope.char.level]=angular.copy($scope.char);
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
	$scope.tipLeft=false;
	$scope.tipRight=true;
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
				if (typeof step.choices[i] === 'string'){
					$scope.currentChoices.push({name:step.choices[i]});
				} else {
					$scope.currentChoices.push(step.choices[i]);
				}
			}
		}
		$scope.currentStep=$scope.choiceQueue[0];
		$scope.prompt=$scope.currentStep.choicePrompt;
		$scope.choiceQueue.splice(0,1);
		//if no choices are available, skip this step
		if ($scope.currentChoices.length===0){
			return checkChoiceQueue();
		}
		return true;
	}
	return false;
}

function finishLevelUp(){
	if ($scope.chosenLevel>0){
		getCharacterClass($scope.char,$scope.chosenClassName).level=$scope.chosenLevel;
	}
	$scope.inSubclass=false;
	$scope.updateStep=-1;
	$scope.currentChoices=null;
	$scope.chosenClassName=null;
	$scope.currentPackage=0;
	$scope.currentStep=null;
	if (!checkChoiceQueue()){
		$scope.calculate();
	}
	if (tipPromise){
		$timeout.cancel(tipPromise);
	}
	$scope.tip=null;
	let tempChar = angular.copy($scope.char);
	$scope.chosenLevel=null;
	$scope.historyLevel=$scope.char.level;

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
					for (let i=0;i<subArray.length;i++){
						if (typeof subArray[i] === 'string'){
							subArray[i]={name:subArray[i]};
						}
					}
					$scope.currentChoices=$scope.currentChoices.concat(subArray);
				}
			} else {
				if ((typeof $scope.currentStep.choices[i] === 'string')
				 || (typeof $scope.currentStep.choices[i] === 'number')){
					$scope.currentChoices.push({name:$scope.currentStep.choices[i]});
				} else {
					$scope.currentChoices.push($scope.currentStep.choices[i]);
				}
			}
		}
		//if, after all of this, there are no choices to make, send in something bogus
		if ($scope.currentChoices.length===0){
			$scope.selectChoice('');
			nextStep();
		} else {
			$scope.prompt=$scope.currentStep.choicePrompt;
			//if it's informational, select all choices
			if ($scope.currentStep.always===true){
				for (let c of $scope.currentChoices){
					c.selected=true;
				}
				$scope.currentStep.limit=$scope.currentChoices.length;
			} else if ($scope.currentChoices.length===1 || $scope.currentStep.limit>=$scope.currentChoices.length){
				//there are less choices than the player is allowed to pick, so pick them all
				for (let c of $scope.currentChoices){
					c.selected=true;
				}
			}
		}
	} else {
		//just do the update
		$scope.selectChoice('');
		nextStep();
	}
}

$scope.toggleChoice=function(choice){
	//always allow deselection
	if (choice.selected){
		choice.selected=false;
		return;
	}
	let count=0;
	for (let c of $scope.currentChoices){
		if (c.selected){
			count++;
		}
	}
	//max amount selected
	let limit=1;
	if ($scope.currentStep && $scope.currentStep.limit){
		limit = $scope.currentStep.limit;
	}
	if (limit === 1){
		//unselect all choices
		for (let c of $scope.currentChoices){
			c.selected=false;
		}
		choice.selected=true;
		return;
	}
	if (limit === count){
		return;
	}
	choice.selected=true;
}

$scope.submitStep=function(){
	let doNextStepAfterThis=true;
	if ($scope.currentStep && $scope.currentStep.always===true){
		$scope.selectChoice("");
	} else {
		for (let choice of $scope.currentChoices){
			if (choice.selected){
				if (false == $scope.selectChoice(choice)){
					doNextStepAfterThis=false;
				}
			}
		}
	}
	if (checkChoiceQueue()){
		return false;
	}
	if (doNextStepAfterThis){
		$scope.currentChoices=null;
		$scope.calculate();
		nextStep();
	}
}

$scope.selectChoice=function(choice){
	if (choice.levels){
		//they chose a class or subclass
		if (choice.subclass){
			//they chose a subclass
			$scope.currentStep.action($scope.char,$scope.derived,choice,$scope);
		} else {
			//they chose a class
			$scope.chosenLevel=nextLevel($scope.char,choice.name);
			$scope.chosenClassName=choice.name;
			$scope.updateStep=0;
			//add the class entry on the character object
			if ($scope.chosenLevel===0 || ($scope.chosenLevel===1 && $scope.char.level>1)){
				$scope.char.classes.push({
					name:$scope.chosenClassName,
					level:1,
					subclass:null,
					spellcasting:[$scope.chosenClassName],
					spells:[]
				});
			} else {
				// update the existing class entry
				getCharacterClass($scope.char,$scope.chosenClassName).level+=1;
			}
			$scope.currentPackage=choice.levels[$scope.chosenLevel].updates;
			setupForCurrentStep();
			return false;
		} 
	} else if ($scope.currentPackage) {
		//they chose a step inside a package
		if (choice.name){
			choice=choice.name;
		}
		$scope.currentStep.action($scope.char,$scope.derived,choice,$scope);
	} else {
		//they chose something outside of a class/subclass package
		if (choice.name){
			choice=choice.name;
		}
		$scope.currentStep.action($scope.char,$scope.derived,choice,$scope);
	}
	return true;
}

function nextStep(){
	$scope.updateStep+=1;
	if ($scope.currentPackage && $scope.currentPackage.length<=$scope.updateStep){
		//see if we need to start doing the subclass
		if ($scope.inSubclass){
			finishLevelUp();
			return;
		} else {
			//start leveling up their subclass
			if ($scope.chosenLevel===0){
				$scope.chosenLevel=1;
			}
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
	} else if (!$scope.currentPackage) {
		//finished new character creation
		$scope.levelUpStart();
		return;
	} else {
		$scope.currentStep=$scope.currentPackage[$scope.updateStep];
		setupForCurrentStep();
		return;
	}
}

function resetChar(){
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
}

$scope.newChar=function(){
	
	resetChar();
	$scope.history=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
	
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
	
	addAbility($scope.char,"Lv 1 Spell");
	addAbility($scope.char,"Lv 2 Spell");
	addAbility($scope.char,"Lv 3 Spell");
	addAbility($scope.char,"Lv 4 Spell");
	addAbility($scope.char,"Lv 5 Spell");
	addAbility($scope.char,"Lv 6 Spell");
	addAbility($scope.char,"Lv 7 Spell");
	addAbility($scope.char,"Lv 8 Spell");
	addAbility($scope.char,"Lv 9 Spell");

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
						return;
					}
				}
			}
		}
	};
	$scope.currentChoices=choices;
	
	let bchoices=[];
	for (let bg of window.backgrounds){
		bchoices.push(bg);
	}
	
	$scope.choiceQueue.push({
		choicePrompt:"Choose a background",
		choices:bchoices,
		action:function(char,derived,choice){
			for (let bg of window.backgrounds){
				if (bg.name===choice){
					bg.onPickup(char,$scope);
				}
			}
		}
	});
}
/**********************************
Done with package handler
**********************************/

$scope.newitem={};
$scope.newspell={};
$scope.newability={};
$scope.newpassive={};

$scope.tab='stats';
$scope.subtab="spells";
	
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

$scope.checkItems=function(){
	if ($scope.item.name && $scope.item.name.length>2){
		for (let i of window.items){
			if (i.name===$scope.item.name){
				$scope.item=i;
				return;
			}
		}
	}
}

$scope.toggleSkillProf=function(skillName){
	for (let skill of $scope.char.skills){
		if (skill.name===skillName){
			skill.mult=(skill.mult+1)%3;
			$scope.calculate()
			return;
		}
	}
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
	
	$scope.calculateSharedResources();
	
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
$scope.incrPlat=function(){
	$scope.char.money+=1000;
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
$scope.decrPlat=function(){
	$scope.char.money-=1000;
}
$scope.getCopper=function(){
	return $scope.char.money%10;
}
$scope.getSilver=function(){
	return Math.floor(($scope.char.money%100)/10);
}
$scope.getGold=function(){
	return Math.floor($scope.char.money/100);
}
$scope.getPlatinum=function(){
	return Math.floor($scope.char.money/1000);
}
$scope.spendGold=function(){
	if ($scope.char.money > $scope.spendGoldInput*100){
		$scope.char.money -= $scope.spendGoldInput*100;
		$scope.spendGoldInput=null;
	}
}
$scope.takeDamage=function(damageAmount){
	if (damageAmount === undefined){
		damageAmount = $scope.takeDamageInput;
	}
	if (damageAmount < 0){
		//heal shape HP if they have any, otherwise heal health
		if ($scope.char.polyHp>0){
			let amount = Math.min($scope.char.polyHpMax-$scope.char.polyHp, -damageAmount);
			$scope.char.polyHp+=amount;
			damageAmount+=amount;
		}
		//apply the remainder to the regular HP
		let amount = Math.min($scope.derived.maxHp - $scope.char.hp, -damageAmount);
		$scope.char.hp+=amount;
		damageAmount = null;
		return;
	}
	//deplete from temp hp first
	if ($scope.char.tempHp >= damageAmount){
		$scope.char.tempHp -= damageAmount;
		damageAmount = 0;
	} else if ($scope.char.tempHp > 0){
		damageAmount -= $scope.char.tempHp;
		$scope.char.tempHp = 0;
	}
	//take damage to alternate forms (polymorph)
	if ($scope.char.polyHp >= damageAmount){
		$scope.char.polyHp -= damageAmount;
		damageAmount = 0;
	} else if ($scope.char.polyHp > 0){
		damageAmount -= $scope.char.polyHp;
		$scope.char.polyHp = 0;
	}
	$scope.char.hp -= damageAmount;
	damageAmount = null;
}
$scope.unequip=function(item){
	delete item.equipped;
}

$scope.increment=function(item){
	item.count++;
	event.stopPropagation();
	event.preventDefault();
}

$scope.decrementCharges=function(item){
	if (item.resourceName){
		//some abilities share a resource, so we decrement them all
		for (let abil of $scope.char.abilities){
			if (abil.name===item.resourceName){
				abil.charges-=item.resourceCost?item.resourceCost:1;
				break;
			}
		}
	} else {
		item.charges-=1;
	}
	if (typeof item.onUse === 'function'){
		item.onUse($scope.char,$scope);
	}
	$scope.calculateSharedResources();
}

$scope.prepSpell=function(spell,event){
	if (spell.alwaysPrepared){
		return;
	}
	let clas = getCharacterClass($scope.char,spell.casterClass);
	if (spell.prepared){
		spell.prepared=false;
		clas.preparedSpells--;
	} else {
		if (clas.preparations > clas.preparedSpells){
			spell.prepared=true;
			clas.preparedSpells++;
		}
	}
	event.stopPropagation();
	event.preventDefault();
}

$scope.calculateSharedResources=function(){
	for (let item of $scope.char.abilities){
		if (item.resourceName){
			for (let abil of $scope.char.abilities){
				if (abil.name===item.resourceName){
					item.charges=Math.floor(abil.charges/item.resourceCost);
					break;
				}
			}
		}
	}
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
	$scope.calculateSharedResources();
}

$scope.longRest=function(){
	for (let abil of $scope.char.abilities) {
		if (typeof abil.onShortRest === 'function'){
			abil.onShortRest($scope.char,$scope);
		}
		if (typeof abil.onLongRest === 'function'){
			abil.onLongRest($scope.char,$scope);
		} else {
			//by default, all abilities get full charges on long rest.
			if (abil.maxCharges){
				abil.charges=abil.maxCharges;
			}
		}
	}
	$scope.char.hp=$scope.derived.maxHp;
	$scope.char.tempHp=0;
	$scope.char.polyHp=0;
	$scope.char.polyHpMax=0;
	$scope.calculateSharedResources();
}

$scope.highestSlot=function(){
	let highest=0;
	for (let abil of $scope.char.abilities){
		if (/Lv \d Spell/.test(abil.name)){
			if (abil.charges>0){
				let lv = parseInt(abil.name.charAt(3));
				if (lv>highest){
					highest=lv;
				}
			}
		}
	}
	return highest;
}

$scope.delete=function(item,from,event){
	for (var i=0;i<from.length;i++){
		if (from[i].name && item.name){
			if (from[i].name === item.name){
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
		} else {
			if (from[i]===item){
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

$scope.autocompleteSpell=function(name){
	let spell = findSpell(name);
	if (spell){
		$scope.newspell=angular.copy(spell);
	}
}

$scope.learnSpell=function(char,spell,forClass){
	addSpell(char,angular.copy(spell),forClass);
	$scope.loadSpells();
}

$scope.getCasterClasses=function(char){
	let result=[];
	for (let c of char.classes){
		if (c.spellcasting){
			for (let s of c.spellcasting){
				result.upush(s);
			}
		}
	}
	return result;
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
	$scope.calculateSharedResources();
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

$scope.selectSpell=function(spell){
	$scope.chosenSpell=spell;
	$scope.setTip(spell);
}

//takes an object with the description property, and replaces the placeholders in the content
$scope.evalTooltip=function(tip){
	if (!tip){return [];}
	if (Array.isArray(tip.description)){
		var result="";
		for (var section of tip.description){
			if (tip.level && $scope.chosenSpell && tip.level<$scope.chosenSpell.level){
				return $scope.chosenSpell.name+' can only be cast at level '+$scope.chosenSpell.level+' or higher.';
			}
			var desc=section.content;
			let token=desc.indexOf('${');
			while (token!=-1){
				let endtoken=desc.indexOf("}");
				let expression = desc.substring(token+2,endtoken);
				expression=expression.replace(/clevel/mg,$scope.char.level);
				if ($scope.spellLevel){
					expression=expression.replace(/slevel/mg,$scope.spellLevel);
				} else {
					expression=expression.replace(/slevel/mg,tip.level?tip.level:0);
				}
				expression=eval(expression);
				desc=desc.substring(0,token)+expression+desc.substring(endtoken+1);
				token=desc.indexOf('${');
			}
			section.content=desc;
			result+="\n\n"+desc;
		}
		return result.substring(2);
	} else if (typeof tip.description == 'string'){
		if (tip.level && $scope.chosenSpell && tip.level<$scope.chosenSpell.level){
			return $scope.chosenSpell.name+' can only be cast at level '+$scope.chosenSpell.level+' or higher.';
		}
		var desc=""+tip.description;
		let token=desc.indexOf('${');
		while (token!=-1){
			let endtoken=desc.indexOf("}");
			let expression = desc.substring(token+2,endtoken);
			expression=expression.replace(/clevel/mg,$scope.char.level);
			if ($scope.spellLevel){
				expression=expression.replace(/slevel/mg,$scope.spellLevel);
			} else {
				expression=expression.replace(/slevel/mg,tip.level?tip.level:0);
			}
			expression=eval(expression);
			desc=desc.substring(0,token)+expression+desc.substring(endtoken+1);
			token=desc.indexOf('${');
		}
		return desc;
	}
}


$scope.combatRelevant=function(item){
	if ($scope.isWeapon(item)) {
		return true;
	}
	if (item.categories && item.categories.includes("Ammunition")){
		return true;
	}
	return false;
}

$scope.isWeapon=function(item){
	if (item && item.categories && item.categories.includes("Weapon")){
		return true;
	}
	return false;
}

$scope.attackBonus=function(item){
	if (!$scope.isWeapon(item)){
		return 0;
	}
	let total=0;
	//check if char has proficiency
	if (isProficientWith($scope.char,item)){
		total+=$scope.derived.proficiency;
	}
	//check whether str or dex should be used
	let canUseStr=false;
	let canUseDex=false;
	if (item.categories.includes("Melee")){
		canUseStr=true;
	}
	if (item.categories.includes("Ranged")){
		canUseDex=true;
		if (hasPassive($scope.char,"Archery")){
			total+=2;
		}
	}
	if (item.finesse){
		canUseDex=true;
	}
	//monk weapon and the player is a monk
	if (getClassLevel($scope.char,"Monk")>0 && item.heavy===false && !item.damage2 
		&& (item.proficiencies.includes("Shortswords") || (item.categories.includes("Simple") && item.categories.includes("Melee")))){
			canUseDex=true;
		}
	
	if (!canUseStr){
		total+=$scope.derived.modifiers.dex;
	} else if (!canUseDex){
		total+=$scope.derived.modifiers.str;
	} else {
		//both are usable. Use the highest one
		if ($scope.derived.modifiers.dex > $scope.derived.modifiers.str){
			total+=$scope.derived.modifiers.dex;
		} else {
			total+=$scope.derived.modifiers.str;
		}
	}
	if (item.enhancement){
		total+=item.enhancement;
	}
	return total;
}

var tipPromise=null;

$scope.clearTip=function(){
	tipPromise=$timeout($scope.clearTipNow,1000);
}

$scope.clearTipNow=function(){
	$scope.tip=null;
	$scope.spellLevel=null;
}

$scope.renewTip=function(){
	if (tipPromise){
		$timeout.cancel(tipPromise);
	}
}

$scope.setTip=function(choice,spellLevel,event){
	if (tipPromise){
		$timeout.cancel(tipPromise);
	}
	$scope.tip=angular.copy(choice);
	//$scope.tip.description = getDescription(choice);
	if (spellLevel){
		$scope.spellLevel=spellLevel;
	} else {
		$scope.spellLevel=null;
	}
	$scope.tipRight=true;
	$scope.tipLeft=false;
	if (event){
		event.stopPropagation();
	}
	$scope.evalTooltip($scope.tip);
}

$scope.setLeftTip=function(choice,spellLevel,event){
	$scope.setTip(choice,spellLevel,event);
	$scope.tipRight=false;
	$scope.tipLeft=true;
}

$scope.saveToVault=function(){
	let name=$scope.char.name;
	let jsonChar=JSON.stringify($scope.char);
	$http.post('http://localhost:8080/characters/' + name, jsonChar)
		.then(function(response){
			console.log("Saved character "+name);
			if ($scope.history){
				let jsonHist = JSON.stringify($scope.history);
				$http.post('http://localhost:8080/characters/'+name+'.history',jsonHist)
					.then(function(response){
						console.log("Saved history for "+name);
					});
			}
		},function(error){
			console.error(error);
		});
}

function prepForSave(char){
	//passives and abilities can be compressed by removing everything but their name and description.
	//We can restore them on load.
	for (let passive of char.passives){
		delete passive.onShortRest;
		delete passive.onLongRest;
		delete passive.apply;
	}
	for (let ability of char.abilities){
		delete ability.onShortRest;
		delete ability.onLongRest;
		delete ability.apply;
		delete ability.maxChargesFunction;
		delete ability.onUse;
	}
	//spell descriptions take up a lot of space.
	for (let clas of char.classes){
		for (let spell of clas.spells){
			if (!spell.edited){
				delete spell.description;
			}
		}
	}
}

$scope.save=function(){
	prepForSave($scope.char);
	$scope.history[$scope.char.level]=angular.copy($scope.char);
	if (serverVaultEnabled) {
		$scope.saveToVault();
	}
	loadList();
}

let serverVaultEnabled=false;

//check to see if a webserver is running
$http.get('http://localhost:8080/').then(function(resp){
	//if we're not viewing this at localhost, redirect to localhost.
	//This way we dont have to deal with xorigin nonsense.
	if (window.location.protocol==='file:'){
		let filename = window.location.pathname;
		filename = filename.substring(filename.lastIndexOf('/'));
		window.location.href = "http://localhost:8080"+filename;
		return;
	}
	serverVaultEnabled=true;
	resetChar();
	loadList();
},function(error){
	serverVaultEnabled=false;
	alert("Run server.bat, then refresh the page.");
});

function loadList(){
	$scope.saveList=[];
	if (serverVaultEnabled){
		$http.get('http://localhost:8080/characters').then(function(response){
			for (let filename of response.data){
				if (!filename.name.endsWith('.history')){
					$scope.saveList.push({name:filename.name,saveId:filename.name});
				}
			}
		},function(error){
			console.error("Error loading character list from vault.",error);
		});
	}
}

$scope.load=function(characterName){
	console.log("Loading "+characterName);
	if (serverVaultEnabled){
		$http.get('http://localhost:8080/characters/'+characterName).then(function(response){
			$scope.char=response.data;
			initLoadedCharacter($scope.char);
			//load history
			$http.get('http://localhost:8080/characters/'+characterName+".history").then(function(response2){
				$scope.history=response2.data;
							$scope.patch();

			},function(error){
				console.warn("Error loading history for "+characterName,error);
				$scope.history=[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
				$scope.history[$scope.char.level]=angular.copy($scope.char);
			});
		},function(error){
			console.error("Error loading character "+characterName+" from vault.",error);
		});
	}
}

$scope.loadFromLevelHistory=function(level){
	let currentLevel = $scope.char.level;
	if ($scope.history && $scope.history.length>level){
		if ($scope.history[level].level===level){
			//TODO: push current level into history if it's not there yet
			$scope.char=angular.copy($scope.history[level]);
			initLoadedCharacter($scope.char);
			return;
		}
	}
	$scope.historyLevel=currentLevel;
}

function initLoadedCharacter(char){
	//hook up passive and ability functions, since those can't be serialized
	for (let passive of char.passives){
		let found=false;
		let p = findPassive(passive.name);
		if (p){
			passive.onShortRest=p.onShortRest;
			passive.onLongRest=p.onLongRest;
			passive.apply=p.apply;
			if (!passive.edited){
				passive.description = p.description;
			}
			continue;
		}
		for (let p of packages.feats){
			if (p.name===passive.name){
				passive.onShortRest=p.onShortRest;
				passive.onLongRest=p.onLongRest;
				passive.apply=p.apply;
				if (!passive.edited){
					passive.description = p.description;
				}
				break;
			}
		}
	}
	for (let ability of char.abilities){
		let a = findAbility(ability.name);
		if (a){
			ability.onShortRest=a.onShortRest;
			ability.onLongRest=a.onLongRest;
			ability.apply=a.apply;
			ability.maxChargesFunction=a.maxChargesFunction;
			ability.onUse=a.onUse;
			if (!ability.edited){
				ability.description = a.description;
			}
		}
	}
	for (let clas of char.classes){
		for (let spell of clas.spells){
			if (spell.edited){
				continue;
			}
			let pSpell = findSpell(spell.name);
			if (pSpell){
				spell.description=pSpell.description;
			}
		}
	}
	$scope.showSaveMenu=false;
	//calculate breaks HP on loaded creatures
	let hp=char.hp;
	$scope.calculate();
	char.hp=hp;
	document.title=char.name+" - Character Sheet";
	$scope.historyLevel=$scope.char.level;
}

loadList();

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

$scope.att=function(creature,attribute){
	let total = Math.floor((creature.attributes[attribute]+20)/2)-15;
	if (total>=0){total="+"+total;}
	return creature.attributes[attribute]+" ("+total+")";
}

$scope.saveBonus=function(creature,attribute){
	let total = Math.floor((creature.attributes[attribute]+20)/2)-15;
	if (creature.saves && creature.saves[attribute]){
		total=creature.saves[attribute];
	}
	if (total>0){
		return "+"+total;
	}
	return total;
}


$scope.calculate();
$scope.updateSpellFilter();

$scope.creatures=window.creatures;

$scope.cFilter={};

$scope.creatureFilter=function(value,index,array){
	if ($scope.cFilter.name && !value.name.toLowerCase().includes($scope.cFilter.name.toLowerCase())){
		return false;
	}
	if ($scope.cFilter.cr && value.cr !== $scope.cFilter.cr){
		return false;
	}
	return true;
}

$scope.historyStyle=function(){
	let perc=100*($scope.historyLevel-1)/19;
	return {"background": "linear-gradient(90deg, #bb0000, #bb0000 "+perc+"%, #e0e0e0 "+perc+"%, #e0e0e0)"};
}

function findBackgroundFeature(name){
	for (let b of window.backgrounds){
		if (b.featureName === name){
			return {name:b.featureName,description:b.featureDescription};
		}
	}
	return undefined;
}

$scope.directEval=function(string){
	var char = $scope.char;
	try{
		eval(string);
		$scope.runscript="Success.";
	}catch (error){
		$scope.runscript=error;
	}
}

//used when I need to retro give abilities/passives/equipment to a character
$scope.patch=function(){
	for (let i=1;i<=20;i++){
		if ($scope.history[i]){
			for (let passive of $scope.history[i].passives){
				fixDescription(passive);
				let p = findPassive(passive.name);
				if (!p){
					//all backgrounds should be hidden on the dm screen
					p = findBackgroundFeature(passive.name);
					if (!p){
						p = window.feats.find({name:passive.name});
					} else {
						p.dmHide=true;
					}
					if (!p){
						console.error("Couldn't find passive "+passive.name);
					}
				}
				if (p && p.dmHide){
					passive.dmHide=p.dmHide;
					//console.log("Added dmHide to history["+i+"]"+passive.name);
				}
			}
		}
	}
	for (let passive of $scope.char.passives){
		fixDescription(passive);
		let p = findPassive(passive.name);
		if (!p){
			//all backgrounds should be hidden on the dm screen
			p = findBackgroundFeature(passive.name);
			if (!p){
				p = window.feats.find({name:passive.name});
			} else {
				p.dmHide=true;
			}
			if (!p){
				console.error("Couldn't find passive "+passive.name);
			}
		}
		if (p && p.dmHide){
			passive.dmHide=p.dmHide;
			//console.log("Added dmHide to char."+passive.name);
		}
	}
	
	for (let ability of $scope.char.abilities){
		fixDescription(ability);
	}
}

}]);
