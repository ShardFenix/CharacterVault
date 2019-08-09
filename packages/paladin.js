
window.abilities.append([
	{
		name:"Lay on Hands",
		description:"Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level × 5.\n\nAs an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool.\n\nAlternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one.\n\nThis feature has no effect on undead and constructs.",
		maxChargesFunction:function(char){
			return 5 * classlevel(char,"Paladin");
		},
		onLongRest:function(){
			this.charges=this.maxCharges;
		},
		charges:5
	},{
		name:"Divine Sense",
		description:"The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears. As an action, you can open your awareness to detect such forces. Until the end of your next turn, you know the location of any celestial, fiend, or undead within 60 feet of you that is not behind total cover. You know the type (celestial, fiend, or undead) of any being whose presence you sense, but not its identity (the vampire Count Strahd von Zarovich, for instance). Within the same radius, you also detect the presence of any place or object that has been consecrated or desecrated, as with the hallow spell.\n\nYou can use this feature a number of times equal to 1 + your Charisma modifier. When you finish a long rest, you regain all expended uses.",
		onLongRest:function(){
			this.charges=this.maxCharges;
		}
		maxChargesFunction:function(char){
			return Math.max(1 + char.derived.cha, 1);
		}
	},{
		name:"Cleansing Touch",
		description:"You can use your action to end one spell on yourself or on one willing creature that you touch.\n\nYou can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain expended uses when you finish a long rest.",
		onLongRest:function(){
			this.charges=this.maxCharges;
		},
		maxChargesFunction:function(char){
			return Math.max(1 + char.derived.cha, 1);
		}
	}
]);

window.passives.append([
	{
		name:"Divine Smite",
		description:"When you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon's damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8 for each spell level higher than 1st, to a maximum of 5d8. The damage increases by 1d8 if the target is an undead or a fiend, to a maximum of 6d8."
	},{
		name:"Improved Divine Smite",
		description:"Whenever you hit a creature with a melee weapon, the creature takes an extra 1d8 radiant damage."
	},{
		name:"Aura of Protection",
		description:"Whenever you or a friendly creature within ${clevel($scope.char,'Paladin')<18?10:30} feet of you must make a saving throw, the creature gains a bonus to the saving throw equal to your Charisma modifier (minimum bonus of +1). You must be conscious to grant this bonus."
	},{
		name:"Aura of Courage",
		description:"You and friendly creatures within ${clevel($scope.char,'Paladin')<18?10:30} feet of you can't be frightened while you are conscious."
	}
]);

