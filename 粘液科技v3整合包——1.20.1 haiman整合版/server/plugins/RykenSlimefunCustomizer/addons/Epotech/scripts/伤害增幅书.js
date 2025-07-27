function onUse(event) {
  let player = event.getPlayer();
  let offHandItem = player.getInventory().getItemInOffHand();

  player.sendMessage(offHandItem);
  if (offHandItem.isEmpty()) {
    player.sendMessage("副手没有持有物品。");
    return;
  }
  if(offHandItem.getType() !== org.bukkit.Material.NETHERITE_SWORD){
    player.sendMessage("副手请持下界合金剑");
    return;
  }
  let itemMeta = offHandItem.getItemMeta();
  decrementItemAmount(player.getInventory().getItemInMainHand());
  let damageAttribute = org.bukkit.attribute.Attribute.GENERIC_ATTACK_DAMAGE;
  let attributeModifiers = itemMeta.getAttributeModifiers(damageAttribute);
  if (attributeModifiers == null || attributeModifiers.isEmpty()) {
    let newModifier = new org.bukkit.attribute.AttributeModifier(
      java.util.UUID.randomUUID(),
      "damage",
      1, 
      org.bukkit.attribute.AttributeModifier.Operation.ADD_NUMBER,
      org.bukkit.inventory.EquipmentSlot.HAND
    );
    itemMeta.addAttributeModifier(damageAttribute, newModifier);
    player.sendMessage("物品已添加伤害属性。");
  } else {
    let maxAmount = getMaxDamageAmount(attributeModifiers);
    let upgradeChance = calculateUpgradeChance(maxAmount);
    let randomChance = Math.random();

    if (randomChance < upgradeChance) {
      let newModifier = new org.bukkit.attribute.AttributeModifier(
        java.util.UUID.randomUUID(),
        "damage",
        maxAmount + 1, 
        org.bukkit.attribute.AttributeModifier.Operation.ADD_NUMBER,
        solt 
      );
      itemMeta.removeAttributeModifier(damageAttribute);
      itemMeta.addAttributeModifier(damageAttribute, newModifier);
      player.sendMessage("强化成功！物品伤害已增加。");
    } else {
      player.getInventory().setItemInOffHand(null);
      player.sendMessage("强化失败！物品已销毁。");
    }
  } 

  offHandItem.setItemMeta(itemMeta);
}

function getMaxDamageAmount(modifiers) {
  let maxAmount = 0;
  for (let modifier of modifiers) {
    if (modifier.getAmount() > maxAmount) {
      maxAmount = modifier.getAmount();
      solt = modifier.getSlot();
    }
  }
  return maxAmount;
}

function calculateUpgradeChance(level) {
  let baseChance = 1.0;
  let decreasePerTenLevels = 0.01;
  while (level >= 10) {
    baseChance -= decreasePerTenLevels;
    level -= 10;
  }
  return baseChance;
}

function decrementItemAmount(item) {
  if (item && item.getAmount() > 1) {
    item.setAmount(item.getAmount() - 1);
  } else if (item) {
    item.setAmount(0);
  }
}