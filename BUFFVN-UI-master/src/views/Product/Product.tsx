import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import Utils from "../../ultils/common";
import { ProductCategorySideBar } from "./Components/ProductCategorySideBar";
import { ProductLastestSideBar } from "./Components/ProductLastestSideBar";
import { ProductQuickViewModal } from "./Components/ProductQuickViewModal";
import { Modal as ModalSimple } from "../../Components/Modal/ModalSimple";
import { Modal as ModalBasic } from "../../Components/Modal/ModalBasic";
// import { Pagination, Props } from '../../Components/Pagination/Pagination';
import { BasePagingType } from "../../type/BasePagingType";
import { Pagination } from "../../Components/Pagination/PaginationSimple";
import { AdverSideBar } from "../../Components/Adver/AdverSideBar";
import { useCart } from "../../Components/Cart/useCart";

export function Product() {
    const { idCategory } = useParams();
    const [params, setParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [data, setData] = useState<BasePagingType<any>>({ currentPage: 1, pageSize: 3, total: 0, datas: [] });
    const { addItem, inCart, setCartMetadata } = useCart();
    const [isGrid, setIsGrid] = useState<boolean>(true);
    const pagingClick = (page: number) => {
        setPage(page);
        getPaging(page);
    }
    const getPaging = (page: number) => {
        let params = {
            page: page,
            pageSize: data?.pageSize,
        } as any;
        if (idCategory) params.categorId = idCategory;
        ProductService.GetProductPagingAsync(params).then((x: BasePagingType<any>) => {
            setData(x);
            let totalPageFromApi = Utils.GetTotalPages(x?.total, x?.pageSize);
            if (totalPageFromApi !== totalPages)
                setTotalPages(totalPageFromApi);
        });
    }
    useEffect(() => {
        getPaging(page);
    }, [])

    // useEffect(()=>{
    //     console.log('====================================');
    //     console.log("run change data");
    //     console.log('====================================');
    // },[data])
    let LayoutModeClick = (mode: any) => {
        if (mode === 'grid')
            setIsGrid(true);
        else
            setIsGrid(false);
    }
    let imgRender = (images: Array<string>, altImg: string) => {
        return (
            <>
                <div className="product-image-container lazy1 second_img ">
                    {
                        images?.map((el, index) => {
                            if (index === 0)
                                return <img src={el} alt={altImg} className="img-responsive" />
                            if (index === 1)
                                return <img src={el} alt={altImg} className="img-responsive img_0 " />
                        })
                    }
                </div>

                <a className="quickview iframe-link visible-lg" onClick={() => setParams({ ...params, modal: "true" })}
                ><i className="fa fa-search"></i> Xem Nhanh</a>

            </>
        )
    }
    let ListRender = () => {
        return (<>
            {
                data?.datas?.map((x: any) => {
                    return <>
                        <div key={`product-item-${x.id}`} className="product-layout col-md-4 col-sm-6 col-xs-12 ">
                            <div className="product-item-container">
                                <div className={`left-block ${isGrid ? "" : "col-md-4"}`}>
                                    {imgRender(x.images, x.name)}
                                </div>
                                <div className={`right-block ${isGrid ? "" : "col-md-8"}`}>
                                    <div className="caption">
                                        <h4><a href={`/product/detail/${x.id}`}>{x.name}</a></h4>
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
                                            <span className="price-new">{Utils.PriceDisplay(x.price)}</span>

                                        </div>
                                        <div className={`description item-desc ${isGrid ? "hidden" : ""}`}>
                                            {x.description}
                                        </div>
                                    </div>

                                    <div className="button-group">
                                        <button onClick={() => addItem(x)} className="addToCart w-full" type="button" data-toggle="tooltip" title="Thêm vào giỏ" ><i className="fa fa-shopping-cart"></i> <span className="hidden-xs">Thêm vào giỏ</span></button>
                                        {/* <button className="wishlist" type="button" data-toggle="tooltip" title="Add to Wish List" ><i className="fa fa-heart"></i></button> */}
                                        {/* <button className="compare" type="button" data-toggle="tooltip" title="Compare this Product" ><i className="fa fa-exchange"></i></button> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="clearfix visible-sm-block"></div>
                        <div className="clearfix visible-xs-block"></div>
                    </>
                })
            }
        </>)
    }

    return (
        <>
            {/* <ul className="breadcrumb">
                <li><a href="#"><i className="fa fa-home"></i></a></li>
                <li><a href="#">Smartphone & Tablets</a></li>
            </ul> */}

            <div className="row">

                <aside className="col-sm-4 col-md-3" id="column-left">
                    <ProductCategorySideBar></ProductCategorySideBar>
                    <ProductLastestSideBar></ProductLastestSideBar>
                    <AdverSideBar></AdverSideBar>
                </aside>

                <div id="content" className="col-md-9 col-sm-8">
                    <div className="products-category">
                        {/* <div className="category-derc">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="banners">
                                        <div>
                                            <a href="#"><img src="https://demo.smartaddons.com/templates/html/market/image/demo/shop/category/electronic-cat.png" alt="Apple Cinema 30&quot;" /><br /></a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> */}

                        <div className="product-filter filters-panel">
                            <div className="row">
                                <div className="col-md-2 visible-lg hidden">
                                    <div className="view-mode">
                                        <div className="list-view">
                                            <button className={`btn btn-default grid ${isGrid ? "active" : ""}`} onClick={() => {
                                                LayoutModeClick('grid')
                                            }} data-view="grid" data-toggle="tooltip" data-original-title="Grid"><i className="fa fa-th"></i></button>
                                            <button className={`btn btn-default list ${!isGrid ? "active" : ""}`} onClick={() => {
                                                LayoutModeClick('list')
                                            }} data-view="list" data-toggle="tooltip" data-original-title="List"><i className="fa fa-th-list"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <Pagination key={`product-paging`}
                                    pageSize={data?.pageSize}
                                    currentPage={page}
                                    siblingCount={1}
                                    totalCount={data?.total}
                                    onPageChange={pagingClick}
                                    className="col-md-10 text-right"
                                />
                            </div>
                        </div>
                        <div className={`products-list row ${isGrid ? "grid" : "list"}`}>
                            <ListRender></ListRender>
                        </div>
                        <div>
                        </div>
                        {/* <ProductListComponent data={data}></ProductListComponent> */}
                    </div>
                    <Pagination key={`product-paging-bottom`}
                        pageSize={data?.pageSize}
                        currentPage={page}
                        siblingCount={1}
                        totalCount={data?.total}
                        onPageChange={pagingClick}
                        className="col-md-12 text-right"
                    />
                </div>
            </div>
            <ProductQuickViewModal modal={ModalSimple}></ProductQuickViewModal>
        </>
    )
}


