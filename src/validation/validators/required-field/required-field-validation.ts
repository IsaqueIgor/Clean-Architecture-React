import { FieldValidation } from '../../protocols/field-validation';
import { RequiredFieldError } from '@/validation/errors';

export class RequiredFieldValitation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return value ? null : new RequiredFieldError();
  }
}
