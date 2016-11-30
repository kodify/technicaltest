import { connect } from 'react-redux';
import React from 'react';
import Actions from '../actions/BlogActions';
import Menu from '../components/Menu';
import Header from '../components/Header';
import PostListing from '../components/PostListing';

class Home extends React.Component {
  componentDidMount() {
    if (this.props.posts.length === 0) {
      const { dispatch } = this.props;
      dispatch(Actions.fetchPosts());
    }
  }

  render() {
    const { posts, config } = this.props;

    const reactComponent = (
      <div>
        <Menu baseUrl={config.baseUrl} />
        <Header
          titleText="Kodify Blog"
          subHeadingText="The world famous kodify's technical test"
          imageUrl="/bundles/kodifyblog/img/home-bg.jpg"
        />
        <div className="container">
          <PostListing posts={posts} baseUrl={config.baseUrl} />
        </div>
      </div>
    );

    return reactComponent;
  }
}

Home.propTypes = {
  posts: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    content: React.PropTypes.string,
    author: React.PropTypes.object,
    createdAt: React.PropTypes.object,
    updatedAt: React.PropTypes.object,
  })),
  config: React.PropTypes.shape({
    baseUrl: React.PropTypes.string,
    location: React.PropTypes.string,
  }),
  dispatch: React.PropTypes.func,
};

function mapStateToProps({ posts, config }) {
  return {
    posts,
    config,
  };
}

export default connect(mapStateToProps)(Home);
