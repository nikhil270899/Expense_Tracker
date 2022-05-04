import { useEffect, useState } from "react";

const ExpenseDateFilter = (props) => {
  const [dateSelected, setDateSelected] = useState("");
  const selectedYear = (e) => {
    setDateSelected(e.target.value);
  };

  useEffect(() => {
    props.dateFiltered(dateSelected);
  }, [dateSelected, props]);

  return (
    <div>
      <label>Filter By Year</label>

      <select value={props.select} onChange={selectedYear}>
        <option value={null}>Select Year</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
      </select>
    </div>
  );
};

export default ExpenseDateFilter;
