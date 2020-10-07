/* eslint-disable @typescript-eslint/ban-types */
export interface FieldValidation {
  field: string;
  validate: (input: object) => Error;
}
