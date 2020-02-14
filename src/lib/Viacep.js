import fetch from 'node-fetch';

class Viacep {

    async search(cep, callback, errorcallback)
    {
        const resp = await fetch('https://viacep.com.br/ws/'+cep+'/json');
        const json = await resp.json();   
        await callback(json);
    }

}


export default new Viacep();