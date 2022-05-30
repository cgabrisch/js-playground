function createTickerElem() {
  const ticker = document.createElement('div');
  
  setInterval(() => {
    ticker.innerHTML = new Date().toLocaleTimeString();
  }, 5000);

  return ticker;
}

export { createTickerElem };