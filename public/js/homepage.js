const allGroupsBtn = document.getElementById('allGroups');
const createGroupBtn = document.getElementById('createGroup');

const token = localStorage.getItem('token');
const ulTag = document.getElementById('group-list');

allGroupsBtn.onclick = async function (event) {
    try{
        const response = await axios.get('http://localhost:3000/allgroups', {headers: {"Authorization" : token}});
        //console.log(response.data);

        ulTag.innerHTML =''; 
        const datavalues = response.data.data[0].groups;
       for(let i=0; i<datavalues.length; i++)
       {
        console.log(datavalues[i].id);
        var list = document.createElement('li');
        var groupBtn = document.createElement('button');
        groupBtn.appendChild(document.createTextNode(`${datavalues[i].groupName}`));
        groupBtn.onclick = (async () => {
            
            try{
                    console.log("inside groupBtn"+i);
                   console.log(`${datavalues[i].id}`);
                    window.location.href = "../views/chatapp.html";
                    // try
                 localStorage.setItem('groupId', datavalues[i].id);
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
       catch(error) {
          console.log(error)
       }
}



createGroupBtn.onclick = async function(event)
{
    event.preventDefault();
    window.location.href = "../views/chat_group.html";
}