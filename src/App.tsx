import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './pages/dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import { Login } from './pages/login';
import { SignUp } from './pages/signup';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();
const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="signup" element={<SignUp />} />

              <Route path="dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </div>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
ReactDOM.render(<App />, document.getElementById('app'));
