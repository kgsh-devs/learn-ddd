import { Sequelize } from 'sequelize-typescript';
import Cliente from '../../../domain/cliente/entity/cliente';
import Endereco from '../../../domain/cliente/value-object/endereco';
import ClienteModel from './cliente.model';
import ClienteRepository from './cliente.repository';

describe('cliente - repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClienteModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('deve criar um cliente', async () => {
    const clienteRepository = new ClienteRepository();
    const cliente = new Cliente('123', 'Customer 1');
    const endereco = new Endereco('Street 1', 1, 'Zipcode 1', 'City 1');
    cliente.endereco = endereco;
    await clienteRepository.create(cliente);

    const clienteModel = await ClienteModel.findOne({ where: { id: '123' } });

    expect(clienteModel.toJSON()).toStrictEqual({
      id: '123',
      nome: cliente.nome,
      ativo: cliente.estaAtivo(),
      pontosFidelidade: cliente.pontosFidelidade,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      cep: endereco.cep,
      cidade: endereco.cidade,
    });
  });

  it('deve alterar um cliente', async () => {
    const clienteRepository = new ClienteRepository();
    const cliente = new Cliente('123', 'Customer 1');
    const endereco = new Endereco('Street 1', 1, 'Zipcode 1', 'City 1');
    cliente.endereco = endereco;
    await clienteRepository.create(cliente);

    cliente.alterarNome('Customer 2');
    await clienteRepository.update(cliente);
    const clienteModel = await ClienteModel.findOne({ where: { id: '123' } });

    expect(clienteModel.toJSON()).toStrictEqual({
      id: '123',
      nome: cliente.nome,
      ativo: cliente.estaAtivo(),
      pontosFidelidade: cliente.pontosFidelidade,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      cep: endereco.cep,
      cidade: endereco.cidade,
    });
  });

  it('deve encontrar um cliente', async () => {
    const clienteRepository = new ClienteRepository();
    const cliente = new Cliente('123', 'Customer 1');
    const endereco = new Endereco('Street 1', 1, 'Zipcode 1', 'City 1');
    cliente.endereco = endereco;
    await clienteRepository.create(cliente);

    const cclienteResult = await clienteRepository.get(cliente.id);

    expect(cliente).toStrictEqual(cclienteResult);
  });

  it('deve gerar um erro quando cliente não é encontrado', async () => {
    const clienteRepository = new ClienteRepository();

    expect(async () => {
      await clienteRepository.get('idQualqueDeCliente');
    }).rejects.toThrow('Cliente não encontrado');
  });

  it('deve encontrar todos os clientes', async () => {
    const clienteRepository = new ClienteRepository();
    const cliente1 = new Cliente('123', 'Customer 1');
    const endereco1 = new Endereco('Street 1', 1, 'Zipcode 1', 'City 1');
    cliente1.endereco = endereco1;
    cliente1.adicionarPontosFidelidade(10);
    cliente1.ativar();

    const cliente2 = new Cliente('456', 'Customer 2');
    const endereco2 = new Endereco('Street 2', 2, 'Zipcode 2', 'City 2');
    cliente2.endereco = endereco2;
    cliente2.adicionarPontosFidelidade(20);

    await clienteRepository.create(cliente1);
    await clienteRepository.create(cliente2);

    const clientes = await clienteRepository.getAll();

    expect(clientes).toHaveLength(2);
    expect(clientes).toContainEqual(cliente1);
    expect(clientes).toContainEqual(cliente2);
  });
});