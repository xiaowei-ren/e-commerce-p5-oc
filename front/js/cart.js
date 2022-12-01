
//Récupération des packages depuis le fichier json
fetch("http://localhost:3000/api/products")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.forEach(cart => addCart(cart))
  })
  .catch(err => console.error(err));

//Création des éléments
function addCart (cart) {
  //création un nouvel élément article
   let article = document.createElement("article");
   article.classList.add("cart__item");
   article.dataset.id = "cart_id";//?
   article.dataset.color = "cart_colors";//?

   let section = document.querySelector("#cart__items");
   section.appendChild(article);

 //création de la div img
   let imgContainer = document.createElement("div");
   imgContainer.classList.add("cart__item__img");
   article.appendChild(imgContainer);

   let img = document.createElement("img");
   img.src = cart.imageUrl;
   img.alt = cart.altTxt;
   imgContainer.appendChild(img);

  //crée de la div content
   let divContent = document.createElement("div");
   divContent.classList.add("cart__item__content");
   article.appendChild(divContent);
   //crée de la cart description <div class="cart__item__content__description">
   let divDescription = document.createElement("div");
   divDescription.classList.add("cart__item__content__description");
   divContent.appendChild(divDescription);
   let h2 = document.createElement("h2");
   h2.innerHTML = cart.name;
   let p1 = document.createElement("p");
   p1.innerHTML = cart.colors;
   let p2 = document.createElement("p");
   p2.innerHTML = cart.price + " €";
   divDescription.appendChild(h2);
   divDescription.appendChild(p1);
   divDescription.appendChild(p2);

  //crée de la cart settings <div class="cart__item__content__settings">
   let divSetting = document.createElement("div");
   divSetting.classList.add("cart__item__content__settings");
   divContent.appendChild(divSetting);
   let divSetting_quant = document.createElement("div");
   divSetting_quant.classList.add("cart__item__content__settings__quantity");
   divSetting.appendChild(divSetting_quant);
   let divP = document.createElement("p");
   divP.innerHTML = "Qté : ";
   let input = document.createElement("input");
   input.setAttribute("type", "number");
   input.classList.add("itemQuantity");
   input.setAttribute("name", "itemQuantity");
   input.setAttribute("min", "1");
   input.setAttribute("max", "100");
   input.setAttribute("value", "42");
   divSetting_quant.appendChild(divP);
   divSetting_quant.appendChild(input);
   
   let divSetting_delte = document.createElement("div");
   divSetting_delte.classList.add("cart__item__content__settings__delete");
   divSetting.appendChild(divSetting_delte);
   let deletP = document.createElement("p");
   deletP.classList.add("deleteItem");
   deletP.innerHTML = "Supprimer";
   divSetting_delte.appendChild(deletP);

}

