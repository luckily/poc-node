export interface ITransaction {
  transaction<T>(autoCallback: (t: any) => PromiseLike<T>): Promise<T>;
  getTransaction<T>(options?: any): Promise<T>;
}