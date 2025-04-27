const galeria = document.getElementById("galeria");
const botones = document.querySelectorAll("nav button");

fetch("https://api.sheetbest.com/sheets/16e40fc8-cb02-48a7-9ef6-6e8d76a44d00")

  .then(res => res.json())
  .then(productos => {
    mostrarProductos(productos);

    botones.forEach(btn => {
      btn.addEventListener("click", () => {
        botones.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
      
        const categoria = btn.dataset.categoria;
        registrarVista(`Categoría: ${categoria}`); // 👈 Aquí
      
        if (categoria === "todos") {
          mostrarProductos(productos);
        } else {
          const filtrados = productos.filter(p => p.categoria === categoria);
          mostrarProductos(filtrados);
        }
      });
      
    });
  });



  function esProductoNuevo(fechaProducto) {
    if (!fechaProducto) return false; // Si no hay fecha, no es nuevo
  
    const ahora = new Date();
    const fecha = new Date(fechaProducto);
    const diferenciaTiempo = ahora - fecha;
    const diferenciaDias = diferenciaTiempo / (1000 * 60 * 60 * 24);
  
    return diferenciaDias <= 4;
  }
  function mostrarProductos(productos) {
    galeria.innerHTML = "";
  
    productos.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return fechaB - fechaA;
    });
  
    productos.forEach(p => {
      const card = document.createElement("div");
      card.className = "producto";
      card.setAttribute("data-aos", "zoom-in");
  
      const nuevo = esProductoNuevo(p.fecha) ? '<span class="etiqueta-nuevo">¡Nuevo!</span>' : '';
  
      card.innerHTML = `
        <div class="imagen-container">
          ${nuevo}
          <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onclick="abrirModal(this)" class="imagen-producto" />
        </div>
        <h3>${p.nombre}</h3>
        <p><strong>Precio:</strong> ${p.precio}</p>
        <p><strong>Talla:</strong> ${p.talla || 'No especificada'}</p>
        <p><strong>Id:</strong> ${p.id}</p>
        <a class="boton-whatsapp" target="_blank"
           href="https://wa.me/5217658396857?text=${encodeURIComponent(`Hola! Estoy interesad@ en ${p.nombre} (Id: ${p.id}), su precio es ${p.precio}, talla: ${p.talla || 'No especificada'} - ${location.origin + location.pathname}`)}">
           Apartar por WhatsApp
        </a>
      `;
  
      card.addEventListener("click", () => {
        registrarVista(`Producto: ${p.nombre}`);
      });
  
      galeria.appendChild(card);
    });
  
    AOS.refresh();
  }
  
  
  
  
  

function abrirModal(img) {
  document.getElementById('modal-img').src = img.src;
  document.getElementById('modal').style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

// === MODO OSCURO/CLARO ===
const toggleBtn = document.getElementById('modo-toggle');
const cuerpo = document.body;

// Aplica modo guardado si existe
if (localStorage.getItem("modo") === "oscuro") {
  cuerpo.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  cuerpo.classList.toggle("dark-mode");
  const esOscuro = cuerpo.classList.contains("dark-mode");

  toggleBtn.textContent = esOscuro ? "☀️" : "🌙";
  localStorage.setItem("modo", esOscuro ? "oscuro" : "claro");
});


function registrarVista(nombrePagina) {
  gtag('event', 'page_view', {
    page_title: nombrePagina,
    page_location: window.location.href,
    page_path: window.location.pathname
  });
}


window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("modal-info").style.display = "flex";
});

function cerrarInfo() {
  document.getElementById("modal-info").style.display = "none";
}
