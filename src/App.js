import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Postagens from "./containers/Postagens";
import FormularioPostagem from "./containers/FormularioPostagem";
import PostagemDetalhe from "./containers/PostagemDetalhe";
import Erro from "./components/Erro";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/erro" component={Erro} />
          <Route exact path="/" component={Postagens} />
          <Route exact path="/new" component={FormularioPostagem} />
          <Route exact path="/edit" component={FormularioPostagem} />
          <Route exact path="/:category" component={Postagens} />
          <Route exact path="/:category/:id" component={PostagemDetalhe} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
