import {useParams} from "react-router-dom";

function EditRelic() {
    const {id} = useParams()

    return (
        <div>
            <p>{id}</p>
        </div>
    )
}

export default EditRelic;