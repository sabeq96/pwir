import React from 'react';
import PropTypes from 'prop-types';

import {
  SiteWrapper,
  PageTitle,
  ProductWrapper,
  ProductRow,
  ChooseAgain,
} from './Global.styles';

import {
  Loader,
  ProgressBar,
} from './Producer.styles';

const Producer = ({
  PRODUCING_TIME,
  productList,
  onProduce,
  onSetRole,
}) => (
  <SiteWrapper>
    <PageTitle>So, you are Producer !</PageTitle>
    <ProductWrapper>
      {
        productList.map((product) => (
          <ProductRow key={product.name}>
            <span>Product name: {product.name}</span>
            <span>In warehouse: {product.qt}</span>
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
    </ProductWrapper>
    <ChooseAgain onClick={() => onSetRole()}>Choose role again</ChooseAgain>
  </SiteWrapper>
  )

Producer.propTypes = {
  PRODUCING_TIME: PropTypes.number.isRequired,
  productList: PropTypes.array.isRequired,
  onProduce: PropTypes.func.isRequired,
  onSetRole: PropTypes.func.isRequired,
}

export default Producer;