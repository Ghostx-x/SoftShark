const express = require('express');
const { v4: uuidv4 } = require('uuid');
const userSchema = require('./validations/validations');
const Joi = require('joi');

const app = express();
app.use(express.json());

const pool = require('./config/db');


app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('SELECT id, name, email, profession, metadata FROM users WHERE id=$1', [id])
        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { name, profession, email, metadata} = req.body;
        const id = uuidv4()
        const {value, error} = userSchema.validate({ name, profession, email, ...metadata })
        if(error) return res.status(400).json({message : error.message});

        await pool.query('INSERT INTO users(id, name, profession, email, metadata) VALUES ($1, $2, $3, $4, $5)',
            [id,value.name, value.profession, value.email, JSON.stringify(metadata) ])

        res.json({ id, ...value });
    } catch (err){
        if (err.code === '23505') return res.status(409).json({ message: 'Email already exists' });
        res.status(500).json({message: err.message});
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const { name, profession, email, metadata} = req.body;
        const { id } = req.params;

        const { value, error } = userSchema.validate({ name, profession, email, ...metadata });
        if (error) return res.status(400).json({ message: error.message });

        const { rows } = await pool.query('UPDATE users SET name=$1, profession = $2, email=$3, metadata=$4 WHERE id=$5',
            [value.name, value.profession, value.email, JSON.stringify(metadata), id])
        if (rows === 0) return res.status(404).json({ message: 'User not found' });


        res.json({ id, ...value });
    } catch (err) {
        if (err.code === '23505') return res.status(409).json({ message: 'Email already exists' });
        res.status(500).json({ message: err.message });
    }
});

app.patch('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, profession, email, metadata } = req.body;

        const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (profession !== undefined) updateData.profession = profession;
        if (email !== undefined) updateData.email = email;
        if (metadata !== undefined) updateData.metadata = metadata;

        const { value, error } = userSchema.validate(updateData);
        if (error) return res.status(400).json({ message: error.message });

        const user = rows[0];
        const updatedUser = {
            name: value.name !== undefined ? value.name : user.name,
            profession: value.profession !== undefined ? value.profession : user.profession,
            email: value.email !== undefined ? value.email : user.email,
            metadata: value.metadata !== undefined ? value.metadata : user.metadata
        };

        await pool.query(
            'UPDATE users SET name=$1, profession=$2, email=$3, metadata=$4 WHERE id=$5',
            [value.name, value.profession, value.email, JSON.stringify(updatedUser.metadata), id]
        );

        res.json({ id, ...value });
    } catch (err) {
        if (err.code === '23505') return res.status(409).json({ message: 'Email already exists' });
        res.status(500).json({ message: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount} = await pool.query('DELETE FROM users WHERE id = $1', [id])
        if (rowCount === 0 ) return res.status(404).json({ message: 'User not found' });
        const { rows: users } = await pool.query('SELECT * FROM users');
        res.json({ users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(8080, () => {
    console.log("Running on port 8080");
});