import React, {useState} from "react";
import loader from  '../utils/assets/icons/loading.png'

export function DisplayFlashCards(props){
    const [isFlipped, setIsFlipped] = useState(false)
    const [currentPosition, setCurrentPosition] = useState(0)
    const [isShuffled, setIsShuffled] = useState(false)
    

    function handleNextCard(){
        setIsShuffled(false)
        if(!isFlipped){
            if(currentPosition >= props.data.length - 1){
                setCurrentPosition(0)
            }
            else{
                setCurrentPosition(currentPosition + 1)
            }
        }
    }
    function handleShuffle() {
        const timeoutID = setTimeout(() => setIsShuffled(false), 1000)

        props.setData(prevData => {
            const shuffledData = shuffleArray(prevData)
            setIsShuffled(true)
            setCurrentPosition(0)
            return shuffledData
        })
        return () => clearTimeout(timeoutID)
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }
    return (
        <div>
             <div>
            <button onClick={props.handleGoBack} className="goBack-btn">Go Back</button>
            </div>
           <div className="parent-container">
            {isShuffled ? <div className="flip-card">
                <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
                        <div className="flip-card-front">
                            <img src={loader} className="loader"></img>
                        </div>
                </div>
                </div>
                : <div className="flip-card">
                    <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
                        <div className="flip-card-front">
                        {isShuffled ? props.data[0].cardLabel : props.data[currentPosition].cardLabel}
                        </div>
                        <div className='flip-card-back'>
                        {isShuffled ? props.data[0].description : props.data[currentPosition].description}
                        </div>
                    </div>
                </div>
            }
            </div>
            
            <div className="display-btns-position">
                {isFlipped && <button 
                    className="button" 
                    onClick={() => setIsFlipped(false)}
                >Flip Back</button>}
                {!isFlipped && <button 
                        className="button" 
                        onClick={() => setIsFlipped(true)}
                >Flip</button>}
                {!isFlipped && <button 
                    className={isShuffled ? "button disable" : "button" }
                    onClick={handleNextCard}
                >Next</button>}
                {!isFlipped && <button 
                    className={isShuffled ? "button disable" : "button" }
                    onClick={handleShuffle}
                >Shuffle</button>}
            </div>
        </div>
    )
}