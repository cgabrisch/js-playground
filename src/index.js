import { TickerComponent } from './ticker.js';
import { testObservables } from './observables.js';

testObservables();

function makeHelloWorld() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello World!';

  return element;
}

document.body.appendChild(makeHelloWorld());
const tickerComp = new TickerComponent(500);
document.body.appendChild(tickerComp.element);

tickerComp.startToggling();
