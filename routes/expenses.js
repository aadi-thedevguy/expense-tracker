const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth')

const expenseController = require('../controllers/expenses');

router.get('/',protect, expenseController.getExpenses);
router.post('/add-expense',protect, expenseController.addExpense);
router.delete('/:id',protect, expenseController.deleteExpense);
router.put('/:id',protect, expenseController.updateExpense);

module.exports = router;
