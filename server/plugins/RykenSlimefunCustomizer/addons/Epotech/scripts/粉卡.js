function onUse(event) {
    const player = event.getPlayer();
    const invs = player.getInventory();
    const itemInMainHand = invs.getItemInMainHand();
    
    const dustArray = [
        { item: "IRON_DUST", probability: 0.05 },
        { item: "GOLD_DUST", probability: 0.05 },
        { item: "TIN_DUST", probability: 0.025 },
        { item: "COPPER_DUST", probability: 0.05 },
        { item: "SILVER_DUST", probability: 0.025 },
        { item: "LEAD_DUST", probability: 0.025 },
        { item: "ALUMINUM_DUST", probability: 0.05 },
        { item: "ZINC_DUST", probability: 0.025 },
        { item: "MAGNESIUM_DUST", probability: 0.025 },
        { item: "JP_NULL", probability: 0.7 }
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

    if (itemInMainHand.getAmount() < 4) {
        sendMessage(player, "你的物品数量不足");
        return; 
    }

    itemInMainHand.setAmount(itemInMainHand.getAmount() - 4);
    invs.setItemInMainHand(itemInMainHand);

    if (selectedItem === "JP_NULL") {
        sendMessage(player, "毛都没获得");
    } else {
        const slimefunItem = getSfItemById(selectedItem);
        const itemstack = new org.bukkit.inventory.ItemStack(slimefunItem.getItem());
        itemstack.setAmount(4);
        if (invs.firstEmpty() === -1) {
            player.getWorld().dropItemNaturally(player.getLocation(), itemstack);
            sendMessage(player, "背包已满，物品已掉落在地面上");
        } else {
            invs.addItem(itemstack);
            sendMessage(player, "成功获得物品" + itemstack.getItemMeta().getDisplayName() + "*4");
        }
    }
}

function sendMessage(player, message) {
    player.sendMessage(message);
}
