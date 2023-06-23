import round from 'lodash.round';
import numeral from 'numeral';
import 'numeral/locales/vi';
import RegExps from './RegExps';

class Numeral {
  constructor() {
    numeral.locale('vi');
  }

  public price(value: any) {
    return numeral(value).format('0,0[.]000');
  }

  public round(value: any, precision: number = 2) {
    const valueAsString = String(value);
    if (!RegExps.decimal.test(valueAsString)) return null;
    return round(parseFloat(valueAsString), precision);
  }
}

export default new Numeral();
