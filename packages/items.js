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
		valu:100,
		rarity:3
	},{
		name:"Amulet",
		description:"",
		categories:["Jewelry"],
		count:1,
		valu:100,
		rarity:3
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
		value:10000,
		proficiencies:['Language: Common']
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
	}
	
];