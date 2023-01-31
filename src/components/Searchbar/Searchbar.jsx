import React, { Component } from 'react';
import s from './Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';
export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <div className={s.box}>
          <button className={s.btn} type="submit">
            <span className={s.span}>Search</span>
            <FcSearch className={s.search} />
          </button>
          <input
            className={s.input}
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}
