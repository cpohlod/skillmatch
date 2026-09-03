function calcularPercentualCompatibilidade(habilidadesCandidato, habilidadesVaga) {
  console.log("[DEBUG] Habilidades Candidato:", habilidadesCandidato);
  console.log("[DEBUG] Habilidades Vaga:", habilidadesVaga);
  if (!habilidadesVaga || habilidadesVaga.length === 0) {
    console.log("[DEBUG] Erro na lista de vagas (retornou 100)");
    return 100;
  }

  // RF08: Uso de métodos de array (filter e some)
  const habilidadesAtendidas = habilidadesVaga.filter((habilidadesObrigatorias) =>
    habilidadesCandidato.some(
      (habCand) => habCand.toLowerCase() === habilidadesObrigatorias.toLowerCase()
    )
  );
  
  console.log("[DEBUG] Habilidades Atendidas:", habilidadesAtendidas);
  console.log(`[DEBUG] Match: ${habilidadesAtendidas.length} de ${habilidadesVaga.length}`);
  const percentual = (habilidadesAtendidas.length / habilidadesVaga.length) * 100;
  return Math.round(percentual);
}

function classificarCompatibilidade(percentual) {
  if (percentual >= 70) return "Alta compatibilidade";
  if (percentual >= 40) return "Média compatibilidade";
  return "Baixa compatibilidade";
}

function obterHabilidadesFaltantes(habilidadesCandidato, habilidadesVaga) {
  return habilidadesVaga.filter(
    (habVaga) =>
      !habilidadesCandidato.some(
        (habCand) => habCand.trim().toLowerCase() === habVaga.trim().toLowerCase()
      )
  );
}

function analisarCompatibilidadeVaga(candidato, vaga) {
  const percentual = calcularPercentualCompatibilidade(
    candidato.habilidades,
    vaga.habilidadesObrigatorias
  );
  const classificacao = classificarCompatibilidade(percentual);
  
  const faltantes = obterHabilidadesFaltantes(
    candidato.habilidades,
    vaga.habilidadesObrigatorias
  );  
  
  return {
    vagaId: vaga.id,
    cargo: vaga.cargo,
    percentual,
    classificacao,
    faltantes
  };
}

/**
 * RF06 – Encontrar a vaga com maior compatibilidade
 * RF08 – Uso de métodos de array (.reduce), 
 * utilizado para encontrar o melhor e um unico resultado, sem modificar os dados.
 * @param {Array} analises Lista gerada por analisarTodasAsVagas
 * @returns {Object|null} A vaga com maior percentual
 */
function encontrarMelhorVaga(analises) {
  if (!analises || analises.length === 0) return null;

  return analises.reduce((melhor, atual) => {
    return atual.percentual > melhor.percentual ? atual : melhor;
  });
}

function analisarTodasAsVagas(candidato, vagas) {
  // RF08: Uso de .map()
  return vagas.map((vaga) => analisarCompatibilidadeVaga(candidato, vaga));
}

module.exports = {
  calcularPercentualCompatibilidade,
  classificarCompatibilidade,
  analisarCompatibilidadeVaga,
  encontrarMelhorVaga,
  analisarTodasAsVagas
};