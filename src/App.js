import './App.css';
import {CSVLink} from "react-csv";
import names from './names.json';
import {useState} from 'react';
import Pagination from './Pagination.js';


function App() {

  //////////////// FILTER SEARCH ////////////////
  
  // const [searchInput, setSearchInput]     = useState('');
  // Non necessario: indurrebbe React ad effettuare un rerender aggiuntivo.

  // Array di stato unico usato in luogo di 'filteredResults' e 'data'.
  const [displayedData, setDisplayedData] = useState( names );

  // Apportato un po' di refactoring per riflettere le modifiche
  // di cui sopra.
  const searchItem = (searchValue) => {
    const needle         = searchValue.trim();
    let newDataToDisplay = names;

    if ( needle ) {
      newDataToDisplay = names.filter((item) => {
        // Aggiunto uno spazio tra i valori concatenati.
        return Object.values(item).join( ' ' ).toLowerCase().includes( needle.toLowerCase() );
      });
    }
    
    setDisplayedData( newDataToDisplay );
  }

  //////////////// SORTING //////////////////////

  //const [data, setData] = useState(names);
  // Non più necessario. In generale, bisogna ridurre al minimo l'uso di variabili di stato.
  
  const [sort, setSort] = useState("ASC");

  // Semplificato il codice di ordinamento ed aggiunto il caso in cui  a === b
  const sorting = (col)=>{
    const sortedData = [...displayedData].sort( ( itemA, itemB ) => {
      // Passando il valore a String() si ci assicura che l'applicazione
      // non vada in errore nel caso toLowerCase() sia chiamato con un number.
      const a = String( itemA[col] ).toLowerCase();
      const b = String( itemB[col] ).toLowerCase();

      if ( a === b ) {
        return 0;
      }
      
      if ( sort === "DESC" ) {
        return a < b ? 1 : -1;
      }
      
      return a > b ? 1 : -1;
    });

    setDisplayedData( sortedData );

    // Ad ogni trigger, l'ordinamento cambia da ASC a DESC e viceversa.
    setSort( order => ( order === 'ASC' ? 'DESC' : 'ASC' ) );
  }
  //////////////////////////////////////////////

  //////////////////// PAGINATION /////////////////////////
  const [currentPage, setCurrentPage] =useState(1);
  const postsPerPage = 5;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

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
          {/* In input, mancavano i nomi delle colonne. */}
          <th><button onClick={()=>sorting( 'name' )}>Name</button></th>
          <th><button onClick={()=>sorting( 'age' )}>Age</button></th>
          <th>Gender</th>
        </tr>
        </thead>
        <tbody>
          {/* Ora è sufficiente un solo loop. */}
          {displayedData.slice(firstPostIndex, lastPostIndex).map((val , key)=> (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.age}</td>
              <td>{val.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    <div className='download-pagination'>
      <CSVLink
      // Assegnato il nuovo array all'attr. 'data'.
      data={displayedData}
      className="span-csv"
      filename='ReactTable.csv'
      // Credo che questo non aiuti a migliorare l'esperienza utente:
      // il messaggio viene visualizzato prima che il download abbia inizio.
      // onClick={(event)=> alert("Csv File Downloaded Successfully")}
      //mai scriverlo prima che la funzione avvenga
      >
      Download Results
      </CSVLink>
      <Pagination
        totalPosts={names.length}
        postsPerPage={postsPerPage}
        onButtonClick={( pageNum ) => setCurrentPage( pageNum )}
        className="pagination"
      />
    </div>
  </>
  );
}

export default App;