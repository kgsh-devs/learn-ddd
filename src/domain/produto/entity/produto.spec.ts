import Produto from "./produto";

describe("Produto - unit tests", () => {
  it("deve gerar erro quando id for vazio", () => {
    expect(() => {
      const produto = new Produto("", "Product 1", 100);
    }).toThrowError("id é requerido");
  });

  it("deve gerar erro quando nome for vazio", () => {
    expect(() => {
      const produto = new Produto("123", "", 100);
    }).toThrowError("nome é requerido");
  });

  it("deve gerar erro quando preco for < 0", () => {
    expect(() => {
      const product = new Produto("123", "Name", -1);
    }).toThrowError("preco deve ser >= 0");
  });

  it("deve alterar o nome", () => {
    const produto = new Produto("123", "Product 1", 100);
    expect(produto.nome).toBe("Product 1");
    produto.alterarNome("Product 2");
    expect(produto.nome).toBe("Product 2");
  });

  it("deve alterar o preco", () => {
    const produto = new Produto("123", "Product 1", 100);
    expect(produto.preco).toBe(100);
    produto.alterarPreco(150);
    expect(produto.preco).toBe(150);
  });
});