import React from 'react';
import '../styles/CarouselMotion.css';

const SlowPhotoCarousel = ({images, style, className}) => {

    const carouselTrackStyle = {
        ...style,
        WebkitMaskImage: 'linear-gradient(90deg, #0000 0, #000 25%, #000 75%, #0000)',
        overflow: 'hidden',
    }

    const carouselStyle = {
        display: 'flex',
        flexWrap: 'nowrap',
        gap: '16px',
        minHeight: '200px',
        marginBlock: '16px',
        justifyContent: 'center',
        position: 'relative',
        animation: 'carousel 60s linear 0s infinite',
    }

    const childImageStyle = {
        minHeight: '200px',
        minWidth: '200px',
        borderRadius: '100px',

    }

    return (
        <div style={carouselTrackStyle} className={className}>
            <div style={carouselStyle}>
                {images.map((img, idx) => {
                    return <img src={img} key={idx} style={childImageStyle} alt='Chris' />
                })}
                {images.map((img, idx) => {
                    return <img src={img} key={idx} style={childImageStyle} alt='Chris' />
                })}
            </div>
        </div>
    );
};



export default SlowPhotoCarousel;