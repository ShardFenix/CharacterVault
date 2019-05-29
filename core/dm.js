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
$scope.players=[];

$scope.loot=[];

$scope.addPlayer=function(player){
	if (player){
		$scope.players.push(angular.copy(player));
		
		return;
	} else {
		let p = {
			name:"",
			attributes:{
				str:10,
				dex:10,
				con:10,
				int:10,
				wis:10,
				cha:10
			},
			ac:12,
			saves:{
				str:0,
				dex:0,
				con:0,
				int:0,
				wis:0,
				cha:0
			},
			hp:9,
			hpMax:9,
			effects:[]
		};
	}
	$scope.players.push(p);
}

$scope.removePlayer=function(p){
	for (let i=0;i<$scope.players.length;i++){
		if ($scope.players[i]===p){
			$scope.players.splice(i,1);
			return;
		}
	}
}

$scope.dm={};

$scope.tab='general';
	
$scope.tooltip=null;

$scope.addToEncounter=function(monster){
	let m = angular.copy(monster);
	$scope.initiativeOrder.push(m);
	m.hpMax=m.hp;
}

$scope.rerollHp=function(monster){
	let params=monster.hpgen.match(/(\d+)d(\d+) ?\+? ?(\d*)/);
	let diceNum=parseInt(params[1]);
	let diceType=parseInt(params[2]);
	let bonus=parseInt(params[3]);
	let sum=0;
	if (bonus){
		sum=bonus;
	}
	for (let i=0;i<diceNum;i++){
		sum+=Math.floor(1 + Math.random()*diceType);
	}
	monster.hpMax=sum;
	monster.hp=sum;
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

$scope.damage=function(scope){
	if (scope.creature && scope.damageAmount){
		scope.creature.hp-=scope.damageAmount;
		scope.damageAmount=null;
	}
}

$scope.initiativeOrder=[];
$scope.newInitiative='';

$scope.addInitiative=function(){
	$scope.initiativeOrder.push($scope.newInitiative);
	$scope.newInitiative='';
}

$scope.chooseMonster=function(monster){
	if (monster){
		$scope.chosenMonster=monster;
	} else {
		$scope.chosenMonster=null;
	}
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
	$scope.calculateSharedResources();
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

$scope.evalTooltip=function(tip){
	if (tip && tip.description){
		let desc=tip.description;
		let token=desc.indexOf('${');
		while (token!=-1){
			let endtoken=desc.indexOf("}");
			let expression = desc.substring(token+2,endtoken);
			expression=eval(expression);
			desc=desc.substring(0,token)+expression+desc.substring(endtoken+1);
			token=desc.indexOf('${');
		}
		return desc;
	}
	return '';
}

var tipPromise=null;

$scope.clearTip=function(){
	tipPromise=$timeout(function(){$scope.tip=null;$scope.spellLevel=null;},1000);
}

$scope.renewTip=function(){
	if (tipPromise){
		$timeout.cancel(tipPromise);
	}
}

$scope.setTip=function(choice,spellLevel){
	if (tipPromise){
		$timeout.cancel(tipPromise);
	}
	$scope.tip=choice;
	if (spellLevel){
		$scope.spellLevel=spellLevel;
	} else {
		$scope.spellLevel=null;
	}
}

$scope.spellList=window.spells;
$scope.creatures=window.creatures;

//load player info into the creatures array if server is available
$http.get('http://localhost:8080/').then(function(resp){
	loadPlayerList();
},function(error){
	console.warn("Couldn't load player info from character vault. Start the server and refresh the page.");
});

function loadPlayerList(){
	$http.get('http://localhost:8080/characters').then(function(response){
		for (let filename of response.data){
			$http.get('http://localhost:8080/characters/'+filename).then(function(response){
				let char=response.data;
				prepCharacter(char);
				$scope.creatures.push(char);
			},function(error){
				console.error(error);
			});
		}
	},function(error){
		console.error("Error loading character vault.");
		console.error(error);
	});
}

function prepCharacter(char){
	let strBonus = Math.floor((char.attributes.str+20)/2)-15;
	let dexBonus = Math.floor((char.attributes.dex+20)/2)-15;
	let conBonus = Math.floor((char.attributes.con+20)/2)-15;
	let intBonus = Math.floor((char.attributes.int+20)/2)-15;
	let wisBonus = Math.floor((char.attributes.wis+20)/2)-15;
	let chaBonus = Math.floor((char.attributes.cha+20)/2)-15;
	
	let p=proficiency(char.level);
	
	char.saves.str = strBonus + p*char.saves.str;
	char.saves.dex = dexBonus + p*char.saves.dex;
	char.saves.con = conBonus + p*char.saves.con;
	char.saves.int = intBonus + p*char.saves.int;
	char.saves.wis = wisBonus + p*char.saves.wis;
	char.saves.cha = chaBonus + p*char.saves.cha;
	
	//delete char.passives;
	char.actions=char.abilities;
	for (let i=char.actions.length-1;i>=0;i--){
		if (/(Lv|Level) \d Spell/.test(char.actions[i].name)){
			char.actions.splice(i,1);
		}
	}
	//setup spells
	char.spellcasting={spells:[{spells:[]}]};
	let slots = spellSlots1(char);
	if (slots){char.spellcasting.spells.push({slots:slots,spells:[]});}
	slots = spellSlots2(char);
	if (slots){char.spellcasting.spells.push({slots:slots,spells:[]});}
	slots = spellSlots3(char);
	if (slots){char.spellcasting.spells.push({slots:slots,spells:[]});}
	slots = spellSlots4(char);
	if (slots){char.spellcasting.spells.push({slots:slots,spells:[]});}
	slots = spellSlots5(char);
	if (slots){char.spellcasting.spells.push({slots:slots,spells:[]});}
	slots = spellSlots6(char);
	if (slots){char.spellcasting.spells.push({slots:slots,spells:[]});}
	slots = spellSlots7(char);
	if (slots){char.spellcasting.spells.push({slots:slots,spells:[]});}
	slots = spellSlots8(char);
	if (slots){char.spellcasting.spells.push({slots:slots,spells:[]});}
	slots = spellSlots9(char);
	if (slots){char.spellcasting.spells.push({slots:slots,spells:[]});}

	
	for (let clas of char.classes){
		for (let spell of clas.spells){
			if (char.spellcasting.spells[spell.level]){
				char.spellcasting.spells[spell.level].spells.push(spell.name);
			}
		}
	}
	char.isPlayer=true;
	delete char.abilities;
	delete char.proficiencies;
}

function proficiency(level){
	return Math.ceil(level/4)+1;
}

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
