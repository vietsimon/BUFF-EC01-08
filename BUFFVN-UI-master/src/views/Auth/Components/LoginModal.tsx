import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../../Components/Cart/useCart";
import { Modal as ModalSimple } from "../../../Components/Modal/ModalSimple";
import CustomerService from "../../../services/CustomerService";
import Ultils from "../../../ultils/common";

export const LoginModal: React.FC<{ modal: typeof ModalSimple }> = ({ modal }) => {
    const [params, setParams] = useSearchParams();
    const [data, setData] = useState<any>({ username: '', password: '' });
    const { metadata, setCartMetadata } = useCart();
    const navigtation = useNavigate();
    
    const login = () => {
        CustomerService.LoginAsync(data?.username, data?.password).then(x => {
            let metaCart = metadata as any;
            let dateTime = new Date()
            if (x?.token) {
                Ultils.setToken(x?.token);
                metaCart["updatedAt"] = dateTime;
                onClose();
            }
            else {
                Ultils.clearToken();
                metaCart["updatedAt"] = dateTime;
            }
            setCartMetadata(metaCart);
        })
    }
    const onClose = () => {
        // params.delete("modal");
        // setParams(params);
        navigtation("/checkout")
    }
    return (
        <modal.Frame
            open={!!params.get("modal")}
            onClose={onClose}
        >
            <modal.Head>Đăng nhập</modal.Head>
            <modal.Body>
                <div className="flex flex-col space-y-2">
                    <input
                        className="text-gray-800 outline-none border-2 border-white focus:border-blue-300 p-1"
                        placeholder="Tên đăng nhập" value={data?.username}
                        onChange={(event: any) => {

                            setData({
                                username: event.target.value,
                                password: data?.password
                            })
                        }}
                    />
                    <input
                        className="text-gray-800 outline-none border-2 border-white focus:border-blue-300 p-1"
                        placeholder="Mật khẩu"
                        type="password" value={data?.password}
                        onChange={(event: any) => {

                            setData({
                                username: data?.username,
                                password: event.target.value
                            })
                        }}
                    />
                    <button className="text-gray-100 border-2 border-blue-700 bg-blue-600 rounded shadow-xl p-2 outline-none focus:border-blue-300"
                        onClick={login}
                    >
                        Đăng nhập
                    </button>
                </div>
            </modal.Body>
        </modal.Frame>
    );
};