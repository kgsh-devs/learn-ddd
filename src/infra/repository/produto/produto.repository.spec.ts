import { Sequelize } from 'sequelize-typescript';
import Produto from '../../../domain/produto/entity/produto';
import ProdutoModel from './produto.model';
import ProdutoRepository from './produto.repository';

describe('Product repository test', () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequileze.addModels([ProdutoModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it('deve criar um produto', async () => {
    const produtoRepository = new ProdutoRepository();
    const produto = new Produto('1', 'Product 1', 100);

    await produtoRepository.create(produto);

    const produtoModel = await ProdutoModel.findOne({ where: { id: '1' } });

    expect(produtoModel.toJSON()).toStrictEqual({
      id: '1',
      nome: 'Product 1',
      preco: 100,
    });
  });

  it('deve alterar um produto', async () => {
    const produtoRepository = new ProdutoRepository();
    const produto = new Produto('1', 'Product 1', 100);

    await produtoRepository.create(produto);

    const produtoModel = await ProdutoModel.findOne({ where: { id: '1' } });

    expect(produtoModel.toJSON()).toStrictEqual({
      id: '1',
      nome: 'Product 1',
      preco: 100,
    });

    produto.alterarNome('Product 2');
    produto.alterarPreco(200);

    await produtoRepository.update(produto);

    const produtoModel2 = await ProdutoModel.findOne({ where: { id: '1' } });

    expect(produtoModel2.toJSON()).toStrictEqual({
      id: '1',
      nome: 'Product 2',
      preco: 200,
    });
  });

  it('deve encontrar um produto', async () => {
    const produto = new Produto('1', 'Product 1', 100);
    const produtoRepository = new ProdutoRepository();
    await produtoRepository.create(produto);
    const produtoModel = await ProdutoModel.findOne({ where: { id: '1' } });
    const produtoEncontrado = await produtoRepository.get('1');
    expect(produtoModel.toJSON()).toStrictEqual({
      id: produtoEncontrado.id,
      nome: produtoEncontrado.nome,
      preco: produtoEncontrado.preco,
    });
  });

  it('deve encontrar todos os produtos', async () => {
    const produtoRepository = new ProdutoRepository();
    const produto = new Produto('1', 'Product 1', 100);
    await produtoRepository.create(produto);

    const produto2 = new Produto('2', 'Product 2', 200);
    await produtoRepository.create(produto2);

    const produtosEncontrados = await produtoRepository.getAll();
    const produtos = [produto, produto2];

    expect(produtos).toEqual(produtosEncontrados);    
  });
  
});