// import React, { useState } from 'react'
// import { XCircle, Cart3 } from 'react-bootstrap-icons';
// import OrderData from '../datas/DataCollection';
// import axios from "axios"
// import { useCart } from '../Hooks/CartContext';
// import { useAuth } from '../Hooks/authContext';
// import '../styles/Card.css';

// export default function Card() {
//     const [showDetails, setShowDetails] = useState(false);
//     const [selectedItemIndex, setSelectedItemIndex] = useState(null);
//     const [mealType, setMealType] = useState('');
//     const [mealPlan, setMealPlan] = useState('');
//     const [mealQuantity, setMealQuantity] = useState(1);
//     const [addOns, setAddOns] = useState({
//         gulabJamoon: 0,
//         moongDalHalwa: 0,
//         todaysSpecialSweet: 0
//     });
//     const { addToCart } = useCart();
//     const [showLoginModal, setShowLoginModal] = useState(false);
//     const [deliveryDate, setDeliveryDate] = useState('');
//     const { isLoggedIn } = useAuth();

//     const backendUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_BACKEND_URL;

//     const handleAddToCart = (e) => {
//         e.preventDefault();
//         if (!isLoggedIn) {
//             setShowLoginModal(true);
//         } else {
//             handleSubmit();
//         }
//     };


//     const orderDetails = (index) => {
//         setSelectedItemIndex(index);
//         setShowDetails(true);
//         window.scrollTo(0, 0);
//     };

//     const closeOrderDetails = () => {
//         setShowDetails(false);
//         setSelectedItemIndex(null);
//     };

//     const handleMealTypeChange = (e) => {
//         setMealType(e.target.value);
//     };

//     const handleMealPlanChange = (e) => {
//         setMealPlan(e.target.value);
//     };

//     const handleMealQuantityChange = (e) => {
//         setMealQuantity(parseInt(e.target.value));
//     };

//     const handleAddOnsChange = (addOn, value) => {
//         setAddOns(prevState => ({
//             ...prevState,
//             [addOn]: parseInt(value)
//         }));
//     };


//     const handleDateChange = (e) => {
//         setDeliveryDate(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         // e.preventDefault();

//         if (!deliveryDate) {
//             alert('Please select a delivery date');
//             return;
//         } else {
//             try {
//                 let userId = await localStorage.getItem('id');
//                 const selectedItem = OrderData[selectedItemIndex];
//                 console.log('Selected item:', selectedItem);
//                 const response = await axios.post(`${backendUrl}/api/CreateOrderDetails`, {
//                     userId,
//                     selectedItemIndex,
//                     mealType,
//                     mealPlan,
//                     mealQuantity,
//                     addOns,
//                     // itemName: selectedItem.itemName,
//                     // itemPrice: selectedItem.itemPrice,
//                     // itemDetails: selectedItem.itemDetails,
//                     deliveryDate
//                 });
//                 addToCart(response.data.cartData);
//                 console.log("akshay", response.data);
//                 setMealType('');
//                 setMealPlan('');
//                 setMealQuantity(1);
//                 setAddOns({
//                     gulabJamoon: 0,
//                     moongDalHalwa: 0,
//                     todaysSpecialSweet: 0
//                 });
//                 setDeliveryDate('');
//                 alert("Added to cart successfuly")
//             } catch (error) {
//                 console.error('Error submitting form:', error);
//                 // Add error handling code here
//                 //jhsdgygyuduytuywe
//             }
//         }

//     };


//     return (
//         <div>
//             <div className="card-container">
//                 <div>
//                     <p className="header-text">Delight your taste buds with our tasty</p>
//                     <p className="sub-header-text">Meal Options</p>
//                     <p className="meal-options-text">Lunch & Dinner</p>
//                 </div>
//                 <div className="cards-wrapper">
//                     {OrderData.map((item, index) => (
//                         <div key={index}>
//                             <div className="card-item mt-3">
//                                 <img
//                                     src={item.itemImage}
//                                     className="card-img-top card-img"
//                                     alt="..."
//                                     onClick={() => orderDetails(index)}
//                                 />
//                                 <div className="card-body">
//                                     <p className="card-text">{item.itemName}</p>
//                                     {/* <p style={{ fontSize: '15px' }}>{item.itemDetails}</p> */}
//                                     <p className="card-description">{item.itemDetails}</p>
//                                     <p className="card-price">{item.itemPrice}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {showDetails && (
//                 <div className="order-outer-div">
//                     <div>
//                         <XCircle onClick={closeOrderDetails} className="close-icon" />
//                     </div>
//                     <div className="order-details-container">
//                         <form onSubmit={handleAddToCart}>
//                             <div className="outer-div">
//                                 <div className="outer-div-left">
//                                     <div>
//                                         <img src={OrderData[selectedItemIndex]?.itemImage} className="order-image" alt="mealbox" />
//                                     </div>
//                                     <div className="order-timings">
//                                         <span>ORDER TIMINGS:</span>
//                                         <span>Breakfast - Upto 10PM previous day</span>
//                                         <span>Lunch - Upto 10AM same day</span>
//                                         <span>Dinner - Upto 5PM same day</span>
//                                     </div>
//                                 </div>
//                                 <div className="outer-div-right">
//                                     <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{OrderData[selectedItemIndex]?.itemName}</span>
//                                     <span style={{ fontSize: '20px', color: 'red' }}>{`Rs. ${OrderData[selectedItemIndex]?.itemPrice}`}</span>
//                                     <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{OrderData[selectedItemIndex]?.itemDetails}</span>
//                                     <span className="select-field">
//                                         <label>MEAL TYPE</label>
//                                         <select value={mealType} onChange={handleMealTypeChange}>
//                                             <option>Lunch</option>
//                                         </select>
//                                     </span>
//                                     <span className="select-field">
//                                         <label>MEAL PLAN</label>
//                                         <select value={mealPlan} onChange={handleMealPlanChange}>
//                                             <option>Single Day</option>
//                                         </select>
//                                     </span>


