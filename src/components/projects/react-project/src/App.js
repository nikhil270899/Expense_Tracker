import "./App.css";
import { url, appName, pageSize } from "./config";
import AdminList from "./components/admins/AdminList.js";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Pagination } from "@mui/material";
const intitalState = {
  textSearched: "",
  searchedDataArr: [],
};

const reducerFunction = (state, action) => {
  if (action.type === "FILTER") {
    return {
      textSearched: action.payload.searchedTxt,
      searchedDataArr: [...action.payload.searchedData],
    };
  }
  if (action.type === "SET_UPDATED") {
    return {
      textSearched: state.textSearched,
      searchedDataArr: [...action.payload],
    };
  }
  if (action.type === "DELETE_FILTER_SEARCH") {
    return { ...state, searchedDataArr: [...action.payload] };
  }
  if (action.type === "EMPTY_SEARCH") {
    return { ...intitalState, searchedDataArr: [...action.payload] };
  }

  return intitalState;
};
function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [searchReducer, dispatchSearchedData] = useReducer(
    reducerFunction,
    intitalState
  );
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  //Fetched the admin data to display in UI
  const fetchAdminData = async () => {
    const response = await fetch(url.href);
    let data = await response.json();
    let modifiedData = data.map((v) => {
      return { ...v, isChecked: false };
    });
    setFetchedData(modifiedData);
    // setTableData(tableData)
  };
  //Calling the above method in use effect
  useEffect(() => {
    fetchAdminData();
  }, []);
  //Setting total pages from the fetched data
  useEffect(() => {
    let pagesToDisplay = Math.ceil(
      searchReducer?.searchedDataArr.length
        ? searchReducer?.searchedDataArr.length / pageSize
        : fetchedData.length / pageSize
    );
    setTotalPages(pagesToDisplay);
  }, [fetchedData, searchReducer?.searchedDataArr]);
  //Getting the paginated data and assigning to table data for display
  useEffect(() => {
    const firstItem = currentPage * pageSize - pageSize;
    const lastItem = firstItem + pageSize;
    let arr =
      searchReducer.searchedDataArr.length || searchReducer.textSearched
        ? searchReducer.searchedDataArr
        : fetchedData;
    let tabData = arr.slice(firstItem, lastItem);
    setTableData(tabData);
  }, [currentPage, fetchedData, searchReducer]);

  //Setting selected page checkboxes to be checked
  //Used used callback so that it memosies the function and doesnt call on every render
  const checkedAll = useCallback((val) => {
    if (val.length) setTableData(val);
  }, []);

  //Getting updated data and setting to the admin data
  const sentUpdatedDataToParent = (data, id) => {
    let arr =
      searchReducer.searchedDataArr.length || searchReducer.textSearched
        ? searchReducer.searchedDataArr
        : fetchedData;
    let finalUpdatedData = arr?.map((item) => {
      return item.id === id ? { ...data } : item;
    });
    if (searchReducer.textSearched) {
      dispatchSearchedData({
        type: "SET_UPDATED",
        payload: finalUpdatedData,
      });
      return;
    }

    setFetchedData(finalUpdatedData);
  };
  //Delete Multiple rows
  const delteMultipleRecord = (data, singleCheckBoxClicked) => {
    //if any item got checked ,only that elements gets removed
    if (!singleCheckBoxClicked) {
      const deleteRows = data.map((v) => v.id);
      let filteredSelectedRows = fetchedData.filter((item, i) => {
        return !deleteRows.includes(item.id);
      });
      setFetchedData(filteredSelectedRows);
      //Last page handler
      currentPage === totalPages
        ? setCurrentPage(currentPage - 1)
        : setCurrentPage(currentPage);
    } else {
      alert(`Click DELETE ACTION for deleting individual admin`);
    }
  };
  //Delete single row
  const sendDataToDelete = (id) => {
    let data = !searchReducer.textSearched
      ? fetchedData
      : searchReducer.searchedDataArr;

    let dataAfterDelete = data?.filter((item) => {
      return item.id !== id;
    });
    if (searchReducer.textSearched) {
      dispatchSearchedData({
        type: "DELETE_FILTER_SEARCH",
        payload: dataAfterDelete,
      });
      return;
    }
    setFetchedData(dataAfterDelete);
  };
  //Search bar handler
  const sendSearchedDataToParent = (searchedTxt) => {
    let searchedData;
    if (searchedTxt) {
      searchedData = fetchedData.filter((data, index) => {
        return (
          data.name.toLowerCase().includes(searchedTxt.toLowerCase()) ||
          data.email.toLowerCase().includes(searchedTxt.toLowerCase()) ||
          data.role.toLowerCase().includes(searchedTxt.toLowerCase())
        );
      });
      dispatchSearchedData({
        type: "FILTER",
        payload: { searchedTxt, searchedData },
      });
      return;
    }
    dispatchSearchedData({ type: "EMPTY_SEARCH", payload: fetchedData });
  };
  //TEXT FOR USER
  let common =
    searchReducer.searchedDataArr.length || searchReducer.textSearched
      ? searchReducer.searchedDataArr.length
      : fetchedData.length;
  let text = `${common} users available`;
  return (
    <div className="App">
      <div className="app-name">{appName}</div>
      <h4 className="users-count">({text})</h4>

      <AdminList
        adminData={tableData}
        onSelectedAll={checkedAll}
        sendToParent={sentUpdatedDataToParent}
        sendDataToDelete={sendDataToDelete}
        delteMultipleRecord={delteMultipleRecord}
        sendSearchedDataToParent={sendSearchedDataToParent}
      />
      <div className="pagination-wrapper">
        {tableData.length ? (
          <Pagination
            className="cursor-pointer"
            variant="outlined"
            color="primary"
            count={totalPages}
            showFirstButton
            showLastButton
            onChange={(event, page) => setCurrentPage(page)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
