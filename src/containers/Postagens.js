import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Row, Col, Button } from "antd";
import { fetchPosts, deletePost } from "../actions/posts";
import MenuLateral from "../components/MenuLateral";
import Header from "../components/Header";
import SortBy from "../components/SortBy";
import ListadePostagens from "../components/ListadePostagem";
import Vazio from "../components/Vazio";

class Postagens extends Component {
  state = {
    sortBy: "date"
  };

  componentWillMount() {
    const category = this.props.match.params.category;
    this.props.fetchPosts(category);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      const category = nextProps.match.params.category;
      this.props.fetchPosts(category);
    }
  }

  renderPostagem = (posts, category) => {
    if (posts.length > 0) {
      return (
        <ListadePostagens
          category={category}
          posts={posts}
          sortBy={this.state.sortBy}
          deletePost={this.props.deletePost}
        />
      );
    }
    return <Vazio category={category} />;
  };

  mudarOrdem = sortBy => {
    this.setState({ sortBy });
  };

  render() {
    const { posts, match } = this.props;
    const category = match.params.category;
    return (
      <Layout>
        <MenuLateral />
        <Layout>
          <Layout.Header style={styles.header}>
            <Header />
            <Link to="/new">
              <Button icon="plus-circle-o">Nova Postagem</Button>
            </Link>
          </Layout.Header>
          <Layout.Content style={styles.postagens}>
            <Row>
              <Col span={12}>
                <div>Postagens</div>
              </Col>
              <Col span={12}>
                <SortBy mudarOrdem={this.mudarOrdem} />
              </Col>
            </Row>
            {this.renderPostagem(posts, category)}
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
    backgroundColor: "#FA8072"
  },
  postagens: {
    margin: 20
  }
};

const mapStateToProps = ({ posts }) => ({
  posts
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: category => dispatch(fetchPosts(category)),
  deletePost: post => dispatch(deletePost(post))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Postagens);
