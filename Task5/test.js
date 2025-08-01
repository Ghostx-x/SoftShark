const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { read, saveUsers } = require('./function');
const path = require('path');
const userSchema = require('./validations');
const Joi = require('joi');

const app = express();
app.use(express.json());

const usersPath = path.join(__dirname, 'users.json');

app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await read(usersPath);
        const user = data.users[id];
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ name: user.name, email: user.email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { name, profession, email, metadata = {}} = req.body;
        const id = uuidv4()
        const newUser = { name, profession, email, ...metadata};
        const {value, error} = userSchema.validate(newUser)
        if(error) return res.status(400).json({message : error.message});
        const data = await read(usersPath);
        if (data.emails[email]) return res.status(409).json({message: "email already exists"});
        data.users[id] = value;
        data.emails[email] = id;
        await saveUsers(usersPath, data);
        res.json({id, ...value});
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const { name, profession, email, metadata} = req.body;
        const { id } = req.params;
        const data = await read(usersPath);
        const user = data.users[ id];
        if (!user) return res.status(404).json({ message: 'User not found' });
        const currentEmail = user.email;
        if (email !== currentEmail && data.emails[email]) return res.status(409).json({ message: 'Email already exists' });
        data.users[id] = { name, profession, email, ...metadata };
        const { value, error } = userSchema.validate(data.users[id]);
        if (error) return res.status(400).json({ message: error.message });
        if (email !== currentEmail) {
            delete data.emails[currentEmail];
            data.emails[email] = id;
        }
        await saveUsers(usersPath, data);
        res.json({ id, ...value });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.patch('/users/:id', async (req, res) => {
    try {
        const { name, profession, email, metadata } = req.body;
        const { id } = req.params;
        const data = await read(usersPath);
        const user = data.users[id];
        if (!user) return res.status(404).json({ message: 'User not found' });
        const currentEmail = user.email;

        if (email && email !== currentEmail && data.emails[email]) return res.status(409).json({ message: 'Email already exists' });
        if (name) data.users[id].name = name;
        if (email) data.users[id].email = email;
        if (profession) data.users[id].profession = profession;
        if (metadata) data.users[id] = { ...data.users[id], ...metadata };
        const { value, error } = userSchema.validate(data.users[id]);
        if (error) return res.status(400).json({ message: error.message });
        if (email && email !== currentEmail) {
            delete data.emails[currentEmail];
            data.emails[email] = id;
        }
        await saveUsers(usersPath, data);
        res.json({ id, ...value });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await read(usersPath);
        const user = data.users[id];
        if (!user) return res.status(404).json({ message: 'User not found' });
        const email = user.email;
        delete data.emails[email];
        delete data.users[id];
        await saveUsers(usersPath, data);
        res.json(data.users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(8080, () => {
    console.log("Running on port 8080");
});