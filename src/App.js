import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Badge, Dropdown, DropdownButton } from "react-bootstrap";
import { edges, flaws, powers, archetypes } from './Characteristics.js'; 
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [selected, setSelected] = useState([]);
  const [points, setPoints] = useState(0);
  const [selectedArchetype, setSelectedArchetype] = useState(null); // For archetype selection

  // Handle selecting a characteristic
  const handleSelect = (char) => {
    if (selected.find((sel) => sel.name === char.name)) return;

    setSelected([...selected, char]);

    if (char.type.includes("Негативная черта")) {
      setPoints(points + char.cost); // Flaws give +1 point
    } else if (char.type === "Положительная черта" || char.type === "Магия") {
      setPoints(points - 2); // Edges and Powers cost 2 points
    }
  };

  // Handle removing a characteristic
  const handleRemove = (char) => {
    setSelected(selected.filter((sel) => sel.name !== char.name));

    if (char.type.includes("Негативная черта")) {
      setPoints(points - char.cost); // Removing a flaw decreases points by 1
    } else if (char.type === "Положительная черта" || char.type === "Магия") {
      setPoints(points + 2); // Removing an edge or power refunds 2 points
    }
  };

  // Handle selecting an archetype
  const handleArchetypeSelect = (archetype) => {
    setSelectedArchetype(archetype);
  };

  // Function to get color based on characteristic type
  const getColorForType = (type) => {
    if (type.includes("Положительная черта")) return "success"; // Green for Edges
    if (type.includes("Магия")) return "primary"; // Blue for Powers
    if (type.includes("Негативная черта")) return "danger"; // Red for Flaws
    return "secondary"; // Default color
  };

  // Function to determine if a characteristic is selected
  const isSelected = (char) => {
    return selected.find((sel) => sel.name === char.name);
  };

  return (
    <Container className="bg-dark text-white min-vh-100 py-5">
      <h1 className="text-center mb-5">Создание персонажа</h1>

      {/* Archetype Dropdown */}
      <div className="mb-4 text-center">
        <DropdownButton id="dropdown-archetypes" title={selectedArchetype ? selectedArchetype.name : "Выбрать архетип"}>
          {archetypes.map((archetype, index) => (
            <Dropdown.Item 
              key={index} 
              onClick={() => handleArchetypeSelect(archetype)}
            >
              {archetype.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        {selectedArchetype && (
          <p className="mt-3">
            <strong>Архетип: </strong> {selectedArchetype.description}
          </p>
        )}
      </div>

      {/* Display points */}
      <div className="mb-3 text-center">
        <h4>
          Поинты: <Badge bg="info">{points}</Badge>
        </h4>
      </div>

      {/* Selected Characteristics */}
      <Row className="mb-4">
        <h4>Выбранные характеристики</h4>
        {selected.length === 0 ? (
          <p>Характеристик пока нет.</p>
        ) : (
          <Row>
            {selected.map((char, index) => (
              <Col md={6} key={index} className="mb-3"> {/* Display in 2 columns */}
                <Card 
                  bg={getColorForType(char.type)} // Apply background color based on type
                  text="white"
                  className="mb-3"
                >
                  <Card.Body>
                    <Card.Title>{char.name}</Card.Title>
                    <Card.Text>{char.description}</Card.Text>
                    <Card.Text>
                      <strong>Требования:</strong> {char.prerequisites}
                    </Card.Text>
                    <Card.Text>
                      <strong>Тип:</strong> {char.type}
                    </Card.Text>
                    <Button variant="light" onClick={() => handleRemove(char)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Row>

      {/* Table Layout for Characteristics */}
      <Row>
        {/* Edges */}
        <Col md={4} className="mb-5 px-md-4">
          <h4 className="text-center">Положительные черты</h4>
          <Row>
            {edges.map((char, index) => (
              <Col xs={6} md={6} lg={6} className="mb-3" key={index}>
                <Button
                  variant={isSelected(char) ? getColorForType(char.type) : "outline-light"} // Highlight selected edges
                  onClick={() => handleSelect(char)}
                  className="w-100 text-start"
                >
                  {char.name}
                </Button>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Flaws */}
        <Col md={4} className="mb-5 px-md-4">
          <h4 className="text-center">Отрицательные черты</h4>
          <Row>
            {flaws.map((char, index) => (
              <Col xs={6} md={6} lg={6} className="mb-3" key={index}>
                <Button
                  variant={isSelected(char) ? getColorForType(char.type) : "outline-light"} // Highlight selected flaws
                  onClick={() => handleSelect(char)}
                  className="w-100 text-start"
                >
                  {char.name}
                </Button>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Powers */}
        <Col md={4} className="mb-5 px-md-4">
          <h4 className="text-center">Силы</h4>
          <Row>
            {powers.map((char, index) => (
              <Col xs={6} md={6} lg={6} className="mb-3" key={index}>
                <Button
                  variant={isSelected(char) ? getColorForType(char.type) : "outline-light"} // Highlight selected powers
                  onClick={() => handleSelect(char)}
                  className="w-100 text-start"
                >
                  {char.name}
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
