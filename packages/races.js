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
		description:"You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
		dmHide:true
	},{
		name:"Speech of Beast and Leaf",
		description:"You have the ability to communicate in a limited manner with beasts and plants. They can understand the meaning of your words, though you have no special ability to understand them in return. You have advantage on all Charisma checks you make to influence them.",
		dmHide:true
	},{
		name:"Savage Attacks",
		description:"When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit."
	},{
		name:"Shapechanger",
		description:"As an action, you can change your appearance and your voice. You determine the specifics of the changes, including your coloration, hair length, and sex. You can also adjust your height and weight, but not so much that your size changes. You can make yourself appear as a member of another race, though none of your game statistics change. You can't duplicate the appearance of a creature you've never seen, and you must adopt a form that has the same basic arrangement of limbs that you have. Your clothing and equipment aren't changed by this trait.\n\nYou stay in the new form until you use an action to revert to your true form or until you die."
	},{
		name:"Living Construct",
		description:"You are a being molded of powerful magicks and living stone, and so, your creature type is construct instead of humanoid. Spells like cure wounds will only heal you half as effectively, but you are immune to spells like crown of madness or dominate person because they specifically target humanoids. You are immune to poison damage, being poisoned, and diseases.\n\nAlso, When the mending spell is cast on you, it has the following alterations: It has a casting time of 1 action. If you have 0 hit points you become stable. As part of the casting of mending the caster may expend a level 1 spell slot to cause you to add a number of temporary hit points equal to 1d8, plus their spellcasting ability modifier."
	},{
		name:"Chiseled Armor",
		description:"While not wearing armor, your armor class equals 13 + your Dexterity modifier. You can equip a shield and still gain this benefit."
	},{
		name:"Statuesque",
		description:"When you stop moving, you are almost indistinguishable from a normal statue. This allows them to effectively hide in plain sight, allowing advantage on stealth rolls that involve not moving."
	},{
		name:"Built to Work",
		description:"You do not need to sleep to gain the benefits of a long rest. You can instead use that time to do light work."
	},{
		name:"Expert Forgery",
		description:"You can duplicate other creatures' handwriting and craftwork. You have advantage on all checks made to produce forgeries or duplicates of existing objects."
	},{
		name:"Mimicry",
		description:"You can mimic sounds you have heard, including voices. A creature that hears the sounds can tell they are imitations with a successful Wisdom (Insight) check opposed by your Charisma (Deception) check. You have great trouble speaking in phrases that you are not mimicking."
	},{
		name:"Bite and Scratch",
		description: "You are proficient with your teeth and claws. Your attacks count as both weapon and unarmed attacks, and deals slashing or piercing damage equal to 1d6 plus your strength modifier."
	},{
		name:"Tree Cat",
		tags:['Cat'],
		description:"Moving with preternatural speed and grace, you scramble up sheer surfaces with ease. You have advantage on ability checks to climb objects or structures."
	},{
		name:"Feline Intuition",
		tags:['Cat'],
		description:"You know things. Even if you're not entirely sure how sometimes, you just... do. Gain +1 to Intelligence.",
		onPickup:function(char){
			char.attributes.int+=1;
		}
	},{
		name:"Cute Cat",
		tags:['Cat'],
		description:"Are they... ignoring you? Have they seen what you look like? Get +1 to Charisma.",
		onPickup:function(char){
			char.attributes.cha+=1;
		}
	},{
		name:"Skilled Hunter",
		tags:['Cat'],
		description:"You can follow your prey through any terrain. No one is gettign away from you! You gain expertise in the Traacking skill.",
		onPickup:function(char){
			addProficiency(char,"Tracking");
			addExpertise(char,"Tracking");
		}
	},{
		name:"Action Cat",
		tags:['Cat'],
		description:"You're always ready for what comes next; you're poised, cunning, and able to anticipate. Add +2 to initiative.",
		apply:function(char,scope){
			scope.derived.initiative+=2;
		}
	},{
		name:"Flower Marked",
		tags:['Cat'],
		description:"Your fur patterns are highly effective camouflage, making you difficult to spot in the wilderness. You have advantage on Stealth checks made in natural terrain."
	},{
		name:"Four-Point Landing",
		tags:['Cat'],
		description:"You are adept at landing safely on your feet, even from long distances. You are resistant to fall damage."
	},{
		name:"Lucky Cat",
		tags:['Cat'],
		description:"You're lucky. You don't know why. You can reroll any attack roll, ability check, or saving throw, once per long rest.",
		onPickup:function(char){
			addAbility(char,"Lucky Cat");
		}
	},{
		name:"Life in the Shadows",
		tags:['Cat'],
		description:"Twilight is your element, your coloring and lithe form making you almost impossible to detect as the light dims. You have advantage on stealth roles in low-light or dark environments."
	},{
		name:"Like a Wolf",
		tags:['Cat'],
		description:"As you shed your fur, you begin to resemble a vicious wolf, teeth bared and hungry for blood. Gain expertise at the Intimidation skill.",
		onPickup:function(char){
			addProficiency(char,"Intimidation");
			addExpertise(char,"Intimidation");
		}
	},{
		name:"Gym Cat",
		tags:['Cat'],
		description:"Hulking and mighty, it doesn't matter that you aren't as big as a dragon - you pack jus as much into a smaller package! Add +1 to Strength.",
		onPickup:function(char){
			char.attributes.strength+=1;
		}
	},{
		name:"Fluffy Cat",
		tags:['Cat'],
		description:"Your fur is spectacularly fluffy, softening the blows of your enemies. Get +1 to AC."
	},{
		name:"Adaptation",
		tags:['Cat'],
		description:"You were born in freezing cold conditions. You're used to it. You are resistant to cold damage."
	},{
		name:"Go Limp",
		tags:['Cat'],
		description:"You've spent a lot of time going limp and playing dead. You're eerily good at it, but you've learned something more. While you're prone, other creatures don't gain advantage on attacks against you for being prone."
	},{
		name:"Light Sleeper",
		tags:['Cat'],
		description:"You don't need much in the way of recovery time. Whenever you spend hit dice to heal during a short rest, you heal an additional 1d4+2 hit points."
	},{
		name:"Slippery Customer",
		tags:['Cat'],
		description:"Someone with your dignity is, most assuredly, not going to be manhandled. You have advantage on grapple contests made against you, and on all checks to break grapple."
	},{
		name:"Nine Lives",
		tags:['Cat'],
		description:"You have nine lives. Whenever you would die, you instead gain 1 hit point. You can also use this ability while unconscious to regain one hit point. You may use this ability eight times. This ability does not recharge.",
		onPickup:function(char){
			addAbility(char,"Nine Lives");
		}
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
	},{
		name:"Relentless Endurance",
		description:"When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest.",
		charges:1,
		maxCharges:1,
		onLongRest:helper.refresh
	},{
		name:"Hellish Rebuke (Tiefling)",
		description:"You can cast the Hellish Rebuke spell as a 2nd-level spell. You must finish a long rest in order to cast the spell again using this trait.",
		maxChargesFunction:function(char){
			if (char.level >= 3){
				return 1;
			}
			return 0;
		}
	},{
		name:"Darkness (Tiefling)",
		description:"You can cast the Darkness spell. You must finish a long rest in order to cast the spell again using this trait.",
		maxChargesFunction:function(char){
			if (char.level >= 5){
				return 1;
			}
			return 0;
		}
	},{
		name:"Lucky Cat",
		description:"You can reroll any attack roll, ability check, or saving throw. You can't use this again until you finish a long rest.",
		charges:1,
		maxCharges:1,
		onLongRest:helper.refresh
	},{
		name:"Nine Lives",
		description:"If you would die, you instead gain one hit point. You can also use this ability while unconscious to regain one hit point. This skill does not recharge.",
		charges:8,
		maxCharges:8,
		onLongRest:function(){}
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
			addPassive(char,"Fire Resistance");
			addPassive(char,"Darkvision");
			//race abilities
			addAbility(char,"Hellish Rebuke (Tiefling)");
			addAbility(char,"Darkness (Tiefling)");
			addSpell(char,"Thaumaturgy","SpecialCha");
			
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
			addPassive(char,"Savage Attacks");
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
	},{
		name:"Changeling",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.speed=30;
			char.attributes.cha+=2;
			addPassive(char,"Shapechanger");
			scope.choiceQueue.push(
				{
					choicePrompt:"Choose one:",
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
			scope.choiceQueue.push({
				limit:2,
				choicePrompt:"Choose two languages:",
				choices:[listUnknownLanguages],
				action:function(char,derived,choice){
					char.proficiencies.upush(choice);
				}
			});
			scope.choiceQueue.push({
					limit:2,
					choicePrompt:"Choose two proficiencies",
					choices:['Deception','Insight','Intimidation','Persuasion'],
					action:function(char,derived,choice){
						addProficiency(char,choice);
					}
				}
			);
		}
	},{
		name:"Stone Golem",
		description:"A Stone Golem's form is designated by whomever their creator is. The quality of magic their creator is capable of wielding and understanding tends to correlate to the form the Stone Golem takes. This means they can vary from appearing as statuesque wonders, meticulously etched and carved from the most incredible of marbles that would make artists weep in awe, animated as if they were legitimate flesh and blood wrapped in a hardened exterior... To what would generally appear to be nothing more than a mobile and semi-sentient boulder with limbs of mossy river-rocks, held loosely together by a minuscule thread of magical energy. As they are created, so they shall be. They are often incredibly dense, given that they are made entirely from stone, and weigh roughly twice to three times as much as their size and shape would generally yield.\n\nThey typically have a simple purpose assigned to them upon their creation, and will vehemently stick to that purpose, unless cataclysmically altered by an outside force.\n\nThis purpose could be something as simple as guarding or protecting a specific place or person, or as complex as keeping the books for the particularly financially savvy. They are imbued with the knowledge granted to them by their creator, to whatever extent that creator desires. Often, there is an inherent kinship between these Golems and other magical constructs, meaning that they tend to \"enjoy\" being in the presence of others of such creations, to the extent that their minds allow.\n\nDue to their most common uses as durable muscle, Golems are often not the most terribly intelligent creatures when left to their own devices. That said, there is often a fierce intuition in their actions, and is rarely wasted effort. They were created to work, not to waste time.",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.speed=30;
			char.attributes.str+=1;
			char.attributes.con+=2;
			char.attributes.dex-=1;
			char.attributes.int-=1;
			addPassive(char,"Living Construct");
			addPassive(char,"Chiseled Armor");
			addPassive(char,"Statuesque");
			addPassive(char,"Built to Work");
			scope.choiceQueue.push(helper.learnLanguage);
		}
	},{
		name:"Kenku (PC Race)",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Auran");
			char.speed=30;
			char.attributes.dex+=2;
			char.attributes.wis+=1;
			addPassive(char,"Expert Forgery");
			addPassive(char,"Mimicry");
			scope.choiceQueue.push({
					limit:2,
					choicePrompt:"Choose two proficiencies",
					choices:['Acrobatics','Deception','Stealth','Sleight of Hand'],
					action:function(char,derived,choice){
						addProficiency(char,choice);
					}
				}
			);
		}
	},{
		name:"Feline (PC Race)",
		description:"",
		onPickup:function(char,scope){
			char.proficiencies.push("Language: Common");
			char.proficiencies.push("Language: Feline");
			char.speed=30;
			char.attributes.dex+=2;
			addPassive(char,"Darkvision");
			addPassive(char,"Bite and Scratch");
			scope.choiceQueue.push({
					limit:1,
					choicePrompt:"Choose one",
					choices:['+1 Strength','+1 Wisdom','+1 Charisma'],
					action:function(char,derived,choice){
						switch (choice){
							case '+1 Strength':char.str+=1;break;
							case '+1 Wisdom':char.wis+=1;break;
							case '+1 Charisma':char.cha+=1;break;
						}
					}
				}
			);
			scope.choiceQueue.push({
					limit:1,
					choicePrompt:"Choose one",
					choices:[function(){
						var result=[];
						for (var passive of window.passives){
							if (passive.tags && passive.tags.has('Cat')){
								result.push(passive);
							}
						}
						return result;
					}],
					action:function(char,derived,choice){
						addPassive(char,choice);
					}
				}
			);
			scope.choiceQueue.push(helper.learnLanguage);
		}
	}
];