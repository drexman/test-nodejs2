import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                code: Sequelize.STRING
            },
            {
                timestamp: true,
                sequelize
            }
        )
        
        return this;
    }

    static associate(models) {
        this.hasMany(models.Client,{foreignKey : 'user_id'});
    }
}