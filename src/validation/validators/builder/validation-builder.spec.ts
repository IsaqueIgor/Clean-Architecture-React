import {
  RequiredFieldValitation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators';
import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation ', () => {
    const validations = sut.field('any_field').required().build();
    expect(validations).toEqual([new RequiredFieldValitation('any_field')]);
  });

  test('Should return EmailValidation ', () => {
    const validations = sut.field('any_field').email().build();
    expect(validations).toEqual([new EmailValidation('any_field')]);
  });

  test('Should return minLenghtValidation ', () => {
    const validations = sut.field('any_field').min(5).build();
    expect(validations).toEqual([new MinLengthValidation('any_field', 5)]);
  });
});
