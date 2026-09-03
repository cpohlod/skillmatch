const prompt = require("prompt-sync")();

const Perfil = require("./model/perfil");
const vagas = require("./mock/mock_vagas");
const perfils = require("./mock/mock_perfils");

const { analisarTodasAsVagas, encontrarMelhorVaga } = require("./service/compatibilidade");

let opcao;

do {
  console.log("\n===========================================================================");
  console.log(  "  SkillMatch JS: Simulador de Compatibilidade com Vaga Front-End Júnior    ");
  console.log(  "===========================================================================");
  console.log("[1] Perfil do candidato");
  console.log("[2] Lista de vagas");
  console.log("[3] Calcular compatibilidade canditatos X Vaga");
  console.log("[0] Sair");

  opcao = prompt("Escolha uma opção: ");

  switch (opcao) {
    case "1":
      criarPerfilCandidato();
      break;
    case "2":
      listarVagas();
      break;
    case "3":
      compatibilidadeVagas();
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
                                25,
                                "email@gmail.com"
                              );
  candidato.apresentar();
  exibirCompatibilidades(candidato, vagas);

}

function exibirCompatibilidades(candidato, vagas) {
  console.log("\n--- [RF03] COMPATIBILIDADE COM AS VAGAS ---");

  const analises = analisarTodasAsVagas(candidato, vagas);
  
  // RF08: Uso de .forEach()
  analises.forEach((item) => {
    console.log(`\nVaga: ${item.cargo}`);
    console.log(`Compatibilidade: ${item.percentual}% (${item.classificacao})`);
  });

  // Identifica e exibe a vaga com maior compatibilidade (RF06)
  const melhorVaga = encontrarMelhorVaga(analises);
  if (melhorVaga) {
    console.log("\n[RF06] VAGA COM MAIOR COMPATIBILIDADE");
    if (melhorVaga.percentual === 0) {
      console.log(`Nenhuma vaga compatível no momento (maior score: 0%).`);
    } else {
      console.log(`Vaga indicada: ${melhorVaga.cargo}`);
      console.log(`Percentual: ${melhorVaga.percentual}% (${melhorVaga.classificacao})`);
    }
  }  
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

function compatibilidadeVagas() {
  const titulo = `\n--- [RF08] Compatibilidade Canditados(${perfils.length}) X Vagas(${vagas.length}) ---`;
  console.log(titulo);
  perfils.forEach((perfil) => {
    perfil.apresentar();
    exibirCompatibilidades(perfil, vagas);
  });
}  
