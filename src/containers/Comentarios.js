import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, List, Button, Input } from "antd";
import { addComment } from "../actions/comments";
import { ordemData, ordemVoto } from "../utils/helpers";
import Comentario from "../components/Comentario";
import SortBy from "../components/SortBy";

class Comentarios extends Component {
  state = {
    sortBy: "date",
    comment: ""
  };

  ordemComentarios = (comments, sortBy) => {
    return sortBy === "votes" ? ordemVoto(comments) : ordemData(comments);
  };

  mudarOrdem = sortBy => {
    this.setState({ sortBy });
  };

  handleChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  postComment = e => {
    const postId = this.props.match.params.id;
    const comment = {
      author: "Anônimo",
      body: this.state.comment,
      parentId: postId
    };

    this.props.addComment(comment);
    this.setState({
      comment: ""
    });
  };

  render() {
    const { comments } = this.props;

    return (
      <div style={styles.comentarios}>
        <h4>Comentários</h4>
        <div style={styles.caixaComentario}>
          <Input.TextArea
            rows={6}
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <Row type="flex" align="middle" justify="space-between">
            <Col>
              <Button
                type="primary"
                style={styles.postCommentBotao}
                onClick={this.postComment}
              >
                Publicar
              </Button>
            </Col>
          </Row>
        </div>
        <Row type="flex" align="bottom">
          <Col span={12}>
            <span>{comments.length} comentários</span>
          </Col>
          <Col span={12}>
            <SortBy align="right" mudarOrdem={this.mudarOrdem} />
          </Col>
        </Row>
        <hr />
        {comments.length > 0 && (
          <List
            itemLayout="vertical"
            dataSource={this.ordemComentarios(comments, this.state.sortBy)}
            renderItem={comment => <Comentario comment={comment} />}
          />
        )}
      </div>
    );
  }
}

const styles = {
  comentarios: {
    padding: 20,
    background: "#fff"
  },
  caixaComentario: {
    marginTop: 50,
    marginBottom: 40
  },
  postCommentBotao: {
    marginTop: 12
  }
};

const mapDispatchToProps = dispatch => ({
  addComment: comment => dispatch(addComment(comment))
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Comentarios));
