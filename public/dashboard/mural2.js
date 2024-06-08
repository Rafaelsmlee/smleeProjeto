document.addEventListener("DOMContentLoaded", function () {
    // Atualizar o feed quando o documento for carregado
    atualizarFeed();
});

function limparFormulario() {
    // Resetar o formulário de postagem
    document.getElementById("form_postagem").reset();
}

function cadastrarResposta() {
    // Lógica para cadastrar uma resposta
    var dadosForm = {
        fkUsuario: sessionStorage.getItem("ID_USUARIO"),
        fkQuestions: document.getElementById("fkQuestions").value,
        fkAnswers: document.getElementById("fkAnswers").value
    };

    fetch("/form/cadastrarResposta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosForm)
    })
        .then(function (resposta) {
            if (resposta.ok) {
                window.alert("Resposta cadastrada com sucesso!");
                limparFormulario();
                atualizarFeed();
            } else {
                throw ("Houve um erro ao tentar cadastrar a resposta! Código da resposta: " + resposta.status);
            }
        })
        .catch(function (erro) {
            console.error(`Erro ao cadastrar resposta: ${erro}`);
        });

    return false;
}

function atualizarFeed() {

    fetch("/form/listarRespostas")
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var feed = document.getElementById("feed_container");
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Nenhum resultado encontrado.";
                    feed.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json()
                    .then(function (respostas) {
                        var feed = document.getElementById("feed_container");
                        feed.innerHTML = "";

                        // Array para armazenar os elementos do feed
                        var elementosFeed = [];

                        respostas.forEach(function (resposta) {
                            var divResposta = document.createElement("div");
                            var spanUsuario = document.createElement("span");
                            var spanPergunta = document.createElement("span");
                            var spanResposta = document.createElement("span");

                            spanUsuario.innerHTML = "Usuário: <b>" + resposta.nomeUsuario + "</b>";
                            spanPergunta.innerHTML = "Pergunta: <b>" + resposta.tituloPergunta + "</b>";
                            spanResposta.innerHTML = "Resposta: <b>" + resposta.resposta + "</b>";

                            divResposta.className = "resposta";

                            divResposta.appendChild(spanUsuario);
                            divResposta.appendChild(spanPergunta);
                            divResposta.appendChild(spanResposta);

                            // Adicionando o elemento ao array
                            elementosFeed.push(divResposta);
                        });

                        // Adicionando todos os elementos ao feed de uma vez
                        elementosFeed.forEach(function (elemento) {
                            feed.appendChild(elemento);
                        });
                    });
            } else {
                throw ('Houve um erro na API!');
            }
        })
        .catch(function (erro) {
            console.error(`Erro ao atualizar feed: ${erro}`);
        });
}
