import ReactDOM from 'react-dom';
import React from 'react';
import { invokeScript, broadcast } from '@waves/waves-transactions'

        class App extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    deposit: {
                      seed: '',
                      amount: '',
                      txid: ''
                    },
                    invest: {
                      seed: '',
                      amount: '',
                      address: '',
                      txid: ''
                    },
                    getFunds: {
                      seed: '',
                      amount: '',
                      txid: ''
                    }
                };
                this.baseUri = 'https://testnodes.wavesnodes.com/v0/';
                this.dappadress = '3N4GgQWCckqUn1H9y8rNRyCXZPkgKTNKznT';
                this.explorerUrl = "https://wavesexplorer.com/testnet";
                this.deposit = this.deposit.bind(this);
                this.invest = this.invest.bind(this);
                this.getFunds = this.getFunds.bind(this);
                this.updateValue = this.updateValue.bind(this);
            }
            updateValue(scope, key, event) {
              const newState = this.state[scope];
              newState[key] = event.target.value;
              this.setState(
                      {
                        [scope]: newState
                      }
                );
            }
            deposit() {
              if (window.confirm("Are you sure you wish to deposit?")) {
                console.log(this.state.deposit);
              }
            }
            invest() {
            }
            getFunds() {
            }
            render() {
                return (
                    <div className="container">
                      <div className="deposit">
                        <span>Deposit</span>
                        <span>: </span>
                        <input type="text" placeholder="Seed phrase" onChange={(e) => this.updateValue("deposit", "seed", e)}/>
                        <input type="text" placeholder="WAVES - Amount" onChange={(e) => this.updateValue("deposit", "amount", e)}/>
                        <input type="submit" value="Deposit" className="submit button" onClick={this.deposit}/>
                        <a href={this.explorerUrl + "/tx/" + this.state.deposit.txid}>Transaction: {this.state.deposit.txid}</a>
                        <br/>
                      </div>
                      <div className="invest">
                        <span>Invest</span>
                        <span>: </span>
                        <input type="text" placeholder="Seed phrase"/>
                        <input type="text" placeholder="WAVES - Amount"/>
                        <input type="text" placeholder="Proposal Address"/>
                        <input type="submit" value="Invest" className="submit button"/>
                        <a href="https://www.youtube.com/watch?v=k7gK7FgUFiU">Transaction: ...</a>
                        <br/>
                      </div>
                      <div className="Get Funds">
                        <span>Get Funds</span>
                        <span>: </span>
                        <input type="text" placeholder="Seed phrase"/>
                        <input type="text" placeholder="WAVES - Amount"/>
                        <input type="submit" value="Get Funds" className="submit button"/>
                        <a href="https://www.youtube.com/watch?v=k7gK7FgUFiU">Transaction: ...</a>
                        <br/>
                      </div>
                    </div>
                );
            }
        }

        ReactDOM.render(<App/>, document.getElementById('app'));