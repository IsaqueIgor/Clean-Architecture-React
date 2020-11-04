import {
  EmailValidation, MinLengthValidation, RequiredFieldValitation, ValidationComposite
} from '@/validation/validators';

import { makeLoginValidation } from './login-validation-factory';

describe('LoginValidationFactory', () => {
  test('should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValitation('email'),
        new EmailValidation('email'),
        new RequiredFieldValitation('password'),
        new MinLengthValidation('password', 5),
      ]),
    );
  });
});
