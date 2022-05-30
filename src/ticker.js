class TickerComponent {
  constructor(updateInterval) {
    this.element = document.createElement('div');
    
    setInterval(() => {
      this.element.innerHTML = new Date().toLocaleTimeString();
    }, updateInterval);
  }
}

export { TickerComponent };