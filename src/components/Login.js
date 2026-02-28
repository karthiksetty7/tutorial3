import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onSubmit = e => {
    e.preventDefault()
    const {username, password} = this.state
    const {history} = this.props

    if (username === 'rahul' && password === 'rahul@2021') {
      Cookies.set('jwt_token', 'dummy_token', {expires: 1})
      history.replace('/')
    } else {
      this.setState({errorMsg: 'Invalid username or password'})
    }
  }

  render() {
    const {errorMsg} = this.state

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmit}>
          <h2 className="login-title">Login</h2>

          <input
            className="login-input"
            placeholder="Username"
            onChange={e => this.setState({username: e.target.value})}
          />

          <input
            type="password"
            className="login-input"
            placeholder="Password"
            onChange={e => this.setState({password: e.target.value})}
          />

          <button className="login-button" type="submit">
            Login
          </button>

          {errorMsg && <p className="login-error">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
