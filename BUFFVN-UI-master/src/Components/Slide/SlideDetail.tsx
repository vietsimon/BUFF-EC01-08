import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSearchParams } from 'react-router-dom';
import { Modal as ModalSimple } from "./../Modal/ModalSimple";
import { Modal as ModalBasic } from "./../Modal/ModalBasic";
import { ZoomImageModal } from '../Modal/ZoomImageModal';
export interface SlideProps {
    // onClick: (page: number) => void;
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    focusOnSelect?: boolean;
    className?: string;
    images: Array<any>
}

export const SlideDetailComponent: React.FC<SlideProps>
    = ({
        // onClick,
        dots = true,
        infinite = true,
        speed = 500,
        slidesToShow = 3,
        slidesToScroll = 1,
        className,
        images
    }) => {
        const [params, setParams] = useSearchParams();
        let [nav1, setNav1] = useState<any>()
        let [nav2, setNav2] = useState<any>()

        // if (images.length <= 0) return null;

        return (
            <div>
                <div className='large-image'>
                    <Slider
                        key="slider-image"
                        asNavFor={nav2}
                        ref={(slider: any) => setNav1(slider)}
                        infinite={true}
                        autoplay={true}
                    >
                        {images?.map(x =>
                            <>
                                <img className="product-image-zoom" src={x} />
                                <div className="text-center mt-3"><a className="quickview iframe-link visible-lg" onClick={() =>
                                 setParams({ ...params, modal: "true",path:x })
                                }
                                ><i className="fa fa-search"></i> Phóng to</a></div>
                            </>
                        )}
                    </Slider>
                </div>



                <div id="thumb-slider" className="owl-theme owl-loaded owl-drag full_slider">
                    <Slider
                        key="slider-thumb"
                        asNavFor={nav1}
                        //   ref={slider => (this.slider2 = slider)}
                        ref={(slider: any) => setNav2(slider)}
                        infinite={false}
                        arrows={true}
                        slidesToShow={3}
                        swipeToSlide={true}
                        focusOnSelect={true}
                    >
                        {images?.map((x, index) =>
                            <a data-index={index} className="img thumbnail"  >
                                <img src={x} />
                            </a>
                        )}
                    </Slider>
                </div>
                <ZoomImageModal modal={ModalSimple} ></ZoomImageModal>
            </div >
        );
    };


export const SlideDetail = SlideDetailComponent;

