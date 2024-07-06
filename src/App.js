import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from "react-redux";
import {decrement, increment} from "./redux/slices/counterSlice";
import {useEffect} from "react";
import {fetchAllUsers} from "./redux/slices/userSlice";

function App() {

  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.value);
  const listUsers = useSelector(state => state.user.listUsers);
  const isLoading = useSelector(state => state.user.isLoading);
  const isError = useSelector(state => state.user.isError);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  if (isError === true && isLoading === false) {
    return (
        <div>Error fetching users. Please try again later.</div>
      );
  }

  if (isError === false && isLoading === true) {
    return (
        <div>Loading users...</div>
      );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>

        <button onClick={() => dispatch(increment())}>Increase</button>
        <button onClick={() => dispatch(decrement())}>Decrease</button>
        <br/>
        <div>Count = {count}</div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              listUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
              ))
            }
          </tbody>
        </table>

      </header>
    </div>
  );
}

export default App;
