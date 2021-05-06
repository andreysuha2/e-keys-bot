import axios from "axios";
axios.get(`${process.env.EKEYS_HOST}/${process.env.EKEYS_API_NAMESPACE}/remote_sync`)
    .then(resp => console.log(resp))
    .catch((e) => console.log(e));