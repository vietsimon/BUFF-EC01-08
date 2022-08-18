
import { useEffect, useState } from "react";
import Utils from "../../ultils/common";
import { useParams, useSearchParams } from "react-router-dom";
import BlogService from "../../services/BlogService";
import { BasePagingType } from "../../type/BasePagingType";
import { BlogCategorySideBar } from "./Components/BlogCategorySideBar";
import { BlogListComponent } from "./Components/BlogListComponent";
import { ProductLastestSideBar } from "../Product/Components/ProductLastestSideBar";
import { Pagination } from "../../Components/Pagination/PaginationSimple";

export function Blog() {
    const { idCategory } = useParams();
    const [params, setParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [data, setData] = useState<BasePagingType<any>>({ currentPage: 1, pageSize: 3, total: 0, datas: [] });
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
        BlogService.GetBlogPagingAsync(params).then((x: BasePagingType<any>) => {
            setData(x);
            let totalPageFromApi = Utils.GetTotalPages(x?.total, x?.pageSize);
            if (totalPageFromApi !== totalPages)
                setTotalPages(totalPageFromApi);
        });
    }
    useEffect(() => {
        getPaging(page);
    }, [])

    let imgRender = (images: Array<string>, altImg: string) => {
        return (
            <>
                {
                    images?.map((el, index) => {
                        if (index === 0)
                            return <img src={el} alt={altImg} />
                    })
                }
            </>
        )
    }
    let ListRender = () => {
        return (<>
            {
                data?.datas?.map((x: any) => {
                    return <>
                        <div className="blog-item ">
                            <div className="itemBlogImg col-md-4 col-sm-12">
                                <div className="article-image banners">
                                    <div>
                                        <a className="popup-gallery" href={`/blog/detail/${x.id}`}>
                                            {imgRender(x.images, x.name)}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="itemBlogContent col-md-8 col-sm-12">
                                <div className="article-title">
                                    <h4>
                                        <a href={`/blog/detail/${x.id}`}>{x.name}</a>
                                    </h4>

                                </div>
                                {/* <div className="article-sub-title">
                                    <span className="article-date">
                                        <i className="fa fa-calendar"></i>{x?.createdAt}
                                    </span>
                                </div> */}
                                <div className="article-description">
                                    {x.description}
                                </div>
                                <div className="blog-meta">
                                    <span className="comment_count">
                                        <a href={`/blog/${x?.categoryId}`}>{x?.category_name}</a>
                                    </span>
                                    <span className="article-date">
                                        <i className="fa fa-calendar"></i>{x?.createdAt}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                })
            }
        </>)
    }
    return (
        <>
            <ul className="breadcrumb">
                <li><a href="/"><i className="fa fa-home"></i></a></li>
                <li><a href="#">Tin tức</a></li>
            </ul>

            <div className="row">
                <aside className="col-sm-4 col-md-3" id="column-left">
                    <BlogCategorySideBar></BlogCategorySideBar>
                    <ProductLastestSideBar></ProductLastestSideBar>
                </aside>

                <div id="content" className="col-md-9 col-sm-8">
                    <div className="blog-header">
                        <h3>Tin tức</h3>
                        {/*<p>Ac tincidunt Suspendisse malesuada velit in Nullam elit magnis netus Vestibulum.</p> */}
                    </div>
                    <div className="blog-listitem">
                        <ListRender></ListRender>
                    </div>
                    <div>
                        <Pagination key={`blog-paging-bottom`}
                            pageSize={data?.pageSize}
                            currentPage={page}
                            siblingCount={1}
                            totalCount={data?.total}
                            onPageChange={pagingClick}
                            className="col-md-12 text-right"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}