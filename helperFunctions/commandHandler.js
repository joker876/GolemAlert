const Desktop = Java.type("java.awt.Desktop");
const URI = Java.type("java.net.URI");

export function commandHandler(...args) {
    if (!args[0]) return ChatLib.command('golemalert', true);
    if (args[0].toLowerCase() == 'gui') global.golemalert.gui.open();
    else if (args[0].toLowerCase() == 'discord') {
        if(Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
            Desktop.getDesktop().browse(new URI('https://discord.gg/UmpNYNRmGE'));
        }
    }
    else if (args[0].toLowerCase() == 'testsound') {
        World.playSound(global.golemalert.sound, 1000, 1);
    }
    else ChatLib.chat('&eInvalid argument "'+args[0]+'".')
}