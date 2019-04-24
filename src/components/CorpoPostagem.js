import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import Cometarios from "../containers/Comentarios";
import Voto from "./Voto";
import { capitalizar, datacao } from "../utils/helpers";

class CorpoPostagem extends Component {
  render() {
    const { post, comments } = this.props;
    return (
      <div>
        <div style={styles.postagemDetalhe}>
          <Row>
            <Col span={18} style={styles.titulo}>
              {post.title}
            </Col>
            <Col span={6} style={styles.votos}>
              <Voto item={post} marca />
            </Col>
          </Row>
          <div>
            {datacao(post.timestamp)} &middot; Enviado por {post.author}{" "}
            in&nbsp;
            <Link to={`/${post.category}`}>{capitalizar(post.category)}</Link>
          </div>
          <hr />
        </div>
        <Cometarios comments={comments} />
      </div>
    );
  }
}

const styles = {
  postagemDetalhe: {
    marginBottom: 15,
    padding: 60
  },
  titulo: {
    fontSize: 20,
    fontWeight: 600
  },
  votos: {
    fontSize: 18
  },

  content: {
    marginTop: 20,
    fontSize: 16
  }
};

export default CorpoPostagem;
