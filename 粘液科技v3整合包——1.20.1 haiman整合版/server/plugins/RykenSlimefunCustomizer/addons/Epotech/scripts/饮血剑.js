function onWeaponHit(event, player, item) {
    const damage = event.getDamage();
    player.setHealth(player.getHealth() + (damage / 10));
}
