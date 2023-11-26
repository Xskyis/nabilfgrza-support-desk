import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import {
  getNotes,
  reset as notesReset,
  createNote
} from '../features/notes/noteSlice'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Modal from 'react-modal'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import NoteItem from '../components/NoteItem'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

function Ticket () {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    state => state.tickets
  )

  const { notes, isLoading: notesIsLoading } = useSelector(state => state.notes)

  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const { ticketId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, ticketId])

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  // Create note submit
  const onNoteSubmit = e => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
    closeModal()
    toast.success('Note added')
  }

  // Open/Close modal funct
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (isLoading || notesIsLoading) {
    return <Spinner />
  }

  if (isError) {
    ;<h3>Something went wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <div className='ticket-head'>
          <h2 className='ticket-id'>
            Ticket ID : {ticket?.ticket?._id}
          </h2>
          <h2 className={`status-in status-${ticket?.ticket?.status}`}>
              {ticket?.ticket?.status}
          </h2>
        </div>
        <h3>
          Date Submitted:{' '}
          {new Date(ticket?.ticket?.createdAt).toLocaleString('eu-US')}
        </h3>
        <h3>Product: {ticket?.ticket?.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket?.ticket?.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket?.ticket?.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note Text'
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              cols='50'
              rows='1'
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes?.map(note => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket?.ticket?.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
