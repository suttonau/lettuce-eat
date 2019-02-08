import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    //FIXME: Change this to a constructor, so it will throw errors if something happens in render
    componentDidMount() {
      axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });

      axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({ error: error });
        }
      );
    }

    errorConfirmedHanlder = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHanlder}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
