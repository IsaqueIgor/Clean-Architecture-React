/* eslint-disable implicit-arrow-linebreak */
import faker from 'faker';
import { InvalidFieldError } from '@/validation/errors';

import { CompareFieldsValitation } from './compate-fields-validation';

const makeSut = (valueToCompare: string): CompareFieldsValitation =>
  new CompareFieldsValitation(faker.database.column(), valueToCompare);

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });
});
