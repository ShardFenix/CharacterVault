var app=angular.module('myApp',['ngSanitize']);

/**
 * Replaces the part of this string between (including) start and end with content
 */
String.prototype.write=function(start, end, content){
	return this.substring(0,start) + content + this.substring(end+1);
}

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
			
			$scope.content=$scope.entry.content;
			
			//transform any placeholders into tooltip links
			if (typeof $scope.content == 'string') {
				var index = $scope.content.indexOf('${');
				while (index != -1) {
					let endIndex = $scope.content.indexOf('}',index);
					console.log('replacement detected at '+index+"-"+endIndex);
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
			}
		},
		link:function(scope, element, attrs){
			
			scope.goToLink=scope.$parent.goToLink;
			
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
			
			scope.addToInitiative = function(entryName){
				var creature = window.creatures.find({name:entryName});
				if (creature){
					creature=angular.copy(creature);
					topScope.addToEncounter(creature);
				}
			}
			
			
			
		}
	}
}]);

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
app.directive('sideTip',function(){
	return {templateUrl:'templates/sidetip.html'};
});
app.directive('creatureTip',function(){
	return {
		templateUrl:'templates/creaturetip.html',
		scope:{
			creature:"=",
			editable:"=?"
		},
		link:function($scope){
			$scope.damage=function(scope){
				if (scope.creature && scope.damageAmount){
					scope.creature.hp-=scope.damageAmount;
					scope.damageAmount=null;
				}
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
		}
	};
});
app.directive('playerbox',function(){
	return {templateUrl:'templates/dmPlayerBox.html'};
});


app.controller('MyController',['$scope','$timeout','$http','$interval',function($scope,$timeout,$http,$interval){

$scope.spellFilters={
	levels:[true,true,true,true,true,true,true,true,true,true,true],
	includeClass:[true,true,true,true,true,true,true,true],
	excludeClass:[false,false,false,false,false,false,false,false]
}

window.topScope=$scope;

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
			
$scope.initiativeOrder=[];
$scope.newInitiative='';

$scope.addInitiative=function(){
	$scope.initiativeOrder.push({name:$scope.newInitiative});
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
	if (event.which===1){
		var newIndex=index-1;
		$scope.initiativeOrder.splice(index,1);
		if (newIndex<0){
			$scope.initiativeOrder.push(item);
			//this was the top creature. Decrement their conditions
			if (item.conditions){
				let queue = [];
				for (let i=item.conditions.length-1;i>=0;i--){
					item.conditions[i].duration-=1;
					if (item.conditions[i].duration===0){
						if (item.conditions[i].name === 'Hasted'){
							queue.push({name:"Stunned",duration:1});
						}
						item.conditions.splice(i,1);
					}
				}
				for (let cond of queue){
					item.conditions.push(cond);
				}
			}
			
		} else {
			$scope.initiativeOrder.splice(newIndex,0,item);
		}
	}
}

$scope.conditions = [
	{name:"Hasted",duration:10},
	{name:"Slowed",duration:10},
	{name:"Concentrating",duration:10},
	{name:"On Fire",duration:10},
	{name:"Blinded",duration:10},
	{name:"Deafened",duration:10},
	{name:"Frightened",duration:10},
	{name:"Stunned",duration:1},
	{name:"Paralyzed",duration:10},
	{name:"Bane",duration:10},
	{name:"Cursed",duration:10},
	{name:"Confused",duration:10},
	{name:"Invisible",duration:10},
	{name:"Restrained",duration:10}
];

$scope.rightClickInitiative=function(item,event){
	if (event.which===3) {
		//create context menu
		let elem = angular.element('#contextMenu');
		elem.attr("style","display:flex;left:"+(event.clientX+2)+"px;top:"+(event.clientY+2)+"px;");
		$scope.contextTarget=item;
		event.stopPropagation();
    }
}

$scope.dismissContextMenu=function(){
	angular.element('#contextMenu').attr("style","display:none;");
}

$scope.applyCondition=function(option){
	if (!$scope.contextTarget.conditions){
		$scope.contextTarget.conditions=[];
	}
	if ($scope.contextTarget.conditions.has(option)){
		$scope.contextTarget.conditions.remove(option);
	} else {
		$scope.contextTarget.conditions.upush(angular.copy(option));
	}
	$scope.dismissContextMenu();
}

$scope.focusConditionDuration=function(a,b){
	$('#initiativeDiv>div:nth-of-type('+(a+1)+')>div>input:nth-of-type('+(b+1)+')').focus();
}
$scope.unfocusConditionDuration=function(a,b){
	$('#initiativeDiv>div:nth-of-type('+(a+1)+')>div>input:nth-of-type('+(b+1)+')').blur();
}

$scope.incrDuration=function(item, condition, event){
	if (event.which === 107 || event.which === 187){ //plus
		condition.duration+=1;
	} else if (event.which === 109 || event.which === 189){ //minus
		condition.duration-=1;
		if (condition.duration===0){
			item.conditions.remove(condition);
		}
	}
	event.stopPropagation();
	event.preventDefault();
}

$scope.deleteInit=function(item,event){
	var index=$scope.initiativeOrder.indexOf(item);
	$scope.initiativeOrder.splice(index,1);
	event.stopPropagation();
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

function getDescription(desc){
	if (typeof desc === 'string'){
		return desc;
	} else if (Array.isArray(desc)){
		var temp = '';
		for (let d of desc){
			temp += getDescription(d);
		}
		return temp;
	} else if (typeof desc === 'object'){
		if (typeof desc.showWhen === 'function' && desc.showWhen($scope.char,$scope.derived,$scope)){
			return desc.value;
		}
	}
	return '';
}

$scope.evalTooltip=function(tip,owner){
	if (tip && tip.description){
		if (!owner){
			owner={level:1};
		}
		$scope.char=owner;
		let desc=getDescription(tip.description);
		let token=desc.indexOf('${');
		while (token!=-1){
			let endtoken=desc.indexOf("}");
			let expression = desc.substring(token+2,endtoken);
			expression=expression.replace(/clevel/mg,owner.level);
			expression=expression.replace(/slevel/mg,tip.level?tip.level:0);
			expression=eval(expression);
			desc=desc.substring(0,token)+expression+desc.substring(endtoken+1);
			token=desc.indexOf('${');
		}
		$scope.char=undefined;
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
	$scope.tipRight=true;
	$scope.tipLeft=false;
}

$scope.setLeftTip=function(choice,spellLevel){
	$scope.setTip(choice,spellLevel);
	$scope.tipRight=false;
	$scope.tipLeft=true;
}

$scope.spellTipLeft=function(choice,spellLevel){
	let spell = findSpell(choice);
	$scope.setLeftTip(spell,spellLevel);
}
$scope.spellTipRight=function(choice,spellLevel){
	let spell = findSpell(choice);
	$scope.setTip(spell,spellLevel);
}

$scope.spellList=window.spells;
$scope.creatures=window.creatures;

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
	loadPlayerList();
},function(error){
	alert("Run server.bat, then refresh the page.");
});

function loadPlayerList(){
	$http.get('http://localhost:8080/characters').then(function(response){
		for (let filename of response.data){
			if (filename.name.endsWith('.history')){
				continue;
			}
			$http.get('http://localhost:8080/characters/'+filename.name).then(function(response){
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

$scope.getModifier=function(value){
	return Math.floor((value+20)/2)-15;
}

function prepCharacter(char){
	let strBonus = Math.floor((char.attributes.str+20)/2)-15;
	let dexBonus = Math.floor((char.attributes.dex+20)/2)-15;
	let conBonus = Math.floor((char.attributes.con+20)/2)-15;
	let intBonus = Math.floor((char.attributes.int+20)/2)-15;
	let wisBonus = Math.floor((char.attributes.wis+20)/2)-15;
	let chaBonus = Math.floor((char.attributes.cha+20)/2)-15;
	
	let p=proficiency(char.level);
	char.speed={walk:char.speed, fly:0, swim:0};
	
	char.saves.str = strBonus + p*char.saves.str;
	char.saves.dex = dexBonus + p*char.saves.dex;
	char.saves.con = conBonus + p*char.saves.con;
	char.saves.int = intBonus + p*char.saves.int;
	char.saves.wis = wisBonus + p*char.saves.wis;
	char.saves.cha = chaBonus + p*char.saves.cha;
	
	char.actions=char.abilities;
	for (let i=char.actions.length-1;i>=0;i--){
		if (/(Lv|Level) \d Spell/.test(char.actions[i].name)){
			char.actions.splice(i,1);
		}
	}
	for (let i=char.passives.length-1;i>=0;i--){
		if (char.passives[i].dmHide){
			char.passives.splice(i,1);
		} else {
			//collapse passives by default
			char.passives[i].hidden=true;
		}
	}
	//setup spells
	char.spellcasting={spells:[{slots:999,spells:[]}]};
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
	//extract languages
	char.languages=[];
	for (let i=char.proficiencies.length-1;i>=0;i--){
		if (char.proficiencies[i].indexOf("Language:")==0){
			char.languages.push(char.proficiencies[i].substring(10));
		}
	}
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

$scope.getCost=function(amount){
	if (amount%100===0){
		return (amount/100)+' gp';
	}
	if (amount%10===0){
		return (amount/10)+' sp';
	}
	return amount+' cp';
}

$scope.generateLoot=function(){
	$scope.loot.push(generateLoot($scope.lootLevel));
}

$scope.merchants=window.merchants;

$scope.generateMerchant=function(merch){
	$scope.loot=generateMerchant(merch);
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

$scope.debugCoords=function(){
	var svgElem = $("#mapsvg");
	var coords = d3.mouse(this);
	$scope.coords="" + Math.floor(coords[0]) + " " + Math.floor(coords[1]);
}

$scope.adventures=[];

$scope.currentPath=null;

$scope.startPath=function(){
	$scope.currentPath = "";
	if ($scope.pathPreview){
		$scope.pathPreview.remove();
	}
	$scope.pathPreview = d3.select('#mapsvg>g').append('path').attr('id','pathPreview');
}

$scope.appendPath=function(){
	if ($scope.currentPath == null){
		return;
	}
	if ($scope.currentPath.length==0){
		$scope.currentPath = "M "+$scope.coords;
	} else {
		$scope.currentPath += " L "+ $scope.coords;
	}
	$scope.pathPreview.attr('d',$scope.currentPath+" Z");
}
$scope.endPath=function(){
	$scope.currentPath=null;
	$scope.pathPreview.remove();
}

$http.get('http://localhost:8080/resources/Adventures').then(function(response){
	for (let filename of response.data){
		$scope.adventures.push(filename);
	}
},function(error){
	console.error("Error loading character vault.");
	console.error(error);
});

$scope.loadAdventure=function(name){
	$scope.chosenAdventure=name;
	//load monsters specific to this adventure
	$http.get('http://localhost:8080/resources/Adventures/'+name+"monsters.json").then(
		function(response){
			window.creatures.append(response.data);
		},function(error){}
	);
	drawMap(name);
}

function drawMap(path, locationJump, sectionJump){
	var svgElem = d3.select("#mapsvg");
	d3.selectAll('#mapsvg>g').remove();
	var g = svgElem.append('g');
	var svgImage = g.append('image');
	var adventure = $scope.chosenAdventure;
	svgImage.attr("href",`/resources/Adventures/${adventure}/areas/${path}/map.jpg`);
	
	var imageSrc = svgImage.attr("href")
		.replace(/url\((['"])?(.*?)\1\)/gi, '$2')
		.split(',')[0];
						
	var image = new Image();
	image.onload=function(){
	    var width = this.width;
		var height = this.height;
		var zoom = d3.zoom();
		zoom.translateExtent([[0,0],[width,height]])
			.scaleExtent([0.1,4])
			.on('zoom', function(){
				g.attr("transform", d3.event.transform);
			});
		
		svgElem.call(zoom);
	}
    image.src = imageSrc;
	g.on('mousemove',$scope.debugCoords);
	
	//draw regions and POIs
	$http.get(`http://localhost:8080/resources/Adventures/${adventure}/areas/${path}/info.json`).then(function(response){
		$scope.areaInfo=response.data;
		$scope.currentArea=$scope.areaInfo;
		var dataJoin = g.selectAll('path').data(response.data.regions);
		dataJoin.enter().append('path')
			.attr('d',function(d){
				return d.path;
			})
			.attr("class", function(d){
				if ($scope.areaInfo.showRegions){
					return "region outline";
				} else {
					return "region";
				}
			})
			.on('mouseenter',updateMapLabel)
			.on('mouseleave',removeMapLabel)
			.on('click',goToLocation);
		
		dataJoin = g.selectAll('circle').data(response.data.locations);
		dataJoin.enter().append('circle')
			.attr('r',function(d){return d.iconSize;})
			
			.attr('cx',function(d){return d.location[0];})
			.attr('cy',function(d){return d.location[1];})
			.attr('class','location')
			.on('mouseenter',updateMapLabel)
			.on('mouseleave',removeMapLabel)
			.on('click',goToLocation);
			
		if (locationJump){
			for (var loc of $scope.areaInfo.regions){
				if (loc.name == locationJump){
					goToLocation(loc,sectionJump);
					return;
				}
			}
			for (var loc of $scope.areaInfo.locations){
				if (loc.name == locationJump){
					goToLocation(loc,sectionJump);
					return;
				}
			}
		}
	},function(error){
		console.error("Error loading character vault.");
		console.error(error);
	});
	
}

function updateMapLabel(d){
	d3.select('#mapText').remove();
	var mapText = d3.select('#mapLabel').append('div');
	mapText.attr('id','mapText');
	mapText.text(d.name);
	$('#mapText').arctext({radius:800});
}
function removeMapLabel(){
	d3.select('#mapText').remove();
}
function goToLocation(location, sectionJump){
	if (location.areaLink){
		drawMap(location.areaLink);
	} else {
		$scope.areaInfo=location;
		$scope.areaInfo.parent=$scope.currentArea;
		if (sectionJump){
			//remove all entries before the given section
			var i=0;
			for (i=0;i<$scope.areaInfo.description.length;i++){
				if ($scope.areaInfo.description[i].content == sectionJump){
					$scope.areaInfo.description.splice(0,i);
					break;
				}
			}
		}
		//$scope.$apply();
	}
}

$scope.goToParentArea=function(){
	if ($scope.currentArea.name == $scope.areaInfo.name){
		if ($scope.areaInfo.parent){
			drawMap($scope.areaInfo.parent);
		}
	} else {
		$scope.areaInfo=$scope.currentArea;
	}
}

$scope.openArticle=function(entry){
	if (entry.evals && entry.evals.length>0){
		for (var s of entry.evals){
			$scope.$eval(s);
		}
	}
	goToLocation(entry);
}

$scope.goToLink=function(entry){
	//link to a location in the current areaInfo
	if (entry.locationLink) {
		if ($scope.areaInfo != $scope.currentArea){
			//need to pop up first
			$scope.areaInfo = $scope.currentArea;
		}
		for (var loc of $scope.areaInfo.locations){
			if (loc.name == entry.locationLink){
				goToLocation(loc);
				return;
			}
		}
	} else if (entry.areaLink) {
		drawMap(entry.areaLink);
	} else if (entry.pathLink) {
		var parts = entry.pathLink.split('/');
		drawMap(parts[0],parts[1],parts[2]);
	}
}


}]);
