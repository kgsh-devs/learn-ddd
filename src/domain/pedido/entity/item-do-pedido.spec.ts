import { ItemDoPedido } from './item-do-pedido';

describe('Item do Pedido - unit tests', () => {
  it('deve gerar erro quando id for vazio', () => {
    expect(() => {
      let order = new ItemDoPedido('', 'produto x', 3, 'prod-01', 100);
    }).toThrowError('id é requerido');
  });
  it('deve gerar erro quando idProduto for vazio', () => {
    expect(() => {
      let order = new ItemDoPedido('it-001', 'produto x', 3, '', 100);
    }).toThrowError('idProduto é requerido');
  });
  it('deve gerar erro se o preco <= 0', () => {
    expect(() => {
      const item = new ItemDoPedido('i1', 'Item 1', 0, 'p1', 200);
    }).toThrowError('preco deve ser maior que 0');
  });
  it('deve gerar erro se a quantidade <= 0', () => {
    expect(() => {
      const item = new ItemDoPedido('i1', 'Item 1', 100, 'p1', 0);
    }).toThrowError('quantidade deve ser maior que 0');
  });
});