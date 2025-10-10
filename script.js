//scrool suave linksInternos

function initScrollSuave() {
    const linksInternos = document.querySelectorAll('.header-menu a[href^="#"]');

    function scrollToSection(event) {
        event.preventDefault();
        const href = event.currentTarget.getAttribute('href');
        const section = document.querySelector(href);
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
        /*forma alternativa
        const topo = section.offsetTop;
        window.scrollTo({
            top: topo,
            behavior: 'smooth'
        });*/
    }
    linksInternos.forEach((link) => {
        link.addEventListener('click', scrollToSection);
    });
}
initScrollSuave();

//animaçâo ao scroll
function initAnaimaScroll() {
    const sections = document.querySelectorAll('.js-scroll');
    if (sections.length); {
        const windowMetade = window.innerHeight * 0.6;

        function animaScroll() {

            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;
                const isSectionVisible = (sectionTop - windowMetade) < 0;
                if (isSectionVisible)
                    section.classList.add('ative');

            })
        }
        animaScroll();

        window.addEventListener('scroll', animaScroll);
    }
}
initAnaimaScroll();
