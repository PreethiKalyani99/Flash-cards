import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import { HomePage } from "./HomePage";
import { FlashCardForm } from "./FlashCardForm";
import { DisplayFlashCards } from "./DisplayFlashCards";

export function FlashCards() {
    const [singleFormData, setSingleFormData] = useState({
        cardLabel: '',
        description: ''
    })
    const [data, setData] = useState([])
    const navigate = useNavigate()

    function handleGoBack(){
        navigate('/')
    }
    return (
        <Routes>
            <Route 
                exact 
                path="/" 
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
                    handleGoBack={handleGoBack}
                    navigate={navigate}
                />}
            />
        </Routes>
    )
}