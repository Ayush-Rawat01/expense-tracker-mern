
const router = require("express").Router();
const {addExpense,fetchExpense,deleteExpense} = require("../Controllers/ExpenseController");

router.get('/',fetchExpense);
router.post('/',addExpense);
router.delete('/:expenseId',deleteExpense)

module.exports = router;