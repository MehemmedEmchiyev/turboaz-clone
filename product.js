const params = new URLSearchParams(location.search)
const id = params.get("id")
const img = document.getElementById("img")
const h1 = document.querySelector("h1")
const priceCar = document.getElementById("priceCar")
const city = document.getElementById("city")
const title = document.querySelector("title")
const statue = document.getElementById("statue")
const carsAnchors2 = document.getElementById("carsAnchors2")
const details = document.getElementById("details")
console.log(price);

let product = data.find(item => item.id == id)

function showProduct(){
    console.log(product.price);
    
    title.innerHTML = `${product.brand} ${product.model}, ${product.engine} L, ${product.year} il, ${product.odometer} km`
    img.src = product.images
    h1.innerHTML = `${product.brand} ${product.model}, ${product.engine} L, ${product.year} il, ${product.odometer} km`;
    priceCar.innerHTML = `${product.price}, ${product.currency}`;
    city.innerHTML = `${product.city}`
    statue.innerHTML = product.credit ? `<span>Kretid var</span>` :
                       product.barter ? `<span>Barter var</span>` :
                       product.credit && product.price ? `<span>Kredit ve Barter var</span>` : '<span>Nəğd Ödəniş</span>'
}
showProduct()
showFooter()
showDetails()
function showFooter(){
    let kod = ''
    let footer = []
    data.map(item => footer.push(item.brand,item.model))
    let filtered = footer.reduce( (acc,item) => {
        acc[item] = (acc[item] || 0) + 1
        return acc
    },{})
    for (const key in filtered) {
        kod += `<a class="text-[#8D94AD] pr-[13px] pb-[13px] hover:text-[#CC212C]" href="">${key}(${filtered[key]})</a>`
    }
    carsAnchors2.innerHTML = kod
}


function showDetails(){
    details.innerHTML = 
    `
        <div><span class="text-[#9CA1B4] w-[120px] inline-block">Şəhər</span> <a href="">${product.city}</a> </div>
        <div><span class="text-[#9CA1B4] w-[120px] inline-block">Marka</span> <a href="">${product.brand} </a> </div>
        <div><span class="text-[#9CA1B4] w-[120px] inline-block">Model</span> <a href="">${product.model}</a> </div>
        <div><span class="text-[#9CA1B4] w-[120px] inline-block">Buraxılış ili</span> <a href="">${product.year}</a> </div>
        <div><span class="text-[#9CA1B4] w-[120px] inline-block">Ban Növü</span> <a href="">${product.banType}</a></div>
        <div><span class="text-[#9CA1B4] w-[120px] inline-block">Mühərrik</span> <a href="">${product.engine}</a> </div>
        <div><span class="text-[#9CA1B4] w-[120px] inline-block">Yürüş</span> <a href="">${product.odometer}</a> </div>
        <div><span class="text-[#9CA1B4] w-[120px] inline-block">Kredit</span> <a href="">${product.credit ? "Kredit Var" : "Kredit Yoxdur" }</a> </div>
        <div><span class="text-[#9CA1B4] w-[120px] inline-block">Barter</span> <a href="">${product.barter ? "Barter Var" : "Barter Yoxdur"}</a></div>
    `
}