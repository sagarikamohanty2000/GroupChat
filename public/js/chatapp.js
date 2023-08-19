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
   list.textContent = obj.msg;

   ulTag.appendChild(list);
   
}

window.onload = (async () => {
    try{
    const response = await axios.get('http://localhost:3000/message/',{headers: {'Authorization' : token}})
     showMessageWindowOnLoad(response.data.msg);
    }

    catch(err){
        console.log(err);
    }
})

function showMessageWindowOnLoad(obj){
   
   // ulTag.innerHTML='';
    for(var i = 0; i<obj.length; i++)
    {
        var list = document.createElement('li');
        list.className="list-group-item";
        list.id=`${obj[i].id}`;
     
        //Data ShowCased on the screen
        list.textContent = obj[i].msg;
     
        ulTag.appendChild(list);
        
    }
}