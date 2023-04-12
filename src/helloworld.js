function makeHelloWorld() {
    const element = document.createElement('div');

    element.innerHTML = 'Hello World!';

    return element;
}

const helloWorldDemo = { title: 'Hello World', htmlElement: makeHelloWorld() };

export { helloWorldDemo };