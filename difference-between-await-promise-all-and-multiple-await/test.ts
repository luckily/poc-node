import { time } from "console";

const task = async(taskNum, seconds, negativeScenario = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      if (negativeScenario)
        reject(new Error(`Task ${taskNum} failed!`));
      else
        resolve(`Task ${taskNum} succeed!`);
    }, seconds * 1000);
  });
};

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
  console.log(`${r1} ${r2} ${r3} ${r4} ${r5}`);
  console.timeEnd('scenarioPromiseAll');
}

const scenarioAwaitEachAsyncTaskDirectly = async() => {
  // multiple await alternative
  console.time('scenarioAwaitEachAsyncTaskDirectly');
  const r1 = await task(1, 1, false);
  const r2 = await task(2, 2, false);
  const r3 = await task(3, 1, false);
  const r4 = await task(4, 2, false);
  const r5 = await task(5, 0.5, false);
  console.log(`${r1} ${r2} ${r3} ${r4} ${r5}`);
  console.timeEnd('scenarioAwaitEachAsyncTaskDirectly');
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
  console.log(`${r1} ${r2} ${r3} ${r4} ${r5}`);
  console.timeEnd('scenarioAwaitAfterEachAsyncTaskCreated');
}

(async() => {
  try {
    scenarioPromiseAll();
    scenarioAwaitEachAsyncTaskDirectly();
    scenarioAwaitAfterEachAsyncTaskCreated();
  } catch (err) {
    console.error('error:', err);
  }
})();