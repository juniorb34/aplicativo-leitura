import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Button } from "antd";
import { fetchPost, deletePost } from "../actions/posts";
import { fetchComments } from "../actions/comments";
import MenuLateral from "../components/MenuLateral";
import CorpoPostagem from "../components/CorpoPostagem";

class PostagemDetalhe extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPost(id);
    this.props.fetchComments(id);
  }

  handleDelete = post => {
    this.props.deletePost(post).then(() =>
      this.setState({
        redirect: !this.state.redirect
      })
    );
  };

  render() {
    const { post, comments } = this.props;

    if (Object.keys(post).length === 0) {
      return <Redirect to="/erro" />;
    }
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Layout>
        <MenuLateral />
        <Layout>
          <Layout.Header style={styles.header}>
            <Link to="/">Home</Link>
            <span>
              <Link to={{ pathname: "/edit", state: { post } }}>
                <Button icon="edit" size="small" style={styles.botao}>
                  Editar
                </Button>
              </Link>
              <Button
                icon="delete"
                size="small"
                style={styles.botao}
                onClick={() => this.handleDelete(post)}
              >
                Deletar
              </Button>
            </span>
          </Layout.Header>
          <Layout.Content>
            {post && <CorpoPostagem post={post} comments={comments} />}
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

const styles = {
  header: {
    height: 100,
    padding: 20,
    backgroundColor: "#FA8072",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    lineHeight: "14px"
  },

  botao: {
    marginRight: 12,
    width: 78
  }
};

const mapStateToProps = ({ posts, comments }) => ({
  post: posts,
  comments: comments
});

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
  deletePost: id => dispatch(deletePost(id)),
  fetchComments: id => dispatch(fetchComments(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostagemDetalhe);
