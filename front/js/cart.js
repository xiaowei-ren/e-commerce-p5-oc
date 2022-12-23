
//Affiche les produits dans le panier
let productsIds = [];
fetch("http://localhost:3000/api/products")
  .then(res => res.json())
  .then(data => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (i = 0; i < cart.length; i++) {
      let product = cart[i];
      productsIds.push(product._id)
      displayCartProduct(product);
    }
  })
  .catch(err => console.error(err));

  
//Création des éléments
function displayCartProduct (product) {
  //création un nouvel élément article
   let article = document.createElement("article");
   article.classList.add("cart__item");
   article.dataset.id = "{product-ID}";  // ?
   article.dataset.color = "{product-color}"; // ?

   let section = document.querySelector("#cart__items");
   section.appendChild(article);

    //Insertion de l'image
   let imgContainer = document.createElement("div");
   imgContainer.classList.add("cart__item__img");
   article.appendChild(imgContainer);

   let img = document.createElement("img");
   img.src = product.imageUrl;
   img.alt = product.altTxt;
   imgContainer.appendChild(img);

  //crée de la div content
   let divContent = document.createElement("div");
   divContent.classList.add("cart__item__content");
   article.appendChild(divContent);

   //crée de la cart description <div class="cart__item__content__description">
   let divDescription = document.createElement("div");
   divDescription.classList.add("cart__item__content__description");
   divContent.appendChild(divDescription);

   //Insertion du nom
   let h2 = document.createElement("h2");
   h2.innerHTML = product.name;
   divDescription.appendChild(h2);

   // Insertion de la couleur
   let p1 = document.createElement("p");// 
   p1.innerText = product.color;

  // Insertion du prix
   let p2 = document.createElement("p");
   p2.innerHTML = product.price + " €";
   divDescription.appendChild(p1);
   divDescription.appendChild(p2);


  //crée de la cart settings <div class="cart__item__content__settings">
   let divSetting = document.createElement("div");
   divSetting.classList.add("cart__item__content__settings");
   divContent.appendChild(divSetting);

   // Insertion de "Qté : "
   let divSetting_quant = document.createElement("div");
   divSetting_quant.classList.add("cart__item__content__settings__quantity");
   divSetting.appendChild(divSetting_quant);
   let divP = document.createElement("p");
   divP.innerHTML = "Qté : ";
    
   // Insertion de la quantité  
   let input = document.createElement("input");
  
   
   input.setAttribute("type", "number");
   input.classList.add("itemQuantity");
   input.setAttribute("name", "itemQuantity");
   input.setAttribute("min", "1");
   input.setAttribute("max", "100");
   input.setAttribute("value", product.quantity);
   divSetting_quant.appendChild(divP);
   divSetting_quant.appendChild(input);

   // mis a jour de la quantite dans le localStorage
   input.addEventListener ("change", () => {
     changeQuantity(product, parseInt(input.value))
     location.reload();
   })
   
   
  // Insertion de la partie de suppression
   let divSetting_delte = document.createElement("div");
   divSetting_delte.classList.add("cart__item__content__settings__delete");
   divSetting.appendChild(divSetting_delte);
   let deletP = document.createElement("p");
   deletP.classList.add("deleteItem");
   deletP.innerHTML = "Supprimer";
   divSetting_delte.appendChild(deletP);

   deletP.addEventListener ("click", () => {
     deleteItem(product);
     location.reload();
   })

}

function changeQuantity (product, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let foundProduct = cart.find(p => p._id == product._id && p.color == product.color);
  if (foundProduct != undefined) {
    foundProduct.quantity = quantity;
  }
  localStorage.setItem('cart', JSON.stringify(cart))
 }



//supprime le produit et mis a jour les donnes dans le localStorage
function deleteItem (product) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart.filter(p => p._id != product._id || p.color != product.color);
  localStorage.setItem('cart', JSON.stringify(cart))
}

