import { tickerDemo } from './ticker.js';
import { testObservables } from './observables.js';

testObservables();

function makeHelloWorld() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello World!';

  return element;
}

document.body.appendChild(makeHelloWorld());

document.body.appendChild(tickerDemo.htmlElement);
