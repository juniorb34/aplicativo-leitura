import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { votePost, votePostDetail } from "../actions/posts";
import { voteComment } from "../actions/comments";

class Voto extends Component {
  //Lógica da votação positiva
  upVote = () => {
    const { item, marca } = this.props;
    const isPost = "commentCount" in item;
    if (isPost) {
      if (marca) this.props.votePostDetail(item.id, "upVote");
      else this.props.votePost(item.id, "upVote");
    } else {
      this.props.voteComment(item.id, "upVote");
    }
  };

  //Lógica da votação negativa
  downVote = () => {
    const { item, marca } = this.props;
    const isPost = "commentCount" in item;
    if (isPost) {
      if (marca) this.props.votePostDetail(item.id, "downVote");
      else this.props.votePost(item.id, "downVote");
    } else {
      this.props.voteComment(item.id, "downVote");
    }
  };

  render() {
    const { item } = this.props;
    const votes = item.voteScore;
    return (
      <span>
        <Button icon="like-o" onClick={() => this.upVote()} />
        <Button icon="dislike-o" onClick={() => this.downVote()} />
        <span>{votes}</span>
      </span>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  votePost: (id, option) => dispatch(votePost(id, option)),
  votePostDetail: (id, option) => dispatch(votePostDetail(id, option)),
  voteComment: (id, option) => dispatch(voteComment(id, option))
});

export default connect(
  null,
  mapDispatchToProps
)(Voto);
