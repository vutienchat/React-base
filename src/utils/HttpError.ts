import { AxiosError } from 'axios';
import { setMessage } from 'slices/notification';
import store from 'store';
import type { HttpErrorResponse } from 'types/shared';
import TypedObject from './TypedObject';

class HttpError {
  private ERROR_CODE: Record<string, string> = {
    common: 'common',
    forbidden: 'forbidden',
    err_network: 'err_network',
    // Add the messageCode here
  };

  public unwrap(error: AxiosError<HttpErrorResponse>) {
    const { code, response } = error;

    if (code === AxiosError.ERR_NETWORK) {
      store.dispatch({
        type: setMessage.type,
        payload: { message: 'err_network', type: 'error' },
      });
    } else if (response) {
      const { status, data } = response;

      switch (status) {
        case 403: {
          store.dispatch({
            type: setMessage.type,
            payload: { message: 'forbidden', type: 'error' },
          });
          break;
        }
        default: {
          if (TypedObject.in(data, 'messageCode')) {
            store.dispatch({
              type: setMessage.type,
              payload: { message: data['messageCode'], type: data['type'] },
            });
          } else {
            store.dispatch({
              type: setMessage.type,
              payload: { message: 'common', type: 'error' },
            });
          }
          break;
        }
      }
    }

    return Promise.reject(error);
  }

  public parse(messageCode: string | null) {
    const prefixTranslateKey = 'messages';

    if (typeof messageCode === 'string' && messageCode in this.ERROR_CODE) {
      return `${prefixTranslateKey}.${this.ERROR_CODE[messageCode]}`;
    }

    return `${prefixTranslateKey}.common`;
  }
}

export default new HttpError();
