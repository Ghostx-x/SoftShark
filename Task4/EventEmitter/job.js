const EventEmitter = require('node:events');
// const eventEmitter = new EventEmitter();


// empty the queue
// add process function to process jobs when they arrive

class JobQueue extends EventEmitter{
    constructor() {
        super();
        this.queue = [];
    }
    async addJob(jobFunction) {
        this.queue.push(jobFunction);
        this.emit('jobQueue', this.queue.length);

        // try {
        //     await jobFunction();
        //     this.emit('jobCompleted');
        // } catch (error) {
        //     this.emit('jobFailed');
        // }

        this.processJob();
    }

    async processJob() {

        while (this.queue.length > 0) {
            this.emit('jobStarted');
            try {
                await this.queue.shift();
                this.emit('jobCompleted');
            } catch (error){
                this.emit('jobFailed');
            }
        }
        this.emit('queueEmpty');
    }

}

const job =  new JobQueue();

job.on('jobQueue', (length) => {
    console.log(`Queue length ${length}`)
})
job.on('jobStarted', () => {
    console.log("Job is starting...")
})
job.on('jobCompleted', () => {
    console.log("Job is completed")
})
job.on('jobFailed', () => {
    console.log("Job got failed(...")
})

job.on('queueEmpty', () => {
    console.log("No jobs in the queue...")
})



function createJob(id) {
    return async () => {
        console.log(`Job ${id} running...`);
        const maybeFail = Math.random() < 0.5;
        if (maybeFail) {
            throw new Error("Error")
        }
        await Promise.resolve();
        console.log(`Job ${id} done`);
    };
}

for (let i = 1; i <= 5; i++) {
    job.addJob(createJob(i));
}

