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
  Button,
  Grid,
  Grommet,
  Text,
  TextInput,
} from 'grommet'

import { Add } from 'grommet-icons'

const schema = () => {
  return Yup.lazy(values => {
    const lotNames = []

    /*  lotName = values.lots
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
    ).filter(a => lotNames[a] > 1) */

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

const SIZES = [38, 39, 40]

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

const CustomField = ({ field }) => (
  <TextInput {...field} />
)

export default () => (
  <Grommet>
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
      }) => (
        <Form>
          <Box
            direction="row"
            justify="between"
          >
            <Text>Name of lot</Text>
            {SIZES.map(size => (
              <Text key={size}>
                {size}
              </Text>
            ))}
          </Box>
          <FieldArray name="lots">
            {arrayHelpers => {
              return [
                values.lots &&
                  values.lots.length >
                    0 &&
                  values.lots.map(
                    (lot, lotIndex) => (
                      <Box
                        key={lotIndex}
                        direction="row"
                        justify="center"
                      >
                        <Box
                          direction="row"
                          justify="center"
                        >
                          <Box>
                            <Field
                              name={`lots[${lotIndex}].name`}
                            >
                              {({
                                field,
                              }) => (
                                <TextInput
                                  {...field}
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              component={
                                Text
                              }
                              name={`lots[${lotIndex}].name`}
                            />
                          </Box>
                          {lot.quantities.map(
                            (
                              quantity,
                              quantityIndex
                            ) => (
                              <Box
                                key={
                                  quantityIndex
                                }
                              >
                                <Field
                                  component={
                                    CustomField
                                  }
                                  name={`lots[${lotIndex}].quantities[${quantityIndex}]`}
                                />
                                <ErrorMessage
                                  name={`lots[${lotIndex}].quantities[${quantityIndex}]`}
                                />
                              </Box>
                            )
                          )}
                        </Box>
                      </Box>
                    )
                  ),
                <Box
                  justify="center"
                  align="center"
                >
                  <Button
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
                    <Add />
                  </Button>
                  <Button
                    primary
                    type="submit"
                  >
                    <Text textAlign="center">
                      Submit
                    </Text>
                  </Button>
                </Box>,
              ]
            }}
          </FieldArray>
        </Form>
      )}
    </Formik>
  </Grommet>
)
