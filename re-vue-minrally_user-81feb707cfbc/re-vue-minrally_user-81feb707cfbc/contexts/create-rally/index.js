import React, { createContext, useState } from "react";

const CreateRallyContext = createContext(null);

const dataInitial = {
  gameId: ""
};

export const CreateRallyProvider = ({ children }) => {
  const [data, setData] = useState(dataInitial);

  return (
    <CreateRallyContext.Provider
      value={{
        data,
        setData
      }}
    >
      {children}
    </CreateRallyContext.Provider>
  );
};

export default CreateRallyContext;
