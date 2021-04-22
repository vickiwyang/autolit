import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Article from './Article';

class ArticlesArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedArticles: false,
      articles: []
    }
  };

  // make fetch requests to router
  componentDidMount() {

  }

  render() {
    return (
      
    );
  }

}

export default ArticlesArea;