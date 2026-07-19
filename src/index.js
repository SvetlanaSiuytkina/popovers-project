import './style.css';
import { Popover } from './popover.js';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.btn');
  
  if (btn) {
    new Popover(btn);
  }
});