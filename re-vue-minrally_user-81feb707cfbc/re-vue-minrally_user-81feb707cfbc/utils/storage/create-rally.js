const CREATE_RALLY_KEY = "_create_rally";

export const setRallyData = data => {
  if (typeof window !== 'undefined')
    localStorage.setItem(CREATE_RALLY_KEY, JSON.stringify(data));
};

export const getRallyData = (field) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(CREATE_RALLY_KEY);
    if (field) return JSON.parse(data)[field] ?? null
    return data ? JSON.parse(data) : null;
  }
  return null
};

export const clearRallyData = () => {
  if (typeof window !== 'undefined')
    localStorage.removeItem(CREATE_RALLY_KEY);
}
