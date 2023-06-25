import React, { FC } from "react";
import { Typography, Button } from "@mui/material";

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
    <>
      <Typography noWrap={wrapDependency}>
        {text}{" "}
        {text.length > 20 ? (
          <Button onClick={handleClickLength} id={id}>
            LESS...
          </Button>
        ) : null}
      </Typography>
      {text.length > 20 && wrapDependency ? (
        <Button onClick={handleClickLength} id={id}>
          more...
        </Button>
      ) : null}
    </>
  );
};

export default CardLinesButtons;
