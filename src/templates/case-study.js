import React from 'react';
import Helmet from 'react-helmet';
import { graphql} from 'gatsby';
import Layout from '../components/layout/baselayout';
import Banner from "../components/common/banner/banner";
import CaseStudyInfo from '../components/common/case-studies/case-study-info';
import { HTMLContent } from '../components/common/content';
class CaseStudyTemplate extends React.Component {
  constructor(props) {
    super(props)
    if(this.props.location.state)
    {
      this.modalSubmit = this.props.location.state !==null ?  this.props.location.state.modalSubmit : false;
    }
    else
    {
      this.modalSubmit = false;
    }
    
  }
    render()
    {
    const { markdownRemark: post } = this.props.data
      return (
        <Layout>
          <Helmet>
            <title>{post.frontmatter.title}</title>
            <meta
              name="description"
              content={`${post.frontmatter.subheading}`}
            />
          </Helmet>
          <Banner 
              bannerTitle= {post.frontmatter.bannerTitle} 
              bannerSubTitle = {post.frontmatter.bannerSubTitle}
            />
          {this.modalSubmit === true ? (
          <CaseStudyInfo
            heading = {post.frontmatter.heading}
            content={post.html}
            contentComponent={HTMLContent}
          />
          ) : <h3>Please fill the information</h3> }
        </Layout>
      )
  }
}

export default CaseStudyTemplate;

export const pageQuery = graphql`
  query CaseStudyTemplateByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
      }
      html
      frontmatter {
        title
        heading   
        bannerTitle
        bannerSubTitle
      }
    }
  }
`
