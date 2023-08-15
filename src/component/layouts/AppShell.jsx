import React from 'react';
import SideBar from './sidebar';
import { Outlet } from 'react-router-dom';

export default function AppShell() {
  return (
    <div>
      <SideBar />
      <div className="container">
        <div className="row">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
