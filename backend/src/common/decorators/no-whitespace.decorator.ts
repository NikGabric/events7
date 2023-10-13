import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'noWhitespace', async: false })
export class NoWhitespaceConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'string' && value.trim() !== '';
  }

  defaultMessage() {
    return 'Invalid string: Cannot be empty or contain only spaces or newlines.';
  }
}
