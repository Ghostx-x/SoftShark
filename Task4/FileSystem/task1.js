const fs = require('fs').promises;

async function read(filename) {
    try{
        const data = await fs.readFile(filename, 'utf8')
        console.log(data);
    } catch(err) {
        console.log('Error ', err.message);
    }
}



async function writeSep() {
    try{
        await fs.writeFile('new.txt', 'Hiiiii bbg srtik');
        console.log('now reading it');
        await read('new.txt')
    } catch (err) {
        console.log("Error ", err.message);
    }
}


async function append() {
    try{
        await fs.appendFile('new.txt', '\nNew line');
    } catch (err) {
        console.log("Error ", err.message);
    }
}

async function check() {
    try {
        await fs.access('new.txt');
        console.log('file exists');
        const stat = await fs.stat('new.txt');
        console.log(stat);
    } catch(err) {
        console.log('error ', err.message)
    }
}


writeSep();
check();
append();
read('index.txt');


async function check() {
    try {
        await fs.st('new.txt');
        console.log('file exists');
        const stat = await fs.stat('new.txt');
        console.log(stat);
    } catch(err) {
        console.log('error ', err.message)
    }
}