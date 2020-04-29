import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </>
);

export default App;
