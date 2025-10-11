// Gestion du modal de personnalisation
const modal = document.getElementById('customizerModal');
const closeBtn = document.querySelector('.close');

function openCustomizer(type) {
    modal.style.display = 'block';
    document.getElementById('maillotType').value = type;
    updateMaillotPreview();
}

function closeModal() {
    modal.style.display = 'none';
}

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Fonction pour générer le maillot personnalisé
function updateMaillotPreview() {
    const maillotType = document.getElementById('maillotType').value;
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    const playerName = document.getElementById('playerName').value;
    const playerNumber = document.getElementById('playerNumber').value;
    
    const preview = document.getElementById('maillotPreview');
    
    // Effacer le contenu précédent
    preview.innerHTML = '';
    
    // Appliquer la couleur de fond
    preview.style.backgroundColor = primaryColor;
    
    // Créer les éléments du maillot
    const maillot = document.createElement('div');
    maillot.className = 'maillot';
    maillot.style.position = 'relative';
    maillot.style.width = '100%';
    maillot.style.height = '100%';
    
    // Ajouter des bandes selon le type de maillot
    if (maillotType === 'football') {
        // Bande sur les épaules pour le football
        const shoulderStripe = document.createElement('div');
        shoulderStripe.style.position = 'absolute';
        shoulderStripe.style.top = '20%';
        shoulderStripe.style.left = '0';
        shoulderStripe.style.width = '100%';
        shoulderStripe.style.height = '15%';
        shoulderStripe.style.backgroundColor = secondaryColor;
        maillot.appendChild(shoulderStripe);
    } else if (maillotType === 'basketball') {
        // Bande latérale pour le basketball
        const sideStripe = document.createElement('div');
        sideStripe.style.position = 'absolute';
        sideStripe.style.top = '0';
        sideStripe.style.left = '20%';
        sideStripe.style.width = '60%';
        sideStripe.style.height = '100%';
        sideStripe.style.backgroundColor = secondaryColor;
        sideStripe.style.borderRadius = '30%';
        maillot.appendChild(sideStripe);
    } else if (maillotType === 'rugby') {
        // Bandes horizontales pour le rugby
        for (let i = 0; i < 5; i++) {
            const stripe = document.createElement('div');
            stripe.style.position = 'absolute';
            stripe.style.top = `${i * 20}%`;
            stripe.style.left = '0';
            stripe.style.width = '100%';
            stripe.style.height = '20%';
            stripe.style.backgroundColor = i % 2 === 0 ? primaryColor : secondaryColor;
            maillot.appendChild(stripe);
        }
    }
    
    // Ajouter le numéro si spécifié
    if (playerNumber) {
        const number = document.createElement('div');
        number.style.position = 'absolute';
        number.style.top = '40%';
        number.style.left = '50%';
        number.style.transform = 'translate(-50%, -50%)';
        number.style.fontSize = '5rem';
        number.style.fontWeight = 'bold';
        number.style.color = secondaryColor;
        number.textContent = playerNumber;
        maillot.appendChild(number);
    }
    
    // Ajouter le nom si spécifié
    if (playerName) {
        const name = document.createElement('div');
        name.style.position = 'absolute';
        name.style.bottom = '20%';
        name.style.left = '50%';
        name.style.transform = 'translateX(-50%)';
        name.style.fontSize = '1.5rem';
        name.style.fontWeight = 'bold';
        name.style.color = secondaryColor;
        name.textContent = playerName.toUpperCase();
        maillot.appendChild(name);
    }
    
    preview.appendChild(maillot);
    
    // Mettre à jour le prix
    updatePrice();
}

// Fonction pour mettre à jour le prix
function updatePrice() {
    const maillotType = document.getElementById('maillotType').value;
    const playerName = document.getElementById('playerName').value;
    const playerNumber = document.getElementById('playerNumber').value;
    
    let price = 49.99;
    
    // Ajuster le prix selon le type
    if (maillotType === 'basketball') price = 54.99;
    if (maillotType === 'rugby') price = 59.99;
    
    // Ajouter des frais pour la personnalisation
    if (playerName) price += 5;
    if (playerNumber) price += 3;
    
    document.getElementById('price').textContent = price.toFixed(2) + '€';
}

