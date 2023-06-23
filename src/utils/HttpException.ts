import { json } from 'react-router-dom';

class HttpException {
  public NotFound(data: any = {}) {
    return json(data, { status: 404, statusText: 'Not Found' });
  }

  public Forbidden(data: any = {}) {
    return json(data, { status: 403, statusText: 'Forbidden' });
  }

  public Unauthorized(data: any = {}) {
    return json(data, { status: 401, statusText: 'Unauthorized' });
  }

  public InternalServerError(data: any = {}) {
    return json(data, { status: 500, statusText: 'Internal Server Error' });
  }

  public ServiceUnavailable(data: any = {}) {
    return json(data, { status: 503, statusText: 'Service Unavailable' });
  }
}

export default new HttpException();
