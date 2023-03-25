import React, { Component } from "react";

export class News_item extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem", height:"28rem", marginBottom:"10rem" }}>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:"80%", zIndex:"1"}}>
            {source}
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." />

          <div className="card-body" >
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-primary position-absolute top-100 start-50 translate-middle"
              style={{marginTop:"-2rem"}}
            >
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default News_item;
