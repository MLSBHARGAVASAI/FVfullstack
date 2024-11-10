import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ItemCard from './itemcard';
import Accordion from 'react-bootstrap/Accordion';


const VegetablesSection = ({ vegetables }) => {
  return (
    <Container fluid id="vegetables-section" className="mt-5">
      <h2 className="my-4 text-center">Vegetables</h2>
      <Row className="g-4 justify-content-center">
        {vegetables.length > 0 ? (
          vegetables.map((vegetable) => (
            <ItemCard key={vegetable.id} item={vegetable} />
          ))
        ) : (
          <p className="text-center">No vegetables available</p>
        )}
      </Row>
    </Container>
  );
};

export default VegetablesSection;