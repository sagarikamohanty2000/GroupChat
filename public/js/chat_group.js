const createBtn = document.getElementById('submit-create');

const token = localStorage.getItem('token');

createBtn.onclick = async function(event){
    event.preventDefault();
    const groupName = document.getElementById('fname').value;

   const obj = {
        groupName
    }
    try {
        const response = await axios.post('http://localhost:3000/createGroup',obj,{headers : {'Authorization' : token}})
        localStorage.setItem('groupName', groupName);
        console.log(response);
    }

    catch(err) {
        console.log(err);
    }
}

