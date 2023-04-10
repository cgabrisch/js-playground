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

const TickerModes = {
  inactive: 'inactive',
  active: 'active',
  toggling: 'toggling'
};

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

    const tickerModeRadioInactive = document.createElement('input');
    tickerModeRadioInactive.setAttribute('type', 'radio');
    tickerModeRadioInactive.setAttribute('name', 'tickermode');
    tickerModeRadioInactive.setAttribute('value', TickerModes.inactive);
    tickerModeRadioInactive.onchange = () => this.tickerMode = TickerModes.inactive;
    const tickerModeLabelInactive = document.createElement('label');
    tickerModeLabelInactive.append(tickerModeRadioInactive, 'Inactive');

    const tickerModeRadioActive = document.createElement('input');
    tickerModeRadioActive.setAttribute('type', 'radio');
    tickerModeRadioActive.setAttribute('name', 'tickermode');
    tickerModeRadioActive.setAttribute('value', TickerModes.active);
    tickerModeRadioActive.onchange = () => this.tickerMode = TickerModes.active;
    const tickerModeLabelActive = document.createElement('label');
    tickerModeLabelActive.append(tickerModeRadioActive, 'Active');

    const tickerModeRadioToggling = document.createElement('input');
    tickerModeRadioToggling.setAttribute('type', 'radio');
    tickerModeRadioToggling.setAttribute('name', 'tickermode');
    tickerModeRadioToggling.setAttribute('value', TickerModes.toggling);
    tickerModeRadioToggling.onchange = () => this.tickerMode = TickerModes.toggling;
    const tickerModeLabelToggling = document.createElement('label');
    tickerModeLabelToggling.append(tickerModeRadioToggling, 'Toggling');

    const tickerModeRadios = document.createElement('div');
    tickerModeRadios.append(tickerModeLabelInactive, tickerModeLabelActive, tickerModeLabelToggling);

    const htmlRepresentation = document.createElement('fieldset');
    htmlRepresentation.append(tickerModeRadios, intervalLabel);

    this.element = htmlRepresentation;
  }


  set tickerMode(tickerMode) {
    switch (tickerMode) {
      case TickerModes.active: {
        this._stopToggling();
        this.tickerComponent.startTicking();
        break;
      }
      case TickerModes.inactive: {
        this._stopToggling();
        this.tickerComponent.stopTicking();
        break;
      }
      case TickerModes.toggling: {
        this._startToggling();
        break;
      }
    }
  }

  _startToggling() {
    if (!!this._togglingTimeoutId) {
      return;
    }

    const that = this;
    function deactivateTicker() {
      that.tickerComponent.stopTicking();
      that._togglingTimeoutId = setTimeout(() => activateTicker(), that.intervalSec * 1000);
    }
  
    function activateTicker() {
      that.tickerComponent.startTicking();
      that._togglingTimeoutId = setTimeout(() => deactivateTicker(), that.intervalSec * 1000);
    }
  
    activateTicker();
  }

  _stopToggling() {
    if (!!this._togglingTimeoutId) {
      clearTimeout(this._togglingTimeoutId);
      delete this._togglingTimeoutId;
    }
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

export { TickerComponent, TickerComponentController, TickerModes };