import React from 'react';
import './Options.scss';
import { ICountry } from '../../../../../interfaces';

interface IOptionsProps {
    pickedCountries: ICountry[];
    onCountrySelect: (win: boolean) => void;
    hiddenIndex: number;
}

class Options extends React.Component<IOptionsProps> {
    constructor(props: IOptionsProps) {
        super(props);
    }

    private onCountrySelect = (event: React.FormEvent<HTMLInputElement>): void => {
        const { hiddenIndex, onCountrySelect } = this.props;
        const id = parseInt(event.currentTarget.id.split('-')[1]);
        onCountrySelect(id === hiddenIndex);
    }

    public render(): React.ReactNode {
        const { pickedCountries } = this.props;
        const radiobuttons = pickedCountries.map((country: ICountry, index: number) => {
            return ([
                <label
                    key={index}
                    htmlFor={`country-${index}`}>
                        <input
                            id={`country-${index}`}
                            type="radio"
                            value={country.name}
                            onChange={this.onCountrySelect}
                        />
                        {country.name}
                </label>
            ]);
        });
        return(
            <div className="options-container">{radiobuttons}</div>
        );
    }

}

export default Options;