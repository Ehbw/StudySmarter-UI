import React from 'react';
import { Markup } from 'react-render-markup';
import "../style.css"

type MarkdownProps = {
    text: string
}

export const MarkdownText: React.FC<MarkdownProps> = ({text}) => {
    return (
        <Markup allowed={['strong', 'em', 'span', 'img', 'u', 'p', 'div', 'br']} markup={text}/>
    )
}