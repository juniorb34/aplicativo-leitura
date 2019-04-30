import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Erro = () => (
  <div style={{ textAlign: "center", padding: 100 }}>
    <div style={{ marginBottom: 65, fontSize: 45 }}>404 ERROR</div>
    <div style={{ marginBottom: 65, fontSize: 45 }}>Post não encontrado!</div>
    <Link to="/">
      <Button>Volte para Home</Button>
    </Link>
  </div>
);

export default Erro;
