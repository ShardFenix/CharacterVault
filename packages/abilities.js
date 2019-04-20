window.abilities=[
	{
		name:"Lv 1 Spell",
		maxChargesFunction:spellSlots1,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 2 Spell",
		maxChargesFunction:spellSlots2,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 3 Spell",
		maxChargesFunction:spellSlots3,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 4 Spell",
		maxChargesFunction:spellSlots4,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
		}
	},{
		name:"Lv 5 Spell",
		maxChargesFunction:spellSlots5,
		description:"",
		onLongRest:function(char,scope){
			this.charges=this.maxCharges;
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
		description:"Starting at 10th level, you can spend 1 minute creating camouflage for yourself. You must have access to fresh mud, dirt, plants, soot, and other naturally occurring materials with which to create your camouflage.\n\nOnce you are camouflaged in this way, you can try to hide by pressing yourself up against a solid surface, such as a tree or wall, that is at least as tall and wide as you are. You gain a +10 bonus to Dexterity (Stealth) checks as long as you remain there without moving or taking actions. Once you move or take an action or a reaction, you must camouflage yourself again to gain this benefit."
	}
	
];