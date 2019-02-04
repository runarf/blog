import React from 'react'
import {
  Box,
  Grommet,
  Image,
} from 'grommet'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

class CountryFacts extends React.Component {
  state = {
    facts: [0],
  }

  componentDidMount() {
    console.log('fetching')
    fetch(
      'https://restcountries.eu/rest/v2/all'
    )
      .then(result => result.json())
      .then(result => {
        console.log('fetched')
        console.log(result)
        this.setState({ facts: result })
      })
  }

  render() {
    return (
      <Layout>
        {this.state.facts.map(
          (fact, index) => (
            <Box
              key={index}
              align="center"
              border
              margin="small"
            >
              <Box>{fact.name}</Box>
              <Box height="xsmall">
                <Image
                  fit="contain"
                  src={fact.flag}
                />
              </Box>
              <Box align="center">
                {' '}
                {fact.capital}
              </Box>
              <Box>
                {fact.population}
              </Box>
            </Box>
          )
        )}
      </Layout>
    )
  }
}

export default CountryFacts
