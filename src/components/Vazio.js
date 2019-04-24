import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Vazio = () => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: 40, marginBottom: 70 }}>Nada aqui!</div>
    <Link to="/new">
      <Button icon="plus">Adicione um Post</Button>
    </Link>
  </div>
);

export default Vazio;
