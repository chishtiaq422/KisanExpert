import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface languagesAttributes {
  id: number;
  code: string;
  name: string;
}

export type languagesPk = "id";
export type languagesId = languages[languagesPk];
export type languagesOptionalAttributes = "id";
export type languagesCreationAttributes = Optional<languagesAttributes, languagesOptionalAttributes>;

export class languages extends Model<languagesAttributes, languagesCreationAttributes> implements languagesAttributes {
  id!: number;
  code!: string;
  name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof languages {
    return languages.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "code"
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'languages',
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
        name: "code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
    ]
  });
  }
}
