import React from 'react'
import { Link } from 'gatsby'
import {
  Button,
  Grommet,
  Box,
  Heading,
  ResponsiveContext,
  Text,
} from 'grommet'
import { Menu } from 'grommet-icons'
import Sidebar from './Sidebar'

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
}

const AppBar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{
      left: 'medium',
      right: 'small',
      vertical: 'small',
    }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}
  />
)

class Layout extends React.Component {
  state = {
    showSidebar: false,
  }

  handleSidebar = () =>
    this.setState(previousState => ({
      showSidebar: !previousState.showSidebar,
    }))

  render() {
    const { showSidebar } = this.state
    const {
      location,
      title,
      children,
    } = this.props

    return (
      <Grommet theme={theme}>
        <ResponsiveContext.Consumer>
          {size => (
            <Box>
              <AppBar>
                <Heading>
                  <Link to={`/`}>
                    <Text>My Blog</Text>
                  </Link>
                </Heading>
                <Button
                  icon={<Menu />}
                  onClick={
                    this.handleSidebar
                  }
                />
              </AppBar>
              <Box
                direction="row"
                flex
                overflow={{
                  horizontal: 'hidden',
                }}
                fill
              >
                <Box fill>
                  {children}
                  <Box>
                    <footer>
                      ©
                      {new Date().getFullYear()}
                      , Built with
                      <a href="https://www.gatsbyjs.org">
                        Gatsby
                      </a>
                    </footer>
                  </Box>
                </Box>
                <Sidebar
                  size={size}
                  showSidebar={
                    showSidebar
                  }
                  handleSidebar={
                    this.handleSidebar
                  }
                >
                  <Link to="/about">
                    About me
                  </Link>
                </Sidebar>
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    )
  }
}

export default Layout
