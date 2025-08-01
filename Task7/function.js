const fs = require('fs').promises;

async function read(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error(`Error reading ${filePath}: ${err.message}`);
    }
}

async function saveUsers(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        throw new Error(`Error saving ${filePath}: ${err.message}`);
    }
}

module.exports = { read, saveUsers };