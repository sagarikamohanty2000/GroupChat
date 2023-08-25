const homePageBtn = document.getElementById('homepage');

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

const ulTag = document.getElementById('group-list');

homePageBtn.onclick = async function(event){
    event.preventDefault();
    window.location.href = "../views/homepage.html";
}

window.onload = (async () => {
    try{
        const response = await axios.get('http://localhost:3000/allgroups', {headers: {"Authorization" : token}});
        console.log(response.data);

        ulTag.innerHTML =''; 
        const datavalues = response.data.data[0].groups;
       for(let i=0; i<datavalues.length; i++)
       {
        console.log(datavalues[i].id);
        var list = document.createElement('li');
        var groupBtn = document.createElement('button');
        groupBtn.className="btn";
        groupBtn.appendChild(document.createTextNode(`${datavalues[i].groupName}`));
        groupBtn.onclick = (async () => {
            localStorage.setItem('groupId', datavalues[i].id);
            const groupId =datavalues[i].id; 
            const obj = {
                groupId,
                userId
            }
        
            try {
                    const response = await axios.post('http://localhost:3000/addUser',obj,{headers : {'Authorization' : token}})
                    console.log(response);
                    alert(`User is added to the ${datavalues[i].groupName} group`)
            }
            
            catch(err) {
                console.log(err.response.status);
                if(err.response.status === 400){
                    alert(`User is already part of ${datavalues[i].groupName} group`)
                }
                else {
                alert(`You are not admin of ${datavalues[i].groupName} group`)
            }
                
            }    
           })
           list.appendChild(groupBtn);
            ulTag.appendChild(list);
       }
       }
       catch(error) {
          console.log(error)
       }
})