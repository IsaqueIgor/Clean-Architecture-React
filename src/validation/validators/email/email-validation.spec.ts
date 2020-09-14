import faker from 'faker';

import { EmailValidation } from './email-validation';
import { InvalidFieldError } from '@/validation/errors';

const makeSut = (): EmailValidation =>
  new EmailValidation(faker.database.column());

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if email is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });

  test('should return falsy if email is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');
    expect(error).toBeFalsy();
  });
});
