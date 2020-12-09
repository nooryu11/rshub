import axios from 'axios'
import {useState} from 'react';

export default () => {
    const [errors,setError] = useState([])
    const doRequest = async ({url,method,body,onSuccess})=>{
        try{
        setError(null)
        const response = await axios[method](url,body);
        if(onSuccess) onSuccess(response.data);
        return response.data;
        } catch(err){
            setError(
                <div className="alert alert-danger">
                    <h4 className="my-0">Ooops....</h4>
                    <ul>
                        {err.response.data.errors.map(err =><li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            )
        }
    }   
    return {doRequest,errors}
}