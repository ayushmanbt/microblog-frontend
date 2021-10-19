import {BrowserRouter as Router, Switch, Route } from "react-router-dom"

//importing pages
import Home from "./pages/Home";
import Blog from "./pages/Blog";

//importing components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Create from "./pages/Create";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <div className="App d-flex flex-column">
      <Router>
        <Navbar />
        <div className="body">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/blog/:slug">
              <Blog />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/edit/:id">
              <EditBlog />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
