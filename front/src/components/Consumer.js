import React from 'react';
import PropTypes from 'prop-types';

const Consumer = ({
  productList,
  onCancelProduct,
  onOrderProduct,
  onSetRole,
}) => (
  <React.Fragment>
    <div>So, you are Consumer !</div>
    {
      productList.map((product) => (
        <div key={product.name}>
          <span>{product.name}</span>
          {
            product.lobby > 0 ? (
              <button onClick={() => { onCancelProduct(product.name) }}>-</button>
            ) : null
          }
          <span>{product.lobby}</span>
          <button onClick={() => { onOrderProduct(product.name) }}>+</button>
          <span>owned:{product.owned}</span>
        </div>
      ))
    }
    <div onClick={() => onSetRole()}>Choose role again</div>
  </React.Fragment>
  )

Consumer.propTypes = {
  productList: PropTypes.array.isRequired,
  onCancelProduct: PropTypes.func.isRequired,
  onOrderProduct: PropTypes.func.isRequired,
  onSetRole: PropTypes.func.isRequired,
}

export default Consumer;