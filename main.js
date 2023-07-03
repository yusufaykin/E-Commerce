const categories = document.querySelector(".categories");
const productList = document.querySelector(".products");
const openbtn = document.querySelector("#open-btn");
//console.log(openbtn)
const modalwrapper = document.querySelector(".modal-wrapper");

//console.log(modalwrapper)

const closebtn = document.querySelector("#close-btn");

const modallist=document.querySelector('.modal-list')

const modalinfo=document.querySelector('#modal-info')
console.log(modalinfo)

//console.log(modallist)

openbtn.addEventListener("click", () => {
  modalwrapper.classList.add("active");

  addList()

});

let total=0;

closebtn.addEventListener("click", () => {
  modalwrapper.classList.remove("active");
  modallist.innerHTML=''
  total=0
  
});

modalwrapper.addEventListener("click", (e) => {
  console.log(e.target.classList);
  if (e.target.classList.contains("modal-wrapper")) {
    modalwrapper.classList.remove("active");
  }
});
//console.log(categories)

const categoryURL = "https://api.escuelajs.co/api/v1/categories";
const productURL = "https://api.escuelajs.co/api/v1/products";

document.addEventListener("DOMContentLoaded", () => {
  getProducts();

  getCategory();
});

function getCategory() {
  fetch(categoryURL)
    .then((res) =>
      // console.log(res)
      res.json()
    )
    .then((data) => {
      const wanteddata = data.slice(0, 4);
      wanteddata.map((cat) => {
        // console.log(cat);

        const catDiv = document.createElement("div");
        catDiv.classList.add("category");

        catDiv.innerHTML = `

<img src=${cat.image} />
<span>${cat.name}</span>




`;
        categories.appendChild(catDiv);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}




function getProducts() {
  fetch(productURL)
    .then((res) => res.json())
    .then((data) =>
      //console.log(data)

      {
        const wantedprodata = data.slice(0, 20);

        // console.log(wantedprodata)
        wantedprodata.map((item) => {
          //console.log(product.price)
          //console.log(product.title)
          // console.log(product.images)
          //console.log(product.category.name)
          // div oluştur
          const productDiv = document.createElement("div");
          // dive class ekle
          productDiv.classList.add("product");
          // divin içeriğini değiştir
          productDiv.innerHTML = `
            <img src="${item.images[0]}" />
            <p>${item.title}</p>
            <p>${item.category.name}</p>
            <div class="product-action">
              <p>${item.price} $</p>
              <button onclick="addToBasket({id:${item.id},title:'${item.title}',price:${item.price},image:'${item.images[0]}',amount:1})">Sepete Ekle</button>
            </div>
        `;
          // oluşan ürünü htmldeki listeye gönderme
          productList.appendChild(productDiv);
        });
      }
    )
    .catch((error) => console.log(error));
}

//addtobasket
let basket=[]

function addToBasket(product) {
 
//     console.log(props.id);
//   console.log(props.title);
//   console.log(props.price);
//   console.log(props.image);
//   console.log(props.amount)


const foundItem=basket.find((basketProduct)=> basketProduct.id==product.id)

if(foundItem){
    foundItem.amount=foundItem.amount + 1;
}else{
    basket.push(product)
}
//console.log(basket)

}


function addList(){
    basket.map((product)=>{
        //console.log(basketItem.id)

        const lisitem=document.createElement('div')
        lisitem.classList.add('list-item')
        lisitem.innerHTML=`
        
        <img src="${product.image}" />
        <h2>${product.title}</h2>
        <h2 class="price">${product.price}  $</h2>
        <p>Miktar: ${product.amount}</p>
        <button id="del" onclick="deleteItem({id:${product.id},price:${product.price} ,amount: ${product.amount}})">Sil</button>

        
        
        
        `
        modallist.appendChild(lisitem)

        total += product.price*product.amount

        modalinfo.innerText=total
    })
}

function deleteItem(deletingItem){
basket= basket.filter((i)=>i.id !== deletingItem.id)

modallist.addEventListener('click',(e)=>{



    if(e.target.id=='del'){
        e.target.parentElement.remove()
    }
})

total-=deletingItem.price*deletingItem.amount
modalinfo.innerText=total
}