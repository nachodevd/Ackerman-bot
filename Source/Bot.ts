import Bot from "./Base/Client";
import('discord-reply')
new Bot({
  ws: { properties: { $browser: "Discord Android" } },
}).start(false);
