
const submitBtn = document.querySelector('#submit-btn')

submitBtn.addEventListener('click', async(e)=> {
    e.preventDefault()

    const nameInput = document.querySelector('#name')
    const emailInput = document.querySelector('#email')
    const phoneInput = document.querySelector('#phone')
    const messageInput = document.querySelector('#message')


    const name  = nameInput.value.trim();
    const email  = emailInput.value.trim();
    const phone  = phoneInput.value.trim();
    const message  = messageInput.value.trim();

    if(!name || !email || !phone || !message){
        alert('All Fields are required');
        return;
    }

    const formData = { name, email, phone, message};

    const apiUrl = 'http://localhost:5000/api/contact'

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        });

        if(response.ok) {
            alert('Message sent successfully!');

            nameInput.value = '';
            emailInput.value = '';
            phoneInput.value =  '';
            messageInput.value = '';
        }else {
            const error = await response.json();
            alert(`failed to send the message : ${error.message || 'unknown error'}`)

        }

    }catch (error){
            alert(`An error occurred : ${error.message}`);
    }
})
