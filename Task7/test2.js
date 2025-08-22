// const express = require('express');
// const { v4: uuidv4 } = require('uuid');
// const { read, saveUsers } = require('./function');
// const path = require('path');
// const userSchema = require('./validations')
// const Joi = require('joi');
// const BloomFilter = require('bloomfilter').BloomFilter;
//
// const app = express();
// app.use(express.json());
//
// const usersPath = path.join(__dirname, 'users.json');
// const emailsPath = path.join(__dirname, 'emails.json');
//
// const bloomFilter = new BloomFilter(1000000 * 8, 10);
// (async () => {
//     const users = await read(usersPath);
//     Object.values(users).forEach(user => bloomFilter.add(user.email));
// })();
//
// app.get('/users/:id', async (req, res) => {
//     try {
//         const users = await read(usersPath);
//         let { id } = req.params;
//         const user = users[id]
//         if (!user) return res.status(404).json({ message: 'User not found' });
//
//         res.json(users);
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
//         const emails = await read(emailsPath);
//
//         const id = uuidv4();
//         const newUser = { name, profession, email, ...metadata };
//
//         const { value, error } = userSchema.validate(newUser);
//         if (error) return res.status(400).json({ message: error.message });
//
//         if (emails[email]) return res.status(409).json({ message: 'Email already exists' });
//
//         users[id] = value;
//
//         emails[email] = id;
//
//         await saveUsers(usersPath, users);
//         await saveUsers(emailsPath, emails)
//
//         res.json({ id, ...value });
//
//
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
//
// app.put('/users/:id', async (req, res) => {
//     try {
//         const { name, profession, email, metadata } = req.body;
//         const users = await read(usersPath);
//         const emails = await read(emailsPath);
//
//         let { id } = req.params;
//         const user = users[id];
//
//         if (!user) return res.status(404).json({ message: 'User not found' });
//         const currentEmail = user.email;
//         if(email !== currentEmail && emails[email]) return res.status(409).json({ message: 'Email already exists' });
//
//         if (email !== currentEmail && bloomFilter.test(email) && Object.values(users).some(user => user.email === email)) {
//             return res.status(409).json({ message: 'Email already exists' });
//         }
//
//         users[id] = { name, profession, email, ...metadata };
//
//         if(email!==currentEmail) {
//             delete emails[currentEmail];
//             emails[email] = id;
//         }
//
//         const { value, error } = userSchema.validate(users[id]);
//         if (error) return res.status(400).json({ message: error.message });
//
//         if (email !== currentEmail) bloomFilter.add(email);
//
//         await saveUsers(usersPath, users);
//         await saveUsers(emailsPath, emails);
//
//         res.json({ id, ...value });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
//
// app.patch('/users/:id', async (req, res) => {
//     try {
//         const { name, profession, email, metadata } = req.body;
//         const users = await read(usersPath);
//         const emails = await read(emailsPath);
//
//         let id = req.params.id;
//         const user = users[id];
//
//         if (!user) return res.status(404).json({ message: 'User not found' });
//         const currentEmail = user.email;
//         if(email !== currentEmail && emails[email]) return res.status(409).json({ message: 'Email already exists' });
//
//         // if (email && email !== currentEmail && bloomFilter.test(email) && Object.values(users).some(user => user.email === email)) {
//         //     return res.status(409).json({ message: 'Email already exists' });
//         // }
//
//         if (name) users[id].name = name;
//         if (email) users[id].email = email;
//         if (profession) users[id].profession = profession;
//         if (metadata) users[id] = { ...users[id], ...metadata };
//
//         const { value, error } = userSchema.validate(users[id]);
//         if (error) return res.status(400).json({ message: error.message });
//
//         if(email!==currentEmail && email) {
//             delete emails[currentEmail];
//             emails[email] = id;
//         }
//         // if (email && email !== currentEmail) bloomFilter.add(email);
//
//         await saveUsers(usersPath, users);
//         await saveUsers(emailsPath, emails)
//
//         res.json({ id, ...value });
//
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
//
// app.delete('/users/:id', async (req, res) => {
//     try {
//         const users = await read(usersPath);
//         const emails = await read(emailsPath);
//
//         let id = req.params.id;
//         const user = users[id];
//         if (!user) return res.status(404).json({ message: 'User not found' });
//
//         const email = users[id].email;
//         delete emails[email];
//         delete users[id];
//
//         await saveUsers(usersPath, users);
//         await saveUsers(emailsPath, emails);
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
//
//
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const userSchema = require('./validations');
const app = express();
app.use(express.json());
const usersDir = path.join(__dirname, 'users');
const getUserById = async (id) => {
    try {
        const file = await fs.readFile(path.join(usersDir, `id_${id}.json`), 'utf-8');
        return JSON.parse(file);
    } catch {
        return null;
    }
};
const getUserByEmail = async (email) => {
    try {
        const file = await fs.readFile(path.join(usersDir, `email_${email}.json`), 'utf-8');
        const { id } = JSON.parse(file);
        return await getUserById(id);
    } catch {
        return null;
    }
};
const saveUser = async (id, email, data) => {
    await fs.writeFile(path.join(usersDir, `id_${id}.json`), JSON.stringify(data, null, 2));
    await fs.writeFile(path.join(usersDir, `email_${email}.json`), JSON.stringify({ id }));
};
// POST Create User
app.post('/users', async (req, res) => {
    try {
        const { name, email, profession, metadata = {} } = req.body;
        if (await getUserByEmail(email)) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        const id = uuidv4();
        const newUser = { name, email, profession, ...metadata };
        const { error, value } = userSchema.validate(newUser);
        if (error) return res.status(400).json({ message: error.message });
        await saveUser(id, email, value);
        res.status(201).json({ id, ...value });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// GET by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// DELETE user
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await fs.unlink(path.join(usersDir, `id_${req.params.id}.json`));
        await fs.unlink(path.join(usersDir, `email_${user.email}.json`));
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.listen(8080, () => {
    console.log('Server running on port 8080');
});