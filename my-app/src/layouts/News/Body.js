import { Box, Typography } from '@mui/material'
import SlideNews from './SlideNews'
import Slider from 'react-slick'
import Topic from './Topic'
import LoadingPage from '../LoadingPage'

import { dataState } from '../../recoil/dataState'
import { useRecoilValue } from 'recoil'

import './assets/scss/index.scss'
import './assets/scss/responsive.scss'

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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return loginData.roll === '' ? (
    <LoadingPage />
  ) : (
    <Box
      sx={{
        padding: '3rem 2rem',
      }}
    >
      <Box className="news-container">
        <Typography
          className="news-mobile-font-38"
          variant="h2"
          sx={{
            marginBottom: '2rem',
          }}
        >
          Hot topics
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              width: '80%',
            }}
            className="slider-container"
          >
            <Slider {...settings}>
              {slideList.map((slide) => {
                return <SlideNews key={slide.id} data={slide} />
              })}
            </Slider>
          </Box>
        </Box>
      </Box>
      <Box className="news-container">
        <Typography
          variant="h2"
          className="news-mobile-font-38"
          sx={{
            marginBottom: '2rem',
          }}
        >
          Latest topics
        </Typography>
        <Box className="topic-container">
          {newsList.map((news) => {
            return <Topic key={news.id} data={news} />
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default Body
