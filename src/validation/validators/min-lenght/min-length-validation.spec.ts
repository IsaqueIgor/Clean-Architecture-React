import faker from 'faker';
import { InvalidFieldError } from '@/validation/errors';

import { MinLengthValidation } from './min-length-validation';

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5);

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(3));
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return false if value is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(5));
    expect(error).toBeFalsy();
  });
});
