import {useState,useEffect} from 'react'
import useRequest from '../../hooks/use-request'
import Router from 'next/router'
import StripeCheckout from 'react-stripe-checkout'

const orderShow = ({order,currentUser})=>{
    const {doRequest,errors} = useRequest() 
    const [expire,setExpire] = useState('')
   
    useEffect(() => {
        const expireTime = () => {setExpire(Math.round((new Date(order.expiresAt) - new Date()) /1000))
        }
        expireTime()
        var id =    setInterval( expireTime, 1000)
        return () =>  {
          
            clearInterval(id)//if u want to navigate or rerender the page([] needs to be filled)  
        }
    },[]);

    const onSubmit = async (token) =>{
    //     e.preventDefault()
        await doRequest({url:'/api/payments',method:'post',body:{orderId:order.id,token:token.id},onSuccess: (order)=>Router.push('/orders')
  //  console.log(token)
      })
}
    
    if(expire <= 0) return <div>Sorry, order is not expired</div>
   
    return(
        <div>
         <h1>{order.ticket.title}</h1>
        <p>You have {expire} seconds left to purchase this ticket</p>
         {/* <h4>Price: ${Order.price}</h4>
         <h4>Status:{Order.status}</h4>
         {errors}
         <button onClick={e=> onSubmit(e,Order.id)} className="btn btn-primary">Book</button> */}
         <StripeCheckout
            token={(token)=> onSubmit(token)}
            stripeKey ='pk_test_dosekXMbFeA3NUN4UIVF3m2k'
            amount = {order.ticket.price * 100}
            email = {currentUser.email}
        />
         </div>
        )
}
orderShow.getInitialProps = async (context,client,currentUser)=>{
    const {orderId} = context.query // ticekt id in the link
    const {data} = await client.get(`/api/orders/${orderId}`)
    console.log(data)
   return {order:data}
}
export default orderShow