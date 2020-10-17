import React from 'react'

import closeIcon from '../../assets/closeIcon.png'
import onlineIcon from '../../assets/onlineIcon.png'
import './ChatHeader.css'

export const ChatHeader = ({ room }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} /></a>
      </div>
    </div>
  )
}
