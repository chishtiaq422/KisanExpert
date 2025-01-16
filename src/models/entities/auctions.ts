import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { bids, bidsId } from './bids';
import type { chat_messages, chat_messagesId } from './chat_messages';
import type { products, productsId } from './products';

export interface auctionsAttributes {
  id: number;
  product_id: number;
  start_time: Date;
  end_time: Date;
  starting_price: number;
  current_price?: number;
  status?: 'active' | 'completed';
  created_at?: Date;
  updated_at?: Date;
}

export type auctionsPk = "id";
export type auctionsId = auctions[auctionsPk];
export type auctionsOptionalAttributes = "id" | "current_price" | "status" | "created_at" | "updated_at";
export type auctionsCreationAttributes = Optional<auctionsAttributes, auctionsOptionalAttributes>;

export class auctions extends Model<auctionsAttributes, auctionsCreationAttributes> implements auctionsAttributes {
  id!: number;
  product_id!: number;
  start_time!: Date;
  end_time!: Date;
  starting_price!: number;
  current_price?: number;
  status?: 'active' | 'completed';
  created_at?: Date;
  updated_at?: Date;

  // auctions hasMany bids via auction_id
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
  // auctions hasMany chat_messages via auction_id
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
  // auctions belongsTo products via product_id
  product!: products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;

  static initModel(sequelize: Sequelize.Sequelize): typeof auctions {
    return auctions.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    starting_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    current_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active','completed'),
      allowNull: true,
      defaultValue: "active"
    }
  }, {
    sequelize,
    tableName: 'auctions',
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
        name: "product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}
