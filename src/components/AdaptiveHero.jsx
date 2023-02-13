import React from 'react';

const AdaptiveHero = ({primaryElement, secondaryElement}) => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                {primaryElement}
                <div>
                    {secondaryElement}
                </div>
            </div>
        </div>
    );
};

export default AdaptiveHero;