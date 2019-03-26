window.races=[
	{
		name:"Human",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.speed=30;
			scope.choiceQueue.push(helper.learnLanguage);
			scope.choiceQueue.push(
				{
					choicePrompt:"Choose one:",
					choices:["+1 to each attribute","+2 attribute points, 1 feat, 1 proficiency"],
					action:function(char,derived,choice,$scope){
						if (choice==="+1 to each attribute"){
							char.str+=1;
							char.dex+=1;
							char.con+=1;
							char.int+=1;
							char.wis+=1;
							char.cha+=1;
						} else {
							$scope.choiceQueue.push(helper.increaseAttribute);
							$scope.choiceQueue.push(helper.increaseAttribute);
							$scope.choiceQueue.push(helper.chooseRaceFeat);
							$scope.choiceQueue.push(helper.learnSkillProficiency);
						}
					}
				}
			);
		}
	},{
		name:"Tiefling",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Infernal");
			char.speed=30;
			char.int+=1;
			char.cha+=2;
			addPassive(char,"Resistance to Fire");
			addPassive(char,"Darkvision");
			//race abilities
			addAbility(char,"Hellish Rebuke");
			addAbility(char,"Thaumaturgy");
			addAbility(char,"Darkness");
		}
	},{
		name:"Half-Elf",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Elvish");
			char.speed=30;
			char.cha+=2;
			addPassive(char,"Darkvision");
			addPassive(char,"Fey Ancestry");
			//race abilities
			scope.choiceQueue.push(helper.learnLanguage);
			scope.choiceQueue.push(helper.learnSkillProficiency);
			scope.choiceQueue.push(helper.learnSkillProficiency);
		}
	}
];