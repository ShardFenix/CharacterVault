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
				arrayStore.push(
					{
					filename:rootPath+filename,
					name:filename.substring(0,filename.indexOf('.ogg'))
					}
				);
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

$scope.musicNode;
$scope.musicGain;

var stopMusicPromise;

$scope.stopMusic=function(){
	if ($scope.musicGain){
		$scope.musicGain.gain.linearRampToValueAtTime(0,context.currentTime+2.0);
		stopMusicPromise = $timeout(function(){
			$scope.musicNode.stop();
		},2000);
	}
};

$scope.loadMusic=function(filename) {
	if (!filename){
		return;
	}
	if (stopMusicPromise){
		$timeout.cancel(stopMusicPromise);
	}
	if ($scope.musicNode){
		$scope.musicNode.stop();
	}
	$http.get('http://localhost:8080/'+root+filename,{responseType:'arraybuffer'}).then(function(response){
		var metadata = AudioMetadata.ogg(response.data);
		var loopStart = metadata.loopstart;
		var bufferPart = response.data.slice(40, 48);
		var bufferView = new Uint32Array(bufferPart);
		var samplerate = bufferView[0];
		var loopStartNum=parseFloat(loopStart)/samplerate;
		if (!loopStartNum){loopStartNum=0;}
		
		$scope.musicNode = context.createBufferSource();
		context.decodeAudioData(response.data,function(buffer){
			$scope.musicGain = context.createGain();
			$scope.musicGain.gain.linearRampToValueAtTime($scope.musicVolume,context.currentTime);
			$scope.musicNode.buffer=buffer;
			$scope.musicNode.loop=true;
			$scope.musicNode.connect($scope.musicGain);
			$scope.musicGain.connect(context.destination);
			$scope.musicNode.start(0);
			$scope.musicNode.loopStart=loopStartNum;
			$scope.musicNode.loopEnd=buffer.duration+4;//make it longer than the length
		},function(error){
			console.error(error);
		});
	},function(error){
		console.error(error);
	});
};

$http.get('http://localhost:8080/'+root+"SFX/Loops/").then(function(response){
	$scope.loops=[];
	for (let filename of response.data){
		if (filename.endsWith(".ogg") || filename.endsWith(".wav")){
			let name = filename.substring(0,filename.lastIndexOf('.'));
			let item = {
				name:name,
				filename:filename
			}
			$scope.loops.push(item);
		}
	}
});

$http.get('http://localhost:8080/'+root+"SFX/OneShots/").then(function(response){
	$scope.oneShots=[];
	for (let filename of response.data){
		if (filename.endsWith(".ogg") || filename.endsWith(".wav")){
			let name = filename.substring(0,filename.lastIndexOf('.'));
			let item = {
				name:name,
				filename:filename
			}
			$scope.oneShots.push(item);
		}
	}
});


$scope.environmentAudioList={loops:[],oneShots:[]};

$scope.overallGain = context.createGain();
$scope.overallGain.gain.value=1;
$scope.overallGain.connect(context.destination);

$scope.loadEnvironment=function(schema){
	//TODO: Make the old music fade out before loading the new one.
	$scope.stopMusic();
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
						volume:sound.volume,
						loop:sound
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
				gain:gainNode
			};
		let playIt = function(){
			if (soundGroup.buffers.length===0)
				{return;}
			let index = Math.floor(Math.random()*soundGroup.buffers.length);
			let seconds = sound.intervalMin + Math.random()*(sound.intervalMax - sound.intervalMin);
			let volume = sound.volumeMin+(Math.random()*(sound.volumeMax-sound.volumeMin));
			volume = volume * sound.files[index].volume;//mix with individual sound volume
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
			$http.get('http://localhost:8080/'+root+"SFX/OneShots/"+file.file,{responseType:'arraybuffer'}).then(function(response){
				context.decodeAudioData(response.data,function(buffer){
					soundGroup.buffers.push(buffer);
				});
			});
		}
	}
	$scope.loadMusic(schema.music.filename);
	$scope.updateMusicVolume(schema.music.volume);
	$scope.selectedEnvironment=schema;
}

$scope.environments=[];

function loadEnvironmentFile(filename){
	$http.get('http://localhost:8080/resources/Environments/'+filename).then(function(response){
		//console.log(response.data);
		delete response.data.$$hashKey;
		$scope.environments.push(response.data);
	},function(error){
		console.log(error);
	});
}

