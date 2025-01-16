import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { bids, bidsId } from './bids';
import type { chat_messages, chat_messagesId } from './chat_messages';
import type { educational_content, educational_contentId } from './educational_content';
import type { products, productsId } from './products';
import type { roles, rolesId } from './roles';
import type { user_notifications, user_notificationsId } from './user_notifications';

export interface usersAttributes {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  role_id: number;
  created_at?: Date;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "created_at";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  username!: string;
  email!: string;
  password_hash!: string;
  role_id!: number;
  created_at?: Date;

  // users belongsTo roles via role_id
  role!: roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<roles, rolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<roles>;
  // users hasMany bids via user_id
  bids!: bids[];
  getBids!: Sequelize.HasManyGetAssociationsMixin<bids>;
  setBids!: Sequelize.HasManySetAssociationsMixin<bids, bidsId>;
  addBid!: Sequelize.HasManyAddAssociationMixin<bids, bidsId>;
  addBids!: Sequelize.HasManyAddAssociationsMixin<bids, bidsId>;
  createBid!: Sequelize.HasManyCreateAssociationMixin<bids>;
  removeBid!: Sequelize.HasManyRemoveAssociationMixin<bids, bidsId>;
  removeBids!: Sequelize.HasManyRemoveAssociationsMixin<bids, bidsId>;
  hasBid!: Sequelize.HasManyHasAssociationMixin<bids, bidsId>;
  hasBids!: Sequelize.HasManyHasAssociationsMixin<bids, bidsId>;
  countBids!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany chat_messages via user_id
  chat_messages!: chat_messages[];
  getChat_messages!: Sequelize.HasManyGetAssociationsMixin<chat_messages>;
  setChat_messages!: Sequelize.HasManySetAssociationsMixin<chat_messages, chat_messagesId>;
  addChat_message!: Sequelize.HasManyAddAssociationMixin<chat_messages, chat_messagesId>;
  addChat_messages!: Sequelize.HasManyAddAssociationsMixin<chat_messages, chat_messagesId>;
  createChat_message!: Sequelize.HasManyCreateAssociationMixin<chat_messages>;
  removeChat_message!: Sequelize.HasManyRemoveAssociationMixin<chat_messages, chat_messagesId>;
  removeChat_messages!: Sequelize.HasManyRemoveAssociationsMixin<chat_messages, chat_messagesId>;
  hasChat_message!: Sequelize.HasManyHasAssociationMixin<chat_messages, chat_messagesId>;
  hasChat_messages!: Sequelize.HasManyHasAssociationsMixin<chat_messages, chat_messagesId>;
  countChat_messages!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany educational_content via advisory_id
  educational_contents!: educational_content[];
  getEducational_contents!: Sequelize.HasManyGetAssociationsMixin<educational_content>;
  setEducational_contents!: Sequelize.HasManySetAssociationsMixin<educational_content, educational_contentId>;
  addEducational_content!: Sequelize.HasManyAddAssociationMixin<educational_content, educational_contentId>;
  addEducational_contents!: Sequelize.HasManyAddAssociationsMixin<educational_content, educational_contentId>;
  createEducational_content!: Sequelize.HasManyCreateAssociationMixin<educational_content>;
  removeEducational_content!: Sequelize.HasManyRemoveAssociationMixin<educational_content, educational_contentId>;
  removeEducational_contents!: Sequelize.HasManyRemoveAssociationsMixin<educational_content, educational_contentId>;
  hasEducational_content!: Sequelize.HasManyHasAssociationMixin<educational_content, educational_contentId>;
  hasEducational_contents!: Sequelize.HasManyHasAssociationsMixin<educational_content, educational_contentId>;
  countEducational_contents!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany products via farmer_id
  products!: products[];
  getProducts!: Sequelize.HasManyGetAssociationsMixin<products>;
  setProducts!: Sequelize.HasManySetAssociationsMixin<products, productsId>;
  addProduct!: Sequelize.HasManyAddAssociationMixin<products, productsId>;
  addProducts!: Sequelize.HasManyAddAssociationsMixin<products, productsId>;
  createProduct!: Sequelize.HasManyCreateAssociationMixin<products>;
  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<products, productsId>;
  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<products, productsId>;
  hasProduct!: Sequelize.HasManyHasAssociationMixin<products, productsId>;
  hasProducts!: Sequelize.HasManyHasAssociationsMixin<products, productsId>;
  countProducts!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany user_notifications via advisory_id
  user_notifications!: user_notifications[];
  getUser_notifications!: Sequelize.HasManyGetAssociationsMixin<user_notifications>;
  setUser_notifications!: Sequelize.HasManySetAssociationsMixin<user_notifications, user_notificationsId>;
  addUser_notification!: Sequelize.HasManyAddAssociationMixin<user_notifications, user_notificationsId>;
  addUser_notifications!: Sequelize.HasManyAddAssociationsMixin<user_notifications, user_notificationsId>;
  createUser_notification!: Sequelize.HasManyCreateAssociationMixin<user_notifications>;
  removeUser_notification!: Sequelize.HasManyRemoveAssociationMixin<user_notifications, user_notificationsId>;
  removeUser_notifications!: Sequelize.HasManyRemoveAssociationsMixin<user_notifications, user_notificationsId>;
  hasUser_notification!: Sequelize.HasManyHasAssociationMixin<user_notifications, user_notificationsId>;
  hasUser_notifications!: Sequelize.HasManyHasAssociationsMixin<user_notifications, user_notificationsId>;
  countUser_notifications!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "username"
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email"
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
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
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "role_id",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
  }
}
