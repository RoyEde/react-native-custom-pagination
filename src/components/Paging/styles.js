import { StyleSheet } from 'react-native';
import { PAGING_AMOUNT } from './constants';
import { DOT_SIZE } from '../Dot/constants';

export default StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: 5
  },
  simpleList: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  complexList: {
    width: PAGING_AMOUNT * DOT_SIZE
  },
  listContentContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
