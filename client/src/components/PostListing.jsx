import React from 'react';
import { Link } from 'react-router';

const PostListing = (props) => {
  const { posts, baseUrl } = props;

  if (posts.length === 0) {
    return (
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          There are no posts, let&#39;s create some!!
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
        {posts.map((post, idx) => (
          <div className="post-preview" key={idx}>
            <Link to={`${baseUrl}posts/${post.id}`}>
              <h2 className="post-title">
                { post.title }
              </h2>
              <h3 className="post-subtitle">{ post.content }</h3>
            </Link>
            <p className="post-meta">Posted by { post.author.name }</p>
          </div>
        ))}
      </div>
    </div>
  );
};

PostListing.propTypes = {
  posts: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    content: React.PropTypes.string,
    author: React.PropTypes.object,
    createdAt: React.PropTypes.object,
    updatedAt: React.PropTypes.object,
  })),
  baseUrl: React.PropTypes.string,
};

export default PostListing;
