/* eslint-disable implicit-arrow-linebreak */
import faker from 'faker';
import { InvalidFieldError } from '@/validation/errors';

import { CompareFieldsValitation } from './compate-fields-validation';

const makeSut = (field: string, valueToCompare: string): CompareFieldsValitation =>
  new CompareFieldsValitation(field, valueToCompare);

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column();
    const fieldToCompate = faker.database.column();
    const sut = makeSut(field, fieldToCompate);
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompate]: faker.random.word()
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompate = faker.database.column();
    const value = faker.random.word();
    const sut = makeSut(field, fieldToCompate);
    const error = sut.validate({
      [field]: value,
      [fieldToCompate]: value
    });
    expect(error).toBeFalsy();
  });
});
