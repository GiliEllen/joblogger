import React, { FC } from "react";
import { Typography, Button, Container } from "@mui/material";

interface CardLinesButtonsProps {
  wrapDependency: boolean;
  text: string;
  handleClickLength: any;
  id: string;
}

const CardLinesButtons: FC<CardLinesButtonsProps> = ({
  wrapDependency,
  text,
  handleClickLength,
  id,
}) => {
  return (
    <Container sx={{ display: "flex", alignItems: "center" }}>
      <Typography noWrap={wrapDependency} >
        {text}{" "}
        {text.length > 30 ? (
          <Button onClick={handleClickLength} id={id}>
            LESS...
          </Button>
        ) : null}
      </Typography>
      {text.length > 30 && wrapDependency ? (
        <Button onClick={handleClickLength} id={id}>
          more...
        </Button>
      ) : null}
    </Container>
  );
};

export default CardLinesButtons;
