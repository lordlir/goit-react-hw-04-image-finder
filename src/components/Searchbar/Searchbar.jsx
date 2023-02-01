import React, { useState } from 'react';
import s from './Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return;
    }
    onSubmit(query);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.box}>
        <button className={s.btn} type="submit">
          <span className={s.span}>Search</span>
          <FcSearch className={s.search} />
        </button>
        <input
          className={s.input}
          type="text"
          value={query}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};
