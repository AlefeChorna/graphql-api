import * as Sequelize from 'sequelize';

import { BaseModelnterface } from '../interfaces/BaseModelnterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface PostAttributes {
  id?: number;
  title?: string;
  content?: string;
  photo?: string;
  author?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostInstance extends Sequelize.Instance<PostAttributes>, PostAttributes {}

export interface PostModel extends BaseModelnterface, Sequelize.Model<PostInstance, PostAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): PostModel => {
  const Post: PostModel = sequelize.define('Post', {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: dataTypes.TEXT,
      allowNull: false
    },
    photo: {
      type: dataTypes.BLOB({
        length: 'long'
      }),
      allowNull: false
    }
  }, {
    tableName: 'posts'
  });

  Post.associate = (models: ModelsInterface): void => {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'author',
        name: 'author'
      }
    });
  }

  return Post;
}
