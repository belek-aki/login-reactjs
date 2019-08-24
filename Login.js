import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { getAuthToken } from "../utils/auth_headers";
import MaskedInput from "react-text-mask";
import { Loader } from "./Loader";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { intl } from "../route/AppRouter";

class Login extends Component {
  static propTypes = {
    action: PropTypes.shape({
      changeLogin: PropTypes.func,
      login: PropTypes.func
    })
  };

  submitButton = () => {
    this.props.actions.login();
  };

  renderError = () => {
    const { error } = this.props;
    if (error && error.data)
      return <small className="text-danger">{error.data && intl(error.data.message)}</small>;
    else return <small />;
  };

  renderLoginForm = () => {
    const { phone, password, phoneError } = this.props;
    const actions = this.props.actions;
    return (
      <form>
        <div>
          <label>
            <FormattedMessage id="login.phoneText" defaultMessage="Тел:" />
          </label>
          <MaskedInput
            className="select-control"
            mask={[
              "+",
              "9",
              "9",
              "6",
              "(",
              /[1-9]/,
              /\d/,
              /\d/,
              ")",
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/
            ]}
            guide={true}
            keepCharPositions={true}
            placeholder="+996(777)123-456"
            name="phone"
            value={phone}
            onChange={actions.changeLogin}
          />
          <br />
          <small className="text-danger">{intl(phoneError)}</small>
        </div>
        <div>
          <label>
            <FormattedMessage id="login.passwordText" defaultMessage="Пароль" />
          </label>
          <input
            className="select-control"
            type="Password"
            name="password"
            value={password}
            onChange={actions.changeLogin}
            placeholder="Ведите пароль"
          />
        </div>
        {this.renderError()}
        <div>
          <Button
            className="button-Password"
            bsStyle="primary"
            bsSize="large"
            onClick={this.submitButton}
            block
          >
            <FormattedMessage id="login.buttonText" defaultMessage="Вход" />
          </Button>
        </div>
        <br />
      </form>
    );
  };
  render() {
    const auth_token = getAuthToken();
    if (auth_token) {
      return <Redirect to="/" from="/login" />;
    }
    return (
      <div className="container">
        <div className="language-button-form" >
          <a role="button" onClick={e => this.props.actions.setLocale("ru")}>
            Русский{" "}
          </a>
          |
          <a role="button" onClick={e => this.props.actions.setLocale("ky")}>
            {" "}
            Кыргызча
          </a>
        </div>
        <div className="login-form ">
          <h2 className="text-form-control">
            <FormattedMessage
              id="login.titleText"
              defaultMessage="Вход в аккаунт"
            />{" "}
          </h2>
          {this.renderLoginForm()}
          <Link to="/sign_up" className="btn-link">
            <FormattedMessage
              id="login.clickRegisterText"
              defaultMessage=" Если у вас нет аккаунт нажмите регистрация"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default Loader(Login);
