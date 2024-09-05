function onUse(event) {
  var player = event.getPlayer();
  //runLater(runnable, delay);

  //runLater(() => expression, 20);
   var Ext = Java.extend(Java.type("java.lang.Runnable"));

   var impl = new Ext({
    run: function() {
       player.sendMessage("114514");
     }
   });

//   runLater(impl, 20);
function delayedTask() {
  var player = org.bukkit.Bukkit.server.getPlayer("J_ump");
  if (player) {
      player.sendMessage("这条消息在延迟后发送");
  }
}
let a = org.bukkit.Bukkit.getScheduler();
//let b = new org.bukkit.scheduler.BukkitScheduler.runTaskLater();
 a.runTaskLaterAsynchronously(org.lins.mmmjjkx.rykenslimefuncustomizer.RykenSlimeCustomizer.INSTANCE,impl,3000);
}

