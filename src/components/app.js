import ReactDOM from "react-dom";
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
                this.baseUri = 'https://testnodes.wavesnodes.com';
                this.wavelet = 100000000;
                this.dappaddress = '3N4GgQWCckqUn1H9y8rNRyCXZPkgKTNKznT';
                this.explorerUrl = "https://wavesexplorer.com/testnet";
                this.deposit = this.deposit.bind(this);
                this.invest = this.invest.bind(this);
                this.getFunds = this.getFunds.bind(this);
                this.updateValue = this.updateValue.bind(this);
            }
            updateValue(scope, key, value) {
              const newState = this.state[scope];
              newState[key] = value;
              this.setState(
                      {
                        [scope]: newState
                      }
                );
            }
            deposit(){
              if (window.confirm("Are you sure you wish to deposit?")) {
                  const params = {
                      dappAddress: this.dappaddress,
                      call: {
                          function: "deposit",
                          args:[]
                      },
                      payment: [ {amount: this.state.deposit.amount*this.wavelet, asset:null } ],
                      chainId: 84
                  };
                  console.log(this.state.deposit);
                  console.log(params);
                  let tx = invokeScript(params, this.state.deposit.seed);
                  this.updateValue("deposit", "txid", tx.id);
                  broadcast(tx, this.baseUri);
              }
            }
            invest() {
                if (window.confirm("Are you sure you wish to invest?")) {
                  const params = {
                      dappAddress: this.dappaddress,
                      call: {
                          function: "vote",
                          args:[
                              { type:"integer", value: this.state.invest.amount*this.wavelet },
                              { type:"string", value: this.state.invest.address }
                          ]
                      },
                      payment: [],
                      chainId: 84
                  };
                  console.log(this.state.invest);
                  console.log(params);
                  let tx = invokeScript(params, this.state.invest.seed);
                  this.updateValue("invest", "txid", tx.id);
                  broadcast(tx, this.baseUri);
              }
            }
            getFunds() {
                if (window.confirm("Are you sure you wish to get invested funds now?")) {
                  const params = {
                      dappAddress: this.dappaddress,
                      call: {
                          function: "getFunds",
                          args:[
                              { type:"integer", value: this.state.getFunds.amount*this.wavelet },
                              { type:"string", value: this.state.getFunds.address }
                          ]
                      },
                      payment: [],
                      chainId: 84
                  };
                  console.log(this.state.getFunds);
                  console.log(params);
                  let tx = invokeScript(params, this.state.getFunds.seed);
                  this.updateValue("getFunds", "txid", tx.id);
                  broadcast(tx, this.baseUri);
              }
            }
            render() {
                return (
                    <div className="container">
                      <div className="deposit">
                        <span>[Investor] Deposit</span>
                        <span>: </span>
                        <input type="text" placeholder="Seed phrase" onChange={(e) => this.updateValue("deposit", "seed", e.target.value)}/>
                        <input type="number" placeholder="WAVES - Amount" onChange={(e) => this.updateValue("deposit", "amount", e.target.value)}/>
                        <input type="submit" value="Deposit" className="submit button" onClick={this.deposit}/>
                        <a href={this.explorerUrl + "/tx/" + this.state.deposit.txid}>Transaction: {this.state.deposit.txid}</a>
                        <br/>
                      </div>
                      <div className="invest">
                        <span>[Investor] Invest</span>
                        <span>: </span>
                        <input type="text" placeholder="Seed phrase" onChange={(e) => this.updateValue("invest", "seed", e.target.value)}/>
                        <input type="number" placeholder="WAVES - Amount" onChange={(e) => this.updateValue("invest", "amount", e.target.value)}/>
                        <input type="text" placeholder="Proposal Address" onChange={(e) => this.updateValue("invest", "address", e.target.value)}/>
                        <input type="submit" value="Invest" className="submit button" onClick={this.invest}/>
                        <a href={this.explorerUrl + "/tx/" + this.state.invest.txid}>Transaction: {this.state.invest.txid}</a>
                        <br/>
                      </div>
                      <div className="Get Funds">
                        <span>[Startup] Get Funds</span>
                        <span>: </span>
                        <input type="text" placeholder="Seed phrase" onChange={(e) => this.updateValue("getFunds", "seed", e.target.value)}/>
                        <input type="number" placeholder="WAVES - Amount" onChange={(e) => this.updateValue("getFunds", "amount", e.target.value)}/>
                        <input type="submit" value="Get Funds" className="submit button" onClick={this.getFunds}/>
                        <a href={this.explorerUrl + "/tx/" + this.state.getFunds.txid}>Transaction: {this.state.getFunds.txid}</a>
                        <br/>
                      </div>
                    </div>
                );
            }
        }

const app = document.getElementById('app');
if(app){
    ReactDOM.render(<App/>, app);
}