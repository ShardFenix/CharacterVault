window.lootTables=[
	{tier:0,upgradeRoll:1,maxRoll:100},
	{tier:1,upgradeRoll:10,maxRoll:1000},
	{tier:2,upgradeRoll:100,maxRoll:10000},
	{tier:3,upgradeRoll:null}
];

let wondrousChance={upgradeRoll:100,maxRoll:1000};

function genTier(luck){
	let tier=0;
	let done=false;
	while (lootTables[tier].upgradeRoll){
		let rand = Math.rand(0,lootTables[tier].maxRoll + luck);
		if (rand > lootTables[tier].upgradeRoll + luck){
			return tier;
		} else {
			tier++;
		}
	}
	return tier;
}

var baseItems=[];
var wondrousItems=[[],[],[],[]];
for (item of window.items){
	if (item.categories.includes("Wondrous")){
		let rarity=item.rarity!==undefined?item.rarity:1;
		for (let i=0;i<rarity;i++){
			wondrousItems[item.tier?item.tier:0].push(item);
		}
	} else if (!item.categories.includes("Instrument")){
		let rarity=item.rarity!==undefined?item.rarity:1;
		for (let i=0;i<rarity;i++){
			baseItems.push(item);
		}
	}
}
	
function randomItem(){
	return angular.copy(baseItems[Math.rand(0,baseItems.length)]);
}

function generateLoot(luck){
	let tier = genTier(luck);
	if (tier===0){
		return randomItem();
	}
	let rand = Math.rand(0,wondrousChance.maxRoll + luck);
	if (rand > wondrousChance.upgradeRoll + luck){
		//generate random wondrous of this tier
		if (wondrousItems[tier].length>0){
			rand=Math.rand(0,wondrousItems[tier].length);
			return wondrousItems[tier][rand];
		}
	}
	let baseItem = randomItem();
	let availableMods=[];
	for (let mod of itemMods){
		if (mod.tier===tier && mod.appliesTo(baseItem)){
			for (let i=0;i<mod.rarity;i++){
				availableMods.push(mod);
			}
		}
	}
	rand = Math.rand(0,availableMods.length);
	let mod = availableMods[rand];
	if (typeof mod === 'undefined'){
		return baseItem;
	}
	if (baseItem.description){
		baseItem.description = baseItem.description+'\n\n'+mod.description;
	} else {
		baseItem.description = mod.description;
	}
	if (mod.suffix){
		baseItem.name = baseItem.name + mod.suffix;
	}
	if (mod.prefix){
		baseItem.name = mod.prefix + baseItem.name;
	}
	if (mod.attunement){
		baseItem.description="(Requires Attunement)\n\n" + baseItem.description;
	}
	return baseItem;
}

