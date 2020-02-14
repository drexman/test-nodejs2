import User from '../models/User.js';
import Client from '../models/Client.js';
import Address from '../models/Address.js';
import FileProcess from '../models/FileProcess.js';

class UserController {

    async delete(req, res, next)
    {
        const userCode = req.params.code;

        const user = await User.findOne({ where: {code: userCode}});

        if(!user)
        {
            return res.status(404).json({ status: false, message: `Usuario não encontrado`, data: []});
        }

        const file = await FileProcess.findOne({ where: {user_id: user.id}});
        const clients = await Client.findAll({ where: {user_id: user.id}})
        
        for(var i = 0; i < clients.length; i++)
        {
            var c = clients[i];
            await Address.destroy({where:{ id: c.address_id}});
            await c.destroy();
        }

        await user.destroy();
        await file.destroy();

        return res.json({
            status: "deleted",
            data: {
                id:user.id,
                name: user.name
            }
        });
    }

    async getAllClients(req, res, next)
    {
        try {

            const userCode = req.params.code

            const user = await User.findOne({ where: { code: userCode } })

            if (!user) {
                return res.status(404).json({ status: "error", message: `Usuario não encontrado` })
            }


            const clientslist = await Client.findAll({
                where: { user_id: user.id },
                attributes: { exclude: ['user_id', 'UserId', 'address_id'] },
                include: [{
                    model: Address,
                }]
            });

            return res.json(
                {
                    status: "completed",
                    message: '',
                    data: clientslist
                }
            )
            
        } catch (error) {
            return res.status(400).json({
                status: "error",
                message: error.message
            });  
        }
    }

}
export default new UserController();