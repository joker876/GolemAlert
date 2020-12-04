import { dataFileStructure, sounds, colors } from './helperFunctions/constants'

global.golemalert = {};

global.golemalert.data = JSON.parse(FileLib.read('golemalert', './data.json'));
if (!global.golemalert.data) {
    FileLib.write('golemalert', './data.json', JSON.stringify(dataFileStructure));
    global.golemalert.data = JSON.parse(FileLib.read('golemalert', './data.json'));
}

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
    if (!message.match(/The ground begins to shake as an Endstone Protector rises from below!/)) return;
    targetTimestamp = Math.floor(Date.now() / 1000) + 20

    World.playSound(global.golemalert.sound, 1000, 1);
}).setCriteria('${message}')

register('step', () => {
    if (!global.golemalert.stopData) FileLib.write('golemalert', './data.json', JSON.stringify(global.golemalert.data));
}).setDelay(1)

register('tick', () => {
    //update sound
    const sound = sounds[global.golemalert.settings.getSetting('Settings', 'Sound')]
    if (sound == 'custom') global.golemalert.sound = global.golemalert.settings.getSetting('Settings', 'Custom sound')
    else                   global.golemalert.sound = sound;

    //update scale
    global.golemalert.scale = global.golemalert.settings.getSetting('Settings', 'Scale &8in %') / 100;
    
    global.golemalert.display.clearLines();
    global.golemalert.display.setShouldRender(false);

    if (!targetTimestamp && !global.golemalert.gui.isOpen() && !global.golemalert.isTestMode) return;
    
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const secondsRemaining = (targetTimestamp ?? global.golemalert.testTimestamp)-currentTimestamp

    const showExclamationMark = secondsRemaining % 2 == 1

    const curColor = {
        main: colors[global.golemalert.settings.getSetting('Settings', 'Main color')],
        timer: colors[global.golemalert.settings.getSetting('Settings', 'Timer color')]
    }

    if (global.golemalert.gui.isOpen()) {
        global.golemalert.display.setShouldRender(true)
        global.golemalert.display.setLine(0, new DisplayLine(`${curColor.main}Golem Alert!`).setShadow(true).setScale(global.golemalert.scale + 0.1));
        global.golemalert.display.setLine(1, new DisplayLine(`${curColor.timer}00:20`).setShadow(true).setScale(global.golemalert.scale));
    }
    if (targetTimestamp || global.golemalert.isTestMode) {
        global.golemalert.display.setShouldRender(true)
        global.golemalert.display.setLine(0, new DisplayLine(`${curColor.main}Golem Alert!`).setShadow(true).setScale(global.golemalert.scale + 0.1));
        global.golemalert.display.setLine(1, new DisplayLine(`${curColor.timer}${showExclamationMark ? '&l! ' : curColor.timer}${curColor.timer}${makeTimer(secondsRemaining)}${showExclamationMark ? ' &l!' : ''}`).setShadow(true).setScale(global.golemalert.scale));
    }
    
    if(secondsRemaining + 1 == 0) {
        global.golemalert.isTestMode = false;
        targetTimestamp = null;
        global.golemalert.display.clearLines();
        global.golemalert.display.setShouldRender(false);
    }
})