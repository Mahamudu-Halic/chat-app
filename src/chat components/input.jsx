
const Input = () => {
    return(
        <div className="input">
            <input type="text" placeholder="Type something..."/>
            <div className="send">
                <input type="file" id="attachFile"/>
                <label htmlFor="attachFile">
                    <i className="fa-solid fa-paperclip"></i>
                </label>
                
                <input type="file" id="attachImage"/>
                <label htmlFor="attachImage">
                    <i className="fa-solid fa-image"></i>
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input