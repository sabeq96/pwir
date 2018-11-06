import React from 'react';
import PropTypes from 'prop-types';

const Producer = ({
  productList,
  onSetRole,
}) => (
  <React.Fragment>
    <div>So, you are Producer !</div>
    {
      productList.map((product) => (
        <div key={product.name}>
          <span>{product.name}</span>
          <button>-</button>
          <span>{product.qt}</span>
          <button>+</button>
        </div>
      ))
    }
    <div onClick={() => onSetRole()}>Choose role again</div>
  </React.Fragment>
  )

Producer.propTypes = {
  onSetRole: PropTypes.func.isRequired,
  productList: PropTypes.array.isRequired,
}

export default Producer;