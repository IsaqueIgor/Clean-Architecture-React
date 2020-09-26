import { RequiredFieldError } from '@/validation/errors';

import { FieldValidation } from '../../protocols/field-validation';

export class RequiredFieldValitation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return value ? null : new RequiredFieldError();
  }
}
