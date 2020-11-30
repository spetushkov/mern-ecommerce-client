import { Formik, FormikErrors, FormikHelpers, FormikProps } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { RouterEndpoint } from '../../../router/RouterEndpoint';
import { State } from '../../../store/Store';
import { StoreError } from '../../../store/StoreError';
import { StoreLoader } from '../../../store/StoreLoader';
import { useUserAdminAuthenticator } from '../../auth/useUserAdminAuthenticator';
import { JustifyCenter } from '../../content/JustifyCenter';
import { FormControl } from '../../form/FormControl';
import { FormUtils } from '../../form/FormUtils';
import { ProductActions } from '../ProductActions';
import { ProductApi } from '../ProductApi';
import { Product as ProductType } from '../type/Product';
import { ProductForm } from './ProductForm';

type Params = {
  id: string;
};

export const Product = (): JSX.Element => {
  useUserAdminAuthenticator();

  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams<Params>();
  const isCreate = !id;

  const productState = useSelector((state: State) => state.product);
  const { loading, data, error } = productState;
  const product = data.product;

  const authState = useSelector((state: State) => state.auth);
  const { data: authData } = authState;
  const userId = authData ? authData.user.id : '';

  const [fileUploading, setFileUploading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!isCreate) {
      dispatch(ProductActions.findById(id));
    }
  }, [isCreate, dispatch, id]);

  useEffect(() => {
    if (isCreate && product) {
      history.push(RouterEndpoint.adminProducts(product.id));
    }
  }, [isCreate, product, history]);

  const initialFormState = useMemo(() => ClassTransformer.fromPlain(ProductForm, product), [
    product,
  ]);

  const validateFormHandler = async (values: ProductForm): Promise<FormikErrors<ProductForm>> => {
    try {
      const result = await FormUtils.validate(values, ProductForm);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const isFormSubmittable = (form: FormikProps<ProductForm>) => {
    return FormUtils.isSubmittable(form);
  };

  const submitFormHandler = async (
    values: ProductForm,
    FormActions: FormikHelpers<ProductForm>,
  ): Promise<void> => {
    const formState = FormUtils.getState(values, ProductForm);

    if (isCreate) {
      const product: ProductType = {
        ...formState,
        id: '',
        user: userId,
        rating: 0.0,
        numReviews: 0,
      };
      dispatch(ProductActions.save(product));
    } else {
      dispatch(ProductActions.updateById(id, formState));
    }

    FormActions.setSubmitting(false);
  };

  const getSubmitTitle = (form: FormikProps<ProductForm>) => {
    switch (isCreate) {
      case true:
        return form.isSubmitting ? 'Saving...' : 'Save';
      default:
        return form.isSubmitting ? 'Updating...' : 'Update';
    }
  };

  const uploadFileHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
    form: FormikProps<ProductForm>,
  ) => {
    const fileList = e.target.files;
    if (!fileList) {
      return;
    }
    const file = fileList[0];

    const fieldName = 'image';
    const formData = new FormData();
    formData.append(fieldName, file);

    try {
      setFileUploading(true);
      const response = await ProductApi.uploadFile(fieldName, formData);
      form.setFieldValue('image', response.data ?? '');
      setFileUploading(false);
    } catch (error) {
      setFileUploading(false);
      Promise.reject(error);
    }
  };

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <JustifyCenter>
        <h1>{isCreate ? 'Create Product' : 'Edit Product'}</h1>
        <Formik
          enableReinitialize={true}
          initialValues={initialFormState ?? new ProductForm()}
          validate={validateFormHandler}
          onSubmit={submitFormHandler}
        >
          {(form) => (
            <>
              <Form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => form.handleSubmit(e)}
                noValidate
              >
                <FormControl
                  schema={form.values}
                  id='name'
                  type='text'
                  label='Name'
                  placeholder='Name'
                />
                <FormControl
                  schema={form.values}
                  id='image'
                  type='text'
                  label='Image'
                  placeholder='Image'
                />
                <Form.File
                  id='file'
                  label='Choose an image'
                  custom
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => uploadFileHandler(e, form)}
                />
                {fileUploading && <div>Uploading an image...</div>}
                <FormControl
                  schema={form.values}
                  id='description'
                  type='text'
                  label='Description'
                  placeholder='Description'
                />
                <FormControl
                  schema={form.values}
                  id='brand'
                  type='text'
                  label='Brand'
                  placeholder='Brand'
                />
                <FormControl
                  schema={form.values}
                  id='category'
                  type='text'
                  label='Category'
                  placeholder='Category'
                />
                <FormControl
                  schema={form.values}
                  id='price'
                  type='number'
                  label='Price'
                  placeholder='Price'
                />
                <FormControl
                  schema={form.values}
                  id='countInStock'
                  type='number'
                  label='Count In Stock'
                  placeholder='Count In Stock'
                />
                <Button type='submit' variant='primary' disabled={!isFormSubmittable(form)}>
                  {getSubmitTitle(form)}
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </JustifyCenter>
    </>
  );
};
