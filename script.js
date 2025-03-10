const products = document.getElementById("products")
const carsAnchors = document.getElementById("carsAnchors")
const marka = document.getElementById("marka")
const model = document.getElementById("model")
const seher = document.getElementById("seher");
const banType = document.getElementById("bantype")
const elan = document.getElementById("elan")
const valyuta = document.querySelectorAll("#valyuta div")
const minprice = document.getElementById("minprice")
const maxprice = document.getElementById("maxprice")
const variants = document.getElementById("variants")
const sevimli = document.getElementById("sevimli")
const liked = document.getElementById("liked")
const closeLiked = document.getElementById("closeLiked")
const products2 = document.getElementById("products2")
showAllProduct()
showFooterProduct()
markas()
sehers()
bantypes()
sevimli.onclick = function(){liked.style.display = "block"}
closeLiked.onclick = function(){liked.style.display = "none"}
variants.onchange = function eli(){
    let newArr = []
    newArr = variants.value == "az" ? data.map(item => item).sort( (a,b) => {if(a.brand < b.brand) return -1 } ) :
    variants.value == "za" ? data.map(item => item).sort( (a,b) => {if(a.brand > b.brand) return -1 } ) : 
    variants.value == "bu" ? data.map(item => item).sort((a,b) => {if(a.price > b.price) return -1}) :
                             data.map(item => item).sort((a,b) => {if(a.price < b.price) return -1}) 
    renderProducts(newArr)
}
let maxPriceStatue = false
let minPriceStatue = false
function compare(){
    let priceed = maxPriceStatue && minPriceStatue ? data.filter(item => minprice.value < item.price && item.price < maxprice.value ) :
                  maxPriceStatue ? data.filter(item => item.price < maxprice.value) :
                  data.filter(item =>  minprice.value < item.price)
    renderProducts(priceed)
}
minprice.oninput = function(){
    minPriceStatue = true
    minprice.value == "" ? showAllProduct() : compare()
}
maxprice.oninput = function(){
    maxPriceStatue = true
    maxprice.value == "" ? showAllProduct() : compare()
}
valyuta.forEach(item => {
    item.onclick = function(){
        let val = []
        item.id == "azn" ? val = data.filter(i => i.currency == item.id.toUpperCase()) : 
        item.id == "credit" ? val = data.filter(i => i.credit) : val = data.filter(i => i.barter)
        renderProducts(val)
    }})
elan.onclick = function(){
    let filteredData = data.filter( item => {     
        return  (!markaStatue || item.brand === marka.value) &&
                (!modelStatue || item.model === model.value) &&
                (!seherStatue || item.city === seher.value) &&
                (!bantypeStatue || item.banType === banType.value);
    })
    renderProducts(filteredData)
}
let modelStatue = false
let markaStatue = false
let seherStatue = false
let bantypeStatue = false
model.onchange = function(){modelStatue = true}
seher.onchange = function(){seherStatue = true}
banType.onchange = function(){bantypeStatue = true}
marka.onchange = function(){
    markaStatue = true
    model.disabled = false  
    modelStatue = false   
    const set = new Set()
    let models = data.filter(item => item.brand == marka.value)
    models.map(item => set.add(item.model))
    uniqueValue(model,set)}
