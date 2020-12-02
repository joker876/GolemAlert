const Desktop = Java.type("java.awt.Desktop");
const URI = Java.type("java.net.URI");

export function commandHandler(...args) {
    if (!args[0]) return ChatLib.command('golemalert', true);
    if (args[0].toLowerCase() == 'gui') global.golemalert.gui.open();
    else if (args[0].toLowerCase() == 'key') {
        if (!args[1]) return ChatLib.chat('&cNo key specified! &fUse &b/api new &fto get one.');
        if (!args[1].toLowerCase().match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/)) return ChatLib.chat('&cInvalid API key!');
        let data = global.hoeutils.data;
        data = args[1].toLowerCase();
        ChatLib.chat('&7[&fHoeUtilities&7] &eyour API key has been set.');
    }
    else if (args[0].toLowerCase() == 'discord') {
        if(Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
            Desktop.getDesktop().browse(new URI('https://discord.gg/UmpNYNRmGE'));
        }
    }
    else if (args[0].toLowerCase() == 'testsound') {
        World.playSound(global.golemalert.settings.getSetting('Settings', 'Sound'), 1000, 1);
    }
    else ChatLib.chat('&eInvalid argument "'+args[0]+'".')
}