import { TickerComponent } from './ticker.js';

function makeHelloWorld() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello World!';

  return element;
}

document.body.appendChild(makeHelloWorld());
const tickerComp = new TickerComponent(500);
document.body.appendChild(tickerComp.element);

function activateTicker() {
  tickerComp.startTicking();
  setTimeout(() => deactivateTicker(), 15000);
}

function deactivateTicker() {
  tickerComp.stopTicking();
  setTimeout(() => activateTicker(), 15000);
}

activateTicker();