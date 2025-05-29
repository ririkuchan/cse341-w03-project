const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// すべてのユーザーを取得
router.get('/', usersController.getAllUsers);

// IDで1人取得
router.get('/:id', usersController.getUserById);

// ユーザー作成
router.post('/', usersController.createUser);

// ユーザー更新
router.put('/:id', usersController.updateUser);

// ユーザー削除
router.delete('/:id', usersController.deleteUser);

module.exports = router;
