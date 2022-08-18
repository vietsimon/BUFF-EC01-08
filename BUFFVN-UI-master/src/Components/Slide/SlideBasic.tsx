import React from 'react';
import classnames from 'classnames';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export interface SlideProps {
    // onClick: (page: number) => void;
    dots: boolean;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    className?: string;
}

export const SlideBasicComponent: React.FC<SlideProps>
    = ({
        // onClick,
        dots = true,
        infinite = true,
        speed = 500,
        slidesToShow = 3,
        slidesToScroll = 1,
        className
    }) => {
        let settings = {
            dots,
            infinite,
            speed,
            slidesToShow,
            slidesToScroll
        };

        return (
            <div>
                <Slider {...settings}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div >
        );
    };


export const SlideBasic = SlideBasicComponent;

