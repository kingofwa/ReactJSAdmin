const SEARCH_RALLY_KEY = "_search_rally";

export const setSearchRally = rally => {
  localStorage.setItem(SEARCH_RALLY_KEY, JSON.stringify(rally));
};

export const retrieveSearchRally = () => {
  if (typeof window !== "undefined") {
    const rally = localStorage.getItem(SEARCH_RALLY_KEY);
    return rally ? JSON.parse(rally) : [];
  }
  return null;
};

export const clearSearchRally = () => {
  localStorage.removeItem(SEARCH_RALLY_KEY);
};