window.classes.push(
	{
		classname:"Paladin",
		name:"Paladin",
		description:"",
		levels:[
			{ //1, first player level
				summary:[
					{name:"Proficiencies",description:"All armor, all weapons, shields, WIS saves, CHA saves"},
					{name:"Starting Equipment",description:"\u2022 Any martial weapon\n\u2022 A martial weapon or shield\n\u2022 Five javelins or any simple melee weapon\n\u2022 A Priest's or Explorer's pack\n\u2022 Chain Mail and a Holy Symbol"},
					{name:"Skill Proficiencies",description:"Two from Athletics, Insight, Intimidation, Medicine, Persuasion, Religion"},
					findAbility("Divine Sense"),
					findAbility("Lay on Hands"),
				],
				"updates":[
					{
						choicePrompt:"You gain the following proficiencies",
						choices:["Light Armor","Medium Armor","Heavy Armor","Simple Weapons","Martial Weapons","Shieids","WIS saves","CHA saves"],
						action:function(char,derived,choice,$scope){
							char.maxHp=10;
							char.proficiencies.push("Light Armor");
							char.proficiencies.push("Medium Armor");
							char.proficiencies.push("Heavy Armor");
							char.proficiencies.push("Martial Weapons");
							char.proficiencies.push("Simple Weapons");
							char.saves.wis=1;
							char.saves.cha=1;
							addToInventory(findItem("Holy Symbol"));
							addToInventory(findItem("Chain Mail"));
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[listMartialWeapons],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:[listMartialWeapons,findItem("Shield")],
						action:function(char,derived,choice){
							addToInventory(char,findItem(choice));
						}
					},{
						choicePrompt:"Choose a starting weapon:",
						choices:["5 Javelins",listSimpleMeleeWeapons],
						action:function(char,derived,choice){
							if (choice==='5 Javelins'){
								addToInventory(char,findItem("Javelin",5));
							} else {
								addToInventory(char,findItem(choice));
							}
						}
					},{
						choicePrompt:"Choose a pack:",
						choices:[findItem("Priest's Pack"),findItem("Explorer's Pack")],
						action:function(char,derived,choice){
							openPack(choice);
						}
					},{
						choicePrompt:"Choose two skill proficiencies:",
						choices:[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Athletics","Insight","Medicine","Persuasion","Religion"].indexOf(skill.name)!=-1){
										result.push(skill.name);
									}
								}
							}
							return result;
						}],
						action:function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						choicePrompt:"Choose two skill proficiencies:",
						choices:[function(char){
							let result=[];
							for (let skill of char.skills){
								if (skill.mult===0){
									if (["Athletics","Insight","Medicine","Persuasion","Religion"].indexOf(skill.name)!=-1){
										result.push(skill.name);
									}
								}
							}
							return result;
						}],
						action:function(char,derived,choice){
							addProficiency(char,choice);
						}
					},{
						choicePrompt:"You gain the following",
						choices:[findAbility("Divine Sense"),findAbility("Lay on Hands")],
						action:function(char){
							addAbility(char,"Lay on Hands");
							addAbility(char,"Divine Sense");
						}
					}
				]
			},	{ // 1
				summary:[findAbility("Divine Sense"),findAbility("Lay on Hands")],
				"updates":[
					helper.hitDice10,
					{
						choicePrompt:"You gain the following",
						choices:[findAbility("Divine Sense"),findAbility("Lay on Hands")],
						action:function(char){
							addAbility(char,"Lay on Hands");
							addAbility(char,"Divine Sense");
						}
					}
				]
			}, { // 2
				"updates":[
					helper.hitDice10,
					helper.chooseFightingStyle,
					{
						summary:findPassive("Divine Smite"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Divine Smite")],
						action:function(char,derived,choice){
							addPassive(char,"Divine Smite");
						}
					}
				]
			}, { // 3
				"updates":[
					helper.hitDice10,
					{
						summary:findPassive("Divine Health"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Divine Health")],
						action:function(char){
							addPassive(char,"Divine Health");
							addAbility(char,"Channel Divinity");
						}
					},{
						summary:{name:"Sacred Oath",description:"Choose your Sacred Oath"},
						"choicePrompt":"Choose your Sacred Oath",
						"choices":[listSpecializations],
						"action":function(char,derived,choice){
							addSubclass(char,"Paladin",choice);
						}
					}
					
				]
			}, { // 4
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//5
				"updates":[
					helper.hitDice10,
					{
						summary:findPassive("Extra Attacks x1"),
						choicePrompt:"You gain the following:",
						choices:[findPassive("Extra Attacks x1")],
						action:function(char,derived){
							addPassive(char,"Extra Attacks x1");
						}
					}
				]
			},{//6
				"updates":[
					helper.hitDice10,
					{
						summary:findPassive("Aura of Protection"),
						choicePrompt:"You gain the following:",
						choices:[findPassive("Aura of Protection")],
						action:function(char,derived){
							addPassive(char,"Aura of Protection");
						}
					}
				]
			},{//7
				"updates":[
					helper.hitDice10,
				]
			},{//8
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//9
				"updates":[
					helper.hitDice10,
				]
			},{//10
				"updates":[
					helper.hitDice10,
					{
						summary:findPassive("Aura of Courage"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Aura of Courage")],
						action:function(char){
							addPassive(char,"Aura of Courage");
						}
					}
				]
			},{//11
				"updates":[
					helper.hitDice10,
					{
						summary:findPassive("Improved Divine Smite"),
						choicePrompt:"You gain the following",
						choices:[findPassive("Improved Divine Smite")],
						action:function(char){
							addPassive(char,"Improved Divine Smite");
						}
					}
				]
			},{//12
				"updates":[
					helper.hitDice10,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//13
				"updates":[
					helper.hitDice10,
				]
			},{//14
				"updates":[
					helper.hitDice10,
					{
						summary:findAbility("Cleansing Touch"),
						choicePrompt:"You gain the following",
						choices:[findAbility("Cleansing Touch")],
						action:function(char){
							addAbility(char,"Cleansing Touch");
						}
					}
				]
			},{//15
				"updates":[
					helper.hitDice10,
				]
			},{//16
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//17
				"updates":[
					helper.hitDice10
				]
			},{//18
				"updates":[
					helper.hitDice10,
				]
			},{//19
				"updates":[
					helper.hitDice8,
					helper.attributeOrFeat,
					helper.chooseFeat,
					helper.increaseAttribute,
					helper.increaseAttribute
				]
			},{//20
				"updates":[
					helper.hitDice10
				]
			}
		]
	}
);

window.subclasses.push(
	{
		classname:"Paladin",
		name:"",
		subclass:"",
		description:"",
		levels:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
		]
	}
);
