const axios = require('axios');

const axiosData = function () {
    axios.get('https://jsonplaceholder.typicode.com/users/')
    .then(response => {
        const users = response.data;
        users.forEach(user => {
        console.log("User's name - ", user.name," User's email - ", user.email)
    });
    })
    .catch(error => {
        console.log("Error ", error);
    })
}

module.exports = {axiosData}