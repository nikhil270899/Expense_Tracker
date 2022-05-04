import { useParams } from "react-router-dom";

const SingleExpense = (props) => {
  console.log(props);
  let { id } = useParams();

  return (
    <div>
      <ul>
        {props.expense.map((v) => {
          return (
            <li key={id}>
              <div>{v.name}</div>
              <div>{v.amount}</div>
              <div>{v.date}</div>
              <div>{v.spentBy}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SingleExpense;
