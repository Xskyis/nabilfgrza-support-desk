import { Link } from "react-router-dom"

function TicketItem({ticket}) {
  return (
    <div className="ticket">
        <div>{new Date(ticket.createdAt).toLocaleString('in-ID')}</div>
        <div>{ticket.product}</div>
        <div className={`status status-${ticket.status}`}>
            <p>{ticket.status}</p>
        </div>
        <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
            View
        </Link>
    </div>
  )
}

export default TicketItem