const dotenv = require("dotenv");
const sendMail = require("../helpers/SendMail");
const Expense = require("../models/Expense");
dotenv.config();

var emailAlreadySent = false; // Track if email has been sent

const expenseEmail = async () => {
  const expenses = await Expense.find({});
  const totalExpense = expenses.reduce(
    (acc, expense) => acc + expense.value,
    0
  );

  if (totalExpense > 10000 && !emailAlreadySent) {
    let messageoption = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "Warning",
      text: `Your total expense is over $10000. Please review your expenses.`
    };

    await sendMail(messageoption);
    emailAlreadySent = true; 
    
  } else if (totalExpense <= 10000) {
    emailAlreadySent = false; // Reset flag when expense goes below 10000
  }
};


module.exports = {
  expenseEmail,
};
