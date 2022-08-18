import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Payment() {

    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState(0)
    const [content, setContent] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("paypal")
    const [priceTitle, setPriceTitle] = useState("paypal")
    let navigate = useNavigate();

    const priceTitleConst: any = {
        vnpay: "Nhập số tiền (tối thiểu 10,000đ với VNPAY) VNĐ",
        paypal: "Nhập số tiền (tối thiểu 0.1 USD) USD"
    }

    const onSubmit = () => {
       let _price=price;
       _price=1;
        if (_price <= 0) {
            alert("Price invalid")
            return;
        }

        if (paymentMethod === "paypal") {
            navigate("/payment/paypal", {
                state: {
                    productName,
                    price: _price,
                    content
                }
            });
            return;
        }
        if (paymentMethod === "vnpay") {
            navigate("/payment/vnpay",
                {
                    state: {
                        productName,
                        price: _price,
                        content
                    }
                })
            return;
        }
    }

    return (
        <div className="container">
            <h3>Thông tin mua hàng</h3>
            <form
                onSubmit={onSubmit}
            >
                <div className="mb-3">
                    <label className="form-label">Tên sản phẩm</label>
                    <select className="form-select" aria-label="size 3 select example" onChange={value => setProductName(value.target.value)}>
                        <option selected>Open this select menu</option>
                    </select>
                    <input type="text"
                        className="form-control"
                        value={productName}
                        required
                        onChange={value => setProductName(value.target.value)} />
                </div>
                <div className="mb-3" >
                    <label className="form-label" >{priceTitleConst[priceTitle]} </label>
                    <input
                        type="number"
                        className="form-control"
                        required
                        value={price}
                        onChange={value => setPrice(parseFloat(value.target?.value ?? "0"))} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={content}
                        onChange={value => setContent(value.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phương thức thanh toán</label>
                    <select className="form-select"
                        value={paymentMethod}
                        onChange={value => {
                            setPaymentMethod(value.target.value)
                            setPriceTitle(value.target.value)
                        }}>
                        <option value="paypal">Paypal</option>
                        <option value="vnpay">VnPay</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">THANH TOÁN</button>
            </form>
        </div>

    )
}