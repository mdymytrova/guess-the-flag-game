import * as React from 'react';
import './App.scss';
import Options from './Options';

export interface ICountry {
	name: string;
	flag: string; 
}

type ICountryFull = Pick<ICountry, keyof ICountry>;

interface ICountryFlagState {
	allCountries: ICountryFull[],
	pickedCountries: ICountry[];
	hiddenIndex: null | number;
	pickedIndex: null | number;
	message: string;
	finished: boolean;
}

class App extends React.Component<{}, ICountryFlagState> {
	private api: string;
	private optionsNumber: number;

	constructor(props: {}) {
		super(props);
		this.api = 'https://restcountries.eu/rest/v2/all';
		this.optionsNumber = 4;
		this.state = {
			allCountries: [],
			pickedCountries: [],
			hiddenIndex: null,
			pickedIndex: null,
			message: '',
			finished: false
		};
	}

	public async componentDidMount() {
		const allCountries: ICountryFull[] = await this.getCountries();
		const pickedCountries: ICountry[] = this.pickCountries(allCountries);
		this.setState({
			allCountries,
			pickedCountries,
			hiddenIndex: this.getRandomIndex(pickedCountries.length)
		});
	}

	private async getCountries(): Promise<ICountryFull[]> {
		const allCountries = await fetch(this.api);
		return await allCountries.json();
	}

	private pickCountries(allCountries: any[]): ICountry[] {
		const indexes: number[] = this.getRandomIndexes([], allCountries.length);
		return indexes.map((index) => {
			return {
				name: allCountries[index].name,
				flag: allCountries[index].flag
			};
		});
	}

	private guessFlag = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
		event.preventDefault();
		const { pickedIndex, hiddenIndex, pickedCountries, allCountries, finished } = this.state;
		const state = finished
			? this.getResetState(allCountries)
			: this.getPlayState(pickedCountries[hiddenIndex].name, pickedIndex === hiddenIndex);
		this.setState(state);
	}

	private getResetState = (allCountries: ICountryFull[]) => {
		const pickedCountries = this.pickCountries(allCountries);
		return {
			pickedCountries,
			hiddenIndex: this.getRandomIndex(pickedCountries.length),
			pickedIndex: null as any,
			message: '',
			finished: false
		}
	}

	private getPlayState = (countryName: string, win: boolean) => {
		return {
			message: win
				? `Correct! ${countryName}`
				: `Incorrect! Correct answer: ${countryName}`,
			finished: true
		};
	}

	private onCountrySelect = (index: number) => {
		return () => {
			this.setState({pickedIndex: index});
		}
	}

	private getButtonText = (): string => {
		const { finished } = this.state;
		return finished ? 'Next' : 'Guess';
	}

	private getRandomIndexes(array: number[], range: number): number[] {
		const index = this.getRandomIndex(range);
		if (array.length < this.optionsNumber && !array.includes(index)) {
			array = this.getRandomIndexes([...array, index], range);
		}
		return array;
	}

	private getRandomIndex(length: number = this.optionsNumber): number {
		return Math.floor(Math.random() * length);
	}
	  
	public render(): React.ReactNode {
		const { pickedCountries, hiddenIndex, pickedIndex, message } = this.state;
		const image = pickedCountries[hiddenIndex]
			? <img className="flag-container" src={pickedCountries[hiddenIndex].flag} />
			: '';
		return (
			<div className="app">
				<h1>Guess The Flag</h1>
				<p>{message}</p>
				<form className="form-container" onSubmit={this.guessFlag}>
					{<Options
						pickedCountries={pickedCountries}
						onCountrySelect={this.onCountrySelect}
						pickedIndex={pickedIndex}
					/>}
					<button type="submit" className="button">{this.getButtonText()}</button>
				</form>
				{image}
			</div>
		  );
	}
}

export default App;