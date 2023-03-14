const fs = require('fs').promises;
const path = require('path');

const talksPath = path.resolve(__dirname, './talker.json');

const readFile = async () => {
    try {
        const data = await fs.readFile(talksPath);
        return JSON.parse(data);
    } catch (err) {
        console.error(`Arquivo não pôde ser lido: ${error}`)
    }
}

module.exports = {
    readFile,
}