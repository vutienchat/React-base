import type { AnySchema, ValidationError } from 'yup';
import {
  array,
  date,
  mixed,
  number,
  object,
  ref,
  setLocale,
  string,
  boolean,
} from 'yup';
import type { ObjectShape } from 'yup/lib/object';
import RegExps from './RegExps';

class Validation {
  constructor() {
    setLocale({
      mixed: {
        required: 'validation.required',
      },
      string: {
        trim: 'validation.trim',
        max: 'validation.maxLength',
      },
    });
  }

  public ref(key: string) {
    return ref(key);
  }

  public mixed() {
    return mixed();
  }

  public array() {
    return array();
  }

  public boolean() {
    return boolean();
  }

  public resolver(error: ValidationError) {
    return error.message;
  }

  public validate(validate?: AnySchema) {
    return async (value: any) => {
      if (!validate) return true;

      const message = await validate
        .validate(value)
        .then(() => void 0)
        .catch(this.resolver);

      return message;
    };
  }

  public shape<T extends ObjectShape>(
    additions: T,
    excludes?: [string, string][]
  ) {
    return object().shape<T>(additions, excludes);
  }

  public string() {
    return string().ensure().required().max(255).trim().default('');
  }

  public number() {
    return number().required().typeError('validation.invalidNumber');
  }

  public option() {
    return number().required().nullable().default(null);
  }

  public optionNumber() {
    return number().required().nullable().default(null);
  }

  public optionString() {
    return string().required().nullable().default(null);
  }

  public select(value: number) {
    return number().required().default(value);
  }

  public date() {
    return date()
      .required()
      .typeError('validation.invalidDate')
      .nullable()
      .default(null);
  }

  public email() {
    return string()
      .trim()
      .required()
      .matches(RegExps.email, 'validation.email')
      .max(255)
      .default('');
  }

  public phone() {
    return string()
      .trim()
      .required()
      .matches(RegExps.phone, 'validation.phone')
      .max(255)
      .default('');
  }

  public username() {
    return this.pattern(RegExps.username, 'validation.username')
      .min(4, 'validation.username')
      .max(15, 'validation.username');
  }

  public password() {
    return this.pattern(RegExps.password, 'validation.password').max(
      15,
      'validation.passwordLength'
    );
  }

  public description() {
    return string().trim().max(5000).default('');
  }

  public pattern(regexp: RegExp, message?: string) {
    return this.string().matches(regexp, message);
  }

  public numbers() {
    return array()
      .of(number().required())
      .min(1, 'validation.required')
      .default([]);
  }

  public strings() {
    return array()
      .of(string().required())
      .min(1, 'validation.required')
      .default([]);
  }
}

export default new Validation();
