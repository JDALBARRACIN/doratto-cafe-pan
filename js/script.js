/* =========================================================
   DORATTO CAFÉ & PAN
   JAVASCRIPT PRINCIPAL

   CONFIGURACIÓN RÁPIDA
   ---------------------------------------------------------
   Aquí puedes cambiar fácilmente:

   1. Número de WhatsApp
   2. Mensaje inicial
   3. Enlace de Google Maps
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const DORATTO_CONFIG = {

    /*
     * IMPORTANTE:
     * WhatsApp debe escribirse con código de país.
     *
     * Colombia = 57
     *
     * Ejemplo:
     * 573124078790
     */
    whatsappNumber: "573124078790",

    /*
     * Mensaje inicial que aparecerá al abrir WhatsApp.
     */
    whatsappMessage:
        "Hola Doratto Café & Pan, quisiera conocer el menú.",

    /*
     * Reemplazar posteriormente por el enlace exacto
     * de Google Maps del establecimiento.
     */
    googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Cra.+11a+%23191a-52%2C+Bogotá%2C+Colombia"

};


/* =========================================================
   DOCUMENT READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeWhatsApp();

    initializeGoogleMaps();

    initializeMenuFilters();

    initializeScrollReveal();

    initializeNavbar();

    initializeCurrentYear();

    initializeMobileNavigation();

});


/* =========================================================
   WHATSAPP
========================================================= */

function initializeWhatsApp() {

    const whatsappLinks =
        document.querySelectorAll(".whatsapp-link");

    if (!whatsappLinks.length) {
        return;
    }

    const encodedMessage =
        encodeURIComponent(
            DORATTO_CONFIG.whatsappMessage
        );

    const whatsappUrl =
        `https://wa.me/${DORATTO_CONFIG.whatsappNumber}?text=${encodedMessage}`;


    whatsappLinks.forEach(link => {

        link.href = whatsappUrl;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

    });

}


/* =========================================================
   GOOGLE MAPS
========================================================= */

function initializeGoogleMaps() {

    const mapLinks =
        document.querySelectorAll(
            '.map-content a[href="#"]'
        );

    mapLinks.forEach(link => {

        link.href = DORATTO_CONFIG.googleMapsUrl;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

    });

}


/* =========================================================
   MENÚ - FILTROS
========================================================= */

function initializeMenuFilters() {

    const filters =
        document.querySelectorAll(".menu-filter");

    const products =
        document.querySelectorAll(".menu-item");


    if (!filters.length || !products.length) {
        return;
    }


    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            const category =
                filter.dataset.filter;


            filters.forEach(button => {

                button.classList.remove("active");

            });

            filter.classList.add("active");


            products.forEach(product => {

                const productCategory =
                    product.dataset.category;


                if (productCategory === category) {

                    product.style.display = "";

                    setTimeout(() => {

                        product.style.opacity = "1";

                        product.style.transform =
                            "translateY(0)";

                    }, 10);

                } else {

                    product.style.opacity = "0";

                    product.style.transform =
                        "translateY(10px)";

                    setTimeout(() => {

                        product.style.display = "none";

                    }, 200);

                }

            });

        });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initializeScrollReveal() {

    const elements =
        document.querySelectorAll(".reveal");


    if (!elements.length) {
        return;
    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   NAVBAR
========================================================= */

function initializeNavbar() {

    const navbar =
        document.getElementById("mainNavbar");


    if (!navbar) {
        return;
    }


    const handleScroll = () => {

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    handleScroll();

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

}


/* =========================================================
   AÑO DEL FOOTER
========================================================= */

function initializeCurrentYear() {

    const yearElement =
        document.getElementById("currentYear");


    if (!yearElement) {
        return;
    }


    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   NAVEGACIÓN MOBILE
========================================================= */

function initializeMobileNavigation() {

    const navbarCollapse =
        document.getElementById("navbarContent");

    const navLinks =
        document.querySelectorAll(
            "#navbarContent .nav-link"
        );


    if (!navbarCollapse || !navLinks.length) {
        return;
    }


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (
                window.innerWidth < 992 &&
                navbarCollapse.classList.contains("show")
            ) {

                const bootstrapCollapse =
                    bootstrap.Collapse.getInstance(
                        navbarCollapse
                    );

                if (bootstrapCollapse) {

                    bootstrapCollapse.hide();

                }

            }

        });

    });

}


/* =========================================================
   CLICS EN PRODUCTOS
========================================================= */

document.addEventListener("click", event => {

    const productButton =
        event.target.closest(".menu-order");


    if (!productButton) {
        return;
    }


    const card =
        productButton.closest(".menu-card");


    if (!card) {
        return;
    }


    const productName =
        card.querySelector(
            ".menu-card-title h3"
        )?.textContent.trim();


    if (!productName) {
        return;
    }


    /*
     * Genera automáticamente un mensaje
     * personalizado para el producto.
     */

    const message =
        `Hola Doratto Café & Pan, quisiera pedir: ${productName}.`;


    const whatsappUrl =
        `https://wa.me/${DORATTO_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;


    productButton.href = whatsappUrl;

    productButton.target = "_blank";

    productButton.rel = "noopener noreferrer";

});


/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(
        ".navbar-nav .nav-link"
    );


if (sections.length && navigationLinks.length) {

    window.addEventListener(
        "scroll",
        () => {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 130;

                const sectionHeight =
                    section.offsetHeight;


                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY <
                    sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            });


            navigationLinks.forEach(link => {

                link.classList.remove("active");


                const href =
                    link.getAttribute("href");


                if (
                    href === `#${currentSection}`
                ) {

                    link.classList.add("active");

                }

            });

        },

        { passive: true }
    );

}
