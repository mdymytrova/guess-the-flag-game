export interface ICountry {
	name: string;
	flag: string; 
}

export type ICountryFull = Pick<ICountry, keyof ICountry>;
