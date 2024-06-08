const modals = [
    {
        openButton: document.querySelector("#openModal_1"),
        closeButton: document.querySelector("#closeModal_1"),
        modal: document.querySelector("#modal_1"),
        fade: document.querySelector("#fade_1"),
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