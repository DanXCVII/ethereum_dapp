import React, { useState } from "react";
//@ts-ignore
import { Drizzle, generateStore } from "drizzle";
//@ts-ignore
import { DrizzleContext } from "drizzle-react";
import Web3 from "web3";
import "./App.css";
import StringStorage from "./contracts/StringStorage.json";

const options = {
  contracts: [StringStorage]
};

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options);

interface AppState {
  loggedIn: boolean;
}

interface AppProps {}

class App extends React.Component<AppProps, AppState> {
  public componentDidMount() {
    window.addEventListener("load", function() {
      getWeb3(startApp);
    });
  }

  render() {
    //@ts-ignore
    if (typeof window.web3 === "undefined") {
      // no web3, use fallback
      return "Please use use a Browser with Metamask wallet as plugin";
    }
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          {(drizzleContext: any) => {
            const { drizzle, drizzleState, initialized } = drizzleContext;
            //return a loading UI if drizzle is not yet initialised
            if (!initialized) {
              return "Loading...";
            } else {
              return "drizzle initialized";
            }
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    );
  }
}

function getWeb3(callback: any) {
  //@ts-ignore
  if (typeof window.web3 === "undefined") {
    // no web3, use fallback
    console.error("Please use a web3 browser");
  } else {
    // window.web3 == web3 most of the time. Don't override the provided,
    // web3, just wrap it in your Web3.
    //@ts-ignore
    var myWeb3 = new Web3(window.web3.currentProvider);

    // the default account doesn't seem to be persisted, copy it to our
    // new instance
    //@ts-ignore
    myWeb3.eth.defaultAccount = window.web3.eth.defaultAccount;

    console.log("address" + myWeb3.eth.defaultAccount);

    callback(myWeb3);
  }
}

function startApp(web3: any) {
  console.log("lol");
}

export default App;
