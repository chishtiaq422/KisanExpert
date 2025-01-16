import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface educational_contentAttributes {
  id: number;
  title: string;
  content: string;
  advisory_id: number;
  published_at?: Date;
}

export type educational_contentPk = "id";
export type educational_contentId = educational_content[educational_contentPk];
export type educational_contentOptionalAttributes = "id" | "published_at";
export type educational_contentCreationAttributes = Optional<educational_contentAttributes, educational_contentOptionalAttributes>;

export class educational_content extends Model<educational_contentAttributes, educational_contentCreationAttributes> implements educational_contentAttributes {
  id!: number;
  title!: string;
  content!: string;
  advisory_id!: number;
  published_at?: Date;

  // educational_content belongsTo users via advisory_id
  advisory!: users;
  getAdvisory!: Sequelize.BelongsToGetAssociationMixin<users>;
  setAdvisory!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createAdvisory!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof educational_content {
    return educational_content.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    advisory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'educational_content',
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
