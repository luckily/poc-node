import { DataTypes, Model, Sequelize } from "sequelize";
import { Member } from "./member";

export class Order extends Model {
  static factory(sequelize: Sequelize) {
    Order.init({
      productName: DataTypes.STRING,
      price: DataTypes.INTEGER,
    }, {
      modelName: 'Order',
      tableName: 'order',
      sequelize,
    });

    return Order;
  }

  static associate() {
    Order.belongsTo(Member);
  }
}
