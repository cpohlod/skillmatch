const prompt = require("prompt-sync")();

const Perfil = require("./model/perfil");

const perfils = require("./mock/mock_perfils");

const { analisarTodasAsVagasService, encontrarMelhorVagaService } = require("./service/compatibilidade-service");
const { buscarVagasService } = require("./service/vagas-service");
const { buscarPerfisService } = require("./service/perfil-service");
const { gerarRecomendacaoEstudoService } = require("./service/recomendacao-service");

main();

async function main() {
  try {
    console.log("Iniciando SkillMatch...");
    const vagas = await buscarVagasService(1200);
    console.log(`Sucesso: ${vagas.length} vagas carregadas do servidor.\n`);
    const perfis = await buscarPerfisService(1000);
    console.log(`Sucesso: ${perfils.length} perfils carregados do servidor.\n`);
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
        await criarPerfilCandidato(vagas);
        break;
      case "2":
        listarVagas(vagas);
        break;
      case "3":
        await compatibilidadeVagas(perfis, vagas);
        break;
      case "0":
        console.log("Encerrando o sistema...");
        break;
      default:
        console.log("Opção inválida! Tente novamente.");
      }
    } while (opcao !== "0");
  } catch (erro) {
    console.error("Falha ao carregar dados do sistema:", erro.message);
  }
}

async function criarPerfilCandidato(listaVagas) {
  console.log("\n--- [RF01] Criar Perfil do Candidato ---");
  const perfil = new Perfil( "Cleverson",
                                "Desenvolvimento de Software / Arquitetura",
                                ["JavaScript", "TypeScript", "Node.js", "Angular", "Java", "Spring Boot", "SQL", "Git", "Docker"],
                                25
                              );
  // Processa o perfil sem o callBack
  await processarPerfil(perfil, listaVagas);                            
}

async function exibirCompatibilidades(candidato, listaVagas) {
  console.log("\n--- [RF03] COMPATIBILIDADE COM AS VAGAS ---");
  try {
    const analises = await analisarTodasAsVagasService(candidato, listaVagas);
    
    // RF08: Uso de .forEach()
    analises.forEach((item) => {
      console.log(`\nVaga: ${item.cargo}`);
      console.log(`Compatibilidade: ${item.percentual}% (${item.classificacao})`);
      console.log(`Faltam: ${item.faltantes.length > 0 ? item.faltantes.join(", ") : "Nenhuma!"}`);
    });

    // Identifica e exibe a vaga com maior compatibilidade (RF06)
    const melhorVaga = await encontrarMelhorVagaService(analises);
    if (melhorVaga) {
      console.log("\n[RF06] VAGA COM MAIOR COMPATIBILIDADE");
      if (melhorVaga.percentual === 0) {
        console.log(`Nenhuma vaga compatível no momento (maior score: 0%).`);
      } else {
        console.log(`Vaga indicada: ${melhorVaga.cargo}`);
        console.log(`Percentual: ${melhorVaga.percentual}% (${melhorVaga.classificacao})`);
      }    
    }  
  } catch (erro) {
    console.error(`Erro ao processar compatibilidade para ${candidato.nome}:`, erro.message);
  }    
}  

async function exibirPlanoDeEstudos(candidato, listaVagas) {
  console.log(`\n=== [RF07] PLANO DE ESTUDOS: ${candidato.nome.toUpperCase()} ===`);
  try {
    const recomendacao = await gerarRecomendacaoEstudoService(candidato, listaVagas, 1000);

    if (recomendacao.prioridades.length === 0) {
      console.log(recomendacao.mensagem);
      return;
    }

    recomendacao.prioridades.forEach((item, index) => {
      console.log(`\n${index + 1}. [${item.prioridade.toUpperCase()}] ${item.habilidade}`);
      console.log(`   Impacto: Exigido em ${item.vagasQueExigem} de ${recomendacao.totalVagasAnalisadas} vagas cadastradas`);
      console.log(`   O que estudar: ${item.recursoSugerido}`);
    });
  } catch (erro) {
    console.error(`Erro ao obter recomendações para ${candidato.nome}:`, erro.message);
  }    
}

function listarVagas(listaVagas) {
  const titulo = "\n--- [RF02] Lista de Vagas("+listaVagas.length+") ---";
  console.log(titulo);

  listaVagas.forEach((vaga) => {
    console.log(`Cargo: ${vaga.cargo}`);
    console.log(`Empresa: ${vaga.empresa}`);
    console.log(`Habilidades exigidas: ${vaga.habilidadesObrigatorias.join(", ")}`);
    console.log(`Habilidades Desejaveis: ${vaga.habilidadesDesejadas.join(", ")}`);
    console.log("-".repeat(titulo.length));
  });
}

async function compatibilidadeVagas(listaPerfis, listaVagas) {
  const titulo = `\n--- [RF08] Compatibilidade Canditados(${perfils.length}) X Vagas(${listaVagas.length}) ---`;
  console.log(titulo);
  for (const perfil of listaPerfis) {
    await processarPerfil(perfil, listaVagas, processarPlanoDeEstudos);
  }
}  

async function processarPerfil(perfil, listaVagas, processarPerfilCallback) {                            
  perfil.apresentar();
  await exibirCompatibilidades(perfil, listaVagas);
  if (typeof processarPerfilCallback === "function") {
    await processarPerfilCallback(perfil, listaVagas);
  }
}

async function processarPlanoDeEstudos(perfil, listaVagas) {
  await exibirPlanoDeEstudos(perfil, listaVagas);
}