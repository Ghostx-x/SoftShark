const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();

class JobQueue extends EventEmitter{
    constructor() {
        super();
        this.queue = [];
    }
    addJob(jobFunction) {
        this.queue.push(jobFunction);
        this.emit('jobQueue', this.queue.length);
        console.log("The job was added");
    }
}

const job =  new JobQueue();

job.on('jobQueue', (length) => {
    setTimeout(function() {
        console.log(`Queue length ${length}`)
    }, 2000)
})
job.on('jobStarted', () => {
    setTimeout(function() {
        console.log("Job is starting...")
    }, 2000)
})
job.on('jobCompleted', () => {
    setTimeout(function() {
        console.log("Job is completed...")
    }, 2000)
})
job.on('jobFailed', () => {
    setTimeout(function() {
        console.log("Job got failed(...")
    }, 2000)
})

job.on('queueEmpty', () => {
    setTimeout(function() {
        console.log("No jobs in the queue...")
    }, 2000)
})



function createJob(id) {
    return async () => {
        console.log(`Job ${id} running...`);
        const maybeFail = Math.random() < 0.5;
        if (maybeFail) {
            throw new Error(job.emit('jobFailed'))
        }
        await Promise.resolve();
        console.log(`Job ${id} done`);
    };
}

for (let i = 1; i <= 5; i++) {
    const jobFunction = createJob(i);
    job.addJob(jobFunction);

    jobFunction()
        .then(() => job.emit('jobCompleted'))
        .catch(() => job.emit('jobFailed'));
}

