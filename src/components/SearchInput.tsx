import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const _handleTextInput = (e: any) => {
    setUserName(e.target.value);
  };

  const fetchUsers = (): Promise<void | Response> =>
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => {
        setUsers(
          res.filter((user: any) => {
            return user.name.toLowerCase().includes(userName);
          })
        );
      });

  useEffect(() => {
    userName.length === 0 ? setShow(false) : setShow(true);
  }, [userName]);

  return (
    <div className="search">
      <div className="search_bar">
        <input type="text" onChange={_handleTextInput} />
        <button onClick={() => fetchUsers()}>
          <SearchIcon />
        </button>
      </div>
      {show && (
        <div className="results">
          <ul>
            {users.map((user: any) => {
              return <li>{user.name}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
