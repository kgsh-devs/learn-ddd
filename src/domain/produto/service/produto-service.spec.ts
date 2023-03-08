import Produto from '../entity/produto';
import ProdutoService from './produto-service';

describe('Produto service - unit tests', () => {
  it('deve alterar o preco de todos os produtos', () => {
    const prod1 = new Produto('product1', 'Product 1', 10);
    const prod2 = new Produto('product2', 'Product 2', 20);
    expect(prod1.preco).toBe(10);
    expect(prod2.preco).toBe(20);
    const produtos = [prod1, prod2];
    ProdutoService.ajustarPreco(produtos, 100);
    expect(prod1.preco).toBe(20);
    expect(prod2.preco).toBe(40);
  });
});