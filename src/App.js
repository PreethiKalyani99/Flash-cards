import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { FlashCards } from './components/FlashCards';

function App() {
  return (
    <Router>
      <FlashCards/>
    </Router>
  );
}

export default App;
