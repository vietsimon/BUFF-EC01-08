import { useSearchParams } from "react-router-dom";
import { Modal as ModalSimple } from "../../../Components/Modal/ModalSimple";

export const ProductQuickViewModal: React.FC<{ modal: typeof ModalSimple }> = ({ modal }) => {
    const [params, setParams] = useSearchParams();

    return (
        <modal.Frame
            open={!!params.get("modal")}
            onClose={() => {
                params.delete("modal");
                setParams(params);
            }}
        >
            {/* <modal.Head>Chi</modal.Head> */}
            <modal.Body>

                aaaaa
                {/* <div className="flex flex-col space-y-2">
                    <input
                        className="text-gray-800 outline-none border-2 border-white focus:border-blue-300 p-1"
                        placeholder="Username"
                    />
                    <input
                        className="text-gray-800 outline-none border-2 border-white focus:border-blue-300 p-1"
                        placeholder="Password"
                        type="password"
                    />
                    <button className="text-gray-100 border-2 border-blue-700 bg-blue-600 rounded shadow-xl p-2 outline-none focus:border-blue-300">
                        Sign in
                    </button>
                </div> */}
            </modal.Body>
        </modal.Frame>
    );
};