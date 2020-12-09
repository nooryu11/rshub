import {useState} from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'
const newTicket = ()=>{
    const [title,setTitle] = useState('')
    const [price,setPrice] = useState('')
    const {doRequest,errors} = useRequest()

    const onSubmit = async (e) =>{
        e.preventDefault()
       var response = await doRequest({url:'/api/tickets',method:'post',body:{title,price,},onSuccess: ()=>{Router.push('/')}})
    }
    const changePrice = ()=>{
        const v = parseFloat(price)
        if(isNaN(v)) return;

        setPrice(v.toFixed(2))
    }

    return  ( <form onSubmit={onSubmit}>
        <h1>create new ticket</h1>
        <div className = "form-group">
            <label>Title</label>
            <input value={title} onChange={e =>setTitle(e.target.value)} className="form-control"/>
        </div>
        <div className = "form-group">
            <label>Price</label>
            <input value={price} onBlur={e =>changePrice(e.target.value)} onChange={e =>setPrice(e.target.value)} type="text" className="form-control"/>
        </div>
        {errors}
        <button className="btn btn-primary">create</button>
    </form>)
}
export default newTicket