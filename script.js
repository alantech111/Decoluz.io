// Datos de ejemplo para la galería (en un caso real, estos vendrían de una API)
const galleryImages = [
    {
        id: 1,
        url: "515082657_23953826000912873_3909962499341569645_n.jpg",
        title: "Decoracion infantil para niñas",
        link: "infantiles.html",
    },
    {
        id: 2,
        url: "515104634_23953772127584927_5698322317984512867_n.jpg",
        title: "Decoracion infantil para niños",
        link: "infanitlMasculino.html",
       
    },
    {
        id: 3,
        url: "WhatsApp Image 2025-08-26 at 17.47.45.jpeg",
        link: "quince.html",
        title: "Decoracion XV",
    },
    {
        id: 4,
        url: "WhatsApp Image 2025-08-26 at 18.15.40 (2).jpeg",
        title: "Compromisos",
        link: "compromisos.html",
    },
    {
        id: 5,
        url: "528745462_24211823675113103_5007427320464226740_n.jpg",
        title: "Celebración de adultos"
    },
    {
        id: 6,
        url: "505583073_10006960776025964_4462095584748301173_n.jpg",
        title: "Al aire libre"
    }
];



// Función para cargar la galería de imágenes
function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    galleryImages.forEach(image => {
        // Crear elemento de galería
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        // Crear contenedor de imagen
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        // Crear texto que se superpone a la imagen
        const imageText = document.createElement('div');
        imageText.className = 'image-text';
        imageText.textContent = image.description;
        
        // Crear imagen
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.title;
        img.className = 'gallery-img';
        
        // Crear overlay con información
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        
        const title = document.createElement('h3');
        title.className = 'gallery-title';
        title.textContent = image.title;
        
        const linkText = document.createElement('a');
        linkText.href = image.link;
        linkText.className = 'gallery-link';
        
        
        // Construir la estructura
        overlay.appendChild(title);
        overlay.appendChild(linkText);
        
        imageContainer.appendChild(imageText);
        imageContainer.appendChild(img);
        
        galleryItem.appendChild(imageContainer);
        galleryItem.appendChild(overlay);
        
        // Añadir event listener para redirección al hacer clic en cualquier parte del item
        galleryItem.addEventListener('click', function() {
            window.location.href = image.link;
        });
        
        // Añadir a la galería
        galleryGrid.appendChild(galleryItem);
    });
}

// Inicializar la galería cuando el documento esté cargado
document.addEventListener('DOMContentLoaded', function() {
    loadGallery();
});
    

    
    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });




// Menú móvil
        const menuToggle = document.getElementById('menuToggle');
        const menu = document.getElementById('menu');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const menuItems = document.querySelectorAll('nav ul li a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
            });
        });
        
        // Sistema de presupuesto (simplificado)
        const addServiceButtons = document.querySelectorAll('.add-service');
        const selectedServices = document.querySelector('.selected-services');
        const subtotalElement = document.querySelector('.summary-item:first-child span:last-child');
        const totalElement = document.querySelector('.summary-item.total span:last-child');
        
        let services = [];
        let subtotal = 0;
        
        addServiceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const serviceCard = button.closest('.service-card');
                const serviceName = serviceCard.querySelector('h3').textContent;
                const servicePrice = parseInt(serviceCard.querySelector('.price span').textContent.replace('$', ''));
                
                // Añadir servicio
                services.push({
                    name: serviceName,
                    price: servicePrice
                });
                
                // Actualizar interfaz
                updateBudget();
            });
        });
        
        function updateBudget() {
            // Calcular subtotal
            subtotal = services.reduce((total, service) => total + service.price, 0);
            
            // Actualizar HTML
            selectedServices.innerHTML = '';
            
            if (services.length === 0) {
                selectedServices.innerHTML = '<div class="empty-message">Selecciona servicios de la lista</div>';
            } else {
                services.forEach(service => {
                    const serviceElement = document.createElement('div');
                    serviceElement.className = 'service-item';
                    serviceElement.innerHTML = `
                        <div class="name">${service.name}</div>
                        <div class="price">$${service.price}</div>
                        <button class="remove-service">&times;</button>
                    `;
                    selectedServices.appendChild(serviceElement);
                    
                    // Añadir evento para eliminar servicio
                    const removeButton = serviceElement.querySelector('.remove-service');
                    removeButton.addEventListener('click', () => {
                        const index = services.findIndex(s => s.name === service.name && s.price === service.price);
                        if (index !== -1) {
                            services.splice(index, 1);
                            updateBudget();
                        }
                    });
                });
            }
            
            subtotalElement.textContent = `$${subtotal}`;
            totalElement.textContent = `$${subtotal}`;
        }
        
        // WhatsApp flotante
        const whatsappButton = document.querySelector('.floating-whatsapp');
        whatsappButton.addEventListener('click', () => {
            window.open('https://wa.me/+59897307169?text=Hola,%20me%20interesan%20sus%20servicios%20de%20decoración', '_blank');
        });
