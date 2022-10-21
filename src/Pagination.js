import React from 'react';
import './pagination.css';

// Sostituito 'setCurrentPage' con 'onButtonClick':
// in generale conviene evitare di passare i setter di stato direttamente,
// meglio usare uno callback generica con valore di default ( [_ = _] è una
// funzione che restituisce qualsiasi input le venga passato, in questo caso
// chiamato underscore ) che non introduca dipendenze nel componente.
const Pagination = ({totalPosts, postsPerPage, onButtonClick = _ => _ }) => {
  /**
   * Cerca sempre di ridurre al minimo il numero di loop!
   * La visualizzazione dei pulsanti di navigazione può 
   * essere eseguita con un unico loop...

  let buttons         = [];
  const lastButtonIdx = Math.ceil( totalPosts / postsPerPage );

  for ( let i = 1; i <= lastButtonIdx; i++ ) {
    buttons.push(
      <button key={i} onClick={() => onButtonClick( i )}>{i}</button>
    )
  }
   
  return <div>{buttons}</div>;

  */
  
  let pages = [];
  for (let i=1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
    pages.push(i)
  }
  
    return (
    <div>
        {pages.map((page, index)=> {
            return <button key={index} onClick={()=>onButtonClick(page)}>{page}</button>
        })}
    </div>
  );
};

export default Pagination