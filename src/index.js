import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import Pagination from './components/Paging';
import { PAGING_AMOUNT } from './components/Paging/constants';

const { width, height } = Dimensions.get('window');

const DEFAULT_INDEX = 0;

const colors = [
  '#98CE00',
  '#001011',
  '#757780',
  '#3D2C2E',
  '#886F68',
  '#3E2A35',
  '#246EB9',
  '#263D42',
  '#3C787E',
  '#3F334D',
  '#773344',
  '#E04B2C',
  '#2CE04B',
  '#4B2CE0'
];

export default class App extends Component {
  state = {
    index: DEFAULT_INDEX
  };

  handleOnSnap = index =>
    index !== this.state.index && this.setState({ index });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Carousel
            style={{
              width,
              height: height - 300
            }}
            autoplay={false}
            pageInfo
            pageInfoBackgroundColor="#fff"
            currentPage={this.state.index}
            onAnimateNextPage={this.handleOnSnap}
          >
            {[...Array(colors.length)].map((_, index) => (
              <View
                key={colors[index]}
                style={[
                  {
                    backgroundColor: colors[index]
                  },
                  { flex: 1, alignItems: 'center', justifyContent: 'center' }
                ]}
              >
                <Text style={{ color: '#fff', fontSize: 32 }}>
                  {`Page: ${index + 1}`}
                </Text>
              </View>
            ))}
          </Carousel>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
        >
          <Text>{`PLACEHOLDER: ${this.state.index + 1}`}</Text>
          <View
            style={{
              backgroundColor: colors[this.state.index]
            }}
          >
            <Pagination
              activeIndex={this.state.index}
              total={colors.length}
              quantity={PAGING_AMOUNT}
              isComplex={colors.length > PAGING_AMOUNT}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height - 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
