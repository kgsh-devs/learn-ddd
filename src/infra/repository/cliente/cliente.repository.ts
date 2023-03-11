import Cliente from '../../../domain/cliente/entity/cliente';
import Endereco from '../../../domain/cliente/value-object/endereco';
import ClienteModel from './cliente.model';
import ClienteRepositoryInterface from '../../../domain/cliente/repository/cliente.repository.interface';

export default class ClienteRepository implements ClienteRepositoryInterface {
  async create(entity: Cliente): Promise<void> {
    await ClienteModel.create({
      id: entity.id,
      nome: entity.nome,
      logradouro: entity.endereco.logradouro,
      numero: entity.endereco.numero,
      cep: entity.endereco.cep,
      cidade: entity.endereco.cidade,
      ativo: entity.estaAtivo(),
      pontosFidelidade: entity.pontosFidelidade,
    });
  }

  async get(id: string): Promise<Cliente> {
    let clienteModel;
    try {
      clienteModel = await ClienteModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error('Cliente não encontrado');
    }

    const cliente = new Cliente(id, clienteModel.nome);
    const endereco = new Endereco(
      clienteModel.logradouro,
      clienteModel.numero,
      clienteModel.cep,
      clienteModel.cidade
    );
    cliente.alterarEndereco(endereco);
    return cliente;
  }

  async getAll(): Promise<Cliente[]> {
    const clientesModel = await ClienteModel.findAll();

    const clientes = clientesModel.map((clienteModel) => {
      let cliente = new Cliente(clienteModel.id, clienteModel.nome);
      cliente.adicionarPontosFidelidade(clienteModel.pontosFidelidade);
      const endereco = new Endereco(
        clienteModel.logradouro,
        clienteModel.numero,
        clienteModel.cep,
        clienteModel.cidade
      );
      cliente.alterarEndereco(endereco);
      if (clienteModel.ativo) {
        cliente.ativar();
      }
      return cliente;
    });

    return clientes;
  }

  async update(entity: Cliente): Promise<void> {
    await ClienteModel.update(
      {
        nome: entity.nome,
        logradouro: entity.endereco.logradouro,
        numero: entity.endereco.numero,
        cep: entity.endereco.cep,
        cidade: entity.endereco.cidade,
        ativo: entity.estaAtivo(),
        pontosFidelidade: entity.pontosFidelidade,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
}