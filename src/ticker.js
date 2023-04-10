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

    const intervalInput = document.createElement('input');
    intervalInput.setAttribute('type', 'number');
    intervalInput.setAttribute('min', 1);
    intervalInput.setAttribute('max', 30);
    intervalInput.setAttribute('value', this.intervalSec);
    intervalInput.onchange = () => {
      this.intervalSec = this._getSanitizedIntValue(intervalInput, this.intervalSec);
    };

    const intervalLabel = document.createElement('label');
    intervalLabel.append('Toggle interval (sec)', intervalInput);

    this.element = intervalLabel;
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