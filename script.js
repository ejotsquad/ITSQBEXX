tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            light: '#f472b6', // Pink 400
                            DEFAULT: '#ec4899', // Pink 500
                            dark: '#be185d', // Pink 700 (Gelap untuk teks)
                            glow: '#ff0080',
                        },
                        // Konfigurasi Tema Terang (Light Mode)
                        page: {
                            bg: '#fff0f5',     // Latar belakang pink sangat muda (Lavender Blush)
                            card: '#ffffff',   // Kartu putih bersih
                            surface: '#ffe4e6', // Surface pink muda (Rose 100)
                            text: '#1f2937',   // Teks utama hitam/abu gelap (Gray 800)
                            muted: '#4b5563',  // Teks sekunder abu medium (Gray 600)
                            border: '#fbcfe8'  // Border pink lembut (Pink 200)
                        }
                    },
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                        display: ['Righteous', 'cursive'],
                    },
                    animation: {
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'float': 'float 6s ease-in-out infinite',
                        'bounce-slow': 'bounce 2s infinite',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-20px)' },
                        }
                    }
                }
            }
        }
              // Removed Mobile Menu Listeners since elements are gone

        // Sticky Nav & Scroll Logic
        document.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.classList.add('shadow-md', 'bg-white/95', 'py-2');
                nav.classList.remove('bg-white/70', 'py-2'); // Changed from py-4 to match new reduced padding logic if needed, but keeping initial py-2 is safer
                nav.style.transform = "translateY(0)";
            } else {
                nav.classList.remove('shadow-md', 'bg-white/95', 'py-2');
                nav.classList.add('bg-white/70', 'py-2');
            }
        });

        function updateStreamStatus() {
            const now = new Date();
            const wibOffset = 7 * 60 * 60 * 1000;
            const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
            const wibDate = new Date(utcTime + wibOffset);
            const minutes = wibDate.getHours() * 60 + wibDate.getMinutes();
            const isOnline = minutes >= 1320 || minutes <= 90; // 22:00 - 01:30

            const badge = document.getElementById('stream-status-badge');
            const dot = document.getElementById('stream-status-dot');
            const text = document.getElementById('stream-status-text');

            if (isOnline) {
                text.innerText = "STREAM ON";
                text.className = "text-green-600";
                dot.className = "w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse mr-2";
                badge.className = "inline-flex items-center px-4 py-1.5 rounded-full border border-green-200 bg-white text-sm font-bold mb-6 shadow-md shadow-green-200 transition-all duration-500";
            } else {
                text.innerText = "STREAM OFF";
                text.className = "text-red-500";
                dot.className = "w-2.5 h-2.5 rounded-full bg-red-500 mr-2"; 
                badge.className = "inline-flex items-center px-4 py-1.5 rounded-full border border-red-200 bg-white text-sm font-bold mb-6 shadow-sm transition-all duration-500";
            }
        }

        // --- INTERSECTION OBSERVER ANIMATION SETUP ---
        function setupAnimations() {
            setTimeout(() => { document.querySelector('nav').style.transform = 'translateY(0)'; }, 100);

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15 
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    // Logic untuk memicu ulang animasi (RevealOnScroll)
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active'); // Tambahkan class saat masuk layar
                    } else {
                        entry.target.classList.remove('active'); // Hapus class saat keluar layar (agar bisa di-animate ulang)
                    }
                });
            }, observerOptions);

            const revealElements = document.querySelectorAll('.reveal');
            revealElements.forEach(el => observer.observe(el));
        }

        window.onload = function() {
            updateStreamStatus();
            setupAnimations();
            setInterval(updateStreamStatus, 60000);
        };