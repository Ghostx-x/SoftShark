const express = require('express');
const app = express();

app.use(express.json());
let id = 0;
let users = [
    {id:1, name:'Maria', profession: 'hr manager'},
    {id:2, name:'Arsen', profession: 'back-end developer'},
]

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const newClient = {
        id: users.length + 1,
        name: req.body.name,
        profession: req.body.profession,
    };
    users.push(newClient);
})

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name;
    user.profession = req.body.profession;

    res.json(users);
});


app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    users.splice(index, 1);
    res.json(users);
});

app.listen(8080, () => {
    console.log('Running on port 8080');
});