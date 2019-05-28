let instrumentDescription=function(){
	return "If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument.nA bard can use a musical instrument as a spellcasting focus, substituting it for any material component that does not list a cost.\nEach type of musical instrument requires a separate proficiency.\n\nProficiency with a musical instrument indicates you are familiar with the techniques used to play it. You also have knowledge of some songs commonly performed with that instrument.\n\u2022 History. Your expertise aids you in recalling lore related to your instrument.\n\u2022 Performance. Your ability to put on a good show is improved when you incorporate an instrument into your act.\n\u2022 Compose a Tune. As part of a long rest, you can compose a new tune and lyrics for your instrument. You might use this ability to impress a noble or spread scandalous rumors with a catchy tune.";
}

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
		value:40000,
		proficiencies:['Medium Armor']
	},{
		name:'Chain Mail',
		description:'Made of interlocking metal rings, chain mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows. The suit includes gauntlets.\nThe wearer has disadvantage on Stealth (Dexterity) checks.\nIf the wearer has a Strength score lower than 13, their speed is reduced by 10 feet.',
		ac:'16',
		categories:['Armor'],
		count:1,
		value:7500,
		proficiencies:['Heavy Armor']
	},{
		name:'Chain Shirt',
		description:'Made of interlocking metal rings, a chain shirt is worn between layers of clothing or leather. This armor offers modest protection to the wearer\'s upper body and allows the sound of the rings rubbing against one another to be muffled by outer layers.',
		ac:'13 + Dex (max +2)',
		categories:['Armor'],
		count:1,
		value:5000,
		proficiencies:['Medium Armor']
	},{
		name:'Half Plate Armor',
		description:'Half plate consists of shaped metal plates that cover most of the wearer\'s body. It does not include leg protection beyond simple greaves that are attached with leather straps.\nThe wearer has disadvantage on Stealth (Dexterity) checks.',
		ac:'15 + Dex (max +2)',
		categories:['Armor'],
		count:1,
		value:75000,
		proficiencies:['Medium Armor']
	},{
		name:'Hide Armor',
		description:'This crude armor consists of thick furs and pelts. It is commonly worn by barbarian tribes, evil humanoids, and other folk who lack access to the tools and materials needed to create better armor.',
		ac:'12 + Dex (max +2)',
		categories:['Armor'],
		count:1,
		value:1000,
		proficiencies:['Medium Armor']
	},{
		name:'Leather Armor',
		description:'The breastplate and shoulder protectors of this armor are made of leather that has been stiffened by being boiled in oil. The rest of the armor is made of softer and more flexible materials.',
		ac:'11 + Dex',
		categories:['Armor'],
		count:1,
		value:1000,
		proficiencies:['Light Armor']
	},{
		name:'Padded Armor',
		description:'Padded armor consists of quilted layers of cloth and batting.\nThe wearer has disadvantage on Stealth (Dexterity) checks.',
		ac:'11 + Dex',
		categories:['Armor'],
		count:1,
		value:500,
		proficiencies:['Light Armor']
	},{
		name:'Plate Armor',
		description:'Plate consists of shaped, interlocking metal plates to cover the entire body. A suit of plate includes gauntlets, heavy leather boots, a visored helmet, and thick layers of padding underneath the armor. Buckles and straps distribute the weight over the body.\nThe wearer has disadvantage on Stealth (Dexterity) checks.\nIf the wearer has a Strength score lower than 15, their speed is reduced by 10 feet.',
		ac:'18',
		categories:['Armor'],
		count:1,
		value:150000,
		proficiencies:['Heavy Armor']
	},{
		name:'Ring Mail',
		description:'This armor is leather armor with heavy rings sewn into it. The rings help reinforce the armor against blows from swords and axes. Ring mail is inferior to chain mail, and it\'s usually worn only by those who can\'t afford better armor.\nThe wearer has disadvantage on Stealth (Dexterity) checks.',
		ac:'14',
		categories:['Armor'],
		count:1,
		value:3000,
		proficiencies:['Heavy Armor']
	},{
		name:'Scale Mail',
		description:'This armor consists of a coat and leggings (and perhaps a separate skirt) of leather covered with overlapping pieces of metal, much like the scales of a fish. The suit includes gauntlets.\nThe wearer has disadvantage on Stealth (Dexterity) checks.',
		ac:'14 + Dex (max +2)',
		categories:['Armor'],
		count:1,
		value:5000,
		proficiencies:['Medium Armor']
	},{
		name:'Splint Armor',
		description:'This armor is made of narrow vertical strips of metal riveted to a backing of leather that is worn over cloth padding. Flexible chain mail protects the joints.\nThe wearer has disadvantage on Stealth (Dexterity) checks.\nIf the wearer has a Strength score lower than 15, their speed is reduced by 10 feet.',
		ac:'17',
		categories:['Armor'],
		count:1,
		value:20000,
		proficiencies:['Heavy Armor']
	},{
		name:'Studded Leather Armor',
		description:'Made from tough but flexible leather, studded leather is reinforced with close-set rivets or spikes.',
		ac:'12 + Dex',
		categories:['Armor'],
		count:1,
		value:4500,
		proficiencies:['Light Armor']
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
		value:100
	},
	//magical
	{
		name:'The Scroll of Beginnings',
		description:'The Scroll of Beginnings is the only artifact left over from the forming of the plane. It\'s theorized that the text contained within determines the nature of reality, and the scroll may even have the ability to change its own text, rewriting reality in the process.\nWhen you read the scroll as an action, make an Intelligence saving throw, DC 20. If you succeed, you cast Wish at 9th level, choosing any of the effects listed in the spell description. You do not suffer the normal stress for choosing an effect other than duplicating another spell.\nThe Scroll of Beginnings is consumed when you successfully read it.',
		categories:['Wondrous','Artifact'],
		count:1,
		value:5500000,
		proficiencies:['Language: Primordial']
	},{
		name:'The Mirari',
		description:'This crystal orb glows with a warm energy. Wherever you walk, plants bloom around you, even reviving wilted plants in a matter of seconds.\nWhenever you cast a spell of 3rd level or lower, if that spell is only capable of targeting one creature at the level you cast it at, you can duplicate that spell targeting a second creature.\nThis effect can\'t be used again until you finish a long rest.',
		categories:['Wondrous','Artifact'],
		count:1,
		value:10000,
		proficiencies:['Language: Common']
	},{
		name:'Hover Boots',
		description:'Brass and Gilt adorn the metallic wings that decorate these boots. You may walk horizontally on air or liquid for up to half your movement speed before beginning to fall.',
		categories:['Wondrous','Clothing'],
		count:1,
		value:40000,
		proficiencies:[]
	},{
		name:"Amulet of Nine Lives",
		description:"This ornate amulet is set with nine rubies that glow with a dim crimson light. Ezch time you would die while wearing the amulet, one of the rubies stops glowing, and something miraculous happens to prevent your death. Once all nine rubies have been expended, this becomes a nonmagical amulet worth 10g.",
		categories:['Wondrous','Jewelry'],
		count:9,
		value:1000,
		proficiencies:[]
	},{
		name:"Mirror of Souls",
		description:"This mirror reflects your figure, and the scenery behind you, but no other creatures. When a creature breaks the mirror, they fall to 0 hit points and become unconscious, and their soul is temporarily transferred into another creature within 100 feet. After one hour, or when the creature dies, the soul is transferred into the original body and they are restored to 1 hit point.",
		categories:["Wondrous"],
		count:1,
		value:500,
		proficiencies:[]
	},{
		name:"Gauntlet of Challenge",
		description:"This unassuming gauntlet appears mundane, but when thrown in front of a creature with whom you have asked a one-on-one challenge of some sort, the creature must accept. This effect can't be used until the next dawn.",
		categories:["Wondrous",'Clothing'],
		count:1,
		value:500,
		proficiencies:[]
	},{
		name:"Helm of Command",
		description:"Once per combat on your turn, you may forfeit all your actions for that turn. You designate a creature you can see within 60 feet that can see or hear you. That creature gains a second action on their next turn.",
		categories:['Wondrous','Helmet','Clothing'],
		count:1,
		value:3000,
		proficiencies:['Medium Armor']
	}
];