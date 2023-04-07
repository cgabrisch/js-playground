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

  startToggling() {
    const that = this;
    function deactivateTicker() {
      that.stopTicking();
      setTimeout(() => activateTicker(), 15000);
    }
  
    function activateTicker() {
      that.startTicking();
      setTimeout(() => deactivateTicker(), 15000);
    }
  
    activateTicker();
  }
}


export { TickerComponent };