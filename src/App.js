//system of app js
import { useState } from "react";

//config and import open ai
const { Configuration, OpenAIApi } = require("openai");

function App() {
  const [userMessage, setuserMessage] = useState("hi");
  const [load, setload] = useState(false);
  const [chat, setchat] = useState([]);

  const API_KEY = "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";
  const configuration = new Configuration({
    apiKey: API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const chatgpt = async (ask) => {
    const completion = await openai.createCompletion({
      model: "text-davinci-003", //model engiine for chat
      prompt: ask, //chat data and content role may be assisnent ,user,system,
      temperature: 0.6, //default 1 temperature define the randomness of data range[0,2]
      max_tokens: 100, //how many max words or token
    })
    console.log(completion);
    const generatedText = await completion.data.choices[0].content;
    return generatedText;
  };

  const handleSendMessage = async () => {
    setload(true);
    const data = await chatgpt(userMessage).catch((err) => {
      setchat([...chat, { user: userMessage, ai: data }]);
      console.log(chat)
      console.log(err);

      setload(false);
    });
    setchat([...chat, { user: userMessage, ai: data }]);

    setload(false)
  };
  return (
    <>
      <nav className="navbar text-capitalize navbar-expand-lg bg-body- navbar-dark  bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand nav-item m-auto" href="#">
            chatgpt-2.0
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          </div>
        </div>
      </nav>

      <ul className="main mb-5 text-capitalize container">
        {chat.map((item) => {
          return (
            <div className="container my-5">
              <div className="text-danger d-flex">user:-<label className="h6 bg-light text-dark m-1 w-100 ">{item.user}</label></div>
              <div className="text-danger d-flex">ai:-<label className="h6 bg-light text-dark m-1 w-100 ">{item.ai}</label></div>


              <pre className="h6 text-capatilize">{item.ai}</pre>
            </div>)
        })

        }
      </ul>
      <div className="fixed-bottom text-capitalize px-5 mx-auto  bg-light  ">
        <div className="d-flex shadow-lg mt-3">
          <textarea
            rows="1"
            className="w-100 p-2"
            value={userMessage}
            onChange={(e) => {
              setuserMessage(e.target.value);
            }}
            placeholder="Send a message..."
          />
          {!load ? <button className="btn send btn-primary" onClick={handleSendMessage}>
            Send
          </button> : <button className="btn spinner btn-primary " type="button">
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>}


        </div>
        <p className="mx-auto small text-center p-2">
          Free Research Preview. ChatGPT may produce inaccurate information
          about people, places or facts
        </p>
      </div>
    </>
  );
}

export default App;
