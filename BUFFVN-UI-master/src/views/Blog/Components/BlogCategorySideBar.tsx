import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCategoryService from "../../../services/BlogCategoryService";

export function BlogCategorySideBar() {
    const { idCategory } = useParams();
    const [data, setData] = useState<Array<any>>([]);

    let toggleClick = (id: number) => {
        let actived = data.find(x => x.selected === true);
        if (actived)
            actived.selected = false;
        let selected = data.find(x => x.id === id);
        selected.selected = !(selected?.selected ?? false);
        setData([...data]);
    }

    useEffect(() => {
        BlogCategoryService.GetAllAsync({}).then((response: Array<any>) => {
            //--get active default by categoryId
            let selected = response.find(x => x.id + '' === idCategory);
            if (selected) {
                selected.selected = true;
            }
            setData(response);
        });
    }, []);

    return (
        <>
            <div className="module blog-category titleLine">
                <h3 className="modtitle">Danh mục</h3>
                <div className="modcontent">
                    <ul className="list-group ">
                        {
                            data?.map((x) => (
                                <li className={x?.child?.length !== 0 ? "list-group-item hadchild" : "list-group-item"}>
                                    <a href={`/blog/${x.id}`} className={`group-item ${x?.selected ? "active" : ""}`}>{x.name}</a>
                                </li>))
                        }
                    </ul>
                </div>
            </div>
        </>)
}