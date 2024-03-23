import React, {useState} from 'react';
import { Button, Card, CardBody, CardFooter} from "react-bootstrap";
import flipIcon from '../utils/assets/icons/repeat.png'

export function DisplayFlashCards(props){
    const [next, setNext] = useState(false)
    const [back, setBack] = useState(false)

    const flipCard = (index, isFlip) => {
        props.setData(prevCards => {
            return prevCards.map((card, i) => {
                if (i === index && isFlip) {
                    return { ...card, flipped: !card.flipped }
                } else {
                    return card
                }
            })
        })
    }
    function shuffleCards(){
        let shuffledCards = [...props.data];
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        console.log(shuffledCards, 'shuffle')
        props.setData(shuffledCards);
    }
    function showNextCard(id) {
        const index = props.data.findIndex(card => card.id === id)
        const updatedCards = [...props.data]
        const currentCard = updatedCards.splice(index, 1)[0]
        updatedCards.push(currentCard)
        props.setData(updatedCards);
        setNext(true);
        setBack(false)
    }
    function showPreviosCard(){
      const updatedCards = [...props.data]  
      const lastCard = updatedCards.splice(props.data.length-1, 1)[0]
      updatedCards.unshift(lastCard)
      props.setData(updatedCards)
      setNext(false)
      setBack(true)
    }

    function calculateCardStyle(index, cardsLength) {
        const zIndex = cardsLength - index
        if (index === 0) {
            return {zIndex : `${zIndex}`}
        }
    
        const translateX = 90 - (index - 1) * 10
        const right = 38 - (index - 1) * 1
        return {
            transform: ` translateX(${translateX}px)`,
            transformOrigin: 'top left',
            right: `${right}%`,
            bottom: '26%',
            zIndex : zIndex
        }
    }
    
    return (
        <>
         <div>
            <button onClick={props.handleGoBack} className="goBack-btn">Go Back</button>
        </div>
        <div className='container'>
        {props.data.map((card, index) => {
            const style = calculateCardStyle(index, props.data.length)
            const isNextCard = next && index === props.data.length-1
            const isFirstBackCard = index === 0 && back
 
            return (
                <Card className='flash-card' style={style} key={card.id}>
                    <div className={card.flipped  ? `${isNextCard ?'inner-card flipped next-card-flipped' : isFirstBackCard ? 'inner-card flipped back-card' : 'inner-card flipped'}` : `${isNextCard ?'inner-card next-card' : isFirstBackCard ? 'inner-card back-card' : 'inner-card'}`}>
                        <CardBody className={card.flipped ? 'card-body back' :'card-body front'}>
                            <span className='card-text'>{card.flipped ? card.description : card.cardLabel}</span>
                            <Button className='flip-btn' onClick={() => flipCard(index, true)}>
                                <span> <img src={flipIcon} alt='flip icon' className='flip-icon'/>{card.flipped ? 'Flip Back' : 'Flip'}</span>
                            </Button>
                        </CardBody>
                        <CardFooter className={card.flipped ? `card-footer back` : 'card-footer front'}>
                            <Button onClick={showPreviosCard} className='back-btn'>Back</Button> 
                            <Button onClick={() => showNextCard(card.id)} className='next-btn'>Next</Button>
                            <Button onClick={shuffleCards} className='shuffle-btn'>Shuffle</Button>
                        </CardFooter>
                    </div> 
                </Card>
            )
        })}
    </div>
        </>
    )
}
