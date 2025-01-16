import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { auctions, auctionsId } from './auctions';
import type { users, usersId } from './users';

export interface bidsAttributes {
  id: number;
  auction_id: number;
  user_id: number;
  amount: number;
  bid_time?: Date;
}

export type bidsPk = "id";
export type bidsId = bids[bidsPk];
export type bidsOptionalAttributes = "id" | "bid_time";
export type bidsCreationAttributes = Optional<bidsAttributes, bidsOptionalAttributes>;

export class bids extends Model<bidsAttributes, bidsCreationAttributes> implements bidsAttributes {
  id!: number;
  auction_id!: number;
  user_id!: number;
  amount!: number;
  bid_time?: Date;

  // bids belongsTo auctions via auction_id
  auction!: auctions;
  getAuction!: Sequelize.BelongsToGetAssociationMixin<auctions>;
  setAuction!: Sequelize.BelongsToSetAssociationMixin<auctions, auctionsId>;
  createAuction!: Sequelize.BelongsToCreateAssociationMixin<auctions>;
  // bids belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof bids {
    return bids.init({
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
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    bid_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'bids',
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
