import React from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from './components';
import store from './store/store';

function MainLayout() {
  return (
    <Provider store={store}>
      <Header />
      <div className="min-h-screen flex flex-wrap content-between bg-gray-100">
        <div className="w-full block content-center m-auto w-1/2 mt-10">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </Provider>
  );
}

export default MainLayout;
