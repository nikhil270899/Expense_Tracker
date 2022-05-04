// import { useState } from "react";
import ExpenseForm from "../expensesForm/ExpenseForm";
import "../expensesForm/AddedExpense.css";

const AddedExpense = (props) => {
  //   const [gotExpense, setGotExpense] = useState([]);
  const addedExpenses = (data) => {
    props.newExpense(data);
    // setGotExpense()
  };

  return (
    <div className="added-expense-form">
      <ExpenseForm showExpensesEntered={addedExpenses} />
    </div>
  );
};

export default AddedExpense;
