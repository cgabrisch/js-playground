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

class TickerComponentController {
  constructor(tickerComponent) {
    this.tickerComponent = tickerComponent;
    this.intervalSec = 15;

    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('min', 1);
    input.setAttribute('max', 30);
    input.setAttribute('value', this.intervalSec);
    input.onchange = () => {
      this.intervalSec = this._getSanitizedIntValue(input, this.intervalSec);
    };

    const label = document.createElement('label');
    label.append('Toggle interval (sec)', input);

    this.element = label;
  }

  startToggling() {
    const that = this;
    function deactivateTicker() {
      that.tickerComponent.stopTicking();
      setTimeout(() => activateTicker(), that.intervalSec * 1000);
    }
  
    function activateTicker() {
      that.tickerComponent.startTicking();
      setTimeout(() => deactivateTicker(), that.intervalSec * 1000);
    }
  
    activateTicker();
  }

  _getSanitizedIntValue(input, fallbackValue) {
    var value = Number.parseInt(input.value);
    if (!Number.isFinite(value)) {
      value = fallbackValue;
    }

    value = Math.max(value, input.min);
    value = Math.min(value, input.max);
    input.value = value;

    return value;
  }
}

export { TickerComponent, TickerComponentController };