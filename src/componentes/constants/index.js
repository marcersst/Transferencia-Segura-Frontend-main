import {  home , payment, crear, } from '../assets';

export const navlinks = [
  {
    name: 'Inicio',
    imgUrl: home,
    link: '/',
  },
  {
    name: 'Crear Transferencias',
    imgUrl: crear,
    link: '/crearTransferencias',
  },
  {
    name: 'Mis Transferencias',
    imgUrl: payment,
    link: '/mistransferencias',
  },
];