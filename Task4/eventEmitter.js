const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();

eventEmitter.on('message send', (number) => {
    for (let i = 0; i < number; i++) {
        console.log('message send')
    }
})

eventEmitter.emit('message send', 3);