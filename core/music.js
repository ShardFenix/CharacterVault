var context;
try {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	context = new AudioContext();
}
catch(e) {
	alert('Web Audio API is not supported in this browser');
}

var app=angular.module('myApp',[]);
_setupAngular(app);

app.controller('MyController',['$scope','$timeout','$http','$interval',function($scope,$timeout,$http,$interval){

$scope.tab='music';
$scope.tab='environments';

$scope.musicFolders=[];

$scope.musicFiles=[];

let root="resources/";

if (window.location.protocol==='file:'){
	$http.get('http://localhost:8080/').then(function(resp){
		let filename = window.location.pathname;
		filename = filename.substring(filename.lastIndexOf('/'));
		window.location.href = "http://localhost:8080"+filename;
		return;
	},function(error){
		console.error("You must run server.bat for this page to work.");
	});
}

$scope.getFolders=function(rootPath, arrayStore){
	$http.get('http://localhost:8080/'+root+rootPath).then(function(response){
		for (let filename of response.data){
			if (filename.endsWith('/')){
				arrayStore.push(filename);
			}
		}
	});
}

$scope.getFiles=function(rootPath, arrayStore){
	$http.get('http://localhost:8080/'+root+rootPath).then(function(response){
		for (let filename of response.data){
			if (filename.endsWith('.ogg')){
				arrayStore.push(filename.substring(0,filename.indexOf('.ogg')));
			}
		}
	});
}
//init the folders
$scope.getFolders('Music/',$scope.musicFolders);

$scope.openSecondaryFolder=function(rootPath){
	$scope.musicFiles=[];
	$scope.primaryFolder=rootPath;
	$scope.getFiles(rootPath,$scope.musicFiles);
}

$scope.audio1=null;
$scope.audio2=null;
$scope.onAudio1=false;

$scope.loadMusic=function(filename) {
	$scope.fade=0;
	if ($scope.audio1){
		$scope.audio1.pause();
	}
	if ($scope.audio2){
		$scope.audio2.pause();
	}
	var req = new XMLHttpRequest();
	req.open('GET', 'http://localhost:8080/'+root+filename+'.ogg', true);
	req.responseType = 'arraybuffer';

	req.onload = function() {
		var metadata = AudioMetadata.ogg(req.response);
		var loopStart = metadata.loopstart;
		var bufferPart = req.response.slice(40, 48);
		var bufferView = new Uint32Array(bufferPart);
		var samplerate = bufferView[0];
		var loopStartNum=parseFloat(loopStart)/samplerate;
		if (!loopStartNum){loopStartNum=0;}
		
		$scope.audio2 = new Audio(root+filename+'.ogg');
		$scope.audio2.volume=($scope.volume/100.0);
		$scope.audio2.addEventListener('timeupdate', function() {
			if ($scope.fade>0){
				$scope.fade++;
			}
			this.volume=Math.max(0,(($scope.volume-$scope.fade*5)/100.0));
			if (this.currentTime>this.duration-0.1){
				this.pause();
				this.currentTime=loopStartNum;
				$scope.audio1.play();
			}
		}, false);
		
		$scope.audio1 = new Audio(root+filename+'.ogg');
		$scope.audio1.volume=($scope.volume/100.0);
		$scope.audio1.addEventListener('timeupdate', function() {
			if ($scope.fade>0){
				$scope.fade++;
			}
			this.volume=Math.max(0,(($scope.volume-$scope.fade*5)/100.0));
			if (this.currentTime>4 && this.currentTime<5){
				//need this to set the initial time of audio2
				$scope.audio2.currentTime=loopStartNum;
			}
			if (this.currentTime>this.duration-0.1){
				this.pause();
				this.currentTime=loopStartNum;
				$scope.audio2.play();
			}
		}, false);
		$scope.audio1.play();
	};
	req.send(null);
}

//schema for an environment setting
let schema = {
	name:"New Environment",
	loops:[
		{
			file:'',
			volume:1
		}
	],
	oneShots:[
		{
			files:[''],
			volumeMin: 0.5,
			volumeMax: 1.0,
			intervalMin: 35, //the min time in seconds to wait after one of the sounds finishes playing
			intervalMax: 60,
		}
	]
};

$http.get('http://localhost:8080/'+root+"SFX/Loops/").then(function(response){
	$scope.loops=[];
	for (let filename of response.data){
		let name = filename.substring(0,filename.lastIndexOf('.ogg'));
		let item = {
			name:name,
			filename:filename
		}
		$scope.loops.push(item);
	}
});

$http.get('http://localhost:8080/'+root+"SFX/OneShots/").then(function(response){
	$scope.oneShots=[];
	for (let filename of response.data){
		let name = filename.substring(0,filename.lastIndexOf('.ogg'));
		let item = {
			name:name,
			filename:filename
		}
		$scope.oneShots.push(item);
	}
});


$scope.environmentAudioList={loops:[],oneShots:[]};

$scope.overallGain = context.createGain();
$scope.overallGain.gain.value=1;
$scope.overallGain.connect(context.destination);

$scope.loadEnvironment=function(schema){
	//move existing environment to temp storage while it fades out
	let oldEnvironmentAudioList=$scope.environmentAudioList;
	$scope.environmentAudioList={loops:[],oneShots:[]};
	//fade out existing
	for (let sound of oldEnvironmentAudioList.loops){
		sound.gain.gain.linearRampToValueAtTime(0.0,context.currentTime+2);
	}
	for (let sound of oldEnvironmentAudioList.oneShots){
		sound.gain.gain.linearRampToValueAtTime(0.0,context.currentTime+2);
	}
	$timeout(function(){
		for (let sound of oldEnvironmentAudioList.loops){
			sound.source.stop(); //this will clean it up from the graph according to SO
		}
		for (let sound of oldEnvironmentAudioList.oneShots){
			sound.buffers=[];//this stops sounds from queueing
		}
	},2000)
	
	for (let sound of schema.loops){
		$http.get('http://localhost:8080/'+root+"SFX/Loops/"+sound.file,{responseType:'arraybuffer'}).then(function(response){
			let source = context.createBufferSource();
			context.decodeAudioData(response.data,function(buffer){
				let gainNode = context.createGain();
				$scope.environmentAudioList.loops.push(
					{
						source:source,
						gain:gainNode,
						volume:sound.volume
					}
				);
				gainNode.gain.linearRampToValueAtTime(0.0,context.currentTime);
				gainNode.gain.linearRampToValueAtTime(sound.volume,context.currentTime+2);
				source.buffer=buffer;
				source.loop=true;
				source.connect(gainNode);
				gainNode.connect($scope.overallGain);
				source.start(0);
			});
		});
	}
	
	for (let sound of schema.oneShots){
		//sounds in the one shot groups will share gain, and we will only store the buffers
		//the webaudio API doesn't allow playing an audiosource multiple times,
		//so we save the buffer and create a new audionode each time it will play.
		let gainNode = context.createGain();
		gainNode.gain.linearRampToValueAtTime(0.0,context.currentTime);
		gainNode.connect($scope.overallGain);
		let soundGroup = {
				buffers:[],
				gain:gainNode,
			};
		let playIt = function(){
			if (soundGroup.buffers.length===0)
				{return;}
			let index = Math.floor(Math.random()*soundGroup.buffers.length);
			let seconds = sound.intervalMin + Math.random()*(sound.intervalMax - sound.intervalMin);
			let volume = sound.volumeMin+(Math.random()*(sound.volumeMax-sound.volumeMin));
			let source = context.createBufferSource();
			source.buffer=soundGroup.buffers[index];
			source.connect(gainNode);
			gainNode.gain.linearRampToValueAtTime(volume,context.currentTime);
			source.onended=playIt;
			source.start(context.currentTime + seconds);
		};
		$timeout(playIt,1000);
		$scope.environmentAudioList.oneShots.push(soundGroup);
		//load the buffers for this sound group
		for (let file of sound.files){
			$http.get('http://localhost:8080/'+root+"SFX/OneShots/"+file,{responseType:'arraybuffer'}).then(function(response){
				context.decodeAudioData(response.data,function(buffer){
					soundGroup.buffers.push(buffer);
				});
			});
		}
	}
}

$scope.loadEnvironment(schema);

$scope.environments=[];

$scope.newEnvironment=function(){
	let newEnvironment = {
		name:"New Environment",
		loops:[],
		oneShots:[]
	};

	$scope.environments.push(newEnvironment);
	$scope.selectedEnvironment = newEnvironment;
}

$scope.renameEnvironment = function(env,newName){
	env.name=newName;
}

$scope.addLoopToEnvironment=function(env, filename){
	env.loops.push({
		file:filename,
		volume:0.5
	});
}

$scope.addOneShotToEnvironment=function(env){
	env.oneShots.push([{
			files:[],
			volumeMin: 0.5,
			volumeMax: 1.0,
			intervalMin: 20,
			intervalMax: 30,
	}]);
}

$scope.addOneShotToSoundGroup=function(oneShotList, filename){
	oneShotList.files.push(filename);
}

$scope.updateLoopVolume=function(loop){
	
}

$scope.playSound=function(sound){
	$http.get('http://localhost:8080/'+root+"SFX/OneShots/"+sound,{responseType:'arraybuffer'}).then(function(response){
		context.decodeAudioData(response.data,function(buffer){
			let source = context.createBufferSource();
			source.buffer=buffer;
			source.connect(context.destination);
			source.start(0);
		});
	});
}

$scope.dropSfx=function(source,target){
	let src = angular.element('#'+source);
	let tgt = angular.element('#'+target);
	let sfx = src.scope().sfx;
	$scope.selectedEnvironment.oneShots.push({
		files:[sfx.filename],
		volumeMin: 0.5,
		volumeMax: 1.0,
		intervalMin: 20,
		intervalMax: 30,
	});
	$scope.$apply();
}

$scope.dropSubSfx=function(source,target){
	let src = angular.element('#'+source);
	let tgt = angular.element('#'+target);
	let sfx = src.scope().sfx;
	tgt.scope().soundGroup.files.push(sfx.filename);
	tgt.scope().$apply();	
}

}]);
