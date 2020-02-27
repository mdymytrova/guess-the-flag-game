import React from 'react';
import './FlagGame.scss';
import { ICountryFull, ICountry } from '../../interfaces';
import Game from './game/Game';
import Flag from './flag/Flag';
import Random from '../../utils/random';

interface IFlagGameProps {
    allCountries: ICountryFull[]
}

export interface IFlagGameState {
	countries: ICountry[];
	hiddenIndex: null | number;
}

class FlagGame extends React.Component<IFlagGameProps, IFlagGameState> {
	constructor(props: IFlagGameProps) {
		super(props);
		this.state = {
			countries: [],
			hiddenIndex: null
		};
    }

    public componentDidMount() {
        const { allCountries } = this.props;
		const countries: ICountry[] = this.pickCountries(allCountries);
		this.setState({
			countries,
			hiddenIndex: Random.getRandomIndex(countries.length)
		});
	}
    
    private pickCountries(allCountries: ICountryFull[]): ICountry[] {
		const indexes: number[] = Random.getRandomIndexes([], allCountries.length);
		return indexes.map((index) => {
			return {
				name: allCountries[index].name,
				flag: allCountries[index].flag
			};
		});
	}

	private getResetState = (allCountries: ICountryFull[]): IFlagGameState => {
		const countries = this.pickCountries(allCountries);
		return {
			countries,
			hiddenIndex: Random.getRandomIndex(countries.length)
		}
	}

	private onGameReset = (): void => {
        const { allCountries } = this.props;
        const state = this.getResetState(allCountries);
        this.setState(state);
	}

	public render(): React.ReactNode {
		const { countries, hiddenIndex } = this.state;
		const flag = countries[hiddenIndex]
			? <Flag flagSrc={countries[hiddenIndex].flag} />
            : '';
        const game = countries[hiddenIndex]
            ? <Game
                onGameReset={this.onGameReset}
                countries={countries}
                hiddenIndex={hiddenIndex}
            />
            : '';
		return (
			<div className="flag-game-container">
				{game}
				{flag}
			</div>
		  );
	}
}

export default FlagGame;