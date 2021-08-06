import * as cluster from 'cluster';

const task = async(name, seconds, negativeScenario = false): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      if (negativeScenario)
        reject(new Error(`task ${name} failed!\n`));
      else
        resolve(`task ${name} succeed!\n`);
    }, seconds * 1000);
  });
};

class Main {
  constructor() {}

  async run(): Promise<void> {
    try {
      console.time('run');
      const numCPUs = require('os').cpus().length;
  
      const tasks = ['job1', 'job2', 'job3', 'job4', 'job5', 'job6', 'job7'];
  
      if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < tasks.length; i++) {
          const worker = cluster.fork();
          worker.on('exit', (code, signal) => {
            console.log(`worker[${worker.id}] exited, code: ${code}, signal: ${signal}`)
          });
        }
      } else {
        try {
          console.log(`Worker ${process.pid} started`);

          const t = tasks[cluster.worker.id-1];
          console.log(await task(`worker(${cluster.worker.id}) executes ${t}`, 5));
          process.exit(0);
        } catch (err) {
          console.error(`Worker ${process.pid} failed`, err);
          process.exit(1);
        }
      }
  
      console.timeEnd('run');
    } catch (runErr) {
      console.error('run error', runErr);
    }
  }
}

const main = new Main();
main.run();