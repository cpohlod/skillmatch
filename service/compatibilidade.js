

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

function analisarCompatibilidadeVaga(candidato, vaga) {
  const percentual = calcularPercentualCompatibilidade(
    candidato.habilidades,
    vaga.habilidadesObrigatorias
  );

  return {
    vagaId: vaga.id,
    cargo: vaga.cargo,
    percentual
  };
}

function analisarTodasAsVagas(candidato, vagas) {
  // RF08: Uso de .map()
  return vagas.map((vaga) => analisarCompatibilidadeVaga(candidato, vaga));
}

module.exports = {
  calcularPercentualCompatibilidade,
  analisarCompatibilidadeVaga,
  analisarTodasAsVagas
};