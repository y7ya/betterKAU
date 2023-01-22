import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom/client';        
import Schedule from './components/schedule/schedule';

ReactDOM.createRoot(document.getElementById('app')).render(     
    <Schedule />
    );