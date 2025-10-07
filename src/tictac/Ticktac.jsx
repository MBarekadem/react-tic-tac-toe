import React, { useRef, useState } from 'react';
import './ticktac.css';
import O from './O.png';
import X from './X.png';

let data = ["", "", "", "", "", "", "", "", ""];

export default function Ticktac() {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);
    let [scoreX, setScoreX] = useState(0);
    let [scoreO, setScoreO] = useState(0);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return; // empêcher de jouer sur une case déjà occupée
        }

        if (count % 2 === 0) {
            e.target.innerHTML = `<img src="${X}" alt="X" />`;
            data[num] = "X";
            setCount(count + 1);
        } else {
            e.target.innerHTML = `<img src="${O}" alt="O" />`;
            data[num] = "O";
            setCount(count + 1);
        }
        checkwin();
    };

    const checkwin = () => {
        if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
            won(data[2]);
        }
        else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
            won(data[5]);
        }
        else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
            won(data[8]);
        }
        else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
            won(data[6]);
        }
        else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
            won(data[7]);
        }
        else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
            won(data[8]);
        }
        else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
            won(data[8]);
        }
        else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
            won(data[6]);
        }
        else if (count === 8) { 
            titleRef.current.innerHTML = "😅 Match nul !";
            setLock(true);
        }
    };

    const won = (winner) => {
        setLock(true);
        if (winner === "X") {
            titleRef.current.innerHTML = `🎉 Congratulations X`;
            setScoreX(prev => prev + 1); // ✅ toujours utiliser prev
        } else {
            titleRef.current.innerHTML = `🎉 Congratulations O`;
            setScoreO(prev => prev + 1);
        }
    };

    const resetGame = () => {
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = 'Tic Tac Toe In <span>ReactJs</span>';
        const boxes = document.querySelectorAll(".boxes");
        boxes.forEach((box) => (box.innerHTML = ""));
    };

    return (
        <div className='container'>
            <h1 className='titre' ref={titleRef}>
                Tic Tac Toe Game In <span>ReactJs</span>
            </h1>

            {/* Tableau des scores */}
            <div className="scores">
                <div className="scoreX">Player X: {scoreX}</div>
                <div className="scoreO">Player O: {scoreO}</div>
            </div>

            {/* Plateau du jeu */}
            <div className='bord'>
                <div className='row1'>
                    <div className='boxes' onClick={(e) => { toggle(e, 0) }}></div>
                    <div className='boxes' onClick={(e) => { toggle(e, 1) }}></div>
                    <div className='boxes' onClick={(e) => { toggle(e, 2) }}></div>
                </div>
                <div className='row2'>
                    <div className='boxes' onClick={(e) => { toggle(e, 3) }}></div>
                    <div className='boxes' onClick={(e) => { toggle(e, 4) }}></div>
                    <div className='boxes' onClick={(e) => { toggle(e, 5) }}></div>
                </div>
                <div className='row3'>
                    <div className='boxes' onClick={(e) => { toggle(e, 6) }}></div>
                    <div className='boxes' onClick={(e) => { toggle(e, 7) }}></div>
                    <div className='boxes' onClick={(e) => { toggle(e, 8) }}></div>
                </div>
            </div>

            {/* Bouton reset */}
            <button className='reset' onClick={resetGame}>Reset</button>
        </div>
    );
}
