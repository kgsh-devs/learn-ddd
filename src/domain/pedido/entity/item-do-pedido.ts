export class ItemDoPedido {
  private _id: string;
  private _idProduto: string;
  private _nome: string;
  private _preco: number;
  private _quantidade: number;

  constructor(
    id: string,
    nome: string,
    preco: number,
    idProduto: string,
    quantidade: number
  ) {
    this._id = id;
    this._nome = nome;
    this._preco = preco;
    this._idProduto = idProduto;
    this._quantidade = quantidade;
    this.validar();
  }

  validar(): boolean {
    if (this._id.length === 0) {
      throw new Error("id é requerido");
    }
    if (this._idProduto.length === 0) {
      throw new Error("idProduto é requerido");
    }
    if (this._preco == 0) {
      throw new Error("preco deve ser maior que 0");
    }
    if (this._quantidade == 0) {
      throw new Error("quantidade deve ser maior que 0");
    }
    return true;
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get idProduto(): string {
    return this._idProduto;
  }

  get quantidade(): number {
    return this._quantidade;
  }

  get preco(): number {
    return this._preco;
  }

  get totalDoItem(): number {
    return this._preco * this._quantidade;
  }

}