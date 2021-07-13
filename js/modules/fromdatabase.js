function fromDb () {
     //db 

     const getFromDb = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Failed to get fetch from ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    const conMenu = document.querySelector('#conMenu');

    class newElement {
        constructor(title, description, price, sorc, alt){
            this.title = title;
            this.description = description;
            this.price = price;
            this.sorc = sorc;
            this.alt = alt;
        }

        addToPage(){
            conMenu.innerHTML += `<div class="menu__item">
    <img src=${this.sorc} alt=${this.alt}>
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">${this.description}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div>
</div>`;
        }
    }


   getFromDb('http://localhost:3000/menu')
   .then(data => {
       data.forEach(({title, descr, price, img, altimg}) => {
           new newElement(title, descr, price, img, altimg).addToPage();
       });
   });
}


module.exports = fromDb;