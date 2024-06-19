function listarEndereco() {
    fetch('/listarEndereco') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Problemas no listarEndereco @explore: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                data.forEach(restaurante => {
                    const nome = restaurante.nome;
                    const whatsapp = restaurante.WhatsApp;
                    const enderecoCompleto = restaurante.endereco_completo;
                    const idRestaurante = restaurante.idRestaurante;
                    const primeiroDia = capitalizeFirstLetter(restaurante.primeiro_dia);
                    const ultimoDia = capitalizeFirstLetter(restaurante.ultimo_dia);
                    const horarioAbertura = restaurante.horario_abertura;
                    const horarioFechamento = restaurante.horario_fechamento;

                    const horarios = `Horários: ${primeiroDia} à ${ultimoDia} ${horarioAbertura} - ${horarioFechamento}`;

                    if (idRestaurante === 1) {
                        const aNome = document.querySelector('#a_nome');
                        const aEndereco = document.querySelector('#a_endereco');
                        const aHorario = document.querySelector('#a_horario');
                        const aWhatsapp = document.querySelector('#a_whatsapp');
                        if (aNome) {
                            aNome.textContent = nome;
                        }
                        if (aEndereco) {
                            aEndereco.textContent = enderecoCompleto;
                        }
                        if (aHorario) {
                            aHorario.textContent = horarios;
                        }
                        if (aWhatsapp) {
                            aWhatsapp.textContent = whatsapp;
                            aWhatsapp.href = `https://wa.me/${whatsapp}`;
                        }
                    } else if (idRestaurante === 2) {
                        const bNome = document.querySelector('#b_nome');
                        const bEndereco = document.querySelector('#b_endereco');
                        const bHorario = document.querySelector('#b_horario');
                        const bWhatsapp = document.querySelector('#b_whatsapp');
                        if (bNome) {
                            bNome.textContent = nome;
                        }
                        if (bEndereco) {
                            bEndereco.textContent = enderecoCompleto;
                        }
                        if (bHorario) {
                            bHorario.textContent = horarios;
                        }
                        if (bWhatsapp) {
                            bWhatsapp.textContent = whatsapp;
                            bWhatsapp.href = `https://wa.me/${whatsapp}`;
                        }
                    } else if (idRestaurante === 3) {
                        const cNome = document.querySelector('#c_nome');
                        const cEndereco = document.querySelector('#c_endereco');
                        const cHorario = document.querySelector('#c_horario');
                        const cWhatsapp = document.querySelector('#c_whatsapp');
                        if (cNome) {
                            cNome.textContent = nome;
                        }
                        if (cEndereco) {
                            cEndereco.textContent = enderecoCompleto;
                        }
                        if (cHorario) {
                            cHorario.textContent = horarios;
                        }
                        if (cWhatsapp) {
                            cWhatsapp.textContent = whatsapp;
                            cWhatsapp.href = `https://wa.me/${whatsapp}`;
                        }
                    }
                });
            }
        })
        .catch(error => console.error('Erro ao buscar os endereços dos restaurantes:', error));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
