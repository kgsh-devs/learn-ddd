import ItemDoPedido from './item-do-pedido';

export default class Pedido {
  private _id: string;
  private _idCliente: string;
  private _itens: ItemDoPedido[];
  private _total: number;

  constructor(id: string, idCliente: string, itens: ItemDoPedido[]) {
    this._id = id;
    this._idCliente = idCliente;
    this._itens = itens;
    this._total = this.total();
    this.validar();
  }

  get id(): string {
    return this._id;
  }

  get idCliente(): string {
    return this._idCliente;
  }

  get itens(): ItemDoPedido[] {
    return this._itens;
  }

  validar(): boolean {
    if (this._id.length === 0) {
      throw new Error('id é requerido');
    }
    if (this._idCliente.length === 0) {
      throw new Error('idCliente é requerido');
    }
    if (this._itens.length === 0) {
      throw new Error('itens é requerido');
    }
    return true;
  }

  total(): number {
    return this._itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  }

  alterarCliente(idCliente: string): void {
    this._idCliente = idCliente;
    this.validar();
  }

  alterarItem(item: ItemDoPedido): void {
    const index = this.itens.findIndex((i) => i.id == item.id);
    if (index == -1)
      throw new Error('item não encontrado no pedido');
    else {
      this._itens[index] = item;
      this.validar();
    }
  }

  inserirItem(item: ItemDoPedido): void {
    const itemNaLista = this.itens.find((i) => i.idProduto == item.idProduto);
    if (itemNaLista != undefined)
      throw new Error('produto já existe no pedido');
    else {
      this._itens.push(item);
      this.validar();
    }
  }

  removerItem(idItem: string): void {
    const index = this.itens.findIndex((i) => i.id == idItem);
    if (index == -1)
      throw new Error('item não encontrado no pedido');
    else {
      this._itens.splice(index, 1);
      this.validar();
    }
  }
}