import React from "react";
import { Button, Row, Col } from "react-bootstrap";

const StatSelector = ({ stat, value, statPoints, setStatPoints, updateStat }) => {
  const ranks = ["d4", "d6", "d8", "d10", "d12"];

  const increaseStat = () => {
    const currentIndex = ranks.indexOf(value);
    if (currentIndex < ranks.length - 1 && statPoints > 0) {
      updateStat(stat, ranks[currentIndex + 1]);
      setStatPoints(statPoints - 1);
    }
  };

  const decreaseStat = () => {
    const currentIndex = ranks.indexOf(value);
    if (currentIndex > 0) {
      updateStat(stat, ranks[currentIndex - 1]);
      setStatPoints(statPoints + 1);
    }
  };

  return (
    <Row className="mb-2 align-items-center">
      <Col>{stat}</Col>
      <Col className="text-center">{value}</Col>
      <Col className="text-end">
        <Button variant="success" size="sm" onClick={increaseStat} disabled={value === "d12"}>
          +
        </Button>
        <Button variant="danger" size="sm" onClick={decreaseStat} disabled={value === "d4"}>
          -
        </Button>
      </Col>
    </Row>
  );
};

export default StatSelector;
