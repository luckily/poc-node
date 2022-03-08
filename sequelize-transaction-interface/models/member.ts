import { Model, Sequelize, DataTypes } from 'sequelize';
import { Order } from './order';

export class Member extends Model {
  static factory(sequelize: Sequelize) {
    Member.init({
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    }, {
      modelName: 'Member',
      tableName: 'member',
      sequelize,
    });

    return Member;
  }

  static associate() {
    Member.hasMany(Order);
  }
}

