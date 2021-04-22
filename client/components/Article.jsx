import { reduce } from "async";
import React from "react";

const Article = ({ info }) => {
  const { doi, citation_count, commons } = info;

  return (
    <article className="artCard">
      <ul className="artDetailsList">
        <li className="artHeader">DOI: {doi}</li>
        <li className="artDetail">Citation Count: {citation_count}</li>
        <li className={"commons"+commons}>Common: {commons}</li>
      </ul>
    </article>
  );
};

export default Article;
