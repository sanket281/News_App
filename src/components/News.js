import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Loading from "./Loading";
import Proptypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
 capitlizeText = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  static defaultProps = {
    country: "us",
    pageSize: 4,
    category: "bussiness",
  };

  static propTypes = {
    country: Proptypes.string,
    pageSize: Proptypes.number,
    category: Proptypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitlizeText(this.props.category)}-Gedu Gazette`
  }

  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0039e8deca85486cbeb269c54f932924&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handlePrevClick = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0039e8deca85486cbeb269c54f932924&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        page: this.state.page + 1
      });
  };
  render() {
    return (
      <div className="container my-3  ">
        <h2>Top Headlines From {this.capitlizeText(this.props.category)}</h2>
        {this.state.loading && <Loading />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading/>}
        >
        <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : "" }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>  
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
