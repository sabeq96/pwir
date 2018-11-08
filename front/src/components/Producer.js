import React from 'react';
import PropTypes from 'prop-types';

import {
  ProductRow,
  Loader,
  ProgressBar,
} from './Producer.styles';

const Producer = ({
  PRODUCING_TIME,
  productList,
  onProduce,
  onSetRole,
}) => (
  <React.Fragment>
    <div>So, you are Producer !</div>
    {
      productList.map((product) => (
        <ProductRow key={product.name}>
          <span>{product.name}</span>
          <span>qt:{product.qt}</span>
          <button
            onClick={
              !product.inProduction > 0 ?
                () => onProduce(product.name)
              : null
            }
            disabled={product.inProduction > 0}
          >
            Produce
          </button>
          <Loader>
            <ProgressBar
              isProducing={product.inProduction > 0}
              time={PRODUCING_TIME}
            />
          </Loader>
        </ProductRow>
      ))
    }
    <div onClick={() => onSetRole()}>Choose role again</div>
  </React.Fragment>
  )

Producer.propTypes = {
  PRODUCING_TIME: PropTypes.number.isRequired,
  productList: PropTypes.array.isRequired,
  onProduce: PropTypes.func.isRequired,
  onSetRole: PropTypes.func.isRequired,
}

export default Producer;