import React from 'react';
import './Game.scss';
import { ICountry } from '../../../interfaces';
import Result from './result/Result';
import CountriesSelect from './countries-select/CountriesSelect';

interface IGameProps {
    onGameReset: () => void;
    countries: ICountry[];
    hiddenIndex: number;
}

interface IGameState {
    gameState: number;
}

enum GameState {
    INIT,
    WIN,
    FAIL
}

enum ButtonState {
    INIT = 'Guess',
    RESET = 'Again'
}

class Game extends React.Component<IGameProps, IGameState> {
    constructor(props: IGameProps) {
        super(props);

        this.state = {
            gameState: GameState.INIT
        }
    }

    private onGuessFlag = (): void => {
        const { onGameReset } = this.props;
        this.setState({gameState: GameState.INIT});
        onGameReset();
    }

    private onCountrySelect = (win: boolean): void => {
        this.setState({
            gameState: win ? GameState.WIN : GameState.FAIL
        });
    }

    public render(): React.ReactNode {
        const { countries, hiddenIndex } = this.props;
        const { gameState } = this.state;
        return(
            <div className="game-container">
                {gameState === GameState.INIT
                    ? <CountriesSelect
                        countries={countries}
                        hiddenIndex={hiddenIndex} 
                        onCountrySelect={this.onCountrySelect}/>
                    : <Result
                        win={gameState === GameState.WIN}
                        country={countries[hiddenIndex].name}/>
                }
                <button
                    type="button"
                    className="game-button"
                    onClick={this.onGuessFlag}>
                        {GameState.INIT ? ButtonState.INIT : ButtonState.RESET}
                </button>
            </div>
        );
    }
}

export default Game;