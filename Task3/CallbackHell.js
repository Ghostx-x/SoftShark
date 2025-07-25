function fetchUser(userId, callback) {
    setTimeout(() => {
        callback(null, { id: userId, name: "Alice Smith", email: "alice@example.com" });
    }, 1000);
}

function displayUser(err, user) {
    const display = document.getElementById("userInfo")
    if(err){
        console.log("Error ", err);
        display.innerHTML = "Error displaying";
        return;
    }
    
    display.innerHTML = `User Name ${user.name} <br> User email ${user.email}`
}
fetchUser(1, displayUser);