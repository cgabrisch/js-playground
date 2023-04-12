import { helloWorldDemo } from './helloworld.js';
import { tickerDemo } from './ticker.js';
import { testObservables } from './observables.js';

testObservables();

const main = document.createElement('main');
const nav = document.createElement('nav');
document.body.append(nav, main);

[helloWorldDemo, tickerDemo].forEach(demo => {
  const div = document.createElement('div');
  div.append(demo.title);
  nav.appendChild(div);
  main.appendChild(demo.htmlElement);
})
