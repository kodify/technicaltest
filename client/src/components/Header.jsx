import React from 'react';

const Header = (props) => {
  const styles = {
    backgroundImage: `url(${props.imageUrl})`,
  };

  const header = (
    <header className="intro-header" style={styles}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <div className="site-heading">
              <h1>{props.titleText}</h1>
              <hr className="small" />
              <span className="subheading">{props.subHeadingText}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  return header;
};

export default Header;
