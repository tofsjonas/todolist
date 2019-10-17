import React, {
  useState,
  useRef,
  //  useEffect
} from 'react'
import useOuterClickNotifier from '../lib/useOuterClickNotifier'

const DotMenu = ({ task }) => {
  const innerRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => {
    setVisible(!visible)
  }

  const pinTask = e => {
    e.stopPropagation()
    setVisible(false)
    console.log('SPACETAG: DotMenu.js PINNING')
  }
  const unPinTask = e => {
    e.stopPropagation()
    setVisible(false)
    console.log('SPACETAG: DotMenu.js UN-PINNING')
  }
  const addMemo = e => {
    e.stopPropagation()
    setVisible(false)
    console.log('SPACETAG: DotMenu.js ADDING MEMO')
  }
  const deleteTask = e => {
    e.stopPropagation()
    setVisible(false)
    console.log('SPACETAG: DotMenu.js DELETING')
  }
  useOuterClickNotifier(toggleVisible, innerRef)

  return (
    <>
      {visible && (
        <div ref={innerRef} className="dot-menu">
          <i className="icon-up-dir" />
          {!task.pinned && (
            <div className="clickable pin-to-top" onClick={pinTask}>
              <i className="icon-pinboard" />
              Pin task
            </div>
          )}
          {task.pinned && (
            <div className="clickable unpin-to-top" onClick={unPinTask}>
              <i className="icon-pinboard" />
              Un-pin task
            </div>
          )}

          <div className="clickable add-memo" onClick={addMemo}>
            <i className="icon-doc-new" />
            Add a memo
          </div>
          <div className="clickable delete" onClick={deleteTask}>
            <i className="icon-trash" />
            Delete
          </div>
        </div>
      )}
      <i className="clickable icon-dot-3" style={{ zIndex: 2 }} onClick={toggleVisible} />
    </>
  )
}
export default DotMenu
