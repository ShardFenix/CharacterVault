window.races=[
	{
		name:"Human",
		description:"Attributes: +1 to each, or distribute +2 and gain a feat and a skill proficiency.\nLanguages: Common and one extra of your choice.",
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
							char.attributes.str+=1;
							char.attributes.dex+=1;
							char.attributes.con+=1;
							char.attributes.int+=1;
							char.attributes.wis+=1;
							char.attributes.cha+=1;
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
			char.attributes.int+=1;
			char.attributes.cha+=2;
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
			char.attributes.cha+=2;
			addPassive(char,"Darkvision");
			addPassive(char,"Fey Ancestry");
			//race abilities
			scope.choiceQueue.push(helper.increaseAttribute);
			scope.choiceQueue.push(helper.increaseAttribute);
			scope.choiceQueue.push(helper.learnLanguage);
			scope.choiceQueue.push(helper.learnSkillProficiency);
			scope.choiceQueue.push(helper.learnSkillProficiency);
		}
	},{
		name:"Half-Orc",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Orc");
			char.speed=30;
			char.attributes.str+=2;
			char.attributes.con+=1;
			addPassive(char,"Darkvision");
			addPassive(char,"Savage Attack");
			addAbility(char,"Relentless Endurance");
			addProficiency(char,"Intimidation");
		}
	},{
		name:"Elf (Drow)",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Elvish");
			char.speed=30;
			char.attributes.dex+=2;
			char.attributes.cha+=1;
			addPassive(char,"Superior Darkvision");
			addPassive(char,"Fey Ancestry");
			addPassive(char,"Trance");
			addPassive(char,"Sunlight Sensitivity");
			addProficiency(char,"Perception");
			char.proficiencies.upush("Rapiers");
			char.proficiencies.upush("Shortswords");
			char.proficiencies.upush("Hand Crossbows");
			addAbility("Dancing Lights (Cantrip)");
			addAbility("Faerie Fire");
			addAbility("Darkness");
		}
	},{
		name:"Elf (High)",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Elvish");
			char.speed=30;
			char.attributes.dex+=2;
			char.attributes.cha+=1;
			addPassive(char,"Darkvision");
			addPassive(char,"Fey Ancestry");
			addPassive(char,"Trance");
			addProficiency(char,"Perception");
			char.proficiencies.upush("Longswords");
			char.proficiencies.upush("Shortswords");
			char.proficiencies.upush("Shortbows");
			char.proficiencies.upush("Longbows");
			scope.choiceQueue.push({
				choicePrompt:"Choose a Cantrip",
				choices:[listUnknownWizardCantrips],
				action:function(char,derived,choice,scope){
					let spell = findSpell(choice);
					char.abilities.push(spell);
				}
			});
		}
	}
];