import DataTableComponent from "../components/DataTableComponent/DataTableComponent";
import MenuBarComponent from "../components/MenuBar/MenuBarComponent";

function Register(props) {
    return (
        <>
            <MenuBarComponent type={props.type}/>
            <DataTableComponent type={props.type} />
        </>
    )
}

export default Register;