import FileProcess from '../models/FileProcess.js';
import User from '../models/User.js'

class FileProcessController {

    async getStatus(req, res, next)
    {
        try {
            
            const  file = await FileProcess.findByPk(req.params.uuid,{
                include: [{ model: User }]
            });

            if(!file)
            {
                return res.status(400).json({status: "error", message: 'Arquivo não foi encontrado'});
            }


            let processResponse = {
                id : file.id,
                file_name : file.file_name,
                status: file.status,
                user : User
            }

            return res.status(200).json(processResponse);
        } catch (error) {
            return res.status(400).json({ status: "error", message: error.message}); 
        }
    }

}

export default new FileProcessController();