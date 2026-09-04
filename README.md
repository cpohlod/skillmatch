# SkillMatch - Plataforma de Análise de Compatibilidade e Recomendação Técnica

O **SkillMatch** é uma aplicação de linha de comando desenvolvida em Node.js voltada à área de recrutamento e capacitação profissional. A plataforma analisa as habilidades técnicas dos candidatos em relação às vagas de emprego disponíveis no mercado, calcula percentuais de compatibilidade, destaca as lacunas de conhecimento e formula planos individuais de estudo priorizados por demanda real de mercado.
---

## Como Executar a Aplicação (Passo a Passo)

### Pré-requisitos
* Node.js instalado na máquina (versão 14.x ou superior recomendada).
* Pacote instalado: `prompt-sync`.
* Terminal / Prompt de Comando (PowerShell, CMD ou Bash).

### Instruções de Instalação e Execução
1. Clone este repositório ou faça o download dos arquivos em seu ambiente local:
   ```bash
   git clone [https://github.com/cpohlod/skillmatch](https://github.com/cpohlod/skillmatch)
   cd skillmatch

2. Instale a dependência de captura de entradas via terminal:
   ```bash
   npm install prompt-sync

3. Execute o ponto de entrada da aplicação:
   ```bash
   node .\skillmatch.js

```text
skillmatch/
├── model/
│   ├── pessoa.js
│   └── perfil.js
├── mock/
│   ├── mock_estudos.js
│   ├── mock_perfils.js
│   └── mock_vagas.js
├── service/
│   ├── compatibilidade-service.js
│   ├── perfil-service.js
│   ├── vagas-service.js
│   └── recomendacao-service.js
└── skillmatch.js
```

### Regra de Cálculo de Compatibilidade (RF03)
A compatibilidade é calculada dividindo a quantidade de habilidades que o candidato possui 
(dentre as exigidas pela vaga) pelo total de requisitos daquela vaga, multiplicando o resultado 
por 100:

Compatibilidade (%) = (Habilidades Atendidas / Total de Habilidades da Vaga) * 100
* **Alta Compatibilidade:**  70% ou mais
* **Média Compatibilidade:**  Entre 40% e 69%
* **Baixa Compatibilidade:**  Menor que 40%

Justificativa da Regra: Em triagens de processos seletivos, os requisitos obrigatórios definem a linha de corte preliminar. A métrica percentual direta fornece uma leitura clara e objetiva para tomada de decisão imediata, enquanto competências complementares atuam como diferenciais de desempate.

### Critério de Recomendação de Estudos (RF07)
A recomendação de estudos é gerada identificando todas as lacunas técnicas do candidato em relação às vagas cadastradas. O critério de prioridade adotado baseia-se na **taxa de demanda de mercado**:
* **Alta Prioridade:** Tecnologias faltantes presentes em 50% ou mais das vagas disponíveis.
* **Média Prioridade:** Tecnologias presentes em mais de uma vaga, mas abaixo de 50%.
* **Baixa Prioridade:** Tecnologias exigidas de forma pontual (apenas 1 vaga).

Justificativa do Critério: Priorizar os estudos pelas tecnologias com maior recorrência no conjunto de vagas cadastradas potencializa a taxa de conversão do candidato, capacitando-o simultaneamente para um maior número de oportunidades ativas.

### Uso de Callback (RF12)
Foi criada a função de ordem superior `processarPerfil(perfil, listaVagas, processarPerfilCallback)`, permitindo desacoplar a iteração dos candidatos da ação executada sobre cada um (exibição de perfil, análise de vagas e recomendações de estudo).

### Conceitos do Módulo 01 Aplicados no Projeto

## Programação Orientada a Objetos (RF09, RF10, RF11):
* **Classes e Herança:** Criação da classe base Pessoa (model/pessoa.js) e extensão através de herança na classe Perfil (model/perfil.js) com a sintaxe extends.  
* **Uso do super:** Repasse dos parâmetros comuns (nome, email) para o construtor da classe pai usando super().
* **Métodos de Instância:** Implementação do método perfil.apresentar() para encapsular a exibição das credenciais do candidato

## Manipulação Funcional de Arrays (RF08):
* **.filter() e .some():** Comparação entre as listas de habilidades para identificar requisitos correspondentes e competências faltantes.
* **.map():** Utilizado em perfil-service.js para iterar sobre a lista bruta em JSON e instanciar dinamicamente os objetos da classe Perfil.
* **.reduce():** Empregado no serviço de compatibilidade para comparar os percentuais e determinar qual vaga possui a maior compatibilidade.  
* **.forEach():** Utilizado no skillmatch.js para renderizar as análises formatadas de vagas e o plano de estudos no console.  
* **for...of:** Utilizado na função compatibilidadeVagas para iterar os perfis respeitando o fluxo assíncrono sequencial com await.

## Funções de Ordem Superior e Callbacks (RF12):
Implementação da função processarPerfil(perfil, listaVagas, processarPerfilCallback) em skillmatch.js. 
Essa abordagem permite reutilizar a rotina de apresentação e análise em diferentes contextos: no cadastro avulso ela é chamada sem callback (não imprime plano), enquanto na análise em lote (opção 3) recebe processarPlanoDeEstudos como callback para anexar a trilha de capacitação.

## Programação Assíncrona com Promises e Async/Await (RF14):
* **Criação de Promises:** As funções buscarVagasService, buscarPerfisService, analisarTodasAsVagasService e gerarRecomendacaoEstudoService retornam Promises que utilizam setTimeout para simular latência de I/O de rede.  
* **Consumo com async/await e try/catch:** Em skillmatch.js, a inicialização do sistema e o fluxo das opções aguardam a resolução das Promises de forma sequencial e não-bloqueante, protegidas por blocos try/catch para tratamento de eventuais falhas.

### Arquitetura Cliente-Servidor no Projeto
A arquitetura cliente-servidor divide a aplicação entre quem solicita/consome recursos (Cliente) e quem armazena dados e processa regras de negócio (Servidor).
* **Cliente:** Responsável pela interação direta com o usuário, captura de dados do terminal (prompt-sync) e formatação visual dos resultados.  
* **Servidor:** Responsável pelo gerenciamento de dados brutos e cálculos de negócio.

### Como Ela Aparece no Projeto:
Apesar de rodar em um único processo local no Node.js, o sistema implementa essa separação arquitetural:
* **Camada de Banco de Dados / Persistência:** A pasta mock/ armazena os dados brutos de candidatos e oportunidades de mercado.
* **Camada de Servidor (Back-end / Services):** Os módulos dentro de service/ funcionam como endpoints remotos, encapsulando cálculos de compatibilidade, planos de recomendação e fornecimento de dados através de Promises com latência de resposta (setTimeout).  
* **Camada de Cliente (Interface / CLI):** O arquivo skillmatch.js opera como consumidor desses serviços. Ele não calcula fórmulas diretamente em seu fluxo principal: ele envia os parâmetros, espera as respostas assíncronas via await e monta as saídas do menu interativo.
* **Isolamento de Regras de Negócio no Serviço:** O cálculo de compatibilidade e a identificação da melhor vaga foram alocados propositalmente na camada service/ (compatibilidade-service.js). Essa abordagem segue os princípios de arquitetura de software, onde a lógica de domínio e as regras de negócio pertencem exclusivamente ao Backend/Servidor. O cliente (skillmatch.js) atua como consumidor (Frontend/CLI), encarregando-se apenas da captura de dados e da renderização visual no terminal.
