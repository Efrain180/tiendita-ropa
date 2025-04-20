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
    card.innerHTML = `
    <img src="${p.imagen}" alt="${p.nombre}" onclick="abrirModal(this)" />
    <h3>${p.nombre}</h3>
    <p>${p.precio}</p>
<a class="boton-whatsapp" target="_blank"
   href="https://wa.me/5217658396857?text=${encodeURIComponent(`Hola! Estoy interesad@ en ${p.nombre}, su precio es ${p.precio},  ${location.origin + location.pathname}`)}">
   Apartar por WhatsApp
</a>


  `;
  
    galeria.appendChild(card);
  });
}

function abrirModal(img) {
  document.getElementById('modal-img').src = img.src;
  document.getElementById('modal').style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

