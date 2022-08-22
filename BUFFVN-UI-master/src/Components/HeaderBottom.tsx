import { useState } from "react";

export default function HeaderBottomComponent() {

    const [categoryIsShow, setCategoryIsShow] = useState<boolean>(false);

    return (
        <div className="header-bottom">
            <div className="container">
                <div className="header-bottom__content">
                    <div className="row">
                        <div className="sidebar-menu col-md-3 col-sm-6 col-xs-12  ">
                            <div className="responsive so-megamenu ">
                                <div className="so-vertical-menu no-gutter compact-hidden">
                                    <nav className="navbar-default">
                                        <div className={`container-megamenu vertical ${categoryIsShow ? "open" : ""}`}>
                                            <div id="menuHeading" onClick={() => setCategoryIsShow(!categoryIsShow)}>
                                                <div className="megamenuToogle-wrapper" >
                                                    <div className="megamenuToogle-pattern">
                                                        <div className="container">
                                                            <div>
                                                                <span></span>
                                                                <span></span>
                                                                <span></span>
                                                            </div>
                                                            Tất cả danh mục
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="navbar-header">
                                                <button type="button" id="show-verticalmenu" data-toggle="collapse" className="navbar-toggle fa fa-list-alt">
                                                </button>
                                                Tất cả danh mục
                                            </div>
                                            <div className="vertical-wrapper" style={{ display: "none" }}>
                                                <span id="remove-verticalmenu" className="fa fa-times"></span>
                                                <div className="megamenu-pattern">
                                                    <div className="container">
                                                        <ul className="megamenu">
                                                            <li className="item-vertical">
                                                                <p className="close-menu"></p>
                                                                <a href="#" className="clearfix">
                                                                    <i className="fa fa-arrow-right" />
                                                                    <span>Electronic</span>

                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>

                        </div>

                        <div className="megamenu-hori col-md-9 col-sm-6 col-xs-12 ">
                            <div className="responsive so-megamenu ">
                                <nav className="navbar-default">
                                    <div className=" container-megamenu  horizontal">
                                        <div className="navbar-header">
                                            <button type="button" id="show-megamenu" data-toggle="collapse" className="navbar-toggle">
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                            </button>
                                            Navigation
                                        </div>

                                        <div className="megamenu-wrapper">
                                            <span id="remove-megamenu" className="fa fa-times"></span>
                                            <div className="megamenu-pattern">
                                                <div className="container">
                                                    <ul className="megamenu " data-transition="slide" data-animationtime={250}>
                                                        <li className="home hover">
                                                            <a href="index.html">Trang chủ <b className="caret"></b></a>
                                                            <div className="sub-menu" style={{ width: "100%" }} >
                                                                <div className="content" >
                                                                    <div className="row">
                                                                        <div className="col-md-15">
                                                                            <a href="index.html" className="image-link">
                                                                                <span className="thumbnail">
                                                                                    <img className="img-responsive img-border" src="image/demo/feature/home-1.jpg" alt="" />
                                                                                    <span className="btn btn-default">Read More</span>
                                                                                </span>
                                                                                <h3 className="figcaption">Home page - (Default)</h3>
                                                                            </a>

                                                                        </div>
                                                                        <div className="col-md-15">
                                                                            <a href="home2.html" className="image-link">
                                                                                <span className="thumbnail">
                                                                                    <img className="img-responsive img-border" src="image/demo/feature/home-2.jpg" alt="" />
                                                                                    <span className="btn btn-default">Read More</span>
                                                                                </span>
                                                                                <h3 className="figcaption">Home page - Layout 2</h3>
                                                                            </a>

                                                                        </div>
                                                                        <div className="col-md-15">
                                                                            <a href="home3.html" className="image-link">
                                                                                <span className="thumbnail">
                                                                                    <img className="img-responsive img-border" src="image/demo/feature/home-3.jpg" alt="" />
                                                                                    <span className="btn btn-default">Read More</span>
                                                                                </span>
                                                                                <h3 className="figcaption">Home page - Layout 3</h3>
                                                                            </a>

                                                                        </div>
                                                                        <div className="col-md-15">
                                                                            <a href="home4.html" className="image-link">
                                                                                <span className="thumbnail">
                                                                                    <img className="img-responsive img-border" src="image/demo/feature/home-4.jpg" alt="" />
                                                                                    <span className="btn btn-default">Read More</span>
                                                                                </span>
                                                                                <h3 className="figcaption">Home page - Layout 4</h3>
                                                                            </a>

                                                                        </div>
                                                                        <div className="col-md-15">
                                                                            <a href="home5.html" className="image-link">
                                                                                <span className="thumbnail">
                                                                                    <img className="img-responsive img-border" src="image/demo/feature/home-5.jpg" alt="" />
                                                                                    <span className="btn btn-default">Read More</span>
                                                                                </span>
                                                                                <h3 className="figcaption">Home page - Layout 5</h3>
                                                                            </a>

                                                                        </div>
                                                                        <div className="col-md-15">
                                                                            <a href="home6.html" className="image-link">
                                                                                <span className="thumbnail">
                                                                                    <img className="img-responsive img-border" src="image/demo/feature/home-6.jpg" alt="" />
                                                                                    <span className="btn btn-default">Read More</span>
                                                                                </span>
                                                                                <h3 className="figcaption">Home page - Layout 6</h3>
                                                                            </a>

                                                                        </div>
                                                                        <div className="col-md-15">
                                                                            <a href="home7.html" className="image-link">
                                                                                <span className="thumbnail">
                                                                                    <img className="img-responsive img-border" src="image/demo/feature/home-7.jpg" alt="" />
                                                                                    <span className="btn btn-default">Read More</span>
                                                                                </span>
                                                                                <h3 className="figcaption">Home page - Layout 7</h3>
                                                                            </a>

                                                                        </div>
                                                                        <div className="col-md-15">
                                                                            <a href="home8.html" className="image-link">
                                                                                <span className="thumbnail">
                                                                                    <img className="img-responsive img-border" src="image/demo/feature/home-8.jpg" alt="" />
                                                                                    <span className="btn btn-default">Read More</span>
                                                                                </span>
                                                                                <h3 className="figcaption">Home page - Layout 8</h3>
                                                                            </a>

                                                                        </div>
                                                                        <div className="col-md-15">
                                                                            <a href="html_width_RTL/index.html" className="image-link">
                                                                                <span className="thumbnail">
                                                                                    <img className="img-responsive img-border" src="image/demo/feature/home-rtl.jpg" alt="" />
                                                                                    <span className="btn btn-default">Read More</span>
                                                                                </span>
                                                                                <h3 className="figcaption">Home page - Layout RTL</h3>
                                                                            </a>

                                                                        </div>
                                                                        <div className="col-md-15">
                                                                            <a href="#" className="image-link">
                                                                                <span className="thumbnail">
                                                                                    <img className="img-responsive img-border" src="image/demo/feature/comming-soon.png" alt="" />
                                                                                </span>
                                                                                <h3 className="figcaption">Comming soon</h3>
                                                                            </a>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>

                                                        <li className="with-sub-menu hover">
                                                            <p className="close-menu"></p>
                                                            <a href="/about" className="clearfix">
                                                                <strong>Giới thiệu</strong>
                                                                <b className="caret"></b>
                                                            </a>
                                                            <div className="sub-menu" style={{ width: 160 }}>
                                                                <div className="content" >
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <ul className="row-list">
                                                                                <li><a className="subcategory_item" href="/about">Về chúng tôi</a></li>
                                                                                <li><a className="subcategory_item" href="/policy">Chính sách bảo mật</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <a href="/product" className="clearfix">
                                                                <strong>Sản phẩm</strong>
                                                                <span className="label"> Hot</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/blog" className="clearfix">
                                                                <strong>Tin tức</strong>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/contact" className="clearfix">
                                                                <strong>Liên hệ</strong>
                                                            </a>
                                                        </li>

                                                        <li className="pull-right"><a href="#" title="Special Offer!"><strong>Special Offer!</strong></a></li>
                                                    </ul>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>)
}