
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogService from "../../services/BlogService";
import { ProductLastestSideBar } from "../Product/Components/ProductLastestSideBar";
import { BlogCategorySideBar } from "./Components/BlogCategorySideBar";

export function BlogDetail() {
    const { id } = useParams();
    const [data, setData] = useState<any>();

    useEffect(() => {
        BlogService.GetBlogDetailAsync(id).then((x) => {
            setData(x);
        });
    }, [])

    return (
        <>
            <ul className="breadcrumb">
                <li><a href="#"><i className="fa fa-home"></i></a></li>
                <li><a href="/blog">Tin tức</a></li>
                <li><a href={`/blog/${data?.category_Id}`}>{data?.category_name}</a></li>
            </ul>

            <div className="row">
                <aside className="col-sm-4 col-md-3" id="column-left">
                    <BlogCategorySideBar></BlogCategorySideBar>
                    <ProductLastestSideBar></ProductLastestSideBar>
                </aside>

                <div id="content" className="col-md-9 col-sm-8">
                    <div className="article-info">
                        <div className="blog-header">
                            <h3>{data?.name}</h3>
                        </div>
                        <div className="article-sub-title">
                            {data?.category_name && <span className="article-category"><span>Danh mục:</span> <a href={`/product/${data?.categoryId}`}>{data?.category_name}</a></span>}
                            <span className="article-date">Created Date: Tue, Feb 16, 2016</span>
                        </div>
                        <div className="form-group">
                            <a href="image/demo/blog/blog4.jpg" className="image-popup"><img src="image/demo/blog/blog4.jpg" alt="Kire tuma demonstraverunt lector" /></a>
                        </div>

                        <div className="article-description">
                            {data?.detail}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}