window.abilities=[
	{
		name:"Lv 1 Spell",
		maxChargesFunction:spellSlots1,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		},
		onShortRest:function(char,scope){
			let warlockLevel=classLevel(scope.char,"Warlock");
			switch (warlockLevel){
				case 1: this.charges=Math.min(this.maxCharges,this.charges+1);break;
				case 2: this.charges=Math.min(this.maxCharges,this.charges+2);break;
			}
		}
	},{
		name:"Lv 2 Spell",
		maxChargesFunction:spellSlots2,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		},
		onShortRest:function(char,scope){
			let warlockLevel=classLevel(scope.char,"Warlock");
			switch (warlockLevel){
				case 3: 
				case 4: this.charges=Math.min(this.maxCharges,this.charges+2);break;
			}
		}
	},{
		name:"Lv 3 Spell",
		maxChargesFunction:spellSlots3,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		},
		onShortRest:function(char,scope){
			let warlockLevel=classLevel(scope.char,"Warlock");
			switch (warlockLevel){
				case 5: 
				case 6: this.charges=Math.min(this.maxCharges,this.charges+2);break;
			}
		}
	},{
		name:"Lv 4 Spell",
		maxChargesFunction:spellSlots4,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		},
		onShortRest:function(char,scope){
			let warlockLevel=classLevel(scope.char,"Warlock");
			switch (warlockLevel){
				case 7: 
				case 8: this.charges=Math.min(this.maxCharges,this.charges+2);break;
			}
		}
	},{
		name:"Lv 5 Spell",
		maxChargesFunction:spellSlots5,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		},
		onShortRest:function(char,scope){
			let warlockLevel=classLevel(scope.char,"Warlock");
			switch (warlockLevel){
				case 9: 
				case 10: this.charges=Math.min(this.maxCharges,this.charges+2);break;
				case 11:
				case 12:
				case 13:
				case 14:
				case 15:
				case 16: this.charges=Math.min(this.maxCharges,this.charges+3);break;
				case 17:
				case 18:
				case 19:
				case 20: this.charges=Math.min(this.maxCharges,this.charges+4);break;
			}
		}
	},{
		name:"Lv 6 Spell",
		maxChargesFunction:spellSlots6,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 7 Spell",
		maxChargesFunction:spellSlots7,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 8 Spell",
		maxChargesFunction:spellSlots8,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 9 Spell",
		maxChargesFunction:spellSlots9,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Superiority d6 (Martial Adept)",
		description:"You can use one of your Maneuvers, rolling a d6 for it.",
		maxCharges:1,
		onShortRest:function(char,scope){
			this.charges=1;
		}
	},{
		name:"Superiority d8",
		description:"You can use one of your Maneuvers, rolling a d8 for it.",
		maxCharges:4,
		maxChargesFunction:function(char){
			return ladder(classLevel(char,"Fighter"),0,4,7,5,15,6);
		},
		onShortRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Superiority d10",
		description:"You can use one of your Maneuvers, rolling a d10 for it.",
		maxCharges:4,
		maxChargesFunction:function(char){
			return ladder(classLevel(char,"Fighter"),0,4,7,5,15,6);
		},
		onShortRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Superiority d12",
		description:"You can use one of your Maneuvers, rolling a d12 for it.",
		maxCharges:6,
		onShortRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lucky",
		description:"You have inexplicable luck that seems to kick in at just the right moment.\nWhenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the d20s is used for the attack roll, ability check, or saving throw.\nYou can also spend one luck point when an attack roll is made against you. Roll a d20, and then choose whether the attack uses the attacker's roll or yours. If more than one creature spends a luck point to influence the outcome of a roll, the points cancel each other out; no additional dice are rolled.\nYou regain your expended luck points when you finish a long rest.",
		maxCharges:3,
		charges:3,
		onLongRest:function(char,scope){
			this.charges=3;
		}
	}
];

