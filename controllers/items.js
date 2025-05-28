const { getDb } = require('../data/database');
const { ObjectId } = require('mongodb');

// 全てのアイテム取得
const getAll = async (req, res) => {
    try {
        const db = getDb();
        const items = await db.collection('items').find().toArray();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
};

const createItem = async (req, res) => {
    try {
        const newItem = req.body;

        // バリデーション追加
        if (!newItem.name || !newItem.price || !newItem.description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (typeof newItem.price !== 'number') {
            return res.status(400).json({ error: 'Price must be a number' });
        }

        const db = getDb();
        const result = await db.collection('items').insertOne(newItem);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create item' });
    }
};

// IDでアイテム取得
const getItemById = async (req, res) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const item = await db.collection('items').findOne({ _id: new ObjectId(id) });

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
};

// PUT
const updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, price, description } = req.body;

        if (!name || !price || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const db = getDb();
        const result = await db.collection('items').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, price, description } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ error: 'Failed to update item' });
    }
};

// IDでアイテム削除
const deleteItem = async (req, res) => {
    try {
        const db = getDb();
        const id = new ObjectId(req.params.id);
        const result = await db.collection('items').deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
};

module.exports = {
    getAll,
    createItem,
    getItemById,
    updateItem,
    deleteItem,
};