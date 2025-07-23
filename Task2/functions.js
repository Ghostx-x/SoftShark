async function fetchUsers() {
    const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/');
    const users = await userResponse.json();
    // const userName = user.name;
    // const userEmail = user.email;

    users.forEach(user => {
        console.log("User's name - ", user.name," User's email - ", user.email)
    });
    
}

export {fetchUsers};


// const axios = require('axios');

// axios.get('https://jsonplaceholder.typicode.com/users/')