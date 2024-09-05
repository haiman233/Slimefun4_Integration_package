function onWork(player, block) {
    const itemtype = org.bukkit.Material;
    if (block.getType() === itemtype.BELL) {
        let A = block.getRelative(1, -1, 0);
        let B = block.getRelative(-1, -1, 0);
        let C = block.getRelative(0, -1, 1);
        let D = block.getRelative(0, -1, -1);
        
        switch (true) {
            case A.getType() === itemtype.GOLD_BLOCK && B.getType() === itemtype.GOLD_BLOCK:
                A.setType(itemtype.REINFORCED_DEEPSLATE);
                B.setType(itemtype.REINFORCED_DEEPSLATE);
                break;
            case C.getType() === itemtype.GOLD_BLOCK && D.getType() === itemtype.GOLD_BLOCK:
                C.setType(itemtype.REINFORCED_DEEPSLATE);
                D.setType(itemtype.REINFORCED_DEEPSLATE);
                break;
        }
    }
}
