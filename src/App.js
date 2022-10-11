import './App.css';
import {CSVLink} from "react-csv";
import names from './names.json';
import {useState} from 'react'; 


function App() {

  //////////////// FILTER SEARCH ////////////////
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const searchItem = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
  const filteredNames = names.filter((item) => {
      return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
    })
    setFilteredResults(filteredNames)
  } else {setFilteredResults(names)}
  }
  //////////////////////////////////////////////
  return (
    <>
      <input
      type='text'
      className='input'
      placeholder='Search..'
      onChange={(event) => searchItem(event.target.value)}
      />
      <table>
        <thead>
        <tr>
          <th><button>Name</button></th>
          <th><button>Age</button></th>
          <th>Gender</th>
        </tr>
        </thead>
        <tbody>
          {searchInput.length >= 1 ? (
            filteredResults.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                </tr>
              )
            }
          )) : (
            names.map((val , key)=> {
              return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.age}</td>
              <td>{val.gender}</td>
            </tr>
              )
            })
          )}
        </tbody>
      </table>
    <div>
      <CSVLink
      data={(filteredResults)}
      className="span-csv"
      filename='ReactTable.csv'
      onClick={(event)=> alert("Csv File Downloaded Successfully")}>
      Download Result
      </CSVLink>
    </div>
    </>
  );
}

export default App;