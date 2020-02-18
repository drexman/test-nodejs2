import helpers from '../../helpers.js';
import fs from 'fs';
import _ from 'lodash';
import csv  from 'csv-parser';
import Queue from '../../lib/Queue.js';
import User from '../models/User.js';
import Client from '../models/Client.js';
import Address from '../models/Address.js';
import FileProcess from '../models/FileProcess.js';
import yup from 'yup'

class ClientController {

    async upload(req, res, next)
    {
        const file = req.file;
        
        if(file){
            const { originalname, mimetype, filename } = file;

            if(mimetype !== 'text/csv'){
                return res.status(400).json({
                    status: "error",
                    message: 'Arquivo com extensão inválido'
                })
            }

            const[username, code] = originalname.split('_');
            const[normalizedCode,] = code.split('.');

            if(username == undefined || normalizedCode == undefined)
            {
                return res.status(400).json({ status: "error", message : `Nome arquivo com formato inválido '${originalname}'. Favor mudar formato do arquivo pata`})  
            }
            try {
                
                const user_check = await User.findOne({
                    where:{
                        code : normalizedCode
                    }
                });

                if(user_check)
                {
                    return res.status(404).json({status: "error", message: 'Usuário já existe'});
                }

                const user = await User
                .findOrCreate({ where : { code: normalizedCode }, defaults: {  name: helpers.titleize(username), code: normalizedCode } })
                .then(([user, created])=> {
                    return user.get({
                        plain: true
                    });
                });

                const file = await FileProcess.create({
                    user_id: user.id,
                    file_name: filename,
                    status: 'processing'
                });

                var list = [];
                fs.createReadStream("uploads/" + filename)
                .pipe(csv())
                .on("data", (el) => {
                    const client = {
                        name : el.Nome,
                        cep : el.CEP,
                        cpf : el.CPF,
                        user_id : user.id
                   };
                   list.push(client);
                   
                }).on("end", () => {

                    if(list.length)
                    {
                        const count = list.length;
                        FileProcess.update({count_pending: count}, {where:{id:file.id}}).then(()=>{
                            for(var i = 0; i < count; i++)
                            {
                                var client = list[i];
                                client.user_id = user.id;
                                Queue.add({client});
                            }
                        }); 
                    }
                });
            
                const uploadResponse = {
                    "user_code": user.code,
                    "name": user.name,
                    "created_at": user.create_at,
                    "file_name": file.file_name,
                    "file_process": file.id,
                    "url_file_process": process.env.API_HOST + 'upload/process/' + file.id,
                    "process_status": file.status
                }

                return res.status(200).json(uploadResponse); 

            } catch (error) {
                return res.status(400).json({status: "error", message : error.message});
            }
        }
        else 
        {
            return res.status(400).json({ status: "error", message: 'Upload não realizado'});
        }
    }

    async update(req, res, next)
    {
        
        const updateClientschema = yup.object().shape({
            id: yup.string().required(),
            name: yup.string(),
            cep: yup.string(),
            cpf: yup.string(),
            number: yup.string()
        });
        var data = req.body;
        if (!(await updateClientschema.isValid(data))) res.status(400).json({ error: 'Requisitos inválidos' })

        try {
            const client = await Client.findByPk(data.id);

            if(!client){
                return res.json({
                    status: 'error',
                    message: 'Client não encontrado'
                })
            }

            if(typeof data.number !== 'undefined')
            {
                //Atualizando número do endereço
                await Address.update({number : data.number },
                { where : {id: client.Address_id}});
                delete data.number;
            }        
        
            const updatedClient =  await Client.update(data,{
                where : {
                    id: client.id
                },
                returning: true,
                plain: true
            });

            return res.status(200).json({
                status: 'success',
                message: 'Cliente atualizado com sucesso',
                data: updatedClient
            });
            
        } catch (error) {
            return res.status(400).json({message : error.message});
        }
    } 

}

export default new ClientController();