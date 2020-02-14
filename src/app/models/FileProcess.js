import Sequelize from 'sequelize';
import uuid from 'uuid';

export default class FileProcess extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                file_name: Sequelize.STRING,
                status: Sequelize.ENUM('completed', 'processing'),
            },
            {
                sequelize
            }
        )
   
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
}