import { Setting, SettingsObject } from 'SettingsManager/SettingsManager';
import { colors, sounds } from '../helperFunctions/constants';

export default function initiateSettings() {
    global.golemalert.settings = new SettingsObject('GolemAlert', [{
        name: "Info",
        settings: [
            new Setting.Button("                                          &l&7[&fGolemAlert&7]", "", () => {}),
            new Setting.Button("                                        Made by &c&ljoker876", "", () => {}),
            new Setting.Button(`                                                &8v${global.golemalert.metadata.version}`, "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("Wanna suggest something? Join my &3Discord &fserver!", '&a&lLINK!', () => { ChatLib.command('golem discord', true) }),
            new Setting.Button("", "", () => {}),
            new Setting.Button("&c&lNote: &rall mods are &9&nuse at own risk.", "", () => {}),
        ]
    },
    {
        name: 'Settings',
        settings: [
            new Setting.Button("Click here to move the GUI >>>", "&e&lCLICK!", () => { ChatLib.command('golem gui', true) }),
            new Setting.Slider('Scale &8in %', 150, 1, 400),
            new Setting.StringSelector('Sound', 1, Object.keys(sounds)),
            new Setting.Button("Click here to test the sound >>>", "&e&lCLICK!", () => { ChatLib.command('golem testsound', true) }),
            new Setting.StringSelector('Main color', 15, Object.keys(colors)),
            new Setting.StringSelector('Timer color', 12, Object.keys(colors)),
            new Setting.Button("", "", () => {}),
            new Setting.Button("Click here to show the GUI &8(for 30s) >>>", "&e&lCLICK!", () => { ChatLib.command('golem test', true) }),
        ],
    },
    ]).setCommand('golemalert').setSize(450, 200);
    Setting.register(global.golemalert.settings);
}