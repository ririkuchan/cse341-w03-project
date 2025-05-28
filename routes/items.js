const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items');

// すべてのアイテムを取得
router.get('/', itemsController.getAll);

// 新しいアイテムを追加
router.post('/', itemsController.createItem);

// 特定のIDのアイテムを取得
router.get('/:id', itemsController.getItemById);

// 特定のIDのアイテムを更新
router.put('/:id', itemsController.updateItem);

// 特定のIDのアイテムを削除
router.delete('/:id', itemsController.deleteItem);

module.exports = router;