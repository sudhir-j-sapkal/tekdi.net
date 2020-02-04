

import Layout from '../components/layout/baselayout';
import BlogPagination from '../components/blog/pagination';
import renderList from '../components/blog/renderlist';
import { Link, graphql } from 'gatsby'
import BlogCatList from '../components/blog/blogcatlist';
import Banner from "../components/common/banner/banner"
import React, { Fragment } from 'react'

 class BlogIndexPage extends React.Component {
   
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext

    return (
      <Layout>
        <Banner bannerTitle= "blogs" bannerSubTitle = "blogs"/> 
        <div className="container py-5">
          <div className="row">
              <Fragment>
                <div className="col-md-9">
                  {posts.map(renderList)}
                  <BlogPagination currentPage={currentPage} numPages={numPages} />
                </div> 
              </Fragment>
            <div className="col-md-3">
              <BlogCatList />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default BlogIndexPage;
export const blogListQuery = graphql`
query BlogListQuery($skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
    filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    limit: $limit
    skip: $skip
  ) {
    edges {
      node {
        excerpt(pruneLength: 200)
        id
        fields {
          slug
        }
        frontmatter {
          title
          templateKey
          date(formatString: "DD MMMM YYYY")
          author
          category
          featuredpost
          featuredimage {
            childImageSharp {
              fluid(maxWidth: 200, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}`