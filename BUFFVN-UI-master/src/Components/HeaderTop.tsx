import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ultils from "../ultils/common";

export default function HeaderTopComponent() {
    const [accountIsShow, setAccountIsShow] = useState<boolean>(false);
    const navigtation = useNavigate();
    // useEffect(()=>{
    //     document.body
    // })

    return (
        <div className="header-top compact-hidden">
            <div className="container">
                <div className="row">
                    <div className="header-top-left col-md-7 col-sm-6">
                        <div className="col-md-12 col-sm-12 navbar-contact">
                            <ul className="top-link list-inline">
                                <li><a href="tel:0987654321"  ><i className="fa fa-phone icon"></i> Hotline :<span> 0987654321</span></a></li>
                                <li ><a href="mailto:aaa@gmail.com" ><i className="fa fa-envelope icon"></i> Email :<span> aaa@gmail.com</span></a></li></ul>
                        </div>
                    </div>
                    <div className="header-top-right collapsed-block text-right col-md-5 col-sm-6 col-xs-12">
                        <h5 className="tabBlockTitle visible-xs">More<a className="expander " href="#TabBlock-1"><i className="fa fa-angle-down"></i></a></h5>
                        <div className="tabBlock" id="TabBlock-1">
                            <ul className="top-link list-inline" onMouseEnter={() => setAccountIsShow(true)} onMouseLeave={() => setAccountIsShow(false)}>
                                <li className="account btn-group" id="my_account" >
                                    <a href="javascript:void(0)" title="My Account" className="btn btn-xs dropdown-toggle" data-toggle="dropdown">
                                        {Ultils.isAuth() === false ? <>Tài khoản</> : <>{Ultils.getLoginName()}</>}
                                        <span className="fa fa-angle-down"></span></a>
                                    <ul className="dropdown-menu " style={{ display: accountIsShow ? "block" : "none" }}>
                                        {Ultils.isAuth() === false ?
                                            <>
                                                <li><a href="/register"><i className="fa fa-user"></i> Đăng ký</a></li>
                                                <li><a href="/login"><i className="fa fa-pencil-square-o"></i> Đăng nhập</a></li>
                                            </> :
                                            <>
                                                {/* <li><a href="/account/profile"><i className="fa fa-pencil-square-o"></i> Thông tin cá nhân</a></li>
                                                <li><a href="/account/change-password"><i className="fa fa-user"></i> Đổi mật khẩu</a></li> */}
                                                <li><a onClick={() => {
                                                    Ultils.isAuthOut(); navigtation("/");
                                                }}><i className="fa fa-user"></i> Thoát</a></li>

                                            </>
                                        }

                                    </ul>
                                </li>
                                {/* <li className="wishlist"><a href="cart.html" className="top-link-wishlist" title="Shoping cart"><span className="hidden-xs">Shopping Cart</span></a></li> */}
                                {/* <li className="checkout"><a href="checkout.html" className="top-link-checkout" title="Checkout"><span className="hidden-xs">Checkout</span></a></li> */}

                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}