import faker from 'faker';
import { RequiredFieldError } from '@/validation/errors';

import { RequiredFieldValitation } from './required-field-validation';

const makeSut = (field: string): RequiredFieldValitation => new RequiredFieldValitation(field);

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should return falsy if field is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
