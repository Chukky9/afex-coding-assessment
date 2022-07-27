import { Fragment } from 'react';
import './App.css';
import Context from '../contexts/Context';
import Routes from '../routes/Routes';

function App() {
  return (
    <div className="App">
      <Fragment>
        <Context>
          <Routes/>
        </Context>
      </Fragment>
    </div>
  );
}

export default App;
