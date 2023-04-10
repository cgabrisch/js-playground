import { TickerComponent, TickerComponentController } from './ticker.js';
import { testObservables } from './observables.js';

testObservables();

function makeHelloWorld() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello World!';

  return element;
}

document.body.appendChild(makeHelloWorld());

const tickerComp = new TickerComponent(500);
const tickerCompController = new TickerComponentController(tickerComp);

const tickerDiv = document.createElement('div');
tickerDiv.append(tickerCompController.element, tickerComp.element);
document.body.appendChild(tickerDiv);
