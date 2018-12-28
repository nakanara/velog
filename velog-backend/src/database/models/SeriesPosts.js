import Sequelize from 'sequelize';
import db from 'database/db';
import { primaryUUID } from 'lib/common';
import { Series, Post } from 'database/models';

const SeriesPosts = db.define(
  'series_posts',
  {
    id: primaryUUID,
    fk_series_id: Sequelize.UUID,
    fk_post_id: Sequelize.UUID,
    index: Sequelize.INTEGER,
  },
  {
    freezeTableName: true,
    tableName: 'series_posts',
    indexes: [
      {
        fields: ['fk_series_id'],
      },
      {
        fields: ['fk_post_id'],
      },
    ],
  },
);

SeriesPosts.associate = () => {
  SeriesPosts.belongsTo(Post, {
    onDelete: 'CASCADE',
    onUpdate: 'restrict',
    foreignKey: 'fk_post_id',
  });
  SeriesPosts.belongsTo(Series, {
    onDelete: 'CASCADE',
    onUpdate: 'restrict',
    foreignKey: 'fk_series_id',
  });
};

export default SeriesPosts;