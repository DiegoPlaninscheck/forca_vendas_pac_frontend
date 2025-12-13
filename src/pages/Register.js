import DataTableComponent from "../components/DataTableComponent/DataTableComponent";
import MenuBarComponent from "../components/MenuBar/MenuBarComponent";
import { useRef } from "react";

function Register(props) {
    const dataTableRef = useRef(null);

    const handleNewRecord = () => {
        if (dataTableRef.current) {
            dataTableRef.current.openNewModal();
        }
    };

    return (
        <>
            <MenuBarComponent type={props.type} onNewRecord={handleNewRecord}/>
            <DataTableComponent type={props.type} ref={dataTableRef} />
        </>
    )
}

export default Register;