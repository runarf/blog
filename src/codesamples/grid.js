import React, { Component } from 'react'

import {
  Grommet,
  Box,
  Button,
  Grid,
  Text,
} from 'grommet'
import { grommet } from 'grommet/themes'

class AppGrid extends Component {
  state = { sidebar: true }

  render() {
    const { sidebar } = this.state
    return (
      <Grommet full theme={grommet}>
        <Grid
          fill
          rows={['auto', 'flex']}
          columns={['auto', 'flex']}
          areas={[
            {
              name: 'header',
              start: [0, 0],
              end: [1, 0],
            },
            {
              name: 'sidebar',
              start: [0, 1],
              end: [0, 1],
            },
            {
              name: 'main',
              start: [1, 1],
              end: [1, 1],
            },
          ]}
        >
          <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            pad={{
              horizontal: 'medium',
              vertical: 'small',
            }}
            background="dark-2"
          >
            <Button
              onClick={() =>
                this.setState({
                  sidebar: !sidebar,
                })
              }
            >
              <Text size="large">
                Title
              </Text>
            </Button>
            <Text>my@email</Text>
          </Box>
          {sidebar && (
            <Box
              gridArea="sidebar"
              background="dark-3"
              width="small"
              justify="between"
              animation={[
                {
                  type: 'fadeIn',
                  duration: 3000,
                },
                {
                  type: 'slideRight',
                  size: 'small',
                  duration: 1000,
                },
              ]}
            >
              {[
                'First',
                'Second',
                'Third',
              ].map(name => (
                <Button
                  key={name}
                  href="#"
                  hoverIndicator
                >
                  <Box
                    align="center"
                    pad={{
                      vertical: 'large',
                    }}
                  >
                    <Text>{name}</Text>
                  </Box>
                </Button>
              ))}
            </Box>
          )}
          <Box
            gridArea="main"
            justify="center"
            align="center"
          >
            <Text>main</Text>
          </Box>
        </Grid>
      </Grommet>
    )
  }
}

const Percentages = () => (
  <Grommet theme={grommet} full>
    <Grid
      fill
      areas={[
        {
          name: 'nav',
          start: [0, 0],
          end: [0, 0],
        },
        {
          name: 'main',
          start: [1, 0],
          end: [1, 0],
        },
      ]}
      columns={['small', 'flex']}
      rows={['flex']}
      gap="small"
    >
      <Box
        gridArea="nav"
        background="brand"
      />
      <Box
        gridArea="main"
        background="brand"
      />
    </Grid>
  </Grommet>
)

const NColumnGrid = () => (
  <Grommet theme={grommet} full>
    <Grid
      columns={{
        count: 6,
        size: 'auto',
      }}
      gap="small"
    >
      <Box background="brand">
        Item 1
      </Box>
      <Box background="brand">
        Item 2
      </Box>
      <Box background="brand">
        Item 3
      </Box>
      <Box background="brand">
        Item 4
      </Box>
      <Box background="brand">
        Item 5
      </Box>
      <Box background="brand">
        Item 6
      </Box>
    </Grid>
  </Grommet>
)

export default AppGrid
