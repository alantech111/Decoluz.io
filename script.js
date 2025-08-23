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
        url: "515681331_23953826117579528_7441618500606789750_n.jpg",
        title: "Decoracion XV"
    },
    {
        id: 4,
        url: "518946644_24032638806364925_3845840233688127222_n.jpg",
        title: "Compromisos"
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




function openFloatingWhatsApp() {
            const phoneNumber = "+59897307169"; // Tu número aquí
            const message = "Hola, quisiera más información sobre sus servicios de decoración de fiestas.";
            const encodedMessage = encodeURIComponent(message);
            
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        }

        // Datos de los servicios
const services = [
    { id: 1, name: "Decoración Temática", price: 250 },
    { id: 2, name: "Arreglos con Globos", price: 120 },
    { id: 3, name: "Mesas Dulces", price: 180 },
    { id: 5, name: "Detalles Personalizados", price: 80 },
    { id: 6, name: "Montaje y Desmontaje", price: 100 }
];

// Estado de la aplicación
let selectedServices = [];
let subtotal = 0;
let tax = 0;
let total = 0;

// Elementos del DOM
const selectedServicesContainer = document.getElementById('selected-services');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const resetButton = document.getElementById('reset-budget');
const requestButton = document.getElementById('request-budget');
const urgentCheckbox = document.getElementById('urgent');
const setupCheckbox = document.getElementById('setup');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Añadir event listeners a los botones de servicios
    document.querySelectorAll('.add-service').forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceId = parseInt(serviceCard.dataset.id);
            const serviceName = serviceCard.dataset.name;
            const servicePrice = parseFloat(serviceCard.dataset.price);
            
            addService(serviceId, serviceName, servicePrice);
        });
    });
    
    // Event listeners para los botones de presupuesto
    resetButton.addEventListener('click', resetBudget);
    requestButton.addEventListener('click', requestBudget);
    
    // Event listeners para las opciones adicionales
    urgentCheckbox.addEventListener('change', updateBudget);
    setupCheckbox.addEventListener('change', updateBudget);
});

// Función para añadir un servicio al presupuesto
function addService(id, name, price) {
    // Verificar si el servicio ya está seleccionado
    const existingService = selectedServices.find(service => service.id === id);
    
    if (existingService) {
        alert('Este servicio ya ha sido añadido al presupuesto.');
        return;
    }
    
    // Añadir el servicio a la lista
    selectedServices.push({ id, name, price });
    
    // Actualizar la interfaz
    updateSelectedServicesList();
    updateBudget();
}

// Función para eliminar un servicio del presupuesto
function removeService(id) {
    selectedServices = selectedServices.filter(service => service.id !== id);
    updateSelectedServicesList();
    updateBudget();
}

// Función para actualizar la lista de servicios seleccionados
function updateSelectedServicesList() {
    // Limpiar el contenedor
    selectedServicesContainer.innerHTML = '';
    
    if (selectedServices.length === 0) {
        selectedServicesContainer.innerHTML = '<p class="empty-message">No hay servicios seleccionados aún.</p>';
        return;
    }
    
    // Añadir cada servicio a la lista
    selectedServices.forEach(service => {
        const serviceElement = document.createElement('div');
        serviceElement.className = 'service-item';
        serviceElement.innerHTML = `
            <div class="name">${service.name}</div>
            <div class="price">${service.price}UYU</div>
            <button class="remove-service" data-id="${service.id}">&times;</button>
        `;
        selectedServicesContainer.appendChild(serviceElement);
    });
    
    // Añadir event listeners a los botones de eliminar
    document.querySelectorAll('.remove-service').forEach(button => {
        button.addEventListener('click', function() {
            const serviceId = parseInt(this.dataset.id);
            removeService(serviceId);
        });
    });
}

// Función para actualizar el presupuesto
function updateBudget() {
    // Calcular subtotal
    subtotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
    
    // Aplicar cargos adicionales
    if (urgentCheckbox.checked) {
        subtotal += subtotal * 0; // +15% por servicio urgente
    }
    
    if (setupCheckbox.checked) {
        subtotal += 0; // +50€ por montaje express
    }
    
    // Calcular impuestos y total
    tax = subtotal * 0.00; // IVA 21%
    total = subtotal + tax;
    
    // Actualizar la interfaz
    subtotalElement.textContent = `${subtotal.toFixed(2)}UYU`;
    taxElement.textContent = `${tax.toFixed(2)}UYU`;
    totalElement.textContent = `${total.toFixed(2)}UYU`;
}

// Función para reiniciar el presupuesto
function resetBudget() {
    selectedServices = [];
    urgentCheckbox.checked = false;
    setupCheckbox.checked = false;
    updateSelectedServicesList();
    updateBudget();
}

