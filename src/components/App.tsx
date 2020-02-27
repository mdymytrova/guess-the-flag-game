import * as React from 'react';
import './App.scss';
import { ICountryFull } from '../interfaces';
import Navbar from './navbar/Navbar';
import FlagGame from './flag-game/FlagGame';

interface IFlagGameState {
	allCountries: ICountryFull[]
}
class App extends React.Component<{}, IFlagGameState> {
	private api: string;

	constructor(props: object) {
		super(props);
		this.api = 'https://restcountries.eu/rest/v2/all';
		this.state = {
			allCountries: []
		};
	}

	public async componentDidMount() {
		const allCountries: ICountryFull[] = await this.getCountries();
		this.setState({ allCountries });
	}

	private async getCountries(): Promise<ICountryFull[]> {
		const allCountries = await fetch(this.api);
		return allCountries.json();
	}
	  
	public render(): React.ReactNode {
		const { allCountries } = this.state;
		return (
			<div className="app">
				<Navbar />
				{allCountries && allCountries.length > 0
					? <FlagGame allCountries={allCountries} />
					: ''}
			</div>
		);
	}
}

export default App;