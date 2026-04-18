document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicjalizacja ikon Lucide (na starcie)
    lucide.createIcons();

    // 2. Logika Loadera (Ekran ładowania)
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 1000);
        });
    }

    // 3. Menu Mobilne (Hamburger)
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Przełączanie klasy active
            navLinks.classList.toggle('active');
            
            // Zmiana ikony menu na "X" i z powrotem
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
                document.body.style.overflow = 'hidden'; // Blokuje przewijanie strony pod menu
            } else {
                icon.setAttribute('data-lucide', 'menu');
                document.body.style.overflow = 'auto'; // Przywraca przewijanie
            }
            // Ponowna inicjalizacja, aby Lucide podmieniło ikonę w DOM
            lucide.createIcons();
        });

        // Zamykanie menu po kliknięciu w dowolny link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // 4. Efekt Navbaru przy skrolowaniu (tło po przewinięciu)
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 5. Reveal on Scroll (Animacje pojawiania się elementów)
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Jeśli element to licznik, uruchom odliczanie
                if (entry.target.classList.contains('counter')) {
                    startCounter(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .counter').forEach(el => observer.observe(el));

    // 6. Logika Liczników (Statystyki)
    function startCounter(el) {
        const target = +el.getAttribute('data-target');
        let count = 0;
        const duration = 2000; 
        const increment = target / (duration / 16);

        const updateCount = () => {
            count += increment;
            if (count < target) {
                el.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = target + (target >= 10 ? '+' : '');
            }
        };

        updateCount();
    }

    // 7. Smooth Scroll (Płynne przewijanie do sekcji)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80; 
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});