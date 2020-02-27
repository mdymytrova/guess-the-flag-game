import React, { FunctionComponent } from 'react';

interface IResultProps {
    win: boolean;
    country: string;
}
const Result: FunctionComponent<IResultProps> = ({ win, country }) => {
    return (
        <p>{win ? `Correct! ${country}` : `Incorrect! Correct answer: ${country}`}</p>
    );
}

export default Result;