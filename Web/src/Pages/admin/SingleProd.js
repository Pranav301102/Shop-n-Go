import React from 'react'
import './ap.css'
function SingleProd() {
    const [count, setCount] = React.useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    }
    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }
    return (
        <>
            <div class='list'>
                <ul class='items'>
                    <li class='item'>
                        <div class='favourite'>
                            <svg viewBox='0 0 19.481 19.481' x='0px' xmlns='http://www.w3.org/2000/svg' y='0px'>
                                <path d='m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z'></path>
                            </svg>
                        </div>
                        <div class='preview'></div>
                        <div class='description'>
                            <div class='price'>1.32 $</div>
                            <div className='qyt' >
                                <div className='qyt-btn'>
                                    <button onClick={handleDecrement} className='minus'>-</button>
                                    <span className='num'>{count}</span>
                                    <button onClick={handleIncrement} className='plus'>+</button>
                                </div>
                            </div>
                            <div class='title'>Boost x2</div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SingleProd