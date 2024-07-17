import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  articles = [
    {
      source: {
        id: "polygon",
        name: "Polygon",
      },
      author: "Oli Welsh",
      title:
        "Game Pass July 2024 update adds Flock, The Case of the Golden Idol",
      description:
        "The first batch of new Game Pass games for July 2024 includes several indie favorites like Neon White and Tchia, as well as Cricket 24",
      url: "https://www.polygon.com/24190770/game-pass-july-2024-free-xbox-games-case-of-the-golden-idol-tchia-neon-white-flock",
      urlToImage:
        "https://cdn.vox-cdn.com/thumbor/Zoc7c7NvPhp3QpOUwsky70QU3zM=/0x0:1200x628/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24265929/goldenidol.jpeg",
      publishedAt: "2024-07-02T17:43:15Z",
      content:
        "Microsoft has revealed whats coming to Game Pass during the first half of July and, while absent any big-hitters, the lineup features at least four really excellent indie games that will be well wort… [+2126 chars]",
    },
    
  ];
  static deaultProps = {
    country: "in",
    pageSize: 19,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  //for first leter capital
  capitalizerFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResult: 0,
    };
    document.title=`${this.capitalizerFirstLetter(this.props.category)},News-React`;
  }
  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf546052cd204de39a212636ff9c7aea&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: false });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles,
      // loading: false,
    });
  }
  async componentDidMount() {
    // console.log("cmd");
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf546052cd204de39a212636ff9c7aea&page=1&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true});
    //   let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading:false,
    // });

    this.updateNews();
  }

  handlePrevClick = async () => {
    // console.log("previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf546052cd204de39a212636ff9c7aea&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading:false,
    // });

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //   console.log("next");
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf546052cd204de39a212636ff9c7aea&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   });
    // }

    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async() => {
   this.setState({page:this.state.page + 1})
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf546052cd204de39a212636ff9c7aea&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };
  render() {
    return (
      <>
        <h1 className="text-center my-3">News-React Top {this.capitalizerFirstLetter(this.props.category)}-Headlines</h1>
        {/* {this.state.loading &&<Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResult}
          loader={<Spinner/>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          >
        <div className="container">
        <div className="row">
          { /* for next previous button use in breckets
           !this.state.loading && */ }
          {this.state.loading &&<Spinner/>}
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <Newsitem
                    //when we want to use title sliceing
                    //title={element.title?element.title.slice(0, 40) :" "}
                    title={element.title ? element.title : " "}
                    //when we want to use description sliceing
                    //description={element.description?element.description.slice(0, 88):" "}
                    description={
                      element.description ? element.description : " "
                    }
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
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next&rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
