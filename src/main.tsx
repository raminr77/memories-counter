import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ROUTES } from "./shared/constants/routes";
import { store, persistor } from './shared/redux/store';

// Pages
import { Error404 } from "./404";
import { Layout } from "./shared/layout";
import { HomePage } from "./domains/home";
import { CounterPage } from './domains/counter';

// Styles
import './styles/main.scss';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    errorElement: <Error404 />
  },
  {
    path: ROUTES.COUNTER,
    element: <CounterPage />,
    errorElement: <Error404 />
  }
]);

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
