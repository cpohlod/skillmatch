const { perfisJson } = require("../mock/mock_perfils");
const Perfil = require("../model/perfil");

function buscarPerfisService(delayMs = 1000) {
  return new Promise((resolve, reject) => {
    console.log("Conectando ao servidor para carregar perfis dos candidatos...");

    setTimeout(() => {
      if (!perfisJson || perfisJson.length === 0) {
        return reject(new Error("Nenhum perfil encontrado no servidor."));
      }

      // Converte a lista de JSON puro em instâncias de Perfil
      const listaPerfisInstanciados = perfisJson.map((item) => {
        return new Perfil(
          item.nome,
          item.areaInteresse,
          item.habilidades,
          item.tempoExperiencia,
          item.email
        );
      });

      resolve(listaPerfisInstanciados);
    }, delayMs);
  });
}

module.exports = { buscarPerfisService };