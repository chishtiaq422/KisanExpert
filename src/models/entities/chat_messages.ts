import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { auctions, auctionsId } from './auctions';
import type { users, usersId } from './users';

export interface chat_messagesAttributes {
  id: number;
  auction_id: number;
  user_id: number;
  message: string;
  sent_at?: Date;
}

export type chat_messagesPk = "id";
export type chat_messagesId = chat_messages[chat_messagesPk];
export type chat_messagesOptionalAttributes = "id" | "sent_at";
export type chat_messagesCreationAttributes = Optional<chat_messagesAttributes, chat_messagesOptionalAttributes>;

export class chat_messages extends Model<chat_messagesAttributes, chat_messagesCreationAttributes> implements chat_messagesAttributes {
  id!: number;
  auction_id!: number;
  user_id!: number;
  message!: string;
  sent_at?: Date;

  // chat_messages belongsTo auctions via auction_id
  auction!: auctions;
  getAuction!: Sequelize.BelongsToGetAssociationMixin<auctions>;
  setAuction!: Sequelize.BelongsToSetAssociationMixin<auctions, auctionsId>;
  createAuction!: Sequelize.BelongsToCreateAssociationMixin<auctions>;
  // chat_messages belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof chat_messages {
    return chat_messages.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    auction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'auctions',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'chat_messages',
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
        name: "auction_id",
        using: "BTREE",
        fields: [
          { name: "auction_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
