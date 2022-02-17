import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Login from './pages/Login';


// To start json server, type in terminal: " npx json-server --watch data/db.json --port 8000 "
// To start application, type in terminal: " npm run start "
// To search for local host version, type in search bar in browser: " http://localhost:3000/ "

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home /> 
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
 );
}

export default App;
