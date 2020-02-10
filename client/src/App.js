import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    <Router>
        {/* new user will be greeted by join component */}
        <Route path="/" exact component={Join} /> 

        {/* take info from join component and render chat component */}
        <Route path="/chat" component={Chat} />
    </Router>
);

export default App;