import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
    const { image, contestName, description, participationCount, _id } = item || {};

    return (
        <div className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <figure className='h-48 w-full overflow-hidden'>
                <img
                    src={image}
                    alt={contestName}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-gray-800 font-bold">{contestName}</h2>
                <p className="text-gray-600 line-clamp-2">{description}</p>
                
                <div className="flex justify-between items-center mt-2">
                     <div className="badge badge-secondary badge-outline">Participants: {participationCount}</div>
                </div>

                <div className="card-actions justify-end mt-4">
                    <Link to={`/contest-details/${_id}`} className="btn btn-primary btn-sm w-full text-white font-semibold rounded-lg shadow-md hover:bg-primary-focus">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;