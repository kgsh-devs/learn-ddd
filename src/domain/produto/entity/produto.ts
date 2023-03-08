export default class Produto {
  private _id: string;
  private _nome: string;
  private _preco: number;

  constructor(id: string, nome: string, preco: number) {
    this._id = id;
    this._nome = nome;
    this._preco = preco;
    this.validar();
  }

  get id(): string {
    return this._id;
  }
  
  get nome(): string {
    return this._nome;
  }

  get preco(): number {
    return this._preco;
  }

  alterarNome(nome: string): void {
    this._nome = nome;
    this.validar();
  }

  alterarPreco(preco: number): void {
    this._preco = preco;
    this.validar();
  }

  validar(): boolean {
    if (this._id.length === 0) {
      throw new Error("id é requerido");
    }
    if (this._nome.length === 0) {
      throw new Error("nome é requerido");
    }
    if (this._preco < 0) {
      throw new Error("preco deve ser >= 0");
    }
    return true;
  }
}