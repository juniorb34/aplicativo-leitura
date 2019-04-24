import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Row, Col, List, Button, Input } from "antd";
import { deleteComment, editComment } from "../actions/comments";
import { datacao } from "../utils/helpers";
import Voto from "./Voto";

class Comentario extends Component {
  state = {
    editMode: false,
    comment: this.props.comment.body || ""
  };

  handleEditComment = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  handleChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  saveComment = comment => {
    comment = {
      ...comment,
      author: comment.author,
      body: this.state.comment,
      parentId: comment.parentId
    };

    this.props.editComment(comment);
    this.setState({
      editMode: !this.state.editMode
    });
  };

  renderComentario = comment => {
    if (this.state.editMode) {
      return (
        <span>
          <Input.TextArea
            rows={2}
            placeholder={"Escreva um comentário"}
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <Row type="flex" align="middle" justify="space-between">
            <Col>
              <Button type="primary" onClick={() => this.saveComment(comment)}>
                Salvar
              </Button>
              <Button onClick={this.handleEditComment}>Cancelar</Button>
            </Col>
          </Row>
        </span>
      );
    }

    return <ReactMarkdown source={comment.body} />;
  };

  render() {
    const { comment } = this.props;
    return (
      <List.Item
        key={comment.id}
        actions={[
          <Voto item={comment} />,
          <Button onClick={this.handleEditComment}>Editar</Button>,
          <Button onClick={() => this.props.deleteComment(comment)}>
            Deletar
          </Button>
        ]}
      >
        <List.Item.Meta
          description={
            <span>
              {comment.author} <span>{datacao(comment.timestamp)}</span>
            </span>
          }
        />
        {this.renderComentario(comment)}
      </List.Item>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteComment: comment => dispatch(deleteComment(comment)),
  editComment: comment => dispatch(editComment(comment))
});

export default connect(
  null,
  mapDispatchToProps
)(Comentario);
