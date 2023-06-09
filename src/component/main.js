import React from 'react'

const Main = (props) => {
  return (
    <div>
      <ul className="list-group m-3 rounded container">
        <li className="list-group-item my-2 bg-light">
        qustion={props.qus} ?
        </li>

        <li className="list-group-item "><pre className='text-break'>answer={props.ans}</pre>
          <i data-bs-toggle="tooltip" title="copy" className="bi bi-clipboard" onClick={() => {

            navigator.clipboard.writeText(props.ans);
            alert("copied to clipboard");

          }
          }></i></li>
      </ul>
    </div>
  )
}

export default Main;
