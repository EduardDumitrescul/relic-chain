import {useParams} from "react-router-dom";
import AddRelic from "./addRelic/AddRelic";
import {ViewRelic} from "./view/ViewRelic";

export function Relic() {
    const {id} = useParams();

    if(id === "0") {
        return (
            <AddRelic/>)
    }

    return (
        <ViewRelic/>
    )
}
