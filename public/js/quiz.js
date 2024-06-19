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
        
        fetch('/cadastrarRespostas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, answers })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Respostas enviadas com sucesso!");
                fetchForumPosts();
            } else {
                alert("Ocorreu um erro ao enviar as respostas.");
            }
        });
    });
});

function fetchQuestions() {
    fetch('/perguntas')
        .then(response => response.json())
        .then(data => {
            const questionsContainer = document.getElementById("questionsContainer");
            data.forEach(question => {
                const questionElement = document.createElement("div");
                questionElement.innerHTML = `<p>${question.pergunta}</p>`;
                
                question.alternativas.forEach(alternativa => {
                    const label = document.createElement("label");
                    label.innerHTML = `
                        <input type="radio" name="${question.id}" value="${alternativa.id}">
                        ${alternativa.resposta}
                    `;
                    questionElement.appendChild(label);
                });
                
                questionsContainer.appendChild(questionElement);
            });
        });
}

function fetchForumPosts() {
    fetch('/pegarRespostas')
        .then(response => response.json())
        .then(data => {
            const forumPosts = document.getElementById("forumPosts");
            forumPosts.innerHTML = '';
            data.forEach(post => {
                const postElement = document.createElement("div");
                postElement.innerHTML = `
                    <h3>Nome: ${post.username}</h3>
                    <p>Resposta 1: ${post.respostas[0]}</p>
                    <p>Resposta 2: ${post.respostas[1]}</p>
                    <p>Resposta 3: ${post.respostas[2]}</p>
                    <p>Resposta 4: ${post.respostas[3]}</p>
                    <p>Resposta 5: ${post.respostas[4]}</p>
                `;
                forumPosts.appendChild(postElement);
            });
        });
}

fetchForumPosts();
