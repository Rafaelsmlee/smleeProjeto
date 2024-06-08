document.addEventListener("DOMContentLoaded", function () {
    atualizarFeed();
});

function limparFormulario() {
    document.getElementById("form_postagem").reset();
}

function cadastrarResposta() {
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const dadosForm = {
        fkUsuario: sessionStorage.getItem("ID_USUARIO"),
        titulo,
        descricao
    };

    fetch("/form/cadastrarResposta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosForm)
    })
        .then(resposta => {
            if (resposta.ok) {
                window.alert("Resposta cadastrada com sucesso!");
                limparFormulario();
                atualizarFeed();
            } else {
                throw ("Houve um erro ao tentar cadastrar a resposta! Código da resposta: " + resposta.status);
            }
        })
        .catch(erro => {
            console.error(`Erro ao cadastrar resposta: ${erro}`);
        });

    return false;
}

function atualizarFeed() {
    fetch("/form/listarRespostas")
        .then(resposta => {
            if (resposta.ok) {
                if (resposta.status === 204) {
                    const feed = document.getElementById("feed_container");
                    const mensagem = document.createElement("span");
                    mensagem.innerHTML = "Nenhum resultado encontrado.";
                    feed.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                return resposta.json();
            } else {
                throw ('Houve um erro na API!');
            }
        })
        .then(respostas => {
            const feed = document.getElementById("feed_container");
            feed.innerHTML = "";

            const elementosFeed = [];

            for (let resposta of respostas) {
                const divResposta = document.createElement("div");
                const spanUsuario = document.createElement("span");
                const spanPergunta = document.createElement("span");
                const spanResposta = document.createElement("span");

                spanUsuario.innerHTML = "Usuário: <b>" + resposta.nomeUsuario + "</b>";
                spanPergunta.innerHTML = "Pergunta: <b>" + resposta.tituloPergunta + "</b>";
                spanResposta.innerHTML = "Resposta: <b>" + resposta.resposta + "</b>";

                divResposta.className = "resposta";

                divResposta.appendChild(spanUsuario);
                divResposta.appendChild(spanPergunta);
                divResposta.appendChild(spanResposta);

                elementosFeed.push(divResposta);
            }

            elementosFeed.forEach(elemento => {
                feed.appendChild(elemento);
            });
        })
        .catch(erro => {
            console.error(`Erro ao atualizar feed: ${erro}`);
        });
}
