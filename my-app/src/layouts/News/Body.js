import { Box, Typography } from '@mui/material'
import SlideNews from './SlideNews'
import Slider from 'react-slick'
import Topic from './Topic'
import LoadingPage from '../LoadingPage'

import { dataState } from '../../recoil/dataState'
import { useRecoilValue } from 'recoil'

const slideList = [
  {
    id: 1,
    title: 'Slide 1',
    to: '',
    detail: 'Oh shit day la slide 1 nay` moi nguoi.',
  },
  {
    id: 2,
    title: 'Slide 2',
    to: '',
    detail: 'Oh shit day la slide 2 nay` moi nguoi.',
  },
  {
    id: 3,
    title: 'Slide 3',
    to: '',
    detail: 'Oh shit day la slide 3 nay` moi nguoi.',
  },
]

const newsList = [
  {
    id: 1,
    title: 'News 1',
    detail: 'Day la detail cua news 1',
    since: '1 hour ago',
    author: 'fatk1d',
  },
  {
    id: 2,
    title: 'News 2',
    detail: 'Day la detail cua news 2',
    since: '2 hour ago',
    author: 'fatk1d',
  },
  {
    id: 3,
    title: 'News 3',
    detail: 'Day la detail cua news 3',
    since: '3 hour ago',
    author: 'fatk1d',
  },
  {
    id: 4,
    title: 'News 4',
    detail: 'Day la detail cua news 4',
    since: '4 hour ago',
    author: 'fatk1d',
  },
  {
    id: 5,
    title: 'News 5',
    detail: 'Day la detail cua news 5',
    since: '5 hour ago',
    author: 'fatk1d',
  },
  {
    id: 6,
    title: 'News 6',
    detail: 'Day la detail cua news 6',
    since: '6 hour ago',
    author: 'fatk1d',
  },
]

function Body() {
  const loginData = useRecoilValue(dataState)
  const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 7500,
    cssEase: 'linear',
  }
  return loginData.roll === '' ? (
    <LoadingPage />
  ) : (
    <Box
      className="news"
      sx={{
        padding: '3rem 2rem',
      }}
    >
      <Box className="news-container">
        <Typography className="news-container-header" variant="h2">
          Hot topics
        </Typography>
        <Box className="news-slideBox">
          <Box className="news-slideBox-container">
            <Slider {...settings}>
              {slideList.map((slide) => {
                return <SlideNews key={slide.id} data={slide} />
              })}
            </Slider>
          </Box>
        </Box>
      </Box>
      <Box className="news-container">
        <Typography variant="h2" className="news-container-header">
          Latest topics
        </Typography>
        <Box className="topic-container news-topicBox">
          {newsList.map((news) => {
            return <Topic key={news.id} data={news} />
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default Body
