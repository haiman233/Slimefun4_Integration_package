function onUse(event) {
  const player = event.getPlayer();
  let entities = player.getNearbyEntities(10, 10, 10);
  for (let entity of entities) {
    const location = entity.getLocation();
    const dx = player.getLocation().getX() - location.getX();
    const dy = player.getLocation().getY() - location.getY();
    const dz = player.getLocation().getZ() - location.getZ();

    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (distance !== 0) {
      const moveX = dx / distance;
      const moveY = dy / distance;
      const moveZ = dz / distance;
      entity.setVelocity(new org.bukkit.util.Vector(moveX, moveY, moveZ));
    }
  }
}

