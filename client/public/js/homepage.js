

const allGroupsBtn = document.getElementById('allGroups');
const createGroupBtn = document.getElementById('createGroup');
const allUsersBtn = document.getElementById('Users');
const logoutBtn = document.getElementById('logout');


const token = localStorage.getItem('token');
const ulTag = document.getElementById('group-list');
const ulUserTag = document.getElementById('user-list');

allGroupsBtn.onclick = async function (event) {
    try{
        const response = await axios.get('http://localhost:3000/allgroups', {headers: {"Authorization" : token}});
        console.log(response.data);

        ulTag.innerHTML =''; 
        const datavalues = response.data.data[0].groups;
        if(datavalues.length === 0)
        {
            var list = document.createElement('li');
            list.textContent = "No groups";
            ulTag.appendChild(list);

        }
        else {
       for(let i=0; i<datavalues.length; i++)
       {
        console.log(datavalues[i].id);
        var list = document.createElement('li');
        var groupBtn = document.createElement('button');
        groupBtn.className="btn";
        groupBtn.appendChild(document.createTextNode(`${datavalues[i].groupName}`));
        groupBtn.onclick = (async () => {
            
            try{
                    console.log("inside groupBtn"+i);
                   console.log(`${datavalues[i].id}`);
                    window.location.href = "../views/chatapp.html";
                    // try
                 localStorage.setItem('groupId', datavalues[i].id);
                 localStorage.setItem('groupName',datavalues[i].groupName);
                    // console.log(response);
                    // }
                    // catch(error) {
                    //    console.log(error)
                    // }
            }
            catch(err) {
                console.log(err);
            }    
           })
           list.appendChild(groupBtn);
            ulTag.appendChild(list);
       }
    }
       }
       catch(error) {
          console.log(error)
       }
}

allUsersBtn.onclick = async function( event) {
    try{
        const response = await axios.get('http://localhost:3000/user/', {headers: {"Authorization" : token}});
        console.log("Users : " ,response.data.data);

        ulUserTag.innerHTML =''; 
        const datavalues = response.data.data;
       for(let i=0; i<datavalues.length; i++)
       {
        console.log(datavalues[i].id);
        var list = document.createElement('li');
        var userBtn = document.createElement('button');
        userBtn.className = 'btn';
        userBtn.appendChild(document.createTextNode(`${datavalues[i].name}`));
        userBtn.onclick = (async () => {
            
            try{
                    console.log("inside groupBtn"+i);
                   console.log(`${datavalues[i].id}`);
                    window.location.href = "../views/adduser.html";
                    localStorage.setItem('userId',datavalues[i].id);
                    // try
                    // console.log(response);
                    // }
                    // catch(error) {
                    //    console.log(error)
                    // }
            }
            catch(err) {
                console.log(err);
            }    
           })
           list.appendChild( userBtn);
            ulUserTag.appendChild(list);
       }
       }
       catch(error) {
          console.log(error)
       }
}


createGroupBtn.onclick = async function(event)
{
    event.preventDefault();
    window.location.href = "../views/creategroup.html";
}

logoutBtn.onclick = async function(event){
    localStorage.clear();
    event.preventDefault();
  
     window.location.href="../views/login.html"
}