import './App.css';
import Editor from './Editor';
import React from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';
function App() {
  const [code, setCode] = React.useState(
    `Props("Demo")`
  );
  return (
    <div className="App">
      <div className='hdr'>

        <h1>Formula 4 Notion</h1>
        <h2>Write your formula here for better overall visibility</h2>
      </div>
        {/* <Editor className="editor" suggestions={["Oranges", "Apples", "Banana", "Kiwi", "IF"]}/> */}
        <CodeEditor
          value={code}
          language="js"
          placeholder="Enter your formula here"
          onChange={(evn) => setCode(evn.target.value)}
          style={
            {
              height: '70vh',
              width: '51.5vw',
              fontSize: '16px',
              borderRadius: '10px',
              lineHeight: '1.5',
              margin: '0',
              overflow: 'auto',
              backgroundColor: '#fafafa',
              color: '#000',
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontWeight: '400',
              fontStyle: 'normal',
              fontStretch: 'normal',
              letterSpacing: 'normal',
              boxShadow: '2px 9px 50px rgba(0, 0, 0, 0.19)',
              zIndex: '1',

            }}
        />


      <div className='copy'>
        <button onClick={() => {
          var copyText = document.getElementById("myInput");
          copyText.select();
          navigator.clipboard.writeText(copyText.value);
        }}>Copy</button>
        <input type="text" id="myInput" value={code} />
      </div>
    </div>
  );
}

export default App;
