import { Sequelize } from "sequelize";
import { ITransaction } from "./interface";

export class TransactionRepository<T> implements ITransaction {
  readonly db: Sequelize;

  constructor(db: Sequelize) {
    this.db = new Sequelize('mydb', 'joel', 'joel@mysql', {
      dialect: 'mysql'
    });
  }

  async getTransaction<T>(options?: any): Promise<T> {
    return this.db.transaction(options);
  }

  async transaction<T>(autoCallback: (t) => PromiseLike<T>): Promise<T> {
    return this.db.transaction(autoCallback);
  }
}