import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { DOT_SIZE } from './constants';

const SIZES = {
  small: DOT_SIZE - 5,
  medium: DOT_SIZE - 4,
  active: DOT_SIZE - 2,
  default: DOT_SIZE - 3
};

const DEFAULT_COLOR = '#fff';

const Dot = ({ isMediumSize, isSmallSize, isActive, dotColor }) => (
  <View
    style={{
      height: DOT_SIZE,
      width: DOT_SIZE,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Icon
      name="lens"
      size={
        (isActive && SIZES.active) ||
        (isSmallSize && SIZES.small) ||
        (isMediumSize && SIZES.medium) ||
        SIZES.default
      }
      color={(isActive && dotColor) || DEFAULT_COLOR}
    />
  </View>
);

Dot.propTypes = {};

export default Dot;
