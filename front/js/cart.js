//Récupération des packages depuis le fichier json
fetch("http://localhost:3000/api/products")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.forEach(cart => addCart(cart));
  })
  .catch(error => console.log(error));

  

  //Crée des éléments
  function addCart (cart) {
      let article = document.createElement("article");
      let div = document.createElement("div");
      article.appendChild(div);
      let section = document.getElementById("#cart__items");
      section.appendChild(article);
  };