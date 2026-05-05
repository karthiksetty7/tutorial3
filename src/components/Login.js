import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onSubmit = async e => {
    e.preventDefault()

    const {username, password} = this.state
    const {history} = this.props

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    })

    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {errorMsg} = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          type="text"
          onChange={e => this.setState({username: e.target.value})}
        />

        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          onChange={e => this.setState({password: e.target.value})}
        />

        <button type="submit">Login</button>

        {errorMsg && <p>{errorMsg}</p>}
      </form>
    )
  }
}

export default Login
