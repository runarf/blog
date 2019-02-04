import React from 'react'
import {
  Box,
  Button,
  Grommet,
  Text,
} from 'grommet'
import moment from 'moment'

class Bvg extends React.Component {
  state = {
    latitude: '',
    longitude: '',
    stops: [],
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.setState({
            latitude: coords.latitude,
            longitude: coords.longitude,
          })
          this.getStops()
        }
      )
    }
  }

  getStops() {
    const {
      latitude,
      longitude,
    } = this.state
    const url =
      'https://1.bvg.transport.rest/stations/nearby?' +
      'latitude=' +
      latitude +
      '&longitude=' +
      longitude
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(result => {
        console.log(
          'setting stops',
          result
        )
        this.setState({ stops: result })
      })
      .catch(err => console.log(err))
  }

  getDepartures(id, index) {
    console.log(
      'getting dep for id ' + id
    )

    console.log(this.state.stops[index])

    if (
      this.state.stops[index]
        .departures !== undefined
    ) {
      this.setState(prevState => {
        const newStops = [
          ...prevState.stops,
        ]

        newStops[
          index
        ].departures = undefined

        return { stops: newStops }
      })

      return
    }
    const url = `https://1.bvg.transport.rest/stations/${id}/departures`

    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.setState(prevState => {
          const newStops = [
            ...prevState.stops,
          ]

          newStops[
            index
          ].departures = result

          return {
            stops: newStops,
          }
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { stops } = this.state
    return (
      <Grommet>
        <Box
          justify="center"
          align="center"
        >
          {stops.length === 0 && (
            <Button
              onClick={this.getLocation}
              label="Get stops nearby"
            />
          )}
          <Box>
            {stops.length > 0 &&
              stops.map(
                (stop, index) => (
                  <Box key={index}>
                    <Button
                      onClick={() =>
                        this.getDepartures(
                          stop.id,
                          index
                        )
                      }
                    >
                      {stop.distance}{' '}
                      meter: {stop.name}
                      {Object.entries(
                        stop.products
                      ).map(
                        ([
                          key,
                          value,
                        ]) => {
                          if (
                            value ===
                            true
                          )
                            return (
                              ' ' +
                              key +
                              ' '
                            )
                        }
                      )}
                      {stop.departures &&
                        stop.departures.map(
                          (
                            departure,
                            index
                          ) => (
                            <Box
                              key={
                                index
                              }
                              justify="between"
                              direction="row"
                            >
                              <Box>
                                {
                                  departure.direction
                                }
                              </Box>
                              <Box>
                                {
                                  departure
                                    .line
                                    .id
                                }
                              </Box>
                              <Box>
                                {moment(
                                  departure.when
                                ).fromNow()}
                              </Box>
                            </Box>
                          )
                        )}
                    </Button>
                  </Box>
                )
              )}
          </Box>
        </Box>
      </Grommet>
    )
  }
}

export default Bvg
