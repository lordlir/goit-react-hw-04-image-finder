import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <button className="btn" type="button" onClick={onClick}>
      Load more
    </button>
  );
};

Button.prototype = {
  onClick: PropTypes.func.isRequired,
};
