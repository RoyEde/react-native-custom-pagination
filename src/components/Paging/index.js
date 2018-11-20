import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Dot from '../Dot';
import { Text } from 'react-native-elements';
import { DOT_SIZE } from '../Dot/constants';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    const last = props.total - 1;
    const offset = props.quantity - 2;
    const start = props.activeIndex <= offset;
    const end = props.activeIndex >= last - 2;
    const currentPosition = start
      ? props.activeIndex
      : end
      ? offset + (props.activeIndex === last)
      : props.activeIndex % offset || offset;
    this.state = {
      currentPosition,
      last,
      offset,
      start,
      end
    };
  }

  componentDidMount() {
    if (this.props.isComplex) {
      setTimeout(() => {
        this.pagingRef.scrollTo({
          x: (this.props.activeIndex - this.state.currentPosition) * DOT_SIZE,
          animated: false
        });
      }, 1);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.total && nextProps.quantity) {
      this.setState({
        last: nextProps.total - 1,
        offset: nextProps.quantity - 2
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { activeIndex, isComplex } = this.props;
    if (prevProps.activeIndex !== activeIndex && isComplex) {
      this.updatePosition(prevProps.activeIndex, activeIndex);
    }
  }

  updatePosition(prevIndex, currentIndex) {
    const { last, offset, currentPosition } = this.state;
    if (currentIndex <= offset) {
      this.scroll(0);
      return this.setState({
        start: true,
        end: false,
        currentPosition: currentIndex
      });
    } else if (currentIndex >= last - offset) {
      this.scroll(last);
      return this.setState({
        start: false,
        end: true,
        currentPosition: currentIndex - last + offset + 1
      });
    } else {
      const forward = prevIndex < currentIndex;
      const distance = currentIndex - prevIndex;
      const newPosition =
        (currentPosition + distance + (!forward && offset)) % offset || offset;
      const page = forward
        ? Math.floor((currentPosition + distance - 1) / offset)
        : -Math.floor((currentPosition - distance + 1) / offset);

      if (page !== 0) {
        this.scroll(currentIndex - newPosition);
      }
      this.setState({
        currentPosition: newPosition
      });
    }
  }

  isMedium = (index, left, right) =>
    (index >=
      this.props.activeIndex + this.state.offset - this.state.currentPosition &&
      right) ||
    (index <= this.props.activeIndex + 1 - this.state.currentPosition && left);

  isSmall = (index, left, right) =>
    (index >
      this.props.activeIndex + this.state.offset - this.state.currentPosition &&
      right) ||
    (index < this.props.activeIndex + 1 - this.state.currentPosition && left);

  scroll(index) {
    this.pagingRef.scrollTo({ x: index * DOT_SIZE, animated: true });
  }

  renderDots = () => {
    const { activeIndex, total, isComplex } = this.props;
    const { last, offset, currentPosition } = this.state;
    const start = activeIndex <= offset;
    const end = activeIndex >= last - 2;
    const right =
      currentPosition <= offset &&
      activeIndex + (end ? offset + 1 : 2) <= last - 2;
    const left =
      currentPosition >= 1 && activeIndex - (start ? offset + 1 : 2) >= 0;
    return [...Array(total)].map((_, index) => (
      <Dot
        key={index}
        isMediumSize={isComplex && this.isMedium(index, left, right)}
        isSmallSize={isComplex && this.isSmall(index, left, right)}
        isActive={index === activeIndex}
        dotColor="#f5c500"
      />
    ));
  };

  render() {
    if (this.props.total === 0) {
      return null;
    }
    return (
      <View style={styles.container}>
        {this.props.isComplex ? (
          <ScrollView
            contentContainerStyle={styles.listContentContainer}
            horizontal
            ref={ref => (this.pagingRef = ref)}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={styles.complexList}
          >
            {this.renderDots()}
          </ScrollView>
        ) : (
          <View style={styles.simpleList}>{this.renderDots()}</View>
        )}
        <Text style={{ color: '#fff' }}>{JSON.stringify(this.state)}</Text>
      </View>
    );
  }
}

Pagination.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  dotColor: PropTypes.string,
  isComplex: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired
};
