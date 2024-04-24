import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as routes from "../../../../Constants/routes";
import {
  Button,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  styled,
  Card,
  Box,
} from "@mui/material";
import { Icons } from "../../../../Assets/Icons/icons";
import { ButtonStyled, MenuStyled } from "../../CabinetStyles";
import { CardStyled, InfoWithIcon } from "../../GridItemCardStyles";
import courseImage from "../../../../Assets/Images/Course.png";
import mariyaAvatar from "../../../../Assets/Images/Avatars/Mariya.png";
import { format, weeksToDays } from "date-fns";
import { auto } from "@popperjs/core";
import { borderRadius } from "@mui/system";
import { NumericFormat } from "react-number-format";

const StudentCard = ({ id, name, handleDeleteStudent }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <CardStyled>
      <Box className="flex flex-col gap-sm" padding="9px">
        <Box className="flex justify-between items-start" padding="8px">
          <div
            className="flex gap-xxs2 items-stretch cursor-pointer"
            onClick={() =>
              navigate(routes.CABINET + routes.STUDENTS + routes.PROFILE)
            }
          >
            <div className="flex items-start justify-between">
              {/* <img
                src={mariyaAvatar}
                alt="Mariya"
                width={50}
                height={"auto"}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "10px",
                }}
              /> */}
              <Icons.MariyaAvatar />
            </div>

            <div className="flex flex-col justify-around">
              <Typography
                fontSize="1rem"
                fontWeight={600}
                letterSpacing="0.32px"
              >
                {name}
              </Typography>
              <Typography color="#AEB2BA" fontSize="0.875rem" fontWeight={400}>
                Frontend, UI/UX
              </Typography>
            </div>
          </div>
          <div
            className="flex items-center justify-between gap-x3s"
            style={{
              marginTop: "-8px",
              marginRight: "-8px",
            }}
          >
            <IconButton
              color="purpleBlue"
              aria-controls={open ? "dots-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              disableElevation
              onClick={handleClick}
            >
              <Icons.MenuDots />
            </IconButton>
            <MenuStyled
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                <Link to={routes.CABINET + routes.STUDENTS + routes.PROFILE}>
                  <ButtonStyled color="purpleBlue">
                    <Icons.Pen />
                    <span>Изменить профиль</span>
                  </ButtonStyled>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <ButtonStyled
                  color="crimson"
                  onClick={() => handleDeleteStudent(id)}
                >
                  <Icons.TrashCan />
                  <span>Удалить из списка</span>
                </ButtonStyled>
              </MenuItem>
            </MenuStyled>
          </div>
        </Box>
        <Box className="flex flex-col" rowGap="12px">
          <div className="flex justify-between">
            <InfoWithIcon>
              <Icons.Group />
              <Typography>Группа</Typography>
            </InfoWithIcon>
            <Typography>UI/UX GR1214-21</Typography>
          </div>
          <div className="flex justify-between">
            <InfoWithIcon>
              <Icons.Call />
              <Typography>Номер</Typography>
            </InfoWithIcon>
            <Link to="tel:/+998987654321" className="link flex gap-x3s">
              <Typography>+998 (98) 765-43-21</Typography>
            </Link>
          </div>
          <div className="flex justify-between">
            <InfoWithIcon>
              <Icons.Messages />
              <Typography>E-mail</Typography>
            </InfoWithIcon>
            <Link to="mailto:example@gmail.com" className="link flex gap-x3s">
              <Typography>example@gmail.com</Typography>
            </Link>
          </div>
        </Box>
        <div className="flex justify-between">
          <InfoWithIcon>
            <Icons.Documents />
            <Typography>Учитель</Typography>
          </InfoWithIcon>
          <Link
            to={routes.CABINET + routes.TEACHERS + routes.PROFILE}
            className="link flex gap-x4s"
          >
            <Typography>Arslan Koptleulov</Typography>
          </Link>
        </div>
        <div className="flex justify-between">
          <InfoWithIcon>
            <Icons.ClockDashed />
            <Typography>01.01.2024</Typography>
          </InfoWithIcon>
          <InfoWithIcon>
            <Icons.CalendarDateContained />
            <Typography>01.07.2024</Typography>
          </InfoWithIcon>
        </div>
        <Link
          to={routes.CABINET + routes.STUDENTS + routes.PROFILE}
          className="link full-width"
        >
          <ButtonStyled
            fullWidth
            variant="contained"
            color="purpleBlueLight"
            sx={{ borderRadius: "15px" }}
          >
            <div className="flex items-center gap-x3s">
              <Icons.SquareArrowLeftUp />
              <Typography>Открыть</Typography>
            </div>
          </ButtonStyled>
        </Link>
      </Box>
    </CardStyled>
  );
};

export default StudentCard;
