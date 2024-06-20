document.addEventListener("DOMContentLoaded", () => {
    fetchQuestions();

    document.getElementById("quizForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;

        if (!username) {
            alert("Por favor, insira seu nome.");
            return;
        }

        const answers = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(input => ({
            questionId: input.name,
            answerId: input.value
        }));

        console.log("Dados para envio:", { username, answers });

        fetch('/cadastrarRespostas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, answers })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta do servidor:", data);
            if (data.success) {
                alert("Respostas enviadas com sucesso!");
                fetchForumPosts();
                recomendarRestaurante(answers);
            } else {
                alert("Ocorreu um erro ao enviar as respostas.");
            }
        });
    });
});

// Recomenda um restaurante com base nas respostas e nos pesos atribuídos a cada resposta.

function recomendarRestaurante(answers) {
    const pesos = {
        1: { 1: 1, 2: 2, 3: 3 },
        2: { 4: 2, 5: 2, 6: 1 },
        3: { 7: 1, 8: 2, 9: 3 },
        4: { 10: 2, 11: 2, 12: 2, 13: 1 },
        5: { 14: 0, 15: 0, 16: 0, 17: 0 }
    };

    let totalPoints = 0;

    answers.forEach(answer => {
        const questionId = parseInt(answer.questionId, 10);
        const answerId = parseInt(answer.answerId, 10);
        if (pesos[questionId] && pesos[questionId][answerId] !== undefined) {
            totalPoints += pesos[questionId][answerId];
        }
    });

    let recommendation;
    if (totalPoints < 5) {
        recommendation = "Pollo Loko";
    } else if (totalPoints >= 5 && totalPoints <= 8) {
        recommendation = "Seoul Chicken";
    } else {
        recommendation = "Waker Chicken";
    }

    alert(`A recomendação para você é: ${recommendation}`);
}

// Busca as perguntas do servidor e as exibe no formulário.
 
function fetchQuestions() {
    fetch('/perguntas')
        .then(response => response.json())
        .then(data => {
            console.log("Perguntas obtidas:", data);
            const questionsContainer = document.getElementById("questionsContainer");
            questionsContainer.innerHTML = '';

            const questionsMap = {};

            data.forEach(item => {
                if (!questionsMap[item.id]) {
                    questionsMap[item.id] = {
                        pergunta: item.pergunta,
                        alternativas: []
                    };
                }
                questionsMap[item.id].alternativas.push({
                    id: item.alternativaId,
                    resposta: item.resposta
                });
            });

            Object.keys(questionsMap).forEach(questionId => {
                const question = questionsMap[questionId];
                const questionElement = document.createElement("div");
                questionElement.innerHTML = `<p>${question.pergunta}</p>`;

                question.alternativas.forEach(alternativa => {
                    const label = document.createElement("label");
                    label.innerHTML = `
                        <input type="radio" name="${questionId}" value="${alternativa.id}">
                        ${alternativa.resposta}
                    `;
                    questionElement.appendChild(label);
                });

                questionsContainer.appendChild(questionElement);
            });
        });
}

// Busca as respostas dos usuários do servidor e as exibe no fórum.

function fetchForumPosts() {
    fetch('/pegarRespostas')
        .then(response => response.json())
        .then(data => {
            console.log("Respostas obtidas:", data);
            const forumPosts = document.getElementById("forumPosts");
            forumPosts.innerHTML = '';
            data.forEach(post => {
                const postElement = document.createElement("div");
                const respostas = post.respostas.split(",");
                postElement.innerHTML = `
                    <h3>Nome: ${post.nome}</h3>
                    <p>Resposta 1: ${respostas[0]}</p>
                    <p>Resposta 2: ${respostas[1]}</p>
                    <p>Resposta 3: ${respostas[2]}</p>
                    <p>Resposta 4: ${respostas[3]}</p>
                    <p>Resposta 5: ${respostas[4]}</p>
                `;
                forumPosts.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar as respostas:', error);
        });
}

fetchForumPosts();
