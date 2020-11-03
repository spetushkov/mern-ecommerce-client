import { FormikErrors, FormikTouched } from 'formik';

export type Form<T> = {
  values: T;
  touched: FormikTouched<T>;
  errors: FormikErrors<T>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
};
