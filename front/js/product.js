// Récuperer l'id du produit à afficher dans l'URL
let urlQueryParams = new URLSearchParams(window.location.search);
let params = Object.fromEntries(urlQueryParams.entries());
let id = params.id;
let productObject = {}

fetch("http://localhost:3000/api/products")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.forEach(content => {
      if(content._id == id) {
        productObject = content
        addContent(content)
      }
    });
  })
  .catch(error => console.log(error));

  //Crée des éléments
  let select = document.getElementById("colors");
  function addContent (content) {
    let imgContainer = document.querySelector(".item__img"); 
    let img = document.createElement("img");
    img.src = content.imageUrl;
    img.alt = content.altTxt;
    imgContainer.appendChild(img); 

    document.getElementById("title").innerHTML = content.name;
    document.getElementById("price").innerHTML = content.price;
    document.getElementById("description").innerHTML = content.description;

    content.colors.forEach(color => {
      let newOption = new Option(color.toLowerCase(), color.toLowerCase());
      select.appendChild(newOption);
    })
  }

  //Ajouter le produit au pannier
  let bouton = document.getElementById("addToCart");
  let quantity = document.getElementById("quantity");

  // Au clic, on ajoute un produit dans le panier
  bouton.addEventListener("click", () => {

    let cart = localStorage.getItem("cart") // Le panier
    let quantityValue = parseInt(quantity.value); // La quantite choisie

    if (select.value != '') {
      // On verifie que la quantite choisie est bien comprise entre 1 a 100
      if (quantityValue > 0 && quantityValue <= 100) {

        // Les donnes a garder en memoire au clic
      
        var selection = {
          "altTxt": productObject.altTxt,
          "color": select.value,
          "description": productObject.description,
          "imageUrl": productObject.imageUrl,
          "name": productObject.name,
          "price": productObject.price,
          "_id": id,
          "quantity": quantityValue,
        }

        // Si le panier n'existe pas, 
        // on cree un premier tableau avec la selection
        if (cart == null) {
          localStorage.setItem("cart", JSON.stringify([selection]));
        } else {

          // Si le panier existe,
          // on garde en memoire la selection
          let cartData = JSON.parse(cart)
          // on verifie si la meme id et meme cloleur, on change la quantite
          //si non, on ajoute un nouvel object dans le localStorage
          let foundColor = cartData.find(p => (p._id == selection._id && p.color == selection.color));
          if (foundColor != undefined) {
            foundColor.quantity = foundColor.quantity + selection.quantity;
          } else {
            cartData.push(selection)
          }
          
          localStorage.setItem("cart", JSON.stringify(cartData))
          
        }
        console.log(JSON.parse(cart))
        
      // Sinon, on affiche une alerte
      } else {
        alert("Veuillez choisir entre 1 a 100 produits.")
      }
    } else {
      alert("Veuillez choisir une couleur")
    }
    
})
 


  
  