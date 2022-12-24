import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  //Capitalize Function

  const capitalizeFirstLetter = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  }

  //UpdateNews

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setLoading(false);
    setTotalResults(parseData.totalResults);
    props.setProgress(100);

  }

  //useEffect

  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, [])

  //handlePrevClick

  // const handlePrevClick=async()=>{
  //   setPage(page-1);
  //   updateNews();
  // }

  // //handleNextClick

  // const handleNextClick=async()=>{
  //   setPage(page+1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

    setPage(page + 1);

    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };


  return (
    <>
      <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '67px' }}>Newsmonkey-Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row">
            {!loading && articles.map((element, index) => {
              return <div className="col-md-4" key={index}>
                <NewsItem key={element.index} title={element.title ? element.title : ""} description={element.description ? element.description : ""} img={element.urlToImage ? element.urlToImage : "https://iitpkd.ac.in/sites/default/files/default_images/default-news-image_0.png"} link={element.url} author={element.author ? element.author : ""} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>

  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News