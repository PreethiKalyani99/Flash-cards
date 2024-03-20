import React from "react";

export function FlashCardForm(props){

    function handleInputChange(e){
        const {name, value} = e.target
        props.setSingleFormData({
            ...props.singleFormData,
            [name]: value
        })
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

    return (
        <>
        <div>
            <button onClick={props.handleGoBack} className="goBack-btn">Go Back</button>
        </div>
        <div className="parent-container">
            <div className="form-container">
                <form className="form" onSubmit={AddCard}>
                    <div className="form-group">
                        <label for="cardlabel">Card Label</label>
                        <input 
                            type="text" 
                            required 
                            className="cardLabel"
                            name="cardLabel"
                            id="cardlabel" 
                            value={props.singleFormData.cardLabel} 
                            onChange={handleInputChange}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label for="description">Description</label>
                        <textarea 
                            required 
                            cols="40" 
                            rows="10"
                            className="cardLabel"
                            name="description"
                            id="description" 
                            value={props.singleFormData.description} 
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <button type="submit" className="form-submit-btn">Add</button>
                </form>
            </div>
        </div>
        </>
    )
}