//Total article
let totalQuantity = document.getElementById("totalQuantity");
totalQuantity.innerHTML = totalNumber();
function totalNumber () {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let number = 0;
  for (let product of cart) {
    number += product.quantity
  }
  return number;
}

// Total prix
let totalPrice = document.getElementById("totalPrice");
totalPrice.innerHTML = totalPrix();
function totalPrix() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let number = 0;
  for (let product of cart) {
    number += product.quantity * product.price
  }
  return number;
}

//Validation le formulaire

const form = document.querySelector(".cart__order__form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const btnOrder =document.getElementById("order");


form.addEventListener ('submit', (e) => {
  e.preventDefault()
  if (checkInput()) {
    // on envoie les donnes
    sendData()
  } 
})

function checkInput () {
  
  //Récupération des values depuis inputs
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const addressValue = address.value.trim();
  const cityValue = city.value.trim();
  const emailValue = email.value.trim();

  // verifier la value de prénom
  if (firstNameValue === '') {
    setErrorFor("Veuillez saisir un prénom.", "firstName")
    return false;
  } else if (!validName(firstNameValue)) {
    setErrorFor("Le prénom est au mauvais format.", "firstName")
    return false;
  } else {
    setSuccessFor("firstName");
  }

  // verifier la value de nom
  if (lastNameValue === '') {
    setErrorFor("Veuillez saisir un nom.", "lastName")
    return false;
  } else if (!validName(lastNameValue)) {
    setErrorFor("Le nom est au mauvais format.", "lastName")
    return false;
  } else {
    setSuccessFor('lastName');
  }

  // verifier la value d'address
  if (addressValue === '') {
    setErrorFor("Veuillez saisir une address.", "address")
    return false;
  } else if (!validAddress(addressValue)) {
    setErrorFor("Merci de renseigner votre adresse d'au maximum 3 caractères", "address")
    return false;
  } else {
    setSuccessFor('address');
  }

  // verifier la value de ville
  if (cityValue === '') {
    setErrorFor("Veuillez saisir une ville.", "city")
    return false;
  } else if (!validAddress(cityValue)) {
    setErrorFor("Merci de renseigner votre ville d'au maximum 3 caractères", "city")
    return false;
  } else {
    setSuccessFor('city');
  }

  // verifier la value d'email
  if (emailValue === '') {
    setErrorFor("Veuillez saisir un email.", "email")
    return false;
  } else if (!validEmail(emailValue)) {
    setErrorFor("L'email est au mauvais format.", "email")
    return false;
  } else {
    setSuccessFor('email');
  }

  return true;
}

function validName (name) {
  const regex = /^\D+$/g;
  let matches = name.match(regex);
  if (matches == null) {
    return false;
  } else {
    return true;
  }
}

function setErrorFor (message, elementId) {
  const input = document.getElementById(elementId);
  const errorElement = document.getElementById(elementId + 'ErrorMsg');
  errorElement.innerText = message;
  input.style.background = "red"
}

function setSuccessFor (elementId) {
  const input = document.getElementById(elementId);
  const errorElement = document.getElementById(elementId + 'ErrorMsg');
  errorElement.innerText = '';
  input.style.background = "white"
}

function validAddress (address) {
  const regex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  let matches = address.match(regex);
  if (matches == null) {
    return false;
  } else {
    return true;
  }

}

function validEmail (email) {
  const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;
  let matches = email.match(regex);
  if (matches == null) {
    return false;
  } else {
    return true;
  }
}

// Envoie de l'objet order vers le serveur
function sendData() {
  let body = {
    contact: {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      address: address.value.trim(),
      city: city.value.trim(),
      email: email.value.trim(),
    },
    products: productsIds
  }

  fetch("http://localhost:3000/api/products/order", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(response => response.json())
  .then(result => {
    console.log('Sucess:', result);
    window.location.href = "../html/confirmation.html?id="+result.orderId
  })
  .catch(error => {
    console.error('Error:', error)
  });
}