import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCategories } from "../actions/categories";
import { capitalizar } from "../utils/helpers";
import { Layout, Menu } from "antd";

class MenuLateral extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;
    return (
      <Layout.Sider>
        <Layout.Header>
          <Link to="/" style={styles.logo}>
            Leitura
          </Link>
        </Layout.Header>
        <Menu theme="light">
          <Menu.Item key="1">
            <Link to="/">Todos</Link>
          </Menu.Item>
          {categories.length > 0 &&
            categories.map((category, key) => (
              <Menu.Item key={key + 2}>
                <Link to={`/${category.name}`}>
                  {capitalizar(category.name)}
                </Link>
              </Menu.Item>
            ))}
        </Menu>
      </Layout.Sider>
    );
  }
}

const styles = {
  logo: {
    color: "#fff",
    fontSize: 27
  }
};

const mapStateToProps = ({ categories }) => ({
  categories
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuLateral);
