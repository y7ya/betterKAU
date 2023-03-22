import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom/client';
import Home from './components/Home';
import.meta.glob(['../imgs/**',]);

ReactDOM.createRoot(document.getElementById('app')).render(
    <Home />
);