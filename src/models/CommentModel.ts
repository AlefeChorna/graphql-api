import * as Sequelize from 'sequelize';

import { BaseModelnterface } from '../interfaces/BaseModelnterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface CommentAttributes {
  id?: number;
  comment?: string;
  post?: number;
  user?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentInstance extends Sequelize.Instance<CommentAttributes> {}

export interface CommentModel extends BaseModelnterface, Sequelize.Model<CommentInstance, CommentAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): CommentModel => {
  const Comment: CommentModel = sequelize.define('Comment', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    comment: {
      type: dataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'comments'
  });

  Comment.associate = (models: ModelsInterface): void => {
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
        field: 'post',
        name: 'post'
      }
    });

    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'user',
        name: 'user'
      }
    })
  }

  return Comment;
}
