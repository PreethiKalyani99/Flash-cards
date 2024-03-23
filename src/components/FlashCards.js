import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import { HomePage } from "./HomePage";
import { FlashCardForm } from "./FlashCardForm";
import { DisplayFlashCards } from "./DisplayFlashCards";

export function FlashCards() {
    const [singleFormData, setSingleFormData] = useState({
        cardLabel: '',
        description: '',
        flipped: false
    })
    const [data, setData] = useState([])
    const navigate = useNavigate()

    function handleGoBack(){
        navigate('/Flash-cards')
    }

    return (
        <Routes>
            <Route 
                exact 
                path="/Flash-cards" 
                element={<HomePage 
                    data={data}
                    navigate={navigate}
                />}
            />
            <Route 
                exact 
                path="/create-card" 
                element={<FlashCardForm
                    singleFormData={singleFormData}
                    setSingleFormData={setSingleFormData}
                    data={data}
                    setData={setData}
                    handleGoBack={handleGoBack}
                    navigate={navigate}
                />} 
            />
            <Route
                exact
                path="/display-card"
                element={data.length > 0 && <DisplayFlashCards
                    data={data}
                    setData={setData}
                    handleGoBack={handleGoBack}
                    navigate={navigate}
                />}
            />
        </Routes>
    )
}
