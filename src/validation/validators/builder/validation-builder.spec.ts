import faker from 'faker';
import {
  RequiredFieldValitation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators';

import { ValidationBuilder as sut } from './validation-builder';
import { CompareFieldsValitation } from '../compare-fields/compate-fields-validation';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation ', () => {
    const field = faker.database.column();
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValitation(field)]);
  });

  test('Should return EmailValidation ', () => {
    const field = faker.database.column();
    const validations = sut.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('Should return minLenghtValidation ', () => {
    const field = faker.database.column();
    const length = faker.random.number();
    const validations = sut.field(field).min(length).build();
    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });

  test('Should return CompareFieldsValitation ', () => {
    const field = faker.database.column();
    const fieldToCompate = faker.database.column();
    const validations = sut.field(field).sameAs(fieldToCompate).build();
    expect(validations).toEqual([new CompareFieldsValitation(field, fieldToCompate)]);
  });

  test('Should return a list of Validations', () => {
    const field = faker.database.column();
    const length = faker.random.number();
    const validations = sut.field(field).required().min(length).email()
      .build();
    expect(validations).toEqual([
      new RequiredFieldValitation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
    ]);
  });
});
