// 🔥 URL de Firebase Realtime Database
const FIREBASE_URL = "https://lista-de-compras-9a256-default-rtdb.firebaseio.com/lista";

// Agregar un producto a la lista
function agregarItem() {
    let input = document.getElementById("itemInput");
    let itemTexto = input.value.trim();

    if (itemTexto !== "") {
        let nuevoItem = { nombre: itemTexto };

        // Guardar en Firebase con ID único
        fetch(`${FIREBASE_URL}.json`, {
            method: "POST",
            body: JSON.stringify(nuevoItem),
            headers: { "Content-Type": "application/json" }
        }).then(() => {
            input.value = ""; // Limpiar input después de añadir
            cargarLista(); // Recargar la lista
        });
    }
}

// Cargar la lista desde Firebase
function cargarLista() {
    fetch(`${FIREBASE_URL}.json`)
        .then(response => response.json())
        .then(data => {
            let lista = document.getElementById("lista");
            lista.innerHTML = ""; // Limpiar lista antes de actualizar

            if (data) {
                Object.keys(data).forEach(key => {
                    let item = data[key];

                    let li = document.createElement("li");
                    li.innerHTML = `${item.nombre} <button onclick="eliminarItem('${key}')">❌</button>`;
                    lista.appendChild(li);
                });
            }
        });
}

// Eliminar un producto de la lista
function eliminarItem(id) {
    fetch(`${FIREBASE_URL}/${id}.json`, {
        method: "DELETE"
    }).then(() => {
        cargarLista(); // Recargar la lista después de eliminar
    });
}

// Cargar la lista al inicio
window.onload = cargarLista;
