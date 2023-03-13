const Expense = require("../models/expense");

exports.addExpense = (req, res) => {
  const { amount, desc, category } = req.body;
  Expense.create({
    amount,
    desc,
    category,
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getExpenses = (req, res) => {
  Expense.findAll({
    where : { userId : req.user.id }
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.deleteExpense = (req, res) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((expense) => expense.destroy())
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.updateExpense = (req, res) => {
  const id = req.params.id;
  // console.log(id)
  Expense.update(
    {
      amount: req.body.amount,
      desc: req.body.desc,
      category: req.body.category,
      userId : req.body.userId
    },
    {
      where: { id: id },
    }
  )
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
