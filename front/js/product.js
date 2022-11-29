const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let id = params.id;

fetch("http://localhost:3000/api/products")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.forEach(content => {
      if(content._id == id) {
        addContent(content)
      }
    });
  })
  .catch(error => console.log(error));

  //Crée des éléments
  function addContent (content) {
    let imgContainer = document.querySelector(".item__img"); 
    let img = document.createElement("img");
    img.src = content.imageUrl;
    img.alt = content.altTxt;
    imgContainer.appendChild(img); 

    document.getElementById("title").innerHTML = content.name;
    document.getElementById("price").innerHTML = content.price;
    document.getElementById("description").innerHTML = content.description;

    let select = document.getElementById("colors");
    content.colors.forEach(color => {
      let newOption = new Option(color.toLowerCase(), color.toLowerCase());
      select.appendChild(newOption);
    })

  }
 


  
  