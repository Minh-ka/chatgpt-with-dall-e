import React from 'react'
import { MdComputer } from 'react-icons/md' //This is a React component that renders an icon for a computer.
import ReactMarkdown from 'react-markdown' //This is a React component that can be used to render Markdown text. 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' //This is a syntax highlighter that can be used to highlight code snippets.
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism' //This is a dark color scheme for the Prism syntax highlighter.
import remarkGfm from 'remark-gfm'
import moment from 'moment' //library that helps you work with dates and times.
import Image from './Image'

/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const ChatMessage = (props) => {
  const { id, createdAt, text, ai = false, selected, picUrl } = props.message
  console.log(picUrl)

  return (
    <div key={id} className={`${ai && 'flex-row-reverse'} message`}>
      {
        selected === 'DALL·E' && ai ?
          <Image url={text} />
          :
          <div className='message__wrapper'>
            <ReactMarkdown className={`message__markdown ${ai ? 'text-left' : 'text-right'}`}
              children={text}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || 'language-js')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={atomDark} language={match[1]} PreTag="div" {...props}
                    />
                  ) : (<code className={className} {...props}>{children} </code>)
                }
              }} />


            <div className={`${ai ? 'text-left' : 'text-right'} message__createdAt`}>{moment(createdAt).calendar()}</div>
          </div>}

      <div className="message__pic">
        {
          ai ? <MdComputer /> :
            <img className='cover w-10 h-10 rounded-full' loading='lazy' src={picUrl} alt='profile pic' />
        }
      </div>
    </div>
  )
}

export default ChatMessage