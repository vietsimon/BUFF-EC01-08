import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ProductCategoryService from "../../../services/ProductCategoryService";

export function ProductCategorySideBar() {
    const { idCategory } = useParams();
    const [dataParent, setDataParent] = useState<Array<any>>([]);

    let toggleClick = (id: number) => {
        let actived = dataParent.find(x => x.selected === true);
        if (actived)
            actived.selected = false;
        let selected = dataParent.find(x => x.id === id);
        selected.selected = !(selected?.selected ?? false);
        setDataParent([...dataParent]);
    }

    useEffect(() => {
        ProductCategoryService.GetAllAsync({}).then((response: Array<any>) => {
            //--get active default by categoryId
            let selected = response.find(x => x.id + '' === idCategory);
            if (selected) {
                selected.selected = true;
                if (selected.parentId !== 0) {
                    let parent = response.find(x => x.id === selected.parentId);
                    if (parent) {
                        parent.selected = true;
                    }
                }
            }
            //convert array to muitil level 
            let level1 = response.filter(x => x.parentId === 0);
            level1.forEach(item => {
                item.child = response.filter(x => x.parentId === item.id);
            });
            setDataParent(level1);
        });
    }, []);

    return (
        <div className="module menu-category titleLine">
            <h3 className="modtitle">Danh mục</h3>
            <div className="modcontent">
                <div className="box-category">
                    <ul id="cat_accordion" className="list-group">
                        {
                            dataParent?.map((x) => (
                                <li className={x?.child?.length !== 0 ? "hadchild" : ""}>
                                    <a href={`/product/${x.id}`} className={`cutom-parent ${x?.selected ? "active" : ""}`}>{x.name} {x.id} - {idCategory}</a>
                                    {x?.child?.length !== 0 ? <span className={x?.selected ? "button-view fa fa-minus-square-o" : "button-view fa fa-plus-square-o"} onClick={() => toggleClick(x?.id)}></span> : <span className="dcjq-icon"></span>}
                                    {x?.child?.length !== 0 && <ul style={{ "display": x?.selected ? "block" : "none" }} >
                                        {
                                            x?.child?.map((child1: any) => (<li><a className={child1?.selected ? "active" : ""} href={`/product/${child1.id}`} >{child1.name}</a></li>))
                                        }
                                    </ul>}
                                </li>))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}