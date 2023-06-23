class RegExps {
  public number = /^[0-9]*$/;
  public email = /^$|^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i;
  public disposition = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  public decimal = /^[0-9]*(\.[0-9]{1,})?$/;
  public phone = /^[0-9]{10}$/;
  public username = /^$|^[A-Z0-9@_.-]{4,15}$/i;
  public password =
    /^$|^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
}

export default new RegExps();
