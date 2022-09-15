import app from "../src/app";
import supertest from "supertest"
import {prisma}  from "../src/database"
//depois tira de forma global e colocar 
const body = {
  title: "meu celular 1",
  url: "https://www.casasbahia.com.br/celular/b",
  description: "compra bons celulares",
  amount: 100
}

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE items;`;
});

describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto', async () => {
    

    const result = await supertest(app).post("/items").send(body);
    const status = result.status;
    
    expect(status).toEqual(201);
    
  });
  it('Deve retornar 409, ao tentar cadastrar um item que exista',async () => {
    
    await supertest(app).post("/items").send(body);
    const result = await supertest(app).post("/items").send(body);
    const status = result.status;
    expect(status).toEqual(409);

  });
});

describe('Testa GET /items ', () => {
  it.todo('Deve retornar status 200 e o body no formato de Array')
});

describe('Testa GET /items/:id ', () => {
  it.todo('Deve retornar status 200 e um objeto igual a o item cadastrado');
  it.todo('Deve retornar status 404 caso não exista um item com esse id');
});


beforeAll(async () => {
  await prisma.$disconnect()
})