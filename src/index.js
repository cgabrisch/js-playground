import { createTickerElem } from './ticker.js';

function makeHelloWorld() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello World!';

  return element;
}

document.body.appendChild(makeHelloWorld());
document.body.appendChild(createTickerElem());