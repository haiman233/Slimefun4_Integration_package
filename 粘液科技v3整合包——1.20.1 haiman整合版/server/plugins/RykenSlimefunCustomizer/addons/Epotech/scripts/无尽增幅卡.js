function onUse(event) {
    const player = event.getPlayer();
    const invs = player.getInventory();
    const itemInMainHand = invs.getItemInMainHand();
    
    const dustArray = [
        { item: "JP_SMZFS", probability: 0.001 },  //生命增幅书
        { item: "JP_KJRXZFS", probability: 0.001 },//盔甲韧性书
        { item: "JP_HJZFS", probability: 0.005 }, //护甲增幅书
        { item: "JP_SHZFS", probability: 0.005 },  //伤害增幅书
        { item: "JP_QHFMS", probability: 0.002 }, //mmm之力
        { item: "JP_NULL", probability: 0.986 }
    ];

    let totalProbability = dustArray.reduce((total, dust) => total + dust.probability, 0);
    let randomValue = Math.random() * totalProbability;
    let selectedItem = null;
    let cumulativeProbability = 0;

    for (let i = 0; i < dustArray.length; i++) {
        cumulativeProbability += dustArray[i].probability;
        if (randomValue <= cumulativeProbability) {
            selectedItem = dustArray[i].item;
            break;
        }
    }
    if (!selectedItem) {
        selectedItem = dustArray[dustArray.length - 1].item;
    }

    if (itemInMainHand.getAmount() < 1) {
        sendMessage(player, "你的物品数量不足");
        return; 
    }

    itemInMainHand.setAmount(itemInMainHand.getAmount() - 1);
    invs.setItemInMainHand(itemInMainHand);

    if (selectedItem === "JP_NULL") {
        sendMessage(player, "毛都没获得");
    } else {
        const slimefunItem = getSfItemById(selectedItem);
        const itemstack = new org.bukkit.inventory.ItemStack(slimefunItem.getItem());
        itemstack.setAmount(1);
        if (invs.firstEmpty() === -1) {
            player.getWorld().dropItemNaturally(player.getLocation(), itemstack);
            sendMessage(player, "背包已满，物品已掉落在地面上");
        } else {
            invs.addItem(itemstack);
            sendMessage(player, "成功获得物品" + itemstack.getItemMeta().getDisplayName() + "*1");
        }
    }
}

function sendMessage(player, message) {
    player.sendMessage(message);
}
