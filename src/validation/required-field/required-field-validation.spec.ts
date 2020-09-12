import faker from 'faker';

import { RequiredFieldValitation } from './required-field-validation';
import { RequiredFieldError } from '@/validation/errors';

describe('RequiredFieldValidation', () => {
  test(`Should return error if field is empty`, () => {
    const sut = new RequiredFieldValitation('email');
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  test(`Should return falsy if field is not empty`, () => {
    const sut = new RequiredFieldValitation('email');
    const error = sut.validate(faker.random.word());
    expect(error).toBeFalsy();
  });
});
