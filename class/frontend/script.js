function toggle() {
    var element = document.getElementById('hideshow1');
    var buttonElement = document.getElementsByClassName('toggler')[0];
    if (element.style.display == 'none') {
        element.style.display = 'block';
        buttonElement.innerHTML = 'Hide';
    } else {
        element.style.display = 'none';
        buttonElement.innerHTML = 'Show';
    }
}

async function getResponse (userMessage) {

    try {
        const ENDPOINT = "http://localhost:4000/chat";

        const response = await fetch(ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({ userMessage })
            
        })

        if (!response.ok) {
            throw new Error('Oops, something went wrong :(')
        }

        const { message } = await response.json();
        return message;
        
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const chatForm = document.querySelector('form');

chatForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const formData = new FormData(chatForm);
    const userMessage = formData.get('user-input');

    const responseMessage = await getResponse(userMessage);

    const responsePara = document.createElement('p');

    const userPara = document.createElement('p');
    userPara.textContent = userMessage;
    responsePara.textContent = responseMessage;
    
    const chatDiv = document.getElementById('chat');
    chatDiv.appendChild(userPara);
    chatDiv.appendChild(responsePara);
    
    return;
})