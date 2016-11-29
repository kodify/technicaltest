import { connect } from 'react-redux';
import React from 'react';
import Actions from '../actions/BlogActions'
import Menu from '../components/Menu';
import Header from '../components/Header';

class Post extends React.Component{
  static propTypes = {
    post: React.PropTypes.object,
  }

  componentDidMount() {
    if ( !this.props.post || this.props.post.id != this.props.params.id) {
      const { dispatch } = this.props;
      dispatch(Actions.fetchPost(this.props.params.id));
    }
  }

  render() {
    const { post, config, fetching, params } = this.props;

    if (fetching || !post || post.id != params.id) {
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
        <Menu />
        <Header
          titleText={post.title}
          subHeadingText={`Posted by ${ post.author.name }`}
          imageUrl="/bundles/kodifyblog/img/home-bg.jpg"
        />

        <article>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
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
    config
  };
}

export default connect(mapStateToProps)(Post);
