
//Récupération des packages depuis le fichier json
//affiche les produits dans le panier
fetch("http://localhost:3000/api/products")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (i = 0; i < cart.length; i++) {
      let productDetail = data.find(p => p._id == cart._id) 
        addCart(cart[i]);
    }
  })
  .catch(err => console.error(err));

  
//Création des éléments
function addCart (product) {
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
     changeQuantity(product, parseInt(input.value), parseInt(product.price / product.quantity) * parseInt(input.value))
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

function changeQuantity (product, quantity, price) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let foundProduct = cart.find(p => p._id == product._id && p.color == product.color);
  if (foundProduct != undefined) {
    foundProduct.quantity = quantity;
    foundProduct.price = price;
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
