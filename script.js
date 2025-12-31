// DOM Elements
const consultBtn = document.getElementById('consultBtn');
const packageSelectBtns = document.querySelectorAll('.package-select');
const compareBtn = document.getElementById('compareBtn');
const prevTestimonialBtn = document.getElementById('prevTestimonial');
const nextTestimonialBtn = document.getElementById('nextTestimonial');
const consultationForm = document.getElementById('consultationForm');
const packageModal = document.getElementById('packageModal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const testimonialSlider = document.querySelector('.testimonial-slider');

// Package data
const packageData = {
    'Ekonomi': {
        price: 'Rp 32.000.000',
        duration: '12 Hari',
        features: [
            'Hotel bintang 3 dekat Masjidil Haram',
            'Tiket pesawat pulang-pergi (ekonomi)',
            'Transportasi selama di Arab Saudi',
            'Makan 3x sehari (menu Indonesia)',
            'Pembimbing ibadah berpengalaman',
            'Ziarah ke tempat-tempat bersejarah',
            'Manasik sebelum berangkat',
            'Asuransi perjalanan'
        ]
    },
    'Premium': {
        price: 'Rp 45.000.000',
        duration: '12 Hari',
        features: [
            'Hotel bintang 5 dekat Masjidil Haram',
            'Tiket pesawat pulang-pergi (ekonomi)',
            'Transportasi VIP selama di Arab Saudi',
            'Makan 3x sehari + buffet pilihan',
            'Pembimbing ibadah khusus (1:15)',
            'City tour Mekah & Madinah lengkap',
            'Manasik intensif sebelum berangkat',
            'Asuransi perjalanan komprehensif',
            'Free merchandise umroh',
            'Bimbingan ibadah harian'
        ]
    },
    'VIP': {
        price: 'Rp 65.000.000',
        duration: '14 Hari',
        features: [
            'Hotel bintang 5 premium dekat Masjidil Haram',
            'Tiket pesawat kelas bisnis',
            'Transportasi pribadi selama di Arab Saudi',
            'Makan di restaurant premium pilihan',
            'Pembimbing ibadah pribadi (1:1)',
            'Tour lengkap Mekah, Madinah, dan Jeddah',
            'Manasik privat sebelum berangkat',
            'Asuransi perjalanan premium',
            'Free merchandise umroh eksklusif',
            'Bimbingan ibadah harian intensif',
            'Dokumentasi profesional',
            'Free wifi selama perjalanan'
        ]
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initEventListeners();
    smoothScroll();
});

// Event Listeners
function initEventListeners() {
    // Konsultasi button
    consultBtn.addEventListener('click', function() {
        openWhatsApp('konsultasi');
    });
    
    // Package selection buttons
    packageSelectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            showPackageModal(packageName);
        });
    });
    
    // Compare packages button
    compareBtn.addEventListener('click', function() {
        showPackageComparison();
    });
    
    // Testimonial navigation
    if (prevTestimonialBtn) {
        prevTestimonialBtn.addEventListener('click', function() {
            scrollTestimonials(-350);
        });
    }
    
    if (nextTestimonialBtn) {
        nextTestimonialBtn.addEventListener('click', function() {
            scrollTestimonials(350);
        });
    }
    
    // Form submission
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const package = this.querySelector('select').value;
            openWhatsApp('form', { name, phone, package });
            this.reset();
        });
    }
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            packageModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === packageModal) {
            packageModal.style.display = 'none';
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.padding = '20px';
                navLinks.style.borderRadius = '0 0 16px 16px';
                navLinks.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                navLinks.style.gap = '20px';
            }
        });
    }
}

