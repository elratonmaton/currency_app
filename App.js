/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      dolar: '...',
      euro: '...',
      real: '...',
      timer: 5
    }
  }

  changeAmounts = async () => {
    let res_dolar = 0;
    let res_euro = 0;
    let res_real = 0;
    let responseAPI;
    let currency;

    responseAPI = await fetch('http://laisladelraton.com:3002/cotizacion/dolar');
    currency = await responseAPI.json();
    res_dolar = currency.precio;

    responseAPI = await fetch('http://laisladelraton.com:3002/cotizacion/euro');
    currency = await responseAPI.json();
    res_euro = currency.precio;

    responseAPI = await fetch('http://laisladelraton.com:3002/cotizacion/real');
    currency = await responseAPI.json();
    res_real = currency.precio;
    
    this.setState({
      dolar: res_dolar.toFixed(3),
      euro: res_euro.toFixed(3),
      real: res_real.toFixed(3)
    });
  };

  decrementClock = () => {
    if(this.state.timer === 0) {
      this.changeAmounts();
      this.setState({
        timer: 6,
        dolar: '...',
        euro: '...',
        real: '...'
      })
    }
    this.setState((prevstate) => ({ timer: prevstate.timer - 1 }));
  };

  async componentDidMount(){
    this.changeAmounts(); 
    this.clockCall = setInterval(() => {
      this.decrementClock();
    }, 1000);
    
  }
  
  getDivisas = async () => {

    // let response = await fetch('http://laisladelraton.com:3002/cotizacion/' + moneda,);


    return(
      <View style={styles.cellCont}>
        <View style={styles.titlecell}>
          <Text style={styles.title}>{moneda.toUpperCase()}</Text>
        </View>
        <View style={styles.bodycell}>
          <Text style={styles.content}>{simbolo} 10.47</Text>
        </View>
      </View>
    );
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.appbar}>
          <Text style={styles.welcome}>Cotizacion de divisas</Text>
          <Text style={styles.instructions}>Los datos se refrescaran en {this.state.timer} segundos</Text>
        </View>
        

        <View style={styles.appbody}>
          <LinearGradient colors={['#627f9f', '#6690a7']} style={styles.currency}>
            <View style={styles.cellCont}>
              <View style={styles.titlecell}>
                <Text style={styles.title}>DOLAR</Text>
              </View>
              <View style={styles.bodycell}>
                <Text style={styles.content}>$ {this.state.dolar}</Text>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient colors={['#a988a0', '#d48eae']} style={styles.currency}>
            <View style={styles.cellCont}>
              <View style={styles.titlecell}>
                <Text style={styles.title}>EURO</Text>
              </View>
              <View style={styles.bodycell}>
                <Text style={styles.content}>$ {this.state.euro}</Text>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient colors={['#ae90da', '#9a9edf']} style={styles.currency}>
            <View style={styles.cellCont}>
              <View style={styles.titlecell}>
                <Text style={styles.title}>REAL</Text>
              </View>
              <View style={styles.bodycell}>
                <Text style={styles.content}>$ {this.state.real}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
  },
  appbar: {
    flex: .1,
    paddingTop: 20,
    backgroundColor: '#2a6dae',
    flexDirection: 'column'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fbfafe'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: '10%',
    color: '#fbfafe'
  },
  appbody: {
    flex: .9,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  currency: {
    flex: .25,
    width: '90%',
    borderRadius: 5,
  },
  cellCont: {
    flex: 1,
    flexDirection: 'column',
  },
  titlecell: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodycell: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fbfafe'
  },
  content: {
    fontSize: 22,
    color: '#fbfafe'
  }
});
