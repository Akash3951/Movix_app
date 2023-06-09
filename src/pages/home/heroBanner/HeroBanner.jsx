import React, {useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';

const HeroBanner = () => {

  const [background, setBackground]=useState('');
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const {url}=useSelector((state)=> state.home)
  console.log(url)

  const {data, loading}=useFetch('/movie/upcoming');

  useEffect(()=>{
    const bg= url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBackground(bg)
  },[data])

  function SearchQueryHandler(event){
    if(event.key==='Enter' && query) {
      navigate(`/search/${query}`);
      // console.log(query)
    }
  }

  return (
    <div className='heroBanner'>
      {!loading && <div className="backdrop-img">
        <Img src={background}/>
      </div>
      }

      <div className="opacity-layer">
        
      </div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. 
            Explore now.
          </span>
          <div className="searchInput">
            <input 
              type='text'
              placeholder='Search for a movie or tv show....'
              onKeyUp={SearchQueryHandler}
              onChange={(e)=>setQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
        </ContentWrapper>
      
    </div>
  )
}

export default HeroBanner
