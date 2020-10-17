import React from 'react'

import onlineIcon from '../../assets/onlineIcon.png';
import './RoomInfo.css';

export const RoomInfo = ({ users }) => {
  return (
    <div className='textContainer'>
      <div>
        {
          users.length > 0 && (
            <div>
              <h1>People currently chatting:</h1>
              <div className="activeContainer">
                <h2>
                  {users.map(({ name }) => (
                    <div key={name} className="activeItem">
                      {name}
                      <img alt="Online Icon" src={onlineIcon} />
                    </div>
                  ))}
                </h2>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
