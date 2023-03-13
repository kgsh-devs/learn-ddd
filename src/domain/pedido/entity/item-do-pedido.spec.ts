import ItemDoPedido from './item-do-pedido';

describe('Item do Pedido - unit tests', () => {
  it('deve gerar erro quando id for vazio', () => {
    expect(() => {
      let item = new ItemDoPedido('', 'produto x', 3, 'prod-01', 100);
    }).toThrowError('id é requerido');
  });
  it('deve gerar erro quando idProduto for vazio', () => {
    expect(() => {
      let item = new ItemDoPedido('it-001', 'produto x', 3, '', 100);
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
  it('deve validar o item do pedido', () => {
    const item = new ItemDoPedido('i1', 'Item 1', 200, 'p1', 432);
    expect(item.validar()).toBeTruthy;
  });
  it('deve calcular o total do item', () => {
    const item = new ItemDoPedido('i1', 'Item 1', 2, 'p1', 5);
    expect(item.totalDoItem).toBe(10);
  });

});