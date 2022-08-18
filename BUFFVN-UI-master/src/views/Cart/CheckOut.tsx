import { useEffect, useState } from "react";
import Utils from "../../ultils/common";
import { useCart } from "../../Components/Cart/useCart";
import { CartShipping } from "./Components/CartShipping";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginModal } from "../Auth/Components/LoginModal";
import { Modal as ModalSimple } from "../../Components/Modal/ModalSimple";
import { Modal as ModalBasic } from "../../Components/Modal/ModalBasic";
import Ultils from "../../ultils/common";
import { CartAddress } from "./Components/CartAddress";
import { CartPaymentInformation } from "./Components/CartPaymentInformation";
import { CartItemType, CartMetaDataType } from "../../type/CartMetaDataType";
import { OrderCreateType, OrderItemCreateType, OrderItemType } from "../../type/OrderType";
import { ProductDetailType } from "../../type/ProductType";
import OrderService from "../../services/OrderService";
import PaymentService from "../../services/PaymentService";
import { DefaultConst } from "../../ultils/DefaultConst";
export function CheckOut() {
    const [params, setParams] = useSearchParams();
    const { isEmpty, cartTotal, totalUniqueItems, items, updateItemQuantity, removeItem, emptyCart, metadata, setCartMetadata } = useCart();
    const navigtation = useNavigate();

    const getCartMetaData = () => {
        let metaCart = metadata as CartMetaDataType;
        return metaCart;
    }
    const setNote = (event: any) => {
        let meta = getCartMetaData();
        meta.note = event.target.value;
        setCartMetadata(meta);
    }
    useEffect(() => {
        if (isEmpty) navigtation("/product");
    }, [])

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
                                {/* <div className="input-group btn-block quantity">
                                    <input type="number" name="quantity" value={x?.quantity} className="form-control" />
                                    <span className="input-group-btn">
                                        <button type="submit" data-toggle="tooltip" title="Update" className="btn btn-primary"><i className="fa fa-clone"></i></button>
                                        <button type="button" data-toggle="tooltip" title="Remove" className="btn btn-danger" ><i className="fa fa-times-circle"></i></button>
                                    </span>
                                </div> */}
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

    const onSubmit = () => {
        let meta = getCartMetaData();
        let data = {} as OrderCreateType;
        data.note = meta?.note;
        data.paymentMethod = meta.paymentMethod;
        data.shippingAddress = meta.shippingAddress;
        data.shippingDistrictId = meta.shippingDistrictId;
        data.shippingFee = meta.shippingFee;
        data.shippingMethod = meta.shippingMethod;
        data.shippingProvinceId = meta.shippingProvinceId;
        data.shippingWardId = meta.shippingWardId;

        data.totalPrice = cartTotal + (data?.shippingFee ?? 0);
        let products = items?.map((x: any) => x as CartItemType);
        data.items = products?.map(x => ({
            productId: x.id,
            quantity: x.quantity,
            currentPrice: x.price,
            sizeId: x.sizeId
        } as OrderItemCreateType));

        OrderService.CreateOrderAsync(data).then(x => {
            emptyCart();
            let orderid = x?.id;
            PaymentService.CreatePaymentAsync(
                { orderId: orderid, 
                returnUrl: `${DefaultConst.Domain}/payment/vnpay/return/${orderid}` }).then(y => {
                window.location = y.redirectUrl;
            });
        })
        // OrderService.GetOrderDetailAsync(orderid).then(y => {
        //     console.log(y);
        // })
    }

    return (
        <>
            {/* <ul className="breadcrumb">
                <li><a href="/"><i className="fa fa-home"></i></a></li>
                <li><a href="#">Shopping Cart</a></li>
            </ul> */}

            <div className="row">
                <div id="content" className="col-sm-12">
                    <h2 className="title">Thanh toán</h2>
                    <div className="so-onepagecheckout ">
                        <div className="col-left col-sm-3">
                            <CartAddress></CartAddress>
                            <CartPaymentInformation></CartPaymentInformation>
                        </div>
                        <div className="col-right col-sm-9">
                            <div className="col-sm-12">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><i className="fa fa-shopping-cart"></i> Sản phẩm</h4>
                                    </div>
                                    <div className="panel-body">
                                        <div className="table-responsive">
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
                                                        <tr>
                                                            <td className="text-right">
                                                                <strong>Vận chuyển GHN:</strong>
                                                            </td>
                                                            <td className="text-right">{Utils.PriceDisplay(metadata?.shippingFee ?? 0)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-right">
                                                                <strong>Tổng tiền: </strong>
                                                            </td>
                                                            <td className="text-right">{Utils.PriceDisplay(cartTotal + (metadata?.shippingFee ?? 0))}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><i className="fa fa-pencil"></i> Ghi chú (nếu có)</h4>
                                    </div>
                                    <div className="panel-body">
                                        <textarea rows={4} className="form-control" name="note" value={metadata?.note} onChange={setNote}></textarea>
                                        <br />
                                        {/* 
                                        <label className="control-label" >
                                            <input type="checkbox" value="1" required className="validate required" id="confirm_agree" name="confirm agree" />
                                            <span>Tôi đồng ý <a className="agree" href="#"><b>Chính sách &amp; Điều khoản</b></a></span> </label> */}
                                        <div className="buttons">
                                            <div className="pull-right">
                                                {
                                                    (!Ultils.isAuth()) ?
                                                        <div className="pull-center"><button className="btn btn-primary" onClick={() => setParams({ ...params, modal: "true" })}>Đăng nhập để xác nhận thanh toán</button></div> :
                                                        <button className="btn btn-primary" onClick={onSubmit}>Đồng ý</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LoginModal modal={ModalBasic}></LoginModal>
        </>
    )
}

