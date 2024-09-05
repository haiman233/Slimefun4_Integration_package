function onUse(event) {
  const player = event.getPlayer();
  const item = player.getInventory().getItemInMainHand();
  const location = player.getLocation();
  item.setAmount(item.getAmount() - 1);
  const radius = 5;
  for (let x = -radius; x <= radius; x++) {
    for (let z = -radius; z <= radius; z++) {
      const targetLocation = new org.bukkit.Location(player.getWorld(), location.getX() + x, location.getY(), location.getZ() + z);
      if (targetLocation.distanceSquared(location) <= radius * radius) {
        targetLocation.getWorld().createExplosion(targetLocation, 1);
      }
    }
  }
}
