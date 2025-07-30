const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { read, saveUsers } = require('./function');
const app = express();

app.use(express.json());

let users = [];

// app.get('/users', (req, res) => {
//     res.json(users);
// });
//
app.get('/users', (req, res) => {
    // let arr = [];
    // users.forEach( user => {
    //     arr.push(user.name, user.email)
    // })
    // res.json(arr);

    const mapped = users.map(user => ({name:user.name, email:user.email}));
    res.json(mapped);

});
app.post('/users', (req, res) => {
    const { profession, name, email, metadata} = req.body;
    const generatedID = uuidv4();
    const newClient = {
        id: generatedID,
        name:name,
        profession: profession,
        email: email,
        ...metadata
    };
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(409).json({ message: 'Error: Write another email' });
    }

    users.push(newClient);
    saveUsers(users)
    res.json(users)
})


app.patch('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, profession, metadata } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (profession !== undefined) user.profession = profession;

    saveUsers(users);
    res.json(users);
});




app.put('/users/:id', (req, res) => {
    const { profession, name, email } = req.body;
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(409).json({ message: 'Error: Write another email' });
    }

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