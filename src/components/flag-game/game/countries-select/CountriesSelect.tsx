import React from 'react';
import './CountriesSelect.scss';
import { ICountry } from '../../../../interfaces';
import Options from './options/Options';

interface ICountriesSelectProps {
    countries: ICountry[],
    hiddenIndex: number,
    onCountrySelect: (win: boolean) => void;
}

class CountriesSelect extends React.Component<ICountriesSelectProps> {
    constructor(props: ICountriesSelectProps) {
        super(props);
    }

    public render() {
        const { countries, hiddenIndex, onCountrySelect } = this.props;
        return (
            <form className="form-container">
                {<Options
                    pickedCountries={countries}
                    onCountrySelect={onCountrySelect}
                    hiddenIndex={hiddenIndex}
                />}
            </form>
        );
    };
}

export default CountriesSelect;