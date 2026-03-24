"use client";

import { useQueryState, parseAsString } from "nuqs";

export function useFilterSync() {
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault("").withOptions({ shallow: false })
  );
  
  const [subCategory, setSubCategory] = useQueryState(
    "subCategory",
    parseAsString.withDefault("").withOptions({ shallow: false })
  );
  
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("").withOptions({ shallow: false })
  );

  return {
    category,
    setCategory,
    subCategory,
    setSubCategory,
    sort,
    setSort,
  };
}
