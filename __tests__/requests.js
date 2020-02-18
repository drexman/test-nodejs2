const  request = require('supertest');
const server = require('../../src/app');


beforeAll(async () => {
    console.log('Iniciando TDD com jest!');
});


//o que será executado após todos os testes
afterAll(()=> {
    server.close();
    console.log('servidor fechado');
});

describe('inicio dos testes', () => {

    test('acessa a rota para trazer informações dos clientes', async() => {

        const code = "";
        const response = await request(server).get(`/users/${code}/clients`);
        set('Accept','application/json');
        //qual status esperado
        expect(response.status).toEqual(200);
    });
});

