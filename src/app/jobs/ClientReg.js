import Client from '../models/Client.js';
import Address from '../models/Address.js';
import FileProcess from '../models/FileProcess.js';
import helpers from '../../helpers.js';
import Viacep from '../../lib/Viacep.js';

export default {
    key: 'ClientReg',
    async handle({ data }){
        const { client } = data;

        const file = await FileProcess.findOne({where:{ 'user_id' : client.user_id }, attributes: ['id','user_id', 'count_pending']});
        const contador =  file.count_pending;
        console.log(contador);   
        if(contador == 1) await FileProcess.update({status: 'completed', count_pending: 0}, {where:{id : file.id}}); 

        const treatzip = helpers.leftPad(client.cep,8);

        await Viacep.search(treatzip,
            async (result) => 
            {
                if(result.hasOwnProperty('logradouro'))
                {
                    const address = await Address.create({
                        street: result.logradouro,
                        number: 0,
                        city: result.localidade,
                        state: result.uf,
                        complement: result.complemento,
                        cep : result.cep,
                        neighborhood: ''
                    })

                    await Client.create({
                        name: client.name,
                        cep: client.cep,
                        cpf: client.cpf,
                        user_id : client.user_id,
                        address_id: address.id
                    });
                           
                    await FileProcess.update({
                        count_pending: contador - 1 
                    },{
                        where : {
                                user_id:  client.user_id
                                }
                    }); 
                    
                }
            }
        )
    },

}