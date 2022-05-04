import { useEffect, useState } from "react";
import AddedExpense from "./components/expensesForm/AddedExpense";
import Expenses from "./components/expensesList/Expenses";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  //   const [gotExpense, setGotExpense] = useState([]);

  let [expenses, setExpenses] = useState([]);
  let [id, setId] = useState("");
  const expensesNew = (data) => {
    setExpenses([...expenses, ...data]);
  };
  useEffect(() => {
    setTimeout(() => {
      if (expenses.length) {
        localStorage.setItem("expenses", JSON.stringify(expenses));
      }
    }, 0);
  }, [expenses]);
  useEffect(() => {
    setTimeout(() => {
      let getExpenses = JSON.parse(localStorage.getItem("expenses"));
      console.log(getExpenses);
      setExpenses([...getExpenses]);
    }, 100);
  }, []);

  const removeExpenseFromList = (expenseId) => {
    expenses = [
      ...expenses.filter((v) => {
        return v.id !== expenseId;
      }),
    ];
    localStorage.setItem("expenses", JSON.stringify(expenses));
    setExpenses([...expenses]);
  };

  const idForRoute = (id) => {
    setId(id);
  };

  console.log(expenses, "oppp");
  console.log(id, "oppp");

  return (
    <Router>
      <div className="App">
        <AddedExpense newExpense={expensesNew} />
        <Switch>
          <Route path="/" exact>
            <Expenses
              expenses={expenses}
              remove={removeExpenseFromList}
              getId={idForRoute}
            />
          </Route>
          {/* <Route path="/:id">
            <SingleExpense expense={expenses.filter((v) => v.id === id)} />
  </Route>*/}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
