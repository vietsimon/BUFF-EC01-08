import { useEffect, useState } from "react";

export function ProductListComponent(data: any) {
    const [dataPaging, setDataPaging] = useState<any>({});
    console.log("ProductListComponent", data);
 
    useEffect(() => {
        setDataPaging({...data});
        console.log("useEffect data", data);
    }, [data])
    return (
        <>
            <div className="products-list row grid">
                <div>aaaaaaaaaa {dataPaging?.datas?.length}</div>
                {
                    data?.datas?.map((x: any) => (
                        <> <div className="product-layout col-md-4 col-sm-6 col-xs-12 ">
                            <div className="product-item-container">
                                <div className="left-block">
                                    <div className="product-image-container lazy second_img ">
                                        <img data-src="image/demo/shop/product/11.jpg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Apple Cinema 30&quot;" className="img-responsive" />
                                        <img data-src="image/demo/shop/product/10.jpg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Apple Cinema 30&quot;" className="img_0 img-responsive" />
                                    </div>
                                    <a className="quickview iframe-link visible-lg" data-fancybox-type="iframe" href="quickview.html">  Quickview</a>
                                </div>
                                <div className="right-block">
                                    <div className="caption">
                                        <h4><a href="product.html">Canon EOS 5D</a></h4>
                                        <div className="ratings">
                                            <div className="rating-box">
                                                <span className="fa fa-stack"><i className="fa fa-star fa-stack-1x"></i><i className="fa fa-star-o fa-stack-1x"></i></span>
                                                <span className="fa fa-stack"><i className="fa fa-star fa-stack-1x"></i><i className="fa fa-star-o fa-stack-1x"></i></span>
                                                <span className="fa fa-stack"><i className="fa fa-star fa-stack-1x"></i><i className="fa fa-star-o fa-stack-1x"></i></span>
                                                <span className="fa fa-stack"><i className="fa fa-star fa-stack-1x"></i><i className="fa fa-star-o fa-stack-1x"></i></span>
                                                <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x"></i></span>
                                            </div>
                                        </div>

                                        <div className="price">
                                            <span className="price-new">$60.00</span>

                                        </div>
                                        <div className="description item-desc hidden">
                                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est . </p>
                                        </div>
                                    </div>

                                    <div className="button-group">
                                        <button className="addToCart" type="button" data-toggle="tooltip" title="Add to Cart" ><i className="fa fa-shopping-cart"></i> <span className="hidden-xs">Add to Cart</span></button>
                                        <button className="wishlist" type="button" data-toggle="tooltip" title="Add to Wish List" ><i className="fa fa-heart"></i></button>
                                        <button className="compare" type="button" data-toggle="tooltip" title="Compare this Product" ><i className="fa fa-exchange"></i></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                            <div className="clearfix visible-sm-block"></div><div className="clearfix visible-xs-block"></div>

                        </>
                    ))
                }




                <div className="product-filter product-filter-bottom filters-panel" >
                    <div className="row">
                        <div className="col-md-2 hidden-sm hidden-xs">
                        </div>
                        <div className="short-by-show text-center col-md-7 col-sm-8 col-xs-12">
                            <div className="form-group" style={{ margin: "7px 10px" }}>Showing 1 to 9 of 10 (2 Pages)</div>
                        </div>
                        <div className="box-pagination col-md-3 col-sm-4 text-right">
                            <ul className="pagination"><li className="active"><span>1</span></li><li><a href="#">2</a></li><li><a href="#">&gt;</a></li><li><a href="#">&gt;|</a></li></ul></div>

                    </div>
                </div>
            </div>
        </>)
}