import type { Sequelize } from "sequelize";
import { auctions as _auctions } from "./auctions";
import type { auctionsAttributes, auctionsCreationAttributes } from "./auctions";
import { bids as _bids } from "./bids";
import type { bidsAttributes, bidsCreationAttributes } from "./bids";
import { chat_messages as _chat_messages } from "./chat_messages";
import type { chat_messagesAttributes, chat_messagesCreationAttributes } from "./chat_messages";
import { educational_content as _educational_content } from "./educational_content";
import type { educational_contentAttributes, educational_contentCreationAttributes } from "./educational_content";
import { languages as _languages } from "./languages";
import type { languagesAttributes, languagesCreationAttributes } from "./languages";
import { products as _products } from "./products";
import type { productsAttributes, productsCreationAttributes } from "./products";
import { roles as _roles } from "./roles";
import type { rolesAttributes, rolesCreationAttributes } from "./roles";
import { user_notifications as _user_notifications } from "./user_notifications";
import type { user_notificationsAttributes, user_notificationsCreationAttributes } from "./user_notifications";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _auctions as auctions,
  _bids as bids,
  _chat_messages as chat_messages,
  _educational_content as educational_content,
  _languages as languages,
  _products as products,
  _roles as roles,
  _user_notifications as user_notifications,
  _users as users,
};

export type {
  auctionsAttributes,
  auctionsCreationAttributes,
  bidsAttributes,
  bidsCreationAttributes,
  chat_messagesAttributes,
  chat_messagesCreationAttributes,
  educational_contentAttributes,
  educational_contentCreationAttributes,
  languagesAttributes,
  languagesCreationAttributes,
  productsAttributes,
  productsCreationAttributes,
  rolesAttributes,
  rolesCreationAttributes,
  user_notificationsAttributes,
  user_notificationsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const auctions = _auctions.initModel(sequelize);
  const bids = _bids.initModel(sequelize);
  const chat_messages = _chat_messages.initModel(sequelize);
  const educational_content = _educational_content.initModel(sequelize);
  const languages = _languages.initModel(sequelize);
  const products = _products.initModel(sequelize);
  const roles = _roles.initModel(sequelize);
  const user_notifications = _user_notifications.initModel(sequelize);
  const users = _users.initModel(sequelize);

  bids.belongsTo(auctions, { as: "auction", foreignKey: "auction_id"});
  auctions.hasMany(bids, { as: "bids", foreignKey: "auction_id"});
  chat_messages.belongsTo(auctions, { as: "auction", foreignKey: "auction_id"});
  auctions.hasMany(chat_messages, { as: "chat_messages", foreignKey: "auction_id"});
  auctions.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(auctions, { as: "auctions", foreignKey: "product_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  bids.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(bids, { as: "bids", foreignKey: "user_id"});
  chat_messages.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(chat_messages, { as: "chat_messages", foreignKey: "user_id"});
  educational_content.belongsTo(users, { as: "advisory", foreignKey: "advisory_id"});
  users.hasMany(educational_content, { as: "educational_contents", foreignKey: "advisory_id"});
  products.belongsTo(users, { as: "farmer", foreignKey: "farmer_id"});
  users.hasMany(products, { as: "products", foreignKey: "farmer_id"});
  user_notifications.belongsTo(users, { as: "advisory", foreignKey: "advisory_id"});
  users.hasMany(user_notifications, { as: "user_notifications", foreignKey: "advisory_id"});

  return {
    auctions: auctions,
    bids: bids,
    chat_messages: chat_messages,
    educational_content: educational_content,
    languages: languages,
    products: products,
    roles: roles,
    user_notifications: user_notifications,
    users: users,
  };
}
