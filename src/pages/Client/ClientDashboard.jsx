import { Tab } from "@headlessui/react";
import React from "react";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { URL } from "~/utils/BaseURL";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from "@mui/material ";
import {
  Badge,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { format } from "date-fns";
import {
  useGetPersonalDetailsMutation,
  useGetAssignmentsMutation,
} from "~/features/student/studentApiSlice";
import {
  LucideAtSign,
  LucideEdit,
  LucideCheck,
  LucidePhone,
  LucideLogOut,
  LucideCheckCircle,
  LucideCircle,
  LucideX,
  LucideFlag,
  LucideMessageCircle,
  LucideQuote,
  BookOpenCheck,
  Copy,
  Clipboard,
} from "lucide-react";

import Premium from "~/assets/premium/select.png";

import { ChatContext } from "~/context/ChatContext";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { Helmet } from "react-helmet-async";
import moment from "moment";
import { CopyAll } from "@mui/icons-material";
import { ClipboardList } from "lucide-react";
import { ClipboardCheck } from "lucide-react";

const validationSchema = Yup.object({
  old_password: Yup.string().required("Required"),
  new_password: Yup.string().required("Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .required("Required"),
});

function Stepper(assStatus) {
  return (
    <>
      <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm md:text-2xl text-white ">
        {assStatus === "Error" ? (
          <span className="bg-red-500 rounded-3xl px-2">
            <span className="pr-2">Error</span>
            <span className="">Please contact admin</span>
          </span>
        ) : null}
        {assStatus === "Posted" ? (
          <span className=" bg-blue-500 rounded-3xl px-2">Posted</span>
        ) : null}
        {assStatus === "Under Process" ? (
          <span className="bg-yellow-500 rounded-3xl px-2">Under Process</span>
        ) : null}
        {assStatus === "Assigned to Project Manager" ? (
          <span className="bg-purple-500 rounded-3xl px-2">
            Assigned to Project Manager
          </span>
        ) : null}
        {assStatus === "Assigned to Freelancer" ? (
          <span className="bg-orange-500 rounded-3xl px-2">
            Assigned to Freelancer
          </span>
        ) : null}
        {assStatus === "Completed" ? (
          <span className="bg-green-500 rounded-3xl px-2">Completed</span>
        ) : null}
        {assStatus === "Reviewed" ? (
          <span className="bg-pink-500 rounded-3xl px-2">Reviewed</span>
        ) : null}
      </ol>
    </>
  );
}

export default function ClientDashboard() {
  const { studentAllChats, chatLoading } = useContext(ChatContext);

  const [totalUnReadMessages, setTotalUnReadMessages] = useState(null);

  useEffect(() => {
    const filteredMessages =
      Array.isArray(studentAllChats) &&
      studentAllChats?.reduce((acc, item) => {
        return acc + item?.unread_messages;
      }, 0);
    setTotalUnReadMessages(filteredMessages);
  }, [studentAllChats]);

  const navigate = useNavigate();
  const auth = useSelector(selectAuth);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState({
    account: false,
    type: false,
  });

  const [existingData, setExistingData] = useState({
    firstname: "",
    lastname: "",
    date_of_birth: "",
    address: "",
  });

  const [loadingEdit, setLoadingEdit] = useState({
    firstname: false,
    lastname: false,
    date_of_birth: false,
    address: false,
    confirm_password: false,
  });

  const [edit, setEdit] = useState({
    firstname: false,
    lastname: false,
    date_of_birth: false,
    address: false,
  });

  const handleClickOpen = (value) => {
    if (value === "account") {
      setOpen((prev) => ({ ...prev, account: true }));
    } else if (value === "type") {
      setOpen((prev) => ({ ...prev, type: true }));
    }
  };

  const handleClose = () => {
    setOpen((prev) => ({
      ...prev,
      account: false,
      type: false,
    }));
  };

  const handleCancel = (values) => {
    if (values == "account") {
      setOpen((prev) => ({ ...prev, account: false }));
    } else if (values === "type") {
      setOpen((prev) => ({ ...prev, type: false }));
    }
  };

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    onSubmit: async (values, action) => {
      const passwordData = {
        id: auth?.id,
        old_password: values.old_password,
        new_password: values.new_password,
      };

      setLoading(true);

      await axios
        .put(`${URL}/student/changepassword.php`, passwordData)
        .then((res) => {
          setLoading(false);
          if (res?.data?.status === "success") {
            toast.success(res?.data?.message);
            action.resetForm();
            handleClose();
          } else {
            toast.error(res?.data?.message);
          }
        });
    },
    validationSchema: validationSchema,
  });

  const [
    getAssignmentData,
    { isLoading: assignmentLoading, data: assignmentData },
  ] = useGetAssignmentsMutation();

  const [sendData, { isLoading, isError, data: personalDetailsData, error }] =
    useGetPersonalDetailsMutation();

  useEffect(() => {
    sendData(auth?.id);
    getAssignmentData(auth?.id);
  }, []);

  useEffect(() => {
    if (personalDetailsData) {
      setExistingData((prev) => ({
        ...prev,
        firstname: personalDetailsData.firstname || "",
        lastname: personalDetailsData.lastname || "",
        date_of_birth: personalDetailsData.date_of_birth || "",
        address: personalDetailsData.address || "",
      }));
    }
  }, [personalDetailsData]);

  const handleChange = (e) => {
    e.preventDefault();

    setEdit((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));

    if (e.target.name === "date_of_birth") {
      const formattedDate = format(new Date(e.target.value), "dd-mm-yyyy");
      setExistingData((prev) => ({ ...prev, date_of_birth: formattedDate }));
    } else {
      setExistingData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleEditFirstName = async () => {
    setLoadingEdit((prev) => ({ ...prev, firstname: true }));
    try {
      const { data } = await axios.post(`${URL}/student/editfirstname.php`, {
        user_id: auth?.id,
        first_name: existingData?.firstname,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, firstname: false }));
        setLoadingEdit((prev) => ({ ...prev, firstname: false }));
        sendData(auth?.id);
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, firstname: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, firstname: false }));
    }
  };

  const handleEditLastName = async () => {
    setLoadingEdit((prev) => ({ ...prev, lastname: true }));
    try {
      const { data } = await axios.post(`${URL}/student/editlastname.php`, {
        user_id: auth?.id,
        last_name: existingData?.lastname,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, lastname: false }));
        setLoadingEdit((prev) => ({ ...prev, lastname: false }));
        sendData(auth?.id);
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, lastname: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, firstname: false }));
    }
  };

  const handleEditDOB = async () => {
    setLoadingEdit((prev) => ({ ...prev, date_of_birth: true }));
    try {
      const { data } = await axios.post(`${URL}/student/editdateofbirth.php`, {
        user_id: auth?.id,
        date_of_birth: existingData?.date_of_birth,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, date_of_birth: false }));
        setLoadingEdit((prev) => ({ ...prev, date_of_birth: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, date_of_birth: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, date_of_birth: false }));
    }
  };

  const handleEditAddress = async () => {
    setLoadingEdit((prev) => ({ ...prev, address: true }));
    try {
      const { data } = await axios.post(`${URL}/student/editaddress.php`, {
        user_id: auth?.id,
        address: existingData?.address,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, address: false }));
        setLoadingEdit((prev) => ({ ...prev, firstname: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, address: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, address: false }));
    }
  };

  // ---------------- Assignment Edit  ------------------ //

  const [assData, setAssData] = useState({
    assignment_id: null,
    assignment_title: null,
    assignment_budget: null,
    assignment_submission_date: null,
    assignment_deadline: null,
    assignment_level: null,
    assignment_type: null,
    assignment_description: null,
    assignment_status: null,
  });

  const [loadingAssEdit, setLoadingAssEdit] = useState({
    assignment_title: false,
    assignment_budget: false,
    assignment_submission_date: false,
    assignment_deadline: false,
    assignment_level: false,
    assignment_course: false,
    assignment_type: false,
    assignment_description: false,
  });

  const [editass, setEditAss] = useState({
    assignment_title: false,
    assignment_budget: false,
    assignment_submission_date: false,
    assignment_deadline: false,
    assignment_level: false,
    assignment_type: false,
    assignment_description: false,
  });

  const [editIndex, setEditIndex] = useState({
    assignment_title: null,
    assignment_budget: null,
    assignment_submission_date: null,
    assignment_deadline: null,
    assignment_level: null,
    assignment_type: null,
    assignment_description: null,
  });
  const [currentId, setCurrentId] = useState(null);

  const handleEdit = (name) => {
    setEditAss((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  const handleEditTitle = async (assignment_id) => {
    setLoadingAssEdit((prev) => ({ ...prev, assignment_title: true }));
    try {
      const { data } = await axios.post(`${URL}/student/edittitle.php`, {
        assignment_id: assignment_id,
        title: assData?.assignment_title,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEditAss((prev) => ({ ...prev, assignment_title: false }));
        setLoadingAssEdit((prev) => ({ ...prev, assignment_title: false }));
        getAssignmentData(auth?.id);
      } else {
        toast.error(data?.message);
        setLoadingAssEdit((prev) => ({ ...prev, assignment_title: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingAssEdit((prev) => ({ ...prev, assignment_title: false }));
    }
  };
  const handleEditBudget = async (assignment_id) => {
    setLoadingAssEdit((prev) => ({ ...prev, assignment_budget: true }));
    try {
      const { data } = await axios.post(`${URL}/student/editbudget.php`, {
        assignment_id: assignment_id,
        budget: assData?.assignment_budget,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEditAss((prev) => ({ ...prev, assignment_budget: false }));
        setLoadingAssEdit((prev) => ({ ...prev, assignment_budget: false }));
        getAssignmentData(auth?.id);
      } else {
        toast.error(data?.message);
        setLoadingAssEdit((prev) => ({ ...prev, assignment_budget: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingAssEdit((prev) => ({ ...prev, assignment_budget: false }));
    }
  };
  const handleEditDeadline = async (assignment_id) => {
    setLoadingAssEdit((prev) => ({ ...prev, assignment_deadline: true }));
    try {
      const { data } = await axios.post(`${URL}/student/editdeadline.php`, {
        assignment_id: assignment_id,
        deadline: assData?.assignment_deadline,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEditAss((prev) => ({ ...prev, assignment_deadline: false }));
        setLoadingAssEdit((prev) => ({ ...prev, assignment_deadline: false }));
        getAssignmentData(auth?.id);
      } else {
        toast.error(data?.message);
        setLoadingAssEdit((prev) => ({ ...prev, assignment_deadline: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingAssEdit((prev) => ({ ...prev, assignment_deadline: false }));
    }
  };
  const handleEditLevel = async (assignment_id) => {
    setLoadingAssEdit((prev) => ({ ...prev, assignment_level: true }));

    try {
      const { data } = await axios.post(`${URL}/student/editlevel.php`, {
        assignment_id: assignment_id,
        level: assData?.assignment_level,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEditAss((prev) => ({ ...prev, assignment_level: false }));
        setLoadingAssEdit((prev) => ({ ...prev, assignment_level: false }));
        getAssignmentData(auth?.id);
      } else {
        toast.error(data?.message);
        setLoadingAssEdit((prev) => ({ ...prev, assignment_level: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingAssEdit((prev) => ({ ...prev, assignment_level: false }));
    }
  };
  const handleEditType = async (assignment_id) => {
    setLoadingAssEdit((prev) => ({ ...prev, assignment_type: true }));

    try {
      const { data } = await axios.post(`${URL}/student/edittype.php`, {
        assignment_id: assignment_id,
        type: assData.assignment_type,
      });
      if (data?.status === 200) {
        toast.success(data?.message);

        setEditAss((prev) => ({ ...prev, assignment_type: false }));
        setLoadingAssEdit((prev) => ({ ...prev, assignment_type: false }));

        getAssignmentData(auth?.id);
        handleClose();
      } else {
        toast.error(data?.message);
        setLoadingAssEdit((prev) => ({ ...prev, assignment_type: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingAssEdit((prev) => ({ ...prev, assignment_type: false }));
    }
  };
  const handleEditDesc = async (assignment_id) => {
    setLoadingAssEdit((prev) => ({ ...prev, assignment_description: true }));
    try {
      const { data } = await axios.post(`${URL}/student/editdescription.php`, {
        assignment_id: assignment_id,
        description: assData?.assignment_description,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEditAss((prev) => ({ ...prev, assignment_description: false }));
        setLoadingAssEdit((prev) => ({
          ...prev,
          assignment_description: false,
        }));
        getAssignmentData(auth?.id);
      } else {
        toast.error(data?.message);
        setLoadingAssEdit((prev) => ({
          ...prev,
          assignment_description: false,
        }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingAssEdit((prev) => ({ ...prev, assignment_description: false }));
    }
  };

  const relevantLevelOfAssignment = [
    "Diploma",
    "Bachelors",
    "Masters",
    "PhD",
    "Mphil",
    "Other",
  ];

  const relevantAcademic = [
    "Essay Writing",
    "Report Writing",
    "Literature Review",
    "Dissertation Writing",
    "Black Book",
    "Research Paper",
    "Review Article",
    "Thesis Writing",
    "PPT Making",
    "Case Studies",
    "Question & Answer ",
  ];

  const relevantProgramming = ["Software", "Hardware"];

  const relevantProfessional = [
    "Letter of Recommendation",
    "Statement of Purpose",
    "Resume / CV",
    "Cover Letter",
  ];

  const [assignmentType, setAssignmentType] = useState(null);

  const [relevantType, setRelevantType] = useState(null);

  useEffect(() => {
    if (assignmentType === "Programming") {
      setRelevantType(relevantProgramming);
    } else if (assignmentType === "Academic Writing") {
      setRelevantType(relevantAcademic);
    } else if (assignmentType === "Professional Writing") {
      setRelevantType(relevantProfessional);
    }
  }, [assignmentType]);

  const [checkBoxes, setCheckBoxes] = useState(null);

  const handleCurrentType = (type) => {
    setCheckBoxes(type);
  };
  useEffect(() => {
    setAssData((prev) => ({ ...prev, assignment_type: checkBoxes }));
  }, [checkBoxes]);

  // console.log(personalDetailsData);

  // ---------------- Referral Section -------------------- //

  const [copied, setCopied] = useState(false);

  function copyTextFn(message) {
    var copyText = document.getElementById("referral_code");

    navigator.clipboard.writeText(copyText.textContent);

    toast.success("Copied!");
    setCopied(true);
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Dialog open={open.account} onClose={handleClose}>
        <DialogTitle>Update Account Details</DialogTitle>
        <DialogContent component="form">
          <DialogContentText>Update Your Personal Details.</DialogContentText>
          <TextField
            value={existingData.firstname}
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="firstname"
            name="firstname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {edit.firstname &&
                    (loadingEdit.firstname ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Button
                        disabled={loadingEdit.firstname}
                        type="submit"
                        onClick={handleEditFirstName}
                        color="primary"
                      >
                        Save
                      </Button>
                    ))}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={existingData.lastname}
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="lastname"
            name="lastname"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {edit.lastname &&
                    (loadingEdit.lastname ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Button
                        disabled={loadingEdit.lastname}
                        type="submit"
                        onClick={handleEditLastName}
                        color="primary"
                      >
                        Save
                      </Button>
                    ))}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={existingData.date_of_birth}
            onChange={(e) =>
              setExistingData({
                ...existingData,
                date_of_birth: e.target.value,
              })
            }
            autoFocus
            margin="dense"
            id="date_of_birth"
            name="date_of_birth"
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {loadingEdit.date_of_birth ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Button
                      disabled={loadingEdit.date_of_birth}
                      type="submit"
                      onClick={handleEditDOB}
                      color="primary"
                    >
                      Save
                    </Button>
                  )}
                </InputAdornment>
              ),
            }}
          />

          <TextField
            value={existingData.address}
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="address"
            name="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {edit.address &&
                    (loadingEdit.address ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Button
                        disabled={loadingEdit.address}
                        type="submit"
                        onClick={handleEditAddress}
                        color="primary"
                      >
                        Save
                      </Button>
                    ))}
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />

          {auth?.code === 93 ? null : (
            <>
              <DialogContentText>Update Your Password.</DialogContentText>

              <TextField
                value={formik.values.old_password}
                onChange={formik.handleChange("old_password")}
                onBlur={formik.handleBlur}
                autoFocus
                margin="dense"
                id="old_password"
                label="Old Password"
                type="password"
                fullWidth
                variant="standard"
              />
              <TextField
                value={formik.values.new_password}
                onChange={formik.handleChange("new_password")}
                onBlur={formik.handleBlur}
                margin="dense"
                id="new_password"
                label="New Password"
                type="password"
                fullWidth
                variant="standard"
              />
              <TextField
                error={
                  formik.touched.confirm_password &&
                  Boolean(formik.errors.confirm_password)
                }
                value={formik.values.confirm_password}
                onChange={formik.handleChange("confirm_password")}
                onBlur={formik.handleBlur}
                margin="dense"
                id="confirm_password"
                label="Confirm New Password"
                type="text"
                fullWidth
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {formik.values.new_password ===
                        formik.values.confirm_password &&
                        formik.values.confirm_password &&
                        (loadingEdit.confirm_password ? (
                          <CircularProgress size={24} />
                        ) : (
                          <Button
                            disabled={loadingEdit.confirm_password}
                            type="submit"
                            onClick={formik.handleSubmit}
                            color="primary"
                          >
                            Save
                          </Button>
                        ))}
                    </InputAdornment>
                  ),
                }}
              />
              {formik.errors.confirm_password &&
              formik.touched.confirm_password ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.confirm_password}
                </p>
              ) : null}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel("account")}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open.type} onClose={handleClose} maxWidth="md">
        <DialogTitle>Update Type</DialogTitle>
        <DialogContent component="form">
          Assignment Type:
          <fieldset className="flex flex-wrap items-center justify-center w-full gap-5 py-8">
            {relevantType?.map((item, i) => {
              const isChecked = checkBoxes?.includes(item);
              const color = isChecked ? "blue141" : "gray-900";
              return (
                <div key={i}>
                  <input
                    type="checkbox"
                    name={item}
                    value={item}
                    id={item}
                    className="peer hidden"
                    checked={isChecked}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckBoxes([...checkBoxes, e.target.value]);
                        setAssData((prev) => ({
                          ...prev,
                          assignment_type: [
                            ...prev.assignment_type,
                            e.target.value,
                          ],
                        }));
                      } else {
                        setCheckBoxes(
                          checkBoxes.filter((box) => box !== e.target.value)
                        );
                        setAssData((prev) => ({
                          ...prev,
                          assignment_type: prev.assignment_type.filter(
                            (box) => box !== e.target.value
                          ),
                        }));
                      }
                    }}
                  />
                  <label
                    htmlFor={item}
                    className={`flex items-center justify-center gap-2 px-3 py-2 text-${color} border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 ${
                      isChecked
                        ? ` border-${color}  bg-${color}  text-white`
                        : ""
                    }`}
                  >
                    {isChecked ? (
                      <LucideCheckCircle size={20} />
                    ) : (
                      <LucideCircle size={20} />
                    )}
                    <p className="text-sm font-medium">{item}</p>
                  </label>
                </div>
              );
            })}
          </fieldset>
        </DialogContent>
        <DialogActions sx={{ marginBottom: "12px" }}>
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: "#2956A8",
            }}
            variant="contained"
            disabled={loading}
            onClick={() => handleEditType(currentId)}
          >
            Update
          </Button>
          <Button onClick={() => handleCancel("type")}>Close</Button>
        </DialogActions>
      </Dialog>

      <div className=" ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        <div className="w-full px-6 py-6 mx-auto text-slate-500 ">
          <div
            className={`relative flex flex-col  flex-auto min-w-0 p-4 mb-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl ${
              personalDetailsData?.is_select === "1" ? "goldCard" : "bg-white"
            }  bg-clip-border`}
          >
            <span className="absolute inset-x-0 bottom-0 w-full h-2 "></span>
            <div className="flex flex-col items-center justify-center md:flex-row ">
              <div className="w-full p-3 mx-10 mt-6">
                <h3 className="text-2xl font-bold text-gray-900 flex justify-between">
                  <span>Your ID : {auth?.id} </span>
                  <div
                    className="md:inline-flex rounded-md shadow-sm hidden "
                    role="group"
                  >
                    <button
                      onClick={() => handleClickOpen("account")}
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-100 border border-gray-600 rounded-lg hover:bg-gray-200     "
                      id="personal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 mr-2 fill-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                        />
                      </svg>
                      Edit Account Details
                    </button>
                  </div>
                </h3>

                <div
                  className={`flex flex-col gap-2  w-full mt-2 md:flex-row ${
                    personalDetailsData?.is_select === "1"
                      ? "goldCard"
                      : "bg-white"
                  } rounded-xl`}
                >
                  <div className="flex w-full flex-col justify-between p-8 transition-shadow  shadow-xl group rounded-xl hover:shadow-lg bg-white">
                    <h3 className="flex flex-wrap justify-between items-start gap-2 mb-2 text-4xl font-semibold leading-normal text-black">
                      <div className="flex items-center gap-2">
                        <span className="capitalize">
                          {personalDetailsData?.firstname}
                        </span>{" "}
                        <span className="pl-2 capitalize">
                          {personalDetailsData?.lastname}
                        </span>{" "}
                      </div>
                      <div className="flex md:flex-col flex-col text-black items-start md:items-end justify-end gap-3 cursor-pointer">
                        <Tooltip title="Copy Code">
                          <span
                            className="flex text-xl items-center gap-2"
                            style={{ color: "black" }}
                          >
                            Affiliate Code :&nbsp;&nbsp;
                            <span
                              className="flex text-xl items-center gap-2 font-bold"
                              onClick={copyTextFn}
                              id="referral_code"
                            >
                              <ClipboardList className="hover:text-black " />{" "}
                              &nbsp;{personalDetailsData?.affiliate_code}
                            </span>
                          </span>
                        </Tooltip>
                        <button
                          sx={{ fontSize: "10px" }}
                          className="flex items-center gap-2 justify-center mt-3  px-3 py-2 mb-3 text-lg font-semibold text-white bg-gradient-to-r from-yellow-300 via-red-500 to-orange-600  rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                          onClick={() => navigate("/affiliates")}
                        >
                          View Affiliate
                        </button>
                      </div>
                      {/* <LucideEdit size={20} className="mx-1" /> */}
                    </h3>
                    <div className="flex items-center gap-2 mt-10 mb-2 text-black">
                      <LucideAtSign size={20} className="mx-1" />
                      {personalDetailsData?.email}
                      {/* <LucideEdit size={20} className="mx-1" /> */}
                    </div>
                    <div className="flex items-center gap-2 mb-2 text-black">
                      <LucidePhone size={20} className="mx-1" />
                      +91 {personalDetailsData?.number}
                      {/* <LucideEdit size={20} className="mx-1" />
                      <LucideCheck size={20} className="mx-1" /> */}
                    </div>

                    <br />
                    <div
                      className=" flex flex-col items-center justify-center gap-2 md:hidden rounded-md shadow-sm"
                      role="group"
                    >
                      <button
                        onClick={() => handleClickOpen("account")}
                        type="button"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-100 border border-gray-600 rounded-lg hover:bg-gray-200  focus:z-10 focus:ring-2 focus:ring-gray-700 focus:text-gray-700  "
                        id="personal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 mr-2 fill-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                          />
                        </svg>
                        Edit Account Details
                      </button>
                    </div>
                  </div>

                  <div className=" bg-white w-full max-w-full  shadow-2xl rounded-xl lg-max:mt-6 xl:w-4/12">
                    <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                      <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                        <div className="flex flex-wrap ">
                          <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-full justify-between md:flex-none">
                            {personalDetailsData?.is_select !== "1" && (
                              <h6 className="mb-0">Assignment Stats</h6>
                            )}

                            {/* <span className="pl-2 "> 
                              <img src={Premium} className="h-8 w-8" />
                            </span> */}
                            {personalDetailsData?.is_select === "1" && (
                              <h4 className="flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white goldCard rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none">
                                SELECT
                              </h4>
                            )}
                          </div>
                        </div>
                        <hr className="h-px my-4 bg-transparent bg-gradient-horizontal-light" />

                        {personalDetailsData?.expiry_date && (
                          <div>
                            <span className="font-bold">
                              SELECT Expiry Date :{" "}
                            </span>
                            {moment(
                              personalDetailsData?.expiry_date,
                              "DD-MM-YYYY HH:mm:ss"
                            ).format("Do MMMM YYYY")}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-start justify-start  pl-2  bg-white  ">
                        <strong className="text-blue141  flex items-center justify-start">
                          <div className="flex items-center justify-start text-left px-3">
                            <span className="text-sm text-gray-500">
                              Total Assignments
                            </span>
                            <span className="text-sm text-blue141 px-2 py-4">
                              {personalDetailsData?.total_assignments_count}
                            </span>
                          </div>
                        </strong>
                        <button
                          onClick={() => navigate("/submit")}
                          className="flex items-center justify-center  px-4 py-2 mb-3 text-sm font-semibold text-white bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                        >
                          <LucideLogOut size={20} className="mx-1" />
                          Post Your Requirement
                        </button>
                        <button
                          className="flex items-center justify-center mt-3  px-3 py-2 mb-3 text-sm font-semibold text-white bg-green-400  rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                          onClick={() => navigate("/plagreport")}
                        >
                          <LucideFlag size={20} className="mx-1" />
                          My Plagiarism Reports
                        </button>
                        <button
                          className="flex items-center gap-2 justify-center mt-3  px-3 py-2 mb-3 text-sm font-semibold text-white bg-[#e58833]  rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                          onClick={() => navigate("/submit/plagiarism-check")}
                        >
                          <BookOpenCheck size={20} className="mx-1" />
                          Quick Plagiarism Check
                        </button>
                        <br />

                        {Array.isArray(studentAllChats) &&
                        studentAllChats?.length > 0 ? (
                          <Badge
                            badgeContent={
                              totalUnReadMessages > 99
                                ? "99+"
                                : totalUnReadMessages
                            }
                            color="secondary"
                            className="mb-3"
                          >
                            <button
                              className="flex items-center justify-center  px-3 py-2 mb-3 text-sm font-semibold text-white bg-[#e58833]  rounded-lg md:w-auto   md:mb-0 focus:outline-none"
                              onClick={() => navigate("/chats")}
                            >
                              <LucideMessageCircle size={20} className="mx-1" />
                              Chats
                            </button>
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:max-w-7xl md:mx-auto">
        {assignmentData?.map((a, index) => {
          const defaultTypes = Array.isArray(a.assignment_type)
            ? a.assignment_type
            : [];

          const fetchedTypes = Array.isArray(assData.assignment_type)
            ? assData.assignment_type
            : [];

          let status = [];
          status.push(a.assignment_status);

          return (
            <div
              key={a?.assignment_id}
              className="flex flex-col  md:max-w-7xl md:mx-auto  px-4 py-6  "
            >
              <Tab.Group>
                <Tab.List className="flex list-none   text-sm font-medium text-center  border-b  rounded-t-lg bg-gray-50 border-gray-700 text-gray-400 ">
                  <Tab>
                    <li className="mr-2">
                      <button
                        id="about-tab"
                        data-tabs-target="#about"
                        type="button"
                        role="tab"
                        aria-controls="about"
                        className="inline-block p-4 hover:text-gray-600  "
                      >
                        About
                      </button>
                    </li>
                  </Tab>

                  <Tab>
                    {" "}
                    <li className="mr-2">
                      <button
                        id="services-tab"
                        data-tabs-target="#services"
                        type="button"
                        role="tab"
                        aria-controls="services"
                        aria-selected="false"
                        className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 "
                      >
                        Contact
                      </button>
                    </li>
                  </Tab>

                  <Tab>
                    <li className="mr-2">
                      <button
                        id="statistics-tab"
                        data-tabs-target="#statistics"
                        type="button"
                        role="tab"
                        aria-controls="statistics"
                        aria-selected="false"
                        className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 "
                      >
                        Review
                      </button>
                    </li>
                  </Tab>
                </Tab.List>

                <Tab.Panels>
                  <Tab.Panel>
                    <div
                      className={`max-w-7xl mx-auto p-4 bg-white rounded-lg md:p-8 `}
                      id="about"
                    >
                      <span className="items-center justify-center text-sm bg-blue-500 rounded-full px-2 text-white">
                        <span className="p-2">Id: #{a?.assignment_id}</span>
                      </span>
                      <div className="mb-2 flex">
                        <li className="flex space-x-2">
                          <span className="leading-tight">
                            {`Assignment Status: `}{" "}
                            <span className=" p-2  text-md">
                              {a?.assignment_status
                                ? Stepper(a?.assignment_status)
                                : Stepper("Error")}
                            </span>
                          </span>
                        </li>
                      </div>
                      {a.assignment_title != "NULL" && (
                        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 flex items-center   gap-5">
                          {editass.assignment_title &&
                          editIndex.assignment_title === index ? (
                            <input
                              className="rounded-xl focus:border-[#918ef4] bg-transparent  block w-[100%] px-2 py-2  leading-tight border border-gray-300 rounded appearance-none text-white-700 focus:outline-none "
                              placeholder="Title"
                              defaultValue={a.assignment_title}
                              value={
                                editIndex.assignment_title === index &&
                                assData.assignment_title
                              }
                              onChange={(e) => {
                                setAssData((prev) => ({
                                  ...prev,
                                  assignment_title: e.target.value,
                                }));
                              }}
                              id="assignment_title"
                              label="Assignment Title"
                              type="text"
                            />
                          ) : editIndex.assignment_title === index ? (
                            assData?.assignment_title || a.assignment_title
                          ) : (
                            a.assignment_title
                          )}
                          {status.includes("Assigned to Project Manager") ||
                          status.includes("Posted") ||
                          status.includes("Under Process") ? (
                            editass.assignment_title &&
                            editIndex.assignment_title === index ? (
                              <>
                                <span
                                  className="cursor-pointer bg-green-500 rounded-xl font-bold text-[1rem]"
                                  onClick={() => {
                                    handleEditTitle(a.assignment_id);
                                    handleEdit("assignment_title");
                                    setEditIndex((prev) => ({
                                      ...prev,
                                      assignment_title: index,
                                    }));
                                  }}
                                >
                                  <LucideCheck color="white" size="20" />
                                </span>
                                <span
                                  className="cursor-pointer bg-red-500 rounded-xl font-bold text-[1rem]"
                                  onClick={() => {
                                    handleEdit("assignment_title");
                                    setAssData((prev) => ({
                                      ...prev,
                                      assignment_title: a.assignment_title,
                                    }));
                                  }}
                                >
                                  <LucideX size="20" color="white" />
                                </span>
                              </>
                            ) : (
                              <span
                                className="cursor-pointer"
                                onClick={() => {
                                  handleEdit("assignment_title");
                                  setEditIndex((prev) => ({
                                    ...prev,
                                    assignment_title: index,
                                  }));
                                  setAssData((prev) => ({
                                    ...prev,
                                    assignment_title: a.assignment_title,
                                  }));
                                }}
                              >
                                <LucideEdit size="20" />
                              </span>
                            )
                          ) : null}
                        </h2>
                      )}
                      <ul role="list" className="space-y-4 text-gray-500 ">
                        <li className="flex items-center gap-2">
                          <svg
                            className="flex-shrink-0 w-4 h-4 text-blue-600 "
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="leading-tight flex items-center gap-5 flex-wrap">
                            Budget: ₹
                            {editass.assignment_budget &&
                            editIndex.assignment_budget === index ? (
                              <input
                                className="rounded-xl focus:border-[#918ef4] bg-transparent  block w-[8rem] px-2 py-2  leading-tight border border-gray-300 rounded appearance-none text-white-700 focus:outline-none "
                                placeholder="Budget"
                                defaultValue={a.assignment_budget}
                                value={
                                  editIndex.assignment_budget === index &&
                                  assData.assignment_budget
                                }
                                onChange={(e) => {
                                  setAssData((prev) => ({
                                    ...prev,
                                    assignment_budget: e.target.value,
                                  }));
                                }}
                              />
                            ) : editIndex.assignment_budget === index ? (
                              assData?.assignment_budget || a.assignment_budget
                            ) : (
                              a.assignment_budget
                            )}
                            {status.includes("Assigned to Project Manager") ||
                            status.includes("Posted") ||
                            status.includes("Under Process") ? (
                              editass.assignment_budget &&
                              editIndex.assignment_budget === index ? (
                                <>
                                  <span
                                    className="cursor-pointer bg-green-500 rounded-xl font-bold text-[1rem]"
                                    onClick={() => {
                                      handleEditBudget(a?.assignment_id);
                                      handleEdit("assignment_budget");
                                      setEditIndex((prev) => ({
                                        ...prev,
                                        assignment_budget: index,
                                      }));
                                    }}
                                  >
                                    <LucideCheck size="20" color="white" />
                                  </span>
                                  <span
                                    className="cursor-pointer bg-red-500 rounded-xl font-bold text-[1rem]"
                                    onClick={() => {
                                      handleEdit("assignment_budget");
                                      setAssData((prev) => ({
                                        ...prev,
                                        assignment_budget: a.assignment_budget,
                                      }));
                                    }}
                                  >
                                    <LucideX size="20" color="white" />
                                  </span>
                                </>
                              ) : (
                                <span
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleEdit("assignment_budget");
                                    setEditIndex((prev) => ({
                                      ...prev,
                                      assignment_budget: index,
                                    }));
                                    setAssData((prev) => ({
                                      ...prev,
                                      assignment_budget: a.assignment_budget,
                                    }));
                                  }}
                                >
                                  <LucideEdit size="20" />
                                </span>
                              )
                            ) : null}
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <svg
                            className="flex-shrink-0 w-4 h-4 text-blue-600 "
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="leading-tight flex items-center gap-5">
                            Posted on:&nbsp;
                            {a?.assignment_submission_date}
                          </span>
                        </li>
                        <li className="flex  items-center gap-2">
                          <svg
                            className="flex-shrink-0 w-4 h-4 text-blue-600 "
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="leading-tight flex items-center gap-5">
                            Deadline:&nbsp;
                            {editass.assignment_deadline &&
                            editIndex.assignment_deadline === index ? (
                              <LocalizationProvider dateAdapter={AdapterMoment}>
                                <MobileDateTimePicker
                                  label="Deadline for the assignment"
                                  value={
                                    editIndex.assignment_deadline === index
                                      ? assData?.assignment_deadline ||
                                        a.assignment_deadline
                                      : a.assignment_deadline
                                  }
                                  minDate={new Date()}
                                  onChange={(newValue) => {
                                    setAssData((prev) => ({
                                      ...prev,
                                      assignment_deadline: format(
                                        new Date(newValue),
                                        "yyyy-MM-dd HH:mm"
                                      ),
                                    }));
                                  }}
                                  renderInput={(params) => (
                                    <FormControl
                                      variant="outlined"
                                      required
                                      sx={{
                                        width: "100%",
                                      }}
                                    >
                                      {" "}
                                      <InputLabel htmlFor="outlined-adornment-name">
                                        Deadline
                                      </InputLabel>
                                      <OutlinedInput
                                        sx={{
                                          borderRadius: "15px",
                                          height: "40px",
                                        }}
                                        {...params}
                                        placeholder="Enter the budget of your Assignment in INR"
                                        label="Deadline for the assignment"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </LocalizationProvider>
                            ) : editIndex.assignment_deadline === index ? (
                              assData?.assignment_deadline ||
                              a.assignment_deadline
                            ) : (
                              a.assignment_deadline
                            )}
                            {status.includes("Assigned to Project Manager") ||
                            status.includes("Posted") ||
                            status.includes("Under Process") ? (
                              editass.assignment_deadline &&
                              editIndex.assignment_deadline === index ? (
                                <>
                                  <span
                                    className="cursor-pointer bg-green-500 rounded-xl font-bold text-[1rem]"
                                    onClick={() => {
                                      handleEditDeadline(a?.assignment_id);
                                      handleEdit("assignment_deadline");
                                      setEditIndex((prev) => ({
                                        ...prev,
                                        assignment_deadline: index,
                                      }));
                                    }}
                                  >
                                    <LucideCheck size="20" color="white" />
                                  </span>
                                  <span
                                    className="cursor-pointer bg-red-500 rounded-xl font-bold text-[1rem]"
                                    onClick={() => {
                                      handleEdit("assignment_deadline");
                                      setAssData((prev) => ({
                                        ...prev,
                                        assignment_deadline:
                                          a.assignment_deadline,
                                      }));
                                    }}
                                  >
                                    <LucideX size="20" color="white" />
                                  </span>
                                </>
                              ) : (
                                <span
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleEdit("assignment_deadline");

                                    setEditIndex((prev) => ({
                                      ...prev,
                                      assignment_deadline: index,
                                    }));
                                    setAssData((prev) => ({
                                      ...prev,
                                      assignment_deadline:
                                        a.assignment_deadline,
                                    }));
                                  }}
                                >
                                  <LucideEdit size="20" />
                                </span>
                              )
                            ) : null}
                          </span>
                        </li>
                        <li className="flex  items-center gap-2 ">
                          <svg
                            className="flex-shrink-0 w-4 h-4 text-blue-600 "
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="leading-tight flex items-center gap-[1rem]">
                            Assignment Level:&nbsp;
                            {editass.assignment_level &&
                            editIndex.assignment_level === index ? (
                              <FormControl variant="outlined" required>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-controlled-radio-buttons-group"
                                  name="controlled-radio-buttons-group"
                                  value={
                                    editIndex.assignment_level === index
                                      ? assData.assignment_level
                                      : a.assignment_level
                                  }
                                  label="Level of Assignment"
                                  onChange={(e) => {
                                    setAssData((prev) => ({
                                      ...prev,
                                      assignment_level: e.target.value,
                                    }));
                                  }}
                                >
                                  {relevantLevelOfAssignment?.map(
                                    (copy, id) => (
                                      <label
                                        key={id}
                                        className="flex items-center justify-center gap-2 px-2 py-2  text-gray-900   rounded-md cursor-pointer hover:border-gray-200  flex-wrap"
                                      >
                                        <FormControlLabel
                                          value={copy}
                                          label={copy}
                                          control={<Radio />}
                                        />
                                      </label>
                                    )
                                  )}
                                </RadioGroup>
                              </FormControl>
                            ) : editIndex.assignment_level === index ? (
                              assData.assignment_level
                            ) : (
                              a.assignment_level
                            )}
                            {status.includes("Assigned to Project Manager") ||
                            status.includes("Posted") ||
                            status.includes("Under Process") ? (
                              editass.assignment_level &&
                              editIndex.assignment_level === index ? (
                                <>
                                  <span
                                    className="cursor-pointer bg-green-500 rounded-xl font-bold text-[1rem]"
                                    onClick={() => {
                                      handleEditLevel(a?.assignment_id);
                                      handleEdit("assignment_level");
                                      setEditIndex((prev) => ({
                                        ...prev,
                                        assignment_level: index,
                                      }));
                                    }}
                                  >
                                    <LucideCheck color="white" size="20" />
                                  </span>
                                  <span
                                    className="cursor-pointer bg-red-500 rounded-xl font-bold text-[1rem]"
                                    onClick={() => {
                                      handleEdit("assignment_level");
                                      setAssData((prev) => ({
                                        ...prev,
                                        assignment_level: a.assignment_level,
                                      }));
                                    }}
                                  >
                                    <LucideX size="20" color="white" />
                                  </span>
                                </>
                              ) : (
                                <span
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleEdit("assignment_level");
                                    setEditIndex((prev) => ({
                                      ...prev,
                                      assignment_level: index,
                                    }));
                                    setAssData((prev) => ({
                                      ...prev,
                                      assignment_level: a.assignment_level,
                                    }));
                                  }}
                                >
                                  <LucideEdit size="20" />
                                </span>
                              )
                            ) : null}
                          </span>
                        </li>

                        <li className="flex  items-center gap-2">
                          <svg
                            className="flex-shrink-0 w-4 h-4 mt-2 text-blue-600 "
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="leading-tight flex  flex-wrap   items-center gap-2">
                            Assignment Type:&nbsp;
                            {/* //TODO:  Clean the Code */}
                            {editIndex.assignment_type === index &&
                            fetchedTypes.length > defaultTypes.length
                              ? fetchedTypes.map((item, id) => (
                                  <span
                                    key={id}
                                    className=" mx-1 inline-flex items-center px-3 py-0.5 mt-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                  >
                                    <span>{item}</span>
                                  </span>
                                ))
                              : defaultTypes.map((item, id) => (
                                  <span
                                    key={id}
                                    className=" mx-1 inline-flex items-center px-3 py-0.5 mt-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                  >
                                    <span>{item}</span>
                                  </span>
                                ))}
                            {status.includes("Assigned to Project Manager") ||
                            status.includes("Posted") ||
                            status.includes("Under Process") ? (
                              <button
                                className="cursor-pointer"
                                id="type"
                                onClick={(e) => {
                                  handleEdit("assignment_type");
                                  setEditIndex((prev) => ({
                                    ...prev,
                                    assignment_type: index,
                                  }));
                                  setAssData((prev) => ({
                                    ...prev,
                                    assignment_type: a.assignment_type,
                                  }));
                                  handleCurrentType(defaultTypes);
                                  handleClickOpen("type");
                                  setCurrentId(a.assignment_id);
                                  setAssignmentType(a.assignment_stream);
                                }}
                              >
                                <LucideEdit size="20" />
                              </button>
                            ) : null}
                          </span>
                        </li>
                        <li className="flex    items-center gap-2">
                          <svg
                            className="flex-shrink-0 w-4 h-4 text-blue-600 "
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="leading-tight flex flex-wrap items-center gap-5">
                            Description:&nbsp;
                            {editass.assignment_description &&
                            editIndex.assignment_description === index ? (
                              <input
                                className="rounded-xl focus:border-[#918ef4] bg-transparent  block w-auto md:w-[500px] lg:w-[500px] px-2 py-2  leading-tight border border-gray-300 rounded appearance-none text-white-700 focus:outline-none "
                                placeholder="Description"
                                defaultValue={a.assignment_description}
                                value={
                                  editIndex.assignment_description === index &&
                                  assData?.assignment_description
                                }
                                onChange={(e) => {
                                  setAssData((prev) => ({
                                    ...prev,
                                    assignment_description: e.target.value,
                                  }));
                                }}
                              />
                            ) : editIndex.assignment_description === index ? (
                              assData?.assignment_description ||
                              a.assignment_description
                            ) : (
                              a.assignment_description
                            )}
                            {status.includes("Assigned to Project Manager") ||
                            status.includes("Posted") ||
                            status.includes("Under Process") ? (
                              editass.assignment_description &&
                              editIndex.assignment_description === index ? (
                                <>
                                  <span
                                    className="cursor-pointer bg-green-500 rounded-xl font-bold text-[1rem]"
                                    onClick={() => {
                                      handleEditDesc(a?.assignment_id);
                                      handleEdit("assignment_description");
                                      setEditIndex((prev) => ({
                                        ...prev,
                                        assignment_description: index,
                                      }));
                                    }}
                                  >
                                    <LucideCheck size="20" color="white" />
                                  </span>
                                  <span
                                    className="cursor-pointer bg-red-500 rounded-xl font-bold text-[1rem]"
                                    onClick={() => {
                                      handleEdit("assignment_description");
                                      setAssData((prev) => ({
                                        ...prev,
                                        assignment_description:
                                          a.assignment_description,
                                      }));
                                    }}
                                  >
                                    <LucideX size="20" color="white" />
                                  </span>
                                </>
                              ) : (
                                <span
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleEdit("assignment_description");
                                    setAssData((prev) => ({
                                      ...prev,
                                      assignment_description:
                                        a.assignment_description,
                                    }));
                                    setEditIndex((prev) => ({
                                      ...prev,
                                      assignment_description: index,
                                    }));
                                  }}
                                >
                                  <LucideEdit size="20" />
                                </span>
                              )
                            ) : null}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div
                      className="max-w-7xl mx-auto p-4 bg-white rounded-lg md:p-8 "
                      id="services"
                      role="tabpanel"
                      aria-labelledby="services-tab"
                    >
                      {a?.assignment_project_manager === null && (
                        <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 ">
                          As soon as you submit the assignment, the project
                          manager will be assigned to you & his details will be
                          shown here.
                        </h2>
                      )}

                      {a?.assignment_project_manager && (
                        <>
                          <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 ">
                            Here are the contact details of Project Manager
                          </h2>
                          <ul role="list" className="space-y-4 text-gray-500 ">
                            <li className="flex space-x-2">
                              <svg
                                className="flex-shrink-0 w-4 h-4 text-blue-600 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <span className="leading-tight">
                                {`Whatsapp: ${a?.assignment_project_manager?.project_manager_number_whatsapp}`}
                              </span>
                            </li>
                            <li className="flex space-x-2">
                              <svg
                                className="flex-shrink-0 w-4 h-4 text-blue-600 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <span className="leading-tight">
                                {`Email: ${a?.assignment_project_manager?.project_manager_email} `}
                              </span>
                            </li>
                            <li className="flex space-x-2">
                              <svg
                                className="flex-shrink-0 w-4 h-4 text-blue-600 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <span className="leading-tight">
                                {`Contact Number: ${a?.assignment_project_manager?.project_manager_number}`}
                              </span>
                            </li>
                          </ul>
                        </>
                      )}
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div
                      className="max-w-7xl mx-auto p-4 bg-white rounded-lg md:p-8 "
                      id="statistics"
                      role="tabpanel"
                      aria-labelledby="statistics-tab"
                    >
                      <dl className="grid  grid-cols-1 gap-8 p-4  text-gray-900  sm:p-8">
                        <div className="flex flex-col">
                          {a?.assignment_status !== "Completed" && (
                            <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 ">
                              Review link will be available here, once the
                              assignment is completed.😊
                            </h2>
                          )}

                          {a?.assignment_status === "Completed" && (
                            <>
                              <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 ">
                                Please submit your assignment review here
                              </h2>
                              <a
                                href="https://g.page/bluepen/review?gm"
                                target="_blank"
                                className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800  "
                              >
                                Submit a review
                                <svg
                                  className="w-6 h-6 ml-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </a>
                            </>
                          )}
                        </div>
                      </dl>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
