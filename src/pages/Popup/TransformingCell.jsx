
import React, { useState } from "react";
import './TransformingCell.css';

const TransformingCell = ({ cname, content }) => {
    const [isDecoded, setIsDecoded] = useState(false)

    // const decode = (msg) => {
        // return <><span>{atob(header)}</span>.<span>{atob(body)}</span>.<span>{sig}</span></>
    // }

    const toggleDecode = () => {
        setIsDecoded(!isDecoded)
    }

    const show = (msg, toDecode) => {
        let [header, body, sig] = msg.split('.')
        if (toDecode) {
           header = atob(header)
           body = atob(body)
        }
        return <>
        <span className="jwt-header">{header}</span>.
        <span className="jwt-body">{body}</span>.
        <span className="jwt-sig">{sig}</span>
        </>
    }

    console.log(content)

    return <td className={cname} onClick={toggleDecode}>
        {show(content, isDecoded)}
    </td>
}

export default TransformingCell