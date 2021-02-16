
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Sellerhome from './components/Sellerhome';
import Buyerhome from './components/Buyerhome';
import Sellerproducts from './components/Sellerproducts';
import Cartpage from './components/Cartpage';
import Final from './components/Final';
import Indimedi from './components/Indimedi';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/sellerhome" component={Sellerhome} />
        <Route exact path="/buyerhome" component={Buyerhome} />
        <Route exact path="/cartpage" component={Cartpage}/>
        <Route exact path="/sellerproducts" component={Sellerproducts}/>
        <Route exact path="/final" component={Final}/>
        <Route exact path="/indi/:name" component={Indimedi}/>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
