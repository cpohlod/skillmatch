const prompt = require("prompt-sync")();
const vagas = require("./mock_vagas");
const { Perfil } = require("./model/perfil.js");

let opcao;

do {
  console.log("\n===========================================================================");
  console.log(  "  SkillMatch JS: Simulador de Compatibilidade com Vaga Front-End Júnior    ");
  console.log(  "===========================================================================");
  console.log("[1] Perfil do candidato");
  console.log("[2] Lista de vagas");
  console.log("[3] Calcular compatibilidade com cada vaga");
  console.log("[0] Sair");

  opcao = prompt("Escolha uma opção: ");

  switch (opcao) {
    case "1":
      criarPerfilCandidato();
      break;
    case "2":
      listarVagas();
      break;
    case "0":
      console.log("Encerrando o sistema...");
      break;
    default:
      console.log("Opção inválida! Tente novamente.");
  }
} while (opcao !== "0");

function criarPerfilCandidato() {
  console.log("\n--- [RF01] Perfil do Candidato ---");
  const candidato = new Perfil( "Cleverson",
                                "Desenvolvimento de Software / Arquitetura",
                                ["JavaScript", "TypeScript", "Node.js", "Angular", "Java", "Spring Boot", "SQL", "Git", "Docker"],
                                25
                              );
  candidato.apresentar();

}

function listarVagas() {
  const titulo = "\n--- [RF02] Lista de Vagas ---";
  console.log(titulo);

  vagas.forEach((vaga) => {
    console.log(`Cargo: ${vaga.cargo}`);
    console.log(`Empresa: ${vaga.empresa}`);
    console.log(`Habilidades exigidas: ${vaga.habilidadesObrigatorias.join(", ")}`);
    console.log(`Habilidades Desejaveis: ${vaga.habilidadesDesejadas.join(", ")}`);
    console.log("-".repeat(titulo.length));
  });
}
