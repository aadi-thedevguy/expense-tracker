const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenses');

router.get('/', expenseController.getExpenses);
router.post('/add-expense', expenseController.addExpense);
router.delete('/:id', expenseController.deleteExpense);
router.put('/:id', expenseController.updateExpense);

module.exports = router;
