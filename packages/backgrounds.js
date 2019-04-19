window.backgrounds=[
	{
		name:"Acolyte",
		description:"You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric—performing sacred rites is not the same thing as channeling divine power.\n\nChoose a god, a pantheon of gods, or some other quasi-divine being, and work with your DM to detail the nature of your religious service. The Gods of the Multiverse section contains a sample pantheon, from the Forgotten Realms setting. Were you a lesser functionary in a temple, raised from childhood to assist the priests in the sacred rites? Or were you a high priest who suddenly experienced a call to serve your god in a different way? Perhaps you were the leader of a small cult outside of any established temple structure, or even an occult group that served a fiendish master that you now deny.",
		featureName:"Shelter of the Faithful",
		featureDescription:"As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle.\n\nYou might also have ties to a specific temple dedicated to your chosen deity or pantheon, and you have a residence there. This could be the temple where you used to serve, if you remain on good terms with it, or a temple where you have found a new home. While near your temple, you can call upon the priests for assistance, provided the assistance you ask for is not hazardous and you remain in good standing with your temple.",
		onPickup:function(char,scope){
			addProficiency(char,'Insight');
			addProficiency(char,'Religion');
			addToInventory(char,findItem('Holy Symbol'));
			addToInventory(char,findItem('Prayer Book'));
			addToInventory(char,findItem('Stick of Incense',5));
			addToInventory(char,findItem('Vestments'));
			addToInventory(char,findItem('Common Clothes'));
			addToInventory(char,findItem('Belt Pouch'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			char.money+=1500;
			scope.choiceQueue.push(helper.learnLanguage);
			scope.choiceQueue.push(helper.learnLanguage);
		}
	},{
		name:"Charlatan",
		description:"Skill Proficiencies: Deception, Sleight of Hand\nTool Proficiencies: Disguise kit, Forgery kit\nEquipment: A set of fine clothes, a disguise kit, tools of the con of your choice (ten stoppered bottles filled with colored liquid, a set of weighted dice, a deck of marked cards, or a signet ring of an imaginary duke), and a belt pouch containing 15 gp",
		featureName:"False Identity",
		featureDescription:"You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona. Additionally, you can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or the handwriting you are trying to copy.",
		onPickup:function(char,scope){
			addProficiency(char,'Deception');
			addProficiency(char,'Sleight of Hand');
			char.proficiencies.upush('Disguise Kit');
			char.proficiencies.upush('Forgery Kit');
			addToInventory(char,findItem('Fine Clothes'));
			addToInventory(char,findItem('Disguise Kit'));
			addToInventory(char,findItem("Conman's Tools"));
			addToInventory(char,findItem('Belt Pouch'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			char.money+=1500;
		}
	},{
		name:"Criminal",
		description:"Skill Proficiencies: Deception, Stealth\nTool Proficiencies: Thieves' Tools\nEquipment: A crowbar, a set of dark common clothes including a hood, and a belt pouch containing 15 gp",
		featureName:"Criminal Contact",
		featureDescription:"You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you.",
		onPickup:function(char,scope){
			addProficiency(char,'Deception');
			addProficiency(char,'Stealth');
			char.proficiencies.upush("Thieves' Tools");
			addToInventory(char,findItem('Dark Hooded Clothes'));
			addToInventory(char,findItem('Crowbar'));
			addToInventory(char,findItem('Belt Pouch'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			char.money+=1500;
		}
	},{
		name:"Spy",
		description:"Skill Proficiencies: Deception, Stealth\nTool Proficiencies: Thieves' Tools\nEquipment: A crowbar, a set of dark common clothes including a hood, and a belt pouch containing 15 gp",
		featureName:"Spy Contact",
		featureDescription:"You have a reliable and trustworthy contact who acts as your liaison to a network of other spies. You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you.",
		onPickup:function(char,scope){
			addProficiency(char,'Deception');
			addProficiency(char,'Stealth');
			char.proficiencies.upush("Thieves' Tools");
			addToInventory(char,findItem('Dark Hooded Clothes'));
			addToInventory(char,findItem('Crowbar'));
			addToInventory(char,findItem('Belt Pouch'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			char.money+=1500;
		}
	},{
		name:"Entertainer",
		description:"Skill Proficiencies: Acrobatics, Performance\nTool Proficiencies: Disguise Kit, a musical instrument\nEquipment: A musical instrument, a favor from an admirer, costume, and a belt pouch containing 15 gp",
		featureName:"By Popular Demand",
		featureDescription:"You can always find a place to perform, usually in an inn or tavern but possibly with a circus, at a theater, or even in a noble's court. At such a place, you receive free lodging and food of a modest or comfortable standard (depending on the quality of the establishment), as long as you perform each night. In addition, your performance makes you something of a local figure. When strangers recognize you in a town where you have performed, they typically take a liking to you.",
		onPickup:function(char,scope){
			addProficiency(char,'Acrobatics');
			addProficiency(char,'Performance');
			char.proficiencies.upush("Disguise Kit");
			addToInventory(char,findItem('Costume'));
			addToInventory(char,findItem('Favor of an admirer'));
			addToInventory(char,findItem('Belt Pouch'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			scope.choiceQueue.push(helper.learnInstrument);
			scope.choiceQueue.push(
				{
					choicePrompt:"Choose a starting instrument",
					choices:[listInstruments],
					action:function(char,derived,choice){
						addToInventory(char,findItem(choice));
					}
				}
			)
			char.money+=1500;
		}
	},{
		name:"Folk Hero",
		description:"Skill Proficiencies: Animal Handling, Survival\nTool Proficiencies: One type of artisan's tools, Land Vehicles\nEquipment: A set of artisan's tools (one of your choice), a shovel, an iron pot, a set of common clothes, and a belt pouch containing 10 gp",
		featureName:"Rustic Hospitality",
		featureDescription:"Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They will shield you from the law or anyone else searching for you, though they will not risk their lives for you.",
		onPickup:function(char,scope){
			addProficiency(char,'Animal Handling');
			addProficiency(char,'Survival');
			char.proficiencies.upush("Land Vehicles");
			addToInventory(char,findItem('Shovel'));
			addToInventory(char,findItem('Iron Pot'));
			addToInventory(char,findItem('Common Clothes'));
			addToInventory(char,findItem('Belt Pouch'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			scope.choiceQueue.push(helper.learnTool);
			scope.choiceQueue.push(
				{
					choicePrompt:"Choose a starting tool",
					choices:["Alchemist's Supplies","Brewer's Supplies","Calligrapher's Supplies","Carpenter's Tools","Cobbler's Tools","Cook's Utensils","Glassblower's Tools","Jeweler's Tools","Leatherworker's Tools","Mason's Tools","Painter's Supplies","Potter's Tools","Smith's Tools","Tinker's Tools","Weaver's Tools","Woodcarver's Tools"],
					action:function(char,derived,choice){
						addToInventory(char,findItem(choice));
					}
				}
			)
			char.money+=1000;
		}
	},{
		name:"Guild Artisan",
		description:"Skill Proficiencies: Insight, Persuasion\nTool Proficiencies: One type of artisan's tools\nLanguages: One of your choice\nEquipment: A set of artisan's tools (one of your choice), a letter of introduction from your guild, a set of traveler's clothes, and a belt pouch containing 15 gp",
		featureName:"Guild Membership",
		featureDescription:"As an established and respected member of a guild, you can rely on certain benefits that membership provides. Your fellow guild members will provide you with lodging and food if necessary, and pay for your funeral if needed. In some cities and towns, a guildhall offers a central place to meet other members of your profession, which can be a good place to meet potential patrons, allies, or hirelings.\n\nGuilds often wield tremendous political power. If you are accused of a crime, your guild will support you if a good case can be made for your innocence or the crime is justifiable. You can also gain access to powerful political figures through the guild, if you are a member in good standing. Such connections might require the donation of money or magic items to the guild's coffers.\n\nYou must pay dues of 5 gp per month to the guild. If you miss payments, you must make up back dues to remain in the guild's good graces.",
		onPickup:function(char,scope){
			addProficiency(char,'Insight');
			addProficiency(char,'Persuasion');
			addToInventory(char,findItem('Guild Introduction Letter'));
			addToInventory(char,findItem("Traveler's Clothes"));
			addToInventory(char,findItem('Belt Pouch'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			scope.choiceQueue.push(helper.learnTool);
			scope.choiceQueue.push(helper.learnLanguage);
			scope.choiceQueue.push(
				{
					choicePrompt:"Choose a starting tool",
					choices:["Alchemist's Supplies","Brewer's Supplies","Calligrapher's Supplies","Carpenter's Tools","Cobbler's Tools","Cook's Utensils","Glassblower's Tools","Jeweler's Tools","Leatherworker's Tools","Mason's Tools","Painter's Supplies","Potter's Tools","Smith's Tools","Tinker's Tools","Weaver's Tools","Woodcarver's Tools"],
					action:function(char,derived,choice){
						addToInventory(char,findItem(choice));
					}
				}
			)
			char.money+=1500;
		}
	},{
		name:"Hermit",
		description:"Skill Proficiencies: Medicine, Religion\nTool Proficiencies: Herbalism Kit\nLanguages: One of your choice\nEquipment: Scroll case stuffed full of notes from your studies or prayers, a winter blanket, a set of common clothes, an herbalism kit, and 5 gp",
		featureName:"Discovery",
		featureDescription:"The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion. It might be a great truth about the cosmos, the deities, the powerful beings of the outer planes, or the forces of nature. It could be a site that no one else has ever seen. You might have uncovered a fact that has long been forgotten, or unearthed some relic of the past that could rewrite history. It might be information that would be damaging to the people who or consigned you to exile, and hence the reason for your return to society.\n\nWork with your DM to determine the details of your discovery and its impact on the campaign.",
		onPickup:function(char,scope){
			addProficiency(char,'Medicine');
			addProficiency(char,'Religion');
			addToInventory(char,findItem('Scrol Case'));
			addToInventory(char,findItem("Common Clothes"));
			addToInventory(char,findItem('Herbalism Kit'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			char.proficiencies.upush('Herbalism Kit');
			scope.choiceQueue.push(helper.learnLanguage);
			char.money+=500;
		}
	},{
		name:"Noble",
		description:"Skill Proficiencies: History, Persuasion\nTool Proficiencies: One type of gaming set\nLanguages: One of your choice\nEquipment: A set of fine clothes, a signet ring, a scroll of pedigree, and a purse containing 25 gp",
		featureName:"Position of Privilege",
		featureDescription:"Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are. The common folk make every effort to accommodate you and avoid your displeasure, and other people of high birth treat you as a member of the same social sphere. You can secure an audience with a local noble if you need to.",
		onPickup:function(char,scope){
			addProficiency(char,'History');
			addProficiency(char,'Persuasion');
			addToInventory(char,findItem('Fine Clothes'));
			addToInventory(char,findItem("Signet Ring"));
			addToInventory(char,findItem('Scroll of Pedigree'));
			addToInventory(char,findItem('Coin Purse'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			char.proficiencies.upush('Gaming Sets');
			scope.choiceQueue.push(helper.learnLanguage);
			char.money+=2500;
		}
	},{
		name:"Outlander",
		description:"",
		featureName:"Wanderer",
		featureDescription:"You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you. In addition, you can find food and fresh water for yourself and up to five other people each day, provided that the land offers berries, small game, water, and so forth.",
		onPickup:function(char,scope){
			addProficiency(char,'Athletics');
			addProficiency(char,'Survival');
			addToInventory(char,findItem('Staff'));
			addToInventory(char,findItem("Hunting Trap"));
			addToInventory(char,findItem("Traveler's Clothes"));
			addToInventory(char,findItem('Belt Pouch'));
			addToInventory(char,findItem('Animal Trophy'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			scope.choiceQueue.push(helper.learnInstrument);
			scope.choiceQueue.push(helper.learnLanguage);
			char.money+=1000;
		}
	},{
		name:"Sage",
		description:"",
		featureName:"Researcher",
		featureDescription:"When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it. Usually, this information comes from a library, scriptorium, university, or a sage or other learned person or creature, Your DM might rule that the knowledge you seek is secreted away in an almost inaccessible place, or that it simply cannot be found. Unearthing the deepest secrets of the multiverse can require an adventure or even a whole campaign.",
		onPickup:function(char,scope){
			addProficiency(char,'Arcana');
			addProficiency(char,'History');
			addToInventory(char,findItem('Bottle of Ink'));
			addToInventory(char,findItem("Quill"));
			addToInventory(char,findItem("Small Knife"));
			addToInventory(char,findItem('Belt Pouch'));
			addToInventory(char,findItem('Common Clothes'));
			addToInventory(char,{name:"Letter from Colleague",description:"This letter was written to you by a late colleague. It contains a question you have not yet been able to answer."});
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			scope.choiceQueue.push(helper.learnLanguage);
			scope.choiceQueue.push(helper.learnLanguage);
			char.money+=1000;
		}
	},{
		name:"Sailor",
		description:"",
		featureName:"Ship's Passage",
		featureDescription:"When you need to, you can secure free passage on a sailing ship for yourself and your adventuring companions. You might sail on the ship you served on, or another ship you have good relations with (perhaps one captained by a former crewmate). Because you're calling in a favor, you can't be certain of a schedule or route that will meet your every need. Your Dungeon Master will determine how long it takes to get where you need to go. In return for your free passage, you and your companions are expected to assist the crew during the voyage.",
		onPickup:function(char,scope){
			addProficiency(char,'Athletics');
			addProficiency(char,'Perception');
			addToInventory(char,findItem('Club'));
			addToInventory(char,findItem("50' Silk Rope"));
			addToInventory(char,findItem("Lucky Charm"));
			addToInventory(char,findItem('Belt Pouch'));
			addToInventory(char,findItem('Common Clothes'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			char.proficiencies.upush("Navigator's Tools");
			char.proficiencies.upush("Water Vehicles");
			char.money+=1000;
		}
	},{
		name:"Sailor (Pirate)",
		description:"",
		featureName:"Bad Reputation",
		featureDescription:"No matter where you go, people are afraid of you due to your reputation. When you are in a civilized settlement, you can get away with minor criminal offenses, such as refusing to pay for food at a tavern or breaking down doors at a local shop, since most people will not report your activity to the authorities.",
		onPickup:function(char,scope){
			addProficiency(char,'Athletics');
			addProficiency(char,'Perception');
			addToInventory(char,findItem('Club'));
			addToInventory(char,findItem("50' Silk Rope"));
			addToInventory(char,findItem("Lucky Charm"));
			addToInventory(char,findItem('Belt Pouch'));
			addToInventory(char,findItem('Common Clothes'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			char.proficiencies.upush("Navigator's Tools");
			char.proficiencies.upush("Water Vehicles");
			char.money+=1000;
		}
	},{
		name:"Soldier",
		description:"",
		featureName:"Military Rank",
		featureDescription:"You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence, and they defer to you if they are of a lower rank. You can invoke your rank to exert influence over other soldiers and requisition simple equipment or horses for temporary use. You can also usually gain access to friendly military encampments and fortresses where your rank is recognized.",
		onPickup:function(char,scope){
			addProficiency(char,'Athletics');
			addProficiency(char,'Intimidation');
			addToInventory(char,findItem('Rank Insignia'));
			addToInventory(char,findItem("Trophy from a Foe"));
			addToInventory(char,findItem('Belt Pouch'));
			addToInventory(char,findItem('Common Clothes'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			char.proficiencies.upush("Land Vehicles");
			scope.choiceQueue.push({
				choicePrompt:"Choose a pastime",
				chocies:["Playing Cards","Dice Set"],
				action:function(char,derived,choice){
					char.proficiencies.upush(choice);
					addToInventory(char,findItem(choice));
				}
			});
			char.money+=1000;
		}
	},{
		name:"Urchin",
		description:"Skill Proficiencies: Sleight of Hand, Stealth\nTool Proficiencies: Disguise kit, Thieves' tools\nEquipment: A small knife, a map of the city you grew up in, a pet mouse, a token to remember your parents by, a set of common clothes, and a belt pouch containing 10 gp",
		featureName:"City Secrets",
		featureDescription:"You know the secret patterns and flow to cities and can find passages through the urban sprawl that others would miss. When you are not in combat, you (and companions you lead) can travel between any two locations in the city twice as fast as your speed would normally allow.",
		onPickup:function(char,scope){
			addProficiency(char,'Sleight of Hand');
			addProficiency(char,'Stealth');
			addToInventory(char,findItem('Small Knife'));
			addToInventory(char,findItem("Map of Hometown"));
			addToInventory(char,findItem('Belt Pouch'));
			addToInventory(char,findItem('Pet Mouse'));
			addToInventory(char,findItem('Memento of Parents'));
			addToInventory(char,findItem('Common Clothes'));
			addPassive(char,{name:this.featureName,description:this.featureDescription});
			char.proficiencies.upush("Disguise Kit");
			char.proficiencies.upush("Thieves' Tools");
			char.money+=1000;
		}
	}
]