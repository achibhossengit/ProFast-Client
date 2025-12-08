const Pagination = ({
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  totalPages,
  totalDataCount,
}) => {
  return (
    <div className="flex justify-center my-2">
      <div className="join">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="join-item btn"
        >
          «
        </button>
        <div>
          <button className="join-item btn">Found {totalDataCount}</button>
          <button className="join-item btn">
            Page {currentPage} / {totalPages}
          </button>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="join-item btn"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="join-item btn"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
