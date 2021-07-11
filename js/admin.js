window.addEventListener('DOMContentLoaded',() => {
   const GetFromdb = async (url) => {
                    const res = await fetch(url);

            if(!res.ok){
                throw new Error(`Failed to get fetch from ${url}, status: ${res.status}`);
            }

            return await res.json();
    }

    const phones = document.querySelector('.phones');

    class showPhones {
        constructor (phone, name, id) {
            this.phone = phone;
            this.name = name;
            this.id = id;
        }

        addToWorkspace() {
            phones.innerHTML += `<span>phone: ${this.phone}, user: ${this.name}, id: ${this.id}</span> <br>`
        }
    }

    

    function update () {
        setInterval(add, 1*1000)
    }
    
    const add = () => {
        phones.innerHTML = "";
        GetFromdb('http://localhost:3000/requests')
        .then(data => {
        data.forEach(({phone, name, id}) => {
           new showPhones(phone, name, id).addToWorkspace();
        });
    });
    }
    add();

    update();
    
})