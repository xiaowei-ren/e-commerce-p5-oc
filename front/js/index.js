//Récupération des packages depuis le fichier json
fetch("http://localhost:3000/api/products")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.forEach(product => addProduct(product))
  })
  .catch(err => console.error(err));


function addProduct (product) {
    //crée un nouvel élément a
    let a = document.createElement("a");
    a.href = "./product.html?id=" + product._id;
    // et lui donne un élément article
    let article = document.createElement("article");
    //ajoute le nœud au élément a
    a.appendChild(article);

    //crée des contenus d'élément article
    let img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    let h3 = document.createElement("h3");
    let name = document.createTextNode(product.name);
    h3.appendChild(name);
    let p = document.createElement("p");
    let description = document.createTextNode(product.description);
    p.appendChild(description);
    //ajoute les nœuds au élément article
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);

    //ajoute les nouveaux éléments créés(a, article) et ses contenus dans le DOM
    let section = document.getElementById("items");
    section.appendChild(a);
    a.appendChild(article);
}

