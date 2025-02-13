import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css';

function ChatBot(props) {
    const [reqval, setReqval] = useState('');
    const [chatlog, setChatlog] = useState([]);

    useEffect(() => {
            let ele = document.getElementsByClassName('chatScreen')[0];
            ele.scrollTop = ele.scrollHeight;
    }, [chatlog]);

    function handleKeyPress(e){
        if(e.key === 'Enter'){
            handleSubmit();
        }
    }
    
    function handleSubmit() {
        let tmplog = chatlog;
        let qagroup = [reqval];
        setReqval('');
        axios({
            method:'post',
            url:'/req',
            data: reqval,
            headers: {
                'Content-Type': 'text/plain'
            }
        })
        .then(res => {
            qagroup.push(res.data);
            setChatlog([...tmplog,qagroup]);
        })
        .catch(err => {
            setChatlog(tmplog);
            console.error(err);
        });
    }
    
    return (
        <article className="chatbot">
            <div className="chatwrapper">
            <div className="chatScreen">
                {chatlog.map((item, index) => {
                    let a = item[0];
                    let b = [];
                    for (let i=0; i<item[1].length; i++)
                    {
                        b.push(item[1][i]);
                    }
                    return (
                        <div key={"onequery"+index}>
                            {a}
                            <div>
                                {b.map((item2, index2) => (
                                    <div key={"mulans"+index2}>{item2}</div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            </div>
            <div className="textInputBox">
                <div>
                    <input type="text" value={reqval} onChange={(e) => {setReqval(e.target.value);}} onKeyPress={handleKeyPress}/>
                </div>
            </div>
        </article>
    );
}

export default ChatBot;