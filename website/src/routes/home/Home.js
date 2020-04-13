import React from 'react'
import { Carousel, Layout } from 'antd'
import eggs from './eggs.jpeg'
import dinosaurs from './dinosaurs.jpeg'

const { Content } = Layout

const getGreeting = () => {
  const d = new Date()
  const hours = d.getHours()
  if (hours > 12 && hours < 18) {
    return 'Good Afternoon'
  } else if (hours > 18) {
    return 'Good Evening'
  } else {
    return 'Good Morning'
  }
}

const Home = () => {
  return (
    <Content>
      <div className="Home">
        <h2>{getGreeting()}</h2>
        <Carousel autoplay style={{
          minWidth: "100%",
          height: 176,
          overflow: "hidden"
        }}>
          <div>
            <img src={eggs} alt="eggs"></img>
          </div>
          <div>
            <img src={dinosaurs} alt="dinosaurs"></img>
          </div>
        </Carousel>
      </div>
    </Content>
  );
}

export default Home
