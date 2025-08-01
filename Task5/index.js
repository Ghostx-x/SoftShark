// const express = require('express');
// const { v4: uuidv4 } = require('uuid');
// const { read, saveUsers } = require('./function');
// const path = require('path');
//
// const app = express();
//
// app.use((req, res, next) => {
//     if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
//         return res.status(415).json({ message: 'Content-Type must be application/json' });
//     }
//     next();
// });
// app.use(express.json());
//
// const usersPath = path.join(__dirname, 'users.json');
//
// app.get('/users/:id', async (req, res) => {
//     try {
//         const users = await read(usersPath);
//         let { id } = req.params;
//         const user = users[id];
//
//         if (!user) return res.status(404).json({ message: 'User not found' });
//
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
//
// app.post('/users', async (req, res) => {
//     try {
//         const { name, profession, email, metadata = {} } = req.body;
//
//         const users = await read(usersPath);
//         const id = uuidv4();
//         const newUser = { name, profession, email, ...metadata };
//
//         users[id] = newUser;
//
//         await saveUsers(usersPath, users);
//
//         res.json({ id, ...newUser });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
//
// app.put('/users/:id', async (req, res) => {
//     try {
//         const { name, profession, email, metadata } = req.body;
//         const users = await read(usersPath);
//
//         let { id } = req.params;
//         const user = users[id];
//         if (!user) return res.status(404).json({ message: 'User not found' });
//
//         users[id] = { name, profession, email, ...metadata };
//
//         await saveUsers(usersPath, users);
//
//         res.json({ id, ...users[id] });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
//
// app.patch('/users/:id', async (req, res) => {
//     try {
//         const { name, profession, email, metadata } = req.body;
//         const users = await read(usersPath);
//
//         let id = req.params.id;
//         const user = users[id];
//         if (!user) return res.status(404).json({ message: 'User not found' });
//
//         if (name) users[id].name = name;
//         if (email) users[id].email = email;
//         if (profession) users[id].profession = profession;
//         if (metadata) users[id] = { ...users[id], ...metadata };
//
//         await saveUsers(usersPath, users);
//
//         res.json({ id, ...users[id] });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
//
// app.delete('/users/:id', async (req, res) => {
//     try {
//         const users = await read(usersPath);
//
//         let id = req.params.id;
//         const user = users[id];
//         if (!user) return res.status(404).json({ message: 'User not found' });
//
//         delete users[id];
//
//         await saveUsers(usersPath, users);
//
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
//
// app.listen(8080, () => {
//     console.log("Running on port 8080");
// });
