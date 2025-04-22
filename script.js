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
  function mostrarProductos(productos) {
    galeria.innerHTML = "";
    productos.forEach(p => {
      const card = document.createElement("div");
      card.className = "producto";
      card.setAttribute("data-aos", "zoom-in");
  
      card.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onclick="abrirModal(this)" />
        <h3>${p.nombre}</h3>
        <p><strong>Precio:</strong> ${p.precio}</p>
        <p><strong>Talla:</strong> ${p.talla || 'No especificada'}</p>
        <p><strong>Id:</strong> ${p.id}</p> <!-- Muestra el ID en la pantalla -->
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
  
    // Este es el paso importante
    AOS.refresh(); // <- asegúrate que ya está cargado AOS (por eso se mueve el script arriba del tuyo)
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
