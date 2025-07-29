const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const filePath = path.join(__dirname, 'users.json');

app.use(express.json());

async function read() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error ', err.message);
        return [];
    }
}


async function saveUsers(users) {
    try {
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Error saving users:', err.message);
    }
}


// function read() {
//     const data = fs.readFileSync(filePath);
//     return JSON.parse(data);
// }
//
// function saveUsers(users) {
//     fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
// }

let users = [];



app.get('/users', (req, res) => {
    res.json(users);
});

//TODO add email to user, which must be unique
app.post('/users', (req, res) => {
    // if user with same email exists needs to return an error
    const { profession, name, email } = req.body;
    const generatedID = uuidv4();
    const newClient = {
        id: generatedID,// TODO use UUID lib to generate id
        name:name,
        profession: profession,
        email: email,
    };


    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(409).json({ message: 'Error: Write another email' });
    }

    users.push(newClient);
    saveUsers(users)
    res.json(users)
})



//TODO add patch method, explain what is the difference between patch and put


app.patch('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, profession } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (profession !== undefined) user.profession = profession;

    saveUsers(users);
    res.json(users);
});




app.put('/users/:id', (req, res) => {
    const { profession, name, email } = req.body;
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name;
    user.profession = profession;
    user.email = email;

    saveUsers(users)
    res.json(users);
});


app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    users.splice(index, 1);
    saveUsers(users)
    res.json(users);
});

async function start() {
    users = await read();
    app.listen(8080, () => {
        console.log('Running on port 8080');
    });
}

start();