// Fonction pour gérer l'ajout au panier
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (productId.startsWith('roman')) {
        // Ajouter un roman au panier
        const roman = {
            id: productId,
            name: document.querySelector(`[onclick="addToCart('${productId}')"]`).parentElement.querySelector('h4').textContent,
            price: document.querySelector(`[onclick="addToCart('${productId}')"]`).parentElement.querySelector('.price').textContent
        };
        cart.push(roman);
    } else {
        // Ajouter un maillot personnalisé au panier
        const maillotType = document.getElementById('maillotType').value;
        const primaryColor = document.getElementById('primaryColor').value;
        const secondaryColor = document.getElementById('secondaryColor').value;
        const playerName = document.getElementById('playerName').value;
        const playerNumber = document.getElementById('playerNumber').value;
        const price = document.getElementById('price').textContent;
        
        const maillot = {
            type: 'maillot',
            maillotType: maillotType,
            primaryColor: primaryColor,
            secondaryColor: secondaryColor,
            playerName: playerName,
            playerNumber: playerNumber,
            price: price
        };
        cart.push(maillot);
        closeModal();
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produit ajouté au panier!');
}

// Fonction pour gérer l'envoi du formulaire de contact
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Ici, normalement, on enverrait les données à un serveur
    // Pour cet exemple, on simule juste l'envoi
    
    alert(`Merci ${name}! Votre message a été envoyé. Nous vous répondrons bientôt.`);
    
    // Réinitialiser le formulaire
    document.getElementById('contactForm').reset();
}

// Initialisation lorsque la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    // Si on est sur la page produits.html
    if (document.getElementById('maillotPreview')) {
        // Initialiser l'aperçu du maillot
        updateMaillotPreview();
        
        // Ajouter les écouteurs d'événements pour les options
        document.getElementById('maillotType').addEventListener('change', updateMaillotPreview);
        document.getElementById('primaryColor').addEventListener('input', updateMaillotPreview);
        document.getElementById('secondaryColor').addEventListener('input', updateMaillotPreview);
        document.getElementById('playerName').addEventListener('input', updateMaillotPreview);
        document.getElementById('playerNumber').addEventListener('input', updateMaillotPreview);
        
        // Ajouter l'écouteur pour le bouton "Ajouter au panier" du modal
        document.getElementById('addToCart').addEventListener('click', function() {
            addToCart('maillot-personnalise');
        });
    }
    
    // Si on est sur la page contact.html
    if (document.getElementById('contactForm')) {
        document.getElementById('contactForm').addEventListener('submit', handleContactForm);
    }
    
    // Animation simple au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature, .category-card, .product-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };
    
    // Initialiser les styles pour l'animation
    const animatedElements = document.querySelectorAll('.feature, .category-card, .product-card');
    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Déclencher une fois au chargement
    animateOnScroll();
});


// Fonction pour mettre à jour le prix en FCFA
function updatePrice() {
    const maillotType = document.getElementById('maillotType').value;
    const playerName = document.getElementById('playerName').value;
    const playerNumber = document.getElementById('playerNumber').value;
    
    let price = 32800; // Prix de base en FCFA pour le football
    
    // Ajuster le prix selon le type
    if (maillotType === 'basketball') price = 36100;
    if (maillotType === 'rugby') price = 39400;
    
    // Ajouter des frais pour la personnalisation
    if (playerName) price += 3300;
    if (playerNumber) price += 2000;
    
    // Formater le prix avec des séparateurs de milliers
    const formattedPrice = price.toLocaleString('fr-FR');
    document.getElementById('price').textContent = formattedPrice + ' FCFA';
}

// Fonction pour formater les prix en FCFA
function formatPriceFCFA(price) {
    return price.toLocaleString('fr-FR') + ' FCFA';
}

// Prix de base en FCFA
const BASE_PRICES = {
    'football': 32800,
    'basketball': 36100,
    'rugby': 39400
};

