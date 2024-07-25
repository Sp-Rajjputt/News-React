import React, { useEffect , useState} from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  const [articles, setArticles] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [TotalResults, setTotalResults] = useState(0);
 // document.title=`${capitalizerFirstLetter(props.category)},News-React`;
  
   
 const capitalizerFirstLetter = (string)=> {
   return string.charAt(0).toUpperCase()+string.slice(1);
 }
  const updateNews=async()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.TotalResults)
    setLoading(false)
    
    props.setProgress(100);
  }
  useEffect(() => {
      updateNews();
  //esline-disable next-line

  }, []);

  const handlePrevClick = async () => {
    
    setpage(page-1);
    updateNews();
  };

  const handleNextClick = async () => {
    setpage(page+1);
    updateNews();
  };

  // fetchMoreData = async() => {
  // setpage(page+1);
  //  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey={props.apikey}&page=${page}&pageSize=${props.pageSize}`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
 
  // setArticles(articles.concat(parsedData.articles))
  // setTotalResults(parsedData.totalResults)
  // };
    return (
      <>
       <h1 className="text-center"style={{margin:'5rem 0px'}}>News-React Top {capitalizerFirstLetter(props.category)}-Headlines</h1>
       <div className="container">
        <div className="row">
         {Loading &&<Spinner/>}
          {!Loading &&
            articles.map((element) => {
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
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(TotalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next&rarr;
          </button>
        </div>
      </>
    );
  
}

News.deaultProps = {
  country: "in",
  pageSize: 19,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
