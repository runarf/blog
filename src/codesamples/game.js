import React from 'react'
import {
  Box,
  Keyboard,
  Grommet,
} from 'grommet'
//import words from 'all-the-german-words'
import fetchJsonp from 'fetch-jsonp'
import $ from 'jquery'

const words = ['A', 'B']

const length = words.length

const getNoun = () => {
  let isNoun = false
  let noun = ''
  while (isNoun === false) {
    noun =
      words[
        Math.floor(
          Math.random() * (length - 0) +
            0
        )
      ]

    if (
      noun[0] === noun[0].toUpperCase()
    ) {
      isNoun = true
    }
  }

  return noun
}

let url =
  //  'https://randomuser.me/api/?results=10'
  'https://de.wiktionary.org/wiki/Pferd'

class Game extends React.Component {
  state = {
    message: getNoun(),
  }

  fetchHorse = () => {
    console.log('fetching')

    const curl =
      'https://de.wiktionary.org' //'https://google.com'

    const durl =
      'http://www.whateverorigin.org/get?url=' +
      encodeURIComponent(curl) +
      '&callback=?'

    console.log(durl)
    $.getJSON(durl, function(data) {
      alert(data.contents)
    })
  }

  setRandomWord = () =>
    this.setState({
      message: getNoun(),
    })

  render() {
    return (
      <Grommet>
        <Box
          fill
          align="center"
          justify="center"
        >
          <Keyboard
            target="document"
            onLeft={() => {
              this.setState({
                message: 'left',
              })
            }}
            onRight={() => {
              this.setRandomWord()
            }}
            onDown={() => {
              this.fetchHorse()
            }}
            onUp={() => {
              this.setState({
                message: 'up',
              })
            }}
          >
            <Box>
              {this.state.message}
            </Box>
          </Keyboard>
        </Box>
      </Grommet>
    )
  }
}

export default Game
