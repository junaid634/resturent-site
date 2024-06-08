(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

let tax_togg = document.getElementById("flexSwitchCheckDefault");
tax_togg.addEventListener("click", ()=>{
    let tax_text = document.getElementsByClassName("tax");
   for(info of tax_text){
    if(info.style.display != "inline"){
        info.style.display = "inline";
    }else{
        info.style.display = "none";
    }
   }  
})
