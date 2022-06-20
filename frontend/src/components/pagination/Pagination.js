import React from "react";
export default function Pagination(props) {
  const { page } = props.pagination;
  const [...numOfPage] = props.numOfPage;
  return (
    <>
      <div className="pagination">
        <a onClick={() => props.onPageChange(page === 1 ? page : page - 1)}>
          &laquo;
        </a>
        {numOfPage.map((numPage, index) => {
          return (
            <a
              key={index}
              className={page === numPage ? "active" : ""}
              onClick={() => props.onPageChange(numPage)}
            >
              {numPage}
            </a>
          );
        })}
        <a
          onClick={() =>
            props.onPageChange(page === numOfPage.length ? page : page + 1)
          }
        >
          &raquo;
        </a>
      </div>
    </>
  );
}
