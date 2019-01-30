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

import {
  Add,
  Close,
} from 'grommet-icons'

const schema = () => {
  return Yup.lazy(values => {
    const lotNames = []
    const duplicateLotNames = []
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
  ],
}

const CustomField = ({ field }) => (
  <TextInput {...field} />
)

export default () => {
  let addRow
  return (
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
            <Grid
              columns={['xsmall']}
              rows={[
                'auto',
                'auto',
                'flex',
              ]}
              areas={[
                {
                  name: 'header',
                  start: [0, 0],
                  end: [1, 0],
                },
                {
                  name: 'main',
                  start: [0, 1],
                  end: [1, 1],
                },
                {
                  name: 'bottom',
                  start: [0, 2],
                  end: [1, 2],
                },
              ]}
            >
              <Box gridArea="header">
                <Grid
                  columns={[
                    'xsmall',
                    ...SIZES.map(
                      () => 'xsmall'
                    ),
                    'xsmall',
                  ]}
                  gap="small"
                  margin="small"
                >
                  <Box
                    background="red"
                    align="center"
                  >
                    <Text>
                      Name of lot
                    </Text>
                  </Box>
                  {SIZES.map(size => (
                    <Box align="center">
                      <Text key={size}>
                        {size}
                      </Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
              <Box gridArea="main">
                <FieldArray name="lots">
                  {arrayHelpers => {
                    addRow =
                      arrayHelpers.push
                    return [
                      values.lots &&
                        values.lots
                          .length > 0 &&
                        values.lots.map(
                          (
                            lot,
                            lotIndex
                          ) => (
                            <Grid
                              columns={[
                                'xsmall',
                                ...SIZES.map(
                                  () =>
                                    'xsmall'
                                ),
                                'xsmall',
                              ]}
                              gap="small"
                              margin="small"
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
                                      component={
                                        Text
                                      }
                                      name={`lots[${lotIndex}].quantities[${quantityIndex}]`}
                                    />
                                  </Box>
                                )
                              )}

                              <Box justify="center">
                                <Button
                                  onClick={() =>
                                    arrayHelpers.remove(
                                      lotIndex
                                    )
                                  }
                                >
                                  <Close />
                                </Button>
                              </Box>
                            </Grid>
                          )
                        ),
                    ]
                  }}
                </FieldArray>
              </Box>
              <Box
                gridArea="bottom"
                pad="xsmall"
              >
                <Grid
                  columns={[
                    'small',
                    'small',
                  ]}
                  justifyContent="start"
                  gap="small"
                >
                  <Box>
                    <Button
                      onClick={() =>
                        addRow({
                          name: '',
                          quantities: Array(
                            countSizes
                          ).fill(0),
                          id: uuid(),
                        })
                      }
                      label={<Add />}
                    />
                  </Box>
                  <Box>
                    <Button
                      primary
                      type="submit"
                      label="Submit"
                    />
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grommet>
  )
}
