import { createContext, useEffect, useReducer, useState } from "react";

const UsersContext = createContext();

export const UsersActionTypes = {
  GET_ALL: "fetches all data on inital load",
  NEW_USER: "registers a new user"
}

const reducer = (state, action) => {
  switch (action.type) {
    case UsersActionTypes.GET_ALL:
      return action.data;

    case UsersActionTypes.NEW_USER:
      fetch(`http://localhost:8080/users`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      })
      return [...state, action.data];
      
    default:
      console.error(`No such action: ${action.type}`);
      return state;
  }
}

const UsersProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState('');

  const [users, setUsers] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .then(data => setUsers({
        type: UsersActionTypes.GET_ALL,
        data: data
      }))
  }, [])

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
 
export {UsersProvider};
export default UsersContext;