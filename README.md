# SkillMatch - Plataforma de Análise de Compatibilidade e Recomendação Técnica

O **SkillMatch** é uma aplicação de linha de comando desenvolvida em Node.js voltada à área de recrutamento e capacitação profissional. A plataforma analisa as habilidades técnicas dos candidatos em relação às vagas de emprego disponíveis no mercado, calcula percentuais de compatibilidade, destaca as lacunas de conhecimento e formula planos individuais de estudo priorizados por demanda real de mercado.

---

## Como Executar a Aplicação (Passo a Passo)

### Pré-requisitos
* Node.js instalado na máquina (versão 14.x ou superior recomendada).
* Terminal / Prompt de Comando (PowerShell, CMD ou Bash).

### Instruções de Instalação e Execução
1. Clone este repositório ou faça o download dos arquivos em seu ambiente local:
   ```bash
   git clone https://github.com/cpohlod/skillmatch
   cd skillmatch

Plaintext
skillmatch/
├── model/
│   ├── pessoa.js
│   └── perfil.js
├── mock/
│   └── mock_estudos.js
│   ├── mock_perfils.js
│   └── mock_vagas.js
├── service/
│   ├── compatibilidade-service.js
│   ├── perfil-service.js
│   ├── vagas-service.js
│   ├── recomendacao-service.js
└── skillmatch.js

2. Execute o ponto de entrada da aplicação:
   ```bash
   node .\skillmatch.js

### Regra de Cálculo de Compatibilidade (RF03)
A compatibilidade é calculada dividindo a quantidade de habilidades que o candidato possui 
(dentre as exigidas pela vaga) pelo total de requisitos daquela vaga, multiplicando o resultado 
por 100:

Compatibilidade (%) = (Habilidades Atendidas / Total de Habilidades da Vaga) * 100

### Critério de Recomendação de Estudos (RF07)
A recomendação de estudos é gerada identificando todas as lacunas técnicas do candidato em relação às vagas cadastradas. O critério de prioridade adotado baseia-se na **taxa de demanda de mercado**:
* **Alta Prioridade:** Tecnologias faltantes presentes em 50% ou mais das vagas disponíveis.
* **Média Prioridade:** Tecnologias presentes em mais de uma vaga, mas abaixo de 50%.
* **Baixa Prioridade:** Tecnologias exigidas de forma pontual (apenas 1 vaga).

### Uso de Callback (RF12)
Foi criada a função de ordem superior `processarPerfil(perfil, listaVagas, processarPerfilCallback)`, permitindo desacoplar a iteração dos candidatos da ação executada sobre cada um (exibição de perfil, análise de vagas e recomendações de estudo).
