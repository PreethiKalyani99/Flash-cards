import React from "react";
import { Button } from "react-bootstrap";

export function HomePage(props){
 
    return (
        <div className="parent-container">
           <div className="btn-position">
                <Button className="button" onClick={() => props.navigate("/create-card")}>
                    Create Cards
                </Button>
                <Button className={props.data.length > 0 ? "button" : "hide"} onClick={() => props.navigate("/display-card")}>
                    Display Cards
                </Button>
            </div>
        </div>
    )
}