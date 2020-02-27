import React, { FunctionComponent } from 'react';
import './Flag.scss';

interface IFlagProps {
    flagSrc: string;
}
const Flag: FunctionComponent<IFlagProps> = ({flagSrc}) => {
    return (
        <div><img className="flag-container" src={flagSrc} /></div>
    );
};

export default Flag;
