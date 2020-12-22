import Link from 'next/link';
const LandingPage = ({currentUser,tickets}) =>{
    console.log(tickets)
    // var socket = require('socket.io-client')('http://localhost:3002');
    // socket.on('announcements', function(data){
    //     console.log("550",data)
    // });
    const ticketList = tickets.map(ticket =>{
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>${parseFloat(ticket.price).toFixed(2)}</td>
                <td>
                    <Link href='/tickets/[ticketId]' as={`tickets/${ticket.id}`}>
                        <a >View ticket</a>
                    </Link>
                </td>
            </tr>
        )
    })
    if(tickets.length <= 0) return <div>No tickets found</div>
    return(
        <div>
            <h1>Tickets</h1>
            <table className="table">
                <thead>
                    <tr>
                        <td><strong>Title</strong></td>
                        <td><strong>Price</strong></td>
                        <td><strong>Link</strong></td>
                        
                    </tr>
                </thead>
                <tbody>
                    {ticketList}
                </tbody>
            </table>
        </div>
    )
}
LandingPage.getInitialProps = async (context,client,currentUser)=>{
    const {data} = await client.get('/api/tickets')
   return {tickets:data}
}
export default LandingPage; 