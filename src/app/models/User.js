import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                code: Sequelize.STRING,
                createdAt:{
                    field: 'created_at', 
                    type:Sequelize.DATE
                },
                updatedAt:{
                    field: 'updated_at',
                    type: Sequelize.DATE
                }
            },
            {
                timestamps: true,
                sequelize: sequelize
            }
        )
        
        return this;
    }

    static associate(models) {
        this.hasMany(models.Client,{foreignKey : 'user_id'});
    }
}