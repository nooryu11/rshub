import Link from 'next/link';
const LandingPage = ({currentUser,orders}) =>{
    console.log(orders)
    const orderList = orders.map(order =>{
        return (
            <tr key={order.id}>
                <td>{order.ticket.title}</td>
                <td>${parseFloat(order. ticket.price).toFixed(2)}</td>
                <td>
                   {order.status}
                </td>
            </tr>
        )
    })
    if(orders.length <= 0) return <div>No orders found</div>
    return(
        <div>
            <h1>Tickets</h1>
            <table className="table">
                <thead>
                    <tr>
                        <td><strong>Title</strong></td>
                        <td><strong>Price</strong></td>
                        <td><strong>Status</strong></td>
                        
                    </tr>
                </thead>
                <tbody>
                    {orderList}
                </tbody>
            </table>
        </div>
    )
}
LandingPage.getInitialProps = async (context,client,currentUser)=>{
    const {data} = await client.get('/api/orders')
   return {orders:data}
}
export default LandingPage; 