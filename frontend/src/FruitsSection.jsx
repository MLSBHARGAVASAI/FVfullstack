import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ItemCard from './itemcard';
import Accordion from 'react-bootstrap/Accordion';

const FruitsSection = ({ fruits }) => {
  return (
    <Container fluid id="fruits-section" className="mt-5 pt-5">
      <h2 className="my-4 text-center">Fruits</h2>
      <Row className="g-4 justify-content-center">
        {fruits.length > 0 ? (
          fruits.map((fruit) => (
            <ItemCard key={fruit.id} item={fruit} />
          ))
        ) : (
          <p className="text-center">No fruits available</p>
        )}
      </Row>
    </Container>
  );
};

export default FruitsSection;