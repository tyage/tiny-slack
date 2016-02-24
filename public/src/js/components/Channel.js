import React from 'react'

const Channel = ({ channel, onClick, isSelected }) => {
  const classNames = ['channel']
  if (isSelected) {
    classNames.push('selected')
  }

  return (
    <div className={ classNames.join(' ') } onClick={ onClick }>
      <p>{ channel.name }</p>
    </div>
  )
}

export default Channel
