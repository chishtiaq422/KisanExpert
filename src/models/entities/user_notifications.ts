import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface user_notificationsAttributes {
  id: number;
  advisory_id: number;
  title: string;
  content: string;
}

export type user_notificationsPk = "id";
export type user_notificationsId = user_notifications[user_notificationsPk];
export type user_notificationsOptionalAttributes = "id";
export type user_notificationsCreationAttributes = Optional<user_notificationsAttributes, user_notificationsOptionalAttributes>;

export class user_notifications extends Model<user_notificationsAttributes, user_notificationsCreationAttributes> implements user_notificationsAttributes {
  id!: number;
  advisory_id!: number;
  title!: string;
  content!: string;

  // user_notifications belongsTo users via advisory_id
  advisory!: users;
  getAdvisory!: Sequelize.BelongsToGetAssociationMixin<users>;
  setAdvisory!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createAdvisory!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_notifications {
    return user_notifications.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    advisory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_notifications',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "advisory_id",
        using: "BTREE",
        fields: [
          { name: "advisory_id" },
        ]
      },
    ]
  });
  }
}
