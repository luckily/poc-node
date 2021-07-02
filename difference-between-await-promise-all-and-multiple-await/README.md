# Any difference between await Promise.all() and multiple await?
See [Any difference between await Promise.all() and multiple await?
](https://stackoverflow.com/questions/45285129/any-difference-between-await-promise-all-and-multiple-await) in stackoverflow. 

Run:
```bash
npx ts-node difference-between-await-promise-all-and-multiple-await/test.ts
```

Output:
```
Task 1 succeed! Task 2 succeed! Task 3 succeed! Task 4 succeed! Task 5 succeed!
scenarioPromiseAll: 2005.095ms
Task 1 succeed! Task 2 succeed! Task 3 succeed! Task 4 succeed! Task 5 succeed!
scenarioAwaitAfterEachAsyncTaskCreated: 2004.785ms
Task 1 succeed! Task 2 succeed! Task 3 succeed! Task 4 succeed! Task 5 succeed!
scenarioAwaitEachAsyncTaskDirectly: 6512.313ms
```