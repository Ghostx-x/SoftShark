const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();

eventEmitter.once('userLogin', (body) => {
    console.log(body)
    eventEmitter.emit('userLoginFinished', {name: "Natali", xxx: {}})
})

eventEmitter.on('userLoginFinished', (body) => {
    console.log('userLoginFinished')
})

eventEmitter.emit('userLogin', {name: "Natali", xxx: {}});

eventEmitter.emit('userLogin', {name: "Natali", xxx: {}});