function onWork(player, block) {
    const itemtype = org.bukkit.Material;
    if (block.getType() === itemtype.GLASS) {
        let A = block.getRelative(1, -1, 0);
        let B = block.getRelative(-1, -1, 0);
        let C = block.getRelative(0, -1, 1);
        let D = block.getRelative(0, -1, -1);
        
        switch (true) {
            case A.getType() === itemtype.DIAMOND_BLOCK && B.getType() === itemtype.DIAMOND_BLOCK:
                A.setType(itemtype.AIR);
                B.setType(itemtype.AIR);
                break;
            case C.getType() === itemtype.DIAMOND_BLOCK && D.getType() === itemtype.DIAMOND_BLOCK:
                C.setType(itemtype.AIR);
                D.setType(itemtype.AIR);
                break;
        }
    }
}
