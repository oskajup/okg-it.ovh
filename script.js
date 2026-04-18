const videos = document.querySelectorAll('.video');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

/**
 * @param {number} index
 */

function showVideo(index) {
    // 1. Zatrzymaj obecnie grający film i zresetuj go
    const currentActive = document.querySelector('.video.active');
    if (currentActive) {
        const currentVid = currentActive.querySelector('video');
        if (currentVid) {
            currentVid.pause();
            currentVid.currentTime = 0;
        }
    }

    // 2. Oblicz nowy indeks (z zapętlaniem slidera)
    if (index >= videos.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = videos.length - 1;
    } else {
        currentIndex = index;
    }

    // 3. Usuń klasę active ze wszystkich i nadaj nowemu
    videos.forEach(v => v.classList.remove('active'));
    const nextVideoContainer = videos[currentIndex];
    nextVideoContainer.classList.add('active');

    // 4. Pobierz element video i ustaw logikę odtwarzania
    const nextVid = nextVideoContainer.querySelector('video');
    if (nextVid) {
        // Usuwamy loop, jeśli jakimś cudem został w HTML, 
        // żeby zdarzenie 'onended' mogło się odpalić
        nextVid.loop = false; 

        nextVid.play().catch(error => {
            console.warn("Autoplay wstrzymany przez przeglądarkę. Kliknij cokolwiek na stronie.");
        });

        // KLUCZOWY MOMENT: Przełącz slajd dokładnie w milisekundzie końca filmu
        nextVid.onended = () => {
            nextVideo();
        };
    }
}

// Funkcje sterujące dla strzałek
function nextVideo() {
    showVideo(currentIndex + 1);
}

function prevVideo() {
    showVideo(currentIndex - 1);
}

// Event Listenery dla przycisków
if (nextBtn) nextBtn.addEventListener('click', nextVideo);
if (prevBtn) prevBtn.addEventListener('click', prevVideo);

/**
 * Menu Mobilne (Twoja pierwotna logika)
 */
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

/**
 * Inicjalizacja przy starcie strony
 */
window.addEventListener('DOMContentLoaded', () => {
    // Startujemy od pierwszego filmu
    showVideo(0);
});