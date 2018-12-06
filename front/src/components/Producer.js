import React from 'react';
import PropTypes from 'prop-types';

import {
  SiteWrapper,
  PageTitle,
  ProductWrapper,
  ProductRow,
  ChooseAgain,
  Loader,
} from './Global.styles';

const Producer = ({
  PRODUCING_TIME,
  productList,
  onSetRole,
}) => (
  <SiteWrapper>
    <PageTitle>So, you are Producer !</PageTitle>
    <ProductWrapper>
      {
        productList.map((product) => (
          <ProductRow key={product.name}>
            <span>Product name: {product.name}</span>
            <span>My warehouse: {product.qt_me}</span>
            <span>Total in warehouse: {product.qt_total}</span>
            <span>Total queries: {product.lobby_total}</span>
            {product.inProduction_me > 0? <Loader /> : <div></div>}
          </ProductRow>
        ))
      }
    </ProductWrapper>
    <ChooseAgain onClick={() => onSetRole()}>Choose role again</ChooseAgain>
  </SiteWrapper>
  )

Producer.propTypes = {
  PRODUCING_TIME: PropTypes.number.isRequired,
  productList: PropTypes.array.isRequired,
  onSetRole: PropTypes.func.isRequired,
}

export default Producer;