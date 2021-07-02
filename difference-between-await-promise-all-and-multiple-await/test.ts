const task = async(name, seconds, negativeScenario = false): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      if (negativeScenario)
        reject(new Error(`Task ${name} failed!\n`));
      else
        resolve(`Task ${name} succeed!\n`);
    }, seconds * 1000);
  });
};

class Database {
  readonly id: string;
  constructor(id) {this.id = id}
  async getResult() {
    return await task(`fetch data from Database${this.id}`, 0.5);
  }
}

class RestfulApi {
  readonly id: string;
  constructor(id) {this.id = id}
  async getResult() {
    return await task(`fetch data from RestfulApi${this.id}`, 1.2);
  }
}

const scenarioPromiseAll = async() => {
  // tasks run immediate in parallel and wait for both results
  console.time('scenarioPromiseAll');
  let [r1, r2, r3, r4, r5] = await Promise.all([
    task(1, 1, false),
    task(2, 2, false),
    task(3, 1, false),
    task(4, 2, false),
    task(5, 0.5, false),
  ]);
  console.log(`${r1}${r2}${r3}${r4}${r5}`);
  console.timeEnd('scenarioPromiseAll');
  console.log(`---`);
}

const scenarioAwaitEachAsyncTaskDirectly = async() => {
  // multiple await alternative
  console.time('scenarioAwaitEachAsyncTaskDirectly');
  const r1 = await task(1, 1, false);
  const r2 = await task(2, 2, false);
  const r3 = await task(3, 1, false);
  const r4 = await task(4, 2, false);
  const r5 = await task(5, 0.5, false);
  console.log(`${r1}${r2}${r3}${r4}${r5}`);
  console.timeEnd('scenarioAwaitEachAsyncTaskDirectly');
  console.log(`---`);
}

const scenarioAwaitAfterEachAsyncTaskCreated = async() => {
  // multiple await after async task created
  console.time('scenarioAwaitAfterEachAsyncTaskCreated');
  const t1 = task(1, 1, false);
  const t2 = task(2, 2, false);
  const t3 = task(3, 1, false);
  const t4 = task(4, 2, false);
  const t5 = task(5, 0.5, false);
  const r1 = await t1;
  const r2 = await t2;
  const r3 = await t3;
  const r4 = await t4;
  const r5 = await t5;
  console.log(`${r1}${r2}${r3}${r4}${r5}`);
  console.timeEnd('scenarioAwaitAfterEachAsyncTaskCreated');
  console.log(`---`);
}

const scenarioComplex = async() => {
  const run = async() => {
    console.time('scenarioComplex');
    
    const db1 = new Database(1);
    const db2 = new Database(2);
    const db3 = new Database(3);
    const api1 = new RestfulApi(1);
    const api2 = new RestfulApi(2);
    const api3 = new RestfulApi(3);
    const api4 = new RestfulApi(4);
    const api5 = new RestfulApi(5);

    const queue = [db1, db2, db3, api1, api2, api3, api4, api5];
    const rs: string[] = [];
    
    // why should not use the foreach
    // @see https://stackoverflow.com/a/37576787
    for(const task of queue) {
      rs.push(await task.getResult());
    }

    console.log(`${rs.join('')}`);
    console.timeEnd('scenarioComplex');
    console.log(`---`);
  }

  await run();
}

const scenarioComplexWithPromiseAll = async() => {
  const run = async() => {
    console.time('scenarioComplexWithPromiseAll');

    const db1 = new Database(1);
    const db2 = new Database(2);
    const db3 = new Database(3);
    const api1 = new RestfulApi(1);
    const api2 = new RestfulApi(2);
    const api3 = new RestfulApi(3);
    const api4 = new RestfulApi(4);
    const api5 = new RestfulApi(5);

    const queue = [db1, db2, db3, api1, api2, api3, api4, api5];
    const rs = await Promise.all(queue.map(async(task) => {
      return await task.getResult();
    }));

    console.log(`${rs.join('')}`);
    console.timeEnd('scenarioComplexWithPromiseAll');
    console.log(`---`);
  }

  await run();
}

(async() => {
  try {
    scenarioPromiseAll();
    scenarioAwaitEachAsyncTaskDirectly();
    scenarioAwaitAfterEachAsyncTaskCreated();
    scenarioComplex();
    scenarioComplexWithPromiseAll();
  } catch (err) {
    console.error('error:', err);
  }
})();