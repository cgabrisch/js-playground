import { helloWorldDemo } from './helloworld.js';
import { tickerDemo } from './ticker.js';
import { testObservables } from './observables.js';

testObservables();

document.body.appendChild(helloWorldDemo.htmlElement);

document.body.appendChild(tickerDemo.htmlElement);
