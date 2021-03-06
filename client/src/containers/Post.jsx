import { connect } from 'react-redux';
import React from 'react';
import Actions from '../actions/BlogActions';
import Menu from '../components/Menu';
import Header from '../components/Header';

class Post extends React.Component {
  componentDidMount() {
    const { post, params } = this.props;
    if (post.id === undefined || post.id !== parseInt(params.id, 10)) {
      const { dispatch } = this.props;
      dispatch(Actions.fetchPost(this.props.params.id));
    }
  }

  render() {
    const { post, config, params } = this.props;
    if (post.id === undefined || post.id !== parseInt(params.id, 10)) {
      return (
        <div>
          <Menu baseUrl={config.baseUrl} />
          <Header
            titleText="Loading..."
            subHeadingText=""
            imageUrl="/bundles/kodifyblog/img/home-bg.jpg"
          />
        </div>
      );
    }

    return (
      <div>
        <Menu baseUrl={config.baseUrl} />
        <Header
          titleText={post.title}
          subHeadingText={`Posted by ${post.author.name}`}
          imageUrl="/bundles/kodifyblog/img/home-bg.jpg"
        />

        <article>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1" id="content">
                { post.content }
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

function mapStateToProps({ post, config }) {
  return {
    post,
    config,
  };
}

Post.propTypes = {
  post: React.PropTypes.shape({
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    content: React.PropTypes.string,
    author: React.PropTypes.object,
    createdAt: React.PropTypes.object,
    updatedAt: React.PropTypes.object,
  }),
  config: React.PropTypes.shape({
    baseUrl: React.PropTypes.string,
    location: React.PropTypes.string,
  }),
  // eslint-disable-next-line
  params: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export default connect(mapStateToProps)(Post);
