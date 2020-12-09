import {useState} from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'
const ticketShow = ({ticket})=>{
    const {doRequest,errors} = useRequest() 
    const onSubmit = async (e,id) =>{
        e.preventDefault()
       await doRequest({url:'/api/orders',method:'post',body:{ticketId:id},onSuccess: (order)=>Router.push('/orders/[orderId]',`/orders/${order.id}`)
    })}
    return(
        <div>
         <h1>{ticket.title}</h1>
         <h4>Price: ${ticket.price}</h4>
         {errors}
         <button onClick={e=> onSubmit(e,ticket.id)} className="btn btn-primary">Book</button>
         </div>
        )
}
ticketShow.getInitialProps = async (context,client,currentUser)=>{
    const {ticketId} = context.query // ticekt id in the link
    const {data} = await client.get(`/api/tickets/${ticketId}`)
   return {ticket:data}
}
export default ticketShow