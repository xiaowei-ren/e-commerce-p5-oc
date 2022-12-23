//// Récupération de l'id pour l'ajouter dans le textContent
const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

let orderId = document.getElementById("orderId");
orderId.innerHTML = id;


