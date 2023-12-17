import csvToJson from 'convert-csv-to-json';

let fileInputName = './public/pulses.csv';
let fileOutputName = './src/code_stats.json';

csvToJson.formatValueByType().getJsonFromCsv(fileInputName);

csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);
