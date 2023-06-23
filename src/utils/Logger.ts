import { __DEV__ } from 'config';

class Logger {
  private logger;

  constructor() {
    this.logger = console.log.bind(window.console);
  }

  public log(...args: any[]) {
    if (__DEV__) {
      this.logger(...args);
    }
  }
}

export default new Logger();