window.itemMods=[
	{
		name:"+1",
		description:"This item has a +1 bonus to attack and damage rolls.",
		tier:1,
		rarity:3,
		suffix:" +1",
		appliesTo:function(item){return item.categories.hasAny("Weapon");}
	},{
		name:"+2",
		description:"This item has a +2 bonus to attack and damage rolls.",
		tier:2,
		rarity:3,
		suffix:" +2",
		appliesTo:function(item){return item.categories.hasAny("Weapon");}
	},{
		name:"+3",
		description:"This item has a +3 bonus to attack and damage rolls.",
		tier:3,
		rarity:2,
		suffix:" +3",
		appliesTo:function(item){return item.categories.hasAny("Weapon");}
	},{
		name:"+1",
		description:"This item grants you a +1 bonus to AC while you wear it.",
		tier:1,
		rarity:3,
		suffix:" +1",
		appliesTo:function(item){return item.categories.hasAny("Armor");}
	},{
		name:"+2",
		description:"This item grants you a +2 bonus to AC while you wear it.",
		tier:2,
		rarity:3,
		suffix:" +1",
		appliesTo:function(item){return item.categories.hasAny("Armor");}
	},{
		name:"+3",
		description:"This item grants you a +3 bonus to AC while you wear it.",
		tier:3,
		rarity:2,
		suffix:" +1",
		appliesTo:function(item){return item.categories.hasAny("Armor");}
	},{
		name:"Vorpal",
		description:"Whenever you score a critical hit on a creature that has heads, you decapitate one of its heads.",
		tier:3,
		prefix:"Vorpal ",
		attunement:true,
		appliesTo:function(item){
			return item.categories.hasAll("Weapon","Melee");
		}
	},{
		name:"Keen",
		description:"The critical range of this weapon is increased by 1.",
		tier:2,
		prefix:"Keen ",
		appliesTo:function(item){return item.categories.hasAny("Weapon");}
	},{
		name:"Eagle",
		description:"You can attack up to this weapon's maximum range without taking disadvantage due to distance. In addition, you don't get disadvantage from attacking a prone target.",
		tier:1,
		suffix:" of the Eagle",
		appliesTo:function(item){return item.categories.hasAll("Weapon","Ranged");}
	},{
		name:"Heavy",
		description:"This weapon deals full damage to creatures with bludgeoning resistance, and half damage to creatures with bludgeoning immunity.",
		tier:1,
		prefix:"Heavy ",
		appliesTo:function(item){return item.categories.hasAll("Weapon","Melee") && item.damageType=='Bludgeoning';}
	},{
		name:"Undead Bane",
		description:"Any undead struck by this weapon must make a Wisdom saving throw (DC 15) or be turned for 30 seconds.",
		tier:2,
		suffix:" of Sanctity",
		appliesTo:function(item){return item.categories.hasAny("Weapon");}
	},{
		name:"Lucky",
		description:"Once per day, you can reroll one attack roll, ability check, or saving throw. You must use the second roll.",
		tier:2,
		prefix:"Lucky ",
		appliesTo:function(item){return true;}
	},{
		name:"Adamantine",
		description:"You are immune to the extra damage from critical hits.",
		tier:2,
		prefix:"Adamantine ",
		appliesTo:function(item){return item.categories.hasAny("Armor");}
	},{
		name:"Giant Slaying",
		description:"When you hit a giant with this weapon, it takes an additional 2d6 damage of the weapon's type and must succeed on a DC 15 Strength saving throw or fall prone.",
		tier:1,
		suffix:" of Giant Slaying",
		appliesTo:function(item){return item.categories.hasAny("Weapon","Ammunition");}
	},{
		name:"Dragon Slaying",
		description:"When you hit a dragon with this weapon, it takes an additional 3d6 damage of the weapon's type.",
		tier:1,
		suffix:" of Dragon Slaying",
		appliesTo:function(item){return item.categories.hasAny("Weapon","Ammunition");}
	},{
		name:"Acid Resistance",
		description:"You have resistance to Acid damage.",
		tier:2,
		suffix:" of Acid Resistance",
		appliesTo:function(item){return item.categories.hasAny("Armor","Jewelry");}
	},{
		name:"Cold Resistance",
		description:"You have resistance to Cold damage.",
		tier:2,
		suffix:" of Cold Resistance",
		appliesTo:function(item){return item.categories.hasAny("Armor","Jewelry");}
	},{
		name:"Fire Resistance",
		description:"You have resistance to Fire damage.",
		tier:2,
		suffix:" of Fire Resistance",
		appliesTo:function(item){return item.categories.hasAny("Armor","Jewelry");}
	},{
		name:"Force Resistance",
		description:"You have resistance to Force damage.",
		tier:2,
		suffix:" of Force Resistance",
		appliesTo:function(item){return item.categories.hasAny("Armor","Jewelry");}
	},{
		name:"Lightning Resistance",
		description:"You have resistance to lightning damage.",
		tier:2,
		suffix:" of Lightning Resistance",
		appliesTo:function(item){return item.categories.hasAny("Armor","Jewelry");}
	},{
		name:"Necrotic Resistance",
		description:"You have resistance to Necrotic damage.",
		tier:2,
		suffix:" of Necrotic Resistance",
		appliesTo:function(item){return item.categories.hasAny("Armor","Jewelry");}
	},{
		name:"Poison Resistance",
		description:"You have resistance to Poison damage.",
		tier:2,
		suffix:" of Poison Resistance",
		appliesTo:function(item){return item.categories.hasAny("Armor","Jewelry");}
	},{
		name:"Psychic Resistance",
		description:"You have resistance to Psychic damage.",
		tier:2,
		suffix:" of Psychic Resistance",
		appliesTo:function(item){return item.categories.hasAny("Armor","Jewelry");}
	},{
		name:"Radiant Resistance",
		description:"You have resistance to Radiant damage.",
		tier:2,
		suffix:" of Radiant Resistance",
		appliesTo:function(item){return item.categories.hasAny("Armor","Jewelry");}
	},{
		name:"Thunder Resistance",
		description:"You have resistance to Thunder damage.",
		tier:2,
		suffix:" of Thunder Resistance",
		appliesTo:function(item){return item.categories.hasAny("Armor","Jewelry");}
	},{
		name:"Arrow Catching",
		description:"You gain a +2 bonus to AC against ranged attacks while you wield this shield. This bonus is in addition to the shield's normal bonus to AC. In addition, whenever an attacker makes a ranged attack against a target within 5 feet of you, you can use your reaction to become the target of the attack instead.",
		tier:2,
		suffix: " of Arrow Catching",
		attunement:true,
		appliesTo:function(item){return item.categories.includes("Shield");}
	},{
		name:"Dancing",
		description:"You can use a bonus action to toss this magic sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of it. The sword uses your attack roll and ability score modifier to damage rolls.\n\nWhile the sword hovers, you can use a bonus action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same bonus action, you can cause the sword to attack one creature within 5 feet of it.\n\nAfter the hovering sword attacks for the fourth time, it flies up to 30 feet and tries to return to your hand. If you have no hand free, it falls to the ground at your feet. If the sword has no unobstructed path to you, it moves as close to you as it can and then falls to the ground. It also ceases to hover if you grasp it or move more than 30 feet away from it.",
		tier:3,
		prefix: "Dancing ",
		appliesTo:function(item){
			return ["Greatsword","Longsword","Rapier","Scimitar","Shortsword"].includes(item.name);
		},
		attunement:true
	},{
		name:"Defender",
		description:"You gain a +3 bonus to attack and damage rolls made with this magic weapon.\n\nThe first time you attack with the sword on each of your turns, you can transfer some or all of the sword's bonus to your Armor Class, instead of using the bonus on any attacks that turn. For example, you could reduce the bonus to your attack and damage rolls to +1 and gain a +2 bonus to AC. The adjusted bonuses remain in effect until the start of your next turn, although you must hold the sword to gain a bonus to AC from it.",
		tier:3,
		prefix: "Defender ",
		appliesTo:function(item){
			return ["Greatsword","Longsword","Rapier","Scimitar","Shortsword"].includes(item.name);
		},
		attunement:true
	},{
		name:"Flame Tongue",
		description:"You can use a bonus action to speak this magic sword's command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword.",
		tier:3,
		prefix: "Flame Tongue ",
		appliesTo:function(item){
			return ["Greatsword","Longsword","Rapier","Scimitar","Shortsword"].includes(item.name);
		},
		attunement:true
	},{
		name:"Frost Brand",
		description:"When you hit with an attack using this magic sword, the target takes an extra 1d6 cold damage. In addition, while you hold the sword, you have resistance to fire damage.\n\nIn freezing temperatures, the blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet.\n\nWhen you draw this weapon, you can extinguish all nonmagical flames within 30 feet of you. This property can be used no more than once per hour.",
		tier:2,
		prefix: "Frost Brand ",
		appliesTo:function(item){
			return ["Greatsword","Longsword","Rapier","Scimitar","Shortsword"].includes(item.name);
		},
		attunement:true
	},{
		name:"Glamoured Armor",
		description:"While wearing this armor, you gain a +1 bonus to AC. You can also use a bonus action to speak the armor's command word and cause the armor to assume the appearance of a normal set of clothing or some other kind of armor. You decide what it looks like, including color, style, and accessories, but the armor retains its normal bulk and weight. The illusory appearance lasts until you use this property again or remove the armor.",
		tier:2,
		prefix: "Glamoured ",
		attunement:true,
		appliesTo:function(item){
			return ["Leather Armor","Studded Leather"].includes(item.name);
		}
	},{
		name:"Lightning Javelin",
		description:"This javelin is a magic weapon. When you hurl it and speak its command word, it transforms into a bolt of lightning, forming a line 5 feet wide that extends out from you to a target within 120 feet. Each creature in the line excluding you and the target must make a DC 13 Dexterity saving throw, taking 4d6 lightning damage on a failed save, and half as much damage on a successful one. The lightning bolt turns back into a javelin when it reaches the target. Make a ranged weapon attack against the target. On a hit, the target takes damage from the javelin plus 4d6 lightning damage.\n\nThe javelin's property can't be used again until the next dawn. In the meantime, the javelin can still be used as a magic weapon.",
		tier:2,
		prefix: "Lightning ",
		attunement:true,
		appliesTo:function(item){
			return item.name==='Javelin';
		}
	},{
		name:"Mariner's Armor",
		description:"While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
		tier:1,
		prefix: "Mariner's ",
		attunement:true,
		appliesTo:function(item){
			return item.categories.includes("Armor");
		}
	},{
		name:"Nine Lives Stealer",
		description:"You gain a +2 bonus to attack and damage rolls made with this magic weapon.\n\nThe sword has 1d8+1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, it must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body (a construct or an undead is immune). The sword loses 1 charge if the creature is slain. When the sword has no charges remaining, it loses this property.",
		tier:3,
		prefix: "Extinguishing ",
		attunement:true,
		appliesTo:function(item){
			return ["Greatsword","Longsword","Rapier","Scimitar","Shortsword"].includes(item.name);
		}
	},{
		name:"Ring of Evasion",
		description:"This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. When you fail a Dexterity saving throw while wearing it, you can use your reaction to expend 1 of its charges to succeed on that saving throw instead.",
		tier:2,
		suffix: " of Evasion",
		attunement:true,
		appliesTo:function(item){
			return item.name==='Ring';
		}
	},{
		name:"Ring of Feather Falling",
		description:"When you fall while wearing this ring, you descend 60 feet per round and take no damage from falling.",
		tier:1,
		suffix: " of Feather Falling",
		attunement:true,
		appliesTo:function(item){
			return item.name==='Ring';
		}
	},{
		name:"Ring of Free Action",
		description:"While you wear this ring, difficult terrain doesn't cost you extra movement. In addition, magic can neither reduce your speed nor cause you to be paralyzed or restrained.",
		tier:3,
		suffix: " of Freedom",
		attunement:true,
		appliesTo:function(item){
			return item.name==='Ring';
		}
	},{
		name:"Ring of Invisibility",
		description:"While wearing this ring, you can turn invisible as an action. Anything you are wearing or carrying is invisible with you. You remain invisible until the ring is removed, until you attack or cast a spell, or until you use a bonus action to become visible again.",
		tier:2,
		suffix: " of Invisibility",
		attunement:true,
		appliesTo:function(item){
			return item.name==='Ring';
		}
	},{
		name:"Ring of Jumping",
		description:"While wearing this ring, you can cast the jump spell from it as a bonus action at will, but can target only yourself when you do so.",
		tier:1,
		suffix: " of Jumping",
		appliesTo:function(item){
			return item.name==='Ring';
		}
	},{
		name:"Ring of Protection",
		description:"You gain a +1 bonus to AC and saving throws while wearing this ring.",
		tier:1,
		rarity:10,
		suffix: " of Protection",
		attunement:true,
		appliesTo:function(item){
			return item.name==='Ring';
		}
	},{
		name:"Ring of Spell Storing",
		description:"This ring stores spells cast into it, holding them until the attuned wearer uses them. The ring can store up to 5 levels worth of spells at a time. When found, it contains 1d6-1 levels of stored spells chosen by the DM.\n\nAny creature can cast a spell of 1st through 5th level into the ring by touching the ring as the spell is cast. The spell has no effect, other than to be stored in the ring. If the ring can't hold the spell, the spell is expended without effect. The level of the slot used to cast the spell determines how much space it uses.\n\nWhile wearing this ring, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell. The spell cast from the ring is no longer stored in it, freeing up space.",
		tier:3,
		suffix: " of Spell Storing",
		attunement:true,
		appliesTo:function(item){
			return item.name==='Ring';
		}
	},{
		name:"Ring of Spell Turning",
		description:"While wearing this ring, you have advantage on saving throws against any spell that targets only you (not in an area of effect). In addition, if you roll a 20 for the save and the spell is 7th level or lower, the spell has no effect on you and instead targets the caster, using the slot level, spell save DC, attack bonus, and spellcasting ability of the caster.",
		tier:3,
		suffix: " of Spell Turning",
		attunement:true,
		appliesTo:function(item){
			return item.name==='Ring';
		}
	},{
		name:"Ring of Swimming",
		description:"While wearing this ring, you have a swimming speed of 40 feet.",
		tier:1,
		suffix: " of Swimming",
		appliesTo:function(item){
			return item.name==='Ring';
		}
	},{
		name:"Ring of the Ram",
		description:"This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can use an action to expend 1 to 3 of its charges to attack one creature you can see within 60 feet of you. The ring produces a spectral ram's head and makes its attack roll with a +7 bonus. On a hit, for each charge you spend, the target takes 2d10 force damage and is pushed 5 feet away from you.\n\nAlternatively, you can expend 1 to 3 of the ring's charges as an action to try to break an object you can see within 60 feet of you that isn't being worn or carried. The ring makes a Strength check with a +5 bonus for each charge you spend.",
		tier:2,
		suffix: " of the Ram",
		attunement:true,
		appliesTo:function(item){
			return item.name==='Ring';
		}
	},{
		name:"Ring of Three Wishes",
		description:"While wearing this ring, you can use an action to expend 1 of its 3 charges to cast the wish spell from it. The ring becomes nonmagical when you use the last charge.",
		tier:3,
		suffix: " of Three Wishes",
		appliesTo:function(item){
			return item.name==='Ring';
		}
	},{
		name:"Ring of Water Walking",
		description:"While wearing this ring, you can stand on and move across any liquid surface as if it were solid ground.",
		tier:1,
		suffix: " of Water Walking",
		appliesTo:function(item){
			return item.name==='Ring';
		}
	},{
		name:"Sentinel Shield",
		description:"While holding this shield, you have advantage on initiative rolls and Wisdom (Perception) checks. The shield is emblazoned with a symbol of an eye.",
		tier:1,
		prefix: "Sentinel ",
		appliesTo:function(item){
			return item.name==='Shield';
		}
	},{
		name:"Spellguard Shield",
		description:"While holding this shield, you have advantage on saving throws against spells and other magical effects, and spell attacks have disadvantage against you.",
		tier:2,
		prefix: "Spellguard ",
		attunement:true,
		appliesTo:function(item){
			return item.name==='Shield';
		}
	},{
		name:"Life Stealing",
		description:"When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 3d6 necrotic damage if it isn't a construct or an undead. You gain temporary hit points equal to the necrotic damage dealt.",
		tier:1,
		prefix: "Vampyric ",
		attunement:true,
		appliesTo:function(item){
			return item.categories.includes('Weapon');
		}
	},{
		name:"Warning",
		description:"This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can't be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
		tier:1,
		suffix: " of Warning",
		attunement:true,
		appliesTo:function(item){
			return item.categories.includes('Weapon');
		}
	},{
		name:"Weapon of Vengeance",
		description:"You gain a +1 bonus to attack and damage rolls made with this magic weapon.\n\nCurse. This weapon is cursed and possessed by a vengeful spirit. Becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the weapon, keeping it on your person at all times. While attuned to this weapon, you have disadvantage on attack rolls made with weapons other than this one\n\nIn addition, while the weapon is on your person, you must succeed on a DC 15 Wisdom saving throw whenever you take damage in combat. On a failed save you must attack the creature that damaged you until you drop to 0 hit points or it does, or until you can't reach the creature to make a melee attack against it.\n\nYou can break the curse in the usual ways. Alternatively, casting banishment on the weapon forces the vengeful spirit to leave it. The weapon then becomes a +1 weapon with no other properties.",
		tier:1,
		suffix: " of Vengeance",
		attunement:true,
		appliesTo:function(item){
			return item.categories.hasAll('Weapon','Melee');
		}
	},{
		name:"Vicious Weapon",
		description:"When you land a critical hit with this weapon, the target takes an additional 2d6 damage of the weapon's type. These dice are not doubled by the crit.",
		tier:1,
		prefix: "Vicious ",
		attunement:true,
		appliesTo:function(item){
			return item.categories.hasAll('Weapon','Melee');
		}
	}
];
