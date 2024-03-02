import React, { useState, useRef, useEffect } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { URL } from "~/utils/BaseURL";
import moment from "moment";
import "./editor.css";
import draftToHtml from "draftjs-to-html";

const editorStyle = {
  backgroundColor: "#ffffff",
  color: "#000000",
  width: "auto",
  fontSize: "20px",
  minHeight: "400px",
  listStyle: "disc",
};

const applyPagination = (freelancerData, page, limit) => {
  if (freelancerData?.length > 0) {
    return freelancerData?.slice(page * limit, page * limit + limit);
  } else {
    return [];
  }
};

const Comment = ({ user, id, placeholder }) => {
  const auth = useSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [freelancerData, setFreelancerData] = useState([]);
  const [pmId, setPmId] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const titleFocus = useRef(null);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedComments, setSelectedComments] = useState([]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  function getComments() {
    axios
      .post(`${URL}/team/getfreelancercomments.php`, {
        freelancer_id: id,
      })
      .then((res) => {
        console.log(res);
        setFreelancerData(res.data);
        setPmId(res.data.map((item) => item?.commenter[1]));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const getComments = async () =>
      await axios
        .post(`${URL}/team/getfreelancercomments.php`, {
          freelancer_id: id,
        })
        .then((res) => {
          console.log(res);
          setFreelancerData(res?.data);
          setPmId(res?.data?.map((item) => item?.commenter[1]));
        })
        .catch((err) => {
          console.log(err);
        });
    getComments();
  }, []);

  useEffect(() => {
    //for mapping multiple
    const getPmDetails = async (pmIds) => {
      const requests = pmIds.map((pmId) =>
        axios.get(`${URL}/team/pmdetails.php?pm_id=${pmId}`)
      );

      await Promise.all(requests)
        .then((responses) => {
          const teamData = responses.map((res) => res?.data);
          setTeamData(teamData);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getPmDetails(pmId);
  }, [pmId]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const editorContent = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );
  const handlePostComment = async () => {
    setLoading(true);

    const data = {
      freelancer_id: id,
      team_role: auth?.role,
      team_id: auth?.teamData.id,
      title: title,
      comment: editorContent,
    };

    if (!title) {
      toast.error("Please Enter The Title");
      setLoading(false);
      return;
    }
    if (editorContent === "<p></p>\n") {
      toast.error("Please Enter Comment");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${URL}/team/addfreelancercomments.php`,
        data
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Comment added successfully");
        setEditorState(EditorState.createEmpty());
        setTitle("");
        getComments();
      } else {
        toast.error("Comment Adding Failed");
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const paginatedComments = applyPagination(freelancerData, page, limit);

  const teams = teamData?.map((item) => item[0]?.name);

  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <div className="comment">
        <div className="">
          <CardHeader
            title="Previous Comments"
            className="text-[#141B41] font-bolder bg-[#918EF4]"
          />
          <Divider />

          {/* Table Format Comment Display*/}

          <Box sx={{ padding: "10px" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="w-[5%]">ID</TableCell>
                    <TableCell className="w-[15%]">Comment Title</TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell className="w-[10%]">Commenter</TableCell>
                    <TableCell>Commented On</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedComments?.length > 0
                    ? paginatedComments?.map((user, index) => {
                        const isCommentSelected = selectedComments?.includes(
                          user?.id
                        );
                        const commenter = teams?.length > 0 ? teams[index] : "";

                        return (
                          <TableRow
                            hover
                            key={user?.id}
                            selected={isCommentSelected}
                          >
                            <TableCell style={{ verticalAlign: "baseline" }}>
                              <Typography
                                component="a"
                                variant="body1"
                                fontWeight="bold"
                                gutterBottom
                                noWrap
                                sx={{
                                  cursor: "pointer",
                                }}
                                color="#3f51b5"
                              >
                                {user?.comment_id}
                              </Typography>
                            </TableCell>
                            <TableCell style={{ verticalAlign: "baseline" }}>
                              <Typography
                                component="a"
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                              >
                                {user?.title}
                              </Typography>
                            </TableCell>
                            <TableCell style={{ verticalAlign: "baseline" }}>
                              <div
                                className="w-[100%] customcss  flex flex-col gap-10"
                                dangerouslySetInnerHTML={{
                                  __html: user?.comment,
                                }}
                              />
                            </TableCell>
                            <TableCell style={{ verticalAlign: "baseline" }}>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                {commenter}
                              </Typography>
                            </TableCell>
                            <TableCell style={{ verticalAlign: "baseline" }}>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                {moment(user?.commented_on).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <TablePagination
                component="div"
                count={freelancerData?.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25, 30, 50, 75, 100, 200]}
              />
            </Box>
          </Box>
        </div>
        <div>
          <CardHeader
            title="Post Your Comment"
            className="text-[#141B41] font-bolder bg-[#918EF4] rounded-t-lg"
          />
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              padding: "15px",
            }}
          >
            <Typography variant="h4" className="font-bold">
              Enter Your Title
            </Typography>
            <TextField
              type="text"
              name="title"
              ref={titleFocus}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <div className="mt-2" style={{ background: "#fff" }}>
              <Editor
                editorStyle={editorStyle}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                toolbarStyle={{
                  color: "black",
                  width: "90%",
                  background: "#fff",
                }}
              />
            </div>
            <LoadingButton
              variant="outlined"
              disabled={!title || editorContent !== "<p></p>\n"}
              onClick={handlePostComment}
              className="bg-blue618 mt-8 w-[200px] hover:bg-blue618"
            >
              {loading ? <CircularProgress /> : "Save Now"}
            </LoadingButton>
          </Box>
        </div>
      </div>
    </Card>
  );
};

export default Comment;
