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

function initTecnologiasCarousel() {
    const track = document.querySelector('.tecnologias-track');
    if (!track) return;

    const slideGap = 16;
    const slideWidth = track.querySelector('.tecnologia-item')?.offsetWidth || 120;
    const intervalTime = 2500;
    let autoScroll;

    const startAutoScroll = () => {
        clearInterval(autoScroll);
        autoScroll = setInterval(() => {
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: slideWidth + slideGap, behavior: 'smooth' });
            }
        }, intervalTime);
    };

    startAutoScroll();
    track.addEventListener('mouseover', () => clearInterval(autoScroll));
    track.addEventListener('mouseout', startAutoScroll);
}

initTecnologiasCarousel();
