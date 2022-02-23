import React, { useState } from 'react'
import { JWT } from '../../../../Background/jwt'

type TransformingTextProps = {
  cname: string
  content: JWT
}

const TransformingText = ({ cname, content }: TransformingTextProps) => {
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
        <span style={{ color: '#fb015b' }}>{header}</span>.
        <span style={{ color: '#d63aff' }}>{body}</span>.
        <span style={{ color: '#00b9f1' }}>{signature}</span>
      </>
    )
  }

  return (
    <div className={cname} onDoubleClick={toggleDecode}>
      {show(content, isDecoded)}
    </div>
  )
}

export default TransformingText
