import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  
  constructor(){
    super();
    console.log("hellow")
    this.state = {
      articles: [],
      page : 1,
    }
}

async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=8a2f63886af545aab5d57a8cc0ff88a7&q=cricket&pageSize=12";
    let data = await fetch(url)
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({ articles : parsedData.articles, totalResults:parsedData.totalResults})
}

onClickPrevious =async() =>{
  let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=8a2f63886af545aab5d57a8cc0ff88a7&q=cricket&page=${this.state.page-1}&pageSize=12`;
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  this.setState({page : (this.state.page>1 ? this.state.page-1:this.state.page),
    articles : parsedData.articles
  })
}

onClickNext =async() =>{
    if(this.state.page+1 > Math.ceil((this.state.totalResults)/12)){
    
    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=8a2f63886af545aab5d57a8cc0ff88a7&q=cricket&page=${this.state.page+1}&pageSize=12`;
      let data = await fetch(url)
      let parsedData = await data.json();
      console.log(parsedData)
      this.setState({
        page:this.state.page+1,
        articles : parsedData.articles})
    }
}


  render(){
    return (
      <div className = "container my-2">
        <h1>Cricket Related Latest-Headlines</h1>
        <div className = "row">
        {this.state.articles && this.state.articles.map((element)=> {
            return <div className = "col-md-3" key = {element.url}>
            <NewsItem title = {element.title?element.title.slice(0,80):""} description = {element.description?element.description.slice(0,100):""} imageUrl = {element.urlToImage} newsUrl={element.url}/>
        </div>
      })}  
      <div className="d-flex justify-content-between">
          <button type="button" onClick={this.onClickPrevious} disabled = {this.state.page <= 1 ? true:false} className="btn btn-warning d-flex justify-content-start my-5"><strong>&larr;Previous</strong></button>
          <button type="button" onClick = {this.onClickNext} className="btn btn-warning d-flex justify-content-end my-5"><strong>Next &rarr;</strong></button>
      </div>
      </div>
      </div>
    )
  }
}

export default News
