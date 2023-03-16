const fs = require('fs').promises;
const path = require('path');

const talksPath = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
    try {
        const data = await fs.readFile(talksPath);
        return JSON.parse(data);
    } catch (err) {
        console.error(`Arquivo não pôde ser lido: ${err}`);
    }
};

const writeFile = async (content) => {
    try {
        await fs.writeFile(talksPath, JSON.stringify(content));
    } catch (e) {
        console.error('Erro ao salvar o arquivo', e.message);
        return null;
    }
};

module.exports = {
    readFile,
    writeFile,
};