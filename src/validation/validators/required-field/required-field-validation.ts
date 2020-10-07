import { RequiredFieldError } from '@/validation/errors';

import { FieldValidation } from '../../protocols/field-validation';

export class RequiredFieldValitation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    return input[this.field] ? null : new RequiredFieldError();
  }
}
