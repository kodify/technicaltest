import { Button, Col, Form, FormGroup, ControlLabel, FormControl, Alert, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Actions from '../actions/BlogActions';

class NewPost extends React.Component {
  static propTypes = {
    authors: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.getTitleValidationState = this.getTitleValidationState.bind(this);
    this.getContentValidationState = this.getContentValidationState.bind(this);
    this.validateState = this.validateState.bind(this);

    this.state = {
      title: '',
      author: '',
      content: '',
      valid: true,
    };
  }

  componentDidMount() {
    if (this.props.authors.length === 0) {
      this.props.onAuthorFetch();
    }
  }

  getTitleValidationState() {
    const length = this.state.title.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';

    return 'error';
  }

  getAuthorValidationState() {
    if (this.state.author !== '') {
      return 'success';
    }

    return 'error';
  }

  getContentValidationState() {
    const length = this.state.content.length;
    if (length > 100) return 'success';
    else if (length > 60) return 'warning';

    return 'error';
  }

  updateTitle(event) {
    this.setState({ ...this.state, title: event.target.value });
  }

  updateAuthor(event) {
    this.setState({ ...this.state, author: event.target.value });
  }

  updateContent(event) {
    this.setState({ ...this.state, content: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateState()) {
      this.setState({ ...this.state, valid: true });
      this.props.onSavePost(this.state);
    } else {
      this.setState({ ...this.state, valid: false });
    }
  }

  validateState() {
    if (this.state.author === '') {
      return false;
    }

    if (this.state.title.length < 5) {
      return false;
    }

    if (this.state.content.length < 60) {
      return false;
    }

    return true;
  }

  render() {
    const { config, authors } = this.props;

    return (
      <div>
        <Menu baseUrl={config.baseUrl} />
        <Header
          titleText="New Post"
          subHeadingText=""
          imageUrl="/bundles/kodifyblog/img/home-bg.jpg"
        />
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            {!this.state.valid && <Alert bsStyle="warning"><strong>Form not valid</strong> Please check everything is ok and click send</Alert>}
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup controlId="title" validationState={this.getTitleValidationState()} >
                <Col componentClass={ControlLabel} sm={2}>
                  Title
                </Col>
                <Col sm={10}>
                  <FormControl type="text" value={this.state.title} onChange={this.updateTitle} placeholder="Title" />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect" validationState={this.getAuthorValidationState()}>
                <Col componentClass={ControlLabel} sm={2}>
                  Author
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" onChange={this.updateAuthor} value={this.state.author} >
                    <option value="">Select and author</option>
                    {authors.map((author, index) => {
                      return (
                        <option value={author.id} key={index}>{author.name}</option>
                      );
                    })}
                  </FormControl>
                  <FormControl.Feedback />
                </Col>
              </FormGroup>
              <FormGroup controlId="content" validationState={this.getContentValidationState()}>
                <Col componentClass={ControlLabel} sm={2}>
                  Content
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="textarea" value={this.state.content} onChange={this.updateContent} placeholder="Post Content" />
                  <FormControl.Feedback />
                  <HelpBlock>Validation is based on string length.</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    Save
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSavePost: (data) => {
      dispatch(Actions.createPost(data));
    },
    onAuthorFetch: () => {
      dispatch(Actions.fetchAuthors());
    }
  };
}

const mapStateToProps = ({ config, authors }) => {
  return {
    config,
    authors
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
