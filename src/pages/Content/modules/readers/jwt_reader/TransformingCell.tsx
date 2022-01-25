import React, { FunctionComponent, useState } from 'react'
import { JWT } from '../../../../Background/jwt'
import './TransformingCell.css'

const TransformingCell: FunctionComponent<{
  cname: string
  content: JWT
}> = ({ cname, content }) => {
  const [isDecoded, setIsDecoded] = useState(false)

  const toggleDecode = () => {
    setIsDecoded(!isDecoded)
  }

  const show = (msg: JWT, toDecode: boolean) => {
    let { header, body, signature } = msg
    if (toDecode) {
      header = window.atob(header)
      body = window.atob(body)
    }
    return (
      <>
        <span className="jwt-header">{header}</span>.
        <span className="jwt-body">{body}</span>.
        <span className="jwt-sig">{signature}</span>
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
