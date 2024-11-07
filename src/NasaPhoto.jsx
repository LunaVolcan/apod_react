import React from 'react';

const NasaPhoto = ({ data }) => {
    const { title, explanation, date, url, media_type, copyright } = data;

    return (
        <div className="nasa-item">
            <h2>{title}</h2>
            {media_type === 'video' ? (
                <video width="560" height="315" controls>
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img src={url} alt={title} />
            )}
            <p>{explanation}</p>
            <p>Date: {date}</p>
            <p>Photographer: {copyright || 'N/A'}</p>
        </div>
    );
};

export default NasaPhoto;