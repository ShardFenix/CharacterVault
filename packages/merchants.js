window.merchants=[
	{
		name:"General",
		luck:50,
		inventory:['Arrow',50,'Dart',20,'Bolt',30,'Potion of Healing',4],
		additionalSlots:20,
		limitation:function(item){
			return item.categories.hasAny('Junk','Artisan Tool','Tool');
		}
	},{
		name:"Blacksmith",
		luck:0,
		inventory:['Arrow',200,'Dart',60,'Bolt',50],
		additionalSlots:20,
		limitation:function(item){
			return item.categories.hasAny('Weapon','Armor');
		}
	},{
		name:"Spell Shop",
		luck:0,
		inventory:[],
		additionalSlots:20,
		limitation:function(item){
			return item.categories.hasAny('Scroll','Potion','Component');
		}
	}
]

function generateMerchant(merch){
	let result=[];
	let lastItem=undefined;
	if (merch){
		for (let item of merch.inventory){
			if (typeof item === 'number'){
				lastItem.count=item;
			} else {
				lastItem=findItem(item);
				result.push(lastItem);
			}
		}
		for (let i=0;i<merch.additionalSlots;i++){
			let temp=generateLoot(merch.luck);
			let attempts=0;
			while (attempts<20 && !merch.limitation(temp)){
				temp=generateLoot(merch.luck);
				attempts++;
			}
			if (merch.limitation(temp)){
				result.push(temp);
			}
		}
	}
	return result;
}