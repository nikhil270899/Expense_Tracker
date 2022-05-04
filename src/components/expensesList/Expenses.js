// import { useState } from "react";
import { FaRegThumbsDown } from "react-icons/fa";

import "../expensesList/Expenses.css";
import ExpenseDateFilter from "../expenseDateFilter/ExpenseDateFilter";
import { useState } from "react";

const Expenses = (props) => {
  const [dateFiltered, setDateFiltered] = useState("");
  const filteredDateExpenses = (filteredDate) => {
    setDateFiltered(filteredDate);
  };
  const filteredArray = [
    ...props.expenses.filter((v) => {
      return v.date.slice(0, 4) === dateFiltered;
    }),
  ];

  let content = ["No expenses pending in selected year", "No expense added"];
  let mappedArray = filteredArray.length
    ? filteredArray
    : !filteredArray.length && dateFiltered && dateFiltered !== "Select Year"
    ? content[0]
    : !props.expenses.length && !dateFiltered && dateFiltered === "Select Year"
    ? content[1]
    : props.expenses;
  const removeExpense = (id) => {
    props.remove(id);
  };
  return (
    <div className="expense-class">
      <ExpenseDateFilter
        dateFiltered={filteredDateExpenses}
        select={dateFiltered}
      />

      <ul>
        {mappedArray.length > 0 &&
          typeof mappedArray !== "string" &&
          mappedArray.map((v, index) => {
            return (
              <li className="list-class" key={index}>
                <div>Expense Name :{v.name}</div>
                <div>Amount :Rs.{v.amount}</div>
                <div>SpentBy :{v.spentBy}</div>
                <div>Date :{v.date.split("-").reverse().join("/")}</div>
                <div className="delete-class">
                  <FaRegThumbsDown onClick={() => removeExpense(v.id)} />
                </div>
              </li>
            );
          })}
        {(typeof mappedArray === "string" || mappedArray.length === 0) && (
          <h3>No expenses present</h3>
        )}
      </ul>
    </div>
  );
};
export default Expenses;
