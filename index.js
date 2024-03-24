let productNameInput  = document.getElementById("productName");
let productPriceInput  = document.getElementById("productPrice");
let productCategoryInput  = document.getElementById("productCategory");
let productDescInput  = document.getElementById("productDesc");
let searchInput = document.getElementById("searchInput");
let addBtn = document.getElementById("addBtn");
let UpdateBtn = document.getElementById("updateBtn");
let productContainer = [];
let currentIndex = null;
if(localStorage.getItem("products")!=null){
    productContainer = JSON.parse( localStorage.getItem("products"));
    displayProducts(productContainer);
}

////////function for Adding New Product /////////////
function addProduct(){
    if(validateProductName()==true)
    {let product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value
    }
    productContainer.push(product);
    localStorage.setItem("products",JSON.stringify(productContainer));
    displayProducts(productContainer);
   
    clearForm();
}else{
    alert('Not matched');
}

    
}

//////////////////function to clear form after adding new product///////////////
function clearForm(){
    productNameInput.value = "";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescInput.value="";
}

//////////////function to display a products details in the table after adding the new product /////////
function displayProducts(arr){
    let cartona = ``;
    for(let i=0;i<arr.length;i++){

        cartona+=`<tr>
        <td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].desc}</td>
        <td><button onclick = "setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm ">Update</button></td>
        <td><button onclick = "deleteProduct(${i});"  class="btn btn-outline-danger  btn-sm ">Delete</button></td>
       
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

/////////////////////////fuunction to search for the product in the table ////////////
function searchProduct(term){
    let matchedProducts = [];
 for(let i=0;i<productContainer.length;i++){
   
    if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())== true){
        matchedProducts.push(productContainer[i]);
        }
 }
// or
// let matchedProducts = productContainer.filter(product => product.name.toLowerCase().includes(term.toLowerCase()));

displayProducts(matchedProducts);
}

///////////////////////function show the specific product on the inputs after clicking on the update button in the table /////////

function setFormForUpdate(i){
    currentIndex = i;
    addBtn.classList.replace("d-block","d-none");
    UpdateBtn.classList.replace("d-none","d-block");
    productNameInput.value = productContainer[i].name;
    productPriceInput.value = productContainer[i].price;
    productCategoryInput.value = productContainer[i].category;
    productDescInput.value = productContainer[i].desc;
}
///////////////function to make the new  updates  of the that product on the table //////////
function updateProductInTable(){
    if(currentIndex!=null){
    addBtn.classList.replace("d-none","d-block");
    UpdateBtn.classList.replace("d-block","d-none");
    productContainer[currentIndex].name = productNameInput.value;
    productContainer[currentIndex].price = productPriceInput.value;
    productContainer[currentIndex].category = productCategoryInput.value;
    productContainer[currentIndex].desc = productDescInput.value;
    localStorage.setItem("products",JSON.stringify(productContainer));
    displayProducts(productContainer);
    
    clearForm();
    currentIndex = null;
}
    
}

////////function to delete the product from the table and delete it from local storage by storing the product container/////////
function deleteProduct(productIndex){
    productContainer.splice(productIndex,1);
    localStorage.setItem("products",JSON.stringify(productContainer));
    displayProducts(productContainer);
}

///////////////function for validation of product name input value ///////////////////////
function validateProductName(){
    let regex =/^[A-Z][a-z]{3,8}$/;
    return regex.test(productNameInput.value);
}