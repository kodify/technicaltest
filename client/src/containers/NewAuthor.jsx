import { Button, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Actions from '../actions/BlogActions';

class NewAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateAuthorName = this.updateAuthorName.bind(this);
    this.getValidationState = this.getValidationState.bind(this);

    this.state = {
      authorName: '',
    };
  }

  getValidationState() {
    const length = this.state.authorName.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';

    return 'error';
  }

  updateAuthorName(event) {
    this.setState({ ...this.state, authorName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSaveAuthor(this.state.authorName);
  }

  render() {
    const { config } = this.props;

    return (
      <div>
        <Menu baseUrl={config.baseUrl} />
        <Header
          titleText="New Author"
          subHeadingText=""
          imageUrl="/bundles/kodifyblog/img/home-bg.jpg"
        />
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup controlId="formAuthor" validationState={this.getValidationState()} >
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl type="author" value={this.state.authorName} onChange={this.updateAuthorName} placeholder="Author Name" />
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
    onSaveAuthor: (authorName) => {
      dispatch(Actions.createAuthor(authorName));
    },
  };
}

const mapStateToProps = ({ config }) => {
  return {
    config,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAuthor);
