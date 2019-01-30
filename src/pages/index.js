import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import styled from 'styled-components'
import {
  Box,
  Tab,
  Tabs,
  Text,
  Heading,
  Paragraph,
} from 'grommet'

const CardLink = styled(Link)`
  :hover {
    opacity: 0.8;
  }
  text-decoration: none;
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props

    const siteTitle =
      data.site.siteMetadata.title

    const posts =
      data.allMarkdownRemark.edges

    let codeSamples =
      data.allSitePage.edges

    codeSamples = codeSamples.filter(
      ({ node }) => {
        if (node.pluginCreator) {
          return (
            node.pluginCreator.name ===
            'gatsby-plugin-page-creator'
          )
        }
        return false
      }
    )
    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
      >
        <Bio />
        <Box background="green" fill>
          <Tabs flex>
            <Tab title="Code">
              <Box
                fill
                align="center"
                background="accent-1"
              >
                {codeSamples.map(
                  ({ node }) => {
                    return (
                      <Text
                        size="medium"
                        margin="xsmall"
                      >
                        <Link
                          to={node.path}
                        >
                          {node.path}
                        </Link>
                      </Text>
                    )
                  }
                )}
              </Box>
            </Tab>
            <Tab title="Blog">
              <Box
                fill
                background="accent-2"
                justify="center"
                align="center"
              >
                {posts.map(
                  ({ node }) => {
                    const title =
                      node.frontmatter
                        .title ||
                      node.fields.slug
                    return (
                      <CardLink
                        to={
                          node.fields
                            .slug
                        }
                      >
                        <article>
                          <Box
                            round="small"
                            elevation="small"
                            key={
                              node
                                .fields
                                .slug
                            }
                          >
                            <Heading level="3">
                              {title}
                            </Heading>
                            <Text size="xsmall">
                              {
                                node
                                  .frontmatter
                                  .date
                              }
                            </Text>
                            <Paragraph
                              dangerouslySetInnerHTML={{
                                __html:
                                  node.excerpt,
                              }}
                            />
                          </Box>
                        </article>
                      </CardLink>
                    )
                  }
                )}
              </Box>
            </Tab>
          </Tabs>
        </Box>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile {
      edges {
        node {
          relativePath
        }
      }
    }
    allSitePage {
      edges {
        node {
          path
          pluginCreator {
            name
          }
        }
      }
    }
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___date]
        order: DESC
      }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(
              formatString: "MMMM DD, YYYY"
            )
            title
          }
        }
      }
    }
  }
`
