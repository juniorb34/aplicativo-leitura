import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, Button } from "antd";
import Voto from "../components/Voto";
import { capitalizar, datacao, ordemData, ordemVoto } from "../utils/helpers";

class ListadePostagem extends Component {
  ordemPostagens = (posts, sortBy) => {
    return sortBy === "votes" ? ordemVoto(posts) : ordemData(posts);
  };

  contadorComentario = commentCount => <span>{commentCount} comentários</span>;

  renderCategoria = category => (
    <span>
      {" "}
      em <Link to={`/${category}`}>{capitalizar(category)}</Link>
    </span>
  );

  render() {
    const { posts, sortBy } = this.props;
    const postagemOrdenada = this.ordemPostagens(posts, sortBy);

    return (
      <List
        itemLayout="vertical"
        dataSource={postagemOrdenada}
        renderItem={post => (
          <List.Item
            key={post.id}
            actions={[
              <Voto item={post} />,
              <Link to={{ pathname: "/edit", state: { post } }}>
                <Button>Editar</Button>
              </Link>,
              <Button onClick={() => this.props.deletePost(post)}>
                Deletar
              </Button>,
              this.contadorComentario(post.commentCount)
            ]}
          >
            <List.Item.Meta
              title={
                <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
              }
              description={
                <span>
                  {datacao(post.timestamp)} &middot; Enviado por {post.author}
                  {post.category && this.renderCategoria(post.category)}
                </span>
              }
            />
          </List.Item>
        )}
      />
    );
  }
}

export default ListadePostagem;
