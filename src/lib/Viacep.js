import fetch from 'node-fetch';

class Viacep {

    search(cep, callback, errorcallback)
    {
        fetch('https://viacep.com.br/ws/'+cep+'/json')
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(err=> {
            errorcallback(err);
        });
    }

}


export default new Viacep();