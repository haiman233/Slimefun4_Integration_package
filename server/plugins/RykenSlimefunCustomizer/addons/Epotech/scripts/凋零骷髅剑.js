let usageCount = 0;

function onWeaponHit(event, player, item) {
    const entity = event.getEntity();
    if (entity instanceof org.bukkit.entity.WitherSkeleton) {
        entity.setHealth(0);
        const world = entity.getWorld();
        const location = entity.getLocation();
        const skullItemStack = new org.bukkit.inventory.ItemStack(org.bukkit.Material.WITHER_SKELETON_SKULL);
        world.dropItemNaturally(location, skullItemStack);
        usageCount++;
        const itemMeta = item.getItemMeta();
        const lore = itemMeta.getLore().slice(0, -2);
        lore.push(`§e║§9§l剩余次数 : ${10 - usageCount}`);
        lore.push('§e╚════════════════════════════════════╝');
        itemMeta.setLore(lore);
        item.setItemMeta(itemMeta);
        if (usageCount >= 10) {
            player.getInventory().removeItem(item);
            usageCount = 0; 
        }
    } else {
        player.sendMessage("请攻击凋零骷髅");
    }
}
