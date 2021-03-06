import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'

import { Box, Heading } from 'grommet'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data
      .markdownRemark
    const siteTitle = this.props.data
      .site.siteMetadata.title
    const {
      previous,
      next,
    } = this.props.pageContext

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.excerpt}
        />
        <div>
          <article>
            <Box>
              <header>
                <Box>
                  <Heading>
                    {
                      post.frontmatter
                        .title
                    }
                  </Heading>
                </Box>
                <Box>
                  {
                    post.frontmatter
                      .date
                  }
                </Box>
              </header>
              <Box
                pad={{
                  horizontal: 'medium',
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.html,
                  }}
                />
              </Box>
              <hr />
              <Bio />

              <Box
                flex
                wrap
                justify="between"
                background="yellow"
              >
                <ul
                  style={{
                    display: `flex`,
                    flexWrap: `wrap`,
                    justifyContent: `space-between`,
                    listStyle: `none`,
                    padding: 0,
                  }}
                >
                  <li>
                    {previous && (
                      <Link
                        to={
                          previous
                            .fields.slug
                        }
                        rel="prev"
                      >
                        ←{' '}
                        {
                          previous
                            .frontmatter
                            .title
                        }
                      </Link>
                    )}
                  </li>
                  <li>
                    {next && (
                      <Link
                        to={
                          next.fields
                            .slug
                        }
                        rel="next"
                      >
                        {
                          next
                            .frontmatter
                            .title
                        }{' '}
                        →
                      </Link>
                    )}
                  </li>
                </ul>
              </Box>
            </Box>
          </article>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(
      fields: { slug: { eq: $slug } }
    ) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(
          formatString: "MMMM DD, YYYY"
        )
      }
    }
  }
`
