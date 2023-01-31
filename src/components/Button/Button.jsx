import PropTypes from 'prop-types';

export const Button = ({ onNextFetch }) => {
  return (
    <button className="btn" type="button" onClick={onNextFetch}>
      Load more
    </button>
  );
};

Button.prototype = {
  onNextFetch: PropTypes.func.isRequired,
};