// Smooth scroll
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Show package modal
function showPackageModal(packageName) {
    const package = packageData[packageName];
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = `Paket ${packageName}`;
    
    let featuresHtml = '';
    package.features.forEach(feature => {
        featuresHtml += `<li><i class="fas fa-check"></i> ${feature}</li>`;
    });
    
    // Buat pesan WhatsApp
    const whatsappMessage = `Halo Al-Mabrur Travel, saya mau booking Paket ${packageName} sebesar ${package.price}. Mohon info cara booking lebih lanjut.`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/6281211378041?text=${encodedMessage}`;
    
    modalContent.innerHTML = `
        <div class="package-modal-info">
            <div class="package-modal-price">${package.price}</div>
            <div class="package-modal-duration">${package.duration}</div>
            
            <h3>Fasilitas:</h3>
            <ul class="package-modal-features">
                ${featuresHtml}
            </ul>
            
            <p style="margin-top: 20px; color: #666; font-size: 0.9rem;">
                * Harga dapat berubah sesuai ketersediaan kursi dan musim
            </p>
            
            <a href="${whatsappUrl}" 
               target="_blank" 
               class="whatsapp-modal-button">
                <i class="fab fa-whatsapp"></i> 
                Booking Paket Ini via WhatsApp
            </a>
        </div>
    `;
    
    packageModal.style.display = 'flex';
}

// Show package comparison
function showPackageComparison() {
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = 'Perbandingan Paket Umroh';
    
    const whatsappUrl = `https://wa.me/6281211378041?text=${encodeURIComponent('Halo Al-Mabrur Travel, saya mau konsultasi tentang perbandingan paket umroh.')}`;
    
    modalContent.innerHTML = `
        <div class="comparison-table">
            <table>
                <thead>
                    <tr>
                        <th>Fasilitas</th>
                        <th>Ekonomi</th>
                        <th>Premium</th>
                        <th>VIP</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Hotel</td>
                        <td><i class="fas fa-check"></i> Bintang 3</td>
                        <td><i class="fas fa-check"></i> Bintang 5</td>
                        <td><i class="fas fa-check"></i> Bintang 5 Premium</td>
                    </tr>
                    <tr>
                        <td>Tiket Pesawat</td>
                        <td><i class="fas fa-check"></i> Ekonomi</td>
                        <td><i class="fas fa-check"></i> Ekonomi</td>
                        <td><i class="fas fa-check"></i> Bisnis</td>
                    </tr>
                    <tr>
                        <td>Transportasi</td>
                        <td><i class="fas fa-check"></i> Grup</td>
                        <td><i class="fas fa-check"></i> VIP</td>
                        <td><i class="fas fa-check"></i> Pribadi</td>
                    </tr>
                    <tr>
                        <td>Makanan</td>
                        <td><i class="fas fa-check"></i> 3x Sehari</td>
                        <td><i class="fas fa-check"></i> 3x + Buffet</td>
                        <td><i class="fas fa-check"></i> Restaurant Premium</td>
                    </tr>
                    <tr>
                        <td>Pembimbing</td>
                        <td><i class="fas fa-check"></i> Berpengalaman</td>
                        <td><i class="fas fa-check"></i> Khusus (1:15)</td>
                        <td><i class="fas fa-check"></i> Pribadi (1:1)</td>
                    </tr>
                    <tr>
                        <td>Tour</td>
                        <td><i class="fas fa-check"></i> Ziarah</td>
                        <td><i class="fas fa-check"></i> City Tour</td>
                        <td><i class="fas fa-check"></i> Tour Lengkap</td>
                    </tr>
                    <tr>
                        <td>Durasi</td>
                        <td>12 Hari</td>
                        <td>12 Hari</td>
                        <td>14 Hari</td>
                    </tr>
                    <tr>
                        <td>Harga</td>
                        <td>Rp 32 Jt</td>
                        <td>Rp 45 Jt</td>
                        <td>Rp 65 Jt</td>
                    </tr>
                </tbody>
            </table>
            
            <div style="margin-top: 30px;">
                <a href="${whatsappUrl}" 
                   target="_blank" 
                   class="whatsapp-modal-button">
                    <i class="fab fa-whatsapp"></i> 
                    Konsultasi via WhatsApp
                </a>
            </div>
        </div>
    `;
    
    packageModal.style.display = 'flex';
}

// Open WhatsApp
function openWhatsApp(type, data = {}) {
    let message = '';
    
    if (type === 'konsultasi') {
        message = 'Halo Al-Mabrur Travel, saya mau konsultasi tentang paket umroh. Mohon info lebih lanjut.';
    } else if (type === 'form') {
        message = `Halo Al-Mabrur Travel, saya ${data.name} (${data.phone}) mau konsultasi tentang ${data.package}. Mohon info lebih lanjut.`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6281211378041?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Scroll testimonials
function scrollTestimonials(amount) {
    if (testimonialSlider) {
        testimonialSlider.scrollBy({
            left: amount,
            behavior: 'smooth'
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        } else {
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        }
    }
});

// Initialize testimonial slider
if (testimonialSlider) {
    testimonialSlider.scrollLeft = 0;
}