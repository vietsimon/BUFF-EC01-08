import HeaderBottomComponent from "./HeaderBottom";
import HeaderCenterComponent from "./HeaderCenter";
import HeaderTopComponent from "./HeaderTop";

export default function HeaderComponent() {
    return (
        <header id="header" className="variantleft type_4">
            <HeaderTopComponent></HeaderTopComponent>
            <HeaderCenterComponent></HeaderCenterComponent>
            <HeaderBottomComponent></HeaderBottomComponent>
        </header>)
}