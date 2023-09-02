import React from "react";

export default function Die(props){
    const styles={
        backgroundColor: props.isHeld ? '#59e391':"white"
    }

    return(
        <div className="shadow-md h-[50px] w-[50px] bg-white flex justify-center items-center cursor-pointer" style={styles} onClick={props.HoldDice}>
            <h2 className="text-[1.5rem]">{props.value}</h2>
        </div>
    )
}