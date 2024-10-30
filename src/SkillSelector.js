import React from "react";
import { Button, Row, Col } from "react-bootstrap";

const SkillSelector = ({ skill, value, skillPoints, setSkillPoints, updateSkill }) => {
  const ranks = ["d0", "d4", "d6", "d8", "d10", "d12"];

  const increaseSkill = () => {
    const currentIndex = ranks.indexOf(value);
    if (currentIndex < ranks.length - 1 && skillPoints > 0) {
      updateSkill(skill, ranks[currentIndex + 1]);
      setSkillPoints(skillPoints - 1);
    }
  };

  const decreaseSkill = () => {
    const currentIndex = ranks.indexOf(value);
    if (currentIndex > 0) {
      updateSkill(skill, ranks[currentIndex - 1]);
      setSkillPoints(skillPoints + 1);
    }
  };

  return (
    <Row className="mb-2 align-items-center">
      <Col>{skill}</Col>
      <Col className="text-center">{value}</Col>
      <Col className="text-end">
        <Button variant="success" size="sm" onClick={increaseSkill} disabled={value === "d12"}>
          +
        </Button>
        <Button variant="danger" size="sm" onClick={decreaseSkill} disabled={value === "d0"}>
          -
        </Button>
      </Col>
    </Row>
  );
};

export default SkillSelector;
