import React, { useState } from 'react';
import axios from 'axios';

const AddProd = () => {
  const [foods, setFoods] = useState({
    name: '',
    price: '',
    qnt: '',
    image: null,
    type: 'Chocolate',
  });
  axios.defaults.withCredentials = true;
  const [submitMessage, setSubmitMessage] = useState(false);

  const converToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: foods.name,
      price: foods.price,
      qnt: foods.qnt,
      type: foods.type,
    };

    if (foods.image) {
      const base64Image = await converToBase64(foods.image);
      data.image = base64Image;
    }

    try {
      const response = await axios.post('http://localhost:5000/addfoods', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      setFoods({ name: '', price: '', qnt: '', image: null, type: 'Chocolate' });
      setSubmitMessage(true);
      setTimeout(() => setSubmitMessage(false), 2000);

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      {submitMessage && <p className='successsubmit'>Successfully Added</p>}
      <div className="newProd-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Product Name"
            value={foods.name}
            onChange={(e) => setFoods({ ...foods, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Enter Product Price"
            value={foods.price}
            onChange={(e) => setFoods({ ...foods, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Enter Product Quantity"
            value={foods.qnt}
            onChange={(e) => setFoods({ ...foods, qnt: e.target.value })}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoods({ ...foods, image: e.target.files[0] })}
            required
          />
          <select
            value={foods.type}
            onChange={(e) => setFoods({ ...foods, type: e.target.value })}
          >
            <option value="Chocolate">Chocolates</option>
            <option value="Snack">Snacks</option>
            <option value="Magazines">Magazines</option>
            <option value="Ice-Creams">Ice-Creams</option>
            <option value="Cool-Drinks">Cool-Drinks</option>
            <option value="Essentials">Essentials</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddProd;