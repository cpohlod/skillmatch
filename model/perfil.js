class Perfil {
  constructor(nome, areaInteresse, habilidades, tempoExperiencia) {
    this.nome = nome;
    this.areaInteresse = areaInteresse;
    this.habilidades = habilidades; 
    this.tempoExperiencia = tempoExperiencia; 
  }

  apresentar() {
    console.log("\n=== Perfil do Candidato ===");
    console.log("Nome:"+this.nome);
    console.log("Área de Interesse:"+this.areaInteresse);
    console.log("Tempo de Experiência:"+this.tempoExperiencia+" anos");
    console.log("Habilidades:"+ this.habilidades.join(", "));
  }
}

module.exports = { Perfil };