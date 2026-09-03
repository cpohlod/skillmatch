class Pessoa {
  
    constructor(nome, email = "") {
    this.nome = nome;
    this.email = email;
  }

  apresentar() {
    console.log(`Nome: ${this.nome}`);
    console.log(`E-mail: ${this.email || "Não informado"}`);
  }
}
module.exports = Pessoa;