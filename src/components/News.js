import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  articles = [
    {
      source: {
        id: "",
        name: "",
      },
      author: "",
      title:
        "",
      description:
        "",
      url: "",
      urlToImage:
        "",
      publishedAt: "",
      content:"",
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
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // console.log("cmd");
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
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
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={this.props.apikey}&page=${
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
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={this.props.apikey}&page=${
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

  // fetchMoreData = async() => {
  //  this.setState({page:this.state.page + 1})
  //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     articles: this.state.articles.concat(parsedData.articles),
  //     totalResults: parsedData.totalResults,
  //   });
  // };
  render() {
    return (
      <>
       <h1 className="text-center my-3">News-React Top {this.capitalizerFirstLetter(this.props.category)}-Headlines</h1>
       <div className="container">
        <div className="row">
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
        {/* </InfiniteScroll> */}
        <div className="container d-flex justify-content-between">
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
        </div>
      </>
    );
  }
}

export default News;
