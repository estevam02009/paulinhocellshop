// Banco de dados compartilhado entre páginas
window.productsData = {
    smartphones: [
        { 
            id: '1',
            name: "iPhone 15 Pro",
            price: 4999.99,
            image: "img/iphone-13.jpg",
            brand: "Apple",
            description: "O iPhone 15 Pro apresenta design em titânio aeronáutico...",
            images: ["img/iphone-13.jpg", "img/iphone-13.jpg", "img/iphone-13.jpg"],
            specs: {
                model: "iPhone 13 Pro",
                color: "Titânio Natural",
                memory: "8GB RAM",
                storage: "256GB"
            }
        },
        {
            id: '2',
            name: "Samsung Galaxy S23 Ultra",
            price: 8499.99,
            image: "img/samsung-galaxy-s23.jpg",
            brand: "Samsung",
            description: "O Galaxy S23 Ultra possui câmera de 200MP...",
            images: ["img/samsung-galaxy-s23.jpg", "img/samsung-galaxy-s23.jpg", "img/samsung-galaxy-s23.jpg"],
            specs: {
                model: "SM-S918B",
                color: "Preto",
                memory: "12GB RAM",
                storage: "256GB"
            }
        }
    ],
    cases: [
        {
            id: '3',
            name: "Capa iPhone 15 - Transparente",
            price: 99.99,
            image: "img/capa-iphone.jpg",
            brand: "Apple",
            description: "Capa transparente para iPhone 15...",
            images: ["img/capa-iphone.jpg", "img/capa-iphone-2.jpg"],
            specs: {
                model: "Capa Transparente",
                color: "Cristal",
                material: "Policarbonato"
            }
        },
        {
            id: '4',
            name: "Capa Samsung s23 - Couro",
            price: 99.99,
            image: "img/capa-samsung.jpg",
            brand: "Apple",
            description: "Capa transparente para iPhone 15...",
            images: ["img/capa-samsung.jpg", "img/capa-samsung.jpg"],
            specs: {
                model: "Capa Transparente",
                color: "Cristal",
                material: "Policarbonato"
            }
        },
        
    ],
    headphones: [
        {
            id: '5',
            name: "Fone de Ouvido Bluetooth",
            price: 199.99,
            image: "img/AirPodsPro.jpg",
            brand: "Apple",
            description: "Fone de ouvido sem fio com cancelamento de ruído...",
            images: ["img/AirPodsPro.jpg", "img/AirPodsPro.jpg", 'img/AirPodsPro.jpg'],
            specs: {
                model: "AirPods Pro",
                color: "Branco",
                battery: "4 horas"
            }
        },
        {
            id: '6',
            name: "Fone de Ouvido Bluetooth",
            price: 199.99,
            image: "img/GalaxyBuds2.jpg",
            brand: "Samsung",
            description: "Fone de ouvido sem fio com cancelamento de ruído...",
            images: ["img/GalaxyBuds2.jpg", "img/GalaxyBuds2.jpg"],
            specs: {
                model: "Galaxy Buds Pro",
                color: "Preto",
                battery: "4 horas"
            }
        }
    ],
};