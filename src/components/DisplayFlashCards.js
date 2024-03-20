import React, {useState} from "react";

export function DisplayFlashCards(props){
    const [isFlipped, setIsFlipped] = useState(false)
    const [currentPosition, setCurrentPosition] = useState(0)

    function handleNextCard(){
        if(!isFlipped){
            if(currentPosition >= props.data.length - 1){
                setCurrentPosition(0)
            }
            else{
                setCurrentPosition(currentPosition + 1)
            }
        }
    }
    function handleShuffle(){
       for(let i = props.data.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * props.data.length)
            let temp = props.data[i]
            props.data[i] = props.data[j]
            props.data[j] = temp
        }
        setCurrentPosition(0)
    }
    return (
        <div>
             <div>
            <button onClick={props.handleGoBack} className="goBack-btn">Go Back</button>
            </div>
            <div className="parent-container">
                <div className="flip-card">
                    <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
                        <div className="flip-card-front">
                        {props.data[currentPosition].cardLabel}
                        </div>
                        <div className='flip-card-back'>
                        {props.data[currentPosition].description}
                        </div>
                    </div>
                </div>
            </div>
            <div className="display-btns-position">
                {!isFlipped && <button className="button" onClick={() => setIsFlipped(true)}>Flip</button>}
                {isFlipped && <button className="button" onClick={() => setIsFlipped(false)}>Flip Back</button>}
                {!isFlipped && <button className="button" onClick={handleNextCard}>Next</button>}
                {!isFlipped && <button className="button" onClick={handleShuffle}>Shuffle</button>}
            </div>
        </div>
    )
}