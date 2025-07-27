let usageCount = 0;
let lastUseTime = 0;

function onUse(event) {
  let player = event.getPlayer();
  let world = player.getWorld();
  let eyeLocation = player.getEyeLocation();
  let direction = eyeLocation.getDirection();
  let targetLocation = eyeLocation.add(0, -0.7, 0).add(direction);
  let maxDistance = 20;


  let rayTraceResults = world.rayTrace(targetLocation, direction, maxDistance, org.bukkit.FluidCollisionMode.ALWAYS, true, 0, null);
  if (rayTraceResults === null) {
    return;
  }

  let hitEntity = rayTraceResults.getHitEntity();
  if (hitEntity !== null) {
    let currentTime = new Date().getTime();
    if (currentTime - lastUseTime < 500) {
    return;
  }
  lastUseTime = currentTime;
    player.sendMessage("设定目标完成, 正在执行攻击");
    spawnVexesAroundPlayer(player, world, hitEntity, 5);
    updateItemLore(player);
  }
}

function spawnVexesAroundPlayer(player, world, targetEntity, count) {
  for (let i = 0; i < count; i++) {
    let x = player.getLocation().getX() + (Math.random() * 10 - 5);
    let y = player.getLocation().getY() + (Math.random() * 5);
    let z = player.getLocation().getZ() + (Math.random() * 10 - 5);
    let location = new org.bukkit.Location(world, x, y, z);

    let vex = world.spawnEntity(location, org.bukkit.entity.EntityType.VEX);
    if (vex) {
      vex.addScoreboardTag("自爆卡车");
      vex.setTarget(targetEntity);
      vex.setLifeTicks(5);
    }
  }
  usageCount++;
  updateItemLore(player);
}

function updateItemLore(player) {
  let item = player.getInventory().getItemInMainHand();
  let itemMeta = item.getItemMeta();
  let lore = itemMeta.getLore().slice(0, -2);
  lore.push(`§e║§9§l剩余次数 : ${10 - usageCount}`);
  lore.push('§e╚════════════════════════════════════╝');
  itemMeta.setLore(lore);
  item.setItemMeta(itemMeta);
  if (usageCount >= 10) {
    player.getInventory().removeItem(item);
    usageCount = 0; 
  }
}