import React, { useState } from 'react'
import './TransformingCell.css'

const TransformingCell = ({ cname, content }) => {
  const [isDecoded, setIsDecoded] = useState(false)

  const toggleDecode = () => {
    setIsDecoded(!isDecoded)
  }

  const show = (msg, toDecode) => {
    let [header, body, sig] = msg.split('.')
    if (toDecode) {
      header = window.atob(header)
      body = window.atob(body)
    }
    return (
      <>
        <span className="jwt-header">{header}</span>.
        <span className="jwt-body">{body}</span>.
        <span className="jwt-sig">{sig}</span>
      </>
    )
  }

  return (
    <td className={cname} onDoubleClick={toggleDecode}>
      {show(content, isDecoded)}
    </td>
  )
}

export default TransformingCell