//                                     <span className='seletField' style={{ display: 'flex', flexDirection: 'column' }}>
//                                         <label style={{ fontWeight: '500' }}>Delivery Date</label>
//                                         <input
//                                             type="date"
//                                             value={deliveryDate}
//                                             onChange={handleDateChange}
//                                             min={new Date().toISOString().split('T')[0]}
//                                             style={{ height: '2rem' }}
//                                         />
//                                     </span>



//                                     <span className="select-field">
//                                         <label>Meal Quantity</label>
//                                         <input type="number" value={mealQuantity} onChange={handleMealQuantityChange} />
//                                     </span>
//                                     <span className="add-ons-title">Add-ons</span>
//                                     <span>GULAB JAMOON</span>
//                                     <span>
//                                         <input
//                                             type="number"
//                                             value={addOns.gulabJamoon}
//                                             onChange={(e) => handleAddOnsChange('gulabJamoon', e.target.value)}
//                                             className="add-ons-input"
//                                         />
//                                     </span>
//                                     <span>
//                                         <button type="submit" className="add-to-cart-button">
//                                             <Cart3 /> ADD TO CART
//                                         </button>
//                                     </span>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//             {showLoginModal && (
//                 <div className="modal">
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-body">
//                                 <p style={{ fontWeight: 'bold' }}>Please login to continue order</p>
//                                 <button className="btn btn-primary" onClick={() => setShowLoginModal(false)}>
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }









// //     return (
// //         <div style={{}}>
// //             <div style={{}}>
// //                 <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
// //                     <p style={{ color: '#2E94B9', fontWeight: 'bold', fontSize: '30px' }}>Delight your taste buds with our tasty</p>
// //                     <p style={{ color: 'black', fontWeight: 'initial', fontSize: '45px' }}>Meal Options</p>
// //                     <p style={{ color: 'black', fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' }}>Lunch & Dinner</p>
// //                 </div>
// //                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10rem', padding: '20px', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', padding: '3rem' }}>
// //                     {OrderData.map((item, index) => (
// //                         <div key={index} >
// //                             <div className="card mt-3" style={{ width: "35rem", height: '35rem', borderRadius: "20%", overflow: 'hidden', backgroundColor: '#EAE7ED' }}>
// //                                 <img src={item.itemImage} className="card-img-top" alt="..." style={{ height: "60%", objectFit: "fill", cursor: "pointer", borderRadius: '' }} onClick={() => orderDetails(index)} />
// //                                 <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// //                                     <p className="card-text" style={{ fontWeight: 'bold', fontSize: '30px' }}>{item.itemName}</p>
// //                                     <p style={{ fontSize: '15px' }}>{item.itemDetails}</p>
// //                                     <p style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}>{item.itemPrice}</p>

