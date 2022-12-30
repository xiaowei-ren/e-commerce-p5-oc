//// Récupération de l'id pour affichage du numero de commande
const id = new URL(window.location.href).searchParams.get("id");

let orderId = document.getElementById("orderId");
orderId.innerHTML = id;


