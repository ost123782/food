function modal () {
    const modal = document.querySelector('.modal'),
          modalBtn = document.querySelectorAll('[data-modal]'),
          modalClose = document.querySelector('.modal__close');


        function addModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        function remModal(){
            modal.style.display = 'none';
            document.body.style.overflow = 'visible';
        }

        function addtimeModal(){
            if(modal.style.display === 'block'){
                clearInterval(timeModal);
            } else {
                addModal();
            }
        }

        modalBtn.forEach( (btn) => {
            btn.addEventListener('click', () => {
                addModal();
            });
        });

        modalClose.addEventListener('click', () => {
            remModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal){
                remModal();
            }
        });

        modal.addEventListener('wheel', (e) => {
            if (e.target === modal){
                remModal();
            }
        });

        function addScrollModal () {
            if(window.pageYOffset + document.documentElement.clientHeight == document.documentElement.scrollHeight){
                addModal();
                window.removeEventListener("scroll", addScrollModal);
            }
        }

        // const timeModal = setTimeout(addtimeModal, 3000);
        

        window.addEventListener('scroll', addScrollModal);

}


module.exports = modal;