import Sequelize from 'sequelize';
import uuid from 'uuid';

export default class FileProcess extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                file_name: Sequelize.STRING,
                count_pending: Sequelize.INTEGER,
                status: Sequelize.ENUM('completed', 'processing'),
            },
            {
                tableName: 'File_processes',
                timestamps: false,
                sequelize:sequelize
            }
        )

        this.addHook('beforeCreate', async (user) => {
            user.id = await uuid()
        })
   
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
}