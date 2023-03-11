import { Sequelize } from 'sequelize-typescript';

import Produto from '../../../domain/produto/entity/produto';
import Cliente from '../../../domain/cliente/entity/cliente';
import Endereco from '../../../domain/cliente/value-object/endereco';
import Pedido from '../../../domain/pedido/entity/pedido';
import ItemDoPedido from '../../../domain/pedido/entity/item-do-pedido';

import ProdutoModel from '../produto/produto.model';
import ClienteModel from '../cliente/cliente.model';
import PedidoModel from './pedido.model';
import ItemPedidoModel from './item.model';

import ProdutoRepository from '../produto/produto.repository';
import ClienteRepository from '../cliente/cliente.repository';
import PedidoRepository from './pedido.repository';

describe('Pedido - repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      ClienteModel,
      PedidoModel,
      ItemPedidoModel,
      ProdutoModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('deve criar um pedido', async () => {
    const clienteRepository = new ClienteRepository();
    const cliente = new Cliente('cli123', 'Customer 1');
    const endereco = new Endereco('Street 1', 1, 'Zipcode 1', 'City 1');
    cliente.endereco = endereco;
    await clienteRepository.create(cliente);

    const produtoRepository = new ProdutoRepository();
    const produto = new Produto('prod123', 'Product 1', 10);
    await produtoRepository.create(produto);

    const item = new ItemDoPedido(
      '1',
      produto.nome,
      produto.preco,
      produto.id,
      2
    );

    const pedido = new Pedido('ped123', 'cli123', [item]);

    const pedidoRepository = new PedidoRepository();
    await pedidoRepository.create(pedido);

    const pedidoModel = await PedidoModel.findOne({
      where: { id: pedido.id },
      include: ['items'],
    });

    expect(pedidoModel.toJSON()).toStrictEqual({
      id: 'ped123',
      idCliente: 'cli123',
      total: pedido.total(),
      items: [
        {
          id: item.id,
          nome: item.nome,
          preco: item.preco,
          quantidade: item.quantidade,
          idPedido: 'ped123',
          idProduto: 'prod123',
        },
      ],
    });
  });
});