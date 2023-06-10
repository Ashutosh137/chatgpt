import { useState } from "react";

import { createRoot } from 'react-dom/client';
import Main from "./component/main";
const { Configuration, OpenAIApi } = require("openai");
function App() {
  const [userMessage, setuserMessage] = useState('');
  const [generatedMessage, setgeneratedMessage] = useState('lore');

  const API_KEY = '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';
  const configuration = new Configuration({
    apiKey: API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const chatgpt = async (ask) => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",//model engiine for chat
      messages: [{ role: "assistant", content: ask }],//chat data and content role may be assisnent ,user,system,
      temperature:1,//default 1 temperature define the randomness of data range[0,2]
      top_p:0.1, //alternate if temperature which load keywards with mass
      n:1,//no of genrated message increase in choice 
      max_tokens:100,//how many max words or token
      

    });
    console.log(completion)
    const generatedText = await completion.data.choices[0].message.content;
    await setgeneratedMessage(generatedText);
    console.log(generatedMessage);
  }

  const handleUserMessageChange = async (event) => {
    await setuserMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    const loader = document.querySelector(".spinner");
    const send = document.querySelector(".send");
    const parent = document.querySelector(".main");
    const newdata = document.createElement("div");
    console.log(generatedMessage)
    console.log(userMessage)

    const data = () => {

      const root = createRoot(newdata);
      root.render(<Main qus={userMessage} ans={generatedMessage} />);
      parent.appendChild(newdata);

    };
    loader.classList.toggle("d-none")
    send.classList.toggle("d-none")
    await chatgpt(userMessage);
    await data();
    loader.classList.toggle("d-none")
    send.classList.toggle("d-none")
    console.log(userMessage)
    console.log(generatedMessage)
  };

  return (
    <>

      <nav className="navbar text-capitalize navbar-expand-lg bg-body- navbar-dark  bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand mx-5 nav-item m-auto" href="#">chatgpt-2.0</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
          </div>
        </div>
      </nav>

      <ul className="main mb-5 text-capitalize container ">
      </ul>
      <div className='fixed-bottom text-capitalize px-5 mx-auto  bg-light  ' >
        <div className="d-flex shadow-lg mt-3">
          <textarea rows="1" className="w-100 p-2" value={userMessage} onChange={handleUserMessageChange} placeholder='Send a message...' />
          <button className='btn send btn-primary' onClick={handleSendMessage}>Send</button>
          <button className="btn spinner btn-primary d-none" type="button" >
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
        </div>
        <p className="mx-auto text-center p-2">Free Research Preview. ChatGPT may produce inaccurate information about people, places or facts</p>
      </div >
    </>
  );
}

export default App;
