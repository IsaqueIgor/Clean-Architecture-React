/* eslint-disable implicit-arrow-linebreak */
import faker from 'faker';
import { InvalidFieldError } from '@/validation/errors';

import { CompareFieldsValitation } from './compate-fields-validation';

const makeSut = (
  field: string,
  valueToCompare: string
): CompareFieldsValitation =>
  new CompareFieldsValitation(field, valueToCompare);

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = 'any_field';
    const fieldToCompare = 'other_field';
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value',
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if compare is svalid', () => {
    const field = 'any_field';
    const fieldToCompare = 'other_field';
    const value = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBeFalsy();
  });
});
