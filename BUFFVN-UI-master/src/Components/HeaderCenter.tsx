import { render } from "@testing-library/react";
import '../assets/image/logos/logo.png'
export default function HeaderCenterComponent() {
    return (
        <div className="header-center">
            <div className="container">
                <div className="row">
                    <div className="navbar-logo col-md-3 col-sm-12 col-xs-12">
                        <a href="index.html" className="logo"><img src="../assets/image/logos/logo.png" title="Your Store" alt="Your Store" /></a>
                    </div>

                    <div id="sosearchpro" className="col-md-5 col-sm-7 search-pro">
                        <form method="GET" action="index.html">
                            <div id="search0" className="search input-group">
                                <div className="select_category filter_type icon-select">
                                    <select className="no-border" name="category_id">
                                        <option value="0">All Categories</option>
                                        <option value="78">Apparel</option>
                                        <option value="77">Cables &amp; Connectors</option>
                                        <option value="82">Cameras &amp; Photo</option>
                                        <option value="80">Flashlights &amp; Lamps</option>
                                        <option value="81">Mobile Accessories</option>
                                        <option value="79">Video Games</option>
                                        <option value="20">Jewelry &amp; Watches</option>
                                        <option value="76">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Earings</option>
                                        <option value="26">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wedding Rings</option>
                                        <option value="27">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Men Watches</option>
                                    </select>
                                </div>

                                <input className="autosearch-input form-control" type="text" value="" size={50} placeholder="Enter keywords to search..." name="search" />
                                <span className="input-group-btn">
                                    <button type="submit" className="button-search btn btn-primary" name="submit_search"><i className="fa fa-search"></i></button>
                                </span>
                            </div>
                            <input type="hidden" name="route" value="product/search" />
                        </form>
                    </div>

                    <div className="phone-contact col-md-2  hidden-md hidden-sm hidden-xs">
                        <div className="inner-info">
                            <strong>Call us Now:</strong><br />
                            <span>Toll free:  0123-456-789</span>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 shopping_cart pull-right">
                        <div id="cart" className="btn-group btn-shopping-cart">
                            <a data-loading-text="Loading..." className="top_cart dropdown-toggle" data-toggle="dropdown">
                                <div className="shopcart">
                                    <a href="/cart">Gio Hang</a>
                                    <span className="handle pull-left"></span>

                                    {/*<span className="title">Gio Hang</span> <p className="text-shopping-cart cart-total-full">2 item(s) - $1,262.00 </p> */}
                                </div>
                            </a>

                            <ul className="tab-content content dropdown-menu pull-right shoppingcart-box" role="menu">
                                <li>
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td className="text-center" style={{ "width": 70 }}>
                                                    <a href="product.html"> <img src="image/demo/shop/product/resize/2.jpg" style={{ width: 70 }} alt="Filet Mign" title="Filet Mign" className="preview" /> </a>
                                                </td>
                                                <td className="text-left"> <a className="cart_product_name" href="product.html">Filet Mign</a> </td>
                                                <td className="text-center"> x1 </td>
                                                <td className="text-center"> $1,202.00 </td>
                                                <td className="text-right">
                                                    <a href="product.html" className="fa fa-edit"></a>
                                                </td>
                                                <td className="text-right">
                                                    <a className="fa fa-times fa-delete"></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center" style={{ width: 70 }}>
                                                    <a href="product.html"> <img src="image/demo/shop/product/resize/3.jpg" style={{ width: 70 }} alt="Canon EOS 5D" title="Canon EOS 5D" className="preview" /> </a>
                                                </td>
                                                <td className="text-left"> <a className="cart_product_name" href="product.html">Canon EOS 5D</a> </td>
                                                <td className="text-center"> x1 </td>
                                                <td className="text-center"> $60.00 </td>
                                                <td className="text-right">
                                                    <a href="product.html" className="fa fa-edit"></a>
                                                </td>
                                                <td className="text-right">
                                                    <a className="fa fa-times fa-delete"></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                                <li>
                                    <div>
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td className="text-left"><strong>Sub-Total</strong>
                                                    </td>
                                                    <td className="text-right">$1,060.00</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left"><strong>Eco Tax (-2.00)</strong>
                                                    </td>
                                                    <td className="text-right">$2.00</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left"><strong>VAT (20%)</strong>
                                                    </td>
                                                    <td className="text-right">$200.00</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left"><strong>Total</strong>
                                                    </td>
                                                    <td className="text-right">$1,262.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="text-right"> <a className="btn view-cart" href="cart.html"><i className="fa fa-shopping-cart"></i>View Cart</a>&nbsp;&nbsp;&nbsp; <a className="btn btn-mega checkout-cart" href="checkout.html"><i className="fa fa-share"></i>Checkout</a> </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}