import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'

import { Box, Tab, Tabs } from 'grommet'

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
                      <Box>
                        <Link
                          to={node.path}
                        >
                          {node.path}
                        </Link>
                      </Box>
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
                      <article>
                        <Box
                          round="small"
                          elevation="small"
                          border={{
                            side: 'all',
                          }}
                        >
                          <div
                            key={
                              node
                                .fields
                                .slug
                            }
                          >
                            <h3>
                              <Link
                                style={{
                                  boxShadow: `none`,
                                }}
                                to={
                                  node
                                    .fields
                                    .slug
                                }
                              >
                                {title}
                              </Link>
                            </h3>
                            <small>
                              {
                                node
                                  .frontmatter
                                  .date
                              }
                            </small>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  node.excerpt,
                              }}
                            />
                          </div>
                        </Box>
                      </article>
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
