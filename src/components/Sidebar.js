import React from 'react'
import {
  Button,
  Collapsible,
  Box,
  Layer,
} from 'grommet'
import { FormClose } from 'grommet-icons'

const Sidebar = props => {
  const {
    showSidebar,
    handleSidebar,
    size,
    children,
  } = props
  return !showSidebar ||
    size !== 'small' ? (
    <Collapsible
      direction="horizontal"
      open={showSidebar}
    >
      <Box
        flex
        width="medium"
        background="light-2"
        elevation="small"
        align="center"
        justify="center"
      >
        {children}
      </Box>
    </Collapsible>
  ) : (
    <Layer>
      <Box
        background="light-2"
        tag="header"
        justify="end"
        align="center"
        direction="row"
      >
        <Button
          icon={<FormClose />}
          onClick={handleSidebar}
        />
      </Box>
      <Box
        fill
        background="light-2"
        align="center"
        justify="center"
      >
        {children}
      </Box>
    </Layer>
  )
}

export default Sidebar
