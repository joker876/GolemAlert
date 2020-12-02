import { dataFileStructure, sounds, colors } from './helperFunctions/constants'

let data = JSON.parse(FileLib.read('golemalert', './data.json'));
if (!data) {
    FileLib.write('golemalert', './data.json', JSON.stringify(dataFileStructure));
    data = JSON.parse(FileLib.read('golemalert', './data.json'));
}
global.golemalert = { data };

global.golemalert.metadata = JSON.parse(FileLib.read('golemalert', './metadata.json'));

global.golemalert.gui = new Gui();
global.golemalert.display = new Display()
    .setShouldRender(false)
    .setBackground('full')
    .setBackgroundColor(Renderer.color(0, 0, 0, 0))
    .setAlign('CENTER');

import initiateSettings from './helperFunctions/settings';
import { initiateGuiMover, guiMover } from './helperFunctions/guiMover';
import { commandHandler } from './helperFunctions/commandHandler';
//settings
initiateSettings();

//gui moving
initiateGuiMover();
register('renderOverlay', guiMover);

//command handler
register('command', commandHandler).setName('golem');

import makeTimer from './helperFunctions/timer';
let targetTimestamp = null;
register('chat', (message) => {
    console.log(message);
    if (!message.match(/The ground begins to shake as an Endstone Protector rises from below!/)) return;
    targetTimestamp = Math.floor(Date.now() / 1000) + 20

    World.playSound(global.golemalert.sound, 1000, 1);
}).setCriteria('${message}')

register('step', () => {
    FileLib.write('golemalert', './data.json', JSON.stringify(data));
}).setDelay(1)

register('tick', () => {
    //update sound
    const sound = sounds[global.golemalert.settings.getSetting('Settings', 'Sound')]
    if (sound == 'custom') global.golemalert.sound = global.golemalert.settings.getSetting('Settings', 'Custom sound')
    else                   global.golemalert.sound = sound;

    //update scale
    global.golemalert.scale = global.golemalert.settings.getSetting('Settings', 'Scale &8in %') / 100;
    
    
    if(!global.golemalert.gui.isOpen()) {
        targetTimestamp = null;
        global.golemalert.display.clearLines();
        global.golemalert.display.setShouldRender(false);
    }
    if (!targetTimestamp && !global.golemalert.gui.isOpen()) return;
    
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (global.golemalert.gui.isOpen()) {
        global.golemalert.display.setShouldRender(true)
        global.golemalert.display.setLine(0, new DisplayLine(`${colors[global.golemalert.settings.getSetting('Settings', 'Main color')]}Golem Alert!`).setShadow(true).setScale(global.golemalert.scale + 0.1));
        global.golemalert.display.setLine(1, new DisplayLine(`${colors[global.golemalert.settings.getSetting('Settings', 'Timer color')]}00:20`).setShadow(true).setScale(global.golemalert.scale));
    }
    if (targetTimestamp) {
        global.golemalert.display.setShouldRender(true)
        global.golemalert.display.setLine(0, new DisplayLine(`${colors[global.golemalert.settings.getSetting('Settings', 'Main color')]}Golem Alert!`).setShadow(true).setScale(global.golemalert.scale + 0.1));
        global.golemalert.display.setLine(1, new DisplayLine(`${colors[global.golemalert.settings.getSetting('Settings', 'Timer color')]}${makeTimer(targetTimestamp-currentTimestamp)}`).setShadow(true).setScale(global.golemalert.scale));
    }
    
    if(targetTimestamp + 1 == currentTimestamp) {
        targetTimestamp = null;
        global.golemalert.display.clearLines();
        global.golemalert.display.setShouldRender(false);
    }
})