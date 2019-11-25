import React from 'react';
import FishListItem from "../FishListItem";

const FishList = (props) => {
    const { fishes } = props;

    return (
        <ul className="fishes">
            { Object.keys(fishes)
                .map((key) =>
                    <FishListItem key={ key }
                                  details={ fishes[key]} />) }
        </ul>
    )
};

export default FishList
