import React, {useState, useRef} from "react";

export function FlashCardForm(props){
    const [isDisabled, setIsDisabled] = useState(true)
    const [errorMessage, setErrorMessage] = useState({
        emptyLabel: '',
        emptyDescription: ''
    })
    const labelInput = useRef()
    const description = useRef()

    function handleInputChange(e){
        const {name, value} = e.target
        props.setSingleFormData({
            ...props.singleFormData,
            [name]: value
        })
        toggleButton()
    }
    function AddCard(e){
        e.preventDefault()
        props.setData([...props.data, props.singleFormData])
        props.setSingleFormData({
            cardLabel: '',
            description: ''
        })
        alert('Added successfully!')
    }

    function toggleButton(){
        if(labelInput.current.value !== '' && description.current.value !== ''){
            setIsDisabled(false)
            setErrorMessage({
                emptyLabel: '',
                description: ''
            })
        }
        else if(labelInput.current.value === ''){
            setIsDisabled(true)
            setErrorMessage({
                ...errorMessage,
                emptyLabel: 'Card label should not be empty'
            })
        }
        else if(description.current.value === ''){
            setIsDisabled(true)
            setErrorMessage({
                ...errorMessage,
                description: 'Description should not be empty'
            })
        }
    }

    return (
        <>
        <div>
            <button onClick={props.handleGoBack} className="goBack-btn">Go Back</button>
        </div>
        <div className="parent-container">
            <div className="form-container">
                <form className="form" onSubmit={AddCard}>
                    <div className="form-group">
                        <label htmlFor="cardlabel">Card Label</label>
                        <input 
                            type="text" 
                            ref={labelInput}
                            className="cardLabel"
                            name="cardLabel"
                            id="cardlabel" 
                            value={props.singleFormData.cardLabel} 
                            onChange={handleInputChange}
                        ></input>
                        {errorMessage.emptyLabel && <p className="errorMessage">{errorMessage.emptyLabel}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            ref={description}
                            cols="40" 
                            rows="10"
                            className="cardLabel"
                            name="description"
                            id="description" 
                            value={props.singleFormData.description} 
                            onChange={handleInputChange}
                        ></textarea>
                       {errorMessage.description && <p className="errorMessage">{errorMessage.description}</p> }
                    </div>
                    <button 
                        type="submit" 
                        className={isDisabled ? "form-submit-btn disable" : "form-submit-btn"}
                        disabled={isDisabled}
                    >Add</button>
                </form>
            </div>
        </div>
        </>
    )
}