const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, 'users.json');

async function read() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading users:', err.message);
        return [];
    }
}

async function saveUsers(users) {
    try {
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Error saving users:', err.message);
    }
}

module.exports = {read, saveUsers};