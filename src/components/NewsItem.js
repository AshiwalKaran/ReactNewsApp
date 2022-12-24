import React from "react";

function NewsItem(props) {
    let {title,description,author,date,img,link,source}=props
  return (
    <div className="my-3">
      <div className="card" >
      <div style={{display:'flex',justifyContent:'flex-end',right:'0',position:'absolute'}}>
      <span className="badge rounded-pill bg-danger" > {source} </span>
      </div>
      <img src={img} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-danger" >Author: {author ? author:"Unknown"}  {(new Date(date)).toGMTString()}</small></p>
          <a href={link} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
