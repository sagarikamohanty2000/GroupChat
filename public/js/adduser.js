const homePageBtn = document.getElementById('homepage');
const adduserBtn = document.getElementById('submit-add');

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

adduserBtn.onclick = async function(event){
    event.preventDefault();
    const groupName = document.getElementById('fname').value;

   const obj = {
        groupName,
        userId
    }
    try {
        const response = await axios.post('http://localhost:3000/addUser',obj,{headers : {'Authorization' : token}})
        console.log(response);
        alert(`User is added to the ${groupName} group`)
    }

    catch(err) {
        console.log(err);
    }
}

homePageBtn.onclick = async function(event){
    event.preventDefault();
    window.location.href = "../views/homepage.html";
}