function onUse(event) {
  let player = event.getPlayer();
  let offHandItem = player.getInventory().getItemInOffHand();

  if (offHandItem.isEmpty()) {
    player.sendMessage("副手没有持有物品。");
    return;
  }

  let itemMeta = offHandItem.getItemMeta();
  if (!(itemMeta instanceof org.bukkit.inventory.meta.ArmorMeta)) {
    player.sendMessage("副手请持装备");
    return;
  }

  let damageAttribute = org.bukkit.attribute.Attribute.GENERIC_ARMOR_TOUGHNESS;
  let attributeModifiers = itemMeta.getAttributeModifiers(damageAttribute);
  let equipmentSlot = getEquipmentSlot(offHandItem.getType());

  if(equipmentSlot === null){
    player.sendMessage("该装备无法强化");
    return;
  }
  decrementItemAmount(player.getInventory().getItemInMainHand());
  if (attributeModifiers == null || attributeModifiers.isEmpty()) {
    addArmorAttribute(itemMeta, equipmentSlot);
    player.sendMessage("强化成功！装备防御已增加。");
  } else {
    let maxAmount = getMaxDamageAmount(attributeModifiers);
    let upgradeChance = calculateUpgradeChance(maxAmount);
    let randomChance = Math.random();

    if (randomChance < upgradeChance) {
      updateArmorAttribute(itemMeta, equipmentSlot, maxAmount + 1);
      player.sendMessage("强化成功！装备防御已增加。");
    } else {
      player.getInventory().setItemInOffHand(null);
      player.sendMessage("强化失败！装备已销毁。");
    }
  }

  offHandItem.setItemMeta(itemMeta);
}

function getEquipmentSlot(material) {
  const materialName = material.name();
  const isBoot = materialName.includes("BOOTS");
  const isChestplate = materialName.includes("CHESTPLATE");
  const isHelmet = materialName.includes("HELMET");
  const isLeggings = materialName.includes("LEGGINGS");
  if (isBoot) {
    return org.bukkit.inventory.EquipmentSlot.FEET;
  } else if (isChestplate) {
    return org.bukkit.inventory.EquipmentSlot.CHEST;
  } else if (isHelmet) {
    return org.bukkit.inventory.EquipmentSlot.HEAD;
  } else if (isLeggings) {
    return org.bukkit.inventory.EquipmentSlot.LEGS;
  } else {
    return null;
  }
}
function addArmorAttribute(itemMeta, slot) {
  let newModifier = new org.bukkit.attribute.AttributeModifier(
    java.util.UUID.randomUUID(),
    "护甲",
    1,
    org.bukkit.attribute.AttributeModifier.Operation.ADD_NUMBER,
    slot
  );
  itemMeta.addAttributeModifier(org.bukkit.attribute.Attribute.GENERIC_ARMOR_TOUGHNESS, newModifier);
}

function updateArmorAttribute(itemMeta, slot, amount) {
  let newModifier = new org.bukkit.attribute.AttributeModifier(
    java.util.UUID.randomUUID(),
    "护甲",
    amount,
    org.bukkit.attribute.AttributeModifier.Operation.ADD_NUMBER,
    slot
  );
  itemMeta.removeAttributeModifier(org.bukkit.attribute.Attribute.GENERIC_ARMOR_TOUGHNESS);
  itemMeta.addAttributeModifier(org.bukkit.attribute.Attribute.GENERIC_ARMOR_TOUGHNESS, newModifier);
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
  let decreasePerTenLevels = 0.2;
  while (level >= 1) {
    baseChance -= decreasePerTenLevels;
    level -= 1;
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