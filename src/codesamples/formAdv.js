import React from 'react'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
} from 'formik'
import * as Yup from 'yup'
import uuid from 'uuid/v4'

import {
  Box,
  Grid,
  Grommet,
} from 'grommet'

const schema = () => {
  return Yup.lazy(values => {
    const lotNames = values.lots
      .map(lot => lot.name)
      .map(name => ({ count: 1, name }))
      .reduce((a, b) => {
        a[b.name] =
          (a[b.name] || 0) + b.count
        return a
      }, {})
    console.log(lotNames)
    const duplicateLotNames = Object.keys(
      lotNames
    ).filter(a => lotNames[a] > 1)

    return Yup.object().shape({
      lots: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .notOneOf(
              duplicateLotNames,
              'lotname has to be unique'
            )
            .required('required'),
          quantities: Yup.array().of(
            Yup.number()
              .typeError(
                'must be number'
              )
              .min(
                0,
                'must be positive'
              )
              .integer(
                'must be integer'
              )
          ),
        })
      ),
    })
  })
}

const countSizes = 3

const initialValues = {
  lots: [
    {
      name: 'Test',
      quantities: [
        '021111',
        '123',
        '231',
      ],
      id:
        '105d668b-0912-4bff-91b4-3aec881bb6ce',
    },
    {
      name: 'sdfsd',
      quantities: ['01', '21', '12'],
      id:
        '4041e2a2-6d47-42c1-8bf1-a3084e48992f',
    },
  ],
}

export default () => (
  <div className="container-fluid">
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(
        values,
        { setSubmitting }
      ) => {
        setTimeout(() => {
          alert(
            JSON.stringify(
              values,
              null,
              2
            )
          )
          setSubmitting(false)
        }, 400)
      }}
    >
      {({
        isSubmitting,
        values,
        isValid,
        resetForm,
      }) => (
        <Form>
          <div className="row">
            <div
              className="col-3"
              css={css`
                background-color: turquoise;
              `}
            >
              Name of lot
            </div>
            <div
              className="col"
              css={css`
                background-color: pink;
              `}
            >
              Quantities
            </div>
          </div>
          <FieldArray name="lots">
            {arrayHelpers => (
              <div>
                {values.lots &&
                  values.lots.length >
                    0 &&
                  values.lots.map(
                    (lot, lotIndex) => (
                      <div
                        className="row"
                        key={lot.id}
                      >
                        <div
                          className="col-3"
                          css={css`
                            background-color: turquoise;
                          `}
                        >
                          <Field
                            name={`lots[${lotIndex}].name`}
                          />
                          <ErrorMessage
                            name={`lots[${lotIndex}].name`}
                          />
                        </div>
                        {lot.quantities.map(
                          (
                            quantity,
                            quantityIndex
                          ) => (
                            <div
                              className="col"
                              key={
                                quantityIndex
                              }
                              css={css`
                                background-color: pink;
                              `}
                            >
                              <Field
                                name={`lots[${lotIndex}].quantities[${quantityIndex}]`}
                              />
                              <ErrorMessage
                                name={`lots[${lotIndex}].quantities[${quantityIndex}]`}
                              />
                            </div>
                          )
                        )}
                      </div>
                    )
                  )}
                <div className="row">
                  <div className="col">
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push(
                          {
                            name: '',
                            quantities: Array(
                              countSizes
                            ).fill(0),
                            id: uuid(),
                          }
                        )
                      }
                    >
                      +
                    </button>
                    <Button
                      type="submit"
                      disabled={
                        !isValid ||
                        isSubmitting
                      }
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  </div>
)
