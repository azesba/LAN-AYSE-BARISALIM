document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const initialButtons = document.getElementById('initial-buttons');
    const mainQuestion = document.getElementById('main-question');
    const yesMessage = document.getElementById('yes-message');
    const noMessage = document.getElementById('no-message');
    const footerText = document.getElementById('footer-text');
    const container = document.getElementById('container');
    
    let yesScale = 1.0; 
    let escapeCount = 0; 
    const MAX_ESCAPES = 3; 

    // GÜVENLİ KONUM HESAPLAMA FONKSİYONU (Butonu kenarlardan 30px içeride tutar)
    function calculateNewPosition(buttonWidth, buttonHeight) {
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;
        const padding = 30; // Butonu kenarlardan 30 piksel içeride tutar

        // Maksimum X/Y konumu: Pencere Boyutu - Buton Boyutu - Güvenli Boşluk
        const maxX = viewWidth - buttonWidth - padding;
        const maxY = viewHeight - buttonHeight - padding;

        // Minimum X/Y konumu: 30 piksel
        const minX = padding;
        const minY = padding;

        // Min ile Max arasında rastgele bir değer seç
        const newX = Math.random() * (maxX - minX) + minX;
        const newY = Math.random() * (maxY - minY) + minY;
        
        // Değerlerin 30'dan (minX/minY) küçük olmamasını garanti et
        const finalX = Math.max(minX, newX);
        const finalY = Math.max(minY, newY);
        
        return { x: finalX, y: finalY };
    }

    // --- HAYIR BUTONU (Tıklamada Kaçış / Zorlama) İŞLEVİ ---
    noBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        e.stopPropagation();

        if (escapeCount < MAX_ESCAPES) {
            // Kaçış ve Büyüme
            
            noBtn.style.position = 'absolute'; 
            
            const buttonWidth = noBtn.offsetWidth;
            const buttonHeight = noBtn.offsetHeight;
            
            const newPos = calculateNewPosition(buttonWidth, buttonHeight);
            noBtn.style.left = `${newPos.x}px`;
            noBtn.style.top = `${newPos.y}px`;

            // EVET butonunu büyüt
            yesScale += 0.15;
            yesBtn.style.transform = `scale(${yesScale})`;
            
            escapeCount++;

        } else {
            // Zorlama Mesajı
            noBtn.style.position = 'static'; 
            
            initialButtons.classList.add('hidden');
            mainQuestion.classList.add('hidden');
            yesMessage.classList.add('hidden');
            footerText.classList.add('hidden');
            noMessage.classList.remove('hidden');
            container.style.boxShadow = '0 0 30px rgba(244, 67, 54, 0.6)';
        }
    });

    // --- EVET BUTONU (NORMAL İŞLEV) ---
    yesBtn.addEventListener('click', () => {
        initialButtons.classList.add('hidden');
        mainQuestion.classList.add('hidden');
        noMessage.classList.add('hidden');
        footerText.classList.add('hidden');
        yesMessage.classList.remove('hidden');
        container.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.6)';
    });
});