// Función para solicitar el presupuesto
function requestBudget() {
    if (selectedServices.length === 0) {
        alert('Por favor, selecciona al menos un servicio para solicitar un presupuesto.');
        return;
    }
    
    // Crear mensaje con los detalles del presupuesto
    let message = "Hola, me gustaría solicitar un presupuesto para los siguientes servicios:\n\n";
    
    selectedServices.forEach(service => {
        message += `- ${service.name}: ${service.price}€\n`;
    });
    
    if (urgentCheckbox.checked) {
        message += "\n* Incluye recargo por servicio urgente (+0%)\n";
    }
    
    if (setupCheckbox.checked) {
        message += "* Incluye montaje express (+00.0UYU)\n";
    }
    
    message += `\nSubtotal: ${subtotal.toFixed(2)}UYU`;
    message += `\nIVA (21%): ${tax.toFixed(2)}UYU`;
    message += `\nTotal: ${total.toFixed(2)}UYU`;
    
    message += "\n\nPor favor, envíenme más información.";
    
    // Abrir cliente de correo (en un caso real, esto se enviaría a un backend)
    const email = "info@celebraplus.com";
    const subject = "Solicitud de Presupuesto para Fiesta";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    
    window.location.href = mailtoLink;
}

// Función para detectar y adaptar a pantallas expansivas
function setupExpansiveScreens() {
    // Definir umbral para considerar una pantalla como "expansiva"
    const EXPANSIVE_SCREEN_THRESHOLD = 1920; // píxeles (Full HD es 1920x1080)
    const ULTRAWIDE_THRESHOLD = 2560; // píxeles (QHD ultrawide es 2560x1080)
    const DUAL_SCREEN_THRESHOLD = 3840; // píxeles (4K es 3840x2160)
    
    // Elementos que queremos ajustar
    const container = document.querySelector('.container');
    const galleryGrid = document.querySelector('.gallery-grid');
    const servicesGrid = document.querySelector('.services-grid');
    
    // Función para aplicar ajustes según el ancho de pantalla
    function adjustForExpansiveScreen() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth >= DUAL_SCREEN_THRESHOLD) {
            // Pantalla 4K o dual screen
            console.log('Modo: Pantalla 4K/Dual');
            
            // Ajustar contenedor principal
            if (container) {
                container.style.maxWidth = '90%';
            }
            
            // Ajustar galería para más columnas
            if (galleryGrid) {
                galleryGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
                galleryGrid.style.gap = '2rem';
            }
            
            // Ajustar servicios para más columnas
            if (servicesGrid) {
                servicesGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
                servicesGrid.style.gap = '2.5rem';
            }
            
            // Añadir clases específicas para CSS
            document.documentElement.classList.add('expansive-screen', 'dual-screen');
            document.documentElement.classList.remove('ultrawide-screen');
            
        } else if (screenWidth >= ULTRAWIDE_THRESHOLD) {
            // Pantalla ultrawide
            console.log('Modo: Ultrawide');
            
            // Ajustar contenedor principal
            if (container) {
                container.style.maxWidth = '85%';
            }
            
            // Ajustar galería
            if (galleryGrid) {
                galleryGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
                galleryGrid.style.gap = '1.8rem';
            }
            
            // Ajustar servicios
            if (servicesGrid) {
                servicesGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(320px, 1fr))';
                servicesGrid.style.gap = '2rem';
            }
            
            // Añadir clases específicas para CSS
            document.documentElement.classList.add('expansive-screen', 'ultrawide-screen');
            document.documentElement.classList.remove('dual-screen');
            
        } else if (screenWidth >= EXPANSIVE_SCREEN_THRESHOLD) {
            // Pantalla expansiva estándar
            console.log('Modo: Expansiva estándar');
            
            // Ajustar contenedor principal
            if (container) {
                container.style.maxWidth = '95%';
            }
            
            // Añadir clases específicas para CSS
            document.documentElement.classList.add('expansive-screen');
            document.documentElement.classList.remove('ultrawide-screen', 'dual-screen');
            
        } else {
            // Pantalla normal
            console.log('Modo: Pantalla normal');
            document.documentElement.classList.remove('expansive-screen', 'ultrawide-screen', 'dual-screen');
            
            // Restablecer estilos si es necesario
            if (container) {
                container.style.maxWidth = '';
            }
            if (galleryGrid) {
                galleryGrid.style.gridTemplateColumns = '';
                galleryGrid.style.gap = '';
            }
            if (servicesGrid) {
                servicesGrid.style.gridTemplateColumns = '';
                servicesGrid.style.gap = '';
            }
        }
    }
    
    // Ejecutar al cargar y al redimensionar
    window.addEventListener('load', adjustForExpansiveScreen);
    window.addEventListener('resize', adjustForExpansiveScreen);
    
    // También devolver la función para poder llamarla manualmente si es necesario
    return adjustForExpansiveScreen;
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const adjustExpansiveScreen = setupExpansiveScreens();
    
    // También puedes llamarla manualmente si es necesario
    // adjustExpansiveScreen();
});

// Opcional: Función para detectar relación de aspecto ultrawide
function isUltrawideAspectRatio() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    // Relación de aspecto típica de ultrawide es 21:9 (2.33) o mayor
    return aspectRatio >= 2.0;
}

// Opcional: Función para detectar si es una pantalla dual/múltiple
function isMultiScreenSetup() {
    // Esto es una aproximación, no hay forma exacta de detectar múltiples pantallas
    return window.innerWidth > 3000 && window.screen.width < window.innerWidth;
}
