import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../Components/Cart/useCart";
import CustomerService from "../../services/CustomerService";
import Ultils from "../../ultils/common";

export function Login() {
    const [data, setData] = useState<any>({ username: '', password: '' });
    const navigtation = useNavigate();

    const login = () => {
        CustomerService.LoginAsync(data?.username, data?.password).then(x => {
            let dateTime = new Date()
            if (x?.token) {
                Ultils.setToken(x);
                navigtation("/")
            }
            else {
                Ultils.clearToken();
            }
        })
    }
    
    return (
        <>
            <ul className="breadcrumb">
                <li><a href="/"><i className="fa fa-home"></i></a></li>
                <li><a href="/login">Đăng nhập</a></li>
            </ul>

            <div className="row">
                <div id="content" className="col-sm-12">
                    <div className="page-login">

                        <div className="account-border">
                            <div className="row">
                                <div className="col-sm-6 new-customer">
                                    <div className="well">
                                        <h2><i className="fa fa-file-o" aria-hidden="true"></i> Khách hàng mới</h2>
                                        <p>Hãy tạo tài khoản để được mua hàng mọi lúc mọi nơi</p>
                                    </div>
                                    <div className="bottom-form">
                                        <a href="#" className="btn btn-default pull-right">Đăng ký</a>
                                    </div>
                                </div>

                                <form action="#" method="post" >
                                    <div className="col-sm-6 customer-login">
                                        <div className="well">
                                            <h2><i className="fa fa-file-text-o" aria-hidden="true"></i> Tài khoản</h2>
                                            <p><strong>Chào mừng sự trở lại của bạn</strong></p>
                                            <div className="form-group">
                                                <label className="control-label " >Tên đăng nhập</label>
                                                <input type="text" name="email" className="form-control" placeholder="Tên đăng nhập" value={data?.username}
                                                    onChange={(event: any) => {

                                                        setData({
                                                            username: event.target.value,
                                                            password: data?.password
                                                        })
                                                    }} />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label " >Mật khẩu</label>
                                                <input name="password" className="form-control" placeholder="Mật khẩu"
                                                    type="password" value={data?.password}
                                                    onChange={(event: any) => {

                                                        setData({
                                                            username: data?.username,
                                                            password: event.target.value
                                                        })
                                                    }} />
                                            </div>
                                        </div>
                                        <div className="bottom-form">
                                            <a href="#" className="forgot">Quên mật khẩu</a>
                                            <button type="button" value="Login" className="btn btn-default pull-right" onClick={login}
                                            >Đăng nhập</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};