window.items=[
	{
		name:'Lyre',
		description:'',
		categories:['Instrument'],
		count:1,
		meleeRange:5,//usually 5 or 10, falsey means no attack
		meleeDamage:'1d4',//can be static, or can be a function that gets sent char and scope
		throwRange:[20,60],//falsey means no attack
		throwDamage:'1d4',//can be static, or can be a function that gets sent char and scope
		finesse:false,
		value:200,
		proficiencies:['Lyre']//char must have one of these to get proficiency bonus
	},	{
		name:'Flute',
		description:'',
		categories:['Instrument'],
		count:1,
		meleeRange:5,
		meleeDamage:'1d4',
		throwRange:[20,60],
		throwDamage:'1d4',
		finesse:false,
		value:200,
		proficiencies:['Flute']
	},	{
		name:'Longsword',
		description:'',
		categories:['Martial','Melee','Weapon'],
		count:1,
		meleeRange:5,
		meleeDamage:'1d8 slashing (2H: 1d10)',
		throwRange:[20,60],
		throwDamage:'1d4',
		finesse:false,
		value:150,
		proficiencies:['Martial Weapons','Longsword']
	},{
		name:'The Scroll of Beginnings',
		description:'The Scroll of Beginnings is the only artifact left over from the forming of the plane. It\'s theorized that the text contained within determines the nature of reality, and the scroll may even have the ability to change its own text, rewriting reality in the process.\nWhen you read the scroll as an action, make an Intelligence saving throw, DC 20. If you succeed, you cast Wish at 9th level using no components, choosing any of the effects listed in the spell description. You do not suffer the normal stress for choosing an effect other than duplicating another spell.\nThe Scroll of Beginnings is consumed when you successfully read it.',
		categories:['Wondrous','Artifact'],
		count:1,
		meleeRange:0,
		meleeDamage:'1',
		throwRange:[5,10],
		throwDamage:'1',
		finesse:false,
		value:5500000,
		proficiencies:['Language: Primordial']
	}
];