//load saved environments
$http.get('http://localhost:8080/resources/Environments').then(function(response){
	for (let filename of response.data){
		if (filename.endsWith('.json')){
			loadEnvironmentFile(filename);
		}
	}
},function(error){
	console.error("Error loading character vault.");
	console.error(error);
});

$scope.saveEnvironments = function(){
	for (let env of $scope.environments){
		if (env.name==='Silence' || env.name==='New Environment') {
			continue;
		}
		$http.post('http://localhost:8080/resources/Environments/' + env.name + ".json", JSON.stringify(env))
		.then(function(response){
			console.log("Saved Environment " + env.name);
		},function(error){
			console.error(error);
		}
		);
	}
}

$scope.newEnvironment=function(){
	let newEnvironment = {
		name:"New Environment",
		music:{
		},
		loops:[],
		oneShots:[]
	};

	$scope.environments.push(newEnvironment);
	$scope.selectedEnvironment = newEnvironment;
}

$scope.updateLoopVolume=function(loop){
	for (let i=0; i<$scope.environmentAudioList.loops.length; i++){
		let l=$scope.environmentAudioList.loops[i];
		if (l.loop===loop){
			l.gain.gain.linearRampToValueAtTime(loop.volume,context.currentTime);
			return;
		}
	}
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

$scope.dropLoop=function(source,target){
	let src = angular.element('#'+source);
	let tgt = angular.element('#'+target);
	let sfx = src.scope().loop;
	$scope.selectedEnvironment.loops.push({
		file:[sfx.filename],
		name:sfx.name,
		volume: 0.5,
	});
	$scope.$apply();
	$scope.loadEnvironment($scope.selectedEnvironment);
}

$scope.dropSfx=function(source,target){
	let src = angular.element('#'+source);
	let tgt = angular.element('#'+target);
	let sfx = src.scope().sfx;
	$scope.selectedEnvironment.oneShots.push({
		files:[
			{
			file:sfx.filename,
			volume: 1,
			name:sfx.name
			}
		],
		volumeMin: 0.5,
		volumeMax: 1.0,
		intervalMin: 20,
		intervalMax: 30,
	});
	$scope.$apply();
	$scope.loadEnvironment($scope.selectedEnvironment);
}

$scope.dropSubSfx=function(source,target){
	let src = angular.element('#'+source);
	let tgt = angular.element('#'+target);
	let sfx = src.scope().sfx;
	tgt.scope().soundGroup.files.push(
		{
		file: sfx.filename,
		volume: 1,
		name: sfx.name
		}
	);
	tgt.scope().$apply();	
	$scope.loadEnvironment($scope.selectedEnvironment);
}

$scope.dropMusic=function(source,target){
	let src = angular.element('#'+source);
	let tgt = angular.element('#'+target);
	let s = src.scope();
	if (s.music){
		$scope.selectedEnvironment.music=
			{
			filename:s.music.filename,
			name:s.music.name,
			volume:1
			};
	}
	
	tgt.scope().$apply();
	$scope.loadMusic(s.music.filename);
}

$scope.updateMusicVolume=function(vol){
	if ($scope.musicGain){
		$scope.musicGain.gain.linearRampToValueAtTime(vol,context.currentTime+0.2);
	}
}

//this works for sfx groups, sfx files, and loops
$scope.deleteSfx=function(sfx){
	for (let i=0;i< $scope.selectedEnvironment.oneShots.length;i++){
		let sound=$scope.selectedEnvironment.oneShots[i];
		if (sound===sfx){
			$scope.selectedEnvironment.oneShots.splice(i,1);
			$scope.loadEnvironment($scope.selectedEnvironment);
			return;
		}
		for (let i=0;i<sound.files.length;i++){
			if (sound.files[i]===sfx){
				sound.files.splice(i,1);
				$scope.loadEnvironment($scope.selectedEnvironment);
				return;
			}
		}
	}
	for (let i=0;i< $scope.selectedEnvironment.loops.length;i++){
		let sound=$scope.selectedEnvironment.loops[i];
		if (sound===sfx){
			$scope.selectedEnvironment.loops.splice(i,1);
			$scope.loadEnvironment($scope.selectedEnvironment);
			return;
		}
	}
	logger.error("Couldn't delete item: ",sfx);
}

$scope.newEnvironment();
$scope.selectedEnvironment.name='Silence';
}]);
