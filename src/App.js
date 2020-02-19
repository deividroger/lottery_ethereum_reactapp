import React, { Component } from 'react';
import './App.css';
import web3 from './web3'
import lottery from './lottery'


class App extends Component {

  constructor(props) {
    super(props);

    this.changeValue = this.changeValue.bind(this);
  }
  state = {
    lottery: {
      manager: '',
      players: [],
      balance: '',
      value: '',
      accounts: '',
      message: '',

    }

  };

  async componentDidMount() {

    window.ethereum.enable();

    const manager = await lottery.methods.manager.call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    const accounts = await web3.eth.getAccounts();

    this.setState({ manager, players, balance, accounts });
  }

  onSubmit = async (event) => {

    event.preventDefault();

    this.setState({ ...this.state, message: 'Waiting on transaction success...' });

    await lottery.methods.enter().send({
      from: this.state.accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ ...this.state, message: 'You have been entered!' })
  }
  changeValue(event) {
    this.setState({ ...this.state, value: event.target.value })
  }
  onClick = async () => {

    this.setState({ ...this.state, message: 'Waiting on transaction success...' });

    await lottery.methods.pickWinner().send({
      from: this.state.accounts[0]
    });

    this.setState({ ...this.state, message: 'A Winner has been picked!' });

  }
  render() {

    return (
      <div><h2>lottery Contract</h2>
        <p>
          This constract is managed by <b> {this.state.manager !== undefined ? this.state.manager : ''} </b>
          There are currently <b> {this.state.players !== undefined ? this.state.players.length : 0} </b> people entered,
          competing  to win <b> {this.state.balance !== undefined ? web3.utils.fromWei(this.state.balance, 'ether') : 0} </b> ether!
         </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4> Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              type='text'
              value={this.state.value}
              onChange={this.changeValue}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />

        <h4 >Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>
        <hr />
        <h1> {this.state.message} </h1>
      </div>
    )
  }
}

export default App;
