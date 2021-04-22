import React from "react";

const Article = ({ info }) => {
  const { doi, citation_count, commons } = info;

  return (
    <article className="artCard">
      <ul className="artDetailsList">
        <li className="artDetail">DOI: {doi}</li>
        <li className="artDetail">Citation Count: {citation_count}</li>
        <li className="artDetail">Common: {commons}</li>
      </ul>
    </article>
  );
};

export default Article;
