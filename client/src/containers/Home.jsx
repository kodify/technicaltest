import { connect } from 'react-redux';
import React from 'react';
import Actions from '../actions/BlogActions'
import Menu from '../components/Menu';
import Header from '../components/Header';
import PostListing from '../components/PostListing';

class Home extends React.Component {
  static propTypes = {
    posts: React.PropTypes.array,
  }

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
        <Menu baseUrl={config.baseUrl}/>
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
};

function mapStateToProps({ posts, config }) {
  return {
    posts,
    config
  };
}

export default connect(mapStateToProps)(Home);
