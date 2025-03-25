const listaPersonagens = document.getElementById('lista-personagens');

// Função para buscar personagens na API
fetch('https://api.api-onepiece.com/v2/characters/en')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if (data && Array.isArray(data)) {
            // Limita a exibição a apenas 20 personagens
            const personagensLimitados = data.slice(0, 20);

            personagensLimitados.forEach(personagem => {
                const divPersonagem = document.createElement('div');
                divPersonagem.classList.add('div-personagem');

                const favoriteIcon = document.createElement('span');
                favoriteIcon.classList.add('favorite-icon');
                favoriteIcon.innerHTML = '&#9829;';
                divPersonagem.appendChild(favoriteIcon);

                const nome = document.createElement('h2');
                nome.textContent = personagem.name;
                divPersonagem.appendChild(nome);

                const descricao = document.createElement('p');
                descricao.textContent = personagem.about || "Descrição não disponível";
                divPersonagem.appendChild(descricao);

                const imagem = document.createElement('img');
                imagem.src = personagem.image || "https://via.placeholder.com/204x150";  // Placeholder caso não tenha imagem
                imagem.alt = personagem.name;
                divPersonagem.appendChild(imagem);

                listaPersonagens.appendChild(divPersonagem);
            });
        } else {
            console.error("Dados da API de personagens inválidos:", data);
        }
    })
    .catch(error => console.error("Erro ao buscar personagens:", error));
