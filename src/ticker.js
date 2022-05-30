class TickerComponent {
  constructor(updateInterval) {
    this.element = document.createElement('div');
    this.element.innerHTML = 'Ticker not started';
    this.updateInterval = updateInterval;
  }
  
  startTicking() {
    if (!!this.intervalId) {
      return;
    }
    
    this.element.innerHTML = 'Ticker active';
    this.intervalId = setInterval(() => {
      this.element.innerHTML = new Date().toLocaleTimeString();
    }, this.updateInterval);
  }
  
  stopTicking() {
    if (!this.intervalId) {
      return;
    }
    
    clearInterval(this.intervalId);
    this.element.innerHTML = 'Ticker inactive';
    delete this.intervalId;
  }
}

export { TickerComponent };