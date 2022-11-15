const Pagination = ({ data, setPageNumber, setLimit, limit }) => {
  // Calcul du nombre de pages
  let numberOfPages = data.count / (limit ? limit : 8);

  // On prévoit un tableau contenant autant d'éléments que de pages
  const tab = [];
  for (let i = 0; i < numberOfPages; i++) {
    // On met à jour dynamiquement le code HTML dans le tableau
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
