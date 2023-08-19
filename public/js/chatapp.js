const sendBtn = document.getElementById('submit');
const token = localStorage.getItem('token');

sendBtn.onclick = async function(event)
{
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
}