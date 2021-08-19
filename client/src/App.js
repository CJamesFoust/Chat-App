import './App.css';
import Chat from './components/Chat';
import { Router } from '@reach/router';
import Join from './components/Join';

function App() {
  return (
    <div className="App">
      <Router>
        <Chat path="/chat" />
        <Join path="/" />
      </Router>
    </div>
  );
}

export default App;
