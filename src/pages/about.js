import React from 'react'
import Layout from '../components/Layout'
import { Box } from 'grommet'
export default props => (
  <Layout
    location={props.location}
    title="About me"
  >
    <Box
      fill
      justify="center"
      align="center"
    >
      This is about me, not you
    </Box>
  </Layout>
)
