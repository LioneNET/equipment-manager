import React from 'react';

const Pagination = ({nextPage, meta}) => {

  return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {
            Array.from({length: meta.last_page}, (_, i) => i+1).map((i) => (
              <li
                  key={i}
                  className={`page-item ${i === meta.current_page && 'active'}`}>
                <button className="page-link" onClick={() => nextPage(i)}>{i}</button>
              </li>
            ))
          }
        </ul>
      </nav>
  )
}

export default Pagination;