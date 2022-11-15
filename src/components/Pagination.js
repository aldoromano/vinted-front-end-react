const Pagination = ({ data, setPageNumber, setLimit, limit }) => {
  let numberOfPages = data.count / (limit ? limit : 8);

  const tab = [];
  for (let i = 0; i < numberOfPages; i++) {
    // tab[i] = i;
    tab.push(
      <button
        key={i}
        onClick={() => {
          setPageNumber(i + 1);
        }}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div className="pagination-container">
      {/* {tab.map((elem, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setPageNumber(index + 1);
            }}
          >
            {index + 1}
          </button>
        );
      })} */}
      {tab}
      <input
        type="text"
        placeholder="Numbre d'offres par page"
        value={limit}
        onChange={(event) => {
          setLimit(event.target.value);
          setPageNumber(1);
        }}
      />
    </div>
  );
};

export default Pagination;
