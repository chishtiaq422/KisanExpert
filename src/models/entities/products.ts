import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { auctions, auctionsId } from './auctions';
import type { users, usersId } from './users';

export interface productsAttributes {
  id: number;
  name: string;
  description?: string;
  farmer_id?: number;
  base_price: number;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
  qr_code?: string;
  status?: 'available' | 'sold' | 'unlisted';
}

export type productsPk = "id";
export type productsId = products[productsPk];
export type productsOptionalAttributes = "id" | "description" | "farmer_id" | "created_at" | "updated_at" | "qr_code" | "status";
export type productsCreationAttributes = Optional<productsAttributes, productsOptionalAttributes>;

export class products extends Model<productsAttributes, productsCreationAttributes> implements productsAttributes {
  id!: number;
  name!: string;
  description?: string;
  farmer_id?: number;
  base_price!: number;
  quantity!: number;
  created_at?: Date;
  updated_at?: Date;
  qr_code?: string;
  status?: 'available' | 'sold' | 'unlisted';

  // products hasMany auctions via product_id
  auctions!: auctions[];
  getAuctions!: Sequelize.HasManyGetAssociationsMixin<auctions>;
  setAuctions!: Sequelize.HasManySetAssociationsMixin<auctions, auctionsId>;
  addAuction!: Sequelize.HasManyAddAssociationMixin<auctions, auctionsId>;
  addAuctions!: Sequelize.HasManyAddAssociationsMixin<auctions, auctionsId>;
  createAuction!: Sequelize.HasManyCreateAssociationMixin<auctions>;
  removeAuction!: Sequelize.HasManyRemoveAssociationMixin<auctions, auctionsId>;
  removeAuctions!: Sequelize.HasManyRemoveAssociationsMixin<auctions, auctionsId>;
  hasAuction!: Sequelize.HasManyHasAssociationMixin<auctions, auctionsId>;
  hasAuctions!: Sequelize.HasManyHasAssociationsMixin<auctions, auctionsId>;
  countAuctions!: Sequelize.HasManyCountAssociationsMixin;
  // products belongsTo users via farmer_id
  farmer!: users;
  getFarmer!: Sequelize.BelongsToGetAssociationMixin<users>;
  setFarmer!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createFarmer!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof products {
    return products.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    farmer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    base_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qr_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('available','sold','unlisted'),
      allowNull: true,
      defaultValue: "available"
    }
  }, {
    sequelize,
    tableName: 'products',
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
        name: "farmer_id",
        using: "BTREE",
        fields: [
          { name: "farmer_id" },
        ]
      },
    ]
  });
  }
}
