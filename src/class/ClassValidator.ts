import { validate, ValidationError, ValidatorOptions } from 'class-validator';

export class ClassValidator {
  static async validate(
    obj: Object,
    skipMissingProperties: boolean,
  ): Promise<Record<string, string[]>> {
    try {
      const options: ValidatorOptions = {
        skipUndefinedProperties: false,
        skipNullProperties: false,
        skipMissingProperties,
        whitelist: true,
        forbidNonWhitelisted: false,
        dismissDefaultMessages: false,
        validationError: {
          target: true,
          value: true,
        },
        forbidUnknownValues: true,
      };

      const errors = await validate(obj, options);
      if (errors.length === 0) {
        return Promise.resolve({});
      }

      const errorsUpdated = this.reduceErrors({}, errors);
      return Promise.resolve(errorsUpdated);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private static reduceErrors(
    accumulator: Record<string, string[]>,
    errors: ValidationError[],
  ): Record<string, string[]> {
    let accumulatorUpdated = { ...accumulator };
    errors.forEach((error) => {
      if (error.constraints) {
        accumulatorUpdated[error.property] = Object.values(error.constraints);
      }
      if (error.children) {
        accumulatorUpdated = this.reduceErrors(accumulatorUpdated, error.children);
      }
    });
    return accumulatorUpdated;
  }
}
