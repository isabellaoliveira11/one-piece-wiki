const listaPersonagens = document.getElementById('lista-personagens');

// Mapeamento de IDs para as imagens e cargos (trabalho) de cada personagem
const personagensImagensPorId = {
    1: "assets/luffy.png",
    2: "assets/zoro.png",
    3: "assets/nami.png",
    4: "assets/usopp.png",
    5: "assets/sanji.png",
    6: "assets/tony.png",
    7: "assets/nico.png",
    8: "assets/franky.png",
    9: "assets/brook.png",
    10: "assets/jinbe.png",
    11: "assets/zeus.jpg",
    12: "assets/cavendish.png",
    13: "assets/suleiman.png",
    14: "assets/bartolomeu.jpg",
    17: "assets/boo.jpg",
    18: "assets/baby5.jpg",
    19: "assets/ideo.jpg",
    20: "assets/blue.jpg",
    21: "assets/adbdullah.jpg",
    22: "assets/jeet.png",
    23: "assets/leo.png",
    24: "assets/kabu.png",
    25: "assets/bee.png"
};

// Mapeamento dos personagens com seus respectivos cargos (trabalho)
const personagensTrabalho = {
    1: "Capitão Pirata",
    2: "Espadachim",
    3: "Navegadora",
    4: "Atirador",
    5: "Cozinheiro",
    6: "Médico",
    7: "Arqueóloga",
    8: "Cyborg",
    9: "Músico",
    10: "Timoneiro",
    11: "Deus do Trovão",
    12: "Cavaleiro",
    13: "Comandante",
    14: "Pirata",
    17: "Pirata",
    18: "Assassina",
    19: "Pirata",
    20: "Pirata",
    21: "Pirata",
    22: "Pirata",
    23: "Pirata",
    24: "Pirata",
    25: "Pirata"
};

// Função para buscar personagens na API
fetch('https://api.api-onepiece.com/v2/characters/en')
    .then(response => response.json())
    .then(data => {
        if (data && Array.isArray(data)) {
            const personagensLimitados = data.slice(0, 20);

            personagensLimitados.forEach(personagem => {
                const divPersonagem = document.createElement('div');
                divPersonagem.classList.add('div-personagem');
                divPersonagem.dataset.id = personagem.id; // Adiciona o atributo data-id

                const imagem = document.createElement('img');
                imagem.src = personagensImagensPorId[personagem.id] || "https://via.placeholder.com/150";
                imagem.alt = personagem.name;
                divPersonagem.appendChild(imagem);

                const nome = document.createElement('h2');
                nome.textContent = personagem.name;
                divPersonagem.appendChild(nome);

                const trabalho = document.createElement('p');
                trabalho.textContent = `Trabalho: ${personagensTrabalho[personagem.id] || "Desconhecido"}`;
                divPersonagem.appendChild(trabalho);

                const tamanho = document.createElement('p');
                tamanho.textContent = `Tamanho: ${personagem.size || "Desconhecido"}`;
                divPersonagem.appendChild(tamanho);

                // Adicionando o botão "Saiba Mais"
                const botaoSaibaMais = document.createElement('button');
                botaoSaibaMais.textContent = 'Saiba Mais';
                botaoSaibaMais.classList.add('botao-saiba-mais');
                botaoSaibaMais.onclick = function() {
                    redirecionarParaSaibaMais(personagem.id);
                };
                divPersonagem.appendChild(botaoSaibaMais);

                listaPersonagens.appendChild(divPersonagem);
            });
        }
    })
    .catch(error => console.error("Erro ao buscar personagens:", error));

function redirecionarParaSaibaMais(id) {
    window.location.href = `saiba-mais-personagem.html?id=${id}`;
}