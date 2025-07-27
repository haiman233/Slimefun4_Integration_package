function onUse(event) {
  let player = event.getPlayer();
  let offHandItem = player.getInventory().getItemInOffHand();
  
  if (offHandItem.isEmpty()) {
    player.sendMessage("副手没有持有物品。");
    return;
  }

  let enchantments = offHandItem.getEnchantments();
  let maxLevel = 0;
  let entrySet = enchantments.entrySet();
  for (let entry of entrySet) {
    let enchantment = entry.getKey();
    let level = entry.getValue();
    if (level > maxLevel) {
      maxLevel = level;
    }
  }

  if (maxLevel > 0) {
    let upgradeChance = calculateUpgradeChance(maxLevel);
    let randomChance = Math.random();
    if (randomChance < upgradeChance) {
      upgradeEnchantments(offHandItem);
      decrementItemAmount(player.getInventory().getItemInMainHand());
      player.sendMessage("附魔等级提升。");
    } else {
      player.getInventory().setItemInOffHand(null);
      decrementItemAmount(player.getInventory().getItemInMainHand());
      player.sendMessage("附魔失败，装备已销毁。");
    }
  } else {
    player.sendMessage("副手装备没有附魔。");
  }
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

function upgradeEnchantments(item) {
  let enchantments = item.getEnchantments();
  let entrySet = enchantments.entrySet();
  for (let entry of entrySet) {
    let enchantment = entry.getKey();
    let level = entry.getValue();
    item.addUnsafeEnchantment(enchantment, level + 1);
  }
}

function decrementItemAmount(item) {
  if (item && item.getAmount() > 1) {
    item.setAmount(item.getAmount() - 1);
  } else if (item) {
    item.setAmount(0);
  }
}