
//Récupération des packages depuis le fichier json
fetch("http://localhost:3000/api/products")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.forEach(cart => addCart(cart))
  })
  .catch(err => console.error(err));


function addCart (cart) {
   let article = document.createElement("article");
   article.classList.add("cart__item");
   article.dataset.id = "cart_id";
   article.dataset.color = "cart_colors";

   let section = document.querySelector("#cart__items");
   section.appendChild(article);

   let imgContainer = document.createElement("div");
   imgContainer.classList.add("cart__item__img");
   article.appendChild(imgContainer);

   let img = document.createElement("img");
   img.src = cart.imageUrl;
   img.alt = cart.altTxt;
   imgContainer.appendChild(img);

   let divContent = document.createElement("div");
   divContent.classList.add("cart__item__content");
   article.appendChild(divContent);
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

   let divSetting = document.createElement("div");
   divSetting.classList.add("cart__item__content__settings");
   article.appendChild(divSetting);
   let divSetting_quant = document.createElement("div");
   divSetting_quant.classList.add("cart__item__content__settings__quantity");
   divSetting.appendChild(divSetting_quant);
   let divP = document.createElement("p");
   divP.innerHTML = "Qté : ";
   let input = document.createElement("input");
   input.classList.add("itemQuantity");
   divSetting_quant.appendChild(divP);
   divSetting_quant.appendChild(input);
   let divSetting_delte = document.createElement("div");
   divSetting.appendChild(divSetting_delte);
   let deletP = document.createElement("p");
   divSetting_delte.appendChild(deletP);





}

