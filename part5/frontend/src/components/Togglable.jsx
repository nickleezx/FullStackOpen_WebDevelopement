import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef(function Togglable(props, refs) {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = {display: visible ? '' : 'none'}
  const hideWhenVisible = {display: visible ? 'none' : ''}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <div>
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    </div>
  )
})


export default Togglable