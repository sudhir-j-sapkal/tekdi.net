import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import './product-list.scss';
import PreviewCompatibleImage from '../common/preview-compatible-image';

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    var url =  typeof window !== 'undefined' ? window.location.href : '';
    if(url)
     {
        this.boxId = url.match(/\/([^\/]+)\/?$/)[1];
     }
     else
     {
        this.boxId = "";
     }
  }
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    
    const params = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        1024: {
          loop: true,
          slidesPerView: 4,
          spaceBetween: 0
        },
        992: {
          loop: true,
          slidesPerView: 3,
          spaceBetween: 0
        },
        640: {
          loop: true,
          slidesPerView: 2,
          spaceBetween: 0
        },
        320: {
          loop: true,
          slidesPerView: 1,
          spaceBetween: 0
        }
      }
    }
    return (
      
      <div className="product-list">
        <Swiper {...params}>
        {posts &&
        posts.filter(({node}) => this.boxId !== node.fields.slug.match(/\/([^\/]+)\/?$/)[1]).map(({ node: post }) => (
          //this.boxId !== post.fields.slug.match(/\/([^\/]+)\/?$/)[1] ? (
          <div key={post.id} className="p-0 box-cover">
            <div className="position-relative box">
              {post.frontmatter.bgimage ? (
                  <div className="bg-image">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.bgimage,
                        alt: `image thumbnail for post ${post.frontmatter.title}`,
                      }}
                    />
                  </div>
                ) : null}
                <div className="text">
                  <h4 className="mb-4">
                    <Link to={post.fields.slug} className="text-decoration-none text-white">
                      {post.frontmatter.title}
                    </Link>
                  </h4>
                  <Link to={post.fields.slug} className="text-decoration-none">
                    <img src={require('./images/readmore-white.png')} alt="read more"/>
                  </Link>
                </div>
              </div>
          </div>
            // ) : null
        ))}
        </Swiper>
      </div>
   
    )
  }
}

ProductList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ProductListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "products-platforms" } } }
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
                bgimage {
                  childImageSharp {
                    fluid(maxHeight: 250, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ProductList data={data} count={count} />}
  />
)
