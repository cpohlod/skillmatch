

function calcularPercentualCompatibilidade(habilidadesCandidato, habilidadesVaga) {
  if (!habilidadesVaga || habilidadesVaga.length === 0) {
    return 100;
  }

  // RF08: Uso de métodos de array (filter e some)
  const habilidadesAtendidas = habilidadesVaga.filter((habilidade) =>
    habilidadesCandidato.some(
      (habCand) => habCand.toLowerCase() === habilidade.toLowerCase()
    )
  );

  const percentual = (habilidadesAtendidas.length / habilidadesVaga.length) * 100;
  return Math.round(percentual);
}

function analisarCompatibilidadeVaga(candidato, vaga) {
  const percentual = calcularPercentualCompatibilidade(
    candidato.habilidades,
    vaga.habilidades
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