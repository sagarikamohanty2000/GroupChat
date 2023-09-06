
const submitBtn = document.getElementById('submit-create');
const loginPageBtn = document.getElementById('LoginPage');

submitBtn.onclick = async function(event)    
{
    event.preventDefault();
            alert("The form is submited");
            var femail = document.getElementById('femail').value;

            var obj ={
                femail
            }
            try {         
             const response = await axios.post("http://localhost:3000/password/forgotpassword", obj,);
             console.log(response)
           
            }
             catch(err)  {
             console.log(err)};
}

loginPageBtn.onclick = async function(event){
    event.preventDefault();
    window.location.href = "../views/login.html";
}
