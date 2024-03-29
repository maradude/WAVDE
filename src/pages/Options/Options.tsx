import React from 'react'
import './Options.css'

interface Props {
  title: string
}

const Options = ({ title }: Props) => {
  return <div className="OptionsContainer">{title.toUpperCase()} PAGE</div>
}

export default Options
