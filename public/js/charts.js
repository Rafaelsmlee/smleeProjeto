document.addEventListener("DOMContentLoaded", function() {
    let charts = [];


    function fetchDataAndUpdateCharts() {
        fetch('/pegarRespostas')
            .then(response => response.json())
            .then(data => {
                console.log("fetch no update de charts está quebrado! ", data); // Debug

                const respostas = {};

                data.forEach(post => {
                    const userRespostas = post.respostas.split(",");
                    userRespostas.forEach((resposta, index) => {
                        if (!respostas[index]) {
                            respostas[index] = {};
                        }
                        if (!respostas[index][resposta]) {
                            respostas[index][resposta] = 0;
                        }
                        respostas[index][resposta]++;
                    });
                });


                const backgroundColors = [
                    getComputedStyle(document.documentElement).getPropertyValue('--color1').trim(),
                    getComputedStyle(document.documentElement).getPropertyValue('--color2').trim(),
                    getComputedStyle(document.documentElement).getPropertyValue('--color3').trim(),
                    getComputedStyle(document.documentElement).getPropertyValue('--color4').trim(),
                    getComputedStyle(document.documentElement).getPropertyValue('--color5').trim()
                ];

                Object.keys(respostas).forEach((questionIndex) => {
                    const labels = [];
                    const dataValues = [];

                    Object.keys(respostas[questionIndex]).forEach((resposta) => {
                        labels.push(resposta);
                        dataValues.push(respostas[questionIndex][resposta]);
                    });

                    const ctx = document.getElementById(`chart${parseInt(questionIndex) + 1}`);
                    if (ctx) {
                        if (!charts[questionIndex]) {
                            charts[questionIndex] = new Chart(ctx, {
                                type: 'pie',
                                data: {
                                    labels: labels,
                                    datasets: [{
                                        data: dataValues,
                                        backgroundColor: backgroundColors,
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: function(context) {
                                                    return `${context.label}: ${context.raw}`;
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        } else {
                            charts[questionIndex].data.labels = labels;
                            charts[questionIndex].data.datasets[0].data = dataValues;
                            charts[questionIndex].update();
                        }
                    } else {
                        console.error(`Elemento de canvas com ID chart${parseInt(questionIndex) + 1} não encontrado.`);
                    }
                });
            })
            .catch(error => console.error('Erro ao buscar os dados:', error));
    }

    fetchDataAndUpdateCharts();
    setInterval(fetchDataAndUpdateCharts, 5000); // Atualiza a cada 5 segundos
});
