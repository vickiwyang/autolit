import { reduce } from "async";
import React from "react";

const Article = ({ info }) => {
  const { doi, citation_count, commons } = info;

  return (
    <article className="artCard">
      <ul className="artDetailsList">
        <li className="artHeader">DOI: <a href={`https://doi.org/${doi}`} target="_blank">{doi}</a></li>
        <li className={`${citation_count > 10000 ? "over10000Cites" : citation_count > 1000 ? "over1000Cites" : citation_count > 500 ? "over500Cites" : "under500Cites"}`}>Citation Count: {citation_count}</li>
        <li className={`${commons > 1 ? "someCommons" : "noCommons"}`}>Common: {commons}</li>
      </ul>
    </article>
  );
};

export default Article;
