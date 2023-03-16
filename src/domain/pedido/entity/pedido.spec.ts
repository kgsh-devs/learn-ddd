import ItemDoPedido from './item-do-pedido';
import Pedido from './pedido';

describe('Pedido - unit tests', () => {
  it('deve gerar erro quando id for vazio', () => {
    expect(() => {
      let pedido = new Pedido('', '123', []);
    }).toThrowError('id é requerido');
  });

  it('deve gerar erro quando idCliente for vazio', () => {
    expect(() => {
      let pedido = new Pedido('123', '', []);
    }).toThrowError('idCliente é requerido');
  });

  it('deve gerar erro quando itens for vazio', () => {
    expect(() => {
      let pedido = new Pedido('123', '123', []);
    }).toThrowError('itens é requerido');
  });

  it('deve validar pedido', () => {
    const item = new ItemDoPedido('i1', 'Item 1', 100, 'p1', 2);
    const pedido = new Pedido('o1', 'c1', [item]);
    expect(pedido.validar()).toBeTruthy;
  });

  it('deve calcular total', () => {
    const item1 = new ItemDoPedido('i1', 'Item 1', 100, 'p1', 2);
    const item2 = new ItemDoPedido('i2', 'Item 2', 200, 'p2', 2);
    const primeiroPedido = new Pedido('o1', 'c1', [item1]);

    let total = primeiroPedido.total();
    expect(primeiroPedido.total()).toBe(200);

    const segundaOrdem = new Pedido('o2', 'c1', [item1, item2]);
    total = segundaOrdem.total();
    expect(total).toBe(600);
  });

  it('deve gerar erro se a quantidade do item <= 0', () => {
    expect(() => {
      const item = new ItemDoPedido('i1', 'Item 1', 100, 'p1', 0);
      const pedido = new Pedido('o1', 'c1', [item]);
    }).toThrowError('quantidade deve ser maior que 0');
  });

  it('deve gerar erro se inserir produto que já existe no pedido', () => {
    expect(() => {
      const item = new ItemDoPedido('i1', 'Item 1', 100, 'p1', 1);
      const pedido = new Pedido('o1', 'c1', [item]);
      const itemDoMesmoProduto = new ItemDoPedido('i2', 'Item 1', 100, 'p1', 1);
      pedido.inserirItem(itemDoMesmoProduto);
    }).toThrowError('produto já existe no pedido');
  });

  it('deve remover um item do pedido', () => {
    const item1 = new ItemDoPedido('i1', 'Item 1', 100, 'p1', 1);
    const item2 = new ItemDoPedido('i2', 'Item 2', 100, 'p2', 1);
    const pedido = new Pedido('o1', 'c1', [item1, item2]);
    expect(pedido.itens.length).toEqual(2);
    pedido.removerItem('i1');
    expect(pedido.itens.length).toEqual(1);
  });

});