// Fonction pour gérer l'ajout au panier
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (productId.startsWith('roman')) {
        // Prix des romans en FCFA
        const romanPrices = {
            'roman-1': 12500,
            'roman-2': 14100,
            'roman-3': 13100
        };
        
        const roman = {
            id: productId,
            name: document.querySelector(`[onclick="addToCart('${productId}')"]`).parentElement.querySelector('h4').textContent,
            price: romanPrices[productId],
            currency: 'FCFA'
        };
        cart.push(roman);
    } else {
        // Ajouter un maillot personnalisé au panier
        const maillotType = document.getElementById('maillotType').value;
        const primaryColor = document.getElementById('primaryColor').value;
        const secondaryColor = document.getElementById('secondaryColor').value;
        const playerName = document.getElementById('playerName').value;
        const playerNumber = document.getElementById('playerNumber').value;
        const price = document.getElementById('price').textContent;
        
        const maillot = {
            type: 'maillot',
            maillotType: maillotType,
            primaryColor: primaryColor,
            secondaryColor: secondaryColor,
            playerName: playerName,
            playerNumber: playerNumber,
            price: price,
            currency: 'FCFA'
        };
        cart.push(maillot);
        closeModal();
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produit ajouté au panier!');
}

// Initialisation lorsque la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    // Si on est sur la page produits.html
    if (document.getElementById('maillotPreview')) {
        // Initialiser l'aperçu du maillot
        updateMaillotPreview();
        
        // Ajouter les écouteurs d'événements pour les options
        document.getElementById('maillotType').addEventListener('change', updateMaillotPreview);
        document.getElementById('primaryColor').addEventListener('input', updateMaillotPreview);
        document.getElementById('secondaryColor').addEventListener('input', updateMaillotPreview);
        document.getElementById('playerName').addEventListener('input', updateMaillotPreview);
        document.getElementById('playerNumber').addEventListener('input', updateMaillotPreview);
        
        // Ajouter l'écouteur pour le bouton "Ajouter au panier" du modal
        document.getElementById('addToCart').addEventListener('click', function() {
            addToCart('maillot-personnalise');
        });
    }
    
    // Mettre à jour tous les prix affichés pour utiliser le format FCFA
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach(element => {
        // Garder le texte existant mais s'assurer qu'il affiche FCFA
        if (!element.textContent.includes('FCFA')) {
            element.textContent = element.textContent.replace('€', ' FCFA');
        }
    });
});


// Animation FAQ
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Basculer l'item actuel
            item.classList.toggle('active');
        });
    });
    
    // Animation du formulaire
    const inputs = document.querySelectorAll('.input-animate');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Gestion du formulaire
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        // Animation de chargement
        submitBtn.querySelector('.btn-text').textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simuler l'envoi
        setTimeout(() => {
            submitBtn.querySelector('.btn-text').textContent = 'Message envoyé !';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #f97316, #ea580c)';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
    
    // Animation au défilement
    function checkScroll() {
        const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in-up');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.animationPlayState = 'running';
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

// Animation des compteurs
function animateCounters() {
    const counters = document.querySelectorAll('.number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target;
            }
        };
        
        // Démarrer l'animation quand l'élément est visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Animation au défilement améliorée
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec des classes d'animation
    const animatedElements = document.querySelectorAll(
        '.slide-in-from-left, .slide-in-from-right, .slide-in-from-bottom, ' +
        '.rotate-in, .fade-in-up, .scale-in, .bounce-in'
    );

    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Effets de hover interactifs
function initHoverEffects() {
    // Effet sur les cartes de valeur
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Effet sur les membres de l'équipe
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const card = this.querySelector('.member-card');
            card.style.transform = 'rotateY(8deg) rotateX(8deg) translateY(-15px)';
        });
        
        member.addEventListener('mouseleave', function() {
            const card = this.querySelector('.member-card');
            card.style.transform = 'rotateY(0) rotateX(0) translateY(0)';
        });
    });
}

// Animation de la timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('fade-in-up');
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
    initScrollAnimations();
    initHoverEffects();
    animateTimeline();
    
    // Effet de parallaxe sur le hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.about-hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});