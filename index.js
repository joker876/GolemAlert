import { dataFileStructure } from './helperFunctions/constants'

let data = JSON.parse(FileLib.read('golemalert', './data.json'));
if (!data) {
    FileLib.write('golemalert', './data.json', JSON.stringify(dataFileStructure));
    data = JSON.parse(FileLib.read('golemalert', './data.json'));
}
global.hoeutils = { data };

import makeTimer from './helperFunctions/timer';

