function onWeaponHit(event, player, item) {
    const entity = event.getEntity();
    if (entity instanceof org.bukkit.entity.Player) {
        const level = entity.getLevel();
        const damage = event.getDamage();
        event.setDamage(damage + (level / 100));
        const newLevel = level - Math.max(level / 1000, 1);
        entity.setLevel(newLevel);
    }
}
