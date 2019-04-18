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
                  let res = broadcast(tx, this.baseUri);
                  res.then((v) => this.updateValue("deposit", "txid", tx.id),
                      (e) => { console.log(e); this.updateValue("deposit", "txid", '') });
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
                  let res = broadcast(tx, this.baseUri);
                  res.then((v) => this.updateValue("invest", "txid", tx.id),
                      (e) => { console.log(e); this.updateValue("invest", "txid", '') });
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
                  let res = broadcast(tx, this.baseUri);
                  res.then((v) => this.updateValue("getFunds", "txid", tx.id),
                      (e) => { console.log(e); this.updateValue("getFunds", "txid", '') });
              }
            }
            render() {
                return (
                    <div className="container">
                      <div className="deposit form-group">
                        <label>[Investor] Deposit</label>
                        <input className="form-control" type="text" placeholder="Seed phrase" onChange={(e) => this.updateValue("deposit", "seed", e.target.value)}/>
                        <small className="form-text text-muted">It is a demo in Waves testnet. Please keep your seed always carefully</small>
                        <input className="form-control" type="number" placeholder="WAVES - Amount" onChange={(e) => this.updateValue("deposit", "amount", e.target.value)}/>
                        <input className="btn btn-primary" type="submit" value="Deposit" onClick={this.deposit}/>
                        <br/>
                        <a className="form-text text-muted" target="_blank" href={this.explorerUrl + "/tx/" + this.state.deposit.txid}>Transaction: {this.state.deposit.txid}</a>
                        <br/>
                      </div>
                      <div className="invest form-group">
                        <label>[Investor] Vote & Invest</label>
                        <input className="form-control" type="text" placeholder="Seed phrase" onChange={(e) => this.updateValue("invest", "seed", e.target.value)}/>
                        <small className="form-text text-muted">It is a demo in Waves testnet. Please keep your seed always carefully</small>
                        <input className="form-control" type="number" placeholder="WAVES - Amount" onChange={(e) => this.updateValue("invest", "amount", e.target.value)}/>
                        <input className="form-control" type="text" placeholder="Proposal Address" onChange={(e) => this.updateValue("invest", "address", e.target.value)}/>
                        <input className="btn btn-primary" type="submit" value="Invest" onClick={this.invest}/>
                        <a className="form-text text-muted" target="_blank" href={this.explorerUrl + "/tx/" + this.state.invest.txid}>Transaction: {this.state.invest.txid}</a>
                        <br/>
                      </div>
                      <div className="getfunds form-group">
                        <label>[Startup] Get Funds</label>
                        <input className="form-control" type="text" placeholder="Seed phrase" onChange={(e) => this.updateValue("getFunds", "seed", e.target.value)}/>
                        <small className="form-text text-muted">It is a demo in Waves testnet. Please keep your seed always carefully</small>
                        <input className="form-control" type="number" placeholder="WAVES - Amount" onChange={(e) => this.updateValue("getFunds", "amount", e.target.value)}/>
                        <input className="btn btn-primary" type="submit" value="Get Funds" onClick={this.getFunds}/>
                        <a className="form-text text-muted" target="_blank" href={this.explorerUrl + "/tx/" + this.state.getFunds.txid}>Transaction: {this.state.getFunds.txid}</a>
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