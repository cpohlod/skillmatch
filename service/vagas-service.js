const vagas = require("../mock/mock_vagas");

function buscarVagasService(delayMs = 2000) {
  return new Promise((resolve, reject) => {
    console.log("Conectando ao servidor para buscar vagas...");

    setTimeout(() => {
      if (!vagas || vagas.length === 0) {
        reject(new Error("Nenhuma vaga encontrada no servidor."));
      } else {
        // Resolve a Promise entregando os dados
        resolve(vagas);
      }
    }, delayMs);
  });
}

module.exports = { buscarVagasService };