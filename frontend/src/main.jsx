import ReactDOM from 'react-dom/client';
import App from 'src/App';
import 'src/index.css';

// Contexts
import { IconContext } from 'react-icons';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <IconContext.Provider value={{}}>
    <App />
  </IconContext.Provider>
);
