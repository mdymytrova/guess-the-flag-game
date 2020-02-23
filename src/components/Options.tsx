import React, { FunctionComponent, ChangeEvent } from 'react';
import { ICountry } from './App';
import './App.scss';

interface IOptions {
    pickedCountries: ICountry[];
    onCountrySelect: (index: number) => (event: ChangeEvent<HTMLInputElement>) => void;
    pickedIndex: number
}

const Options: FunctionComponent<IOptions> = ({pickedCountries, onCountrySelect, pickedIndex}) => {
    const radiobuttons = pickedCountries.map((country: ICountry, index: number) => {
        return ([
            <label
                key={index}
                htmlFor={`country-${index}`}>
                    <input
                        id={`country-${index}`}
                        type="radio"
                        value={country.name}
                        checked={pickedIndex === index}
                        onChange={onCountrySelect(index)}
                    />
                    {country.name}
            </label>
        ]);
    });
    return (
        <div className="options-container">{radiobuttons}</div>
    );
}

export default Options;