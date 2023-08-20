const sendBtn = document.getElementById('submit');
const token = localStorage.getItem('token');
const ulTag = document.getElementById('message-list');

sendBtn.onclick = async function(event)
{
    event.preventDefault();
    const msg = document.getElementById('message').value;
    obj = {
        msg
    }

    try{
    const response = await axios.post('http://localhost:3000/message/', obj, {headers: {'Authorization' : token}});
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
    const response = await axios.get('http://localhost:3000/message/',{headers: {'Authorization' : token}})
     showMessageWindowOnLoad(response.data);
    }

    catch(err){
        console.log(err);
    }
})

function showMessageWindowOnLoad(obj){
   
    console.log(obj);
   // ulTag.innerHTML='';
    for(var i = 0; i<obj.msg.length; i++)
    {
        for(var j=0; j<obj.user.length; j++)
        {   if(obj.msg[i].userId === obj.user[j].id )
            {
                if(obj.user[j].id === obj. currentUser)
                {
                    var list = document.createElement('li');
                    list.className="list-group-item";
                    list.id=`${obj.msg[i].id}`;
                
                    //Data ShowCased on the screen
                    list.textContent =  "You : "+ obj.msg[i].msg;
                    ulTag.appendChild(list);
                }
                else
                 {
                    var list = document.createElement('li');
                    list.className="list-group-item";
                    list.id=`${obj.msg[i].id}`;
                
                    //Data ShowCased on the screen
                    list.textContent = obj.user[j].name +" : "+ obj.msg[i].msg;
                    ulTag.appendChild(list);
                }
            }
        }   
        
    }
}