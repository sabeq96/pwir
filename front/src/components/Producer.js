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
  onSetRole,
}) => (
  <SiteWrapper>
    <PageTitle>So, you are Producer !</PageTitle>
    <ProductWrapper>
      {
        productList.map((product) => (
          <ProductRow key={product.name}>
            <span>Product name: {product.name}</span>
            <span>In warehouse: {product.qt_me}</span>
            <Loader>
            {console.debug('debug', product.inProduction_me < 0 ? null : product.debug)}
              <ProgressBar
                isProducing={product.inProduction_me > 0}
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
  onSetRole: PropTypes.func.isRequired,
}

export default Producer;