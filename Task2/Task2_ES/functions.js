async function fetchUsers() {
    try{
    const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/');
    const users = await userResponse.json();

    users.forEach(user => {
        console.log("User's name - ", user.name," User's email - ", user.email)
    });}
    
    catch{
        console.log("Error ", error);
    }
    
}

export {fetchUsers};

