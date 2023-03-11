import Produto from '../entity/produto';

export default class ProdutoService {
  static ajustarPreco(produtos: Produto[], percentual: number): Produto[] {
    produtos.forEach((produto) => {
      produto.alterarPreco((produto.preco * percentual) / 100 + produto.preco);
    });
    return produtos;
  }
}