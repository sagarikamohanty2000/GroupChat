const adminBtn = document.getElementById('admin');
const removeBtn = document.getElementById('remove');

const token = localStorage.getItem('token');
const groupId = localStorage.getItem('groupId');
const userId = localStorage.getItem('userId');

adminBtn.onclick = async function(event) {
    event.preventDefault();
    
    const obj = {
        groupId,
        userId
    }
    try {
       const response = await axios.put('http://localhost:3000/user/admin/',obj,{headers: {'Authorization' : token}});
         console.log(response);
         alert("The user is made admin of this group")
    }
    catch(err){
        alert("You are not an admin")
        console.log(err);
    }
}

removeBtn.onclick = async function(event){
    event.preventDefault();
    const obj = {
        groupId,
        userId
    }
    try{
        const response = await axios.delete(`http://localhost:3000/user/remove/${groupId}/${userId}`,{headers: {'Authorization' : token}});
        console.log(response)
        alert("The user is removed from the group")
    }
    catch(err){
        alert("You are not an admin")
        console.log(err)
    }
}