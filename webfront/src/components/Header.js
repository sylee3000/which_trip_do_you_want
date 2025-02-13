import React from 'react';
import './Header.css';

class Header extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      "btn_name": "Light",
      "isDark": false
    };
    this.handle_thememode = this.handle_thememode.bind(this);
  }

  handle_thememode(e) {
    this.props.thememode_callback();
    if (this.state.isDark) {
      this.setState({
        "btn_name": "Light",
        "isDark": false,
      });
    } else {
      this.setState({
        "btn_name": "Dark",
        "isDark": true
      });
    }
  }
  
  render() {
    return (
        <header id="header">
            <h1>관광지 추천 봇</h1>
            <button onClick={this.handle_thememode} id="darkmode_btn">{this.state.btn_name}</button>
        </header>
    );
  }
}

export default Header;