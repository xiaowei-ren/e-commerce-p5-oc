//Récupération des packages depuis le fichier json
fetch("http://localhost:3000/api/products")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

//Création des éléments dans le DOM
document.body.onload = addElement;

function addElement () {
    //crée un nouvel élément a
    let a = document.createElement("a");
    a.href = "./product.html?id=42";
    // et lui donne un élément article
    let article = document.createElement("article");
    //ajoute le nœud au élément a
    a.appendChild(article);

    //crée des contenus d'élément article
    let img = document.createElement("img");
    img.src = "http://localhost:3000/images/kanap01.jpeg";
    img.alt = "Lorem ipsum dolor sit amet, Kanap name1";
    let h3 = document.createElement("h3");
    let name = document.createTextNode("Kanap Sinopé");
    h3.appendChild(name);
    let p = document.createElement("p");
    let description = document.createTextNode("Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum");
    p.appendChild(description);
    //ajoute les nœuds au élément article
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);

    //ajoute les nouveaux éléments créés(a, article) et ses contenus dans le DOM
    let section = document.getElementById("items");
    section.appendChild(a);
    a.appendChild(article);
};

