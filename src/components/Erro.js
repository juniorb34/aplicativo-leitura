import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Erro = () => (
  <div style={{ textAlign: "center", padding: 100 }}>
    <div style={{ marginBottom: 65, fontSize: 45 }}>Algo errado ocorreu!</div>
    <Link to="/">
      <Button>Volte para Home</Button>
    </Link>
  </div>
);

export default Erro;
