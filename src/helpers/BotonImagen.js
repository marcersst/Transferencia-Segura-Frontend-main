import React from 'react';

export const BotonImagen = (props) => {
  return (
    <div className=" w-[300px] h-[280px] border-emerald-700  max-w-sm rounded overflow-hidden shadow-lg inline-block m-4 border cursor-pointer transition-transform hover:scale-110 hover:border-purple-600 hover:bg-purple-600 my-1">
      <img
        src={props.imagenSrc}
        alt={props.imagenAlt}
        className='w-full h-48' 
      />
      <div className="  w-[300px] h-[200px] px-6 py-4 bg-[#3a3a43] p-4 shadow-md">
        <div className="font-bold  text-xl font-semibold text-white">{props.titulo}</div>
      </div>
    </div>
  );
};
