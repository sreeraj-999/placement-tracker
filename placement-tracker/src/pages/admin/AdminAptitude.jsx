import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  IconButton,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";


function AdminAptitude() {

  // =====================================================
  // STATE
  // =====================================================

  const [questions, setQuestions] = useState([]);

  const [category, setCategory] =
    useState("quantitative");

  const [question, setQuestion] =
    useState("");

  const [options, setOptions] =
    useState(["", "", "", ""]);

  const [correctAnswer, setCorrectAnswer] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [filterCategory, setFilterCategory] =
    useState("all");


  // =====================================================
  // FETCH QUESTIONS
  // =====================================================

  useEffect(() => {
    fetchQuestions();
  }, []);


  const fetchQuestions = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "/api/questions/admin/all",
          {
            headers: {
              Authorization: token,
            },
          }
        );

      setQuestions(response.data);

    } catch (error) {

      console.log(
        "Fetch questions error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to load questions"
      );
    }
  };


  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {

    setCategory("quantitative");

    setQuestion("");

    setOptions([
      "",
      "",
      "",
      "",
    ]);

    setCorrectAnswer("");

    setEditingId(null);
  };


  // =====================================================
  // HANDLE OPTION CHANGE
  // =====================================================

  const handleOptionChange = (
    index,
    value
  ) => {

    const updatedOptions = [
      ...options,
    ];

    updatedOptions[index] = value;

    setOptions(updatedOptions);

    // If the edited option was the
    // correct answer, clear it

    if (
      options[index] === correctAnswer &&
      value !== correctAnswer
    ) {
      setCorrectAnswer("");
    }
  };


  // =====================================================
  // ADD / UPDATE QUESTION
  // =====================================================

  const saveQuestion = async () => {

    // Validate question

    if (!question.trim()) {

      alert(
        "Please enter the question."
      );

      return;
    }


    // Validate options

    if (
      options.some(
        (option) =>
          !option.trim()
      )
    ) {

      alert(
        "Please fill all four options."
      );

      return;
    }


    // Validate correct answer

    if (!correctAnswer) {

      alert(
        "Please select the correct answer."
      );

      return;
    }


    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");


      // =================================================
      // UPDATE
      // =================================================

      if (editingId) {

        await axios.put(
          `/api/questions/admin/${editingId}`,
          {
            category,
            question,
            options,
            correctAnswer,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        alert(
          "Question updated successfully."
        );

      }

      // =================================================
      // ADD
      // =================================================

      else {

        await axios.post(
          "/api/questions/admin/add",
          {
            category,
            question,
            options,
            correctAnswer,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        alert(
          "Question added successfully."
        );
      }


      resetForm();

      fetchQuestions();

    } catch (error) {

      console.log(
        "Save question error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to save question"
      );

    } finally {

      setLoading(false);
    }
  };


  // =====================================================
  // EDIT QUESTION
  // =====================================================

  const editQuestion = (item) => {

    setEditingId(item._id);

    setCategory(item.category);

    setQuestion(item.question);

    setOptions([
      ...item.options,
    ]);

    setCorrectAnswer(
      item.correctAnswer
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =====================================================
  // DELETE QUESTION
  // =====================================================

  const deleteQuestion = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this question?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `/api/questions/admin/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert(
        "Question deleted successfully."
      );

      fetchQuestions();

    } catch (error) {

      console.log(
        "Delete question error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to delete question"
      );
    }
  };


  // =====================================================
  // FILTER QUESTIONS
  // =====================================================

  const filteredQuestions =
    filterCategory === "all"
      ? questions
      : questions.filter(
          (item) =>
            item.category ===
            filterCategory
        );


  // =====================================================
  // CATEGORY NAME
  // =====================================================

  const getCategoryName = (
    categoryValue
  ) => {

    if (
      categoryValue ===
      "quantitative"
    ) {
      return "Quantitative";
    }

    if (
      categoryValue ===
      "logical"
    ) {
      return "Logical";
    }

    if (
      categoryValue ===
      "verbal"
    ) {
      return "Verbal";
    }

    return categoryValue;
  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <Box
      sx={{
        width: "100%",
      }}
    >

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <Box
        sx={{
          mb: 4,
        }}
      >

        <Typography
          sx={{
            fontSize: "36px",
            fontWeight: 700,
            color: "#1e293b",
            mb: 1,
          }}
        >
          Aptitude Management
        </Typography>

        <Typography
          sx={{
            fontSize: "17px",
            color: "#64748b",
          }}
        >
          Add, edit and manage aptitude
          questions for students.
        </Typography>

      </Box>


      {/* =================================================
          ADD / EDIT FORM
      ================================================= */}

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
          mb: 4,
        }}
      >

        <CardContent
          sx={{
            p: 4,
          }}
        >

          <Box
            sx={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >

            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1e293b",
              }}
            >
              {editingId
                ? "Edit Question"
                : "Add New Question"}
            </Typography>


            {editingId && (

              <Button
                startIcon={
                  <CloseIcon />
                }
                onClick={
                  resetForm
                }
                sx={{
                  color: "#64748b",
                }}
              >
                Cancel Edit
              </Button>

            )}

          </Box>


          <Divider
            sx={{
              mb: 3,
            }}
          />


          {/* CATEGORY */}

          <FormControl
            fullWidth
            sx={{
              mb: 3,
            }}
          >

            <InputLabel>
              Category
            </InputLabel>

            <Select
              value={category}
              label="Category"
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            >

              <MenuItem value="quantitative">
                Quantitative Aptitude
              </MenuItem>

              <MenuItem value="logical">
                Logical Reasoning
              </MenuItem>

              <MenuItem value="verbal">
                Verbal Ability
              </MenuItem>

            </Select>

          </FormControl>


          {/* QUESTION */}

          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Question"
            placeholder="Enter the aptitude question"
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            sx={{
              mb: 3,
            }}
          />


          {/* OPTIONS */}

          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#334155",
              mb: 2,
            }}
          >
            Options
          </Typography>


          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: 2,
              mb: 3,
            }}
          >

            {options.map(
              (option, index) => (

                <TextField
                  key={index}
                  fullWidth
                  label={`Option ${
                    index + 1
                  }`}
                  placeholder={`Enter option ${
                    index + 1
                  }`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(
                      index,
                      e.target.value
                    )
                  }
                />

              )
            )}

          </Box>


          {/* CORRECT ANSWER */}

          <FormControl
            fullWidth
            sx={{
              mb: 3,
            }}
          >

            <InputLabel>
              Correct Answer
            </InputLabel>

            <Select
              value={correctAnswer}
              label="Correct Answer"
              onChange={(e) =>
                setCorrectAnswer(
                  e.target.value
                )
              }
            >

              {options.map(
                (option, index) => (

                  <MenuItem
                    key={index}
                    value={option}
                    disabled={
                      !option.trim()
                    }
                  >
                    Option {index + 1}
                    {" - "}
                    {option ||
                      "Empty"}
                  </MenuItem>

                )
              )}

            </Select>

          </FormControl>


          {/* BUTTONS */}

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >

            <Button
              variant="contained"
              startIcon={
                editingId
                  ? <EditIcon />
                  : <AddIcon />
              }
              onClick={
                saveQuestion
              }
              disabled={loading}
              sx={{
                backgroundColor:
                  "#e20505",
                px: 4,
                py: 1.3,
                borderRadius: 2,
                textTransform:
                  "uppercase",
                fontWeight: 500,

                "&:hover": {
                  backgroundColor:
                    "#c90404",
                },
              }}
            >

              {loading
                ? "Saving..."
                : editingId
                ? "Update Question"
                : "Add Question"}

            </Button>


            {editingId && (

              <Button
                variant="outlined"
                onClick={
                  resetForm
                }
                sx={{
                  px: 4,
                  py: 1.3,
                  borderRadius: 2,
                  textTransform:
                    "uppercase",
                }}
              >
                Clear
              </Button>

            )}

          </Box>

        </CardContent>

      </Card>


      {/* =================================================
          QUESTION BANK
      ================================================= */}

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
        }}
      >

        <CardContent
          sx={{
            p: 4,
          }}
        >

          <Box
            sx={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              mb: 3,
              gap: 2,
            }}
          >

            <Box>

              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#1e293b",
                }}
              >
                Question Bank
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  mt: 0.5,
                }}
              >
                Total Questions:{" "}
                {filteredQuestions.length}
              </Typography>

            </Box>


            {/* FILTER */}

            <FormControl
              sx={{
                minWidth: 220,
              }}
            >

              <InputLabel>
                Filter Category
              </InputLabel>

              <Select
                value={
                  filterCategory
                }
                label="Filter Category"
                onChange={(e) =>
                  setFilterCategory(
                    e.target.value
                  )
                }
              >

                <MenuItem value="all">
                  All Categories
                </MenuItem>

                <MenuItem value="quantitative">
                  Quantitative
                </MenuItem>

                <MenuItem value="logical">
                  Logical
                </MenuItem>

                <MenuItem value="verbal">
                  Verbal
                </MenuItem>

              </Select>

            </FormControl>

          </Box>


          <Divider
            sx={{
              mb: 3,
            }}
          />


          {/* QUESTIONS */}

          {filteredQuestions.length === 0 ? (

            <Box
              sx={{
                textAlign: "center",
                py: 6,
              }}
            >

              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#64748b",
                }}
              >
                No questions found.
              </Typography>

            </Box>

          ) : (

            <Box
              sx={{
                display: "flex",
                flexDirection:
                  "column",
                gap: 2,
              }}
            >

              {filteredQuestions.map(
                (item, index) => (

                  <Card
                    key={item._id}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      borderColor:
                        "#e2e8f0",
                    }}
                  >

                    <CardContent
                      sx={{
                        p: 3,
                      }}
                    >

                      {/* TOP */}

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "flex-start",
                          gap: 2,
                        }}
                      >

                        <Box
                          sx={{
                            flex: 1,
                          }}
                        >

                          <Box
                            sx={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: 1.5,
                              mb: 1.5,
                            }}
                          >

                            <Typography
                              sx={{
                                fontWeight:
                                  700,
                                color:
                                  "#1e293b",
                              }}
                            >
                              #
                              {index + 1}
                            </Typography>

                            <Chip
                              label={getCategoryName(
                                item.category
                              )}
                              size="small"
                              sx={{
                                fontWeight:
                                  500,
                              }}
                            />

                          </Box>


                          <Typography
                            sx={{
                              fontSize:
                                "17px",
                              fontWeight:
                                600,
                              color:
                                "#334155",
                              lineHeight:
                                1.6,
                            }}
                          >
                            {item.question}
                          </Typography>

                        </Box>


                        {/* ACTIONS */}

                        <Box
                          sx={{
                            display:
                              "flex",
                            gap: 0.5,
                          }}
                        >

                          <IconButton
                            onClick={() =>
                              editQuestion(
                                item
                              )
                            }
                            sx={{
                              color:
                                "#2563eb",
                            }}
                          >
                            <EditIcon />
                          </IconButton>


                          <IconButton
                            onClick={() =>
                              deleteQuestion(
                                item._id
                              )
                            }
                            sx={{
                              color:
                                "#dc2626",
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>

                        </Box>

                      </Box>


                      {/* OPTIONS */}

                      <Box
                        sx={{
                          display:
                            "grid",
                          gridTemplateColumns:
                            "1fr 1fr",
                          gap: 1.5,
                          mt: 3,
                        }}
                      >

                        {item.options.map(
                          (
                            option,
                            optionIndex
                          ) => (

                            <Box
                              key={
                                optionIndex
                              }
                              sx={{
                                border:
                                  "1px solid #e2e8f0",
                                borderRadius:
                                  1.5,
                                p: 1.5,
                                backgroundColor:
                                  option ===
                                  item.correctAnswer
                                    ? "#f0fdf4"
                                    : "#f8fafc",
                              }}
                            >

                              <Typography
                                sx={{
                                  fontSize:
                                    "14px",
                                  fontWeight:
                                    600,
                                  color:
                                    option ===
                                    item.correctAnswer
                                      ? "#15803d"
                                      : "#64748b",
                                  mb: 0.5,
                                }}
                              >
                                Option{" "}
                                {optionIndex +
                                  1}
                              </Typography>


                              <Typography
                                sx={{
                                  fontSize:
                                    "15px",
                                  color:
                                    "#334155",
                                }}
                              >
                                {option}
                              </Typography>


                              {option ===
                                item.correctAnswer && (

                                <Typography
                                  sx={{
                                    fontSize:
                                      "12px",
                                    color:
                                      "#15803d",
                                    fontWeight:
                                      600,
                                    mt: 0.5,
                                  }}
                                >
                                  Correct Answer
                                </Typography>

                              )}

                            </Box>

                          )
                        )}

                      </Box>

                    </CardContent>

                  </Card>

                )
              )}

            </Box>

          )}

        </CardContent>

      </Card>

    </Box>
  );
}

export default AdminAptitude;