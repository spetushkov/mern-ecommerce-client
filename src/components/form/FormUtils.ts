import { FormikErrors } from 'formik';
import { ClassTransformer, Clazz } from '../../class/ClassTransformer';
import { ClassValidator } from '../../class/ClassValidator';

const getState = <T>(values: T, entityClass: Clazz<T>): T => {
  return ClassTransformer.fromPlain(entityClass, values);
};

const validate = async <T>(values: T, entityClass: Clazz<T>): Promise<FormikErrors<T>> => {
  try {
    const formState = getState(values, entityClass);
    const formErrors = await ClassValidator.validate(formState, false);
    return Promise.resolve(formErrors as FormikErrors<T>);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const FormUtils = {
  getState,
  validate,
};
