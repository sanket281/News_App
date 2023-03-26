import React, {useEffect, useState} from "react";
import Newsitem from "./Newsitem";
import Loading from "./Loading";
import Proptypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // document.title = `${capitlizeText(props.category)}-Gedu Gazette`

  const capitlizeText = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  });

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setPage(page+1)
};



    return (
      <div className="container my-3  ">
        <h2>Top Headlines From {capitlizeText(props.category)}</h2>
        {loading && <Loading />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading/>}
        >
        <div className="container">
        <div className="row">
          {articles.map((element) => {
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



News.defaultProps = {
  country: "us",
  pageSize: 4,
  category: "bussiness",
};

News.propTypes = {
  country: Proptypes.string,
  pageSize: Proptypes.number,
  category: Proptypes.string,
};

export default News;






// THE CLASS BASE FEATURES

// capitlizeText = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }
// static defaultProps = {
//   country: "us",
//   pageSize: 4,
//   category: "bussiness",
// };

// static propTypes = {
//   country: Proptypes.string,
//   pageSize: Proptypes.number,
//   category: Proptypes.string,
// };

// constructor(props) {
//   super(props);
//   this.state = {
//     articles: [],
//     loading: false,
//     page: 1,
//     totalResults: 0
//   };
//   document.title = `${this.capitlizeText(props.category)}-Gedu Gazette`
// }

// async updateNews() {
//   props.setProgress(0);
//   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
//   this.setState({ loading: true });
//   let data = await fetch(url);
//   let parsedData = await data.json();
//   console.log(parsedData);
//   this.setState({
//     articles: parsedData.articles,
//     totalResults: parsedData.totalResults,
//     loading: false,
//   });
//   props.setProgress(100);
// }

// async componentDidMount() {
//   this.updateNews();
// }

// fetchMoreData = async () => {
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({
//       articles: this.state.articles.concat(parsedData.articles),
//       totalResults: parsedData.totalResults,
//       page: this.state.page + 1
//     });
// };
