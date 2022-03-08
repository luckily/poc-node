import { Sequelize } from "sequelize";
import { Member } from "./member";
import { Order } from "./order";
import { TransactionRepository } from "./transaction-repository";

const db = new Sequelize({
  host: '127.0.0.1',
  port: 3306,
  database: 'mydb',
  username: 'joel',
  password: 'joel@mysql',
  dialect: 'mysql'
});

let models = [ Member, Order ];

models.forEach(model => model.factory(db));
models.forEach(model => model.associate());

const transactionRepository = new TransactionRepository(db);

export {
  Member, Order, transactionRepository, db,
}
