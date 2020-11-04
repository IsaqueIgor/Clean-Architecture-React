import {
  EmailValidation, MinLengthValidation, RequiredFieldValitation, ValidationComposite
} from '@/validation/validators';
import { CompareFieldsValitation } from '@/validation/validators/compare-fields/compate-fields-validation';

import { makeSignUpValidation } from './signup-validation-factory';

describe('LoginValidationFactory', () => {
  test('should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValitation('name'),
        new MinLengthValidation('name', 5),
        new RequiredFieldValitation('email'),
        new EmailValidation('email'),
        new RequiredFieldValitation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValitation('passwordConfirmation'),
        new CompareFieldsValitation('passwordConfirmation', 'password')
      ])
    );
  });
});
