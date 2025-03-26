const listaPersonagensRelacionados = document.getElementById('lista-personagens-relacionados');
const paginacao = document.getElementById('paginacao');
const personagensPorPagina = 20;
let paginaAtual = 1;

// Função para buscar e exibir a lista de personagens relacionados
function exibirPersonagens(pagina) {
    fetch('https://api.api-onepiece.com/v2/characters/en')
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data)) {
                const personagensPaginados = data.slice((pagina - 1) * personagensPorPagina, pagina * personagensPorPagina);

                listaPersonagensRelacionados.innerHTML = '';

                personagensPaginados.forEach(personagem => {
                    const divPersonagem = document.createElement('div');
                    divPersonagem.classList.add('div-personagem');
                    divPersonagem.dataset.id = personagem.id;

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

                    const botaoSaibaMais = document.createElement('button');
                    botaoSaibaMais.textContent = 'Saiba Mais';
                    botaoSaibaMais.classList.add('botao-saiba-mais');
                    botaoSaibaMais.addEventListener('click', () => {
                        window.location.href = `saiba-mais-personagem.html?id=${personagem.id}`;
                    });
                    divPersonagem.appendChild(botaoSaibaMais);

                    listaPersonagensRelacionados.appendChild(divPersonagem);
                });

                exibirPaginacao(data.length);
            }
        })
        .catch(error => console.error("Erro ao buscar personagens relacionados:", error));
}

// Função para exibir os botões de paginação
function exibirPaginacao(totalPersonagens) {
    const totalPaginas = Math.ceil(totalPersonagens / personagensPorPagina);

    paginacao.innerHTML = '';

    for (let i = 1; i <= totalPaginas; i++) {
        if (i <= 3 || i >= totalPaginas - 2 || Math.abs(paginaAtual - i) <= 1) {
            const botaoPagina = document.createElement('button');
            botaoPagina.textContent = i;
            botaoPagina.classList.add('botao-pagina');
            if (i === paginaAtual) {
                botaoPagina.classList.add('pagina-atual');
            }
            botaoPagina.addEventListener('click', () => {
                paginaAtual = i;
                exibirPersonagens(paginaAtual);
            });

            paginacao.appendChild(botaoPagina);
        } else if (i === 4 && totalPaginas > 5) {
            const botaoPontos = document.createElement('span');
            botaoPontos.textContent = '...';
            botaoPontos.classList.add('pontos-pagina');
            paginacao.appendChild(botaoPontos);
        }
    }
}

// Exibe a primeira página ao carregar a página
exibirPersonagens(paginaAtual);

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

// Função para obter o ID do personagem da URL
function obterIdPersonagem() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Função para buscar os detalhes do personagem na API
function buscarDetalhesPersonagem(id) {
    fetch(`https://api.api-onepiece.com/v2/characters/en/${id}`)
        .then(response => response.json())
        .then(personagem => {
            document.getElementById('imagem-personagem').src = personagensImagensPorId[personagem.id] || "https://via.placeholder.com/389x461";
            document.getElementById('nome-personagem').textContent = personagem.name;
            document.getElementById('trabalho-personagem').textContent = `Trabalho: ${personagensTrabalho[personagem.id] || "Desconhecido"}`;
            document.getElementById('altura-personagem').textContent = `Altura: ${personagem.size || "Desconhecido"}`;
        })
        .catch(error => console.error("Erro ao buscar detalhes do personagem:", error));
}

// Obtém o ID do personagem e busca seus detalhes
const idPersonagem = obterIdPersonagem();
if (idPersonagem) {
    buscarDetalhesPersonagem(idPersonagem);

    
}


// Theme Dark and Ligth 


const luaButton = document.getElementById('lua-button');
const solButton = document.getElementById('sol-button');
const body = document.body;

luaButton.addEventListener('click', () => {
    body.classList.add('dark-mode');
});

solButton.addEventListener('click', () => {
    body.classList.remove('dark-mode');
});