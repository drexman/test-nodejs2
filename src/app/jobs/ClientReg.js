import Client from '../models/Client.js';
import Address from '../models/Address.js';
import helpers from '../../helpers.js';
import Viacep from '../../lib/Viacep.js';

export default {
    key: 'ClientReg',
    async handle({ data }){
        const { client } = data;
        const treatzip = helpers.leftPad(client.cep,8);

        Viacep.search(treatzip,
            function(result)
            {
                if(result.hasOwnProperty('logradouro'))
                {
                    
                     Address.create({
                        street: result.logradouro,
                        number: 0,
                        city: result.localidade,
                        state: result.uf,
                        complement: result.complemento,
                        cep : result.cep
                    }).then((address) => {
                        Client.create({
                            name: client.name,
                            cep: client.cep,
                            cpf: client.cpf,
                            user_id : client.user_id,
                            address_id: address.id
    
                        });
                    });
                }
            }
        )
    },

}