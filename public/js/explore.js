


window.addEventListener('scroll', function () {
    const navHeader = document.querySelector(".nav__header");
    if (window.scrollY > 80) {
        navHeader.classList.add("scrolled");
    } else {
        navHeader.classList.remove("scrolled");
    }
});

const modals = [
    {
        openButton: document.querySelector("#openModal"),
        closeButton: document.querySelector("#closeModal"),
        modal: document.querySelector("#modal"),
        fade: document.querySelector("#fade"),
    },
    {
        openButton: document.querySelector("#openModal_2"),
        closeButton: document.querySelector("#closeModal_2"),
        modal: document.querySelector("#modal_2"),
        fade: document.querySelector("#fade_2"),
    },
    {
        openButton: document.querySelector("#openModal_3"),
        closeButton: document.querySelector("#closeModal_3"),
        modal: document.querySelector("#modal_3"),
        fade: document.querySelector("#fade_3"),
    }
];

const toggleModal = (modal, fade) => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"));
};

modals.forEach(({openButton, closeButton, modal, fade}) => {
    if (openButton && closeButton && modal && fade) {
        [openButton, closeButton, fade].forEach((el) => {
            el.addEventListener("click", () => toggleModal(modal, fade));
        });
    } else {
        console.error('Missing elements for modal:', {openButton, closeButton, modal, fade});
    }
});

var express = require("express");



function listarRestaurantes() {
    fetch('/listarRestaurantes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Problemas no listarRestaurantes @explora ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                data.forEach(restaurante => {
                    if (restaurante.idRestaurante === 1) {
                        document.querySelector('#a_restaurante').textContent = restaurante.nome;
                    } else if (restaurante.idRestaurante === 2) {
                        document.querySelector('#b_restaurante').textContent = restaurante.nome;
                    } else if (restaurante.idRestaurante === 3) {
                        document.querySelector('#c_restaurante').textContent = restaurante.nome;
                    }
                });
            }
        })
        .catch(error => console.error('Erro no fetching no nome dos restaurantes:', error));
};

document.addEventListener("DOMContentLoaded", function () {
    listarRestaurantes();
});

function listarDescricoesRestaurantes() {
    fetch('/listarRestaurantes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Problemas no listarDescricoesRestaurantes @explora ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                data.forEach(restaurante => {
                    const aRestauranteTxt = document.querySelector('#a_restaurante_txt');
                    const bRestauranteTxt = document.querySelector('#b_restaurante_txt');
                    const cRestauranteTxt = document.querySelector('#c_restaurante_txt');

                    if (restaurante.idRestaurante === 1 && aRestauranteTxt) {
                        aRestauranteTxt.textContent = restaurante.descricao;
                    } else if (restaurante.idRestaurante === 2 && bRestauranteTxt) {
                        bRestauranteTxt.textContent = restaurante.descricao;
                    } else if (restaurante.idRestaurante === 3 && cRestauranteTxt) {
                        cRestauranteTxt.textContent = restaurante.descricao;
                    }
                });
            }
        })
        .catch(error => console.error('Erro no fetching na descrição dos restaurantes:', error));
};