window.passives=[
	{
		name:"Stonecunning",
		description:"Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.",
		dmHide:true
	},{
		name:"Trance",
		description:"You do not need to sleep. You instead meditate for 4 hours, resulting in the equivalent of a long rest.",
		dmHide:true
	},{
		name:"Dwarven Resilience",
		description:"You have advantage on saving throws against poison, and you have resistance against poison damage."
	},{
		name:"Darkvision",
		description:"You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray."
	},{
		name:"Evasion",
		description:"Your instinctive agility lets you dodge out of the way of certain area effects. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail."
	},{
		name:"Archery",
		description:"You gain a +2 bonus to attack rolls you make with ranged weapons."
	},{
		name:"Defense",
		description:"While you are wearing armor, you gain a +1 bonus to AC."
	},{
		name:"Dueling",
		description:"When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon."
	},{
		name:"Great Weapon Fighting",
		description:"When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit."
	},{
		name:"Protection",
		description:"When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield."
	},{
		name:"Two-Weapon Fighting",
		description:"When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack."
	},{
		name:"Extra Attacks x1",
		description:"You can attack twice when you take the attack action on your turn."
	},{
		name:"Extra Attacks x2",
		description:"You can attack three times when you take the attack action on your turn."
	},{
		name:"Extra Attacks x3",
		description:"You can attack four times when you take the attack action on your turn."
	},{
		name:"Hide in Plain Sight",
		description:"Starting at 10th level, you can spend 1 minute creating camouflage for yourself. You must have access to fresh mud, dirt, plants, soot, and other naturally occurring materials with which to create your camouflage.\n\nOnce you are camouflaged in this way, you can try to hide by pressing yourself up against a solid surface, such as a tree or wall, that is at least as tall and wide as you are. You gain a +10 bonus to Dexterity (Stealth) checks as long as you remain there without moving or taking actions. Once you move or take an action or a reaction, you must camouflage yourself again to gain this benefit.",
		dmHide:true
	},{
		name:"Maneuver: Commander's Strike",
		description:"When you take the Attack action on your turn, you can forgo one of your attacks and use a bonus action to direct one of your companions to strike. When you do so, choose a friendly creature who can see or hear you and expend one superiority die. That creature can immediately use its reaction to make one weapon attack, adding the superiority die to the attack's damage roll."
	},{
		name:"Maneuver: Disarming Attack",
		description:"When you hit a creature with a weapon attack, you can expend one superiority die to attempt to disarm the target, forcing it to drop one item of your choice that it's holding. You add the superiority die to the attack's damage roll, and the target must make a Strength saving throw. On a failed save, it drops the object you choose. The object lands at its feet."
	},{
		name:"Maneuver: Distracting Strike",
		description:"When you hit a creature with a weapon attack, you can expend one superiority die to distract the creature, giving your allies an opening. You add the superiority die to the attack's damage roll. The next attack roll against the target by an attacker other than you has advantage if the attack is made before the start of your next turn."
	},{
		name:"Maneuver: Evasive Footwork",
		description:"When you move, you can expend one superiority die, rolling the die and adding the number rolled to your AC until you stop moving."
	},{
		name:"Maneuver: Feinting Attack",
		description:"You can expend one superiority die and use a bonus action on your turn to feint, choosing one creature within 5 feet of you as your target. You have advantage on your next attack roll this turn against that creature. If that attack hits, add the superiority die to the attack's damage roll."
	},{
		name:"Maneuver: Goading Attack",
		description:"When you hit a creature with a weapon attack, you can expend one superiority die to attempt to goad the target into attacking you. You add the superiority die to the attack's damage roll, and the target must make a Wisdom saving throw. On a failed save, the target has disadvantage on all attack rolls against targets other than you until the end of your next turn."
	},{
		name:"Maneuver: Lunging Attack",
		description:"When you make a melee weapon attack on your turn, you can expend one superiority die to increase your reach for that attack by 5 feet. If you hit, you add the superiority die to the attack's damage roll."
	},{
		name:"Maneuver: Maneuvering ttack",
		description:"When you hit a creature with a weapon attack, you can expend one superiority die to maneuver one of your comrades into a more advantageous position. You add the superiority die to the attack's damage roll, and you choose a friendly creature who can see or hear you. That creature can use its reaction to move up to half its speed without provoking opportunity attacks from the target of your attack."
	},{
		name:"Maneuver: Menacing Attack",
		description:"When you hit a creature with a weapon attack, you can expend one superiority die to attempt to frighten the target. You add the superiority die to the attack's damage roll, and the target must make a Wisdom saving throw. On a failed save, it is frightened of you until the end of your next turn."
	},{
		name:"Maneuver: Parry",
		description:"When another creature damages you with a melee attack, you can use your reaction and expend one superiority die to reduce the damage by the number you roll on your superiority die + your Dexterity modifier."
	},{
		name:"Maneuver: Precision Attack",
		description:"When you make a weapon attack roll against a creature, you can expend one superiority die to add it to the roll. You can use this maneuver before or after making the attack roll, but before any effects of the attack are applied."
	},{
		name:"Maneuver: Pushing Attack",
		description:"When you hit a creature with a weapon attack, you can expend one superiority die to attempt to drive the target back. You add the superiority die to the attack's damage roll, and if the target is Large or smaller, it must make a Strength saving throw. On a failed save, you push the target up to 15 feet away from you."
	},{
		name:"Maneuver: Rally",
		description:"On your turn, you can use a bonus action and expend one superiority die to bolster the resolve of one of your companions. When you do so, choose a friendly creature who can see or hear you. That creature gains temporary hit points equal to the superiority die roll + your Charisma modifier."
	},{
		name:"Maneuver: Riposte",
		description:"When a creature misses you with a melee attack, you can use your reaction and expend one superiority die to make a melee weapon attack against the creature. If you hit, you add the superiority die to the attack's damage roll."
	},{
		name:"Maneuver: Sweeping Attack",
		description:"When you hit a creature with a melee weapon attack, you can expend one superiority die to attempt to damage another creature with the same attack. Choose another creature within 5 feet of the original target and within your reach. If the original attack roll would hit the second creature, it takes damage equal to the number you roll on your superiority die. The damage is of the same type dealt by the original attack."
	},{
		name:"Maneuver: Trip Attack",
		description:"When you hit a creature with a weapon attack, you can expend one superiority die to attempt to knock the target down. You add the superiority die to the attack's damage roll, and if the target is Large or smaller, it must make a Strength saving throw. On a failed save, you knock the target prone."
	},{
		name:"Mask of the Wild",
		description:"You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
		dmHide:true
	},{
		name:"Fey Ancestry",
		description:"You have advantage on saving throws against being charmed, and magic can't put you to sleep."
	}
	
];