import React from 'react'
import { Route, Routes } from 'react-router-dom';
import "./index.css" 
import { Inicio, MisTransferencias, CrearTransferencias, NavBar, SideBar,  MisCreaciones, HaciaMi, MisFirmas } from './paginas';


export const App = () => {

  return (
    <>
        <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
          <div className="sm:flex hidden mr-10 relative">
          <SideBar  />
        </div>
          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
           <NavBar />
            <Routes>

              <Route path="/" element={<Inicio />} />
              <Route path="/mistransferencias" element={<MisTransferencias />} />
              <Route path="/creartransferencias" element={<CrearTransferencias />} />
              <Route path="/misfirmas" element={<MisFirmas />} />
              <Route path="/miscreaciones" element={<MisCreaciones />} />
              <Route path="/haciami" element={<HaciaMi />} />
            </Routes> 
          </div>
        </div>

    </>
  )
}
