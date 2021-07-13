function toDb () {
     //formToServer

     const forms = document.querySelectorAll('form');
     const message = {
         loading: "loading",
         succes: "succes",
         fail: "fail"
     }

     forms.forEach(item => {
         dataPost(item);
     })

     const postData = async (url, data) => {
         const res = await fetch(url, {
             method: 'POST',
             headers: {
                  'Content-type' : 'application/json'
             },
             body: data
         });
         return await res.json(); 
     } 

     function dataPost(form) {
         form.addEventListener('submit', (e) => {
             e.preventDefault();
             const statusMessage = document.createElement("div");
             statusMessage.classList.add("status");
             statusMessage.textContent = message.loading;
             form.append(statusMessage);
         const formdata = new FormData(form);
         const object = {};

         formdata.forEach(function(value, key){
             object[key] = value;
         });
         postData('http://localhost:3000/requests', JSON.stringify(object)) 
         .then( (data) => {
             console.log(data);
             statusMessage.textContent = message.succes;
             setTimeout(() => {statusMessage.remove()}, 2000);
         }).catch(() => {
             statusMessage.textContent = message.fail;
             setTimeout(() => {statusMessage.remove()}, 2000);
         }).finally( () =>{
             form.reset();
         })
         })
     }
}

module.exports = toDb;