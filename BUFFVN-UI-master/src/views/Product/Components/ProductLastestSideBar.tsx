import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import Ultils from "../../../ultils/common";

export function ProductLastestSideBar() {

    const [data, setData] = useState<Array<any>>([]);

    useEffect(() => {
        ProductService.GetLastestAsync({}).then((response: Array<any>) => {
            setData(response);
        });
    }, []);

    let imgRender = (images: Array<string>, altImg: string) => {
        return (
            <>
                <div className="product-image-container lazy1 second_img ">
                    {
                        images?.map((el, index) => {
                            if (index === 0)
                                return <img src={el} alt={altImg} className="product-img img-responsive" />
                        })
                    }
                </div>

                {/* <a className="quickview iframe-link visible-lg" onClick={() => setParams({ ...params, modal: "true" })}
                ><i className="fa fa-search"></i> Xem Nhanh</a> */}

            </>
        )
    }

    return (
        <>
            <div className="module latest-product titleLine">
                <h3 className="modtitle">Sản phẩm mới</h3>
                <div className="modcontent">
                    {data?.map((x: any) => (
                        <>
                            <div className="product-latest-item">
                                <div className="media">
                                    <div className="media-left">
                                        <a href={`/product/detail/${x.id}`}>
                                            {imgRender(x.images, x.name)}
                                        </a>
                                    </div>
                                    <div className="media-body">
                                        <div className="caption">
                                            <h4><a href={`/product/detail/${x.id}`}>{x.name}</a></h4>

                                            <div className="price">
                                                <span className="price-new">{Ultils.PriceDisplay(x.price)}</span>
                                            </div>
                                            <div className="ratings">
                                                <div className="rating-box">
                                                    <span className="fa fa-stack"><i className="fa fa-star fa-stack-1x"></i><i className="fa fa-star-o fa-stack-1x"></i></span>
                                                    <span className="fa fa-stack"><i className="fa fa-star fa-stack-1x"></i><i className="fa fa-star-o fa-stack-1x"></i></span>
                                                    <span className="fa fa-stack"><i className="fa fa-star fa-stack-1x"></i><i className="fa fa-star-o fa-stack-1x"></i></span>
                                                    <span className="fa fa-stack"><i className="fa fa-star fa-stack-1x"></i><i className="fa fa-star-o fa-stack-1x"></i></span>
                                                    <span className="fa fa-stack"><i className="fa fa-star fa-stack-1x"></i><i className="fa fa-star-o fa-stack-1x"></i></span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                    ))}

                </div>

            </div>
        </>)
}