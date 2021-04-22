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
    console.log("I am in componentDidMount");
    fetch('/api/')
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then((articles) => {
        console.log("React got the articles: ", articles);
        if (!Array.isArray(articles)) articles = [];
        return this.setState({
          articles,
          fetchedArticles: true
        });
      })
      .catch(err => console.log('ArticlesArea.componentDidMount: ' + err));
  }

  render() {
    if (!this.state.fetchedArticles) return (
      <div>
        <h2>Loading data, please wait...</h2>
      </div>
    );

    const { articles } = this.state;

    if (!articles) return null;

    if (!articles.length) return (
      <div>
        <h2>Sorry, the seeds you planted bore no fruit.</h2>
        <p>The most likely reason is that OpenCitations does not have your articles in their corpus.</p>
      </div>
    );

    const artElems = articles.map((art, i) => {
      return (
        <Article
          key={i}
          info={art} 
        />
      );
    });

    return (
      <div className="artContainer">
        {artElems}
      </div>
    );
  }

}

export default ArticlesArea;