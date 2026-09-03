const Pessoa = require("./pessoa");
class Perfil extends Pessoa {
  
  constructor(nome, areaInteresse, habilidades, tempoExperiencia, email) {
    super(nome, email); //RF10 (super)
    this.areaInteresse = areaInteresse;
    this.habilidades = habilidades; 
    this.tempoExperiencia = tempoExperiencia; 
  }

  apresentar() {
    console.log("\n=== Perfil do Candidato ===");
    super.apresentar();
    console.log("Área de Interesse:"+this.areaInteresse);
    console.log("Tempo de Experiência:"+this.tempoExperiencia+" anos");
    console.log("Habilidades:"+ this.habilidades.join(", "));
  }
}

module.exports = Perfil;