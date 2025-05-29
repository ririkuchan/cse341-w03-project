const { getDb } = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all users
const getAllUsers = async (req, res) => {
    try {
        const db = getDb();
        const users = await db.collection('users').find().toArray();
        res.status(200).json(users);
    } catch {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// GET user by ID
const getUserById = async (req, res) => {
    try {
        const db = getDb();
        const id = new ObjectId(req.params.id);
        const user = await db.collection('users').findOne({ _id: id });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch {
        res.status(500).json({ error: 'Invalid ID' });
    }
};

// POST user
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        // バリデーション
        if (!name || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const db = getDb();
        const result = await db.collection('users').insertOne({ name, email });
        res.status(201).json(result);
    } catch {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// PUT user
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const db = getDb();
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, email } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(result);
    } catch {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// DELETE user
const deleteUser = async (req, res) => {
    try {
        const db = getDb();
        const id = new ObjectId(req.params.id);
        const result = await db.collection('users').deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
