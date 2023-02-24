class Cliente {
  _id: string;
  _nome: string;
  _endereco: string;
  _ativo: boolean;

  constructor(id: string, nome: string, endereco: string) {
    this._id = id;
    this._nome = nome;
    this._endereco = endereco;
    this._ativo = true;
  }

  alterarNome(nome: string) {
    this._nome = nome;
  }

  ativar() {
    this._ativo = true;
  }

  inativar() {
    this._ativo = false;
  }
}