// //                                 </div>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //             {showDetails && (
// //                 <div className="order-outer-div" style={{ zIndex: 2, position: 'fixed', top: 0, left: 0, background: 'rgba(0, 0, 0, 0.5)', right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //                     <div>
// //                         <XCircle onClick={closeOrderDetails} style={{ height: '40px', width: '40px', color: 'white', zIndex: '5', backgroundColor: 'red', position: 'absolute', top: '0', right: '0', borderRadius: '100%' }} />
// //                     </div>
// //                     <div style={{ backgroundColor: 'white', padding: '40px', width: '80rem', borderRadius: '10px', }}>
// //                         <form onSubmit={handleAddToCart}>
// //                             <div className="outer-div" style={{ background: 'white', padding: '30px', borderRadius: '10px', display: 'flex', gap: '3rem', maxHeight: '80vh', overflow: 'auto' }}>
// //                                 <div className='outer-div-left' style={{ display: 'flex', flexDirection: 'column' }}>
// //                                     <div><img src={OrderData[selectedItemIndex]?.itemImage} style={{ height: '22rem', width: '40rem' }} alt="mealbox" /></div>
// //                                     <div style={{ display: 'flex', flexDirection: 'column' }}>
// //                                         <span>ORDER TIMINGS:</span>
// //                                         <span>Breakfast - Upto 10PM previous day</span>
// //                                         <span>Lunch - Upto 10AM same day</span>
// //                                         <span>Dinner - Upto 5PM same day</span>
// //                                     </div>
// //                                 </div>
// //                                 <div className='outer-div-right' style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
// //                                     <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{OrderData[selectedItemIndex]?.itemName}</span>
// //                                     <span style={{ fontSize: '20px', color: 'red' }}>{`Rs. ${OrderData[selectedItemIndex]?.itemPrice}`}</span>
// //                                     <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{OrderData[selectedItemIndex]?.itemDetails}</span>
// //                                     <span className='seletField' style={{ display: 'flex', flexDirection: 'column' }}>
// //                                         <label style={{ fontWeight: '500' }}>MEAL TYPE</label>
// //                                         <select value={mealType} onChange={handleMealTypeChange} style={{ height: '2rem' }}>
// //                                             {/* <option>Choose an Option</option> */}
// //                                             <option>Lunch</option>
// //                                         </select>
// //                                     </span>
// //                                     <span className='seletField' style={{ display: 'flex', flexDirection: 'column' }}>
// //                                         <label style={{ fontWeight: '500' }}>MEAL PLAN</label>
// //                                         <select value={mealPlan} onChange={handleMealPlanChange} style={{ height: '2rem' }}>
// //                                             {/* <option>Choose an Option</option> */}
// //                                             <option>Single Day</option>
// //                                         </select>
// //                                     </span>
// //                                     <span className='seletField' style={{ display: 'flex', flexDirection: 'column' }}>
// //                                         <label style={{ fontWeight: '500' }}>Delivery Date</label>
// //                                         <input
// //                                             type="date"
// //                                             value={deliveryDate}
// //                                             onChange={handleDateChange}
// //                                             min={new Date().toISOString().split('T')[0]}
// //                                             style={{ height: '2rem' }}
// //                                         />
// //                                     </span>
// //                                     <span className='seletField' style={{ display: 'flex', flexDirection: 'column' }}>
// //                                         <label style={{ fontWeight: '500' }}>Meal Quantity</label>
// //                                         <input type='number' value={mealQuantity} onChange={handleMealQuantityChange} style={{ textAlign: 'center', height: '2.6rem', width: '9rem' }}></input>
// //                                     </span>
// //                                     <span style={{ fontSize: '35px', fontWeight: '400' }}>Add-ons</span>
// //                                     <span style={{ fontWeight: '500' }}>GULAB JAMOON</span>
// //                                     <span>
// //                                         <input type='number' value={addOns.gulabJamoon} onChange={(e) => handleAddOnsChange('gulabJamoon', e.target.value)} style={{ textAlign: 'center', height: '2.6rem', width: '9rem' }}></input>
// //                                     </span>
// //                                     {/* <span style={{ fontWeight: '500' }}>MOONG DAL HALWA</span> */}
// //                                     {/* <span>
// //                                             <input type='number' value={addOns.moongDalHalwa} onChange={(e) => handleAddOnsChange('moongDalHalwa', e.target.value)} style={{ textAlign: 'center', height: '2.6rem', width: '9rem' }}></input>
// //                                         </span> */}
// //                                     {/* <span style={{ fontWeight: '500' }}>TODAYS SPECIAL SWEET</span> */}
// //                                     {/* <span>
// //                                             <input type='number' value={addOns.todaysSpecialSweet} onChange={(e) => handleAddOnsChange('todaysSpecialSweet', e.target.value)} style={{ textAlign: 'center', height: '2.6rem', width: '9rem' }}></input>
// //                                         </span> */}
// //                                     <span><button type="submit" style={{ height: '3rem', width: '12rem', backgroundColor: 'brown', border: 'none', color: 'white', marginBottom: '3rem' }}><Cart3 /> ADD TO CART</button></span>
// //                                 </div>
// //                             </div>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //             {showLoginModal && (
// //                 <div className="modal" style={{ display: 'block', zIndex: 1000, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', textAlign: 'center' }}>
// //                     <div className="modal-dialog" style={{ display: 'inline-block', marginTop: '20%', position: 'relative' }}>
// //                         <div className="modal-content" style={{ width: '100%', maxWidth: '700px', margin: 'auto' }}>
// //                             <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '3', alignItems: 'center' }}>
// //                                 {/* Login form or message */}
// //                                 <p style={{ fontWeight: 'bold' }}>Please login to continue order</p>
// //                                 <button className="btn btn-primary" style={{ width: '5rem' }} onClick={() => setShowLoginModal(false)}>Close</button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     )
// // }