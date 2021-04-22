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

  fetchArticles() {
    fetch('/api/')
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then((articles) => {
      console.log("React got the articles: ", articles); // why doesn't this appear?
      if (!Array.isArray(articles)) articles = [];
      return this.setState({
        articles,
        fetchedArticles: true
      });
    })
    .catch(err => console.log('ArticlesArea.componentDidMount: ' + err));
  }

  // make fetch requests to router
  componentDidMount() {
    console.log("I am in componentDidMount");
    // fetch('/api/')
    //   .then(res => {
    //     console.log(res);
    //     return res.json();
    //   })
    //   .then((articles) => {
    //     console.log("React got the articles: ", articles);
    //     if (!Array.isArray(articles)) articles = [];
    //     return this.setState({
    //       articles,
    //       fetchedArticles: true
    //     });
    //   })
    //   .catch(err => console.log('ArticlesArea.componentDidMount: ' + err));
    this.fetchArticles();
    this.timer = setInterval(() => this.fetchArticles(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    if (!this.state.fetchedArticles) return (
      <div>
        <h2>Data will appear here</h2>
      </div>
    );

    const { articles } = this.state;

    if (!articles) return null;

    if (!articles.length) return (
      <div id="loading-msg">
        <h3>Waiting for seeds to bear fruit...</h3>
        <p id="loading-p">If this message persists, either the DOIs you've entered are invalid, or OpenCitations does not have your articles in their corpus.</p>
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