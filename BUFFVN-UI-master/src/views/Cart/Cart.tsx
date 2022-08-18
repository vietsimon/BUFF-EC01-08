import { useEffect, useState } from "react";
import Utils from "../../ultils/common";
import { useCart } from "../../Components/Cart/useCart";
import { CartShipping } from "./Components/CartShipping";

export function Cart() {
    const { isEmpty, cartTotal, totalUniqueItems, items, updateItemQuantity, removeItem, emptyCart, metadata } = useCart();

    useEffect(() => {
    }, [])

    if (isEmpty) return <p>Bạn chưa chọn sản phẩm <a href="/product">mua hàng</a></p>;

    let imgRender = (images: Array<string>, altImg: string) => {
        return (
            <>
                {
                    images?.map((el, index) => {
                        if (index === 0)
                            return <img src={el} width="70px" alt={altImg} className="img-thumbnail" />
                    })
                }
            </>
        )
    }

    let ListRender = () => {
        return (<>
            {
                items?.map((x: any) => {
                    return <>
                        <tr key={`product-cart-item-${x.id}`} >
                            <td className="text-center">
                                <a href={`/product/detail/${x.id}`}>
                                    {imgRender(x.images, x.name)}
                                </a>
                            </td>
                            <td className="text-left"><a href={`/product/detail/${x.id}`}>{x?.name}</a><br />
                            </td>
                            <td className="text-left">{x?.category_name}</td>
                            <td className="text-left" width="200px">
                                <div className="box-quantity">
                                    <div className="option quantity">
                                        <div className="input-group quantity-control"  >
                                            <input className="form-control" type="text" name="quantity"
                                                value={x?.quantity} />
                                            <input type="hidden" name="product_id" value={x?.id} />
                                            <span className="input-group-addon product_quantity_down" onClick={() => updateItemQuantity(x.id, x.quantity - 1)}>−</span>
                                            <span className="input-group-addon product_quantity_up" onClick={() => updateItemQuantity(x.id, x.quantity + 1)}>+</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="input-group-btn">
                                    <button onClick={() => removeItem(x.id)} type="button" title="Remove" className="btn btn-danger" ><i className="fa fa-times-circle"></i></button>
                                </span>
                            </td>
                            <td className="text-right">{Utils.PriceDisplay(x.price)}</td>
                            <td className="text-right">{Utils.PriceDisplay(x.price * x.quantity)}</td>
                        </tr>

                    </>
                })
            }
        </>)
    }

    return (
        <>
            {/* <ul className="breadcrumb">
                <li><a href="/"><i className="fa fa-home"></i></a></li>
                <li><a href="#">Shopping Cart</a></li>
            </ul> */}

            <div className="row">
                <div id="content" className="col-sm-12">
                    <h2 className="title">Giỏ hàng</h2>
                    <div className="table-responsive form-group">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <td className="text-center">Hình ảnh</td>
                                    <td className="text-left">Sản phẩm</td>
                                    <td className="text-left">Danh mục</td>
                                    <td className="text-left">Số lượng</td>
                                    <td className="text-right">Giá</td>
                                    <td className="text-right">Đơn Giá</td>
                                </tr>
                            </thead>
                            <tbody>
                                <ListRender></ListRender>
                            </tbody>
                        </table>
                    </div>

                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-8">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td className="text-right">
                                            <strong>Tạm Tính:</strong>
                                        </td>
                                        <td className="text-right">{Utils.PriceDisplay(cartTotal)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="buttons">
                        <div className="pull-left"><a href="/product" className="btn btn-primary">Tiếp tục mua sắm</a></div>
                        <div className="pull-right"><a href="/checkout" className="btn btn-primary">Thanh toán</a></div>
                    </div>
                </div>
            </div>
        </>
    )
}


