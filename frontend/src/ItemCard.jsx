import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const ItemCard = ({ item }) => {
  const handleAddToCart = async () => {
    try {
      await fetch('http://localhost:5000/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: item.name,
          img: item.img,
          price: item.price,
        }),
      });
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <Col xs={12} sm={6} md={3} lg={3} className="mb-4">
      <Card className="h-100 text-center">
        <Card.Img
          variant="top"
          src={item.img}
          style={{
            objectFit: 'cover',
            height: '200px',
            width: '100%',
            borderRadius: '10px 10px 0 0'
          }}
        />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <Card.Text className="text-muted">{item.price} (500 grams)</Card.Text>
          <Button variant="success" className="mt-auto" onClick={handleAddToCart}>
            Buy Now
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ItemCard;
