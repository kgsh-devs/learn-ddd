import Produto from '../../../domain/produto/entity/produto';
import ProdutoModel from './produto.model';
import ProdutoRepositoryInterface from '../../../domain/produto/repository/produto-repository.interface';

export default class ProdutoRepository implements ProdutoRepositoryInterface {
  async create(entity: Produto): Promise<void> {
    await ProdutoModel.create({
      id: entity.id,
      nome: entity.nome,
      preco: entity.preco,
    });
  }

  async get(id: string): Promise<Produto> {
    const produtoModel = await ProdutoModel.findOne({ where: { id } });
    return new Produto(produtoModel.id, produtoModel.nome, produtoModel.preco);
  }

  async getAll(): Promise<Produto[]> {
    const produtosModel = await ProdutoModel.findAll();
    return produtosModel.map((prod) =>
      new Produto(prod.id, prod.nome, prod.preco)
    );
  }
  
  async update(entity: Produto): Promise<void> {
    await ProdutoModel.update(
      {
        nome: entity.nome,
        preco: entity.preco,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  // async find(id: string): Promise<Produto> {
  //   const produtoModel = await ProdutoModel.findOne({ where: { id } });
  //   return new Produto(produtoModel.id, produtoModel.nome, produtoModel.preco);
  // }

  // async findAll(): Promise<Produto[]> {
  //   const produtosModel = await ProdutoModel.findAll();
  //   return produtosModel.map((prod) =>
  //     new Produto(prod.id, prod.nome, prod.preco)
  //   );
  // }
}