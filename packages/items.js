let instrumentDescription=function(){
	return "If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument.nA bard can use a musical instrument as a spellcasting focus, substituting it for any material component that does not list a cost.\nEach type of musical instrument requires a separate proficiency.\n\nProficiency with a musical instrument indicates you are familiar with the techniques used to play it. You also have knowledge of some songs commonly performed with that instrument.\n\u2022 History. Your expertise aids you in recalling lore related to your instrument.\n\u2022 Performance. Your ability to put on a good show is improved when you incorporate an instrument into your act.\n\u2022 Compose a Tune. As part of a long rest, you can compose a new tune and lyrics for your instrument. You might use this ability to impress a noble or spread scandalous rumors with a catchy tune.";
}

let ioun="An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\n";

window.items=[
	{
		name:'Club',
		description:'',
		categories:['Simple','Melee','Weapon'],
		count:1,
		damage1:'1d4',
		damageType:"Bludgeoning",
		value:10,
		proficiencies:['Simple Weapons','Clubs']
	},{
		name:'Sickle',
		description:'',
		categories:['Simple','Melee','Weapon'],
		count:1,
		damage1:'1d4',
		damageType:"Slashing",
		value:100,
		proficiencies:['Simple Weapons','Sickle']
	},{
		name:'Spear',
		description:'',
		categories:['Simple','Melee','Weapon'],
		count:1,
		damage1:'1d6',
		damage2:'1d8',
		damageType:"Piercing",
		throwRange:[20,60],
		value:100,
		proficiencies:['Simple Weapons','Spears']
	},{
		name:'Sling',
		description:'',
		categories:['Simple','Ranged','Weapon'],
		count:1,
		damage2:'1d4',
		damageType:"Bludgeoning",
		throwRange:[30,120],
		value:10,
		proficiencies:['Simple Weapons','Slings']
	},{
		name:'Greatclub',
		description:'',
		categories:['Simple','Melee','Weapon'],
		count:1,
		damage2:'1d8',
		damageType:"Bludgeoning",
		value:20,
		proficiencies:['Simple Weapons','Greatclubs']
	},{
		name:'Quarterstaff',
		description:'',
		categories:['Simple','Melee','Weapon'],
		count:1,
		damage1:'1d6',
		damage2:'1d8',
		damageType:"Bludgeoning",
		value:20,
		proficiencies:['Simple Weapons','Staves']
	},{
		name:'Longsword',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage1:'1d8',
		damage2:'1d10',
		damageType:"Slashing",
		value:150,
		proficiencies:['Martial Weapons','Longswords']
	},{
		name:'Dagger',
		description:'',
		categories:['Simple','Melee','Weapon'],
		count:1,
		damage1:'1d4',
		damageType:"Piercing",
		finesse:true,
		throwRange:[20,60],
		value:200,
		proficiencies:['Simple Weapons','Daggers']
	},{
		name:'Light Hammer',
		description:'',
		categories:['Simple','Melee','Weapon'],
		count:1,
		damage1:'1d4',
		damageType:"Bludgeoning",
		throwRange:[20,60],
		value:200,
		proficiencies:['Simple Weapons','Light Hammers']
	},{
		name:'Handaxe',
		description:'',
		categories:['Simple','Melee','Weapon'],
		count:1,
		damage1:'1d6',
		damageType:"Slashing",
		throwRange:[20,60],
		value:500,
		proficiencies:['Simple Weapons','Handaxes']
	},{
		name:'Javelin',
		description:'',
		categories:['Simple','Melee','Weapon'],
		count:1,
		damage1:'1d6',
		damageType:"Piercing",
		throwRange:[30,120],
		value:500,
		proficiencies:['Simple Weapons','Javelins']
	},{
		name:'Dart',
		description:'',
		categories:['Simple','Ranged','Weapon'],
		count:1,
		damage1:'1d4',
		damageType:"Piercing",
		finesse:true,
		throwRange:[20,60],
		value:200,
		proficiencies:['Simple Weapons','Darts']
	},{
		name:'Shield',
		description:'A shield is made from wood or metal and is carried in one hand. Wielding a shield increases your Armor Class by 2. You can benefit from only one shield at a time.',
		categories:['Shield'],
		count:1,
		value:1000,
		proficiencies:['Shields']
	},{
		name:'Light Crossbow',
		description:'',
		categories:['Simple','Ranged','Weapon'],
		count:1,
		damage2:'1d8',
		damageType:"Piercing",
		attackRange:[80,320],
		value:2500,
		proficiencies:['Simple Weapons','Light Crossbows']
	},{
		name:'Greatsword',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage2:'2d6',
		damageType:"Slashing",
		value:5000,
		heavy:true,
		proficiencies:['Martial Weapons','Greatswords']
	},{
		name:'Warhammer',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage1:'1d8',
		damage2:'1d10',
		damageType:"Bludgeoning",
		value:1500,
		proficiencies:['Martial Weapons','Warhammers']
	},{
		name:'Glaive',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage2:'1d10',
		damageType:"Slashing",
		value:2000,
		heavy:true,
		reach:true,
		proficiencies:['Martial Weapons','Polearms','Glaives']
	},{
		name:'Halberd',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage2:'1d10',
		damageType:"Slashing",
		value:2000,
		heavy:true,
		reach:true,
		proficiencies:['Martial Weapons','Polearms','Halberds']
	},{
		name:'Mace',
		description:'',
		categories:['Simple','Melee','Weapon'],
		count:1,
		damage1:'1d6',
		damageType:"Bludgeoning",
		value:500,
		proficiencies:['Simple Weapons','Maces']
	},{
		name:'Battleaxe',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage1:'1d8',
		damage2:'1d10',
		damageType:"Slashing",
		value:1000,
		proficiencies:['Martial Weapons','Battleaxes']
	},{
		name:'Flail',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage1:'1d8',
		damageType:"Bludgeoning",
		value:1000,
		proficiencies:['Martial Weapons','Flails']
	},{
		name:'Greataxe',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage2:'1d12',
		damageType:"Slashing",
		value:3000,
		heavy:true,
		proficiencies:['Martial Weapons','Greataxes']
	},{
		name:'Hand Crossbow',
		description:'',
		categories:['Martial','Ranged','Weapon'],
		count:1,
		damage1:'1d6',
		damageType:"Piercing",
		attackRange:[30,120],
		value:7500,
		proficiencies:['Martial Weapons','Hand Crossbows']
	},{
		name:'Heavy Crossbow',
		description:'',
		categories:['Martial','Ranged','Weapon'],
		count:1,
		damage2:'1d10',
		damageType:"Piercing",
		attackRange:[100,400],
		value:5000,
		proficiencies:['Martial Weapons','Heavy Crossbows']
	},{
		name:'Longbow',
		description:'',
		categories:['Martial','Ranged','Weapon'],
		count:1,
		damage2:'1d8',
		damageType:"Piercing",
		attackRange:[150,600],
		value:5000,
		heavy:true,
		proficiencies:['Martial Weapons','Longbows']
	},{
		name:'Shortbow',
		description:'',
		categories:['Simple','Ranged','Weapon'],
		count:1,
		damage2:'1d6',
		damageType:"Piercing",
		attackRange:[80,320],
		value:2500,
		proficiencies:['Simple Weapons','Shortbows']
	},{
		name:'Maul',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage2:'2d6',
		damageType:"Bludgeoning",
		value:1000,
		heavy:true,
		proficiencies:['Martial Weapons','Mauls']
	},{
		name:'Morningstar',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage1:'1d8',
		damageType:"Piercing",
		value:1500,
		proficiencies:['Martial Weapons','Morningstars']
	},{
		name:'Pike',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage2:'1d10',
		damageType:"Piercing",
		reach:true,
		value:500,
		heavy:true,
		proficiencies:['Martial Weapons','Polearms','Pikes']
	},{
		name:'Rapier',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage1:'1d8',
		damageType:"Piercing",
		finesse:true,
		value:2500,
		proficiencies:['Martial Weapons','Rapiers']
	},{
		name:'Scimitar',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage1:'1d6',
		damageType:"Slashing",
		finesse:true,
		value:2500,
		proficiencies:['Martial Weapons','Scimitars']
	},{
		name:'Shortsword',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage1:'1d6',
		damageType:"Piercing",
		finesse:true,
		value:1000,
		proficiencies:['Martial Weapons','Shortswords']
	},{
		name:'Trident',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage1:'1d6',
		damage2:'1d8',
		damageType:"Piercing",
		throwRange:[20,60],
		value:2500,
		proficiencies:['Martial Weapons','Tridents']
	},{
		name:'War Pick',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage1:'1d8',
		damageType:"Piercing",
		value:500,
		proficiencies:['Martial Weapons','Picks']
	},{
		name:'Katana',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage2:'1d10',
		damageType:"Slashing",
		value:2500,
		proficiencies:['Martial Weapons','Katanas']
	},
	//armors
	{
		name:'Breastplate',
		description:'This armor consists of a fitted metal chest piece worn with supple leather. Although it leaves the legs and arms relatively unprotected, this armor provides good protection for the wearer\'s vital organs while leaving the wearer relatively unencumbered.',
		ac:'14 + Dex (max +2)',
		categories:['Armor'],
		count:1,
		rarity:2,
		value:40000,
		proficiencies:['Medium Armor']
	},{
		name:'Chain Mail',
		description:'Made of interlocking metal rings, chain mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows. The suit includes gauntlets.\nThe wearer has disadvantage on Stealth (Dexterity) checks.\nIf the wearer has a Strength score lower than 13, their speed is reduced by 10 feet.',
		ac:'16',
		categories:['Armor'],
		count:1,
		rarity:2,
		value:7500,
		proficiencies:['Heavy Armor']
	},{
		name:'Chain Shirt',
		description:'Made of interlocking metal rings, a chain shirt is worn between layers of clothing or leather. This armor offers modest protection to the wearer\'s upper body and allows the sound of the rings rubbing against one another to be muffled by outer layers.',
		ac:'13 + Dex (max +2)',
		categories:['Armor'],
		count:1,
		rarity:2,
		value:5000,
		proficiencies:['Medium Armor']
	},{
		name:'Half Plate Armor',
		description:'Half plate consists of shaped metal plates that cover most of the wearer\'s body. It does not include leg protection beyond simple greaves that are attached with leather straps.\nThe wearer has disadvantage on Stealth (Dexterity) checks.',
		ac:'15 + Dex (max +2)',
		categories:['Armor'],
		count:1,
		rarity:2,
		value:75000,
		proficiencies:['Medium Armor']
	},{
		name:'Hide Armor',
		description:'This crude armor consists of thick furs and pelts. It is commonly worn by barbarian tribes, evil humanoids, and other folk who lack access to the tools and materials needed to create better armor.',
		ac:'12 + Dex (max +2)',
		categories:['Armor'],
		count:1,
		rarity:3,
		value:1000,
		proficiencies:['Medium Armor']
	},{
		name:'Leather Armor',
		description:'The breastplate and shoulder protectors of this armor are made of leather that has been stiffened by being boiled in oil. The rest of the armor is made of softer and more flexible materials.',
		ac:'11 + Dex',
		categories:['Armor'],
		count:1,
		rarity:3,
		value:1000,
		proficiencies:['Light Armor']
	},{
		name:'Padded Armor',
		description:'Padded armor consists of quilted layers of cloth and batting.\nThe wearer has disadvantage on Stealth (Dexterity) checks.',
		ac:'11 + Dex',
		categories:['Armor'],
		count:1,
		rarity:3,
		value:500,
		proficiencies:['Light Armor']
	},{
		name:'Plate Armor',
		description:'Plate consists of shaped, interlocking metal plates to cover the entire body. A suit of plate includes gauntlets, heavy leather boots, a visored helmet, and thick layers of padding underneath the armor. Buckles and straps distribute the weight over the body.\nThe wearer has disadvantage on Stealth (Dexterity) checks.\nIf the wearer has a Strength score lower than 15, their speed is reduced by 10 feet.',
		ac:'18',
		categories:['Armor'],
		count:1,
		rarity:2,
		value:150000,
		proficiencies:['Heavy Armor']
	},{
		name:'Ring Mail',
		description:'This armor is leather armor with heavy rings sewn into it. The rings help reinforce the armor against blows from swords and axes. Ring mail is inferior to chain mail, and it\'s usually worn only by those who can\'t afford better armor.\nThe wearer has disadvantage on Stealth (Dexterity) checks.',
		ac:'14',
		categories:['Armor'],
		count:1,
		rarity:3,
		value:3000,
		proficiencies:['Heavy Armor']
	},{
		name:'Scale Mail',
		description:'This armor consists of a coat and leggings (and perhaps a separate skirt) of leather covered with overlapping pieces of metal, much like the scales of a fish. The suit includes gauntlets.\nThe wearer has disadvantage on Stealth (Dexterity) checks.',
		ac:'14 + Dex (max +2)',
		categories:['Armor'],
		count:1,
		rarity:2,
		value:5000,
		proficiencies:['Medium Armor']
	},{
		name:'Splint Armor',
		description:'This armor is made of narrow vertical strips of metal riveted to a backing of leather that is worn over cloth padding. Flexible chain mail protects the joints.\nThe wearer has disadvantage on Stealth (Dexterity) checks.\nIf the wearer has a Strength score lower than 15, their speed is reduced by 10 feet.',
		ac:'17',
		categories:['Armor'],
		count:1,
		rarity:2,
		value:20000,
		proficiencies:['Heavy Armor']
	},{
		name:'Studded Leather Armor',
		description:'Made from tough but flexible leather, studded leather is reinforced with close-set rivets or spikes.',
		ac:'12 + Dex',
		categories:['Armor'],
		count:1,
		rarity:3,
		value:4500,
		proficiencies:['Light Armor']
	},
	//misc clothing
	{
		name:"Cloth Boots",
		categories:["Clothing"],
		description:"",
		value:50,
		count:1
	},{
		name:"Leather Boots",
		categories:["Clothing"],
		description:"",
		value:100,
		count:1
	},{
		name:"Chain Boots",
		categories:["Clothing"],
		description:"",
		value:500,
		count:1
	},{
		name:"Plated Boots",
		categories:["Clothing"],
		description:"",
		value:500,
		count:1
	}
	//ammo
	,{
		name:'Bolt',
		description:'Ammunition needed to use crossbows.',
		categories:['Ammunition'],
		count:1,
		value:5
	},{
		name:'Bullet',
		description:'Ammunition needed to use slings.',
		categories:['Ammunition'],
		count:1,
		value:1
	},{
		name:'Arrow',
		description:'Ammunition needed to use bows.',
		categories:['Ammunition'],
		count:1,
		value:5
	},
	//instruments/tools
	{
		name:'Bagpipes',
		description:instrumentDescription(),
		categories:['Instrument'],
		value:3000,
		proficiencies:['Bagpipes']
	},{
		name:'Drum',
		description:instrumentDescription(),
		categories:['Instrument'],
		value:600,
		proficiencies:['Drum']
	},{
		name:'Dulcimer',
		description:instrumentDescription(),
		categories:['Instrument'],
		value:2500,
		proficiencies:['Dulcimer']
	},{
		name:'Flute',
		description:instrumentDescription(),
		categories:['Instrument'],
		value:200,
		proficiencies:['Flute']
	},{
		name:'Horn',
		description:instrumentDescription(),
		categories:['Instrument'],
		value:300,
		proficiencies:['Horn']
	},{
		name:'Lute',
		description:instrumentDescription(),
		categories:['Instrument'],
		value:3500,
		proficiencies:['Lute']
	},{
		name:'Lyre',
		description:instrumentDescription(),
		categories:['Instrument'],
		value:200,
		proficiencies:['Lyre']
	},{
		name:'Panflute',
		description:instrumentDescription(),
		categories:['Instrument'],
		value:1200,
		proficiencies:['Panflute']
	},{
		name:'Shawm',
		description:instrumentDescription(),
		categories:['Instrument'],
		value:200,
		proficiencies:['Shawm']
	},{
		name:'Viol',
		description:instrumentDescription(),
		categories:['Instrument'],
		value:3000,
		proficiencies:['Viol']
	},
	//misc
	{
		name:"Holy Symbol",
		description:"A holy symbol is a representation of a god or pantheon.\nA cleric or paladin can use a holy symbol as a spellcasting focus, using it in place of any material components which do not list a cost. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield.",
		categories:["Spellcasting Focus"],
		count:1,
		value:100,
		rarity:0
	},{
		name:"Ring",
		description:"",
		categories:["Jewelry"],
		count:1,
		value:1000,
		rarity:3
	},{
		name:"Amulet",
		description:"",
		categories:["Jewelry"],
		count:1,
		value:1000,
		rarity:3
	},
	//potions
	{
		name:"Potion of {type} Resistance",
		description:"When you drink this potion, you gain resistance to {type} damage for one hour.",
		count:1,
		value:4000,
		categories:['Potion'],
		onGenerate:function(){
			let type="";
			switch (Math.rand(0,16)){
				case 0: type="Acid";break;
				case 1: type="Acid";break;
				case 2: type="Fire";break;
				case 3: type="Fire";break;
				case 4: type="Cold";break;
				case 5: type="Cold";break;
				case 6: type="Lightning";break;
				case 7: type="Lightning";break;
				case 8: type="Thunder";break;
				case 9: type="Thunder";break;
				case 10: type="Poison";break;
				case 11: type="Poison";break;

				case 12: type="Force";break;
				case 13: type="Necrotic";break;
				case 14: type="Psychic";break;
				case 15: type="Radiant";break;
			}
			this.name=this.name.replace("{type}",type);
			this.description=this.description.replace("{type}",type.toLowerCase());
		}
	},{
		name:"Potion of Healing",
		description:"You regain 2d4+2 hit points when you drink this potion. The potion's red liquid glimmers when agitated.",
		count:1,
		value:2500,
		rarity:3,
		categories:['Potion']
	},{
		name:"Potion of Greater Healing",
		description:"You regain 4d4+4 hit points when you drink this potion. The potion's red liquid glimmers when agitated.",
		count:1,
		value:6000,
		categories:['Potion']
	},{
		name:"Potion of Superior Healing",
		description:"You regain 8d4+8 hit points when you drink this potion. The potion's red liquid glimmers when agitated.",
		count:1,
		value:12500,
		tier:1,
		categories:['Wondrous','Potion']
	},{
		name:"Potion of Supreme Healing",
		description:"You regain 10d4+20 hit points when you drink this potion. The potion's red liquid glimmers when agitated.",
		count:1,
		value:17500,
		tier:2,
		categories:['Wondrous','Potion']
	},
	//magical
	{
		name:'The Scroll of Beginnings',
		description:'The Scroll of Beginnings is the only artifact left over from the forming of the plane. It\'s theorized that the text contained within determines the nature of reality, and the scroll may even have the ability to change its own text, rewriting reality in the process.\nWhen you read the scroll as an action, make an Intelligence saving throw, DC 20. If you succeed, you cast Wish at 9th level, choosing any of the effects listed in the spell description. You do not suffer the normal stress for choosing an effect other than duplicating another spell.\nThe Scroll of Beginnings is consumed when you successfully read it.',
		categories:['Wondrous','Artifact'],
		count:1,
		tier:3,
		value:5500000,
		proficiencies:['Language: Primordial']
	},{
		name:'The Mirari',
		description:'This crystal orb glows with a warm energy. Wherever you walk, plants bloom around you, even reviving wilted plants in a matter of seconds.\nWhenever you cast a spell of 3rd level or lower, if that spell is only capable of targeting one creature at the level you cast it at, you can duplicate that spell targeting a second creature.\nThis effect can\'t be used again until you finish a long rest.',
		categories:['Wondrous','Artifact'],
		count:1,
		tier:1,
		value:10000
	},{
		name:'Hover Boots',
		description:'Brass and Gilt adorn the metallic wings that decorate these boots. You may walk horizontally on air or liquid for up to half your movement speed before beginning to fall.',
		categories:['Wondrous','Clothing'],
		count:1,
		tier:1,
		value:40000,
		proficiencies:[]
	},{
		name:"Amulet of Nine Lives",
		description:"This ornate amulet is set with nine rubies that glow with a dim crimson light. Each time you would die while wearing the amulet, one of the rubies stops glowing, and something miraculous happens to prevent your death. Once all nine rubies have been expended, this becomes a nonmagical amulet worth 10g.",
		categories:['Wondrous','Jewelry'],
		count:9,
		tier:2,
		value:1000,
		proficiencies:[]
	},{
		name:"Mirror of Souls",
		description:"When a creature breaks the mirror, they fall to 0 hit points and become unconscious, and their soul is temporarily transferred into another creature within 100 feet. After one hour, or when the creature dies, the soul is transferred into the original body and they are restored to 1 hit point.",
		categories:["Wondrous"],
		count:1,
		tier:3,
		value:500,
		proficiencies:[]
	},{
		name:"Gauntlet of Challenge",
		description:"This unassuming gauntlet appears mundane, but when thrown in front of a creature with whom you have asked a one-on-one challenge of some sort, the creature must accept. This effect can't be used until the next dawn.",
		categories:["Wondrous",'Clothing'],
		count:1,
		tier:1,
		value:500,
		proficiencies:[]
	},{
		name:"Helm of Command",
		description:"Once per combat on your turn, you may forfeit all your actions for that turn. You designate a creature you can see within 60 feet that can see or hear you. That creature gains a second action on their next turn.",
		categories:['Wondrous','Helmet','Clothing'],
		count:1,
		tier:1,
		value:3000,
		proficiencies:['Medium Armor']
	},{
		name:"Amulet of Health",
		description:"Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution score is already 19 or higher without it.",
		categories:['Wondrous','Jewelry'],
		count:1,
		tier:2,
		value:30000,
		proficiencies:[]
	},{
		name:"Amulet of Concealment",
		description:"While wearing this amulet, you are hidden from divination magic. You can't be targeted by such magic or perceived through magical scrying sensors.",
		categories:['Wondrous','Jewelry'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Bag of Bounty",
		description:"This is a sturdy leather sack with tiny Siberys shards embedded into the lining. You can use an action to cast create food and water, drawing a feast from within the bag. You shape this meal with your thoughts. You can create the standard bland fare without requiring any sort of check, but you can attempt to create finer food by making a Charisma check; if you're proficient with cook's utensils, add your bonus to this check. A failed check results in a sour and squalid meal.\n\nOnce used, the bag of bounty can't be used again until the next dawn.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Bag of Holding",
		description:"This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action.\n\nIf the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate.\n\nPlacing a bag of holding inside an extradimensional space created by a Heward's handy haversack, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Bead of Force",
		description:"This small black sphere measures 3/4 of an inch in diameter and weighs an ounce. Typically, 1d4 + 4 beads of force are found together.\n\nYou can use an action to throw the bead up to 60 feet. The bead explodes on impact and is destroyed. Each creature within a 10-foot radius of where the bead landed must succeed on a DC 15 Dexterity saving throw or take 5d4 force damage. A sphere of transparent force then encloses the area for 1 minute. Any creature that failed the save and is completely within the area is trapped inside this sphere. Creatures that succeeded on the save, or are partially within the area, are pushed away from the center of the sphere until they are no longer inside it. Only breathable air can pass through the sphere's wall. No attack or other effect can.\n\nAn enclosed creature can use its action to push against the sphere's wall, moving the sphere up to half the creature's walking speed. The sphere can be picked up, and its magic causes it to weigh only 1 pound, regardless of the weight of creatures inside.",
		categories:['Wondrous'],
		count:1,
		tier:3,
		value:30000,
		proficiencies:[]
	},{
		name:"Belt of Hill Giant Strength",
		description:"While wearing this belt, your Strength score changes to 21. The item has no effect on you if your Strength without the belt is equal to or greater than the belt's score.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:50000,
		proficiencies:[]
	},{
		name:"Belt of Fire Giant Strength",
		description:"While wearing this belt, your Strength score changes to 25. The item has no effect on you if your Strength without the belt is equal to or greater than the belt's score.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:50000,
		proficiencies:[]
	},{
		name:"Belt of Storm Giant Strength",
		description:"While wearing this belt, your Strength score changes to 29. The item has no effect on you if your Strength without the belt is equal to or greater than the belt's score.",
		categories:['Wondrous'],
		count:1,
		tier:3,
		value:50000,
		proficiencies:[]
	},{
		name:"Boots of Elvenkind",
		description:"While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Bracer of Flying Daggers",
		description:"This armband appears to have thin daggers strapped to it. As an action, you can pull up to two magic daggers from the bracer and immediately hurl them, making a ranged attack with each dagger. A dagger vanishes if you don't hurl it right away, and the daggers disappear right after they hit or miss. The bracer never runs out of daggers.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Bracers of Archery",
		description:"While wearing these bracers, you have proficiency with the longbow and shortbow, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Bracers of Defense",
		description:"While wearing these bracers, you gain a +2 bonus to AC if you are wearing no armor and using no shield.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Candle of the Deep",
		description:"The flame of this candle is not extinguished when immersed in water. It gives off light and heat like a normal candle.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:1000,
		proficiencies:[]
	},{
		name:"Cape of the Mountebank",
		description:"This cape smells faintly of brimstone. While wearing it, you can use it to cast the dimension door spell as an action. This property of the cape can't be used again until the next dawn.\n\nWhen you disappear, you leave behind a cloud of smoke, and you appear in a similar cloud of smoke at your destination. The smoke lightly obscures the space you left and the space you appear in, and it dissipates at the end of your next turn. A light or stronger wind disperses the smoke.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:2,
		value:30000,
		proficiencies:[]
	},{
		name:"Chime of Opening",
		description:"This hollow metal tube measures about 1 foot long and weighs 1 pound. You can strike it as an action, pointing it at an object within 120 feet of you that can be opened, such as a door, lid, or lock. The chime issues a clear tone, and one lock or latch on the object opens unless the sound can't reach the object. If no locks or latches remain, the object itself opens.\n\nThe chime can be used ten times. After the tenth time it cracks and becomes useless.",
		categories:['Wondrous'],
		count:10,
		tier:3,
		value:30000,
		proficiencies:[]
	},{
		name:"Cloak of Displacement",
		description:"While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have disadvantage on attack rolls against you. If you take damage, the property ceases to function until the start of your next turn. This property is suppressed while you are incapacitated, restrained, or otherwise unable to move.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Cloak of Elvenkind",
		description:"While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage. and you have advantage on Dexterity (Stealth) checks made to hide, as the cloak's color shifts to camouflage you. Pulling the hood up or down requires an action.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Cloak of Invsibility",
		description:"While wearing this cloak, you can pull its hood over your head to cause yourself to become invisible. While you are invisible, anything you are carrying or wearing is invisible with you. You become visible when you cease wearing the hood. Pulling the hood up or down requires an action.\n\nDeduct the time you are invisible, in increments of 1 minute, from the cloak's maximum duration of 2 hours. After 2 hours of use, the cloak ceases to function. For every uninterrupted period of 12 hours the cloak goes unused, it regains 1 hour of duration.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:3,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Cloak of Protection",
		description:"You gain a +1 bonus to AC and saving throws while you wear this cloak.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:2,
		value:30000,
		proficiencies:[]
	},{
		name:"Clockwork Amulet",
		description:"This copper amulet contains tiny interlocking gears and is powered by magic from Mechanus, a plane of clockwork predictability. A creature that puts an ear to the amulet can hear faint ticking and whirring noises coming from within.\n\nWhen you make an attack roll while wearing the amulet, you can forgo rolling the d20 to get a 10 on the die. Once used, this property can't be used again until the next dawn.",
		categories:['Wondrous','Jewelry'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Dodecahedron of Doom",
		description:"This twelve-sided metal die is 12 inches across and bears the numbers 1 through 12 engraved on its pentagonal sides. The dodecahedron contains arcane clockwork mechanisms that whir and click whenever the die is cast.\n\nThe dodecahedron can be hurled up to 60 feet as an action. A random magical effect occurs when the die comes to rest after rolling across the ground for at least 10 feet. If an effect requires a target and no eligible target is within range, nothing happens. Spells cast by the dodecahedron require no components. Roll a d12 and consult the following table to determine the effect:\n\u2022 1-2: The dodecahedron explodes and is destroyed. Each creature within 20 feet of the exploding die must make a DC 13 Dexterity saving throw, taking 40 (9d8) force damage on a failed save, or half as much damage on a successful one.\n\u2022 3-4: The dodecahedron casts light on itself. The effect lasts until a creature touches the die.\n\u2022 5-6: The dodecahedron casts ray of frost (+5 to hit), targeting a random creature within 60 feet of it that doesn't have total cover against the attack.\n\u2022 7-8: The dodecahedron casts shocking grasp (+5 to hit) on the next creature that touches it.\n\u2022 9-10: The dodecahedron casts darkness on itself. The effect has a duration of 10 minutes.\n\u2022 11-12: The next creature to touch the dodecahedron gains 1d10 temporary hit points that last for 1 hour.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		proficiencies:[]
	},{
		name:"Efreeti Bottle",
		description:"This painted brass bottle weighs 1 pound. When you use an action to remove the stopper, a cloud of thick smoke flows out of the bottle. At the end of your turn, the smoke disappears with a flash of harmless fire, and an efreeti appears in an unoccupied space within 30 feet of you.\n\nThe first time the bottle is opened, the DM rolls to determine what happens.\n\u2022 01-10: The efreeti attacks you. After fighting for 5 rounds, the efreeti disappears, and the bottle loses its magic.\n\u2022 11-90: The efreeti serves you for 1 hour, doing as you command. Then the efreeti returns to the bottle, and a new stopper contains it. The stopper can't be removed for 24 hours. The next two times the bottle is opened, the same effect occurs. If the bottle is opened a fourth time, the efreeti escapes and disappears, and the bottle loses its magic.\n\u2022 91-00: The efreeti can cast the wish spell three times for you. It disappears when it grants the final wish or after 1 hour, and the bottle loses its magic.",
		categories:['Wondrous'],
		count:1,
		tier:3,
		value:30000,
		proficiencies:[]
	},{
		name:"Drift Globe",
		description:"This small sphere of thick glass weighs 1 pound. If you are within 60 feet of it, you can speak its command word and cause it to emanate the light or daylight spell. Once used, the daylight effect can't be used again until the next dawn.\n\nYou can speak another command word as an action to make the illuminated globe rise into the air and float no more than 5 feet off the ground. The globe hovers in this way until you or another creature grasps it. If you move more than 60 feet from the hovering globe, it follows you until it is within 60 feet of you. It takes the shortest route to do so. If prevented from moving, the globe sinks gently to the ground and becomes inactive, and its light winks out.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Everbright Lantern",
		description:"An everbright lantern contains an Eberron dragonshard imbued with the effect of a continual flame spell. This bright light is mounted inside a normal bullseye lantern, allowing the light to be shuttered off. An everbright lantern provides clear illumination in a 60-foot cone and shadowy illumination in a 120-foot cone, just like a mundane bullseye lantern, but its flame never goes out.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Eversmoking Bottle",
		description:"moke leaks from the lead-stoppered mouth of this brass bottle, which weighs 1 pound. When you use an action to remove the stopper, a cloud of thick smoke pours out in a 60-foot radius from the bottle. The cloud's area is heavily obscured. Each minute the bottle remains open and within the cloud, the radius increases by 10 feet until it reaches its maximum radius of 120 feet.\n\nThe cloud persists as long as the bottle is open. Closing the bottle requires you to speak its command word as an action. Once the bottle is closed, the cloud disperses after 10 minutes. A moderate wind (11 to 20 miles per hour) can also disperse the smoke after 1 minute, and a strong wind (21 or more miles per hour) can do so after 1 round.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Feather Token",
		description:"This small metal disk is inscribed with the image of a feather. When you fall while the token is in your possession, you descend 60 feet per round and take no damage from falling. The token becomes nonmagical after you land. While it's an expensive form of insurance, frequent airship travelers and citizens of Sharn often appreciate the security it provides.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		proficiencies:[]
	},{
		name:"Galder's Bubble Pipe",
		description:"This finely carved pipe blows odorless bubbles instead of smoke when used. The pipe has 3 charges, and it regains all spent charges daily at dawn. While you hold the pipe, you can expend charges to gain access to the following properties:\n\u2022You can cast fog cloud as an action (1 charge).\n\u2022You can cast misty step as a bonus action (2 charges).\n\u2022You can summon a steam mephit as an action (3 charges). The mephit is friendly to you, obeys your verbal commands, and acts on its own turn in the initiative order. It disappears in a harmless puff of steam after 1 minute or if it ends its turn more than 60 feet from the pipe.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Gauntlets of Ogre Power",
		description:"Your Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is already 19 or higher without them.",
		categories:['Wondrous','Clothing'],
		attunement:true,
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Gloves of Missile Snaring",
		description:"These gloves seem to almost meld into your hands when you don them. When a ranged weapon attack hits you while you're wearing them, you can use your reaction to reduce the damage by 1d10 + your Dexterity modifier, provided that you have a free hand. If you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in that hand.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:1,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Gloves of Thievery",
		description:"These gloves are invisible while worn. While wearing them, you gain a +5 bonus to Dexterity (Sleight of Hand) checks and Dexterity checks made to pick locks.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Hat of Disguise",
		description:"hile wearing this hat, you can use an action to cast the disguise self spell from it at will. The spell ends if the hat is removed.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:2,
		value:30000,
		proficiencies:[]
	},{
		name:"Hat of Vermin",
		description:"This hat has 3 charges. While holding the hat, you can use an action to expend 1 of its charges and speak a command word that summons your choice of a bat, a frog, or a rat. The summoned creature magically appears in the hat and tries to get away from you as quickly as possible. The creature is neither friendly nor hostile, and it isn't under your control. It behaves as an ordinary creature of its kind and disappears after 1 hour or when it drops to 0 hit points. The hat regains all expended charges daily at dawn.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Helm of Telepathy",
		description:"While wearing this helm, you can use an action to cast the detect thoughts spell (save DC 13) from it. As long as you maintain concentration on the spell, you can use a bonus action to send a telepathic message to a creature you are focused on. It can reply—using a bonus action to do so—while your focus on it continues.\n\nWhile focusing on a creature with detect thoughts, you can use an action to cast the suggestion spell (save DC 13) from the helm on that creature. Once used, the suggestion property can't be used again until the next dawn.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Horn of Silent Alarm",
		description:"This horn has 4 charges. When you use an action to blow it, one creature of your choice can hear the horns blare, provided the creature is within 600 feet of the horn and not deafened. No other creature hears sound coming from the horn. The horn regains 1d4 expended charges daily at dawn.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Illusionist's Bracers",
		description:"A powerful illusionist of House Dimir originally developed these bracers, which enabled her to create multiple minor illusions at once. The bracers' power, though, extends far beyond illusions.\n\nWhile wearing the bracers, whenever you cast a cantrip, you can use a bonus action on the same turn to cast that cantrip a second time.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:1,
		attunement:true,
		value:30000,
		proficiencies:[]
	},{
		name:"Ioun Stone - Absorption",
		description:ioun+"While this pale lavender ellipsoid orbits your head, you can use your reaction to cancel a spell of 4th level or lower cast by a creature you can see and targeting only you.\n\nOnce the stone has canceled 20 levels of spells, it burns out and turns dull gray, losing its magic. If you are targeted by a spell whose level is higher than the number of spell levels the stone has left, the stone can't cancel it.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Ioun Stone - Agility",
		description:ioun+"Your Dexterity score increases by 2, to a maximum of 20, while this deep red sphere orbits your head.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Ioun Stone - Awareness",
		description:ioun+"You can't be surprised while this dark blue rhomboid orbits your head.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Ioun Stone - Fortitude",
		description:ioun+"Your Constitution score increases by 2, to a maximum of 20, while this pink rhomboid orbits your head.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Ioun Stone - Greater Absorption",
		description:ioun+"While this pale lavender ellipsoid orbits your head, you can use your reaction to cancel a spell of 4th level or lower cast by a creature you can see and targeting only you.\n\nOnce the stone has canceled 20 levels of spells, it burns out and turns dull gray, losing its magic. If you are targeted by a spell whose level is higher than the number of spell levels the stone has left, the stone can't cancel it.",
		categories:['Wondrous'],
		count:1,
		tier:3,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Ioun Stone - Insight",
		description:ioun+"Your Wisdom score increases by 2, to a maximum of 20, while this incandescent blue sphere orbits your head.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Ioun Stone - Intellect",
		description:"Your Intelligence score increases by 2, to a maximum of 20, while this marbled scarlet and blue sphere orbits your head.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Ioun Stone - Leadership",
		description:ioun+"Your Charisma score increases by 2, to a maximum of 20, while this marbled pink and green sphere orbits your head.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Ioun Stone - Mastery",
		description:ioun+"Your proficiency bonus increases by 1 while this pale green prism orbits your head.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Ioun Stone - Protection",
		description:ioun+"You gain a +1 bonus to AC while this dusty rose prism orbits your head.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Ioun Stone - Regeneration",
		description:ioun+"You regain 15 hit points at the end of each hour this pearly white spindle orbits your head, provided that you have at least 1 hit point.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Ioun Stone - Reserve",
		description:ioun+"This vibrant purple prism stores spells cast into it, holding them until you use them. The stone can store up to 3 levels worth of spells at a time. When found, it contains 1d4-1 levels of stored spells chosen by the DM.\n\nAny creature can cast a spell of 1st through 3rd level into the stone by touching it as the spell is cast. The spell has no effect, other than to be stored in the stone. If the stone can't hold the spell, the spell is expended without effect. The level of the slot used to cast the spell determines how much space it uses.\n\nWhile this stone orbits your head, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell. The spell cast from the stone is no longer stored in it, freeing up space.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Ioun Stone - Strength",
		description:"Your Strength score increases by 2, to a maximum of 20, while this pale blue rhomboid orbits your head.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Iron Bands of Bilarro",
		description:"This rusty iron sphere measures 3 inches in diameter and weighs 1 pound. You can use an action to speak the command word and throw the sphere at a Huge or smaller creature you can see within 60 feet of you. As the sphere moves through the air, it opens into a tangle of metal bands.\n\nMake a ranged attack roll with an attack bonus equal to your Dexterity modifier plus your proficiency bonus. On a hit, the target is restrained until you take a bonus action to speak the command word again to release it. Doing so, or missing with the attack, causes the bands to contract and become a sphere once more.\n\nA creature, including the one restrained, can use an action to make a DC 20 Strength check to break the iron bands. On a success, the item is destroyed, and the restrained creature is freed. If the check fails, any further attempts made by that creature automatically fail until 24 hours have elapsed.\n\nOnce the bands are used, they can't be used again until the next dawn.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		proficiencies:[]
	},{
		name:"Keoghtom's Ointment",
		description:"This glass jar, 3 inches in diameter, contains 1d4+1 doses of a thick mixture that smells faintly of aloe. The jar and its contents weigh ½ pound.\n\nAs an action, one dose of the ointment can be swallowed or applied to the skin. The creature that receives it regains 2d8+2 hit points, ceases to be poisoned, and is cured of any disease.",
		categories:['Wondrous','Potion'],
		count:1,
		tier:2,
		value:10000,
		proficiencies:[]
	},{
		name:"Lantern of Revealing",
		description:"While lit, this hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern's bright light. You can use an action to lower the hood, reducing the light to dim light in a 5-foot radius.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		proficiencies:[]
	},{
		name:"Mantle of Spell Resistance",
		description:"You have advantage on saving throws against spells while you wear this cloak.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Mirror of the Past",
		description:"The holder of this platinum hand mirror can learn something about the history of a specific object or creature by taking an action to gaze into the mirror and think of the target. Instead of the holder's reflection, the mirror presents scenes from the target's past. Information conveyed is accurate, but it is random and cryptic, and presented in no particular order. Once it is activated, the mirror gives its information for 1 minute or less, then returns to normal. It can't be used again until the next dawn.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		proficiencies:[]
	},{
		name:"Mystery Key",
		description:"A question mark is worked into the head of this key. The key has a 5 percent chance of unlocking any lock into which it's inserted. Once it unlocks something, the key disappears.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:5000,
		proficiencies:[]
	},{
		name:"Necklace of Adaptation",
		description:"While wearing this necklace, you can breathe normally in any environment, and you have advantage on saving throws made against harmful gases and vapors (such as cloudkill and stinking cloud effects, inhaled poisons, and the breath weapons of some dragons).",
		categories:['Wondrous','Jewelry'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Necklace of Fireballs",
		description:"This necklace has 1d6+3 beads hanging from it. You can use an action to detach a bead and throw it up to 60 feet away. When it reaches the end of its trajectory, the bead detonates as a 3rd-level fireball spell (save DC 15).\n\nYou can hurl multiple beads, or even the whole necklace, as one action. When you do so, increase the level of the fireball by 1 for each bead beyond the first.",
		categories:['Wondrous','Jewelry'],
		count:6,
		tier:2,
		value:30000,
		proficiencies:[]
	},{
		name:"Nolzur's Marvelous Pigments",
		description:"Typically found in 1d4 pots inside a fine wooden box with a brush (weighing 1 pound in total), these pigments allow you to create three-dimensional objects by painting them in two dimensions. The paint flows from the brush to form the desired object as you concentrate on its image.\n\nEach pot of paint is sufficient to cover 1,000 square feet of a surface, which lets you create inanimate objects or terrain features—such as a door, a pit, flowers, trees, cells, rooms, or weapons—that are up to 10,000 cubic feet. It takes 10 minutes to cover 100 square feet.\n\nWhen you complete the painting, the object or terrain feature depicted becomes a real, nonmagical object. Thus, painting a door on a wall creates an actual door that can be opened to whatever is beyond. Painting a pit on a floor creates a real pit, and its depth counts against the total area of objects you create.\n\nNothing created by the pigments can have a value greater than 25 gp. If you paint an object of greater value (such as a diamond or a pile of gold), the object looks authentic, but close inspection reveals it is made from paste, bone, or some other worthless material.\n\nIf you paint a form of energy such as fire or lightning, the energy appears but dissipates as soon as you complete the painting, doing no harm to anything.",
		categories:['Wondrous'],
		count:1000,
		tier:3,
		value:30000,
		proficiencies:[]
	},{
		name:"Periapt of Health",
		description:"You are immune to contracting any disease while you wear this pendant. If you are already infected with a disease, the effects of the disease are suppressed while you wear the pendant.",
		categories:['Wondrous','Jewelry'],
		count:1,
		tier:2,
		value:30000,
		proficiencies:[]
	},{
		name:"Periapt of Proof Against Poison",
		description:"This delicate silver chain has a brilliant-cut black gem pendant. While you wear it, poisons have no effect on you. You are immune to the poisoned condition and have immunity to poison damage.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		proficiencies:[]
	},{
		name:"Periapt of Wound Closure",
		description:"While you wear this pendant, you stabilize whenever you are dying at the start of your turn. In addition, whenever you roll a Hit Die to regain hit points, double the number of hit points it restores.",
		categories:['Wondrous'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Professor Orb",
		description:"Each professor orb takes the form of a smooth, solid, 5-pound sphere of smoky gray quartz about the size of a grapefruit. Close examination reveals two or more pinpricks of silver light deep inside the sphere.\n\nA Professor Orb is sentient and has the personality of a scholar. Regardless of its disposition, the orb has an Intelligence of 18, and Wisdom and Charisma scores determined by rolling 3d6 for each ability. The orb speaks, reads, and understands four languages, and can see and hear normally out to a range of 60 feet. Unlike most sentient items, the orb has no will of its own and can't initiate a conflict with the creature in possession of it.\n\nA Professor Orb has extensive knowledge of four narrow academic subjects. When making an Intelligence check to recall lore from any of its areas of expertise, the orb has a +9 bonus to its roll (including its Intelligence modifier).\n\nIn addition to the knowledge it possesses, a professor orb can cast the mage hand cantrip at will. It uses the spell only to transport itself. Its spellcasting ability is Intelligence.",
		categories:['Wondrous'],
		count:1,
		tier:3,
		value:30000,
		proficiencies:[]
	},{
		name:"Robe of Eyes",
		description:"This robe is adorned with eyelike patterns. While you wear the robe, you gain the following benefits:\n\u2022The robe lets you see in all directions, and you have advantage on Wisdom (Perception) checks that rely on sight.\n\u2022You have darkvision out to a range of 120 feet.\n\u2022You can see invisible creatures and objects, as well as see into the Ethereal Plane, out to a range of 120 feet.\n\nThe eyes on the robe can't be closed or averted. Although you can close or avert your own eyes, you are never considered to be doing so while wearing this robe.\n\nA light spell cast on the robe or a daylight spell cast within 5 feet of the robe causes you to be blinded for 1 minute. At the end of each of your turns, you can make a Constitution saving throw (DC 11 for light or DC 15 for daylight), ending the blindness on a success.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:3,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Robe of Stars",
		description:"This black or dark blue robe is embroidered with small white or silver stars. You gain a +1 bonus to saving throws while you wear it.\n\nSix stars, located on the robe's upper front portion, are particularly large. While wearing this robe, you can use an action to pull off one of the stars and use it to cast magic missile as a 5th-level spell. Daily at dusk, 1d6 removed stars reappear on the robe.\n\nWhile you wear the robe, you can use an action to enter the Astral Plane along with everything you are wearing and carrying. You remain there until you use an action to return to the plane you were on. You reappear in the last space you occupied, or if that space is occupied, the nearest unoccupied space.",
		categories:['Wondrous'],
		count:1,
		tier:3,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Scarab of Protection",
		description:"If you hold this beetle-shaped medallion in your hand for 1 round, an inscription appears on its surface revealing its magical nature. It provides two benefits while it is on your person:\n\nYou have advantage on saving throws against spells.\n\nThe scarab has 12 charges. If you fail a saving throw against a necromancy spell or a harmful effect originating from an undead creature, you can use your reaction to expend 1 charge and turn the failed save into a successful one. The scarab crumbles into powder and is destroyed when its last charge is expended.",
		categories:['Wondrous'],
		count:12,
		tier:3,
		value:100000,
		proficiencies:[]
	},{
		name:"Sending Stones",
		description:"Sending stones come in pairs, with each smooth stone carved to match the other so the pairing is easily recognized. While you touch one stone, you can use an action to cast the sending spell from it. The target is the bearer of the other stone. If no creature bears the other stone, you know that fact as soon as you use the stone and don't cast the spell.\n\nOnce sending is cast through the stones, they can't be used again until the next dawn. If one of the stones in a pair is destroyed, the other one becomes nonmagical.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Slippers of Spider Climbing",
		description:"While you wear these light shoes, you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free. You have a climbing speed equal to your walking speed. However, the slippers don't allow you to move this way on a slippery surface, such as one covered by ice or oil.",
		categories:['Wondrous','Clothing'],
		count:1,
		tier:2,
		value:30000,
		attunement:true,
		proficiencies:[]
	},{
		name:"Wind Fan",
		description:"While holding this fan, you can use an action to cast the gust of wind spell (save DC 13) from it. Once used, the fan shouldn't be used again until the next dawn. Each time it is used again before then, it has a cumulative 20 percent chance of not working and tearing into useless, nonmagical tatters.",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Elixir of Health",
		description:"When you drink this potion, it cures any disease afflicting you, and it removes the blinded, deafened, paralyzed, and poisoned conditions. The clear red liquid has tiny bubbles of light in it.",
		categories:['Wondrous','Potion'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Immovable Rod",
		description:"This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place. Until you or another creature uses an action to push the button again, the rod doesn't move, even if it is defying gravity. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can use an action to make a DC 30 Strength check, moving the fixed rod up to 10 feet on a success",
		categories:['Wondrous'],
		count:1,
		tier:1,
		value:30000,
		proficiencies:[]
	},{
		name:"Philter of Love",
		description:"The next time you see a creature within 10 minutes after drinking this philter, you become charmed by that creature for 1 hour. If the creature is of a species and gender you are normally attracted to, you regard it as your true love while you are charmed. This potion's rose-hued, effervescent liquid contains one easy-to-miss bubble shaped like a heart.",
		categories:['Wondrous','Potion'],
		count:1,
		tier:1,
		value:5000,
		proficiencies:[]
	},{
		name:"Potion of Vitality",
		description:"When you drink this potion, it removes any exhaustion you are suffering and cures any disease or poison affecting you. For the next 24 hours, you regain the maximum number of hit points for any Hit Die you spend. The potion's crimson liquid regularly pulses with dull light, calling to mind a heartbeat.",
		count:1,
		value:10000,
		tier:1,
		categories:['Wondrous','Potion']
	},{
		name:"Potion of Speed",
		description:"When you drink this potion, you gain the effect of the haste spell for 1 minute (no concentration required). The potion's yellow fluid is streaked with black and swirl on its own.",
		count:1,
		value:30000,
		tier:2,
		categories:['Wondrous','Potion']
	},{
		name:"Potion of Invisibility",
		description:"This potion's container looks empty but feels as though it holds liquid. When you drink it, you become invisible for 1 hour. Anything you wear or carry is invisible with you. The effect ends early if you attack or cast a spell.",
		count:1,
		value:30000,
		tier:2,
		categories:['Wondrous','Potion']
	},{
		name:"Potion of Heroism",
		description:"For 1 hour after drinking it, you gain 10 temporary hit points that last for 1 hour. For the same duration, you are under the effect of the bless spell (no concentration required). This blue potion bubbles and steams as if boiling.",
		count:1,
		value:10000,
		tier:1,
		categories:['Wondrous','Potion']
	},{
		name:"Potion of Gaseous Form",
		description:"When you drink this potion, you gain the effect of the gaseous form spell for 1 hour (no concentration required) or until you end the effect as a bonus action. This potion's container seems to hold fog that moves and pours like water.",
		count:1,
		value:10000,
		tier:1,
		categories:['Wondrous','Potion']
	},{
		name:"Potion of Flying",
		description:"When you drink this potion, you gain a flying speed equal to your walking speed for 1 hour and can hover. If you're in the air when the potion wears off, you fall unless you have some other means of staying aloft. This potion's clear liquid floats at the top of its container and has cloudy white impurities drifting in it.",
		count:1,
		value:10000,
		tier:1,
		categories:['Wondrous','Potion']
	},{
		name:"Potion of Climbing",
		description:"When you drink this potion, you gain a climbing speed equal to your walking speed for 1 hour. During this time, you have advantage on Strength (Athletics) checks you make to climb. The potion is separated into brown, silver, and gray layers resembling bands of stone. Shaking the bottle fails to mix the colors.",
		count:1,
		value:10000,
		tier:1,
		categories:['Wondrous','Potion']
	},{
		name:'Magician\'s Judge +1',
		description:'This weapon has a +1 bonus to attack and damage rolls.\n\nGrants Dispel Magic (level 3) once per day.',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage2:'2d6',
		damageType:"Slashing",
		value:300000,
		heavy:true,
		proficiencies:['Martial Weapons','Greatswords']
	},{
		name:'Skingorger +1',
		description:'This weapon has a +1 bonus to attack and damage rolls.\n\nOnce per day, you can use your bonus action to take a point of exhaustion and empower the blade. For one minute, all attacks deal an additional 1d8 acid damage, and this weapon crits on a 19 or 20.',
		categories:['Martial','Melee','Weapon'],
		count:1,
		damage2:'2d6',
		damageType:"Slashing",
		value:300000,
		heavy:true,
		proficiencies:['Martial Weapons','Greatswords']
	},{
		name:'Tinkertop Boltblaster +1',
		description:'This weapon has a +1 bonus to attack and damage rolls.\n\nWhenever you roll a natural 20 with this weapon, it fires an additional bolt at its target.\n\nWhenever you roll a natural 1 with this weapon, the weapon misfires and you roll the weapon\'s damage against yourself.',
		categories:['Simple','Ranged','Weapon'],
		count:1,
		damage2:'1d8',
		damageType:"Piercing",
		value:200000,
		attackRange:[80,320],
		proficiencies:['Simple Weapons','Light Crossbows']
	},{
		name:"Scroll",
		description:"If the spell written on this scroll is on your class's spell list, you can read the scroll and cast it without having to provide any of the spell's components. Once the spell is cast, the scroll is destroyed. If the casting is interrupted, the scroll is not lost.\n\nIf the spell is on your class's spell list but of a higher level than you can normally cast, you must make a DC 18 ability check using your spellcasting ability. On a failed check, the scroll is destroyed.\n\nA spell cast from this scroll has a save DC of 18 and an attack bonus of +10.",
		count:1,
		value:0,
		tier:2,
		categories:['Scroll'],
		onGenerate:function(luck){
			let tierBreakpoints=[
				{min:20,max:50},
				{min:30,max:60},
				{min:30,max:80},
				{min:30,max:100},
				{min:20,max:150},
				{min:20,max:200},
				{min:20,max:300},
				{min:20,max:450}
			];
			let level=0;
			for (level=0;level<9;){
				let rand = Math.rand(0,tierBreakpoints[level].max + luck);
				if (rand < luck + tierBreakpoints[level].min){
					level++;
				} else {
					break;
				}
			}
			level++;
			let spell = randomSpell(level);
			this.name=this.name+" of "+spell;
			switch(level){
				case 1: this.value=500;break;
				case 2: this.value=1500;break;
				case 3: this.value=5000;break;
				case 4: this.value=15000;break;
				case 5: this.value=45000;break;
				case 6: this.value=70000;break;
				case 7: this.value=100000;break;
				case 8: this.value=250000;break;
				case 9: this.value=500000;break;
			}
		}
	},{
		name:"Gem",
		description:"",
		count:1,
		value:5000,
		categories:['Component'],
		rarity:2,
		onGenerate:function(){
			this.count=Math.rand(0,4) + Math.rand(1,3);
			switch (Math.rand(0,7)){
				case 0:this.name="Diamond";break;
				case 1:this.name="Diamond";break;
				case 2:this.name="Ruby";break;
				case 3:this.name="Agate";break;
				case 4:this.name="Sapphire";break;
				case 5:this.name="Onyx";break;
				case 6:this.name="Pearl";break;
			}
		}
	},
	
];








/////////////////////////////////////////////////////////
//Generated from 5etools
/////////////////////////////////////////////////////////
window.items.append(
[{"name":"Abacus","value":200,"categories":["Junk"],"description":"","count":1},{"name":"Acid (vial)","value":2500,"categories":["Junk"],"description":"As an action, you can splash the contents of this vial onto a creature within 5 feet of you or throw the vial up to 20 feet, shattering it on impact. In either case, make a ranged attack against a creature or object, treating the acid as an improvised weapon. On a hit, the target takes 2d6 acid damage.","count":1},{"name":"Alchemist's Fire (flask)","value":5000,"categories":["Junk"],"description":"This sticky, adhesive fluid ignites when exposed to air. As an action, you can throw this flask up to 20 feet, shattering it on impact. Make a ranged attack against a creature or object, treating the alchemist's fire as an improvised weapon. On a hit, the target takes 1d4 fire damage at the start of each of its turns. A creature can end this damage by using its action to make a DC 10 Dexterity check to extinguish the flames.","count":1},{"name":"Alchemist's Supplies","value":5000,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Antitoxin","value":5000,"categories":["Junk"],"description":"A creature that drinks this vial of liquid gains advantage on saving throws against poison for 1 hour. It confers no benefit to undead or constructs.","count":1},{"name":"Assassin's Blood (Ingested)","value":15000,"categories":["Junk"],"description":"A creature subjected to this poison must make a DC 10 Constitution saving throw. On a failed save, it takes 6 (1d12) poison damage and is poisoned for 24 hours. On a successful save, the creature takes half damage and isn't poisoned.","count":1},{"name":"Backpack","value":200,"categories":["Junk"],"description":"A backpack can hold one cubic foot or 30 pounds of gear. You can also strap items, such as a bedroll or a coil of rope, to the outside of a backpack.","count":1},{"name":"Ball Bearing","value":0,"categories":["Junk"],"description":"Most commonly found inside a Ball Bearings (Bag of 1,000).","count":1},{"name":"Ball Bearings (Bag of 1,000)","value":100,"categories":["Junk"],"description":"As an action, you can spill these tiny metal balls from their pouch to cover a level area 10 feet square. A creature moving across the covered area must succeed on a DC 10 Dexterity saving throw or fall prone. A creature moving through the area at half speed doesn't need to make the saving throw.","count":1},{"name":"Barrel","value":200,"categories":["Junk"],"description":"A barrel can hold 40 gallons of liquid or 4 cubic feet of solids.","count":1},{"name":"Basic Poison (vial)","value":10000,"categories":["Junk"],"description":"You can use the poison in this vial to coat one slashing or piercing weapon or up to three pieces of ammunition. Applying the poison takes an action. A creature hit by the poisoned weapon or ammunition must make a DC 10 Constitution saving throw or take 1d4 poison damage. Once applied, the poison retains potency for 1 minute before drying.","count":1},{"name":"Basket","value":40,"categories":["Junk"],"description":"A basket holds 2 cubic feet or 40 pounds of gear.","count":1},{"name":"Bedroll","value":100,"categories":["Junk"],"description":"","count":1},{"name":"Bell","value":100,"categories":["Junk"],"description":"","count":1},{"name":"Blanket","value":50,"categories":["Junk"],"description":"","count":1},{"name":"Block and Tackle","value":100,"categories":["Junk"],"description":"A set of pulleys with a cable threaded through them and a hook to attach to objects, a block and tackle allows you to hoist up to four times the weight you can normally lift.","count":1},{"name":"Book","value":2500,"categories":["Junk"],"description":"A book might contain poetry, historical accounts, information pertaining to a particular field of lore, diagrams and notes on gnomish contraptions, or just about anything else that can be represented using text or pictures. A book of spells is a spellbook (described later in this section).","count":1},{"name":"Brewer's Supplies","value":2000,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Bucket","value":5,"categories":["Junk"],"description":"A bucket holds 3 gallons of liquid, or half a cubic foot of solids.","count":1},{"name":"Bullseye Lantern","value":1000,"categories":["Junk"],"description":"A bullseye lantern casts bright light in a 60-foot cone and dim light for an additional 60 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil.","count":1},{"name":"Burnt Othur Fumes (Inhaled)","value":50000,"categories":["Junk"],"description":"A creature subjected to this poison must succeed on a DC 13 Constitution saving throw or take 10 (3d6) poison damage, and must repeat the saving throw at the start of each of its turns. On each successive failed save, the character takes 3 (1d6) poison damage. After three successful saves, the poison ends.","count":1},{"name":"Calligrapher's Supplies","value":1000,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Caltrops","value":5,"categories":["Junk"],"description":"As an action, you can spread a single bag of caltrops to cover a 5-foot-square area. Any creature that enters the area must succeed on a DC 15 Dexterity saving throw or stop moving and take 1 piercing damage. Until the creature regains at least 1 hit point, its walking speed is reduced by 10 feet. A creature moving through the area at half speed doesn't need to make the saving throw.","count":1},{"name":"Caltrops (20)","value":100,"categories":["Junk"],"description":"As an action, you can spread a single bag of caltrops to cover a 5-foot-square area. Any creature that enters the area must succeed on a DC 15 Dexterity saving throw or stop moving and take 1 piercing damage. Until the creature regains at least 1 hit point, its walking speed is reduced by 10 feet. A creature moving through the area at half speed doesn't need to make the saving throw.","count":1},{"name":"Candle","value":1,"categories":["Junk"],"description":"For 1 hour, a candle sheds bright light in a 5-foot radius and dim light for an additional 5 feet.","count":1},{"name":"Carpenter's Tools","value":800,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Carrion Crawler Mucus (Contact)","value":20000,"categories":["Junk"],"description":"This poison must be harvested from a dead or incapacitated carrion crawler. A creature subjected to this poison must succeed on a DC 13 Constitution saving throw or be poisoned for 1 minute. The poisoned creature is paralyzed. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.","count":1},{"name":"Cartographer's Tools","value":1500,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Chain (10 feet)","value":500,"categories":["Junk"],"description":"A chain has 10 hit points. It can be burst with a successful DC 20 Strength check.","count":1},{"name":"Chalk (1 piece)","value":1,"categories":["Junk"],"description":"","count":1},{"name":"Chest","value":500,"categories":["Junk"],"description":"A chest holds 12 cubic feet or 300 pounds of gear.","count":1},{"name":"Climber's Kit","value":2500,"categories":["Junk"],"description":"A climber's kit includes special pitons, boot tips, gloves, and a harness. You can use the climber's kit as an action to anchor yourself; when you do, you can't fall more than 25 feet from the point where you anchored yourself, and you can't climb more than 25 feet away from that point without undoing the anchor.","count":1},{"name":"Cobbler's Tools","value":500,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Common Clothes","value":50,"categories":["Junk"],"description":"","count":1},{"name":"Component Pouch","value":2500,"categories":["Junk"],"description":"A component pouch is a small, watertight leather belt pouch that has compartments to hold all the material components and other special items you need to cast your spells, except for those components that have a specific cost (as indicated in a spell's description).","count":1},{"name":"Cook's Utensils","value":100,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Costume Clothes","value":500,"categories":["Junk"],"description":"","count":1},{"name":"Crossbow Bolt Case","value":100,"categories":["Junk"],"description":"This wooden case can hold up to twenty crossbow bolts.","count":1},{"name":"Crowbar","value":200,"categories":["Junk"],"description":"Using a crowbar grants advantage to Strength checks where the crowbar's leverage can be applied.","count":1},{"name":"Disguise Kit","value":2500,"categories":["Tool"],"description":"This pouch of cosmetics, hair dye, and small props lets you create disguises that change your physical appearance. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to create a visual disguise.","count":1},{"name":"Drow Poison (Injury)","value":20000,"categories":["Junk"],"description":"This poison is typically made only by the drow, and only in a place far removed from sunlight. A creature subjected to this poison must succeed on a DC 13 Constitution saving throw or be poisoned for 1 hour. If the saving throw fails by 5 or more, the creature is also unconscious while poisoned in this way. The creature wakes up if it takes damage or if another creature takes an action to shake it awake.","count":1},{"name":"Essence of Ether (Inhaled)","value":30000,"categories":["Junk"],"description":"A creature subjected to this poison must succeed on a DC 15 Constitution saving throw or become poisoned for 8 hours. The poisoned creature is unconscious. The creature wakes up if it takes damage or if another creature takes an action to shake it awake.","count":1},{"name":"Fine Clothes","value":1500,"categories":["Junk"],"description":"","count":1},{"name":"Fishing Tackle","value":100,"categories":["Junk"],"description":"This kit includes a wooden rod, silken line, corkwood bobbers, steel hooks, lead sinkers, velvet lures, and narrow netting.","count":1},{"name":"Flask","value":1,"categories":["Junk"],"description":"A flask holds 1 pint of liquid.","count":1},{"name":"Forgery Kit","value":1500,"categories":["Tool"],"description":"This small box contains a variety of papers and parchments, pens and inks, seals and sealing wax, gold and silver leaf, and other supplies necessary to create convincing forgeries of physical documents. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to create a physical forgery of a document.","count":1},{"name":"Glass Bottle","value":200,"categories":["Junk"],"description":"A bottle holds 1.5 pints of liquid.","count":1},{"name":"Glassblower's Tools","value":3000,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Grappling Hook","value":200,"categories":["Junk"],"description":"","count":1},{"name":"Hacking Tools","value":0,"categories":["Tool"],"description":"This kit contains the hardware and software necessary to allow access into most computer systems and electronic devices. Proficiency with hacking tools lets you add your proficiency bonus to any Intelligence checks you make to connect to or make use of a computer system or electronic device. The kit fits snugly in a backpack or toolbox. ","count":1},{"name":"Hammer","value":100,"categories":["Junk"],"description":"","count":1},{"name":"Healer's Kit","value":500,"categories":["Junk"],"description":"This kit is a leather pouch containing bandages, salves, and splints. The kit has ten uses. As an action, you can expend one use of the kit to stabilize a creature that has 0 hit points, without needing to make a Wisdom (Medicine) check.","count":1},{"name":"Hempen Rope (50 feet)","value":100,"categories":["Junk"],"description":"Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check.","count":1},{"name":"Herbalism Kit","value":500,"categories":["Tool"],"description":"This kit contains a variety of instruments such as clippers, mortar and pestle, and pouches and vials used by herbalists to create remedies and potions. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to identify or apply herbs. Also, proficiency with this kit is required to create antitoxin and potions of healing.","count":1},{"name":"Holy Water (flask)","value":2500,"categories":["Junk"],"description":"As an action, you can splash the contents of this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact. In either case, make a ranged attack against a target creature, treating the holy water as an improvised weapon. If the target is a fiend or undead, it takes 2d6 radiant damage.\n\nA cleric or paladin may create holy water by performing a special ritual. The ritual takes 1 hour to perform, uses 25 gp worth of powdered silver, and requires the caster to expend a 1st-level spell slot.","count":1},{"name":"Hooded Lantern","value":500,"categories":["Junk"],"description":"A hooded lantern casts bright light in a 30-foot radius and dim light for an additional 30 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil. As an action, you can lower the hood, reducing the light to dim light in a 5-foot radius.","count":1},{"name":"Hourglass","value":2500,"categories":["Junk"],"description":"","count":1},{"name":"Hunting Trap","value":500,"categories":["Junk"],"description":"When you use your action to set it, this trap forms a saw-toothed steel ring that snaps shut when a creature steps on a pressure plate in the center. The trap is affixed by a heavy chain to an immobile object, such as a tree or a spike driven into the ground. A creature that steps on the plate must succeed on a DC 13 Dexterity saving throw or take 1d4 piercing damage and stop moving. Thereafter, until the creature breaks free of the trap, its movement is limited by the length of the chain (typically 3 feet long). A creature can use its action to make a DC 13 Strength check, freeing itself or another creature within its reach on a success. Each failed check deals 1 piercing damage to the trapped creature.","count":1},{"name":"Ink (1-ounce bottle)","value":1000,"categories":["Junk"],"description":"Ink (1-ounce bottle)","count":1},{"name":"Ink Pen","value":2,"categories":["Junk"],"description":"","count":1},{"name":"Insect Repellent (block of incense)","value":10,"categories":["Junk"],"description":"","count":1},{"name":"Insect Repellent (greasy salve)","value":100,"categories":["Junk"],"description":"","count":1},{"name":"Iron Pot","value":200,"categories":["Junk"],"description":"An iron pot holds 1 gallon of liquid.","count":1},{"name":"Iron Spikes","value":10,"categories":["Junk"],"description":"","count":1},{"name":"Iron Spikes (10)","value":100,"categories":["Junk"],"description":"","count":1},{"name":"Jeweler's Tools","value":2500,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Jug","value":2,"categories":["Junk"],"description":"A jug holds 1 gallon of liquid.","count":1},{"name":"Ladder (10-foot)","value":10,"categories":["Junk"],"description":"Ladder (10-foot)","count":1},{"name":"Lamp","value":50,"categories":["Junk"],"description":"A lamp casts bright light in a 15-foot radius and dim light for an additional 30 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil.","count":1},{"name":"Leatherworker's Tools","value":500,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Lock","value":1000,"categories":["Junk"],"description":"A key is provided with the lock. Without the key, a creature proficient with thieves' tools can pick this lock with a successful DC 15 Dexterity check. Your DM may decide that better locks are available for higher prices.","count":1},{"name":"Magnifying Glass","value":10000,"categories":["Junk"],"description":"This lens allows a closer look at small objects. It is also useful as a substitute for flint and steel when starting fires. Lighting a fire with a magnifying glass requires light as bright as sunlight to focus, tinder to ignite, and about 5 minutes for the fire to ignite. A magnifying glass grants advantage on any ability check made to appraise or inspect an item that is small or highly detailed.","count":1},{"name":"Malice (Inhaled)","value":25000,"categories":["Junk"],"description":"A creature subjected to this poison must succeed on a DC 15 Constitution saving throw or become poisoned for 1 hour. The poisoned creature is blinded.","count":1},{"name":"Manacles","value":200,"categories":["Junk"],"description":"These metal restraints can bind a Small or Medium creature. Escaping the manacles requires a successful DC 20 Dexterity check. Breaking them requires a successful DC 20 Strength check. Each set of manacles comes with one key. Without the key, a creature proficient with thieves' tools can pick the manacles' lock with a successful DC 15 Dexterity check. Manacles have 15 hit points.","count":1},{"name":"Map or Scroll Case","value":100,"categories":["Junk"],"description":"This cylindrical leather case can hold up to ten rolled-up sheets of paper or five rolled-up sheets of parchment.","count":1},{"name":"Mason's Tools","value":1000,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Menga leaves (1 ounce)","value":200,"categories":["Junk"],"description":"","count":1},{"name":"Merchant's Scale","value":500,"categories":["Junk"],"description":"A scale includes a small balance, pans, and a suitable assortment of weights up to 2 pounds. With it, you can measure the exact weight of small objects, such as raw precious metals or trade goods, to help determine their worth.","count":1},{"name":"Mess Kit","value":20,"categories":["Junk"],"description":"This tin box contains a cup and simple cutlery. The box clamps together, and one side can be used as a cooking pan and the other as a plate or shallow bowl.","count":1},{"name":"Midnight Tears (Ingested)","value":150000,"categories":["Junk"],"description":"A creature that ingests this poison suffers no effect until the stroke of midnight. If the poison has not been neutralized before then, the creature must succeed on a DC 17 Constitution saving throw, taking 31 (9d6) poison damage on a failed save, or half as much damage on a successful one.","count":1},{"name":"Miner's Pick","value":200,"categories":["Junk"],"description":"","count":1},{"name":"Navigator's Tools","value":2500,"categories":["Tool"],"description":"This set of instruments is used for navigation at sea. Proficiency with navigator's tools lets you chart a ship's course and follow navigation charts. In addition, these tools allow you to add your proficiency bonus to any ability check you make to avoid getting lost at sea.","count":1},{"name":"Oil (flask)","value":10,"categories":["Junk"],"description":"Oil usually comes in a clay flask that holds 1 pint. As an action, you can splash the oil in this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact. Make a ranged attack against a target creature or object, treating the oil as an improvised weapon. On a hit, the target is covered in oil. If the target takes any fire damage before the oil dries (after 1 minute), the target takes an additional 5 fire damage from the burning oil. You can also pour a flask of oil on the ground to cover a 5-foot-square area, provided that the surface is level. If lit, the oil burns for 2 rounds and deals 5 fire damage to any creature that enters the area or ends its turn in the area. A creature can take this damage only once per turn.","count":1},{"name":"Oil of Taggit (Contact)","value":40000,"categories":["Junk"],"description":"A creature subjected to this poison must succeed on a DC 13 Constitution saving throw or become poisoned for 24 hours. The poisoned creature is unconscious. The creature wakes up if it takes damage.","count":1},{"name":"Painter's Supplies","value":1000,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Pale Tincture (Ingested)","value":25000,"categories":["Junk"],"description":"A creature subjected to this poison must succeed on a DC 16 Constitution saving throw or take 3 (1d6) poison damage and become poisoned. The poisoned creature must repeat the saving throw every 24 hours, taking 3 (1d6) poison damage on a failed save. Until this poison ends, the damage the poison deals can't be healed by any means. After seven successful saving throws, the effect ends and the creature can heal normally.","count":1},{"name":"Paper (one sheet)","value":20,"categories":["Junk"],"description":"Paper (one sheet)","count":1},{"name":"Parchment (one sheet)","value":10,"categories":["Junk"],"description":"Parchment (one sheet)","count":1},{"name":"Perfume (vial)","value":500,"categories":["Junk"],"description":"","count":1},{"name":"Pitcher","value":2,"categories":["Junk"],"description":"A pitcher holds 1 gallon of liquid.","count":1},{"name":"Piton","value":5,"categories":["Junk"],"description":"","count":1},{"name":"Poisoner's Kit","value":5000,"categories":["Tool"],"description":"A poisoner's kit includes the vials, chemicals, and other equipment necessary for the creation of poisons. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to craft or use poisons.\n\nAdditionally, the Crafting and Harvesting Poison|dmg|8|Crafting and Harvesting Poison rules require the use of a poisoner's kit.","count":1},{"name":"Pole (10-foot)","value":5,"categories":["Junk"],"description":"","count":1},{"name":"Portable Ram","value":400,"categories":["Junk"],"description":"You can use a portable ram to break down doors. When doing so, you gain a +4 bonus on the Strength check. One other character can help you use the ram, giving you advantage on this check.","count":1},{"name":"Potter's Tools","value":1000,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Pouch","value":50,"categories":["Junk"],"description":"A cloth or leather pouch can hold up to 20 sling bullets or 50 blowgun needles, among other things. A compartmentalized pouch for holding spell components is called a component pouch. A pouch can hold up to ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ cubic foot or 6 pounds of gear.","count":1},{"name":"Purple Worm Poison (Injury)","value":200000,"categories":["Junk"],"description":"This poison must be harvested from a dead or incapacitated purple worm. A creature subjected to this poison must make a DC 19 Constitution saving throw, taking 42 (12d6) poison damage on a failed save, or half as much damage on a successful one.","count":1},{"name":"Quiver","value":100,"categories":["Junk"],"description":"A quiver can hold up to 20 arrows.","count":1},{"name":"Rain Catcher","value":100,"categories":["Junk"],"description":"A rain catcher is a simple contraption consisting of a 5-foot-square leather tarp and a wooden frame with legs. When the tarp is stretched across the wooden frame, it forms a basin that can catch 2 gallons of drinking water per inch of rainfall and hold up to 8 gallons. The tarp and wooden frame fold up for easy transport.","count":1},{"name":"Rations (1 day)","value":50,"categories":["Junk"],"description":"Rations consist of dry foods suitable for extended travel, including jerky, dried fruit, hardtack, and nuts.","count":1},{"name":"Robes","value":100,"categories":["Junk"],"description":"","count":1},{"name":"Ryath Root","value":5000,"categories":["Junk"],"description":"Any creature that ingests a ryath root gains 2d4 temporary hit points. A creature that consumes more than one ryath root in a 24-hour period must succeed on a DC 13 Constitution saving throw or suffer the poisoned condition for 1 hour","count":1},{"name":"Sack","value":1,"categories":["Junk"],"description":"A sack can hold up to 1 cubic foot or 30 pounds of gear.","count":1},{"name":"Sealing Wax","value":50,"categories":["Junk"],"description":"","count":1},{"name":"Serpent Venom (Injury)","value":20000,"categories":["Junk"],"description":"This poison must be harvested from a dead or incapacitated giant poisonous snake. A creature subjected to this poison must succeed on a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one.","count":1},{"name":"Shovel","value":200,"categories":["Junk"],"description":"","count":1},{"name":"Signal Whistle","value":5,"categories":["Junk"],"description":"","count":1},{"name":"Signet Ring","value":500,"categories":["Junk"],"description":"","count":1},{"name":"Silk Rope (50 feet)","value":1000,"categories":["Junk"],"description":"Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check.","count":1},{"name":"Sinda berries (10)","value":500,"categories":["Junk"],"description":"","count":1},{"name":"Sledgehammer","value":200,"categories":["Junk"],"description":"","count":1},{"name":"Smith's Tools","value":2000,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Soap","value":2,"categories":["Junk"],"description":"","count":1},{"name":"Spellbook","value":5000,"categories":["Junk"],"description":"Essential for wizards, a spellbook is a leather-bound tome with 100 blank vellum pages suitable for recording spells.","count":1},{"name":"Spyglass","value":100000,"categories":["Junk"],"description":"Objects viewed through a spyglass are magnified to twice their size.","count":1},{"name":"Steel Mirror","value":500,"categories":["Junk"],"description":"","count":1},{"name":"Tankard","value":1,"categories":["Junk"],"description":"A tankard holds 1 pint of liquid.","count":1},{"name":"Thieves' Tools","value":2500,"categories":["Tool"],"description":"This set of tools includes a small file, a set of lock picks, a small mirror mounted on a metal handle, a set of narrow-bladed scissors, and a pair of pliers. Proficiency with these tools lets you add your proficiency bonus to any ability checks you make to disarm traps or open locks.","count":1},{"name":"Tinderbox","value":50,"categories":["Junk"],"description":"This small container holds flint, fire steel, and tinder (usually dry cloth soaked in light oil) used to kindle a fire. Using it to light a torch - or anything else with abundant, exposed fuel - takes an action. Lighting any other fire takes 1 minute.","count":1},{"name":"Tinker's Tools","value":5000,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Tome of Strahd","value":0,"categories":["Junk"],"description":"The Tome of Strahd is an ancient work penned by Strahd, a tragic tale of how he came to his fallen state. The book is bound in a thick leather cover with steel hinges and fastenings. The pages are of parchment and very brittle. Most of the book is written in the curious shorthand that only Strahd employs. Stains and age have made most of the work illegible, but several paragraphs remain intact.","count":1},{"name":"Torch","value":1,"categories":["Junk"],"description":"A torch burns for 1 hour, providing bright light in a 20-foot radius and dim light for an additional 20 feet. If you make a melee attack with a burning torch and hit, it deals 1 fire damage.","count":1},{"name":"Torpor (Ingested)","value":60000,"categories":["Junk"],"description":"A creature subjected to this poison must succeed on a DC 15 Constitution saving throw or become poisoned for 4d6 hours. The poisoned creature is incapacitated.","count":1},{"name":"Traveler's Clothes","value":200,"categories":["Junk"],"description":"","count":1},{"name":"Truth Serum (Ingested)","value":15000,"categories":["Junk"],"description":"A creature subjected to this poison must succeed on a DC 11 Constitution saving throw or become poisoned for 1 hour. The poisoned creature can't knowingly speak a lie, as if under the effect of a zone of truth spell.","count":1},{"name":"Two-Person Tent","value":200,"categories":["Junk"],"description":"A simple and portable canvas shelter, a tent sleeps two.","count":1},{"name":"Unbreakable Arrow","value":0,"categories":["Ammunition"],"description":"This arrow can't be broken, except when it is within an antimagic field.","count":1},{"name":"Vial","value":100,"categories":["Junk"],"description":"A vial can hold up to 4 ounces of liquid.","count":1},{"name":"Waterskin","value":20,"categories":["Junk"],"description":"A waterskin can hold up to 4 pints of liquid.","count":1},{"name":"Weaver's Tools","value":100,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Whetstone","value":1,"categories":["Junk"],"description":"","count":1},{"name":"Wildroot","value":2500,"categories":["Junk"],"description":"Introducing the juice of a wildroot into a poisoned creature's bloodstream (for example, by rubbing it on an open wound) rids the creature of the poisoned condition. Once used in this way, a wildroot loses this property.","count":1},{"name":"Woodcarver's Tools","value":100,"categories":["Artisan Tool"],"description":"","count":1},{"name":"Wyvern Poison (Injury)","value":120000,"categories":["Junk"],"description":"This poison must be harvested from a dead or incapacitated wyvern. A creature subjected to this poison must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.","count":1},{"name":"Yahcha","value":100,"categories":["Junk"],"description":"A yahcha (pronounced YAH-chah) is a harmless, meaty beetle about the size of a human hand, which feeds on worms and maggots. It moves slowly (walking speed 10 feet) and is easy to catch. A creature with mad monkey fever that eats a raw or cooked yahcha can immediately make a saving throw with advantage against that disease (see \"Diseases,\" page 40),","count":1},{"name":"Zabou","value":1000,"categories":["Junk"],"description":"Zabou mushrooms feed on offal and the rotting wood of dead trees. If handled carefully, a zabou can be picked or uprooted without causing it to release its spores. If crushed or struck, a zabou releases its spores in a 10-foot-radius sphere. A zabou can also be hurled up to 30 feet away or dropped like a grenade, releasing its cloud of spores on impact. Any creature in that area must succeed on a DC 10 Constitution saving throw or be poisoned for 1 minute. The poisoned creature's skin itches for the duration. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.","count":1}]
);