function bantypes(){
    const set = new Set()
    data.map(item => set.add(item.banType))
    uniqueValue(banType,set)
}
function sehers(){
    const set = new Set()
    data.map(item => set.add(item.city))
    uniqueValue(seher,set)
}
function markas(){
    const set = new Set()
    data.map(item => set.add(item.brand))
    uniqueValue(marka,set)
}
function uniqueValue(tag,set){
    let kod = ''
    set.forEach(item => kod += `<option value="${item}">${item}</option>`)
    tag.innerHTML = kod
}
function showFooterProduct(){
    let newArr = []
    data.map(item => newArr.push(item.brand,item.model)) 
    let newObj = newArr.reduce((acc,item) => {
        acc[item] = (acc[item] || 0 ) + 1
        return acc
    } ,{})
    for (const key in newObj) {
        carsAnchors.innerHTML += `<a class="text-[#8D94AD] pr-[13px] pb-[13px] hover:text-[#CC212C]" href="">${key}(${newObj[key]})</a>`        
    }
}
function showAllProduct(){
    let kod = ''
    data.map(item => kod += 
        `    <div id="id${item.id}" class="product flex flex-col rounded-[8px] items-start bg-white">
                <div class="relative h-[220px] w-full">
                <a href="product.htm?id=${item.id}" target="_blank">
                    <img src="${item.images}" class="w-full h-full object-cover rounded-t-[8px] " alt="">
                </a>
                    <i onclick="addWish(${item.id},this)" class=" fa-regular  fa-heart z-10 absolute right-[3%] top-[3%]"></i>
                </div>
                <div class="p-3 flex flex-col ">
                    <span class="font-bold">${item.price} ${item.currency}</span>
                    <div>
                        <span>${item.brand} </span>
                        <span>${item.model}</span>
                    </div>
                    <span>${item.year}, ${item.engine} L , ${item.odometer} km</span>
                    <span class="text-[#8D94AD] text-[0.9em]">${item.city},${item.dates}</span>
                </div>
            </div>
            `)
    products.innerHTML = kod
}
function renderProducts(arg){
    modelStatue = false
    let kod = ''
    if(!arg.length){kod = '<div>Belə Məhsul Yoxdur</div>'}
    else{
    arg.map(item => { kod += 
    `
        <div id="id${item.id}" class="product flex flex-col rounded-[8px] items-start bg-white">
            <div class="relative h-[220px] w-full">
                <a href="product.htm?id=${item.id}" target="_blank">
                    <img src="${item.images}" class="w-full h-full object-cover rounded-t-[8px] " alt="">
                </a>
                <i onclick="addWish(${item.id},this)" class="fa-regular fa-heart z-10 absolute right-[3%] top-[3%]"></i>
            </div>
            <div class="p-3 flex flex-col ">
                <span class="font-bold">${item.price} ${item.currency}</span>
                <div>
                    <span>${item.brand} </span>
                    <span>${item.model}</span>
                </div>
                <span>${item.year}, ${item.engine} L , ${item.odometer} km</span>
                <span class="text-[#8D94AD] text-[0.9em]">${item.city},${item.dates}</span>
            </div>
        </div>
    `})
    }
    products.innerHTML = kod
}
let wishList = JSON.parse(localStorage.getItem("likedCars")) || []
localWishList()
function localWishList(){
    let kod = ""
    wishList.length ? wishList.map(item => {
        kod += 
        `
        <div id="id${item.id}" class="product flex flex-col rounded-[8px] items-start bg-[#d1d1d1]">
            <div class="relative h-[220px] w-full">
                <a href="product.htm?id=${item.id}" target="_blank">
                    <img src="${item.images}" class="w-full h-full object-cover rounded-t-[8px] " alt="">
                </a>
                <i onclick="addWish(${item.id},this)" class="fa-regular text-red-500  fa-heart z-10 absolute right-[3%] top-[3%]"></i>
            </div>
            <div class="p-3 flex flex-col ">
                <span class="font-bold">${item.price} ${item.currency}</span>
                <div>
                    <span>${item.brand} </span>
                    <span>${item.model}</span>
                </div>
                <span>${item.year}, ${item.engine} L , ${item.odometer} km</span>
                <span class="text-[#8D94AD] text-[0.9em]">${item.city},${item.dates}</span>
            </div>
        </div>
        `        
}) : kod = ""
products2.innerHTML = kod
}

function addWish(params,th) {
    th.classList.contains("text-red-500") ? th.classList.remove("text-red-500") : th.classList.toggle("text-red-500")
    let likedCar = data.find(item => item.id == params)
    let index = wishList.indexOf(likedCar);
    th.classList.contains("text-red-500") ? wishList.push(likedCar) : wishList.splice(index,1) 
    localStorage.setItem("likedCars",JSON.stringify(wishList))
    if(!wishList.includes(likedCar))localStorage.setItem("likedCars",JSON.stringify(wishList))  
    localWishList()
}