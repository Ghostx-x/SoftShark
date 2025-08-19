import express from 'express';
import { dataSource } from './config/data-source';
import {User} from './entities/user.entity';
import {Repository} from "typeorm";
import userSchema from './validations/validations';


const app = express();
app.use(express.json());

let userRepo: Repository<User>;

dataSource.initialize()
    .then(() => {
        console.log("Connected to database");
        userRepo = dataSource.getRepository(User);
    })
    .catch((err) => {
        console.log("Error occurred while connecting to database", err);
    });

app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userRepo.findOne({ where: { id } });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err : any) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { name, profession, email, metadata } = req.body;
        const { value, error } = userSchema.validate({ name, profession, email, metadata });
        if (error) return res.status(400).json({ message: error.message });

        const user = userRepo.create(value);
        await userRepo.save(user);

        res.json(user);
    } catch (err: any) {
        if (err.code === '23505') return res.status(409).json({ message: 'Email already exists' });
        res.status(500).json({ message: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const { name, profession, email, metadata } = req.body;
        const { id } = req.params;

        const { value, error } = userSchema.validate({ name, profession, email, metadata });
        if (error) return res.status(400).json({ message: error.message });

        const result = await userRepo.update(id, value);
        if (result.affected === 0) return res.status(404).json({ message: 'User not found' });

        const updatedUser = await userRepo.findOneBy({ id});
        res.json(updatedUser);
    } catch (err: any) {
        if (err.code === '23505') return res.status(409).json({ message: 'Email already exists' });
        res.status(500).json({ message: err.message });
    }
});

app.patch('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userRepo.findOneBy({id : id})
        if(!user) return res.status(404).json({ message: "User not found" });

        const { value, error } = userSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        userRepo.merge(user, value)
        await userRepo.save(user);

        res.json(user);
    } catch (err : any) {
        if (err.code === '23505') return res.status(409).json({ message: 'Email already exists' });
        res.status(500).json({ message: err.message });
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await userRepo.delete(id);
        if (result.affected === 0) return res.status(404).json({ message: 'User not found' });

        res.json({ message: "User deleted" });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(8080, () => {
    console.log("Running on port 8080");
})