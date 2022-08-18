import { useSearchParams } from "react-router-dom";
import { Modal as ModalSimple } from "./ModalSimple";

export const ZoomImageModal: React.FC<{ modal: typeof ModalSimple }> = ({ modal }) => {
    const [params, setParams] = useSearchParams();
    return (
        <modal.Frame
            open={!!params.get("modal")}
            onClose={() => {
                params.delete("modal");
                params.delete("path");
                setParams(params);
            }}
        >
            {/* <modal.Head>Chi</modal.Head> */}
            <modal.Body>
                {params.get("path")&&<img className="img-responsive" src={`${params.get("path")}`}/>}
            </modal.Body>
        </modal.Frame>
    );
};