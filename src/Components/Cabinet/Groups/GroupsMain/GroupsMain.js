import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {
  theme,
  ButtonStyled,
  ContentHeader,
  Main,
  Root,
  Title,
  TextFieldStyled,
  SelectStyled,
  customMenuProps,
  selectStylesV2,
  InputBaseStyledV2,
  AutocompleteStyledV2,
  AutocompleteFieldV2,
  AutocompleteMenuProps,
  selectStyles,
  InputBaseStyled,
  CustomCheckbox,
} from "../../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import GroupCard from "../GroupCard/GroupCard";
import { Icons } from "../../../../Assets/Icons/icons";
import NewGroupDialog from "../NewGroupDialog/NewGroupDialog";
import { useNavigate } from "react-router-dom";
import {
  teacherNames,
  weekDaysTextFull,
  weekDaysTextFullToShort,
} from "../../../../Constants/testData";
import { useCourses } from "../../../../contexts/Courses.context";

const headerItemStyles = ({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
});

const HeaderDiv = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
}));

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const GroupsMain = ({ groups, handleAddGroup, handleDeleteGroup }) => {
  const { allCourseNames } = useCourses();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [anchorTeacher, setAnchorTeacher] = useState(null);

  const [teacher, setTeacher] = useState("");

  const [anchorCourseSelect, setAnchorCourseSelect] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [selectedCourseNames, setSelectedCourseNames] =
    useState(weekDaysTextFull);

  const handleTeacherChange = (event, newValue) => {
    setTeacher(newValue);
  };

  const handleChangeCourse = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCourses(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClickTeacherSelect = (e) => {
    setAnchorTeacher(e.currentTarget);
  };
  const handleCloseTeacherSelect = (e) => {
    e.stopPropagation();
    setAnchorTeacher(null);
  };
  const handleClickCourseSelect = (e) => {
    setAnchorCourseSelect(e.currentTarget);
  };
  const handleCloseCourseSelect = (e) => {
    e.stopPropagation();
    setAnchorCourseSelect(null);
  };

  const handleChangeCourses = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCourseNames(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(
    () => {
      const handleClickOutside = (event) => {
        if (
          anchorTeacher &&
          !anchorTeacher.parentElement.contains(event.target)
        ) {
          handleCloseTeacherSelect();
        } else if (
          anchorCourseSelect &&
          !anchorCourseSelect.contains(event.target)
        ) {
          handleCloseCourseSelect();
        }
      };
      // const handleClickInside = (event) => {}

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [
      // anchorTeacher,
      // handleCloseTeacherSelect,
      // anchorCourse,
      // handleCloseCourseSelect,
    ]
  );

  return (
    <Root sx={{ maxHeight: "calc(100% - 122px)", display: "flex" }}>
      <Main>
        <div className="flex items-stretch justify-between">
          <div className="flex items-center gap-md">
            <ButtonStyled
              variant="outlined"
              sx={headerItemStyles}
              color="grey"
              onClick={goBack}
            >
              <Icons.ArrowL />
            </ButtonStyled>
            <Title>Группы</Title>
            <div className="flex items-stretch gap-xxs full-height">
              <HeaderDiv className="flex items-stretch full-height p-r-xxs2 p-l-xxs2">
                <div className="flex items-center">
                  <Icons.Search
                    style={{ boxSizing: "content-box", paddingRight: "8px" }}
                    color="#E5E7EB"
                  />
                  <InputBase
                    sx={{ color: theme.typography.color.darkBlue }}
                    placeholder="Поиск по ученику..."
                  />
                </div>
              </HeaderDiv>
              <AutocompleteStyledV2
                options={teacherNames}
                value={teacher}
                onChange={handleTeacherChange}
                renderInput={(params) => (
                  <AutocompleteFieldV2
                    {...params}
                    required
                    id="subject"
                    variant="outlined"
                    placeholder="Учитель"
                  />
                )}
                popupIcon={<Icons.ArrowDBold color="#9CA3AF" />}
                clearIcon={<Icons.Delete color="#9CA3AF" />}
                slotProps={{ paper: AutocompleteMenuProps }}
                // open={true}
              />
              <HeaderDiv
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  label: { cursor: "pointer" },
                }}
                className="flex items-stretch full-height p-xxs2"
                onClick={handleClickCourseSelect}
              >
                <label
                  htmlFor="course-select"
                  className="flex items-center full-height"
                >
                  <Icons.NotebookBookmark color="#b4b7c3" />
                  <span style={{ margin: "0 -8px 0 8px", color: "#1C274C" }}>
                    {(selectedCourses.length < 1 ||
                      selectedCourses.length === allCourseNames.length) &&
                      "Все"}
                  </span>
                </label>
                <SelectStyled
                  id="course-select"
                  autoWidth
                  multiple
                  value={selectedCourses}
                  onChange={handleChangeCourse}
                  renderValue={(selected) => {
                    if (selected.length > 1) {
                      if (selected.length === allCourseNames.length) {
                        return "";
                      }
                      return "..."; // Render "..." if multiple courses are selected
                    }
                    return selected;
                  }}
                  IconComponent={
                    Boolean(anchorCourseSelect)
                      ? Icons.ArrowUBold
                      : Icons.ArrowDBold
                  }
                  onClose={handleCloseCourseSelect}
                  MenuProps={{
                    ...customMenuProps,
                    anchorEl: anchorCourseSelect,
                    open: Boolean(anchorCourseSelect),
                    onClose: handleCloseCourseSelect,
                  }}
                  sx={{
                    "& > svg": { transform: "none !important" },
                  }}
                >
                  {allCourseNames.map((course, i) => (
                    <MenuItem value={course} key={i}>
                      <CustomCheckbox
                        checked={selectedCourses.indexOf(course) > -1}
                      />
                      <ListItemText primary={course} />
                      {/* {course} */}
                    </MenuItem>
                  ))}
                </SelectStyled>
              </HeaderDiv>
              <Select
                fullWidth
                multiple
                required
                value={selectedCourseNames}
                onChange={handleChangeCourses}
                renderValue={(selected) =>
                  selected.map((day) => weekDaysTextFullToShort[day]).join(", ")
                }
                MenuProps={customMenuProps}
                sx={selectStylesV2({ theme })}
                input={<InputBaseStyledV2 />}
                IconComponent={Icons.ArrowDBold}
              >
                {weekDaysTextFull.map((weekDayFull) => (
                  <MenuItem key={weekDayFull} value={weekDayFull}>
                    <Checkbox
                      checked={selectedCourseNames.indexOf(weekDayFull) > -1}
                    />
                    <ListItemText primary={weekDayFull} />
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <ButtonStyled
              variant="contained"
              color="purpleBlue"
              onClick={handleClickOpen}
            >
              <div className="flex items-center gap-xs">
                <Icons.AddCircle />
                <span>Создать группу</span>
              </div>
            </ButtonStyled>
          </div>
        </div>

        <div
          style={{
            maxHeight: "100%",
            paddingRight: "32px",
            overflowY: "auto",
          }}
        >
          <Grid
            container
            justifyContent="start"
            rowSpacing={"18px"}
            columnSpacing={"32px"}
            marginBottom={`${theme.custom.spacing.sm}px`}
          >
            {groups.map((group, i) => (
              <Grid item xs="auto" md="auto" lg={3} key={i}>
                <GroupCard
                  {...groups[i]}
                  handleDeleteGroup={handleDeleteGroup}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Main>

      <NewGroupDialog
        open={open}
        handleClose={handleClose}
        handleAddGroup={handleAddGroup}
      />
    </Root>
  );
};

export default GroupsMain;