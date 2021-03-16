import { Component } from 'react';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInput = e => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <div className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmitForm}>
          <button
            type="submit"
            className={s.SearchForm__button}
            onClick={this.handleSubmitForm}
          >
            <span className={s.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={s.SearchForm__input}
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleInput}
            autoComplete="off"
            autoFocus
            placeholder="Search Movies"
          />
        </form>
      </div>
    );
  }
}

export default Searchbar;
