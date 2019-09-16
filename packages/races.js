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
							$scope.choiceQueue.push(
								{
									limit:2,
									choicePrompt:"Choose two:",
									choices:[getAttributesBelow20],
									action:function(char,derived,choice,scope){
										switch (choice){
											case "+1 Strength":char.attributes.str+=1;break;
											case "+1 Dexterity":char.attributes.dex+=1;break;
											case "+1 Constitution":char.attributes.con+=1;break;
											case "+1 Intelligence":char.attributes.int+=1;break;
											case "+1 Wisdom":char.attributes.wis+=1;break;
											case "+1 Charisma":char.attributes.cha+=1;break;
										}
									}
								});
							$scope.choiceQueue.push(helper.chooseRaceFeat);
							$scope.choiceQueue.push(helper.learnSkillProficiency);
						}
					}
				}
			);
		}
	},{
		name:"Dwarf (Mountain)",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Dwarvish");
			char.proficiencies.push("Light Armor");
			char.proficiencies.push("Medium Armor");
			char.proficiencies.push("Battleaxes");
			char.proficiencies.push("Handaxes");
			char.proficiencies.push("Light Hammers");
			char.proficiencies.push("Warhammers");
			char.speed=25;
			char.attributes.str+=2;
			char.attributes.con+=2;
			addPassive(char,"Darkvision");
			addPassive(char,"Dwarven Resilience");
			addPassive(char,"Stonecunning");
			scope.choiceQueue.push(
				{
					choicePrompt:"Choose a tool proficiency",
					choices:["Brewer's Supplies","Smith's Tools","Mason's Tools"],
					action:function(char,derived,choice){
						char.proficiencies.upush(choice);
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
			scope.choiceQueue.push(
				{
					limit:2,
					choicePrompt:"Choose two:",
					choices:[getAttributesBelow20],
					action:function(char,derived,choice,scope){
						switch (choice){
							case "+1 Strength":char.attributes.str+=1;break;
							case "+1 Dexterity":char.attributes.dex+=1;break;
							case "+1 Constitution":char.attributes.con+=1;break;
							case "+1 Intelligence":char.attributes.int+=1;break;
							case "+1 Wisdom":char.attributes.wis+=1;break;
							case "+1 Charisma":char.attributes.cha+=1;break;
						}
					}
				});
			scope.choiceQueue.push(helper.learnLanguage);
			scope.choiceQueue.push({
					limit:2,
					choicePrompt:"Choose two skill proficiencies",
					choices:[listNonProficientSkills],
					action:function(char,derived,choice){
						addProficiency(char,choice);
					}
				}
			);
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
					spell=angular.copy(spell);
					spell.name="High Elf "+spell.name;
					spell.description=spell.description+"\n\nIntelligence is your spellcasting ability for this cantrip.";
					addPassive(char,spell);
				}
			});
		}
	},{
		name:"Elf (Wood)",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Elvish");
			char.speed=35;
			char.attributes.dex+=2;
			char.attributes.wis+=1;
			addPassive(char,"Darkvision");
			addPassive(char,"Fey Ancestry");
			addPassive(char,"Trance");
			addPassive(char,"Mask of the Wild");
			addProficiency(char,"Perception");
			char.proficiencies.upush("Longswords");
			char.proficiencies.upush("Shortswords");
			char.proficiencies.upush("Shortbows");
			char.proficiencies.upush("Longbows");
		}
	}
];