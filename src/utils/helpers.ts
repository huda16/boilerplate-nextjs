import {
  MRT_ColumnFilterFnsState,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
} from "material-react-table";

interface FEParams {
  pagination: MRT_PaginationState;
  columnFilters: MRT_ColumnFiltersState;
  columnFilterFns: MRT_ColumnFilterFnsState;
  sorting: MRT_SortingState;
  globalFilter: string;
}

export function convertFEParamsToAPIParams(
  feParams: FEParams,
): Record<string, any> {
  const feParamsParsed = JSON.parse(JSON.stringify(feParams)) as FEParams;
  const {
    pagination: { pageSize: limit, pageIndex: page },
    globalFilter,
    columnFilters,
    columnFilterFns,
    sorting,
  } = feParamsParsed;

  // Filters
  const likeFilters: { [key: string]: string }[] = [];
  const whereFilters: { [key: string]: string }[] = [];
  const betweenFilters: { [key: string]: [string, string] }[] = [];
  const greaterThanFilters: { [key: string]: string }[] = [];

  columnFilters.forEach((filter) => {
    const { id, value } = filter;
    console.log({ id, value });
    const filterFn = columnFilterFns[id];

    switch (filterFn) {
      case "contains":
        if (typeof value === "string") {
          likeFilters.push({ [id]: value });
        }
        break;
      case "equals":
        if (typeof value === "string") {
          whereFilters.push({ [id]: value });
        }
        break;
      case "between":
        if (Array.isArray(value)) {
          betweenFilters.push({ [id]: value as [string, string] });
        }
        break;
      case "greaterThan":
        if (typeof value === "string") {
          greaterThanFilters.push({ [id]: value });
        }
        break;
      default:
        console.warn(`Unknown filter function: ${filterFn}`);
    }
  });

  // Sorting
  const sortParams = sorting.map((sort) => {
    const column = sort.id;
    const order = sort.desc ? "desc" : "asc";
    return { [column]: order };
  });

  return {
    page: page + 1,
    limit,
    search: globalFilter || undefined,
    like: likeFilters.length ? JSON.stringify(likeFilters) : undefined,
    where: whereFilters.length ? JSON.stringify(whereFilters) : undefined,
    between: betweenFilters.length ? JSON.stringify(betweenFilters) : undefined,
    greaterThan: greaterThanFilters.length
      ? JSON.stringify(greaterThanFilters)
      : undefined,
    sort: sortParams.length ? JSON.stringify(sortParams) : undefined,
  };
}
