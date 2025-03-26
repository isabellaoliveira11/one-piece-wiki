const listaLocalizacoes = document.getElementById('lista-localizacoes');

// Função para buscar localizações na API
fetch('https://api.api-onepiece.com/v2/locates/en')
    .then(response => response.json())
    .then(data => {
        if (data && Array.isArray(data)) {
            // Limita os resultados para os primeiros 7 itens
            const localizacoesLimitadas = data.slice(0, 7);

            localizacoesLimitadas.forEach(localizacao => {
                const divLocalizacao = document.createElement('div');
                divLocalizacao.classList.add('div-localizacao');

                // Nome da localização
                const nome = document.createElement('h3');
                nome.textContent = localizacao.name;
                divLocalizacao.appendChild(nome);

                // Descrição da localização
                const descricao = document.createElement('p');
                descricao.textContent = localizacao.description;
                divLocalizacao.appendChild(descricao);

                // Adiciona o nome do mar se estiver disponível
                if (localizacao.sea_name) {
                    const mar = document.createElement('p');
                    mar.textContent = `Mar: ${localizacao.sea_name}`;
                    divLocalizacao.appendChild(mar);
                }

                // Adiciona o botão "Saiba Mais"
                const botaoSaibaMais = document.createElement('button');
                botaoSaibaMais.textContent = 'Saiba Mais';
                botaoSaibaMais.classList.add('botao-saiba-mais-localizacao');
                divLocalizacao.appendChild(botaoSaibaMais);

                listaLocalizacoes.appendChild(divLocalizacao);
            });
        }
    })
    .catch(error => console.error("Erro ao buscar localizações:", error));