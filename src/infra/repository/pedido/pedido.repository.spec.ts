import { Sequelize } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import Produto from '../../../domain/produto/entity/produto';
import Cliente from '../../../domain/cliente/entity/cliente';
import Endereco from '../../../domain/cliente/value-object/endereco';
import Pedido from '../../../domain/pedido/entity/pedido';
import ItemDoPedido from '../../../domain/pedido/entity/item-do-pedido';

import ProdutoModel from '../produto/produto.model';
import ClienteModel from '../cliente/cliente.model';
import PedidoModel from './pedido.model';
import ItemDoPedidoModel from './item-do-pedido.model';

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
      ItemDoPedidoModel,
      ProdutoModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  async function criarCliente(id?: string, nome?: string): Promise<Cliente> {
    const clienteRepository = new ClienteRepository();
    const cliente = new Cliente(id ?? 'cli123', nome ?? 'Customer 1');
    const endereco = new Endereco('Street 1', 1, 'Zipcode 1', 'City 1');
    cliente.endereco = endereco;
    await clienteRepository.create(cliente);
    return cliente;
  }

  async function criarProduto(id?: string, nome?: string, preco?: number): Promise<Produto> {
    const produtoRepository = new ProdutoRepository();
    const produto = new Produto(id ?? 'prod123', nome ?? 'Product 1', preco ?? 10);
    await produtoRepository.create(produto);
    return produto;
  }

  async function criarPedidoComUmItem(cliente: Cliente, produto: Produto, idPedido?: string): Promise<Pedido> {
    const item = new ItemDoPedido(
      uuidv4(),
      produto.nome,
      produto.preco,
      produto.id,
      2
    );
    const pedido = new Pedido(idPedido ?? 'ped123', cliente.id, [item]);
    const pedidoRepository = new PedidoRepository();
    await pedidoRepository.create(pedido);
    return pedido;
  }

  async function criarPedidoComDoisItens(cliente: Cliente, idPedido?: string): Promise<Pedido> {
    const produto1 = await criarProduto('prod-001', 'Produto 001', 150);
    const produto2 = await criarProduto('prod-002', 'Produto 002', 150);
    const item1 = new ItemDoPedido(
      uuidv4(),
      produto1.nome,
      produto1.preco,
      produto1.id,
      2
    );
    const item2 = new ItemDoPedido(
      uuidv4(),
      produto2.nome,
      produto2.preco,
      produto2.id,
      4
    );
    const pedido = new Pedido(idPedido ?? 'ped123', cliente.id, [item1, item2]);
    const pedidoRepository = new PedidoRepository();
    await pedidoRepository.create(pedido);
    return pedido;
  }

  it('deve criar pedido com 1 item', async () => {
    const cliente = await criarCliente('cli-001', 'Cliente 001');
    const produto = await criarProduto('prod-001', 'Produto 001', 150);
    const pedido = await criarPedidoComUmItem(cliente, produto, 'ped-001');
    const pedidoModel = await PedidoModel.findOne({
      where: { id: pedido.id },
      include: ['itens'],
    });
    expect(pedidoModel.toJSON()).toStrictEqual({
      id: pedido.id,
      idCliente: cliente.id,
      total: pedido.total(),
      itens: [
        {
          id: pedido.itens[0].id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: 2,
          idPedido: pedido.id,
          idProduto: produto.id,
        },
      ],
    });
  });

  it('deve criar pedido com 2 itens', async () => {
    const cliente = await criarCliente('cli-001', 'Cliente 001');
    const pedido = await criarPedidoComDoisItens(cliente, 'ped-001');
    const pedidoModel = await PedidoModel.findOne({
      where: { id: pedido.id },
      include: ['itens'],
    });
    expect(pedidoModel.id).toBe(pedido.id);
    expect(pedidoModel.idCliente).toBe(cliente.id);
    expect(pedido.itens.length).toBe(2);
  });

  it('deve encontrar um pedido', async () => {
    const pedidoRepository = new PedidoRepository();

    const cliente = await criarCliente('cli-002', 'Cliente 002');
    const produto = await criarProduto('prod-002', 'Produto 002', 150);
    const pedido = await criarPedidoComUmItem(cliente, produto, 'ped-002');
    const pedidoResult = await pedidoRepository.get(pedido.id);
    expect(pedidoResult).toStrictEqual(pedido);
    expect(pedidoResult.id).toEqual('ped-002');
    expect(pedidoResult.idCliente).toEqual(cliente.id);
  });

  it('deve gerar um erro quando cliente não é encontrado', async () => {
    const pedidoRepository = new PedidoRepository();
    expect(async () => {
      await pedidoRepository.get('idQualqueDeCliente');
    }).rejects.toThrow('Pedido não encontrado');
  });  

  it('deve encontrar todos os pedidos', async () => {
    const pedidoRepository = new PedidoRepository();

    const cliente3 = await criarCliente('cli-003', 'Cliente 003');
    const produto3 = await criarProduto('prod-003', 'Produto 003', 150);
    const pedido3 = await criarPedidoComUmItem(cliente3, produto3, 'ped-003');
    expect(pedido3.id).toEqual('ped-003');
    const pedido3Result = await pedidoRepository.get(pedido3.id);
    expect(pedido3Result).toStrictEqual(pedido3);
    expect(pedido3.idCliente).toEqual(cliente3.id);

    const cliente4 = await criarCliente('cli-004', 'Cliente 004');
    const produto4 = await criarProduto('prod-004', 'Produto 004', 150);
    const pedido4 = await criarPedidoComUmItem(cliente4, produto4, 'ped-004');
    expect(pedido4.id).toEqual('ped-004');
    // const pedido4Result = await pedidoRepository.get(pedido4.id);
    // expect(pedido4Result).toStrictEqual(pedido4);
    // expect(pedido4.idCliente).toEqual(cliente4.id);

    // const pedidosResult = await pedidoRepository.getAll();
    // expect(pedidosResult.length).toBeGreaterThan(1);
  });

  it('deve alterar cliente do pedido', async () => {
    const cliente = await criarCliente('cli-005', 'Cliente 005');
    const produto = await criarProduto('prod-005', 'Produto 005', 150);
    const pedido = await criarPedidoComUmItem(cliente, produto, 'ped-005');

    let pedidoModel = await PedidoModel.findOne({
      where: { id: pedido.id },
      include: ['itens'],
    });
    expect(pedidoModel.idCliente).toBe(cliente.id);

    const outroCliente = await criarCliente('cli-006', 'Cliente 006');
    pedido.alterarCliente(outroCliente.id);
    const pedidoRepository = new PedidoRepository();
    await pedidoRepository.update(pedido);

    pedidoModel = await PedidoModel.findOne({
      where: { id: pedido.id },
      include: ['itens'],
    });
    expect(pedidoModel.idCliente).toBe(outroCliente.id);
  });

  it('deve alterar item do pedido', async () => {
    const cliente = await criarCliente('cli-005', 'Cliente 005');
    const produto = await criarProduto('prod-005', 'Produto 005', 150);
    const pedido = await criarPedidoComUmItem(cliente, produto, 'ped-005');
    let pedidoModel = await PedidoModel.findOne({
      where: { id: pedido.id },
      include: ['itens'],
    });
    expect(pedidoModel.itens[0].idProduto).toBe(produto.id);
    
    const outroProduto = await criarProduto('prod-006', 'Produto 006', 150);
    const itemAlterado = new ItemDoPedido(
      pedidoModel.itens[0].id,
      outroProduto.nome,
      outroProduto.preco,
      outroProduto.id,
      165
    );
    pedido.alterarItem(itemAlterado);
    expect(pedido.itens[0].idProduto).toBe(outroProduto.id);

    const pedidoRepository = new PedidoRepository();
    await pedidoRepository.update(pedido);

    pedidoModel = await PedidoModel.findOne({
      where: { id: pedido.id },
      include: ['itens'],
    });
    expect(pedidoModel.itens[0].idProduto).toBe(outroProduto.id);
  });

});