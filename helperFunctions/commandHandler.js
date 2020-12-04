const Desktop = Java.type("java.awt.Desktop");
const URI = Java.type("java.net.URI");

export function commandHandler(...args) {
    if (!args || !args[0]) return ChatLib.command('golemalert', true);
    if (args[0].toLowerCase() == 'gui') global.golemalert.gui.open();
    else if (args[0].toLowerCase() == 'discord') {
        if(Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
            Desktop.getDesktop().browse(new URI('https://discord.gg/UmpNYNRmGE'));
        }
    }
    else if (args[0].toLowerCase() == 'testsound') {
        World.playSound(global.golemalert.sound, 1000, 1);
    }
    else if (args[0].toLowerCase() == 'test') {
        global.golemalert.isTestMode = true;
        global.golemalert.testTimestamp = Math.floor(Date.now() / 1000) + 30;
    }
    else if (args[0].toLowerCase() == 'stopdata') {
        global.golemalert.stopData = true;
        setTimeout(() => {
            global.golemalert.stopData = false;
        }, 30000);
    }
    else ChatLib.chat('&eInvalid argument "'+args[0]+'".');
}