let usageCount = 0;

function onUse(event) {
  let player = event.getPlayer();
  let item = player.getInventory().getItemInMainHand();
  let itemMeta = item.getItemMeta();
  let world = player.getWorld();
  let eyeLocation = player.getEyeLocation();
  let randomChance = Math.random();
  let probability = 0.01; 
  usageCount++;
  const lore = itemMeta.getLore().slice(0, -2);
  lore.push("§e║§x§c§2§2§a§f§b你已手冲:" + usageCount + "次");
  lore.push('§e╚════════════════════════════════════╝')
  itemMeta.setLore(lore);
  item.setItemMeta(itemMeta);

  if (randomChance < probability) {
    world.spawn(eyeLocation, org.bukkit.entity.LlamaSpit);

    player.sendMessage(`${player.getName()}冲了${usageCount}次,终于射出来了`);

    if (player.getFoodLevel() <= 0) {
      player.setHealth(0);
      player.sendMessage(player.getName() + "死于手冲过度");
      usageCount = 0;
    } else {
      player.setFoodLevel(0);
      player.setSaturation(0);
    }
  }
}