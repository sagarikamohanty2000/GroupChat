const sendBtn = document.getElementById('submit');
const homePageBtn = document.getElementById('homepage');
const allUserBtn = document.getElementById('allUsers');

const token = localStorage.getItem('token');
const ulTag = document.getElementById('message-list');
const ulUserTag = document.getElementById('user-list');
const groupId = localStorage.getItem('groupId');

sendBtn.onclick = async function(event)
{
    event.preventDefault();
    const msg = document.getElementById('message').value;
    obj = {
        msg,
        groupId
    }

    try{
        
    const response = await axios.post('http://localhost:3000/message/', obj, {headers: {'Authorization' : token}});
    console.log("Group id >>>>>>>>"+groupId)
    console.log(response);
    }

    catch(err) {
        console.log(err);
    }
    showMessagesOnScreen(obj);
}

const showMessagesOnScreen =  function(obj) {
    var list = document.createElement('li');
   list.className="list-group-item";
   list.id=`${obj.id}`;


   //Data ShowCased on the screen
   list.textContent = "You : " + obj.msg;

   ulTag.appendChild(list);
   
}

window.onload = (async () => {
    try{
    const response = await axios.get(`http://localhost:3000/message/${groupId}`,{headers: {'Authorization' : token}})
    console.log("Group id >>>>>>>>"+response)
     showMessageWindowOnLoad(response.data);
    }

    catch(err){
        console.log(err);
    }
})

function showMessageWindowOnLoad(obj){
   
    console.log(obj.msg);
   // ulTag.innerHTML='';
    for(var i = 0; i<obj.msg.length; i++)
    {
        for(var j=0; j<obj.user[0].users.length; j++)
        {   if(obj.msg[i].userId === obj.user[0].users[j].id )
            {
                if(obj.user[0].users[j].id === obj. currentUser)
                {
                    var list = document.createElement('li');
                    list.className="list-msg-item";
                    list.id=`${obj.msg[i].id}`;
                
                    //Data ShowCased on the screen
                    list.textContent =  "You : "+ obj.msg[i].msg;
                    ulTag.appendChild(list);
                }
                else
                 {
                    var list = document.createElement('li');
                    list.className="list-msg-item";
                    list.id=`${obj.msg[i].id}`;
                
                    //Data ShowCased on the screen
                    list.textContent = obj.user[0].users[j].name +" : "+ obj.msg[i].msg;
                    ulTag.appendChild(list);
                }
            }
        }   
        
    }
}

homePageBtn.onclick = async function(event){
    event.preventDefault();
    window.location.href = "../views/homepage.html";
}

allUserBtn.onclick = async function(event) {

    try{
    const response = await axios.get(`http://localhost:3000/user/${groupId}`,{headers: {'Authorization' : token}});
    console.log(response.data.data[0].users);

    ulUserTag.innerHTML =''; 
    const datavalues = response.data.data[0].users;
   for(let i=0; i<datavalues.length; i++)
   {
    console.log(datavalues[i].id);
    var list = document.createElement('li');
    list.className = ('list-user')
    var userBtn = document.createElement('button');
    userBtn.className = 'btn width: 30px';
    userBtn.appendChild(document.createTextNode(`${datavalues[i].name}`));
    userBtn.onclick = (async () => {
        
        try{
               window.location.href = "../views/user.html";
               localStorage.setItem('userId', datavalues[i].id);
            
        }
        catch(err) {
            console.log(err);
        }    
       })
       list.appendChild(userBtn);
       ulUserTag.appendChild(list);
   }
   }
   catch(error) {
      console.log(error)
   }
}
