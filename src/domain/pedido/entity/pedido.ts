import { ItemDoPedido } from "./item-do-pedido";

export class Pedido {
  private _id: string;
  private _idCliente: string;
  private _itens: ItemDoPedido[];
  private _total: number;

  constructor(id: string, customerId: string, items: ItemDoPedido[]) {
    this._id = id;
    this._idCliente = customerId;
    this._itens = items;
    this._total = this.total();
    this.validar();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._idCliente;
  }

  get items(): ItemDoPedido[] {
    return this._itens;
  }

  validar(): boolean {
    if (this._id.length === 0) {
      throw new Error("id é requerido");
    }
    if (this._idCliente.length === 0) {
      throw new Error("idCliente é requerido");
    }
    if (this._itens.length === 0) {
      throw new Error("itens é requerido");
    }
    if (this._itens.some((item) => item.quantidade <= 0)) {
      throw new Error("quantidade deve ser maior que 0");
    }
    return true;
  }

  total(): number {
    return this._itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  }
}