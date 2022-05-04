import { useEffect, useState } from "react";
import "../expensesForm/ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredDetails, setEnteredDetails] = useState({
    expenseName: "",
    amount: "",
    spentBy: "",
    date: "",
  });

  const [valid, setValid] = useState("");

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Testing");

      setValid(enteredDetails.expenseName.includes("a"));
    }, 500);
    console.log(identifier);

    return () => {
      console.log("Clean up function");
      clearTimeout(identifier);
    };
  }, [enteredDetails.expenseName]);
  const setExpenseName = (e) => {
    setEnteredDetails({
      ...enteredDetails,
      expenseName: e.target.value,
    });
  };
  const setExpeneseAmount = (e) => {
    setEnteredDetails({
      ...enteredDetails,
      amount: e.target.value,
    });
  };
  const setExpenseDate = (e) => {
    setEnteredDetails({
      ...enteredDetails,
      date: e.target.value,
    });
  };
  const setExpenseSpentBy = (e) => {
    setEnteredDetails({
      ...enteredDetails,
      spentBy: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !enteredDetails.expenseName ||
      !enteredDetails.amount ||
      !enteredDetails.date ||
      !enteredDetails.spentBy
    )
      return;
    const detailsEntered = {
      name: enteredDetails.expenseName,
      amount: enteredDetails.amount,
      date: enteredDetails.date,
      spentBy: enteredDetails.spentBy,
    };

    // const add = [...details];
    const details = [
      {
        id: Math.floor(Math.random() * 100),
        ...detailsEntered,
      },
    ];

    props.showExpensesEntered([...details]);

    setEnteredDetails({
      expenseName: "",
      amount: "",
      spentBy: "",
      date: "",
    });
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      <div className="expense-form">
        <label>Expense Name:</label>
        <input
          type="text"
          value={enteredDetails.expenseName}
          onChange={setExpenseName}
        />
      </div>
      <div className="expense-form">
        <label>Amount:</label>
        <input
          type="number"
          value={enteredDetails.amount}
          onChange={setExpeneseAmount}
        />
      </div>
      <div className="expense-form">
        <label>Date:</label>
        <input
          type="date"
          value={enteredDetails.date}
          min="2018-01-01"
          max="2022-02-02"
          onChange={setExpenseDate}
        />
      </div>
      <div className="expense-form">
        <label>Spent by:</label>
        <input
          type="text"
          value={enteredDetails.spentBy}
          onChange={setExpenseSpentBy}
        />
      </div>
      <div>
        <button type="submit" className="button-class">
          Add new expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
