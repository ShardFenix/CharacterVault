window.passives.append([
	{
		name:"Fire Resistance",
		description:"Fire damage dealt to you is halved, rounded down."
	},{
		name:"Lightning Resistance",
		description:"Lightning damage dealt to you is halved, rounded down."
	},{
		name:"Acid Resistance",
		description:"Acid damage dealt to you is halved, rounded down."
	},{
		name:"Cold Resistance",
		description:"Cold damage dealt to you is halved, rounded down."
	},{
		name:"Poison Resistance",
		description:"Poison damage dealt to you is halved, rounded down."
	},{
		name:"Radiant Resistance",
		description:"Radiant damage dealt to you is halved, rounded down."
	},{
		name:"Necrotic Resistance",
		description:"Necrotic damage dealt to you is halved, rounded down."
	},{
		name:"Nimble Escape",
		description:"You can take the Disengage or Hide action as a bonus action on each of your turns."
	},{
		name:"Powerful Build",
		description:"You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift."
	},{
		name:"Speech of Beast and Leaf",
		description:"You have the ability to communicate in a limited manner with beasts and plants. They can understand the meaning of your words, though you have no special ability to understand them in return. You have advantage on all Charisma checks you make to influence them."
	}
]);

window.abilities.append([
	{
		name:"Hidden Step",
		description:"As a bonus action, you can magically turn invisible until the start of your next turn or until you attack, make a damage roll, or force someone to make a saving throw. Once you use this trait, you can't use it again until you finish a short or long rest.",
		charges:1,
		maxCharges:1,
		onShortRest:helper.recharge
	},{
		name:"Detect Magic (Firbolg)",
		description:"You can cast Detect Magic using Wisdom as your spellcasting ability. You can't use this ability again until you finish a short or long rest.",
		charges:1,
		maxCharges:1,
		onShortRest:helper.recharge
	},{
		name:"Disguise Self (Firbolg)",
		description:"You can cast Disguise Self using Wisdom as your spellcasting ability. You can't use this ability again until you finish a short or long rest. When you use this version of Disguise Self, you can seem up to 3 feet shorter than normal, allowing you to more easily blend in with humans and elves.",
		charges:1,
		maxCharges:1,
		onShortRest:helper.recharge
	},{
		name:"Acid Breath (Line)",
		description:"You can use your action to exhale destructive energy. Each creature in a 30 foot line must make a DEX saving throw (DC <i>${8 + $scope.derived.modifiers.con + $scope.derived.proficiency}</i>). A creature takes <i>${ladder($scope.char.level,0,2,6,3,11,4,16,5)}</i>d6 acid damage on a failed save, or half as much on a successful save.\nYou can't use this again until you finish a short or long rest.",
		maxCharges:1,
		charges:1,
		onShortRest:helper.recharge,
	},{
		name:"Lightning Breath (Line)",
		description:"You can use your action to exhale destructive energy. Each creature in a 30 foot line must make a DEX saving throw (DC <i>${8 + $scope.derived.modifiers.con + $scope.derived.proficiency}</i>). A creature takes <i>${ladder($scope.char.level,0,2,6,3,11,4,16,5)}</i>d6 lightning damage on a failed save, or half as much on a successful save.\nYou can't use this again until you finish a short or long rest.",
		maxCharges:1,
		charges:1,
		onShortRest:helper.recharge,
	},{
		name:"Fire Breath (Line)",
		description:"You can use your action to exhale destructive energy. Each creature in a 30 foot line must make a DEX saving throw (DC <i>${8 + $scope.derived.modifiers.con + $scope.derived.proficiency}</i>). A creature takes <i>${ladder($scope.char.level,0,2,6,3,11,4,16,5)}</i>d6 fire damage on a failed save, or half as much on a successful save.\nYou can't use this again until you finish a short or long rest.",
		maxCharges:1,
		charges:1,
		onShortRest:helper.recharge,
	},{
		name:"Fire Breath (Cone)",
		description:"You can use your action to exhale destructive energy. Each creature in a 15 foot cone must make a DEX saving throw (DC <i>${8 + $scope.derived.modifiers.con + $scope.derived.proficiency}</i>). A creature takes <i>${ladder($scope.char.level,0,2,6,3,11,4,16,5)}</i>d6 fire damage on a failed save, or half as much on a successful save.\nYou can't use this again until you finish a short or long rest.",
		maxCharges:1,
		charges:1,
		onShortRest:helper.recharge,
	},{
		name:"Poison Breath (Cone)",
		description:"You can use your action to exhale destructive energy. Each creature in a 15 foot cone must make a CON saving throw (DC <i>${8 + $scope.derived.modifiers.con + $scope.derived.proficiency}</i>). A creature takes <i>${ladder($scope.char.level,0,2,6,3,11,4,16,5)}</i>d6 poison damage on a failed save, or half as much on a successful save.\nYou can't use this again until you finish a short or long rest.",
		maxCharges:1,
		charges:1,
		onShortRest:helper.recharge,
	},{
		name:"Cold Breath (Cone)",
		description:"You can use your action to exhale destructive energy. Each creature in a 15 foot cone must make a CON saving throw (DC <i>${8 + $scope.derived.modifiers.con + $scope.derived.proficiency}</i>). A creature takes <i>${ladder($scope.char.level,0,2,6,3,11,4,16,5)}</i>d6 cold damage on a failed save, or half as much on a successful save.\nYou can't use this again until you finish a short or long rest.",
		maxCharges:1,
		charges:1,
		onShortRest:helper.recharge,
	},{
		name:"Healing Hands",
		description:"As an action, you can touch a creature and cause it to regain a number of hit points equal to your level. Once you use this trait, you can't use it again until you finish a long rest.",
		maxCharges:1,
		charges:1,
		onLongRest:helper.recharge,
	},{
		name:"Radiant Soul",
		description:"You can use your action to unleash the divine energy within yourself, causing your eyes to glimmer and two luminous, incorporeal wings to sprout from your back.\nYour transformation lasts for 1 minute or until you end it as a bonus action. During it, you have a flying speed of 30 feet, and once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra radiant damage equals your level.\nOnce you use this trait, you can't use it again until you finish a long rest.",
		maxChargesFunction:function(char){
			if (char.level<3)return 0;
			return 1;
		},
		onLongRest:helper.recharge
	},{
		name:"Necrotic Shroud",
		description:"You can use your action to unleash the divine energy within yourself, causing your eyes to turn into pools of darkness and two skeletal, ghostly, flightless wings to sprout from your back. The instant you transform, other creatures within 10 feet of you that can see you must succeed on a Charisma saving throw (DC 8 + your proficiency bonus + your Charisma modifier) or become frightened of you until the end of your next turn.\n\nYour transformation lasts for 1 minute or until you end it as a bonus action. During it, once on each of your turns, you can deal extra necrotic damage to one target when you deal damage to it with an attack or a spell. The extra necrotic damage equals your level.\n\nOnce you use this trait, you can't use it again until you finish a long rest.",
		maxChargesFunction:function(char){
			if (char.level<3)return 0;
			return 1;
		},
		onLongRest:helper.recharge
	},{
		name:"Fury of the Small",
		description:"When you damage a creature with an attack or a spell and the creature's size is larger than yours, you can cause the attack or spell to deal extra damage to the creature. The extra damage equals your level. Once you use this trait, you can't use it again until you finish a short or long rest.",
		maxCharges:1,
		charges:1,
		onShortRest:function(){
			this.charges=this.maxCharges;
		}
	}
]);

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
					addSpell(char,spell,"SpecialInt");
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
	},{
		name:"Dragonborn",
		description:"Attributes: +2 STR, +1 CHA.\nLanguages: Common and Draconic.\nBreath Weapon and damage resistance based on draconic ancestry.",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Draconic");
			char.speed=30;
			scope.choiceQueue.push(
				{
					choicePrompt:"Choose your Draconic Ancestry",
					choices:["Black","Blue","Brass","Bronze","Copper","Gold","Green","Red","Silver","White"],
					action:function(char,derived,choice,$scope){
						switch (choice){
							case "Black":
								addAbility(char,"Acid Breath (Line)");
								addPassive(char,"Acid Resistance");break;
							case "Blue":
								addAbility(char,"Lightning Breath (Line)");
								addPassive(char,"Lightning Resistance");break;
							case "Brass":
								addAbility(char,"Fire Breath (Line)");
								addPassive(char,"Fire Resistance");break;
							case "Bronze":
								addAbility(char,"Lightning Breath (Line)");
								addPassive(char,"Lightning Resistance");break;
							case "Copper":
								addAbility(char,"Acid Breath (Line)");
								addPassive(char,"Acid Resistance");break;
							case "Gold":
								addAbility(char,"Fire Breath (Cone)");
								addPassive(char,"Fire Resistance");break;
							case "Green":
								addAbility(char,"Poison Breath (Cone)");
								addPassive(char,"Poison Resistance");break;
							case "Red":
								addAbility(char,"Fire Breath (Cone)");
								addPassive(char,"Fire Resistance");break;
							case "Silver":
								addAbility(char,"Cold Breath (Cone)");
								addPassive(char,"Cold Resistance");break;
							case "White":
								addAbility(char,"Cold Breath (Cone)");
								addPassive(char,"Cold Resistance");break;
						}
					}
				}
			);
		}
	},{
		name:"Aasimar (Protector)",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Celestial");
			char.speed=30;
			char.attributes.cha+=2;
			char.attributes.wis+=1;
			addPassive(char,"Darkvision");
			addPassive(char,"Radiant Resistance");
			addPassive(char,"Necrotic Resistance");
			addAbility(char,"Healing Hands");
			addAbility(char,"Radiant Soul");
			let spell = findSpell("Light");
			spell=angular.copy(spell);
			addSpell(char,spell,"SpecialCha");
		}
	},{
		name:"Aasimar (Fallen)",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Celestial");
			char.speed=30;
			char.attributes.cha+=2;
			char.attributes.wis+=1;
			addPassive(char,"Darkvision");
			addPassive(char,"Radiant Resistance");
			addPassive(char,"Necrotic Resistance");
			addAbility(char,"Healing Hands");
			addAbility(char,"Necrotic Shroud");
			let spell = findSpell("Light");
			spell=angular.copy(spell);
			addSpell(char,spell,"SpecialCha");
		}
	},{
		name:"Goblin",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Goblin");
			char.speed=30;
			char.attributes.dex+=2;
			char.attributes.con+=1;
			addPassive(char,"Darkvision");
			addPassive(char,"Nimble Escape");
			addAbility(char,"Fury of the Small");
		}
	},{
		name:"Firbolg",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Elvish");
			char.proficiencies.push("Language: Giant");
			char.speed=30;
			char.attributes.wis+=2;
			char.attributes.str+=1;
			addPassive(char,"Powerful Build");
			addPassive(char,"Speech of Beast and Leaf");
			addAbility(char,"Hidden Step");
			addAbility(char,"Detect Magic (Firbolg)");
			addAbility(char,"Disguise Self (Firbolg)");
		}
	},
];