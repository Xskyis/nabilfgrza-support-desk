import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket () {
  const { user } = useSelector(state => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.tickets
  )

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [product, setProduct] = useState('iphone')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = e => {
    e.preventDefault()
    dispatch(createTicket({ product, description }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <BackButton url='/' />
    <section className='heading'>
      <h1>Create New Ticket</h1>
      <p>Please fill out the form below</p>
    </section>

    <section className='form'>
      <div className='form-group'>
        <label htmlFor='name'>Customer Name</label>
        <input type='text' className='form-control' value={name} disabled />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Customer Email</label>
        <input type='text' className='form-control' value={email} disabled />
      </div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='product'>Product</label>
          <select
            name='product'
            id='product'
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            <option value="">Select Devices</option>
            <option value='Pixel 1'>Pixel 1</option>
            <option value='Pixel 2'>Pixel 2</option>
            <option value='Pixel 3'>Pixel 3</option>
            <option value='Pixel 4'>Pixel 4</option>
            <option value='Pixel 5'>Pixel 5</option>
            <option value='Pixel 6'>Pixel 6</option>
            <option value='Pixel 6 Pro'>Pixel 6 Pro</option>
            <option value='Pixel 6a'>Pixel 6a</option>
            <option value='Pixel 7'>Pixel 7</option>
            <option value='Pixel 7 Pro'>Pixel 7 Pro</option>
            <option value='Pixel 7a'>Pixel 7a</option>
            <option value='Pixel 8'>Pixel 8</option>
            <option value='Pixel 8 Pro'>Pixel 8 Pro</option>
            <option value='Pixel Fold'>Pixel Fold</option>
          
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description of the issue</label>
          <textarea
            name='description'
            id='description'
            className='form-control'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className='form-group'>
          <button className='btn btn-block'>Submit</button>
        </div>
      </form>
    </section>
  </>
  )
}

export default NewTicket
