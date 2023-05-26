export const pagerInit = {
  page: 1,
  perPage: 10,
  sort: "createdAt",
  sortDir: "desc",
  query: "",
};

const usePagination = (setter, currentFilters = []) => {
  const handlePageChange = (page) => {
    setter((p) => ({
      ...p,
      page: page,
    }));
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setter((p) => ({
      ...p,
      perPage: newPerPage,
      page: page,
    }));
  };

  async function handleDataTableSort(column, sortDir) {
    console.log(column, sortDir);
    setter((p) => ({
      ...p,
      sortDir: sortDir || "desc",
      sort: column.sortField || "createdAt",
    }));
  }
  const handleSort = (data) => {
    setter((p) => ({ ...p, ...data }));
  };

  const handleFilter = (filterConfig) => {
    let filter = {
      field: filterConfig.field,
      query: filterConfig.query,
    };
    currentFilters = currentFilters?.filter(
      (obj) => obj.field !== filter.field
    );
    currentFilters?.push(filter);
    setter((p) => ({ ...p, filters: currentFilters }));
  };

  const isFiltered = (field) => {
    return (
      currentFilters?.filter((x) => x.field == field && x.query.length > 0)
        .length > 0 || false
    );
  };
  return {
    handlePageChange,
    handlePerRowsChange,
    handleSort,
    handleFilter,
    isFiltered,
    handleDataTableSort,
  };
};

export default usePagination;
