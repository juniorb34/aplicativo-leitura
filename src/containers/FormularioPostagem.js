import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MenuLateral from "../components/MenuLateral";
import uuid from "uuid";
import { Layout, Form, Input, Button, Select } from "antd";
import { fetchCategories } from "../actions/categories";
import { addPost, editPost } from "../actions/posts";
import { capitalizar } from "../utils/helpers";

class FormularioPostagem extends Component {
  constructor(props) {
    super(props);
    const { location } = props;
    const post = location.state ? location.state.post : null;

    this.state = {
      redirect: false,
      editMode: location.pathname === "/edit",
      id: post ? post.id : uuid.v4(),
      title: post ? post.title : "",
      author: post ? post.author : "",
      category: post ? post.category : "",
      body: post ? post.body : ""
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleInputChange = (e, input) => {
    this.setState({
      [input]: e.target ? e.target.value : e
    });
  };

  handleSubmit = () => {
    const post = {
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      category: this.state.category,
      body: this.state.body
    };

    if (this.state.editMode) {
      this.props.editPost(post).then(() =>
        this.setState({
          redirect: !this.state.redirect
        })
      );
    } else {
      this.props.addPost(post).then(() =>
        this.setState({
          redirect: !this.state.redirect
        })
      );
    }
  };

  render() {
    const { categories } = this.props;
    const { category, id } = this.state;

    if (this.state.redirect) {
      return <Redirect to={`/${category}/${id}`} />;
    }

    return (
      <Layout>
        <MenuLateral />
        <Layout>
          <Layout.Content>
            <Form layout="vertical">
              <Form.Item label="Título">
                <Input
                  value={this.state.title}
                  onChange={e => this.handleInputChange(e, "title")}
                />
              </Form.Item>
              <Form.Item label="Nome">
                <Input
                  value={this.state.author}
                  onChange={e => this.handleInputChange(e, "author")}
                />
              </Form.Item>
              <Form.Item label="Categoria">
                <Select
                  size="small"
                  value={this.state.category}
                  onChange={e => this.handleInputChange(e, "category")}
                >
                  {categories.length > 0 &&
                    categories.map((category, key) => (
                      <Select.Option key={category.name} value={category.name}>
                        {capitalizar(category.name)}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item label={"Fale o que aconteceu..."}>
                <Input.TextArea
                  rows={14}
                  value={this.state.body}
                  onChange={e => this.handleInputChange(e, "body")}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={this.handleSubmit}>
                  {this.state.editMode ? "Salvar" : "Publicar"}
                </Button>
                <Link to="/">
                  <Button>Cancelar</Button>
                </Link>
              </Form.Item>
            </Form>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
  editPost: post => dispatch(editPost(post)),
  fetchCategories: () => dispatch(fetchCategories())
});

const NovoFormulario = Form.create()(FormularioPostagem);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NovoFormulario));
