const galeria = document.getElementById("galeria");
const botones = document.querySelectorAll("nav button");

fetch("productos.json")
  .then(res => res.json())
  .then(productos => {
    mostrarProductos(productos);

    botones.forEach(btn => {
      btn.addEventListener("click", () => {
        botones.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");

        const categoria = btn.dataset.categoria;
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
        <img src="${p.imagen}" alt="${p.nombre}" onclick="abrirModal(this)" />
        <h3>${p.nombre}</h3>
        <p><strong>Precio:</strong> ${p.precio}</p>
        <p><strong>Talla:</strong> ${p.talla || 'No especificada'}</p>
        <a class="boton-whatsapp" target="_blank"
           href="https://wa.me/5217658396857?text=${encodeURIComponent(`Hola! Estoy interesad@ en ${p.nombre}, su precio es ${p.precio}, talla: ${p.talla || 'No especificada'} - ${location.origin + location.pathname}`)}">
           Apartar por WhatsApp
        </a>
      `;
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
