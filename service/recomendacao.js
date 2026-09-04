const trilhasEstudo = require("../mock/mock_estudos");

function obterTodasHabilidadesFaltantes(candidato, vagas) {
  const faltantes = [];

  for (const vaga of vagas) {
    for (const habObrigatoria of vaga.habilidadesObrigatorias) {
      // Verifica se o candidato possui a habilidade da vaga
      const possuiHabilidade = candidato.habilidades.some(
        (habCand) => habCand.trim().toLowerCase() === habObrigatoria.trim().toLowerCase()
      );

      // Se não possui, adiciona na lista geral de faltantes
      if (!possuiHabilidade) {
        faltantes.push(habObrigatoria);
      }
    }
  }

  return faltantes;
}

function contarFrequenciaFaltantes(listaFaltantes) {
  const frequencia = {};

  for (const habilidade of listaFaltantes) {
    if (frequencia[habilidade]) {
      frequencia[habilidade] += 1;
    } else {
      frequencia[habilidade] = 1;
    }
  }

  return frequencia;
}

function calcularNivelPrioridade(ocorrencias, totalVagas) {
  const percentualDemanda = (ocorrencias / totalVagas) * 100;

  if (percentualDemanda >= 50) {
    return "Alta";
  } else if (ocorrencias > 1) {
    return "Média";
  } else {
    return "Baixa";
  }
}

function montarListaPrioridades(frequencia, totalVagas) {
  const prioridades = [];

  for (const habilidade in frequencia) {
    const ocorrencias = frequencia[habilidade];
    const nivel = calcularNivelPrioridade(ocorrencias, totalVagas);
    const trilha = trilhasEstudo[habilidade] || `Estudos sobre ${habilidade}`;

    prioridades.push({
      habilidade: habilidade,
      vagasQueExigem: ocorrencias,
      prioridade: nivel,
      recursoSugerido: trilha
    });
  }
  // Ordena do que mais cai nas vagas para o que menos cai
  prioridades.sort((a, b) => b.vagasQueExigem - a.vagasQueExigem);

  return prioridades;
}

function gerarRecomendacaoEstudo(candidato, vagas) {
  const todasFaltantes = obterTodasHabilidadesFaltantes(candidato, vagas);

  if (todasFaltantes.length === 0) {
    return {
      status: "Pronto para o mercado",
      mensagem: "Você já domina todas as habilidades exigidas pelas vagas!",
      prioridades: []
    };
  }

  const frequencia = contarFrequenciaFaltantes(todasFaltantes);
  const prioridades = montarListaPrioridades(frequencia, vagas.length);

  return {
    status: "Plano de Estudo",
    totalVagasAnalisadas: vagas.length,
    prioridades: prioridades
  };
}

module.exports = {
  gerarRecomendacaoEstudo
};